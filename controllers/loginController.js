// External Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Internal Dependencies
const User = require('../model/People');

function getLogin(req, res, next) {
    res.render('index');
}
function getSignup(req, res, next) {
    res.render('signup');
}

// Login
async function login(req, res, next) {
    try {
        // find a user who has this email/username
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });

        if (user && user._id) {
            console.log('jghg');
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (isValidPassword) {
                // Create User Object
                const userObject = {
                    username: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: 'user',
                };

                // Generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                // Set token in cookies
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true,
                });

                res.locals.loggedUser = userObject;

                res.render('inbox');
            } else {
                console.log(1);
                throw createError('Login Filed :-(');
            }
        } else {
            console.log(2);
            throw createError('Login Filed :-(');
        }
    } catch (err) {
        res.render('index', {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

module.exports = {
    getLogin,
    getSignup,
    login,
};
