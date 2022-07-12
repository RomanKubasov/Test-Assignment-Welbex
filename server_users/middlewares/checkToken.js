const jwt = require('jsonwebtoken');
require("dotenv").config();

const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;

  /* check token found */
  if (!token) {
    return res.status(402).json({error: "Token not found"});
  }

  /* check token is correct */ 
  try {
    const user = jwt.verify( token, process.env.JWT_ACCESS_SECRET );
    const { login, role_id } = user;
    req.user = { login, role_id };
  } catch(err) {
    return res.status(403).json({error: "Token is incorrect"});
  }

  return next();
}

module.exports = checkToken;
