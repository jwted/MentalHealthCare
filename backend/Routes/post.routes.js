const express = require("express");
const router = express.Router();
const postController = require("../Controllers/Posts");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const { offsetLengthValidation } = require("../Middlewares/objMid");
// Get All Posts
router
  .route("/")
  .get(offsetLengthValidation, postController.getPosts)
  .post(verifyUser,postController.bodyValidation, postController.postPosts);

// Get / Put / Delete - By Id
router
  .route("/:id")
  .get(verifyUser,offsetLengthValidation, postController.getPostById)
  .put(verifyUser,postController.bodyValidation, postController.updatePostById)
  .delete(verifyUser,postController.deletePostById);

// Post / Get - Comments of Post Id
router.route("/:id/comments")
  .get(verifyUser,postController.idValidation,offsetLengthValidation,postController.getComments)
  .post(verifyUser,offsetLengthValidation,postController.bodyValidation,postController.addComments);

// Get / Delete / Put / Post- Comments by Id
router
  .route("/:id/comments/:commentId")
  .get(postController.idValidation,postController.getCommentById)
  .delete(postController.idValidation,postController.deleteCommentById)
  .put(postController.idValidation,postController.updateCommentById)

// Post / Delete - Likes
router
  .route("/:id/like")
  .post(verifyUser,postController.likePost)

module.exports = router;
