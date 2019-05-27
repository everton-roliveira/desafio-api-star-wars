const express = require('express');
const router = express.Router();

const controller = require('../controller/planet.controller');

router.get('/page/:page?', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);
// router.delete('/:id', controller.delete);

module.exports = router;