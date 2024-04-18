const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");

const Badge = sequelize.define(
  "Badge",
  {

    /* icon:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    */
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    type:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
          isIn:[['objective','posts','comments','points']]
      }
    },
    requirement:{
      type:DataTypes.INTEGER,
      allowNull:false
    } 
  },
  {
    tableName:'Badge'
  }
);

Badge.sync({"logging":false})

module.exports = Badge;
