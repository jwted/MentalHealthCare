const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const UtilizadorAtividade = sequelize.define(
  "User_Activity",
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
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Activity",
        key: "id",
      },
      primaryKey:true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "User_Activity",
  } 
);

module.exports = UtilizadorAtividade;
