const { User, PhoneNumber, SpamNumber } = require('../models');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumbers } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({ name, email, password: hashedPassword });
        if (phoneNumbers && phoneNumbers.length > 0) {
            await PhoneNumber.bulkCreate(phoneNumbers.map((phoneNumber) => ({ phoneNumber })));
            const userPhoneNumbers = await PhoneNumber.findAll({ where: { phoneNumber: phoneNumbers } });
            await user.addPhoneNumbers(userPhoneNumbers);
        }

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const markNumberAsSpam = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        // Check if the number is already marked as spam
        const existingSpamNumber = await SpamNumber.findOne({ where: { phoneNumber } });
        if (existingSpamNumber) {
            return res.status(400).json({ error: 'Number is already marked as spam' });
        }

        // Create a new spam number
        const spamNumber = await SpamNumber.create({ phoneNumber });

        // Associate the spam number with the user (optional)
        const user = await User.findByPk(req.params.userId);
        if (user) {
            await user.addSpamNumber(spamNumber);
        }

        res.status(201).json({ message: 'Number marked as spam successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    registerUser,
    markNumberAsSpam,
};
