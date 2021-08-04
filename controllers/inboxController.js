// External Dependecies
const createError = require('http-errors');

// Internal Dependecies
const Conversation = require('../model/Conversation');
const Message = require('../model/Message');
const User = require('../model/People');
const escape = require('../utillities/escape');

function getInbox(req, res, next) {
    res.render('inbox');
}

// Search Users
async function searchUser(req, res, next) {
    const user = req.body.user;
    const searchQuery = user.replace('+88', '');

    const name_search_regex = new RegExp(escape(searchQuery), 'i');
    const mobile_search_regex = new RegExp('^' + escape('+88' + searchQuery));
    const email_search_regex = new RegExp('^' + escape(searchQuery) + '$', 'i');

    try {
        if (searchQuery !== '') {
            const users = await User.find(
                {
                    $or: [
                        {
                            name: name_search_regex,
                        },
                        {
                            mobile: mobile_search_regex,
                        },
                        {
                            email: email_search_regex,
                        },
                    ],
                },
                'name avatar'
            );

            res.json(users);
        } else {
            throw createError('You must provide some text to search!');
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

module.exports = {
    getInbox,
    searchUser,
};
