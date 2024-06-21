const express = require("express");
const router = express.Router();
const resourceController = require("../Controllers/Resources.js");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const { offsetLengthValidation } = require("../Middlewares/objMid");


router
  .get("/", verifyUser,offsetLengthValidation,resourceController.getResources)
  .post("/", verifyUser, resourceController.createResource);

router
   .get("/:id", verifyUser, resourceController.getResource)
  .put(
    "/:id",
    verifyUser,
    resourceController.updateResource
  )
  .delete("/:id", verifyUser, resourceController.deleteResource);
module.exports = router;
