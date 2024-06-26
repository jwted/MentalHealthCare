const {
  Activity,
  Category,
  User_Activity,
  User,
  Progress,
} = require("../Models/index");

module.exports = {
  getActivity: async (req, res, next) => {
    //!DONE AND TESTED
    try {
      const activity = await Activity.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            as: "categories",
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (activity) {
        res.status(200).send({
          message: "Activity Sucessfully retrieved",
          content: activity,
        });
      } else {
        res.status(404).send({ message: "Activity not found. Invalid ID" });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong.", error });
    }
  },
  getActivities: async (req, res, next) => {
    //!DONE AND TESTED
    try {
      const { activity, offset, length } = req.query;
      let query = {
        where: {},
        include: [
          {
            model: Category,
            as: "categories",
            through: {
              attributes: [],
            },
          },
        ],
      };

      if (offset && length) {
        query.offset = parseInt(offset);
        query.limit = parseInt(length);
      }
      if (activity) {
        query.where.id = activity.split(",");
      }

      const activities = await Activity.findAll(query);

      if (activities) {
        res.status(200).send({
          message: "Sucessfully found activities",
          content: activities,
        });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong.", error });
    }
  },

  createActivity: async (req, res, next) => {
    //!DONE AND TESTED
    try {
      const { name, description, categoryId,points } = req.body;
      if (!name || !description || !categoryId || !points) {
        const missingFields = [];
        if (!name) missingFields.push("name");
        if (!description) missingFields.push("description");
        if (!categoryId) missingFields.push("categoryId");
        if (!points) missingFields.push("points");

        return res.status(400).json({
          error: `Missing fields: ${missingFields.join(", ")}`,
        });
      }

      const categoriesArr = categoryId.split(",");
      const activity = await Activity.create({ name, description,points });

      if (categoriesArr && categoriesArr.length > 0) {
        const categories = await Category.findAll({
          where: { id: categoriesArr },
        });
        await activity.addCategories(categoriesArr);
      }
      const result = await Activity.findByPk(activity.id, {
        include: [
          {
            model: Category,
            as: "categories",
            through: {
              attributes: [], 
            },
          },
        ],
      });
      res
        .status(201)
        .send({ success: "Activity created successfully", Activity: result });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later" });
    }
  },

  // Patch Activity
  updateActivity: async (req, res, next) => {
    //!DONE AND TESTED
    try {
      const { id } = req.params;
      const { name, description, categoryId } = req.body;
      const activity = await Activity.findByPk(id);

      if (!activity) {
        return res.status(404).json({
          error: "Activity not found",
        });
      } else {
        const data = await Activity.update(
          {
            name,
            description,
            categoryId,
          },
          {
            where: { id },
          }
        );

        if (data[0] === 1) {
          res.status(200).json({
            success: "Activity updated successfully",
          });
        } else {
          res.status(404).json({
            error: "Activity not found",
          });
        }
      }
    } catch {
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later" });
    }
  },

  // Delete Activity
  deleteActivity: async (req, res) => {
    //!DONE AND TESTED
    try {
      const { id } = req.params;
      const activity = await Activity.findByPk(id);

      if (!activity) {
        res.status(404).json({
          error: "Activity not found",
        });
      } else {
        await Activity.destroy({
          where: { id },
        });

        res.status(204).json({
          success: "Activity deleted successfully",
        });
      }
    } catch {
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later" });
    }
  },

  //DONE
  getUserActivities: async (req, res) => {
    try {
      const userActivities = await User_Activity.findAll({
        where: { userId: res.locals.userId },
        include: [
          {
            model: Activity,
          },
        ],
      });

      res.status(200).send({
        success: "User activities retrieved successfully",
        content: userActivities,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Something went wrong", error });
    }
  },

  //DONE
  addActivityToUser: async (req, res, next) => {
    try {
      const { activityId, progressId } = req.body;
      const activity = await Activity.findByPk(activityId);

      if (!activity) {
        return res.status(404).send({ error: "Activity not found" });
      }

      const progress = await Progress.findOne({
        where: {
          id: progressId,
          state:'Valid'
        },
      });

      if (!progress) {
        return res.status(404).send({ error: "User Progress not found! User Progress must exist and be Valid" });
      }

      const userActivity = await User_Activity.create({
        userId: res.locals.userId,
        activityId: activityId,
        progressId: progressId,
      });

      res.status(201).send({
        success: "Activity added to user successfully",
        content: userActivity,
      });
      next()
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: "Something went wrong", error });
    }
  },

    deleteActivityFromUser: async (req, res) => {
    try {
      const { activityId } = req.params;
      const userActivity = await User_Activity.findOne({
        where: { userId: res.locals.userId, activityId: activityId },
      });
      if (!userActivity) {
        return res.status(404).send({ error: "Activity not found" });
      }

      const activity=await Activity.findByPk(activityId)

      const decrementPoints = await User.findByPk(res.locals.userId);

      await User_Activity.destroy({
        where: { userId: res.locals.userId, activityId: activityId },
      });

      await User.update(
        { points: decrementPoints.points - activity.points },
        {
          where: { id: res.locals.userId },
        }
      );
      res.status(204).send({ success: "Activity deleted from user" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Something went wrong", error });
    }
  },
};
