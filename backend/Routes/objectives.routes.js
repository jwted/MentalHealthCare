const express = require("express");
const router = express.Router();
const objectiveController = require("../Controllers/Objectives");
const {
  offsetLengthValidation,
  idsValidation,
  objectiveValidation,
} = require("../Middlewares/objMid");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
// Get Objectives
router
  .get(
    "/",
    offsetLengthValidation,
    idsValidation,
    objectiveController.getObjectives
  )
  .post("/", objectiveValidation, objectiveController.createObjective);

//Get / Patch / Delete - By Id
router
  .get("/:id", objectiveController.getObjective)
  .patch("/:id", objectiveController.updateObjective)
  .delete("/:id", objectiveController.deleteObjective);

module.exports = router;
