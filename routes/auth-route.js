const express = require('express');
const route = express.Router();
const auth = require('../controllers/auth-controller');
route.get('/login', auth.login)

module.exports = route;