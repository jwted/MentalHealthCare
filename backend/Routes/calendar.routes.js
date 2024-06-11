const express = require("express");
const router = express.Router();
const calendarController = require("../Controllers/Activities");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const { offsetLengthValidation } = require("../Middlewares/objMid");
//Get Diaries
router.get("/", verifyUser,offsetLengthValidation,calendarController.getUserActivities);
router.post("/",verifyUser,calendarController.addActivityToUser);

router.delete("/:activityId",verifyUser,calendarController.deleteActivityFromUser);
module.exports = router;