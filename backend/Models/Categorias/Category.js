const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelizeconnection");

const Category = sequelize.define("Category", {
	name: {
		type: DataTypes.STRING,
		allowNull:false
	},
    
    description:{
        type:DataTypes.STRING,
        allowNull:false
    }
	
},{
	tableName:'Category'
});


///fazer atividades herdarem categoria dos objectivos ???

Category.sync({ logging: false });

module.exports = Category;
