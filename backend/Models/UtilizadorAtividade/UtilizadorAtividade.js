const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const UtilizadorAtividade = sequelize.define(
  "UtilizadorAtividade",
  {
    utilizadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "utilizador",
        key: "id",
      },
    },
    atividadeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "atividade",
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
    tableName: "utilizadoratividade",
    timestamps: false,
  }
);

module.exports = UtilizadorAtividade;
