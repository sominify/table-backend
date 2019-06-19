const express = require('express');

const controller = require('./order.controller');

const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
