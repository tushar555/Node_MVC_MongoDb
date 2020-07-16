const express = require('express');
const app = express();
const parser = require('body-parser');

const viewRoute = require('./routes/shop-route');
const adminRoute = require('./routes/admin-route');
const authRoute = require('./routes/auth-route');

const path = require('path');
const mainPath = require('./util/path');
const errorController = require('./controllers/error-controller');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./model/user-model');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const csrfProtection = csrf();

const store = new MongoDBStore({
    uri: "mongodb+srv://tusharsaindane02:FTOXXjTSl92P4BAq@cluster0-golou.mongodb.net/shop",
    collection: 'session'

})

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secrete', resave: false, saveUninitialized: false, store: store }))
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user._id).then((user) => {
            req.user = user;
            next();
        })
    } else {
        next();
    }


});


app.use((req, res, next) => {
    res.locals.isAuthenticateUser = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next()
})


app.use('/', viewRoute.routes);
app.use('/', adminRoute.routes);
app.use(authRoute);
app.get('/500', errorController.get500)
// app.use(errorController.get404);
app.use((error, req, res, next) => {
    res.redirect('/500');
});
mongoose.connect("mongodb+srv://tusharsaindane02:FTOXXjTSl92P4BAq@cluster0-golou.mongodb.net/shop?retryWrites=true&w=majority"
).then((result) => {

    app.listen(3000);
})


