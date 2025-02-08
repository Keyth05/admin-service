const express = require('express');
const Admin = require('./model/admin');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); /

app.get('/', (req, res) => {
    res.status(200).send('Delete Admin Service is running ...');
});

app.delete('/admin/:adminId', async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = await Admin.destroy({
            where: {
                adminId: adminId
            }
        });

        if (admin) {
            res.status(200).send({ message: `Admin with adminId ${adminId} deleted successfully.` });
        } else {
            res.status(404).send({ message: `Admin with adminId ${adminId} not found.` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error deleting the admin', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
