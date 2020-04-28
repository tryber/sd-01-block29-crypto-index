const login = require('../server/login');
const express = require('express');
/* Chama a função express para instanciar a aplicação do framework
   e armazenar na variável app para ser utilizada no código */
const app = express();

app.use('/login', login);