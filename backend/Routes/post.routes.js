const express = require('express');
const router = express.Router();
const postController = require("../Controllers/Posts");
const { verifyUser,verifyAdmin } = require("../Middlewares/jwt");
// Get All Posts
router.route("/").get(verifyUser,postController.getPosts)
                .post(verifyUser,postController.postPosts);

// Get / Put / Delete - By Id
router.route("/:id").get(verifyUser,postController.getPostById)
                    .put(verifyAdmin,postController.updatePostById)
                    .delete(verifyUser,postController.deletePostById);

// Post / Get - Comments of Post Id
router.route("/:id/comments").get(verifyUser,postController.getComments)
                            .post(verifyUser,postController.addComments);

// Get / Delete / Put - Comments by Id
router.route("/:id/comments/:commentId").get(verifyUser,postController.getCommentById)
                                        .delete(verifyUser,postController.deleteCommentById)
                                        .put(verifyAdmin,postController.updateCommentById);

// Post / Delete - Likes
router.route("/likes").post(verifyUser,postController.addLike)
                    .delete(verifyUser,postController.removeLike);

module.exports = router;