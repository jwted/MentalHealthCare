const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");

const Objective_Activity = sequelize.define(
  "Objective_Activity",
  {
   objectiveId:{
    type:DataTypes.INTEGER,
    allowNull: false,
        references: {
            model: "Objective",
            key: "id"
        },
   },
   activityId:{
    type:DataTypes.INTEGER,
    allowNull: false,
        references: {
            model: "Activity",
            key: "id"
        },
   }
  },
  {
    tableName:'Objective_Activity'
  }
);

Objective_Activity.sync({"logging":false})
module.exports = Objective_Activity;
