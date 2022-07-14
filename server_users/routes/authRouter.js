const express = require('express');
const checkToken = require('../middlewares/checkToken');
const { users } = require('../db/models');

const router = express.Router();

router.route('/')
  .post(checkToken, async (req, res) => {
    try {
      /* if token is correct return User */
      const { login } = req.user;
      const currentUser = await users.findOne({ where: { login } });
      /* remove pass and meta data */
      const { id, email, role_id } = JSON.parse(JSON.stringify(currentUser));
      return res.status(200).json({ id, login, email, role_id });
    } catch (err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  });

module.exports = router;
