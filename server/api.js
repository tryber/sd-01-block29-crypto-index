const express = require('express');
const routes = require('./routes');
const errors = require('@expresso/errors')

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors.factory(process.env.NODE_ENV));

app.listen(3001, () => {
    console.log('Ouvindo na porta 3001');
});
