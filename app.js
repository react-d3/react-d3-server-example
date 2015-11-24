require("babel-core/register");

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ReactDOMServer = require('react-dom/server');

var routes = require('./routes/index');

// react d3
var React = require('react');

var ReactD3Map = require('react-d3-map').Map;
var ReactD3Core = require('react-d3-core');
var ReactD3Basic = require('react-d3-basic');
var ReactD3Tooltip = require('react-d3-tooltip');
var ReactD3Zoom = require('react-d3-zoom');
var ReactD3Brush = require('react-d3-brush');

var Map = React.createFactory(ReactD3Map);
var Chart = React.createFactory(ReactD3Core.Chart);
var LineChart = React.createFactory(ReactD3Basic.LineChart);
var LineTooltip = React.createFactory(ReactD3Tooltip.LineTooltip);
var LineZoom = React.createFactory(ReactD3Zoom.LineZoom);
var LineBrush = React.createFactory(ReactD3Brush.LineBrush);

var uk = require('./public/data/uk.json');
var user = require('./public/data/user.json');
var topojson = require('topojson');
var data = topojson.feature(uk, uk.objects.places);

var app = express();
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

  var markup = ReactDOMServer.renderToString(Map(props));
  res.render('index', {
    markup: markup
  });
});

app.get('/basic', function(req, res, next) {

  var chartSeries = [
      {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e',
        style: {
          "stroke-width": 2,
          "stroke-opacity": .2,
          "fill-opacity": .2
        }
      }
    ],
    x = function(d) {
      return d.index;
    }

  var markup = ReactDOMServer.renderToString(
    Chart({
      width: 600,
      height: 300,
      chartSeries: chartSeries
    }, LineChart({
      width: 600,
      height: 300,
      data: user,
      chartSeries: chartSeries,
      x: x
    }))
  );

  res.render('basic', {
    markup: markup
  });
});

app.get('/tooltip', function(req, res, next) {

  var chartSeries = [
      {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e'
      }
    ],
    x = function(d) {
      return d.index;
    }

  var markup = ReactDOMServer.renderToString(
    LineTooltip({
      width: 600,
      height: 300,
      chartSeries: chartSeries,
      x: x,
      data: user
    })
  );

  res.render('tooltip', {
    markup: markup
  });
});

app.get('/zoom', function(req, res, next) {

  var chartSeries = [
      {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e'
      }
    ],
    x = function(d) {
      return d.index;
    }

  var markup = ReactDOMServer.renderToString(
    LineZoom({
      width: 600,
      height: 400,
      chartSeries: chartSeries,
      x: x,
      data: user,
      zoomX: false,
      zoomY: true
    })
  );

  res.render('zoom', {
    markup: markup
  });
});

app.get('/brush', function(req, res, next) {

  var chartSeries = [
      {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e'
      }
    ],
    x = function(d) {
      return d.index;
    };

  var markup = ReactDOMServer.renderToString(
    LineBrush({
      width: 600,
      height: 400,
      chartSeries: chartSeries,
      x: x,
      data: user,
      brushHeight: 100,
      xLabel: 'test'
    })
  );

  res.render('brush', {
    markup: markup
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
