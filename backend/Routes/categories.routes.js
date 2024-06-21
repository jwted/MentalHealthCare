const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/Categories");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const objMid = require("../Middlewares/objMid");

//Get Categories
router
  .get("/", verifyUser,objMid.offsetLengthValidation, categoryController.getCategories)
  .post(
    "/",
    verifyAdmin,categoryController.categoryValidation,
    categoryController.createCategory
  );

//Get / Put / Delete - By Id
router
  .get("/:id",verifyUser,categoryController.getCategory)
  .put(
    "/:id",verifyAdmin,
    categoryController.categoryValidation,
    categoryController.updateCategory
  )
  .delete("/:id",verifyAdmin, categoryController.deleteCategory);
module.exports = router;
