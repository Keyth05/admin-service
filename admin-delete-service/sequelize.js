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
    }
);

module.exports = sequelize;