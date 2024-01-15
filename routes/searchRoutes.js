const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/byName', searchController.searchByName);
router.get('/byPhoneNumber', searchController.searchByPhoneNumber);
router.get('/:userId', searchController.getPersonDetails);

module.exports = router;