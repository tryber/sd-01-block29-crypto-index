const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.boby;
    const post = await Post.create({
      email,
      password,
    });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(400).send({ error: err });
  }
});

module.exports = router;
