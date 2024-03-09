//USER RELATED
const User = require("./Users/Users");

//const User_Badges = require("./Users/User_Badges"); // Scans of the users

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
	User,
};
