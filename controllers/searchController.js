const { User, PhoneNumber } = require('../models');
const { Op } = require('sequelize');

const searchByName = async (req, res) => {
    try {
        const { name } = req.query;

        // Search for users by name
        const users = await User.findAll({
            where: {
                name: { [Op.like]: `%${name}%` }, // Case-insensitive search
            },
            include: {
                model: PhoneNumber,
                as: 'phoneNumbers',
                attributes: ['phoneNumber'], // Include only the phoneNumber attribute
            },
        });

        // Format and return search results
        const formattedResults = users.map((user) => ({
            name: user.name,
            phoneNumber: user.phoneNumbers[0]?.phoneNumber, // Assuming a user has one phone number for simplicity
        }));

        res.status(200).json(formattedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchByPhoneNumber = async (req, res) => {
    try {
        const { phoneNumber } = req.query;

        // Search for users by phone number
        const users = await User.findAll({
            include: {
                model: PhoneNumber,
                as: 'phoneNumbers',
                where: {
                    phoneNumber: phoneNumber,
                },
            },
        });

        // Format and return search results
        const formattedResults = users.map((user) => ({
            name: user.name,
            phoneNumber: user.phoneNumbers[0]?.phoneNumber,
        }));

        res.status(200).json(formattedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPersonDetails = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Retrieve detailed information for the person
        const user = await User.findByPk(userId, {
            include: {
                as: 'phoneNumbers',
                model: PhoneNumber,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // Check if the requesting user is in the contact list to display email
        const requestingUserId = req.user?.id;
        const isContact = requestingUserId && user.id !== requestingUserId; // Check if the requesting user is not the same as the user being queried

        const details = {
            name: user.name,
            phoneNumber: user.phoneNumbers[0]?.phoneNumber,
            email: isContact ? user.email : undefined,
        };

        res.status(200).json(details);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    searchByName,
    searchByPhoneNumber,
    getPersonDetails,
};
