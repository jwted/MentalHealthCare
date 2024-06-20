const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");
const User_Badge=require("./BadgeUtilizador")

const Badge = sequelize.define(
  "Badge",
  {
     icon:{
      type:DataTypes.BLOB,
      allowNull:false,
    },
    
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
          isIn:[['objective','posts','comments','points','activity','likes']]
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
