const User = require('../model/user-model');
const { use } = require('../routes/auth-route');

exports.getLogin = (req, res, next) => {
    console.log(req.session);
    res.render('auth/login', { path: '/login', docTitle: 'Login', isAuthenticateUser: req.user })
}


exports.postLogin = (req, res, next) => {
    const email = req.body.email;

    User.findOne({ email: email }).then((user) => {
        console.log(user);
        req.session.user = user;
        req.session.isLoggedIn = true;
        res.redirect('/login')
    })


}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })

}


