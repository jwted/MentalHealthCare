// Middleware for validating offset and length
exports.offsetLengthValidation = (req, res, next) => {
  const { offset, length } = req.query;
  if ((offset && !length) || (!offset && length)) {
    return res.status(400).json({
      error:
        "Incorrect query use(you must use offset and length at the same time)",
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
  
  const type = Object.keys(req.query)[0];
  if (type && type != 'offset' && type !='length'){

    let content
    switch (type) {
      case 'user':
        content = req.query.user
        break;
      case 'objective':
        content = req.query.objective
        break;
          
      case 'activity':
        content = req.query.activity
        break;
      
      case 'badge':
        content = req.query.badge
        break;
      
      case 'resource':
        content = req.query.resource
        break;
          
      case 'post':
        content = req.query.post
        break;
      
        case 'diary':
        content = req.query.diary
        break;
          
      case 'category':
        content = req.query.category
        break;
          
      default:
        res.status(400).send({message:'Incorrect query use. Please consult the api documentation.'})
        return  
        
            
    }
    let errorMessages = [];
    
    if (content.length === 0) {
      errorMessages.push('No IDs were provided, but the query was used');
    }
    
    content = content.split(',')
    
    if (errorMessages.length === 0) {
      content.forEach(element => {
        if (isNaN(element)) {
          errorMessages.push(`${element} is not a integer`);
        }
      });
    }

    if (errorMessages.length > 0) {
      res.status(400).send({ message: errorMessages.join('. ') });
      return;
    }
    }
  

  next()
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
