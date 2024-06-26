const {
  User,
  User_Badges,
  Post,
  Report,
  Progress,
  Objective,
  Category,
  Activity,
  Objective_Activity,
  User_Activity,
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

  deleteUser: async (req, res) => {
    //!DONE AND TESTED
    try {
      const user = await User.findByPk(req.params.userId);
      if (user) {
        await user.destroy();
        res.status(204).send({ message: "User successfully deleted" });
      } else {
        res.status(404).send({ message: "User not found. Invalid ID." });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
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

  //DONE
  getUserObjectives: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: "User provided was not found" });
      }

      const data = await Progress.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: Objective,
            include: [
              {
                model: Category,
                as: "categories",
              },
              {
                model: Activity,
                as: "activities",
              },
            ],
          },
        ],
      });
      if (data) {
        res.status(200).send({
          message: "User objectives retrieved successfully",
          content: data,
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  },

  reportUser: async (req,res,next) =>{
    try{
      const {userId} = req.params
      const creatorId = res.locals.userId
      const {reason}=req.body
      
      const user = await User.findByPk(id)
  
      if(!user){
        return res.status(404).send({message:'User not found.'})
      }    
  
  
      const data = await Report.create({
        creatorId:creatorId,
        reason:reason,
        userReportedId:+userId
      })
      if(data){
        return res.status(201).send({message:'Report created successfully', data:data})
      }
    }catch(error){
      return res.status(500).send({message:'Something went wrong'})
    }
  },
  
  

  //DONE
  deleteObjectiveFromUser: async (req, res) => {
    try {
      const { userId, objectiveId } = req.params;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: "User provided was not found" });
      }

      const objective = await Objective.findByPk(objectiveId);
      if (!objective) {
        return res
          .status(404)
          .send({ message: "Objective provided was not found" });
      }

      const progress = await Progress.findOne({
        where: {
          userId: userId,
          objectiveId: objectiveId,
        },
      });

      if (!progress) {
        return res
          .status(404)
          .send({ message: "Objective is not assigned to user" });
      }

      await progress.destroy();

      res.status(204).send({
        message: "Objective successfully removed from user",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  },
  
};

