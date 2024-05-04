const { Op } = require("sequelize");
const Category = require("../Models/Categorias/Category.js");
const categoria_objetivo = require("../Models/Categorias/Category_Objective.js");
const categoria_atividade = require("../Models/Categorias/Category_Activity.js");
const Objective = require("../Models/Objetivos/Objetivos.js");

exports.categoryValidation = async (req, res, next) => {
  const { name, description, objectiveId, activityId } = req.body;
  if (!name || !description) {
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    return res.status(400).json({
      error: `Missing fields: ${missingFields.join(", ")}`,
    });
  }

  if (objectiveId) {
    const objective = await Objective.findByPk(objectiveId);
    if (!objective) {
      return res.status(404).json({
        error: "Objective not found",
      });
    }
    next();
  }

  if (activityId) {
    const activity = await categoria_atividade.findByPk(activityId);
    if (!activity) {
      return res.status(404).json({
        error: "Activity not found",
      });
    }
    next();
  }
  next();
};
//DONE
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const data = await Category.create({
      name: name,
      description: description,
    });
    return res.status(201).json({
      success: "Category created successfully",
      Category: data,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getCategories = async (req, res) => {
  const { categories } = req.query;
  try {
    if (categories) {
      const catIds = categories.split(",");

      const validIds = catIds.every((id) => !isNaN(id));

      if (!validIds) {
        return res.status(400).json({
          error: "Invalid category ids",
        });
      }
      const data = await Category.findAll({
        where: {
          id: {
            [Op.in]: catIds.map(Number),
          },
        },
      });

      return res.status(200).json({
        success: "Categories fetched successfully",
        Categories: data,
      });
    } else {
      // Caso não haja IDs fornecidos, busca todas as categorias
      const data = await Category.findAll();
      return res.status(200).json({
        success: "Categories fetched successfully",
        Categories: data,
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Category.findByPk(id);
    if (!data) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    return res.status(200).json({
      success: "Category fetched successfully",
      Category: data,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const data = await Category.findByPk(id);
    if (!data) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    const updatedData = await data.update({
      name: name,
      description: description,
    });
    
    return res.status(200).json({
      success: "Category updated successfully",
      Category: updatedData,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
}

//DONE
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Category.findByPk(id);
    if (!data) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    await data.destroy();
    return res.status(200).json({
      success: "Category deleted successfully",
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
}