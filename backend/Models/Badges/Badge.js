const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Badge = sequelize.define(
  "Badge",
  {
    id: {
      type: DataTypes.INTERGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Imagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "badge",
    timestamps: false,
  }
);

module.exports = Badge;
