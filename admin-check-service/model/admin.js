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

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
    await sequelize.sync();
    console.log('Synchronization completed.');
  } catch (error) {
    console.error('Error connecting or synchronizing the database:', error.message);
  }
}

syncDatabase();

module.exports = Admin;
