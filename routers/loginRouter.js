// Dependencies
const express = require('express');

// Internal Dependencies
const { getLogin, getSignup } = require('../controllers/loginController');

const router = express.Router();

// Login Page
router.get('/', getLogin);
router.get('/signup', getSignup);

module.exports = router;
