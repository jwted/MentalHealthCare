const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Comentario = sequelize.define(
  "Comment",
  {
    
  text:{
      type:DataTypes.TEXT('medium'),
      allowNull: false
  },
  PostId:{
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "Post",
          key: "id"
        },
  },
  userId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: "User",
        key: "id"
      },
  },
  
  likes:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
  }
  },
  {
    tableName:'Comment'
  }
);
Comentario.sync({"logging":false})
module.exports = Comentario;
