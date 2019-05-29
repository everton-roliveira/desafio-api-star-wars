const express = require('express');
const router = express.Router();

const controller = require('../controller/planet.controller');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/search/aleatory', controller.getAleatory);
router.get('/search/aleatory/:name', controller.getByName);
router.post('/', controller.post);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;