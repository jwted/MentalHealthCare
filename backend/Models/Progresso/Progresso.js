const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Progress = sequelize.define(
  "Progress",
   {
    objetiveId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Objective",
            key: "id",
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    /* estado: {
        type: DataTypes.STRING,
        allowNull: false,
    }, */
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    tableName: "Progress",
  } 
);
Progress.sync({"logging":false})
module.exports = Progress;