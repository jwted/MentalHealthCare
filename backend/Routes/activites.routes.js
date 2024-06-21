const express = require("express");
const router = express.Router();
const {getActivities,createActivity,updateActivity,deleteActivity,getActivity} = require("../Controllers/Activities");
const {idsValidation,offsetLengthValidation} = require('../Middlewares/objMid')
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
// Get Activites
router
  .get("/",verifyUser,offsetLengthValidation,idsValidation,getActivities )
  .post("/",verifyAdmin,createActivity);

// Get / Put / Delete - By Id
router
  .patch("/:id",verifyAdmin,updateActivity)
  .delete("/:id",verifyAdmin,deleteActivity)
  .get("/:id",verifyUser,getActivity);

module.exports = router;