const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelizeconnection");

const Category_Activity = sequelize.define("Category_Activity", {
	activityId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Activity',
            key: "id"
        }
    },
	categoryId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Category',
            key: "id"
        }
    },
	
},{
	tableName:'Category_Activity'
});


Category_Activity.sync({ logging: false });

module.exports = Category_Activity;
