const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.DATASOURCE_USERNAME,
    process.env.DATASOURCE_PASSWORD, 
    {
        host: process.env.DATASOURCE_URL, 
        port: process.env.DATASOURCE_PORT, 
        dialect: 'mysql', 
        logging: false, 
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

module.exports = sequelize;