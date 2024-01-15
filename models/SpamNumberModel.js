const User = require('./userModel')
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SpamNumber = sequelize.define('SpamNumber', {
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.belongsToMany(SpamNumber, { through: 'UserSpamNumbers' });
SpamNumber.belongsToMany(User, { through: 'UserSpamNumbers' });

module.exports = SpamNumber;