# react-d3-map-server-example
A simple example of server-side rendering with react-d3-map.

## Run

```
$ babel-node ./bin/www
```

**server**

```js
/* part of server file */
var React = require('react');
var ReactD3Map = React.createFactory(require('react-d3-map').Map);
var uk = require('./public/data/uk.json');
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

  var markup = ReactDOMServer.renderToString(ReactD3Map(props));
  res.render('index', {
    markup: markup
  });
});
```
