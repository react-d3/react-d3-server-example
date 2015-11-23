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
