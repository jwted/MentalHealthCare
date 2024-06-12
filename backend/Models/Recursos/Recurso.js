const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Recurso = sequelize.define(
  "Resource",
  {
    objectiveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Objective",
        key: "id",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Resource",
  } 
);
Recurso.sync({"logging":false})
module.exports = Recurso;