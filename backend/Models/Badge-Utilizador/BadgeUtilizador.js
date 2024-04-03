const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const BadgeUtilizador = sequelize.define(
  "BadgeUtilizador",
  {
    badgeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "badge",
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
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "badgeutilizador",
    timestamps: false,
  }
);

module.exports = BadgeUtilizador;
