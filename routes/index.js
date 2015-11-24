var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'react-d3 map example' });
});

router.get('/basic', function(req, res, next) {
  res.render('basic', { title: 'react-d3 basic chart example'})
})

router.get('/tooltip', function(req, res, next) {
  res.render('tooltip', { title: 'react-d3 tooltip chart example'})
})

router.get('/zoom', function(req, res, next) {
  res.render('zoom', { title: 'react-d3 zoom chart example'})
})

router.get('/brush', function(req, res, next) {
  res.render('brush', { title: 'react-d3 brush chart example'})
})

module.exports = router;
