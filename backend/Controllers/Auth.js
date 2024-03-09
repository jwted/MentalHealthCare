const { User } = require("../Models/index");
const { compareHash } = require("../Middleware/bcrypt");
const { SignToken } = require("../Middleware/jwt");

module.exports = {
	login: async (req, res) => {
		try {
			const user = await User.findOne({ where: { email: req.body.email } });

			const passwordIsValid = await compareHash(
				user.password,
				req.body.password
			);

			if (passwordIsValid) {
				const token = await SignToken(user.id);

				res.status(200).send({ message: "successuful login", token: token });
			} else {
				res.status(400).send({ message: "Password is not correct" });
			}
		} catch (error) {
			console.log("🚀 ~ file: Auth.js:28 ~ login: ~ error:", error);

			res.status(400).send({ message: "Email não existe...", details: error });
		}
	},
	register: async (req, res) => {
		try {
			const user = await User.build({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			});

			await user.save();

			const token = await SignToken(user.id);		
			res.send({ message: "successuful Register", token: token }).status(200);
		} catch (error) {
			res.status(400).send({ message: "Something went wrong", details: error });
		}
	},
};
