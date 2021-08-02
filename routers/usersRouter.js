// Dependencies
const express = require('express');

// Internal Dependencies
const { getUsers, addUser } = require('../controllers/usersController');
const avatar = require('../middlewares/user/avatar');
const {
    validators,
    validationHandler,
} = require('../middlewares/user/validators');

const router = express.Router();

// Login Page
router.get('/', getUsers);

// Add user
router.post('/', avatar, validators, validationHandler, addUser);

module.exports = router;
