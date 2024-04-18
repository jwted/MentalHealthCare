const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Like_Activity = sequelize.define(
  "Like_Activity",
  {
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Activity",
        key: "id",
      },
      primaryKey:true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      references: {
        model: "User",
        key: "id",
      },
    },
  },  
  {
    tableName: "Like_Activity",
  } 
);
Like_Activity.sync({"logging":false})
module.exports = Like_Activity;
