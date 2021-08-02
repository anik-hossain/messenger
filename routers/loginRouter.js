// Dependencies
const express = require('express');

// Internal Dependencies
const {
    getLogin,
    getSignup,
    login,
} = require('../controllers/loginController');
const htmlHeaders = require('../middlewares/common/htmlHeaders');
const {
    validationHandler,
    validators,
} = require('../middlewares/login/validators');

const router = express.Router();

// Login Page
router.get('/', htmlHeaders('Login'), getLogin);

// Signup
router.get('/signup', htmlHeaders('Signup'), getSignup);

// Login
router.post('/', htmlHeaders('Login'), validators, validationHandler, login);

module.exports = router;
