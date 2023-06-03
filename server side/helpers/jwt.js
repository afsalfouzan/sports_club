const jwt = require("jsonwebtoken");
require('dotenv').config();

const SecretKey=process.env.JWT_SecretKey;

let jwtTokenGeneration = (user) => {
  return jwt.sign(user, SecretKey);
};
let jwtTokenVerify = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token == null)
      throw {
        status: 401,
        message: "unauthorized user",
      };
      

    jwt.verify(token, SecretKey, (err, data) => {
      if (err)
        throw {
          status: 403,
          message: "authentication failed",
        };
      req.data = data;
      next();
    });
  } catch (e) {
    res.status(700).send({
      status: "error",
      message: e.message,
    });
  }
};

module.exports = { jwtTokenGeneration, jwtTokenVerify };
