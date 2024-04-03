const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Diario = sequelize.define(
  "Diario",
  {
    id: {
      type: DataTypes.INTERGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    utilizadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "utilizador",
            key: "id",
        },
    },
    data: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    pensamentos: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sentimentos: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    conquistas: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    outrasObservacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  },
  {
    tableName: "registrodiario",
    timestamps: false,
  }
);

module.exports = Diario;