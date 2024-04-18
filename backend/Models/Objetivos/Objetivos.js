const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Objective = sequelize.define(
  "Objective",
  {
    name:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
  },
  {
    tableName: "Objective",
  } 
);
Objective.sync({"logging":false})
module.exports = Objective;
