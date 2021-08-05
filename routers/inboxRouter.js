// Dependencies
const express = require('express');

// Internal Dependencies
const {
    getInbox,
    searchUser,
    addConversation,
    getMessages,
    sendMessage,
} = require('../controllers/inboxController');
const { authguard } = require('../middlewares/common/authguard');
const htmlHeaders = require('../middlewares/common/htmlHeaders');

const router = express.Router();

// Login Page
router.get('/', htmlHeaders('Messages'), authguard, getInbox);

router.post('/search', htmlHeaders('Messages'), authguard, searchUser);

router.post(
    '/conversation',
    htmlHeaders('Messages'),
    authguard,
    addConversation
);

// Get Messages Of A Conversation
router.get('/id/:conversation_id', authguard, getMessages);

// Send Message
router.post('/message', authguard, sendMessage);

module.exports = router;
