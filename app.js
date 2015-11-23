require("babel-core/register");

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ReactDOMServer = require('react-dom/server');
var fs = require("fs");

var routes = require('./routes/index');

//var React = require('react');
//var ReactDOM = require('react-dom');
var topojson = require('topojson');
var d3 = require('d3');
var React = require('react');
var ReactD3Map = React.createFactory(require('react-d3-map').Map);
var app = express();
var uk = require('./public/data/uk.json');
var data = topojson.feature(uk, uk.objects.places);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {

  var popupContent = function(d) { return d.properties.name; };
  var props = {
    width: 1000,
    height: 800,
    scale: 1200 * 5,
    scaleExtent: [4096, 8192],
    center: [-5, 55.4],
    data: data
  };

  var markup = ReactDOMServer.renderToString(ReactD3Map(props));
  res.render('index', {
    markup: markup,
    state: JSON.stringify(props)
  });
});

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