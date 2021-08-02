const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const path = require('path');
const { unlink } = require('fs');
const User = require('../../model/People');

const validators = [
    check('name').isLength({ min: 1 }).withMessage('Name is required').trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError('Email already use');
                }
            } catch (err) {
                throw createError(err.message);
            }
        })
        .trim(),
    check('mobile')
        .isMobilePhone('bn-BD', {
            strictMode: true,
        })
        .withMessage('Mobile number must be a valid Bangladeshi mobile number')
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value });
                if (user) {
                    throw createError('Mobile already use');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage(
            'Password must be at least 8 chareters long & should at least 1 lowercase, uppercase, number, & symbol'
        ),
    check('gender')
        .isLength({ min: 1 })
        .withMessage('Select your gender')
        .trim(),
];

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(
                    __dirname,
                    `/../../public/uploads/avatars/${filename}`
                ),
                (err) => {
                    if (err) console.log(err);
                }
            );
        }

        res.status(500).json({
            errors: mappedErrors,
        });
    }
};

module.exports = {
    validators,
    validationHandler,
};
