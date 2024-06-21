const express = require("express");
const router = express.Router();
const calendarController = require("../Controllers/Activities");
const badgeController = require("../Controllers/Badges");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const { offsetLengthValidation } = require("../Middlewares/objMid");
//Get Diaries
router.get("/", verifyUser,offsetLengthValidation,calendarController.getUserActivities);
router.post("/",verifyUser,calendarController.addActivityToUser,badgeController.giveBadgesObjectives);

router.delete("/:activityId",verifyUser,calendarController.deleteActivityFromUser);
module.exports = router;