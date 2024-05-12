const express = require("express");
const router = express.Router();
const {getActivities,createActivity,updateActivity,deleteActivity} = require("../Controllers/Activities");
const {idsValidation,offsetLengthValidation} = require('../Middlewares/objMid')
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
// Get Activites
router
  .get("/", verifyUser,offsetLengthValidation,idsValidation,getActivities )
  .post("/", createActivity);

// Get / Put / Delete - By Id
router
  .patch("/:id", updateActivity)
  .delete("/:id",deleteActivity);

module.exports = router;
