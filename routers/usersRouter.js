// Dependencies
const express = require('express');

// Internal Dependencies
const { getUsers } = require('../controllers/usersController');

const router = express.Router();

// Login Page
router.get('/', getUsers);

module.exports = router;
