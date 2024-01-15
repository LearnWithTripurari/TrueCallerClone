const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PhoneNumber = require('./phoneNumberModel');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING, // You may want to use a more secure method for storing passwords in production, like bcrypt.
        allowNull: false,
    },
});

User.hasMany(PhoneNumber, { as: 'phoneNumbers' });

module.exports = User;
