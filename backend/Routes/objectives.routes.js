const express = require("express");
const router = express.Router();
const objectiveController = require("../Controllers/Objectives");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
// Get Objectives
router
  .get("/", objectiveController.getObjectives)
  .post("/", verifyUser, objectiveController.createObjective);

// Patch / Delete - By Id
router
  .patch("/:id", verifyUser, objectiveController.updateObjective)
  .delete("/:id", verifyAdmin, objectiveController.deleteObjective);

module.exports = router;