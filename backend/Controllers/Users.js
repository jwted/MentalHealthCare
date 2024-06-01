const {
  User,
  User_Badges,
  Post,
  Progress,
  Objective,
  Category,
  Activity,
} = require("../Models/index");
const bcrypt = require("bcrypt");

module.exports = {
  getUser: async (req, res) => {
    //!DONE AND TESTED
    try {
      const user = await User.findByPk(req.params.userId, {
        attributes: {
          exclude: ["password"],
        },
      });
      if (user) {
        res
          .status(200)
          .send({ message: "User successfully retrieved", content: user });
      } else {
        res.status(404).send({ message: "User not found. Invalid ID." });
      }
    } catch (error) {
      res.status(500).send({ error: err.message });
    }
  },
  getUsers: async (req, res) => {
    //!DONE AND TESTED
    try {
      const { offset, length, user } = req.query;
      let query = {
        where: {},
        attributes: {
          exclude: ["password"],
        },
      };
      if (offset && length) {
        query.offset = parseInt(offset);
        query.limit = parseInt(length);
      }

      if (user) {
        query.where.id = user.split(",");
      }

      const users = await User.findAll(query);

      if (users) {
        res.status(200).send({
          message: "Successfully found users",
          content: users,
        });
      }
    } catch (error) {
      res.status(500).send({ error: err.message });
    }
  },
  editProfile: async (req, res) => {
    //!DONE AND TESTED
    if (!req.body.name && !req.body.password && !req.body.bio) {
      res
        .status(400)
        .send({ message: "Only name, password and bio can be altered" });
      return;
    }

    const userId = res.locals.userId;
    const user = await User.findByPk(userId);
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
      .update({
        name: req.body.name,
        password: req.body.password,
        bio: req.body.bio,
      })
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
  },

  // Get User Objectives
  getUserObjectives: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const userObjectives = await Progress.findAll({
        where: { userId: userId },
        include: [
          {
            model: Objective,
            include: [
              {
                model: Category,
                as: "categories",
                attributes: ["name"],
              },
              {
                model: Activity,
                as: "activities",
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      res.status(200).json({
        success: "Successfully retrieved user objectives",
        content: userObjectives,
      });
    } catch (error) {
      console.error("Error getting user objectives:", error);
      return res.status(500).json({ error: "Could not get user objectives" });
    }
  },
};
