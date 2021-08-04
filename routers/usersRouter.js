// Dependencies
const express = require('express');

// Internal Dependencies
const {
    getUsers,
    addUser,
    deleteUser,
} = require('../controllers/usersController');
const htmlHeaders = require('../middlewares/common/htmlHeaders');
const { authguard } = require('../middlewares/common/authguard');

const avatar = require('../middlewares/user/avatar');
const {
    validators,
    validationHandler,
} = require('../middlewares/user/validators');

const router = express.Router();

// Login Page
router.get('/', htmlHeaders('Users'), authguard, getUsers);

// Add user
router.post(
    '/',
    htmlHeaders('Signup'),
    avatar,
    validators,
    validationHandler,
    addUser
);

// Delete User
router.delete('/:id', deleteUser);

module.exports = router;
