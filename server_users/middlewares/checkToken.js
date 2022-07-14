const jwt = require('jsonwebtoken');
const { findToken } = require('../tokens/tokens');
require("dotenv").config();

const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;

  /* check token found */
  if (!token) {
    return res.status(402).json({error: "Token not found"});
  }

  /* check if token is correct*/ 
  try {
    const user = jwt.verify( token, process.env.JWT_ACCESS_SECRET );
    const { login, role_id } = user;
    const result = await findToken(token);
    if (result) {
      req.user = { login, role_id };
      return next();
    }
    return res.status(403).json({error: "Token is incorrect"});
  } catch(err) {
    return res.status(403).json({error: "Token is incorrect"});
  }
}

module.exports = checkToken;
