const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

function uploader(subfolder_path, type, max_size, error_msg) {
    const folder = `${__dirname}/../public/uploads/${subfolder_path}`;

    // Storage
    const storage = multer.diskStorage({
        destination: (req, res, clbk) => {
            clbk(null, folder);
        },
        filename: (req, file, clbk) => {
            const file_ext = path.extname(file.originalname);
            const file_name =
                file.originalname
                    .replace(file_ext, '')
                    .toLocaleLowerCase()
                    .split(' ')
                    .join('-') +
                '-' +
                Date.now();
            clbk(null, file_name + file_ext);
        },
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_size,
        },
        fileFilter: (req, file, clbk) => {
            if (type.includes(file.mimetype)) {
                clbk(null, true);
            } else {
                clbk(createError(error_msg));
            }
        },
    });

    return upload;
}

module.exports = uploader;
