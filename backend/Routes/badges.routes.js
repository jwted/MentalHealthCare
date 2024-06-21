const express = require("express");
const router = express.Router();
const badgeController = require("../Controllers/Badges");
const upload = require('../Middlewares/multer')
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const {
  offsetLengthValidation,
  idsValidation,
} = require("../Middlewares/objMid");

router
  .get("/", verifyUser,offsetLengthValidation,idsValidation,badgeController.getBadges)
  .post("/",verifyAdmin, upload.single('image'),badgeController.badgeValidation, badgeController.createBadge)

router
  .get("/:id",verifyUser,badgeController.getBadge)
  .put("/:id",verifyAdmin, badgeController.updateBadge)
  .delete("/:id",verifyAdmin, badgeController.deleteBadge);

module.exports = router;
