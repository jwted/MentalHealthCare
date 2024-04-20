const db = require("../Models/Forum/Posts");
const Post = db.Post;
const Comment = db.Comment;
const like = db.Like_Post;

// Posts - Get
exports.getPosts = async (req, res, next) => {
  try {
    const { offset, length } = req.query;

    if (offset && length) {
      if (offset == NaN || length == NaN) {
        return res.status(400).json({
          error: "Only numbers are allowed",
        });
      } else if ((offset && !length) || (!offset && length)) {
        return res.status(400).json({
          error:
            "Incorrect query use(you must use offset and length at the same time",
        });
      } else {
        const data = await Post.findAll({
          offset: parseInt(offset),
          limit: parseInt(length),
        });
        res.status(200).json({
          success: "Successful request",
          Posts: data,
        });
      }
    } else {
      const data = await Post.findAll();
      res.status(200).json({
        success: "Successful request",
        Posts: data,
      });
    }
  } catch {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later" });
  }
};

//Posts - Post
exports.postPosts = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(401).json({
        error: "Missing field text",
      });
    } else if (text == "" || typeof text !== "string") {
      res.status(401).json({
        error: "Invalid field text",
      });
    } else {
      const data = await Post.create({
        userId: req.user.id,
        text: text,
        date: new Date(),
        likes: 0,
      });
      res.status(201).json({
        success: "Post created successfully",
        Post: data,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later",
    });
  }
};

// Posts/Id - Get
exports.getPostById = async (req, res, next) => {
  try {
    const data = await Post.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({
        error: "Provider postId was not found",
      });
    } else {
      res.status(200).json({
        success: "Successful request",
        Post: data,
      });
      next();
    }
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
      res.status(200).json({
        success: "Post was updated successfully.",
      });
    } else {
      res.status(404).json({
        error: "Provided post was not found",
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
    const data = await Post.destroy({
      where: { id: req.params.id },
    });
    if (data == 1) {
      res.status(204).json({
        success: "Successful Delete request!",
      });
    } else {
      res.status(404).json({
        error: "Provided post was not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later",
    });
  }
};

// Posts/id/comments - Get
exports.getComments = async (req, res, next) => {
  try {
    const { offset, length } = req.query;
    const { id } = req.params;

    if (Post.findByPk(id) == null) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      if (offset && length) {
        if (offset == NaN || length == NaN || offset == "" || length == "") {
          return res.status(400).json({
            error: "Only numbers are allowed",
          });
        } else {
          const data = await Comment.findAll({
            where: { postId: id },
            offset: parseInt(offset),
            limit: parseInt(length),
          });
          res.status(200).json({
            success: "Successful request",
            Comments: data,
          });
        }
      } else if ((offset && !length) || (!offset && length)) {
        return res.status(400).json({
          error:
            "Incorrect query use(you must use offset and length at the same time",
        });
      } else {
        const data = await Comment.findAll({
          where: { postId: id },
        });
        res.status(200).json({
          success: "Successful request",
          Comments: data,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

// Posts/id/comments - Post
exports.addComments = async (req, res, next) => {
  try {
    const { userId, text } = req.body;
    const { postId } = req.params;
    if (!postId) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      if (!text || !userId) {
        missingFields = [];
        if (!text) {
          missingFields.push("text");
        }
        if (!userId) {
          missingFields.push("userId");
        }
        res.status(400).json({
          error: "Missing fields, the fields are: " + missingFields.join(", "),
        });
      } else {
        const data = await Comment.create({
          userId: req.user.id,
          postId: id,
          text: text,
          date: new Date(),
        });
        res.status(201).json({
          success: "Successfully created",
          Comment: data,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//Posts/id/comments/commentId - Get
exports.getCommentById = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({
          error: "Provided comment was not found",
        });
      } else {
        res.status(200).json({
          success: "Successful request",
          Comment: comment,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

// Posts/id/comments/commentId - Delete
exports.deleteCommentById = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({
          error: "Provided comment was not found",
        });
      } else {
        const data = await Comment.destroy({
          where: { id: commentId },
        });
        if (data == 1) {
          res.status(204).json({
            success: "Successful Delete request!",
          });
        } else {
          res.status(404).json({
            error: "Provided comment was not found.",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

// Posts/id/comments/commentId - Put
exports.updateCommentById = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { text } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({
          error: "Provided comment was not found",
        });
      } else {
        const data = await Comment.update(req.body, {
          where: { id: commentId },
        });
        if (data == 1) {
          res.status(200).json({
            success: "Comment was updated successfully.",
          });
        } else {
          res.status(404).json({
            error: "Provided comment was not found",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

// Posts/id/like - Post
exports.addLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      const data = await like.create({
        userId: req.user.id,
        postId: postId,
      });
      res.status(201).json({
        success: "Successfully created",
        like: data,
      });
    }
    
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

// Posts/id/like - Delete
exports.removeLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      const data = await like.destroy({
        where: { userId: req.user.id, postId: postId },
      });
      if (data == 1) {
        res.status(204).json({
          success: "Successful Delete request!",
        });
      } else {
        res.status(404).json({
          error: "Provided like was not found.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};
