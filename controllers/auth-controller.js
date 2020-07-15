const User = require('../model/user-model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const { use } = require('../routes/auth-route');

const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}))
exports.getLogin = (req, res, next) => {
    res.render('auth/login', { path: '/login', docTitle: 'Login', errorMessage: req.flash('error') })
}

exports.getSignup = (req, res, next) => {

    res.render('auth/signup', { path: '/sign-up', docTitle: 'Signup', errorMessage: req.flash('error') })
}


exports.getReset = (req, res, next) => {
    res.render('auth/reset', { path: '/reset', docTitle: 'Reset', errorMessage: req.flash('error') })
}

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    const token = crypto.randomBytes(32, (error, buffer) => {
        const newtoken = buffer.toString('hex');
        if (error) {
            return res.redirect('/reset')
        }

        User.findOne({ email: email }).then((user) => {
            if (!user) {
                req.flash('error', 'User not exists')
                return res.redirect('/reset')
            }
            user.resetToken = newtoken;
            user.resettokenExpiration = Date.now() + 3600000
            return user.save()
        }).then(() => {
            res.redirect('/')
            transport.sendMail({
                to: email,
                from: 'tusharsaindane02@gmail.com',
                subject: 'Reset Password',
                html: `<h2>To reset your password kindly use <a href="http://localhost:3000/reset/${newtoken}">Link   </a></h2>`
            })


        })



    });

}


exports.setNewPassword = (req, res, next) => {
    const newpassword = req.body.password
    const userId = req.body.userId;
    const token = req.body.token;
    let resetUser;
    User.findOne({ resetToken: token, resettokenExpiration: { $gt: Date.now() }, _id: userId }).then((user) => {
        console.log(user)
        resetUser = user;
        return bcrypt.hash(newpassword, 12)
    }).then((hash) => {
        console.log(resetUser)
        resetUser.password = hash
        resetUser.resettokenExpiration = undefined;
        resetUser.resetToken = undefined;
        return resetUser.save();
    }).then(() => {
        res.redirect('/login')
    }).catch((err) => console.log(err))
}


exports.getNewPassword = (req, res, next) => {

    User.findOne({ resetToken: req.params.token, resettokenExpiration: { $gt: Date.now() } }).then((user) => {
        let userId = '21212'
        if (user) {
            userId = user._id.toString();
        }
        res.render('auth/newpassword', { path: '/NewPassword', docTitle: 'NewPassword', token: req.params.token, userId: userId, errorMessage: req.flash('error') })

    }).catch((err) => {
        console.log(err)
    })

}

exports.postSignup = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let confirmpassword = req.body.confirmpassword;
    User.findOne({ email: email }).then((user) => {
        if (user) {
            req.flash('error', 'User already exists')
            return res.redirect('/sign-up')
        }
        return bcrypt.hash(password, 12)

    }).then(hash => {
        const newuser = new User({ email: email, password: hash, cart: { item: [] } });
        return newuser.save()
    }).then(() => {
        console.log('email', email)
        res.redirect('/login')
        return transport.sendMail({
            to: email,
            from: 'tusharsaindane02@gmail.com',
            subject: 'Signup Success',
            html: '<h1>Signup Success</h1>'
        })

    }).catch(err => console.log(err));
}




exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;


    User.findOne({ email: email }).then((user) => {
        if (!user) {
            req.flash('error', 'Invalid email')
            return res.redirect('/login')
        }

        bcrypt.compare(password, user.password).then((resp) => {

            if (resp) {
                req.session.user = user;
                req.session.isLoggedIn = true;
                return req.session.save(err => {
                    res.redirect('/')
                })

            }
            req.flash('error', 'Invalid password')
            res.redirect('/login')
        })


    })


}

exports.postLogout = (req, res, next) => {

    req.session.destroy(() => {
        res.redirect('/login');
    })

}


