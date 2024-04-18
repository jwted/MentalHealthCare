const sequelize = require('../../sequelizeconnection')
const { Sequelize, DataTypes } = require('sequelize')
const User = require('../Users/Users')


const Post = sequelize.define('Post', {
    
    text:{
        type:DataTypes.TEXT('medium'),
        allowNull: false,
        //collate:'utf8_general_ci'
    },
    
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'User',
            key: "id"
        }
    },
    
    likes:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},{
    tableName:'Post'
})
Post.sync({logging:false})
module.exports = Post