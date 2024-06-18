const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");
const User = require("../Users/Users");
const Activity = require("../Atividades/Atividade");

const User_Activity = sequelize.define(
  "User_Activity",
  {
    userId: {
      type: DataTypes.INTEGER,

      references: {
        model: "User",
        key: "id",
      },
    },
    activityId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Activity",
        key: "id",
      },
    },
    progressId: {
      type: DataTypes.INTEGER,

      references: {
        model: "Progress",
        key: "id",
      },
    },
  },
  {
    tableName: "User_Activity",
  }
);
User_Activity.afterCreate(async (User_Activity, options) => {
  const activity = await Activity.findByPk(User_Activity.activityId);
  const user = await User.findByPk(User_Activity.userId);
  if (activity && user) {
    await user.increment("points", {
      by: activity.points,
      transaction: options.transaction,
    });
  }
});

User_Activity.beforeDestroy(async (User_Activity, options) => {
  const user = await User.findByPk(User_Activity.userId);
  const activity = await Activity.findByPk(User_Activity.activityId);

  if (user && activity) {
    await user.decrement("points", {
      by: activity.points,
      transaction: options.transaction,
    });
  }
});



User_Activity.sync({ logging: false });
module.exports = User_Activity;
