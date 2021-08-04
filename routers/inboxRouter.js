// Dependencies
const express = require('express');

// Internal Dependencies
const { getInbox } = require('../controllers/inboxController');
const { authguard } = require('../middlewares/common/authguard');
const htmlHeaders = require('../middlewares/common/htmlHeaders');

const router = express.Router();

// Login Page
router.get('/', htmlHeaders('Messages'), authguard, getInbox);

module.exports = router;
