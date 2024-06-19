const express = require("express");
const router = express.Router();
const objectiveController = require("../Controllers/Objectives");
const {
  offsetLengthValidation,
  objectiveValidation,
} = require("../Middlewares/objMid");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
// Get Objectives
router
  .get("/",offsetLengthValidation,objectiveController.getObjectives)
  .post("/",verifyUser,objectiveValidation, objectiveController.createObjective);

//Get / Patch / Delete - By Id
router
  .get("/:id",verifyUser,objectiveController.getObjective)
  .patch("/:id",verifyAdmin,objectiveController.updateObjective)
  .delete("/:id",verifyUser,objectiveController.deleteObjective);

router.post("/:id/activities",verifyAdmin,objectiveController.addActivityToObjective);

module.exports = router;
