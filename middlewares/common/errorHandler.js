/**
 * Title: Error Handler
 * Description:
 * Author: Anik Hossain
 * Date: 7/25/2021
 */

// External Dependencies
const createError = require('http-errors');

// Not Found Handler
function notFound(req, res, next) {
    next(createError(504, '404 Content Not Found!'));
}

// Defaul Error Handler
function errorHandler(err, req, res, next) {
    res.locals.error =
        process.env.NODE_ENV === 'development' ? err : { message: err.message };
    res.status(err.status || 500);

    if (res.locals.html) {
        // HTML Response
        res.render('error', {
            title: 'Error page',
        });
    } else {
        // API Responer
        res.json(res.locals.error);
    }
}

module.exports = {
    notFound,
    errorHandler,
};
