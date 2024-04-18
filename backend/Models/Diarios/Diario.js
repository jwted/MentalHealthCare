const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Diario = sequelize.define(
  "Diary",
  {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
    },
    pensamentos: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sentimentos: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    conquistas: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    outrasObservacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  },
  {
    tableName: "Diary",
  } 
);
Diario.sync({"logging":false})
module.exports = Diario;