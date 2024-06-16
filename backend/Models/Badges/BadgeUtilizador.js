const sequelize = require('../../sequelizeconnection.js')
const { DataTypes } = require('sequelize');

const User = require('../Users/Users.js')
const Badge = require('./Badge.js');

const User_Badges = sequelize.define('User_Badge',
{
    badgeId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
            model:"Badge",
            key:'id'
        }
    },
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
            model:"User",
            key:'id'
        }
    }
}
,{
    tableName:'User_Badge'
}

);

User_Badges.sync({"logging":false})

module.exports = User_Badges