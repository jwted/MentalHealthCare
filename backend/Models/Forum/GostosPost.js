const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const User = require('../Users/Users')
const Post = require('../Forum/Posts')
const Like_Post = sequelize.define(
  "Like_Post",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      references: {
        model: "User",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      references: {
        model: "Post",
        key: "id",
      },
    },
  },
  {
    tableName: "Like_Post",
  } 
);

Like_Post.afterCreate( async (Like_Post,options) =>{
  const post = await Post.findByPk(Like_Post.userId)
  if (post){
    await post.increment('likes', {transaction:options.transaction})
  }
})
Like_Post.afterDestroy( async (Like_Post,options) =>{
  const post = await Post.findByPk(Like_Post.userId)
  if (post){
    await post.decrement('likes', {transaction:options.transaction})
  }
})
Like_Post.sync({"logging":false})
module.exports = Like_Post;
