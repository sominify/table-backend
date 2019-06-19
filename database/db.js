const Sequelize = require('sequelize');

const config = require('../util/config');

const db = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: "mysql",
        define: {
            timestamps: true,
            freezeTableName: true,
            underscored: true
        }
    }
)

module.exports = db;