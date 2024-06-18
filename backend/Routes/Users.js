const express = require("express");
const {
  getUser,
  getUsers,
  deleteUser,
  editProfile,
  getUserObjectives,
  deleteObjectiveFromUser,
} = require("../Controllers/Users");
const { addObjectiveToUser } = require("../Controllers/Objectives");
const { getUserBadges, addBadgeToUser } = require("../Controllers/Badges");
const diaryController= require("../Controllers/Diary");
const {
  verifyAdmin,
  verifyUser,
  verifySameUser,
} = require("../Middlewares/jwt");
const {
  idsValidation,
  offsetLengthValidation,
} = require("../Middlewares/objMid");
const router = express.Router();

router.get("/", offsetLengthValidation, idsValidation, getUsers);

router.get("/:userId", getUser);
router.put("/:userId", verifyUser, editProfile);
router.delete("/:userId",verifyAdmin, deleteUser);

router.get("/:userId/objectives", verifyUser,getUserObjectives);
router.post("/:userId/objectives", verifyUser, addObjectiveToUser);
router.get("/:userId/objectives/:objectiveId", verifyUser, getUserObjectives);
router.delete("/:userId/objectives/:objectiveId", verifyUser, deleteObjectiveFromUser);

router.get("/:userId/badges", verifyUser,verifySameUser, getUserBadges);
router.post("/badges", verifyUser, addBadgeToUser);

router.get("/:userId/diary", verifyUser, diaryController.getUserDiaries);
router.post("/:userId/diary", verifyUser, diaryController.createDiary);

router.get("/:userId/diary/:diaryId", verifyUser, diaryController.getDiary);
router.put("/:userId/diary/:diaryId", verifyUser, diaryController.updateDiary);
router.delete("/:userId/diary/:diaryId", verifyUser, diaryController.deleteDiary);
module.exports = router;
