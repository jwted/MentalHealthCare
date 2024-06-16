const express = require("express");
const router = express.Router();
const badgeController = require("../Controllers/Badges");
const upload = require('../Middlewares/multer')
const {
  offsetLengthValidation,
  objectiveValidation,
} = require("../Middlewares/objMid");

router
  .get("/", offsetLengthValidation, badgeController.getBadges)
  .post("/", upload.single('image'),badgeController.badgeValidation, badgeController.createBadge)

router
  .get("/:id", offsetLengthValidation, badgeController.getBadge)
  .put("/:id", badgeController.updateBadge)
  .delete("/:id", badgeController.deleteBadge);

module.exports = router;
