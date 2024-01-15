const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PhoneNumber = sequelize.define('PhoneNumber', {
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = PhoneNumber;
