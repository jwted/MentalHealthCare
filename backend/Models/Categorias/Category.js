const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelizeconnection");

const Category = sequelize.define("Category", {
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
    objectiveId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Objective',
            key: "id"
        }
    }
	
},{
	tableName:'Category'
});


///fazer atividades herdarem categoria dos objectivos ???

Category.sync({ logging: false });

module.exports = Category;
