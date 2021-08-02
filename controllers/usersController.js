// Dependecies
const bcrypt = require('bcrypt');
const User = require('../model/People');

// Get users
function getUsers(req, res, next) {
    res.render('users', {
        title: 'Users',
    });
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

module.exports = {
    addUser,
    getUsers,
};
