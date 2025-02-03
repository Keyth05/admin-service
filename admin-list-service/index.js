const express = require('express');
const bodyParser = require('body-parser');
const Admin = require('./model/admin');
const sequelize = require('./sequelize');
const { Sequelize } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.get('/admins', async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized');
        console.log(`Server running on http://localhost:${port}`);
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
});