var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loginpage',function(req,res){
  res.sendFile(path.resolve('public/loginpage.html'))
})

module.exports = router;
