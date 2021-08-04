// Dependencies
const express = require('express');

// Internal Dependencies
const { getInbox, searchUser } = require('../controllers/inboxController');
const { authguard } = require('../middlewares/common/authguard');
const htmlHeaders = require('../middlewares/common/htmlHeaders');

const router = express.Router();

// Login Page
router.get('/', htmlHeaders('Messages'), authguard, getInbox);
router.post('/search', htmlHeaders('Messages'), authguard, searchUser);

module.exports = router;
