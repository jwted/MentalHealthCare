const db = require("../Models/Atividades/Atividade.js");
const Activity = db.Activity;


exports.getActivities = async (req, res, next) => {
  try {
    const { id, offset, length } = req.query;

    if (offset && length) {
      if (offset == NaN || length == NaN) {
        return res.status(400).json({
          error: "Only numbers are allowed",
        });
      } else if ((offset && !length) || (!offset && length)) {
        return res.status(400).json({
          error:
            "Incorrect query use(you must use offset and length at the same time",
        });
      } else {
        if (!id) {
          const data = await Activity.findAll({
            offset: parseInt(offset),
            limit: parseInt(length),
          });
          res.status(200).json({
            success: "Successful request",
            Posts: data,
          });
        } else {
          const data = await Activity.findAll({
            where: { id },
            offset: parseInt(offset),
            limit: parseInt(length),
          });
          res.status(200).json({
            success: "Successful request",
            Activity: data,
          });
        }
      }
    } else {
      if (id) {
        const data = await Activity.findAll({
          where: { id },
        });
        res.status(200).json({
          success: "Successful request",
          Activity: data,
        });
      }
    }
  } catch {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later" });
  }
};

exports.createActivity = async (req, res, next) => {
  try {
    const { name, description, objectiveId, categoryId } = req.body;

    if (!name || !description || !objectiveId || !categoryId) {
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!description) missingFields.push("description");
      if (!objectiveId) missingFields.push("objectiveId");
      if (!categoryId) missingFields.push("categoryId");

      return res.status(400).json({
        error: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    const data = await Activity.create({
      name,
      description,
      objectiveId,
      categoryId,
    });

    res.status(201).json({
      success: "Activity created successfully",
      Activity: data,
    });
  } catch {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later" });
  }
};

// Patch Activity
exports.updateActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, objectiveId, categoryId } = req.body;
    const activity= await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({
        error: "Activity not found",
      });
    } else {
      const data = await Activity.update(
        {
          name,
          description,
          objectiveId,
          categoryId,
        },
        {
          where: { id },
        }
      );

      if (data[0] === 1) {
        res.status(200).json({
          success: "Activity updated successfully",
        });
      } else {
        res.status(404).json({
          error: "Activity not found",
        });
      }
    }
  } catch {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later" });
  }
};

// Delete Activity
exports.deleteActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({
        error: "Activity not found",
      });
    } else {
      const data=await Activity.destroy({
        where: { id },
      });

      res.status(200).json({
        success: "Activity deleted successfully",
      });
    }
  } catch {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later" });
  }
};

//Get Categories
exports.getCategories = async (req, res, next) => {

}