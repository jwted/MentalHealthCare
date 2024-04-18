const sequelize = require('../../sequelizeconnection')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

const User = sequelize.define('User', {
    /* icon:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,

    }, */
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value) {
    
            const hashedPassword =  bcrypt.hashSync(value,10)
        
            this.setDataValue('password', hashedPassword );
        }
    },
    admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },

    points:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},
{
    tableName:'User'
})

User.sync({"logging":false})

module.exports = User