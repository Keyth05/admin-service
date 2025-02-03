const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Admin = sequelize.define('Admin', {
    adminId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'admin',
    timestamps: false,
});

module.exports = Admin;