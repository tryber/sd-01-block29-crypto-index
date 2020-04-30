const express = require('express');
const router = express.Router();

const {
  authenticationMiddleware,
  currencyValidMiddleware,
} = require('./currencyValid');

router.use(authenticationMiddleware);
router.use(currencyValidMiddleware);

router.post('/', (req, res) => {
  res.json({ message: 'Valor Alterado com sucesso' });
});



module.exports = router;
