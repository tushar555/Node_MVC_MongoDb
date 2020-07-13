const express = require('express');
const route = express.Router();
const auth = require('../controllers/auth-controller');
route.get('/login', auth.getLogin)
route.post('/login', auth.postLogin)
route.post('/logout', auth.postLogout)

module.exports = route;