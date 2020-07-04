const express = require('express');
const app = express();
const parser = require('body-parser');

const viewRoute = require('./routes/shop-route');
const adminRoute = require('./routes/admin-route');
const path = require('path');
const mainPath = require('./util/path');
const errorController = require('./controllers/error-controller');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./model/user-model');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use((req, res, next) => {
    User.findById('5eff325d7564dde6a5b1c561').then((user) => {
        req.user = user;
        next();
    })

});
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewRoute.routes);
app.use('/', adminRoute.routes);
app.use(errorController.get404);


mongoConnect().then(db => {
    const user = new User('Tushar', 'tushar@gmail.com')
    user.save().then(() => {
        app.listen(3000);
    })


});
