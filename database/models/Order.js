const Sequelize = require('sequelize');
const db = require('../db');
const Store = require('./Store');
const Table = require('./Table');

const Order = db.define('to_order', {
    'fk_store_id': Sequelize.INTEGER(10),
    'fk_table_id': Sequelize.INTEGER(10),
    'status': {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    'fb_token': {
        type: Sequelize.STRING(200)
    }
})

Order.associate = function associate() {
    Order.belongsTo(Store, { foreignKey: 'fk_store_id', as: 'store', onDelete: 'CASCADE', onUpdate: 'restrict' })
    Order.belongsTo(Table, { foreignKey: 'fk_table_id', as: 'table', onDelete: 'CASCADE', onUpdate: 'restrict' })
}

Order.find = (fk_store_id, fk_table_id) => {
    return Order.find({
        where: {
            'fk_store_id': fk_store_id,
            'fk_table_id': fk_table_id
        }
    });
}

module.exports = Order