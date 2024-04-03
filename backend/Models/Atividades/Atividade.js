const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Atividade = sequelize.define(
  "Atividade",
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
    objetivoId: {
      type: DataTypes.INTERGER,
      allowNull: false,
      references: {
        model: "objetivo",
        key: "id",
      },
    },
  },
  {
    tableName: "atividade",
    timestamps: false,
  }
);

module.exports = Atividade;
