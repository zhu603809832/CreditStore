var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', { title: 'Express Template' });
});

module.exports = router;
