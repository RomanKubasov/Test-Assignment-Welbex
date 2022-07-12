const express = require('express');
const checkToken = require('../middlewares/checkToken')

const router = express.Router();

router.route('/')
  .get(checkToken, async (req, res) => {
    res.json(`Hello ${JSON.stringify(req.user)}`);
  })

module.exports = router;
