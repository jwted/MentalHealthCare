const db = require("../Models/Posts/Posts");
const Post = db.posts;
const Comment = db.commentarios;

// Posts - Get
exports.getPosts = async (req, res, next) => {
  try {
    const data = await Post.findAll();
    res.status(200).json({ success: "Successful request", posts: data });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later",
    });
  }
};

// Posts - Post
exports.postPosts = async (req, res, next) => {
  try {
    const data = await Post.create(req.body);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later",
      error: error.message,
    });
  }
};

// Posts/Id - Get
exports.getPostById = async (req, res, next) => {
  try {
    const data = await Post.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Posts/Id - Put
exports.updatePostById = async (req, res, next) => {
  try {
    const data = await Post.update(req.body, {
      where: { id: req.params.id },
    });
    if (data == 1) {
      res.send({
        message: "Post was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Post with id=${req.params.id}. Maybe Post was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Post with id=" + req.params.id,
      error: error.message,
    });
  }
};

// Posts/Id - Delete
exports.deletePostById = async (req, res, next) => {
  try {
  } catch (error) {}
};

// Posts/id/comments - Get
exports.getComments = async (req, res, next) => {
  try {
  } catch (error) {}
};

// Posts/id/comments - Post
exports.addComments = async (req, res, next) => {
  try {
  } catch (error) {}
};

// Posts/id/comments/commentId - Get
exports.getCommentById = async (req, res, next) => {
  try {
  } catch (error) {}
};

// Posts/id/comments/commentId - Delete
exports.deleteCommentById = async (req, res, next) => {
  try {
  } catch (error) {}
};

// Posts/id/comments/commentId - Put
exports.updateCommentById = async (req, res, next) => {
  try {
  } catch (error) {}
};

// Posts/id/like - Post
exports.addLike = async (req, res, next) => {
  try {
  } catch (error) {}
};

// Posts/id/like - Delete
exports.removeLike = async (req, res, next) => {
  try {
  } catch (error) {}
};
