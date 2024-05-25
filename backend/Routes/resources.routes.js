const express = require("express");
const router = express.Router();
const resourceController = require("../Controllers/Resources.js");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const { offsetLengthValidation } = require("../Middlewares/objMid");

//Get Categories
router
  .get("/", verifyUser,offsetLengthValidation,resourceController.getResources)
  .post("/", verifyUser, resourceController.createResource);
//Get / Put / Delete - By Id
router
   .get("/:id", verifyUser, resourceController.getResource)
  .put(
    "/:id",
    verifyUser,
    resourceController.updateResource
  )
  .delete("/:id", verifyUser, resourceController.deleteResource);
module.exports = router;
