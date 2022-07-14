const express = require('express');
const checkToken = require('../middlewares/checkToken');
const { deleteToken } = require('../tokens/tokens');
require('dotenv').config();

const router = express.Router();
router.route('/')
  .post(checkToken, async (req, res) => {
    try {
      const token = req.headers.authorization;

      /* delete Token */
      const result = await deleteToken(token);
      if (result) {
        return res.status(200).json({ message: 'Token destroyed' });
      }
      return res.status(405).json({ error: 'Token is still active' });
    } catch (err) {
      console.log(err);
      return res.status(405).json({ error: 'Token is still active' });
    }
  });

module.exports = router;
