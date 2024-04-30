const Objective = require("../Models/Objetivos/Objetivos");
const { Op } = require("sequelize");

//ONLY MISS OBJECTIVES FILTER(MORE THAN ONE)
exports.getObjectives = async (req, res, next) => {
  const { offset, length, objectives } = req.query;
  try {
    let query = {};
    if (offset && length) {
      query.offset = parseInt(offset);
      query.limit = parseInt(length);
    }
    if (objectives) {
      const ids = objectives.split(",").map(Number);
      query.where = { id: { [Op.in]: ids } }; 
    }
    const data = await Objective.findAll(query);
    return res.status(200).json({
      success: "Successful request",
      Objectives: data,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};


//DONE
exports.createObjective = async (req, res, next) => {
  const { name, description } = req.body;
  try{
      const data = await Objective.create({
        name,
        description,
      });
      return res.status(201).json({
        success: "Objective created successfully",
        Objective: data,
      });
    }
    catch (error) {
      return res.status(500).json({
        error: "Something went wrong. Please try again later",
      });
    }
};

// DONE
exports.updateObjective = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const objective = await Objective.findByPk(id);
    if (!objective) {
      return res.status(404).json({
        error: "Objective not found",
      });
    } else {
      const data = await Objective.update(
        {
          name,
          description,
        },
        {
          where: { id },
        }
      );
      return res.status(200).json({
        success: "Objective updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getObjective=async(req,res,next)=>{
  const {id}=req.params

  try {
    const objective=await Objective.findByPk(id)
    if(objective){
      return res.status(201).json({
        message:"Successful request",
        Objective:objective
      })
    }else{
      return res.status(404).json({
        error:"Provided objective was not found"
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong. Please try again later"
    })
  }
}

// DONE
exports.deleteObjective = async (req, res, next) => {
  try {
    const { id } = req.params;
    const objective = await Objective.findByPk(id);

    if (!objective) {
      return res.status(404).json({
        error: "Provided objective was not found",
      });
    } else {
      const data = await Objective.destroy({
        where: { id },
      });

      res.status(204).json({
        success: "Objective deleted successfully",
      });
    }
  } catch {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later" });
  }
};
