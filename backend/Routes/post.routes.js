const express = require("express");
const router = express.Router();
const postController = require("../Controllers/Posts");
const { verifyUser, verifyAdmin } = require("../Middlewares/jwt");
const { offsetLengthValidation } = require("../Middlewares/objMid");
// Get All Posts
router
  .route("/")
  .get(offsetLengthValidation, postController.getPosts)
  .post(postController.bodyValidation, postController.postPosts);

// Get / Put / Delete - By Id
router
  .route("/:id")
  .get(offsetLengthValidation, postController.getPostById)
  .put(postController.bodyValidation, postController.updatePostById)
  .delete(postController.deletePostById);

// Post / Get - Comments of Post Id
router.route("/:id/comments")
  .get(postController.idValidation,postController.getComments)
  .post(postController.idValidation,postController.bodyValidation,postController.addComments);

// // Get / Delete / Put - Comments by Id
// router
//   .route("/:id/comments/:commentId")
//   .get(postController.getCommentById)
//   .delete(postController.deleteCommentById)
//   .put(postController.updateCommentById);

// Post / Delete - Likes
router
  .route("/:id/likes")
  .post(postController.addLike)
  .delete(postController.removeLike);

module.exports = router;
