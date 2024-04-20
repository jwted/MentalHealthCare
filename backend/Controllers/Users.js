const {
	User,
	User_Badges,
	Post,
} = require("../Models/index");
module.exports = {
	getUser: async (req, res) => {
		const user = await User.findByPk(req.params.userId, {
			attributes: {
				exclude: ["password"],
			},
		})
		.then((result) => {
				//console.log(req.params.userId)
				//console.log(result.dataValues)
				if (result.dataValues != null) {	
					if (result.dataValues.id && result.dataValues.name && result.dataValues.email && result.dataValues.type && result.dataValues.points && result.dataValues.bio) {
						res.status(200).json(result);
					} else {
						res.status(206).send({
							message: "Successfull request (Partial Data)",
							details: result,
						});
					}
				} else {
					res.status(404).send({ message: "User not found." });
				}
			})
			.catch((err) => res.status(500).send({ error: err.message }));
	},
	getAllUsers: async (req, res) => {
		const users = await User.findAll({
			attributes: {
				exclude: ["password"],
			},
		})
			.then((result) => {
				if (result != null) {
					if (res.body.id && res.body.name && res.body.email && res.body.admin && res.body.points) {
						res.status(200).json(result);
					} else {
						res.status(206).send({
							message: "Successfull request (Partial Data)",
							details: result,
						});	
					}
				} else {
					res.status(404).send({ message: "User not found." });
				}
			})
			.catch((err) => res.status(500).send({ error: err.message }));
	},
	
	editProfile: async (req, res) => {
		/*
         * Get user id from middleware
         * Pass changes like ProfileIcon, Name, Password
        */

		let userId = res.locals.userId;

		if (req.params.userId == userId) {
			let user = await User.findByPk(userId);
			//Isto não deveria ser necessario ...!
			if (req.body.password) {
				await bcrypt
					.genSalt()
					.then((salt) =>
						bcrypt
							.hash(req.body.password, salt)
							.then((hash) => (req.body.password = hash))
					)
					.catch((err) => err);
			}

			await user
				.update(
					{
						icon: req.body.icon,
						username: req.body.username,
						password: req.body.password,
						updatedAt: req.body.updatedAt,
					},
					{ plain: true }
				)
				.then((result) => {
					if (result) {
						res
							.status(200)
							.send({ message: "User successfully updated", details: result });
					} else {
						res.status(400).send({ message: "User not updated" });
					}
				})
				.catch((err) => {
					res.status(500).send({ error: err.message });
				});
		} else {
			res.status(401).send({ message: "User ID doesn't match" });
		}
	},
	
	
	addBadgeToUser: async (req, res) => {

		const userId = res.locals.userId;

		if (userId == req.params.userId) {
			const badgeArray = req.body;

			badgeArray.forEach((badge) => {
				badge.UserId = res.locals.userId;
			});

			const userBadges = await User_Badges.bulkCreate(
				badgeArray,
				{ field: ["UserId", "BadgeId"] },
				{ validate: true },
				{ returning: false }
			).then((result) => {
				if (result) {
					res
						.status(201)
						.send({ message: "Badge added to user", details: result });
				} else {
					res.status(400).send({ message: "Badge not added to User" });
				}
			});
		} else {
			res.status(401).send({ message: "User ID doesn't match" });
		}
	},

	getUserPosts: async (req, res) => {
		const userId = req.params.userId;
		const userPosts = Post.findAll({
			where: {
				userId: userId,
			},
		});

		if (userPosts) {
			res.status(200).send({ message: "User Posts found", details: userPosts });
		} else {
			res.status(404).send({ message: "User has no posts" });
		}
	},
};
