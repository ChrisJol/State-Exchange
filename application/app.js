const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const session = require("express-session");
const bcryptjs = require("bcryptjs");
require('./auth/passport');

const app = express();

//routes import
const fileRouter = require('./routes/files');
const search_query = require('./routes/search_query');
const newPostRouter = require('./routes/insertPost');
const category_query = require('./routes/categories');
const usersRouter = require('./routes/users');
const messagingRouter = require('./routes/messaging');
const messagesIndexRouter = require('./routes/messaging-index');
const deletePostRouter = require('./routes/delete_post');
const auth = require('./routes/auth');
const postRouter = require('./routes/post');
const dashboardGatewayRouter = require('./routes/dashboardGateway')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var allowCrossDomain = function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    const auth = require('./routes/auth');
    app.use('/auth', auth);

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/contact/edit/:id',express.static(path.join(__dirname, 'public')));
app.use('/details',express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);
app.use(fileUpload({ createParentPath: true}));
app.use(session({secret: "secret",
    resave: false,
    saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session());


//routes for the files
app.use('/users', usersRouter); //passport.authenticate('jwt', {session: false}),
app.use('/post', postRouter); 

//routes setup
app.use('/', fileRouter);
app.use('/', search_query);
app.use('/', newPostRouter);
app.use('/', category_query);
app.use('/', deletePostRouter);
app.use('/users', usersRouter); //passport.authenticate('jwt', {session: false}),
app.use('/messaging', passport.authenticate('jwt', {session: true}), messagingRouter); //passport.authenticate('jwt', {session: false}),
app.use('/messaging-index', passport.authenticate('jwt', {session: true}), messagesIndexRouter);
app.use('/auth', auth);
app.use('/', dashboardGatewayRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, 'views/error.html'));
});


module.exports = app;