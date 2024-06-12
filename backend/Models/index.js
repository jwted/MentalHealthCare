const User = require("./Users/Users");
const Activity = require("./Atividades/Atividade");
const Objective = require("./Objetivos/Objetivos");
const Category = require("./Categorias/Category");
const Badge = require("./Badges/Badge");
const User_Badge = require("./Badges/BadgeUtilizador");
const Category_Objective = require("./Categorias/Category_Objective");
const Category_Activity = require("./Categorias/Category_Activity");
const Diary = require("./Diarios/Diario");
const Comment = require("./Forum/Comentario");
const Post = require("./Forum/Posts");
const Like_Post = require("./Forum/GostosPost");
const Like_Activity = require("./Gostos/GostosAtividade");
const Report = require("./Forum/report");
const Objective_Activity = require("./Atividades/Objective_Activity");
const User_Activity = require('./Atividades/User_Activity');
const Resource = require('./Recursos/Recurso');
const Progress = require("./Progresso/Progresso");

// Configurações de associação com opção onDelete: "CASCADE"
User.hasMany(Report, { onDelete: "CASCADE" });
Report.belongsTo(User);

Objective.hasMany(Resource, { onDelete: "CASCADE" });
Resource.belongsTo(Objective);

Activity.hasMany(User_Activity, { foreignKey: 'activityId', onDelete: "CASCADE" });
User_Activity.belongsTo(Activity, { foreignKey: 'activityId' });

User.hasMany(User_Activity, { foreignKey: 'userId', onDelete: "CASCADE" });
User_Activity.belongsTo(User, { foreignKey: 'userId' });

Objective.hasMany(Progress, { foreignKey: 'objectiveId', onDelete: "CASCADE" });
Progress.belongsTo(Objective, { foreignKey: 'objectiveId' });

User.hasMany(Progress, { foreignKey: 'userId', onDelete: "CASCADE" });
Progress.belongsTo(User, { foreignKey: 'userId' });

Badge.belongsToMany(User, { through: User_Badge, onDelete: "CASCADE" });
User.belongsToMany(Badge, { through: User_Badge });

Activity.belongsToMany(Category, { through: Category_Activity, as: 'categories', foreignKey: 'activityId', onDelete: "CASCADE" });
Category.belongsToMany(Activity, { through: Category_Activity, as: 'activities', foreignKey: 'categoryId', onDelete: "CASCADE" });

Objective.belongsToMany(Category, { through: Category_Objective, as: 'categories', foreignKey: 'objectiveId', onDelete: "CASCADE" });
Category.belongsToMany(Objective, { through: Category_Objective, as: 'objectives', foreignKey: 'categoryId', onDelete: "CASCADE" });

Objective.belongsToMany(Activity, { through: Objective_Activity, as: 'activities', foreignKey: 'objectiveId', onDelete: "CASCADE" });
Activity.belongsToMany(Objective, { through: Objective_Activity, as: 'objectives', foreignKey: 'activityId', onDelete: "CASCADE" });

Progress.hasMany(User_Activity, { onDelete: "CASCADE", foreignKey: 'progressId' });
User_Activity.belongsTo(Progress, { foreignKey: 'progressId' });

Post.hasMany(Comment, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
Post.hasMany(Like_Post, { onDelete: "CASCADE", foreignKey: { allowNull: false } });

Like_Post.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE"});
Like_Post.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Like_Post, { foreignKey: 'postId', onDelete: "CASCADE", allowNull: false });
User.hasMany(Like_Post, { foreignKey: 'userId', onDelete: "CASCADE", allowNull: false });

Post.belongsTo(User, { foreignKey: 'userId', as: 'postCreator', onDelete: "CASCADE" });
User.hasMany(Post, { foreignKey: 'userId', onDelete: "CASCADE" });

Comment.belongsTo(Post);
User.hasMany(Comment, { foreignKey: 'userId', onDelete: "CASCADE" });
Comment.belongsTo(User, { as: 'commentCreator', foreignKey: 'userId', onDelete: "CASCADE" });

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
