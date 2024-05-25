const Post = require("../Models/Forum/Posts");
const Comment = require("../Models/Forum/Comentario");
const like = require("../Models/Forum/GostosPost");
const { Op } = require("sequelize");

exports.bodyValidation = (req, res, next) => {
  const { text, userId } = req.body;
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
    next();
  }
};

exports.idValidation = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      error: "Missing post id",
    });
  } else {
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      next();
    }
  }
};

// DONE
exports.getPosts = async (req, res, next) => {
  const { offset, length, posts } = req.query;
  try {
    if (offset && length) {
      if (posts) {
        const ids = posts.split(",").map(Number);
        const data = await Post.findAll({
          where: { id: { [Op.in]: ids } },
          offset: parseInt(offset),
          limit: parseInt(length),
        });
        return res.status(200).json({
          success: "Successful request",
          Posts: data,
        });
      } else {
        const data = await Post.findAll({
          offset: parseInt(offset),
          limit: parseInt(length),
        });
        return res.status(200).json({
          success: "Successful request",
          Posts: data,
        });
      }
    }
    if (posts) {
      const ids = posts.split(",").map(Number);
      const data = await Post.findAll({
        where: { id: { [Op.in]: ids } },
      });
      return res.status(200).json({
        success: "Successful request",
        Posts: data,
      });
    } else {
      const data = await Post.findAll();
      return res.status(200).json({
        success: "Successful request",
        Posts: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.postPosts = async (req, res, next) => {
  const { userId, text } = req.body;
  try {
    const data = await Post.create({
      userId: userId,
      text: text,
      likes: 0,
    });
    res.status(201).json({
      success: "Successfully created",
      Post: data,
    });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later",
    });
  }
};

// DONE
exports.getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Post.findByPk(id);
    if (data == null) {
      res.status(404).json({ message: "Provided post was not found" });
    } else {
      res.status(200).json({ message: "Successful request", Post: data });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later" });
  }
};

// Done
exports.updatePostById = async (req, res, next) => {
  const { userId, text } = req.body;
  const { id } = req.params;
  try {
    const data = await Post.update(
      { userId: userId, text: text },
      {
        where: { id: id },
      }
    );
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
      error: "Something went wrong. Please try again later",
    });
  }
};

//MISS DELETE LIKES TOO
exports.deletePostById = async (req, res, next) => {
  try {
    const data = await Post.destroy({
      where: {
        id: req.params.id,
      },
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
    console.log(error);
    res.status(500).send({
      error: "Something went wrong. Please try again later",
    });
  }
};

// DONE
exports.getComments = async (req, res, next) => {
  const { offset, length, comments } = req.query;
  const { id } = req.params;
  try {
    let query = {};
    if (comments) {
      const ids = comments.split(",").map(Number);
      query.where = { id: { [Op.in]: ids } };
    }
    if (offset && length) {
      query.offset = parseInt(offset);
      query.limit = parseInt(length);
    }
    const data = await Comment.findAll({ where: { postId: id }, ...query });
    return res.status(200).json({
      success: "Successful request",
      Comments: data,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

// DONE
exports.addComments = async (req, res, next) => {
  const { userId, text } = req.body;
  const { id } = req.params;
  try {
    console.log("TESTE");
    const data = await Comment.create({
      userId: userId,
      text: text,
      PostId: id,
    });
    res.status(201).json({
      success: "Successfully created",
      Comment: data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getCommentById = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;
    const comment = await Comment.findOne({
      where: { postId: id, id: commentId },
    });
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
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

// NOT DONE
exports.deleteCommentById = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    } else {
      const comment = await Comment.findOne({
        where: { postId: id, id: commentId },
      });
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

// NOT DONE
exports.updateCommentById = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { text } = req.body;
    const post = await Post.findByPk(postId);
    console.log(post);
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

// Not Done
exports.likePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const post= await Post.findByPk(id);
  
    if (!post) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    }
    const userLike = await like.findOne({
      where: { userId: res.locals.userId, postId: id },
    });
    
    if (userLike) {
      await like.destroy({ where: { userId: res.locals.userId, postId: id } });
      res.status(204).json({
        success: "Successfully unliked",
      });
    } else {
    
      const create=await like.create({ userId: res.locals.userId, postId: 1 });
      res.status(201).json({
        success: "Successfully liked",
        content: create,
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};
