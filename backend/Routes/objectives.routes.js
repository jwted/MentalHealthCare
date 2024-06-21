const express = require("express");
const router = express.Router();
const objectiveController = require("../Controllers/Objectives");
const {
  offsetLengthValidation,
  objectiveValidation,
  idsValidation
} = require("../Middlewares/objMid");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
// Get Objectives
router
  .get("/",offsetLengthValidation,idsValidation,objectiveController.getObjectives)
  .post("/",verifyAdmin,objectiveValidation, objectiveController.createObjective);

//Get / Patch / Delete - By Id
router
  .get("/:id",verifyUser,objectiveController.getObjective)
  .patch("/:id",verifyAdmin,objectiveController.updateObjective)
  .delete("/:id",verifyAdmin,objectiveController.deleteObjective);

router.post("/:id/activities",verifyAdmin,objectiveController.addActivityToObjective);

module.exports = router;
