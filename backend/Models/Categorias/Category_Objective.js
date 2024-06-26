const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelizeconnection");

const Category_Objective = sequelize.define("Category_Objective", {
	objectiveId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Objective',
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
	tableName:'Category_Objective'
});


///fazer atividades herdarem categoria dos objectivos ???

Category_Objective.sync({ logging: false });

module.exports = Category_Objective;
