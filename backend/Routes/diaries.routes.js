const express = require("express");
const router = express.Router();
const diaryController = require("../Controllers/Diary.js");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const { offsetLengthValidation } = require("../Middlewares/objMid");
//Get Diaries
// router.get("/", verifyUser,offsetLengthValidation, diaryController.getDiaries);
router.post("/",verifyUser,diaryController.createDiary);

//Get / Put / Delete - By Id
router.get("/:id",verifyUser,diaryController.getDiary);
router.put("/:id",verifyUser, diaryController.updateDiary);
router.delete("/:id",verifyUser, diaryController.deleteDiary);
module.exports = router;