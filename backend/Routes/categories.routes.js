const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/Categories");
const { categoryValidation } = require("../Middlewares/catMid");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");

//Get Categories
router
  .get("/", categoryController.getCategories)
  .post("/", categoryValidation, categoryController.createCategory);

//Get / Put / Delete - By Id
router
  .get("/:id", categoryController.getCategory)
  .put("/:id", categoryController.updateCategory)
  .delete("/:id", categoryController.deleteCategory);
