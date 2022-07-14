const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.route('/')
  .post((req, res) => {
    const token = req.headers.authorization;

    /* destroy token */     
    try {
      jwt.destroy(token);
    } catch(err) {
      return res.status(405).json({error: "Token is still active"});
    }
  });

module.exports = router;
