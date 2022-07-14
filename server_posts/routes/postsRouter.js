const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const { posts } = require('../db/models');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const result = await posts.findAll();
      /* remove meta data */
      const arrPosts = JSON.parse(JSON.stringify(result));
      return res.json(arrPosts);
    } catch (err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  })

  .post(checkAuth, async (req, res) => {
    try {
      const { id, login } = req.user;
      const { post } = req.body;

      /* create new post */
      if (await posts.create({ user_id: id, login, post })) {
        return res.sendStatus(200);
      }
      return res.sendStatus(500);
    } catch (err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  })

  .put(checkAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      const postId = req.body.id;
      const { post } = req.body;

      /* check the post exists and belongs to the Current User */
      const result = await posts.findOne({ where: { id: postId } });
      const { user_id } = JSON.parse(JSON.stringify(result));

      if (user_id === userId) {
        if (await posts.update({ post }, { where: { id: postId } })) {
          return res.sendStatus(200);
        }
        return res.sendStatus(500);
      }
      return res.status(400).json({ error: 'The post does not belong to the User' });
    } catch (err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  })

  .delete(checkAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      const postId = req.body.id;

      /* check the post exists and belongs to the Current User */
      const result = await posts.findOne({ where: { id: postId } });
      const { user_id } = JSON.parse(JSON.stringify(result));

      if (user_id === userId) {
        if (await posts.destroy({ where: { id: postId } })) {
          return res.sendStatus(200);
        }
        return res.sendStatus(500);
      }
      return res.status(400).json({ error: 'The post does not belong to the User' });
    } catch (err) {
      console.log('ERROR--->', err);
      return res.sendStatus(500);
    }
  });

module.exports = router;
