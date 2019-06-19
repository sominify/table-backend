const models = require('../../database/models');

exports.index = (req, res) => {
    models.Table.all(1)
        .then((rows) => {
            res.send(rows);
        })
}