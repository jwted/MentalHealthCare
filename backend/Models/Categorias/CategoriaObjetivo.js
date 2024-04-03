const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const CategoriaObjetivo = sequelize.define(
  "CategoriaObjetivo",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // nome: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    objetivoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "objetivo",
        key: "id",
      },
    },
  },
  {
    tableName: "categoriaobjetivo",
    timestamps: false,
  }
);

module.exports = CategoriaObjetivo;
