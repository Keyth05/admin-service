const express = require('express');
const bodyParser = require('body-parser');
const Admin = require('./model/admin');
const sequelize = require('./sequelize');
const { Sequelize } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.delete('/admins/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        await admin.destroy();
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
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