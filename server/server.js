import express from 'express';

import path from 'path';

import render from './render';

const app = express();

app.use('^/$', render);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/login', render);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
