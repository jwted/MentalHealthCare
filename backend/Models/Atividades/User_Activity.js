const sequelize = require("../../sequelizeconnection");
const { DataTypes } = require("sequelize");
const User = require("../Users/Users");
const Activity = require("../Atividades/Atividade");
const Progress = require('../Progresso/Progresso')
const Badge = require('../Badges/Badge')
const User_Badge = require('../Badges/BadgeUtilizador')
const {Op} = require('sequelize')
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
User_Activity.afterCreate(async (User_Activityobj, options) => {
  const activity = await Activity.findByPk(User_Activityobj.activityId);
  const user = await User.findByPk(User_Activityobj.userId);
  if (activity && user) {
    await user.increment("points", {
      by: activity.points,
      transaction: options.transaction,
    });
  }

  const userProgress = await Progress.findAll({where:{userId:user.id}})
  for (const objective of userProgress) {
    if(objective.state='Valid'){

      const daysPassed = calculateDaysBetweenCurrentAndDate(objective.beginningDate)
      const daysDone = await User_Activity.count({where:{userId:user.id, progressId:objective.id}})
      if(+daysPassed - +daysDone >=2){
        objective.state='Invalid'
        await objective.save()
      }else if(+daysPassed - +daysDone == 0){
        objective.state='Finished'
        await objective.save()
        

      }
    }

  } 
  const userId = user.id;
    
    // Count the number of posts by the user
    const userObjectives = await Progress.count({ where: {  userId:userId, state:'Finished'} });
  
    // Find all badges of type 'posts' where the quantity is less than or equal to the number of user posts
    const badges = await Badge.findAll({
      where: {
        type: 'objectives',
        requirement: {
          [Op.lte]: +userObjectives
        }
      }
    });
    if(badges){

      // Find all badges already assigned to the user
      const userBadges = await User_Badge.findAll({ where: { userId:userId } });
      
      // Extract BadgeIds from userBadges for easier comparison
      const userBadgeIds = userBadges.map(userBadge => userBadge.BadgeId);
      
      // Assign badges to the user if they do not already have them
      for (const badge of badges) {
        if (!userBadgeIds.includes(badge.id)) {
          await User_Badge.create({
          badgeId: badge.id,
          userId: userId,
        });
      }
    }
  }



  
  

    const badgesPoints = await Badge.findAll({where:{
      type:'points',
      requirement:{
        [Op.lte]:user.points
      }
    }})
    if(badgesPoints){
      const userBadges = await User_Badge.findAll({ where: { userId:userId } });
      const userBadgeIdsPoints = userBadges.map(userBadge => userBadge.badgeId);
      
      // Assign badges to the user if they do not already have them
      for (const badge of badgesPoints) {
        if (!userBadgeIdsPoints.includes(badge.id)) {
          await User_Badge.create({
          badgeId: badge.id,
          userId: userId,
        });
      }
    }
  }


  
});

User_Activity.afterDestroy(async (User_Activity, options) => {
  const user = await User.findByPk(User_Activity.userId);
  const activity = await Activity.findByPk(User_Activity.activityId);

  if (user && activity) {
    await user.decrement("points", {
      by: activity.points,
      transaction: options.transaction,
    });
  }
  
});

function calculateDaysBetweenCurrentAndDate(dateString) {
  const currentDate = new Date();
  const comparisonDate = new Date(dateString);

  const timeDifference = comparisonDate - currentDate;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  const inclusiveDaysDifference = Math.abs(daysDifference);

  return inclusiveDaysDifference;
}
User_Activity.sync({ logging: false });
module.exports = User_Activity;
