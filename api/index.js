import React from 'react';
import { renderToString } from 'react-dom/server';
const express = require('express');

const app = express();
const router = express.Router();

router.get('/login', async (req, res) => {
  const reactApp = renderToString(<App />);
  res.status(200).render('pages/index', { reactApp: reactApp });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('listening on port 3001!');
});

export default router;
