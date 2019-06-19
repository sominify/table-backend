const express = require('express');

const controller = require('./menu.controller');

const router = express.Router();

router.get('/', controller.index);

module.exports = router;
