var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Kesk Chat' });
});

/* GET chat room page. */
router.get('/chat', function(req, res, next) {
  res.render('index', { title: 'Chat Room' });
});

module.exports = router;
