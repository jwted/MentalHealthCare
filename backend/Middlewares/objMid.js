// Middleware for validating offset and length
exports.offsetLengthValidation = (req, res, next) => {
  const { offset, length } = req.query;
  if ((offset && !length) || (!offset && length)) {
    return res.status(400).json({
      error:
        "Incorrect query use(you must use offset and length at the same time",
    });
  }
  if (offset && length) {
    if (isNaN(offset) || isNaN(length)) {
      return res.status(400).json({
        error: "Only numbers are allowed",
      });
    }
  }
  next();
};

exports.idsValidation = (req, res, next) => {
  const { objectives } = req.query;
  if (objectives) {
    if (isNaN(objectives)) {
      return res.status(400).json({
        error: "Only numbers are allowed",
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

exports.objectiveValidation = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: "Name and description are required",
    });
  } else if ((!name && description) || (name && !description)) {
    return res.status(400).json({
      error: "Name and description are required",
    });
  } else {
    next();
  }
};