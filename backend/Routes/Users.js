const express = require("express");
const {
  getUser,
  getUsers,
  editProfile,
  getUserObjectives,
  deleteObjectiveFromUser,
} = require("../Controllers/Users");
const { addObjectiveToUser } = require("../Controllers/Objectives");
const { getUserBadges, addBadgeToUser } = require("../Controllers/Badges");
const { getUserDiary } = require("../Controllers/Diary");
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

router.get("/:userId/objectives", getUserObjectives);
router.post("/:userId/objectives", verifyUser, addObjectiveToUser);
router.get("/:userId/objectives/:objectiveId", verifyUser, getUserObjectives);
router.delete("/:userId/objectives/:objectiveId", verifyUser, deleteObjectiveFromUser);

router.get("/:userId/badges", verifyUser, getUserBadges);
router.post("/badges", verifyUser, addBadgeToUser);

// router.get("/:userId/diary", verifyUser, getUserDiary);

module.exports = router;
