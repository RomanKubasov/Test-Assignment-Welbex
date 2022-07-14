const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addToken } = require('../tokens/tokens');
const { users } = require('../db/models');
require("dotenv").config();

const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    try {
      let { login, email, pass } = req.body;
      
      /* check if user exists (login must be unique, but different users may have the same email) */
      const currentUser = await users.findOne({ where: { login } });
      if (currentUser) {
        return res.status(200).json({error: "User with this login already exists"});
      }

      /* create new user */
      pass = await bcrypt.hash(pass, 10);
      const role_id = 2;
      await users.create({ login, email, pass, role_id });

      /* create Access JWT */
      const accessToken = await jwt.sign(
        { login, role_id },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
  
      await addToken(accessToken);

      res.json({
        accessToken,
      });
    }
    catch(err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  });

module.exports = router;
