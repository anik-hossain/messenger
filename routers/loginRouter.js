// Dependencies
const express = require('express');

// Internal Dependencies
const { getLogin } = require('../controllers/loginController');

const router = express.Router();

// Login Page
router.get('/', getLogin);

module.exports = router;
