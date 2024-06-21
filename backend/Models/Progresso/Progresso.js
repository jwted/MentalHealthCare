const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");

const Progress = sequelize.define(
  "Progress",
  {
    objectiveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Objective",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Valid',
      validate: {
        isIn: [['Valid', 'Invalid', 'Finished']],
      },
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    beginningDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "Progress",
  }
);

// Helper function to parse date in MM/DD/YYYY format
function parseDate(dateString) {
  const parts = dateString.split('/');
  // month is 0-indexed in JavaScript Date object, so subtract 1 from month
  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

Progress.sync({ logging: false });

module.exports = Progress;
