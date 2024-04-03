const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Recurso = sequelize.define(
  "Recurso",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    objetivoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "objetivo",
        key: "id",
      },
    },
    descrição: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "recurso",
    timestamps: false,
  }
);

module.exports = Recurso;
