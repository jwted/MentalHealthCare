const { User } = require("../Models/index");
const { compareHash } = require("../Middlewares/bcrypt");
const { SignToken } = require("../Middlewares/jwt");

module.exports = {
  login: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (req.body.password && req.body.email) {
        const passwordIsValid = await compareHash(
          user.password,
          req.body.password
        );

        if (passwordIsValid) {
          console.log("yyyy");
          const token = await SignToken(user.id);

          res.status(201).send({ message: "Success", token: token });
        } else {
          res.status(401).send({ message: "Invalid Credentials" });
        }
      } else {
        res
          .status(400)
          .send({
            message: "Missing fields, Email and Password are Obligatory.",
          });
      }
    } catch (error) {
      res
        .status(500)
        .send({
          message: "Something went wrong. Plese try again later",
          details: error,
        });
    }
  },
  register: async (req, res) => {
    try {
      if (req.body.password && req.body.name && req.body.email) {
        if (await User.findOne({ where: { email: req.body.email } })) {
          res.status(409).send({ message: "Account already exists" });
        } else {
          const user = await User.build({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          await user.save();
          const token = await SignToken(user.id);
          res
            .send({ message: "successuful Register", token: token })
            .status(201);
        }
      } else {
        res
          .status(400)
          .send({
            messsage: "Missing Fields, Email, Password and Name are obligatory",
          });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong", details: error });
    }
  },
};