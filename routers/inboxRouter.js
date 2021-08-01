// Dependencies
const express = require('express');

// Internal Dependencies
const { getInbox } = require('../controllers/inboxController');

const router = express.Router();

// Login Page
router.get('/', getInbox);

module.exports = router;
