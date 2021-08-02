// Dependencies
const express = require('express');

// Internal Dependencies
const {
    getUsers,
    addUser,
    deleteUser,
} = require('../controllers/usersController');

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

// Delete User
router.delete('/:id', deleteUser);

module.exports = router;
