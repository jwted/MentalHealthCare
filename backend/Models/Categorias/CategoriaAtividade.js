const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const CategoriaAtividade = sequelize.define(
  "CategoriaAtividade",
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
    atividadeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "atividade",
        key: "id",
      },
    },
  },
  {
    tableName: "categoriaatividade",
    timestamps: false,
  }
);

module.exports = CategoriaAtividade;
