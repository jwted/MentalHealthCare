const Objective = require("../Models/Objetivos/Objetivos");
const Progress = require("../Models/Progresso/Progresso.js");
const Category = require("../Models/Categorias/Category.js");
const Activity = require("../Models/Atividades/Atividade.js");
const User = require("../Models/Users/Users.js");
const categoria_objetivo = require("../Models/Categorias/Category_Objective.js");
const { Op } = require("sequelize");

//DONE
exports.getObjectives = async (req, res, next) => {
  //!DONE AND TESTED
  const { offset, length, objective } = req.query;
  try {
    let query = {
      where: {},
      include: [
        {
          model: Category,
          as: "categories",
          through: {
            attributes: [], // Exclude join table attributes
          },
        },
        {
          model: Activity,
          as: "activities",
          through: {
            attributes: [], // Exclude join table attributes
          },
          include: [
            {
              model: Category,
              as: "categories",
              through: {
                attributes: [], // Exclude join table attributes for the nested include
              },
            },
          ],
        },
      ],
    };
    if (offset && length) {
      query.offset = parseInt(offset);
      query.limit = parseInt(length);
    }
    if (objective) {
      query.where.id = objective.split(",");
    }
    const objectives = await Objective.findAll(query);
    if (objectives) {
      res.status(200).send({
        message: "Sucessfully found activities",
        content: objectives,
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.addObjectiveToUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { objectiveId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User provided was not found" });
    }
    const objective = await Objective.findByPk(objectiveId);
    if (!objective) {
      return res
        .status(404)
        .send({ message: "Objective provided was not found" });
    }
    let endDate = req.body.endDate;
    let beginningDate = req.body.beginningDate;

    endDate = endDate.replace(/\//g, "-");
    beginningDate = beginningDate.replace(/\//g, "-")

    const data = await Progress.create({
      userId: userId,
      objectiveId: objectiveId,
      endDate: endDate,
      beginningDate: beginningDate,
    });
    if (data) {
      res
        .status(201)
        .send({ message: "Objective added successfully", data: data });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//DONE
exports.getUserObjectives = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User provided was not found" });
    }

    const data = await Progress.findAll({
      where: {
        userId: userId,
      },
    });
    console.log(data);
    if (data) {
      res
        .status(200)
        .send({
          message: "User objectives retrieved successfully",
          data: data,
        });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//DONE
exports.createObjective = async (req, res) => {
  //!DONE AND TESTED
  try {
    const { name, description, activityId, categoryId } = req.body;

    if (!name || !description || !activityId || !categoryId) {
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!description) missingFields.push("description");
      if (!categoryId) missingFields.push("categoryId");
      if (!activityId) missingFields.push("activityId");

      return res.status(400).json({
        error: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    const categoriesArr = categoryId.split(",");
    const activitiesArr = activityId.split(",");

    // Create the objective
    const objective = await Objective.create({ name, description });

    // Associate activities with the objective
    if (categoriesArr.length > 0) {
      const categories = await Category.findAll({
        where: { id: categoriesArr },
      });
      await objective.addCategories(categories);
    }

    if (activitiesArr.length > 0) {
      const activities = await Activity.findAll({
        where: { id: activitiesArr },
      });
      await objective.addActivities(activities);
    }

    const result = await Objective.findByPk(objective.id, {
      include: [
        {
          model: Category,
          as: "categories",
          through: {
            attributes: [], // Exclude join table attributes
          },
        },
        {
          model: Activity,
          as: "activities",
          through: {
            attributes: [], // Exclude join table attributes
          },
          include: [
            {
              model: Category,
              as: "categories",
              through: {
                attributes: [], // Exclude join table attributes for the nested include
              },
            },
          ],
        },
      ],
    });

    res.status(201).json({
      success: "Objective created successfully",
      objective: result,
    });
  } catch (error) {
    console.error("Error creating objective:", error);
    return res.status(500).json({ error: "Could not create objective" });
  }
};

// DONE
exports.updateObjective = async (req, res, next) => {
  //!DONE AND TESTED
  const { id } = req.params;
  const { name, description, activityId, categoryId } = req.body;
  try {
    const objective = await Objective.findByPk(id);
    if (!objective) {
      return res.status(404).json({
        error: "Objective not found",
      });
    } else {
      const data = await Objective.update(
        {
          name,
          description,
          activityId,
          categoryId,
        },
        {
          where: { id },
        }
      );
      if (data[0] === 1) {
        res.status(200).json({
          success: "Objective updated successfully",
        });
      } else {
        res.status(404).json({
          error: "Objective not found",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getObjective = async (req, res, next) => {
  //!DONE AND TESTED
  try {
    const objective = await Objective.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: "categories",
          through: {
            attributes: [], // Exclude join table attributes
          },
        },
        {
          model: Activity,
          as: "activities",
          through: {
            attributes: [], // Exclude join table attributes
          },
          include: [
            {
              model: Category,
              as: "categories",
              through: {
                attributes: [], // Exclude join table attributes for the nested include
              },
            },
          ],
        },
      ],
    });

    if (objective) {
      res
        .status(200)
        .send({
          message: "Objective Sucessfully retrieved",
          content: objective,
        });
    } else {
      res.status(404).send({ message: "Objective not found. Invalid ID" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong.", error });
  }
};

// DONE
exports.deleteObjective = async (req, res, next) => {
  //!DONE AND TESTED
  try {
    const { id } = req.params;
    const objective = await Objective.findByPk(id);

    if (!objective) {
      res.status(404).json({
        error: "Provided objective was not found",
      });
    } else {
      await Objective.destroy({
        where: { id },
      });

      res.status(204).json({
        success: "Objective deleted successfully",
      });
    }
  } catch {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later" });
  }
};
