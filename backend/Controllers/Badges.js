const fs = require('fs')
const Badges = require("../Models/Badges/Badge.js");
const User_Badges = require("../Models/Badges/BadgeUtilizador.js");
const { User,Post, Progress, User_Activity} = require("../Models/index.js");
const {Op} = require('sequelize')
exports.badgeValidation = (req, res, next) => {
  
  const { name, description, points, type, requirement } = req.body;
  /* if (!name || !description || !points || !type || !requirement) {
    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!points) missingFields.push("points");
    if (!type) missingFields.push("type");
    if (!requirement) missingFields.push("requirement");
    return res.status(400).json({
      error: "Missing fields: " + missingFields.join(", "),
    });
  } */
  next();
};
exports.giveBadgesPost = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    
    // Count the number of posts by the user
    const userPosts = await Post.count({ where: { userId } });
    
    // Find all badges of type 'posts' where the quantity is less than or equal to the number of user posts
    const badges = await Badges.findAll({
      where: {
        type: 'posts',
        requirement: {
          [Op.lte]: userPosts
        }
      }
    });
    
    // Find all badges already assigned to the user
    const userBadges = await User_Badges.findAll({ where: { userId } });

    // Extract BadgeIds from userBadges for easier comparison
    const userBadgeIds = userBadges.map(userBadge => userBadge.BadgeId);
    
    // Assign badges to the user if they do not already have them
    for (const badge of badges) {
      if (!userBadgeIds.includes(badge.id)) {
        await User_Badges.create({
          badgeId: badge.id,
          userId: userId,
        });
      }
    }

    // Send a response or proceed to the next middleware
    res.status(200).send('Badges assigned successfully.');
  } catch (error) {
    console.error('Error in giveBadgesPost:', error);
  }
};

exports.giveBadgesObjectives = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    
    // Count the number of posts by the user
    const userObjectives = await Progress.findAll({ where: {  userId:userId } });
    
    for(const objective of userObjectives){
        const daysPassed = await User_Activity.count({where:{userId:userId, progressId:objective.id}})
        objective.beginningDate
        objective.endDate
    }
    // Find all badges of type 'posts' where the quantity is less than or equal to the number of user posts
    const badges = await Badges.findAll({
      where: {
        type: 'posts',
        requirement: {
          [Op.lte]: userPosts
        }
      }
    });
    
    // Find all badges already assigned to the user
    const userBadges = await User_Badges.findAll({ where: { userId } });

    // Extract BadgeIds from userBadges for easier comparison
    const userBadgeIds = userBadges.map(userBadge => userBadge.BadgeId);
    
    // Assign badges to the user if they do not already have them
    for (const badge of badges) {
      if (!userBadgeIds.includes(badge.id)) {
        await User_Badges.create({
          badgeId: badge.id,
          userId: userId,
        });
      }
    }

    // Send a response or proceed to the next middleware
    res.status(200).send('Badges assigned successfully.');
  } catch (error) {
    console.error('Error in giveBadgesPost:', error);
  }
};





//DONE
exports.getBadges = async (req, res) => {
  const { offset, length, badges } = req.query;
  try {
    let query = {};
    if (offset && length) {
      query.offset = parseInt(offset);
      query.limit = parseInt(length);
    }
    if (badges) {
      const ids = badges.split(",").map(Number);
      query.where = query.where || {};
      query.where.id = { [Op.in]: ids };
    }
    const data = await Badges.findAll(query);
    return res.status(200).json({
      success: "Successful request",
      Badges: data,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.createBadge = async (req, res, next) => {
  const { name, description, points, type, requirement } = req.body;
  
  try {
    const badgeCreation = {
      name: name,
      description: description,
      points: points,
      type: type,
      requirement: requirement,
    }
    if(req.file){
      const image  = fs.readFileSync(req.file.path)
      const encodedImage = Buffer.from(image).toString('base64')
      badgeCreation.icon=image
      fs.unlinkSync(req.file.path)
    }
    const data = await Badges.create(badgeCreation);
    return res.status(201).json({
      success: "Badge created successfully",
      Badge: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getBadge = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Badges.findByPk(id);
    if (!data) {
      return res.status(404).json({
        error: "Badge not found",
      });
    }
    return res.status(200).json({
      success: "Successful request",
      Badge: data,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.updateBadge = async (req, res) => {
  const { id } = req.params;
  const { name, description, points, type, requirement } = req.body;
  try {
    const data = await Badges.findByPk(id);
    if (!data) {
      return res.status(404).json({
        error: "Badge not found",
      });
    }
    const updatedData = await data.update({
      name: name,
      description: description,
      points: points,
      type: type,
      requirement: requirement,
    });
    return res.status(200).json({
      success: "Badge updated successfully",
      Badge: updatedData,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.deleteBadge = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Badges.findByPk(id);
    if (!data) {
      return res.status(404).json({
        error: "Badge not found",
      });
    }
    await data.destroy();
    return res.status(200).json({
      success: "Badge deleted successfully",
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getUserBadges = async (req, res) => {
  try {
    const userBadges=await User_Badges.findAll({
      where: { userId: res.locals.userId },
    });

    res.status(200).json({
      success: "Successfully retrieved user badges",
      content: userBadges,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
}

//DONE
exports.addBadgeToUser = async (req, res) => {
  console.log("Body", req.body)
  const { badgeId } = req.body;
  try {
    const badge = await Badges.findByPk(badgeId);
    if (!badge) {
      return res.status(404).json({
        error: "Badge not found",
      });
    }

    const findUserBadge=await User_Badges.findOne({
      where: { userId: res.locals.userId, badgeId: badgeId },
    });

    if (findUserBadge) {
      return res.status(400).json({
        error: "User already has this badge",
      });
    }

    const userBadge = await User_Badges.create({
      BadgeId: badgeId,
      UserId: res.locals.userId,
    });
    return res.status(201).json({
      success: "Badge added to user successfully",
      content: userBadge,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};