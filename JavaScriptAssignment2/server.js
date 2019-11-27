'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Tyler:1234@cluster0-avfjg.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

var app = express();


var db = mongoose.connect(uri).catch((error) => {
    console.log(error);
});

//Making my URL routes for my webpages
var users = require('./routes/users');
var listings = require('./routes/listings');
var home = require('./routes/home');
var register = require('./routes/register');
var login = require('./routes/login');
var Account = require('./model/account');
var add = require('./routes/add');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport session
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: false,
    resave: false
}));

//Creating the routes for all my webpages
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', users);
app.use('/', listings);
app.use('/home', home);
app.use('/register', register);
app.use('/login', login);


//Serialize user
passport.serializeUser(function (user, done) {
    done(null, user.id)
});

//Deserialize user try to find username
passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, user) {
        done(err, user);
    });
});

//Local strategy used for logging users
passport.use(new LocalStrategy(
    function (username, password, done) {
        Account.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
