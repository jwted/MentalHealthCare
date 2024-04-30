const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");

const Objectives = sequelize.define(
  "Objective",
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Objective",
  }
);
Objectives.sync({ logging: false });
module.exports = Objectives;
