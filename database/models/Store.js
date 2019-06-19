const Sequelize = require('sequelize');
const db = require('../db');

const Store = db.define('to_store', {
    name: Sequelize.STRING(50),
});

module.exports = Store;