var express = require('express');
var router = express.Router();

var model = require("../model/model.js");


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/project/:data', function(req, res) {
  res.render('project', req.params.data);
});



router.post('/company/create',function(req,res){
	console.log("POST /company");
	var param =req.body;
	console.log(param);
	model.postCompany(param).then(function(result){
		res.send(true);
	},function(result){
		res.send(false);
	});
});


router.get('/company/find',function(req,res){
	console.log("GET /company");
	var params = req.body;
	model.getCompany().then(function(result){
		res.send(result);		
	},function(err){
		res.end(err);
	});
});


router.post('/project/find',function(req,res){
	console.log("POST /company/find");
	var params = req.body;
	console.log(params);
	model.getProject(params).then(function(result){
		res.send(result);		
	},function(err){
		res.end(err);
	});
});


router.post('/project/create',function(req,res){
	console.log("POST /company/create");
	var params = req.body;

	console.log(params);

	model.postProject(params).then(function(result){
		res.send(result);		
	},function(err){
		res.end(err);
	});
});



/*router.get('/project',function(req,res){
	console.log("GET /company");
	var params = req.body;
	model.findAll().then(function(result){
		res.send(result);		
	},function(err){
		res.end(err);
	});
});*/




module.exports = router;
