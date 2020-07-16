const express = require('express');
const route = express.Router();
const auth = require('../controllers/auth-controller');
const { check, body } = require('express-validator/check');

const bcrypt = require('bcryptjs');
const User = require('../model/user-model');

let Founduser;
route.get('/login', auth.getLogin)
route.post('/login', [body('email').isEmail().withMessage('Please Enter valid email').custom((value, { req }) => {

    return User.findOne({ email: value }).then((user) => {

        Founduser = user;
        if (!user) {

            return Promise.reject('User email not exist')
        }
    });
}), body('password').custom((value, { req }) => {
    console.log(Founduser)
    return bcrypt.compare(value, Founduser.password).then((resp) => {
        if (!resp) {
            throw new Error('Wrong password')
        }
    })
})

], auth.postLogin)
route.get('/sign-up', auth.getSignup)
route.post('/sign-up', [check('email').isEmail().withMessage('Invalid email').custom((value, { req }) => {


    return User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            //return Promise.reject('User already exists')
            throw new Error('User already exists!!')
        }
    })

}),
body('password', 'Invalid password').isLength({ min: 5, max: 10 }).isAlphanumeric(),
body('confirmpassword', 'Passwords have to match!').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error()
    }
    return true
})
], auth.postSignup)
route.get('/reset', auth.getReset)
route.post('/reset', auth.postReset)
route.get('/reset/:token', auth.getNewPassword)
route.post('/newpassword', auth.setNewPassword)

route.post('/logout', auth.postLogout)

module.exports = route;