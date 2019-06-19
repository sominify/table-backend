const models = require('../../database/models');

exports.index = (req, res) => {
    models.Menu.findAll({
        where: {
            fk_store_id: 1
        }
    })
    .then((rows) => {
        res.send(rows);
    })
}