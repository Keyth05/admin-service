const express = require('express');
const sequelize = require('./sequelize');
const Admin = require('./model/admin');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');
        await sequelize.sync();
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        console.log('The server will continue running without a database connection.');
    }
}

async function checkDatabaseConnection() {
    try {
        await sequelize.authenticate();
        return true;
    } catch {
        return false;
    }
}

app.get('/client/checkAdmin/:email', async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ status: 'Failed', message: 'Email is required' });
    }

    const isDatabaseConnected = await checkDatabaseConnection();

    if (!isDatabaseConnected) {
        return res.status(503).json({ status: 'Failed', message: 'Database is unavailable' });
    }

    try {
        const admins = await Admin.findAll({ where: { email } });
        const isAdmin = admins.length > 0;
        return res.status(isAdmin ? 200 : 404).json({
            status: isAdmin ? 'OK' : 'Failed',
            message: isAdmin ? 'Admin exists' : 'Admin does not exist',
        });
    } catch (error) {
        console.error('Error checking admin:', error);
        return res.status(500).json({ status: 'Failed', message: 'Internal server error' });
    }
});

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await initializeDatabase();
});
