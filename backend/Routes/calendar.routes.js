const express = require("express");
const router = express.Router();
const calendarController = require("../Controllers/Activities");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const { offsetLengthValidation } = require("../Middlewares/objMid");
//Get Diaries
router.get("/", verifyUser,offsetLengthValidation,calendarController.getUserActivities);
router.post("/",verifyUser,calendarController.addActivityToUser);

// //Get / Put / Delete - By Id
// router.get("/:id",verifyUser,diaryController.getDiary);
// router.put("/:id",verifyUser, diaryController.updateDiary);
// router.delete("/:id",verifyUser, diaryController.deleteDiary);
module.exports = router;