const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/Categories");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const objMid=require("../Middlewares/objMid")

//Get Categories
router
  .get("/", objMid.offsetLengthValidation,categoryController.getCategories)
  .post("/",categoryController.categoryValidation,categoryController.createCategory);

// //Get / Put / Delete - By Id
//  router
//   .get("/:id", categoryController.getCategory)
//   .put("/:id", categoryController.updateCategory)
//   .delete("/:id", categoryController.deleteCategory);
module.exports = router;
