const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");

const User_Activity = sequelize.define(
  "User_Activity",
  {
    userId:{
      type:DataTypes.INTEGER,
       
          references: {
              model: "User",
              key: "id"
          }, 
     },
     activityId:{
      type:DataTypes.INTEGER,
           references: {
              model: "Activity",
              key: "id"
          }, 
     },
     progressId:{
      type:DataTypes.INTEGER,

      references: {
        model: "Progress",
        key: "id"
      }
     }
  },
  {
    tableName:'User_Activity'
  }
);

User_Activity.sync({"logging":false})
module.exports = User_Activity;
