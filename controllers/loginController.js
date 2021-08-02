function getLogin(req, res, next) {
    res.render('index', {
        title: 'Login',
    });
}
function getSignup(req, res, next) {
    res.render('signup', {
        title: 'Signup',
    });
}

module.exports = {
    getLogin,
    getSignup,
};
