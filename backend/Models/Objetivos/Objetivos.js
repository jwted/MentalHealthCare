const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Objetivo = sequelize.define(
  "Objetivo",
  {
    id: {
      type: DataTypes.INTERGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    atividadeId: {
      type: DataTypes.INTERGER,
      allowNull: false,
      references: {
        model: "atividade",
        key: "id",
      },
    },
  },
  {
    tableName: "objetivo",
    timestamps: false,
  }
);

module.exports = Objetivo;
