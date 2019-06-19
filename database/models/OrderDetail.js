const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./Order');
const Menu = require('./Menu');

const OrderDetail = db.define('to_order_detail', {
    'fk_order_id': Sequelize.INTEGER(10),
    'fk_menu_id': Sequelize.INTEGER(10),
    'count': Sequelize.INTEGER(10)
})

OrderDetail.postMultiOrderDetail = (orderId, orderData) => {
    let query = `INSERT INTO to_order_detail (fk_order_id, fk_menu_id, count, created_at, updated_at) VALUES `;
    orderData.forEach(data => {
        query += `(${orderId}, ${data.menuModel.id}, ${data.count}, '2000-01-01', '2000-01-01'),`;
    })
    const convertQuery = query.slice(0, -1);
    return new Promise((resolve, reject) => {
        db.query(convertQuery, { type: Sequelize.QueryTypes.INSERT })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

OrderDetail.associate = function associate() {
    OrderDetail.belongsTo(Order, { foreignKey: 'fk_order_id', as: 'order', onDelete: 'CASCADE', onUpdate: 'restrict' })
    OrderDetail.belongsTo(Menu, { foreignKey: 'fk_menu_id', as: 'menu', onDelete: 'CASCADE', onUpdate: 'restrict' })
}

module.exports = OrderDetail