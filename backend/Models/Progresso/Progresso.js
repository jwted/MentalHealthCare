const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Progresso = sequelize.define(
  "Progresso",
  {
    objetivoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "objetivo",
            key: "id",
        },
    },
    utilizadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "utilizador",
            key: "id",
        },
    },
    dataInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dataFim: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pontos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    tableName: "progresso",
    timestamps: false,
  }
);

module.exports = Atividade;
