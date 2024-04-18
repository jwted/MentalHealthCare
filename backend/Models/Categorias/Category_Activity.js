const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelizeconnection");

const Category_Activity = sequelize.define("Category_Activity", {
	 name: {
		type: DataTypes.STRING,
		allowNull:false
	},
	activityId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Activity',
            key: "id"
        }
    },
	cateogryId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Category',
            key: "id"
        }
    },
	
},{
	tableName:'Category_Activity'
});


///fazer atividades herdarem categoria dos objectivos ???

Category_Activity.sync({ logging: false });

module.exports = Category_Activity;
