const express = require('express');
const route = express.Router();
const auth = require('../controllers/auth-controller');
route.get('/login', auth.getLogin)
route.post('/login', auth.postLogin)
route.get('/sign-up', auth.getSignup)
route.post('/sign-up', auth.postSignup)
route.get('/reset', auth.getReset)
route.post('/reset', auth.postReset)
route.get('/reset/:token', auth.getNewPassword)
route.post('/newpassword', auth.setNewPassword)

route.post('/logout', auth.postLogout)

module.exports = route;