const User = require("./Users/Users")
const Activity = require("./Atividades/Atividade")
const Objective = require("./Objetivos/Objetivos")
const Category = require("./Categorias/Category")
const Badge = require("./Badges/Badge")
const User_Badge = require("./Badges/BadgeUtilizador")
const Category_Objective = require("./Categorias/Category_Objective")
const Category_Activity = require("./Categorias/Category_Activity")
const Diary = require("./Diarios/Diario")
const Comment = require("./Forum/Comentario")
const Post = require("./Forum/Posts")
const Like_Post = require("./Forum/GostosPost")
const Like_Activity = require("./Gostos/GostosAtividade")
const Report = require("./Forum/report")
const Objective_Activity = require("./Atividades/Objective_Activity")
const User_Activity = require('./Atividades/User_Activity')
const Resource = require('./Recursos/Recurso')
const Progress = require("./Progresso/Progresso")

User.hasMany(Report);
Report.belongsTo(User);

Objective.hasMany(Resource);
Resource.belongsTo(Objective);

// Activity.belongsToMany(User, { through: User_Activity, foreignKey:'activityId' });
// User.belongsToMany(Activity, { through: User_Activity ,  foreignKey:'userId'});

// Não gosto, mas ok por agora
Activity.hasMany(User_Activity, {foreignKey:'activityId'} );
User_Activity.belongsTo(Activity, {foreignKey:'activityId'} );

User.hasMany(User_Activity, {foreignKey:'userId'} );
User_Activity.belongsTo(User, {foreignKey:'userId'} );
//////////////////////////////////////

Badge.belongsToMany(User, { through: User_Badge });
User.belongsToMany(Badge, { through: User_Badge });

Activity.belongsToMany(Category, { through: Category_Activity, as: 'categories', foreignKey: 'activityId' });
Category.belongsToMany(Activity, { through: Category_Activity, as: 'activities', foreignKey: 'categoryId' });

Objective.belongsToMany(Category, { through: Category_Objective, as: 'categories', foreignKey: 'objectiveId' });
Category.belongsToMany(Objective, { through: Category_Objective, as: 'objectives', foreignKey: 'categoryId' });

Objective.belongsToMany(Activity, { through: Objective_Activity, as: 'activities', foreignKey: 'objectiveId' });
Activity.belongsToMany(Objective, { through: Objective_Activity, as: 'objectives', foreignKey: 'activityId' });

Post.hasMany(Comment, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});
Post.hasMany(Like_Post, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});
Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post);
Comment.belongsTo(Post);
User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
  Activity,
  Category,
  Badge,
  User_Badge,
  Diary,
  Comment,
  Like_Post,
  Post,
  Like_Activity,
  Report,
  Objective,
  Progress,
  User,
  User_Activity,
  Objective_Activity,
  Category_Activity,
  Category_Objective,
  Resource
};
