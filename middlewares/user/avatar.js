const uploader = require('../../utillities/singleFile');

function avatar(req, res, next) {
    const upload = uploader(
        'avatars',
        ['image/jpeg', 'image/jpg', 'image/png'],
        1000000,
        'Only .jpeg, .jpg or .png format allowed'
    );

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        messge: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

module.exports = avatar;
