import joi from "joi";

const authsignupmw = async (req, res, next) => {
  //   console.log("middleware mein agaya ");
  const schema = joi.object({
    username: joi.string().min(6).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
  });

  const { error, value } = schema.validate(req.body);
  //   console.log(error, value);
  if (error) {
    return res.status(404).json({
      error: error.details[0].message,
    });
  }
  next();
};
const authloginmw = async (req, res, next) => {
  // console.log("entered in the authlogin ");
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({
      error: error.details[0].message,
    });
  }
  next();
};

export { authloginmw, authsignupmw };
