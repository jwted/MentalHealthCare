const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Report = sequelize.define(
  "Report",
  {

    postId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Post",
        key: "id",
      },
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Comment",
        key: "id",
      },
    },

    userReportedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Report",
  } 
);

module.exports = Report;
