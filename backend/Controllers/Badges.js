const fs = require("fs");
const Badges = require("../Models/Badges/Badge.js");
const User_Badges = require("../Models/Badges/BadgeUtilizador.js");
const {
  User,
  Post,
  Progress,
  User_Activity,
  Comment,
} = require("../Models/index.js");
const { Op } = require("sequelize");
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
    const userPosts = await Post.count({ where: { userId: userId } });

    // Find all badges of type 'posts' where the quantity is less than or equal to the number of user posts
    const badges = await Badges.findAll({
      where: {
        type: "posts",
        requirement: {
          [Op.lte]: userPosts,
        },
      },
    });
    if (badges) {
      // Find all badges already assigned to the user
      const userBadges = await User_Badges.findAll({
        where: { userId: userId },
      });

      // Extract BadgeIds from userBadges for easier comparison
      const userBadgeIds = userBadges.map((userBadge) => userBadge.badgeId);

      // Assign badges to the user if they do not already have them
      for (const badge of badges) {
        if (!userBadgeIds.includes(badge.id)) {
          await User_Badges.create({
            badgeId: badge.id,
            userId: userId,
          });
        }
      }

      return res.status(200).send({ message: "Badge given to user" });
    }
  } catch (error) {
    return res.status(400).send({ message: "Error giving badge to user" });
  }
};
exports.giveBadgesComments = async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    // Count the number of posts by the user
    const userComments = await Comment.count({ where: { userId: userId } });

    // Find all badges of type 'posts' where the quantity is less than or equal to the number of user posts
    const badges = await Badges.findAll({
      where: {
        type: "comments",
        requirement: {
          [Op.lte]: +userComments,
        },
      },
    });
    if (badges) {
      // Find all badges already assigned to the user
      const userBadges = await User_Badges.findAll({
        where: { userId: userId },
      });

      // Extract BadgeIds from userBadges for easier comparison
      const userBadgeIds = userBadges.map((userBadge) => userBadge.badgeId);

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
    }
  } catch (error) {
    console.log(error);
  }
};

exports.giveBadgesPoints = async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const user = await User.findByPk(userId);
    const userBadges = await User_Badges.findAll({ where: { userId: userId } });

    const badges = await Badges.findAll({
      where: {
        type: "points",
        requirement: {
          [Op.lte]: user.points,
        },
      },
    });
    if (badges) {
      const userBadgeIds = userBadges.map((userBadge) => userBadge.badgeId);

      for (const badge of badges) {
        if (!userBadgeIds.includes(badge.id)) {
          await User_Badges.create({
            badgeId: badge.id,
            userId: userId,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.giveBadgesObjectives = async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    // Count the number of posts by the user
    const userObjectives = await Progress.count({
      where: { userId: userId, state: "Finished" },
    });

    // Find all badges of type 'posts' where the quantity is less than or equal to the number of user posts
    const badges = await Badges.findAll({
      where: {
        type: "objectives",
        requirement: {
          [Op.lte]: +userObjectives,
        },
      },
    });
    if (badges) {
      // Find all badges already assigned to the user
      const userBadges = await User_Badges.findAll({ where: { userId } });

      // Extract BadgeIds from userBadges for easier comparison
      const userBadgeIds = userBadges.map((userBadge) => userBadge.BadgeId);

      // Assign badges to the user if they do not already have them
      for (const badge of badges) {
        if (!userBadgeIds.includes(badge.id)) {
          await User_Badges.create({
            badgeId: badge.id,
            userId: userId,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.giveBadgesLikes = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    console.log("USER:" + userId);
    // Count the number of posts by the user
    const userLikes = await Like_Post.count({ where: { userId: userId } });
    console.log("USER LIKES:" + userLikes);
    // Find all badges of type 'posts' where the quantity is less than or equal to the number of user posts
    const badge = await Badges.findOne({
      where: {
        type: "posts",
        requirement:  +userLikes,
      },
    });
    console.log("BADGE:" + badge);
    if (badge) {
      // Find all badges already assigned to the user
      const userBadges = await User_Badges.findAll({ where: { userId } });

      // Extract BadgeIds from userBadges for easier comparison
      const userBadgeIds = userBadges.map((userBadge) => userBadge.BadgeId);

      // Assign badges to the user if they do not already have them
      if (!userBadgeIds.includes(badge.id)) {
        await User_Badges.create({
          badgeId: badge.id,
          userId: userId,
        });
      }
    }
  } catch (error) {
    console.log(error);
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
      icon:""
    };
    if (req.file) {
      const image = fs.readFileSync(req.file.path);
      const encodedImage = Buffer.from(image).toString("base64");
      badgeCreation.icon = image;
      fs.unlinkSync(req.file.path);
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
    return res.status(204).json({
      success: "Badge deleted successfully",
    });
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getUserBadges = async (req, res) => {
  try {
    const { userId } = req.params;
    const userBadges = await User_Badges.findAll({
      where: { userId: userId },
      include:{
        model:Badges
      }
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
};

//DONE
exports.addBadgeToUser = async (req, res) => {
  const { badgeId } = req.body;
  try {
    const badge = await Badges.findByPk(badgeId);
    if (!badge) {
      return res.status(404).json({
        error: "Badge not found",
      });
    }

    const findUserBadge = await User_Badges.findOne({
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
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};