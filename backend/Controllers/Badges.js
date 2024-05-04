const Badges = require("../Models/Badges/Badge.js");

exports.badgeValidation = (req, res, next) => {
  const { name, description, points, type,requirement } = req.body;
  if (!name || !description || !points || !type || !requirement) {
    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!points) missingFields.push("points");
    if (!type) missingFields.push("type");
    if (!requirement) missingFields.push("requirement");
    return res.status(400).json({
      error: "Missing fields: " + missingFields.join(", "),
    });
  }
  next();
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
  const { name, description, points, type,requirement } = req.body;
  try {
    const data = await Badges.create({
      name: name,
      description: description,
      points: points,
      type: type,
      requirement:requirement
    });
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
exports.getBadge= async (req, res) => {
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
}

//DONE
exports.updateBadge = async (req, res) => {
  const { id } = req.params;
  const { name, description, points, type,requirement } = req.body;
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
      requirement:requirement
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
}

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
}