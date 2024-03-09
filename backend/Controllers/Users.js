const {
	User,
	User_Allergies,
	User_Badges,
	Post,
	Allergen,
} = require("../Model/index");
module.exports = {
	getProfile: async (req, res) => {
		// ! DONE
		const user = await User.findByPk(req.params.userId, {
			attributes: {
				exclude: ["password"],
			},
		})
			.then((result) => {
				if (result != null) {
					if (Object.entries(result.dataValues).length != 8) {
						res.status(206).send({
							message: "Successfull request (Partial Data)",
							details: result,
						});
					} else {
						res.status(200).json(result);
					}
				} else {
					res.status(404).send({ message: "User not found." });
				}
			})
			.catch((err) => res.status(500).send({ error: err.message }));
	},
	getOwnProfile: async (req, res) => {
		try {
			const user = await User.findByPk(res.locals.userId, {
				attributes: {
					exclude: ["password"],
				},
				include: Allergen,
			});

			res.status(200).send({ message: "Perfil foi encontrado", result: user });
		} catch (error) {
			res
				.status(400)
				.send({ message: "Something went wrong...", details: error });
		}
	},
	editProfile: async (req, res) => {
		/*
         * Get user id from middleware
         * Pass changes like ProfileIcon, Name, Password
         !DONE
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
	editUserAllergenLevel: async (req, res) => {
		/*
         * Change Allergen Level to  
            TODO MUDAR CASOS ERROs   
        */

		try {
			const UserId = res.locals.userId;
			const AllergenId = req.body.AllergenId;

			const allergyLevel = req.body.allergyLevel;

			const allergen = await User_Allergies.findOne({
				where: { AllergenId, UserId },
			});

			if (!allergen) {
				res.status(404).send({ message: "Allergen not found..." });
				return;
			}

			allergen.allergyLevel = allergyLevel;

			if (!allergen.changed()) {
				res.status(400).send({ message: "Allergen level was not changed..." });
				return;
			}

			allergen.save();

			res
				.status(200)
				.send({ message: "Allergen Changed...", content: allergen });
		} catch (error) {
			res
				.status(400)
				.send({ message: "Something went wrong...", details: error });
		}
	},
	removeUserAllergen: async (req, res) => {
		/*
		 * Remove allergen
		 */

		const UserId = res.locals.userId;
		const AllergenId = req.body.AllergenId;

		const allergen = await User_Allergies.findOne({
			where: { AllergenId, UserId },
		});

		if (allergen) {
			await allergen
				.destroy()
				.then((result) => {
					if (result) {
						res.status(204).send();
					} else {
						res.status(400).send({ message: "User Allergen not deleted" });
					}
				})
				.catch((err) => {
					res.status(500).send({ error: err.message });
				});
		} else {
			res.status(404).send({ message: "User Allergen not found" });
		}
	},
	addAllergensToUser: async (req, res) => {
		/*
		 * Create allergens in bulk each one with a level "attached"
		 * Recebe AllergenId , AllergyLevel e adiciona userId atraves do locals
		 */

		try {
			const userId = res.locals.userId;

			const allergensArray = req.body;

			allergensArray.forEach((allergen) => {
				allergen.UserId = userId;
			});

			const userAllergies = await User_Allergies.bulkCreate(
				allergensArray,
				{ fields: ["AllergenId", "allergyLevel", "UserId"] },
				{ validate: true },
				{ returning: false }
			);
			if (userAllergies) {
				res.status(201).send({
					message: "Allergens successfully added to user",
					details: userAllergies,
				});
				return;
			} else {
				res.status(400).send({
					message:
						"Allergens were not added to user, probably they are already added",
					details: userAllergies,
				});
				return;
			}
		} catch (error) {
			console.log(error);
			res
				.status(400)
				.send({ message: "Something went wrong...", details: error });
		}
	},
	addBadgeToUser: async (req, res) => {
		//TODO CODIGO E VERIFICAR ERROS

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
		//* DONE AND TESTED
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
