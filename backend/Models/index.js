//USER RELATED
/* const User = require("./Users/Users");
const Objective = require('./Objetivos/Objetivos')
const Activity = require('./Atividades/Atividade')
const Category = require('./Categorias/Categorias')
const Post = require('./Forum/Posts')
const Comments = require('./Forum/Comentario')
const U ser_Objetives = require("./Objetivos/User_Objectives")
const User_Badges = require("./Badges/BadgeUtilizador") */
//
/* const User_Badge = require("./Badges/BadgeUtilizador"); */ // Scans of the users

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






/* User.belongsToMany(Objective, { through: 'UserObjective' });
Objective.belongsToMany(User, { through: 'UserObjective' });

Objective.belongsToMany(Activity, { through: 'ObjectiveActivity' });
Activity.belongsToMany(Objective, { through: 'ObjectiveActivity' });

Objective.belongsToMany(Category, { through: 'ObjectiveCategory' });
Category.belongsToMany(Objective, { through: 'ObjectiveCategory' });

Activity.belongsToMany(Category, { through: 'ActivityCategory' });
Category.belongsToMany(Activity, { through: 'ActivityCategory' }); */

User.hasMany(Report)
Report.belongsTo(User)

Objective.hasMany(Resource)
Resource.belongsTo(Objective)



Activity.belongsToMany(User, { through: User_Activity });
User.belongsToMany(Activity, { through: User_Activity });

//BADGES
Badge.belongsToMany(User, { through: User_Badge });
User.belongsToMany(Badge, { through: User_Badge });


Activity.belongsToMany(Category, { through: Category_Activity });
Category.belongsToMany(Activity, { through: Category_Activity });

Objective.belongsToMany(Category, { through: Category_Objective });
Category.belongsToMany(Objective, { through: Category_Objective });


Objective.belongsToMany(Activity, { through: Objective_Activity });
Activity.belongsToMany(Objective, { through: Objective_Activity });


/* User.belongsToMany(Objective, { through: Progress});
Objective.belongsToMany(User, { through: Progress });
 */
// 1 Post : N Comments
Post.hasMany(Comment, {
	onDelete: "CASCADE", // This will automatically delete children when a father is deleted
	foreignKey: {
		allowNull: false,
		// other constraints or options
	},
});
Post.belongsTo(User, {foreignKey:'userId'})
User.hasMany(Post)
Comment.belongsTo(Post);
User.hasMany(Comment)
Comment.belongsTo(User)





/* const Post = require("./Forum/Posts");
const Post_Like = require("./Forum/Posts_Likes"); // Relation Table with the user who liked the post and the post wicht has the like
const Comments = require("./Forum/Comments");
const Comment_Like = require("./Forum/Comment_Likes");
 */

//REPORT
//const Report = require("./Reports");


//Badges
//const Badge = require("./Badges/Badges");

//Categories
//const Category = require("./Category");

//RELATIONSHIPS

/* 
// 1 Post : N Comments
Post.hasMany(Comments, {
	onDelete: "CASCADE", // This will automatically delete children when a father is deleted
	foreignKey: {
		allowNull: false,
		// other constraints or options
	},
});
Post.belongsTo(User, {foreignKey:'UserId'})
User.hasMany(Post)
Comments.belongsTo(Post);
User.hasMany(Comments)
Comments.belongsTo(User)
 */






module.exports = {
	Activity,
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
};
