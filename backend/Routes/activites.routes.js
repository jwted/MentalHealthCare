const express = require("express");
const router = express.Router();
const activityController = require("../Controllers/Activities");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
// Get Activites
router
  .get("/", activityController.getActivites)
  .post("/", verifyUser, activityController.createActivity);

// Get / Put / Delete - By Id
router
  .patch("/:id", verifyUser, activityController.updateActivity)
  .delete("/:id", verifyAdmin, activityController.deleteActivity);

module.exports = router;
