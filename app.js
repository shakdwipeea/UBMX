var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var cors = require('cors');

var mysql = require('mysql');
var config = require('./config');

var routes = require('./routes/index');
var users = require('./routes/users');
var vendors = require('./routes/vendors');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  private key for jwt
app.set('secret', config.jwt.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/users', users);

app.use('/admin', admin);

app.use((req, res, next) => {

  var token;
  if (req.body.token) {
    token = req.body.token;
  } else if (req.query.token) {
    token = req.query.token;
  }

  if (token) {
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        next(err);
      } else {
        req.body.user = decoded;
        next();
      }
    });
  } else {
    next();
  }

});

app.use('/vendors', vendors);
app.use('/vehicles', require('./routes/vehicles'));
app.use('/bookings', require('./routes/bookings'));
app.use('/problems', require('./routes/problems'));
app.use('/booking_type', require('./routes/booking_type'));
app.use('/slots', require('./routes/slots'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
