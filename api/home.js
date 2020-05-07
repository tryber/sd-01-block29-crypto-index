const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('aqui começa tudo!');
});

module.exports = router;
