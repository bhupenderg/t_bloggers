const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash');
const app = express();

let sessionOptions = session({
    secret: "Javascript",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true}
})
app.use(sessionOptions)

app.use(flash());
const routes = require('./route')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
})
app.use('/', routes);

module.exports = app;

//EdsgPu2ip0qYFZHU

