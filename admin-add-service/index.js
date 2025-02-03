const express = require('express');
const bodyParser = require('body-parser');
const Admin = require('./model/admin');
const sequelize = require('./sequelize');
const { Sequelize } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/admins', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email are required' });
        }

        const newAdmin = await Admin.create({ email });
        res.status(201).json(newAdmin);
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            return res.status(409).json({
                error: 'Duplicate entry',
                message: `The email '${error.fields.email}' is already in use.`,
            });
        }

        console.error('Error creating admin:', error);
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