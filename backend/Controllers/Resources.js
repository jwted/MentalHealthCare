const { Resource } = require("../Models/index");

//DONE
exports.getResources = async (req, res) => {
  const { offset, length, resource } = req.query;
  try {
    let query = {
      where: {},
    };
    if (offset && length) {
      query.offset = parseInt(offset);
      query.limit = parseInt(length);
    }
    if (resource) {
      query.where.id = resource.split(",");
    }
    const resources = await Resource.findAll(query);
    if (resources) {
      res.status(200).send({
        message: "Sucessfully found resources",
        content: resources,
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.createResource = async (req, res) => {
  const { objectiveId, description } = req.body;
  try {
    if (!objectiveId || !description) {
      let missing = [];
      if (!objectiveId) {
        missing.push("objectiveId");
      }
      if (!description) {
        missing.push("description");
      }
      return res.status(400).json({
        error: "Missing fields: " + missing.join(", ") + " are required.",
      });
    }

    const resource = await Resource.create({
      objectiveId: objectiveId,
      description: description,
    });
    res.status(201).send({
      message: "Resource created successfully",
      content: resource,
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getResource = async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await Resource.findByPk(id);
    if (resource) {
      res.status(200).send({
        message: "Resource found successfully",
        content: resource,
      });
    } else {
      return res.status(404).json({
        error: "Resource not found",
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.updateResource = async (req, res) => {
  const { id } = req.params;
  const { objectiveId, description } = req.body;
  try {
    const resource = await Resource.findByPk(id);
    if (resource) {
      if (objectiveId) {
        resource.objectiveId = objectiveId;
      }
      if (description) {
        resource.description = description;
      }
      await resource.save();
      res.status(200).send({
        message: "Resource updated successfully",
        content: resource,
      });
    } else {
      return res.status(404).json({
        error: "Resource not found",
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.deleteResource = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await Resource.findByPk(id);
        if (resource) {
        await resource.destroy();
        res.status(204).send({
            message: "Resource deleted successfully",
        });
        } else {
        return res.status(404).json({
            error: "Resource not found",
        });
        }
    } catch {
        return res.status(500).json({
        error: "Something went wrong. Please try again later",
        });
    }
}
