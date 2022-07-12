const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('../db/models');
require("dotenv").config();

const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    try {
      let { login, pass } = req.body;
      
      /* check if user with this Login exists */
      const currentUser = await users.findOne({ where: { login } });
      if (!currentUser) {
        return res.status(400).json({error: "Login is incorrect"}); 
      }

      /* check if password is correct */
      const validationPass = await bcrypt.compare(pass, currentUser.pass);
      if (!validationPass) {
        return res.status(401).json({error: "Password is incorrect"});  
      }

      /* create Access JWT */
      const { role_id } = currentUser;
      const accessToken = await jwt.sign(
        { login, role_id },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
  
      return res.json({
        accessToken,
      });
    }
    catch(err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  });

module.exports = router;
