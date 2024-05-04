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
    },
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	updatedAt:{
		type: DataTypes.DATE,
		allowNull:false,
		defaultValue:DataTypes.NOW
	}
},{
	tableName:'Category'
});


///fazer atividades herdarem categoria dos objectivos ???

Category.sync({ logging: false });

module.exports = Category;
