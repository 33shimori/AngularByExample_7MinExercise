var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '7 minute Workout' });
});
router.get('/:name', function (req, res){
	var name = req.params.name;
	console.log(name);
	res.render(path.join(__dirname, '../views/templates') + '/'+name);
})


module.exports = router;
