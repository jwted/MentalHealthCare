const Badges = require("../Models/Badges/Badge.js");

exports.badgeValidation = (req, res, next) => {
  const { name, description, points, type } = req.body;
  if (!name || !description || !points || !type) {
    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!points) missingFields.push("points");
    if (!type) missingFields.push("type");
    return res.status(400).json({
      error: "Missing fields: " + missingFields.join(", "),
    });
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

exports.createBadge = async (req, res, next) => {
  const { name, description, points, type } = req.body;
  try {
    const data = await Badges.create({
      name: name,
      description: description,
      points: points,
      type: type,
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
