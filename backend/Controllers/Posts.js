const Post = require("../Models/Forum/Posts");
const Comment = require("../Models/Forum/Comentario");
const like = require("../Models/Forum/GostosPost");
const { Op } = require("sequelize");

exports.bodyValidation = (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({
      error: "Missing fields, the fields are required",
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
  
  try {
    const { offset, length, post } = req.query;
    let query = {
      where: {},
    };
    if (offset && length) {
      query.offset = parseInt(offset);
      query.limit = parseInt(length);
    }

    if (post) {
      query.where.id = post.split(",");
    }

    const posts = await Post.findAll(query);

    if (posts) {
      res.status(200).send({
        message: "Successfully found posts",
        content: posts,
      });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong. Please try again later' });
  }
};

//DONE
exports.postPosts = async (req, res, next) => {
  const { text } = req.body;
  try {
    if(!text) res.status(400).send({message:'Missing Field: Text'})
    const data = await Post.create({
      userId: res.locals.userId,
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
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res
        .status(200)
        .send({ message: "Post successfully retrieved", content: post });
    } else {
      res.status(404).send({ message: "Post not found. Invalid ID." });
    }
  } catch (error) {
    res.status(500).send({ error: "Something went wrong. Please try again later", });
  }
};

// Done
exports.updatePostById = async (req, res, next) => {
  if (!req.body.text) {
    res
      .status(400)
      .send({ message: "Only name, password and bio can be altered" });
  }
  const id = req.params.id;
  const post = await Post.findByPk(id);
  try{
    if (post){
      const data = await post.update({
        text:req.body.text
      },{returning:true})
      res.status(200).send({message:'Post successfully updated'})
    }else{
      res.status(404).send({message:'Post not found'})
    }
  }catch(error){
    res.status(500).send({message:'Something went wrong. Please try again later.'})
  }
};

//
exports.deletePostById = async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  try{
    if (post){
      await post.destroy()
      res.status(204).send()
    }else{
      res.status(404).send({message:'Post not found'})
    }
  }catch(error){
    res.status(500).send({message:'Something went wrong. Please try again later.'})
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
  const { text } = req.body;
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({
        error: "Provided post was not found",
      });
    }
    const data = await Comment.create({
      userId: res.locals.userId,
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
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
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

//DONE
exports.updateCommentById = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;
    const { text } = req.body;
    const post = await Post.findByPk(id);
    console.log(post);
    const comment = await Comment.findOne({
      where: { postId: id, id: commentId },
    });
    if (comment) {
      const data = await Comment.update(
        { userId: res.locals.userId, text: text },
        {
          where: { id: commentId },
        }
      );
      if (data == 1) {
        res.status(200).json({
          success: "Comment was updated successfully.",
        });
      } else {
        res.status(404).json({
          error: "Provided comment was not found",
        });
      }
    } else {
      res.status(404).json({
        error: "Provided comment was not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.likePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userLike = await like.findOne({
      where: { userId: res.locals.userId, postId: id },
    });

    if (userLike) {
      await like.destroy({ where: { userId: res.locals.userId, postId: id } });
      res.status(204).json({
        success: "Successfully unliked",
      });
    } else {
      const create = await like.create({
        userId: res.locals.userId,
        PostId: 1,
      });
      res.status(201).json({
        success: "Successfully liked",
        content: create,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};
