const db = require("../Models/Posts/Posts")
const Post = db.posts

// Posts - Get
exports.getPosts = async (req, res, next) => {
    try {
        Post.findAll().then(data=> {
            res.send(data)
        })
        
    } catch (error) {
        
    }
}

// Posts - Post
exports.postPosts = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/Id - Get
exports.getPostById = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/Id - Put 
exports.updatePostById = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/Id - Delete
exports.deletePostById = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/id/comments - Get
exports.getComments = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/id/comments - Post
exports.addComments = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}


// Posts/id/comments/commentId - Get
exports.getCommentById = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/id/comments/commentId - Delete
exports.deleteCommentById = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/id/comments/commentId - Put
exports.updateCommentById = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/id/like - Post
exports.addLike = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// Posts/id/like - Delete
exports.removeLike = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

