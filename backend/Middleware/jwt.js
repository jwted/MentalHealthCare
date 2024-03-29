const jwt = require("jsonwebtoken");
const { User } = require("../Models/index");
const secret = process.env.JWT_Secret;

module.exports = {
	verifyUser: async (req, res, next) => {
		//Get Token
		let bearer;
		try {
			bearer = req.headers.authorization.split(" ")[1];
			jwt.verify(bearer, secret);
		} catch (error) {
			res.status(401).send({ message: "Token failed verification" });
			return;
		}

		try {
			const payload = jwt.decode(bearer, secret);

			console.log(payload);

			const user = await User.findByPk(payload.id);

			if (user != null) {
				res.locals.userId = payload.id;
				next();
			} else {
				res.status(401).send({ message: "User does not exist" });
			}
		} catch (error) {
			res
				.status(400)
				.send({ message: "Something went wrong...", details: error });
		}
	},
	verifyAdmin: async (req, res, next) => {
		//Get Token

		let bearer;

		try {
			bearer = req.headers.authorization.split(" ")[1];

			jwt.verify(bearer, secret);
		} catch (error) {
			res.send({ message: "Token failed verification" }).status(401);
			return;
		}

		try {
			const payload = jwt.decode(bearer, secret);

			console.log(payload);

			const user = await User.findByPk(payload.id);

			if (user != null) {
				if (user.admin == true) {
					res.locals.userId = payload.id;
					next();
				} else {
					res.status(403).send({ message: "User is not an admin" });
					return;
				}
			} else {
				res.status(401).send({ message: "User does not exist" });
				return;
			}
		} catch (error) {
			res
				.status(400)
				.send({ message: "Something went wrong...", details: error });
		}
	},

	
	SignToken: async (userId) => {
		const payload = { id: userId };

		const token = await jwt.sign(payload, secret);

		jwt.decode(token);

		return token;
	},
};
