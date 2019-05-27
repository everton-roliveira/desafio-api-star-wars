const router = require('express').Router();

// ROTAS
const planetRoute = require('./planet.route');

// ROTA PRINCIPAL
router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Microserviço de Planetas",
        version: "0.0.1"
    });
});

// USANDO AS ROTAS
router.use('/planets', planetRoute);

module.exports = router;