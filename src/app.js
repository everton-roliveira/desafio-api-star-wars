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
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers",
        "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
    if (request.headers.origin) {
        response.header('Access-Control-Allow-Origin', request.headers.origin);
    }
    if (request.method === 'OPTIONS') {
        response.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return response.status(200).json({});
    }
    next();
});

app.use(indexRoute);

module.exports = app;
