const express = require('express');
const router = express.Router();

router.get('/', (undefined, res) => {
  res.send('aqui começa tudo!');
});

module.exports = router;
