require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATASOURCE_USERNAME, process.env.DATASOURCE_PASSWORD, {
    host: process.env.DATASOURCE_URL,
    port: process.env.DATASOURCE_PORT,
    dialect: 'mariadb',
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MariaDB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
