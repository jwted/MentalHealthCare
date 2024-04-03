const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Report = sequelize.define(
  "Report",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
    utilizadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "utilizador",
        key: "id",
      },
    },
    comentarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "comentario",
        key: "id",
      },
    },

    utilizadorReportadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "utilizador",
        key: "id",
      },
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "reports",
    timestamps: false,
  }
);

module.exports = Report;
