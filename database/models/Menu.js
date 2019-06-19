const Sequelize = require('sequelize');
const db = require('../db');
const Store = require('./Store');

const Menu = db.define('to_menu', {
    'fk_store_id': Sequelize.INTEGER(10),
    'poster': Sequelize.STRING(200),
    'name': Sequelize.STRING(50),
    'price': Sequelize.INTEGER(10),
})

Menu.associate = function associate() {
    Menu.belongsTo(Store, { foreignKey: 'fk_store_id', as: 'store', onDelete: 'CASCADE', onUpdate: 'restrict' })
}

module.exports = Menu