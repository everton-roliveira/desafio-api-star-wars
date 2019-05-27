const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../config/config');
const app = express();

// // Conecta ao banco
mongoose.connect(config.DB_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true
});

// // Carrega os models
const model = require('./model');

// // Carrega Rotas
const indexRoute = require('./routes');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// // habilita o CORS
// app.use((request, response , next) => {
//     // response.header('Access-Control-Allow-Origin', '*');
//     // response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
//     // response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// });

app.use(indexRoute);

module.exports = app;
