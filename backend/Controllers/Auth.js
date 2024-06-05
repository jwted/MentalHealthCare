const { User } = require("../Models/index");
const { compareHash } = require("../Middlewares/bcrypt");
const { SignToken } = require("../Middlewares/jwt");

module.exports = {
  login: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if(!user) return res.status(404).send({message: "User not found"})
      if (req.body.password && req.body.email) {
        const passwordIsValid = await compareHash(
          user.password,
          req.body.password
        );

        if (passwordIsValid) {
          const token = await SignToken(user.id);
          return res.status(200).send({ message: "Success", token: token, user: user.id});
        } else {
          return res.status(401).send({ message: "Invalid Credentials" });
        }
      } else {
        res
          .status(400)
          .send({
            message: "Missing fields, Email and Password are Obligatory.",
          });
      }
    } catch (error) {
      console.log(error)
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
          res
            .send({ message: "successuful Register"})
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