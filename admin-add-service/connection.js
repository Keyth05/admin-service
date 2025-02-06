require('dotenv').config();

async function connectToMariaDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DATASOURCE_URL,
            port: process.env.DATASOURCE_PORT,
            user: process.env.DATASOURCE_USERNAME,
            password: process.env.DATASOURCE_PASSWORD,
            database: process.env.DATABASE
        });

        console.log('Successfully connected to MariaDB');
        return connection;
    } catch (error) {
        console.error('Connection error:', error);
        throw new Error('Could not connect to the database');
    }
}

module.exports = { connectToMariaDB };
