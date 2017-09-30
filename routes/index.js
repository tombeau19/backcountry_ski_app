var express = require('express');
var router = express.Router();

/*$(document).ready(() => {
  $('.parallax').parallax();
});*/

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Backcountry Buddy' });
});

module.exports = router;
