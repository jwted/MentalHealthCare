const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

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
  },
  {
    tableName: "Like_Post",
  } 
);
Like_Post.sync({"logging":false})
module.exports = Like_Post;
