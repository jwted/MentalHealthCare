const sequelize = require('../../sequelizeconnection.js')
const { DataTypes } = require('sequelize');

const User = require('../Users/Users.js')
const Badge = require('../Badges/Badge.js');

const User_Badges = sequelize.define('User_Badge',
{
    badgeId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:"Badge",
            key:'id'
        }
    },
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,

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

User_Badges.afterCreate(async (userbadges, options) => {
    const user = await User.findByPk(userbadges.userId)
    if (user) {
      await user.increment("points", {
        by:50,
        transaction: options.transaction,
      });
    }
}),  

User_Badges.sync({"logging":false})

module.exports = User_Badges