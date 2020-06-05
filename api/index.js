const express = require('express');
const app = require('./server')

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('listening on port 3001!');
});
