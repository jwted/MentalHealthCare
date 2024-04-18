const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const UtilizadorAtividade = sequelize.define(
  "User_Activity",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFim: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pontos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "User_Activity",
  } 
);

module.exports = UtilizadorAtividade;
