const Sequelize = require('sequelize');
const db = require('../db');
const Store = require('./Store');

const Table = db.define('to_table', {
    'fk_store_id': Sequelize.INTEGER(10),
    'table_no': Sequelize.INTEGER(10)
})

Table.associate = function associate() {
    Table.belongsTo(Store, { foreignKey: 'fk_store_id', as: 'store', onDelete: 'CASCADE', onUpdate: 'restrict' })
}

Table.all = (fk_store_id) => {
    return Table.findAll({
        where: {
            'fk_store_id': fk_store_id,
        }
    });
}

module.exports = Table