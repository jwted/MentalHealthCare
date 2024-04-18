const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");

const Activity = sequelize.define(
  "Activity",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName:'Activity'
  }
);

Activity.sync({"logging":false})
module.exports = Activity;
