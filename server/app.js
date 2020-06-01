import express from 'express';

import path from 'path';

import render from './render';

const app = express();

app.use('^/$', render);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/login', render);

export default app;
