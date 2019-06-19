const db = require('./db');
const models = require('./models');

module.exports.sync = () => {
    models.Table.associate();
    models.Menu.associate();
    models.Order.associate();
    models.OrderDetail.associate();

    db.sync({ force: false })
        .then(() => {
            console.log('Database Sync!')
        })
}