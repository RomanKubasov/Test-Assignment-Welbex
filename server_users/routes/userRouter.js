const express = require('express');
const checkAdmin = require('../middlewares/checkAdmin');
const { users } = require('../db/models');

const router = express.Router();

router.route('/')
  .get(checkAdmin, async (req, res) => {
    try {
      const result = await users.findAll();
      /* remove pass and meta data */
      const arrUsers = JSON.parse(JSON.stringify(result))
        .map((el) => ({id: el.id, login: el.login, email: el.email}));
      res.json(arrUsers);
    } catch (err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  })

  .put(checkAdmin, async (req, res) => {
    try {
      const { id, email } = req.body;
      
      /* check if user exists */
      const currentUser = await users.findOne({ where: { id } });
      if (!currentUser) {
        return res.status(400).json({error: "User with this id not found"});
      }
      
      /* update email */
      if (await users.update({ email }, { where: { id } })) {
        return res.sendStatus(200);
      }
    } catch (err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  })
  
  .delete(checkAdmin, async (req, res) => {
    try {
      const { id } = req.body;
      
      
      /* check if user exists */
      const currentUser = await users.findOne({ where: { id } });
      if (!currentUser) {
        return res.status(400).json({error: "User with this id not found"});
      }
      
      /* may not remove ADMIN */
      if (JSON.parse(JSON.stringify(currentUser)).role_id === 1) {
        return res.status(400).json({error: "It's prohibited to remove Admin"});
      }

      /* delete user */
      if (await users.destroy({ where: { id } })) {
        return res.sendStatus(200);
      }
    } catch (err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  })

module.exports = router;
