// Dependencies
const express = require('express');

// Internal Dependencies
const { getInbox } = require('../controllers/inboxController');
const htmlHeaders = require('../middlewares/common/htmlHeaders');

const router = express.Router();

// Login Page
router.get('/', htmlHeaders('Inbox'), getInbox);

module.exports = router;
