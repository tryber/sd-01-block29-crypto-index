const express = require('express');

const router = express.Router();

router.get('/', (__req, res) => {
  res.send('aqui começa tudo!');
});

module.exports = router;
