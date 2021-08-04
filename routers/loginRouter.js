// Dependencies
const express = require('express');

// Internal Dependencies
const {
    getLogin,
    getSignup,
    login,
    logout,
} = require('../controllers/loginController');
const { authOrNot } = require('../middlewares/common/authguard');
const htmlHeaders = require('../middlewares/common/htmlHeaders');
const {
    validationHandler,
    validators,
} = require('../middlewares/login/validators');

const router = express.Router();

// Login Page
router.get('/', htmlHeaders('Login'), authOrNot, getLogin);

// Signup
router.get('/signup', htmlHeaders('Signup'), getSignup);

// Login
router.post('/', htmlHeaders('Login'), validators, validationHandler, login);

// Logout
router.delete('/', logout);

module.exports = router;
