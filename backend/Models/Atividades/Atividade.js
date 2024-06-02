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
    },
    timesPerDay:{
      type:DataTypes.INTEGER,
      defaultValue:1

    },
    points:{
      type:DataTypes.INTEGER,
      defaultValue:0
    }
  },
  {
    tableName:'Activity'
  }
);

Activity.sync({"logging":false})
module.exports = Activity;
