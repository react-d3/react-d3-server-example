# react-d3-server-example
A simple example of server-side rendering with react-d3.

## Run

```
$ babel-node ./bin/www
```

## Example

**server**

```js
/* part of server file */
// react d3
var React = require('react');

var ReactD3Map = require('react-d3-map').Map);
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
      height: 400,
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
```


**client**

build jsx by webpack, for example, the map `point.jsx`:


```js
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var ReactD3Map = React.createFactory(require('../../lib/index').Map);

var css= require('./css/polygon.css');

// Example
(function() {
  var uk = require('json!../data/uk.json');
  var data = topojson.feature(uk, uk.objects.places);
  var popupContent = function(d) { return d.properties.name; };

  /* input props should be the same with server side */
  var props = {
    width: 1000,
    height: 800,
    scale: 1200 * 5,
    scaleExtent: [4096, 8192],
    center: [-5, 55.4],
    data: data
  };

  ReactDOM.render(
    ReactD3Map(props),
    document.getElementById('blank-point')
  );

})();
```

then, include the output js file to jade.

```jade
script(src="/javascripts/point.js")
```
