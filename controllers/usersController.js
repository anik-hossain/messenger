// External Dependecies
const bcrypt = require('bcrypt');
const path = require('path');
const { unlink } = require('fs');

// Internal Dependecies
const User = require('../model/People');

// Get users
async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.render('users', {
            title: 'Users',
            users,
        });
    } catch (err) {
        next(err);
    }
}

// Add User
async function addUser(req, res, next) {
    let newUser;
    const password = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password,
        });
    } else {
        newUser = new User({
            ...req.body,
            password,
        });
    }

    try {
        const result = await newUser.save();
        res.status(200).json({
            message: 'User was added successfully',
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    message: 'Unknown error occured',
                },
            },
        });
        console.log(err);
    }
}

// Delete User
async function deleteUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id,
        });

        // Remove user avatar if exist
        if (user.avatar) {
            unlink(
                path.join(
                    __dirname,
                    `/../public/uploads/avatars/${user.avatar}`
                ),
                (err) => {
                    if (err) console.log(err);
                }
            );

            res.status(200).json({
                message: 'User was deleted successfully',
            });
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Ciuld not delete the user :(',
                },
            },
        });
    }
}

module.exports = {
    addUser,
    getUsers,
    deleteUser,
};
