const sequelize = require("../../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");

const Progress = sequelize.define(
  "Progress",
   {
    objectiveId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        references: {
            model: "Objective",
            key: "id",
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        references: {
            model: "User",
            key: "id",
        },
    },
    endDate: {
        type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isSameOrFutureAsStartDate(value) {
        const endDate = parseDate(value);
        if (endDate < new Date()) {
          throw new Error('End date must be today or in the future');
        }
      },
      isSameOrAfterStartDate(value) {
        const startDate = parseDate(this.beginningDate);
        const endDate = parseDate(value);
        if (endDate < startDate) {
          throw new Error('End date must be the same day or after the start date');
        }
      },
    },
    },
    beginningDate: {
        type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isFuture(value) {
        const startDate = parseDate(value);
        if (startDate < new Date()) {
          throw new Error('Start date must be today or in the future');
        }
      },
    },
    },
    /* estado: {
        type: DataTypes.STRING,
        allowNull: false,
    }, */
    
  },
  {
    tableName: "Progress",
  } 
);

// Helper function to parse date in DD/MM/YYYY format
function parseDate(dateString) {  
    const parts = dateString.split('/');
    // month is 0-indexed in JavaScript Date object, so subtract 1 from month
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
Progress.sync({"logging":false})
module.exports = Progress;