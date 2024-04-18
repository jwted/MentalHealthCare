/* const express = require('express');
const router = express.Router();
const postController = require("../Controllers/Posts");

// Get All Posts
router.route("/").get(postController.getPosts)
                .post(postController.postPosts);

// Get / Put / Delete - By Id
router.route("/:id").get(postController.getPostById)
                    .put(postController.updatePostById)
                    .delete(postController.deletePostById);

// Post / Get - Comments of Post Id
router.route("/:id/comments").get(postController.getComments)
                            .post(postController.addComments);

// Get / Delete / Put - Comments by Id
router.route("/:id/comments/:commentId").get(postController.getCommentById)
                                        .delete(postController.deleteCommentById)
                                        .put(postController.updateCommentById);

// Post / Delete - Likes
router.route("/likes").post(postController.addLike)
                    .delete(postController.removeLike);

module.exports = router;
 */