const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const GostoPost = sequelize.define(
  "GostoPost",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
    utilizadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "utilizador",
        key: "id",
      },
    },
  },
  {
    tableName: "gostopost",
    timestamps: false,
  }
);

module.exports = GostoPost;
