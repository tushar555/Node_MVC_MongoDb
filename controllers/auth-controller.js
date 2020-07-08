exports.login = (req, res, next) => {
    res.render('auth/login', { path: '/login', docTitle: 'Login' })
}