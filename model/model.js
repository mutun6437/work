var mongoose = require("mongoose");
var util = require("./util.js");

// 定義フェーズ
var Schema   = mongoose.Schema;

var SkillSchema = new Schema({
	name:String,
	experience:Number
});
mongoose.model('Skill', SkillSchema);

var ProjectSchema = new Schema({
	name:String,
	project:String,
	address:String,
	route:String,
	detail:String,
	time:String,
	range:String,
	cost:Number,
	span:String,
	priority:[SkillSchema],
	secondary:[SkillSchema],
	genre:String,
	interview:Number,
	minAge:Number,
	foreigner:Boolean,
	maxAge:Number,
	number:Number,
	other:[String],
	question:[String]
});
mongoose.model('Project', ProjectSchema);

var CompanySchema = new Schema({
  name:  String,
  address: String,
  route:String,
  time:String,
  range:String,
  projects:[ProjectSchema]
});
mongoose.model('Company', CompanySchema);

// 使用フェーズ
mongoose.connect('mongodb://localhost/company');

var Company = mongoose.model('Company');
var Project = mongoose.model('Project');
var Skill = mongoose.model('Skill');


//再起動後に削除
//Company.remove({},function(err){});
//Project.remove({},function(err){});



/*var company = new Company();
company.name  = "エフォーション";
company.address = "渋谷";
company.range = "140-160";

var skill = new Skill({
	name:"JAVA",
	experience:12
});

var project = new Project({
	title:"新規ゲーム開発のインフラ構築要因募集",
	address:"渋谷",
	priority:["JAVA"],
	detail:"内容"
});

project.priority.push(skill);
company.projects.push(project);

company.save(function(err) {
  if (err) { console.log(err); }
  console.log("保存完了");
});*/



var demo = require("./demo.js");

for(var i = 0;i<demo.data.length; i++){
	console.log(demo.data[i].name);
	var project = new Project(demo.data[i]);
	project.save(function(err){
		if(err){console.log(err);}
		console.log("デモデータが挿入されました");
	});
}





/*会社名取得*/
exports.getCompany = getCompany = function(param){
	return new Promise(function(resolve,reject){
		console.log("検索を開始します");
		if(param === undefined){
			param = {};
		}

		Company.find({}, function(err, docs) {
		  if(err){
		  	console.log("エラー");
		  	reject(err);
		  }
		  console.log("検索完了");
		  resolve(docs);
		});
	});
}

/*会社名保存*/
exports.postCompany = postCompany = function(param){
	return new Promise(function(resolve,reject){
		console.log("会社を保存します");
		if(param === undefined){
			param = {};
		}

		var company = new Company();
		setParam(company,"name",param.name);
		setParam(company,"address",param.address);
		setParam(company,"range",param.range);

		company.save(function(err){
			if (err) { console.log(err); reject(err);}
			console.log("保存完了");
			resolve(true);
		});

	});
}


/*要員検索*/
exports.getProject = getProject = function(param){
	return new Promise(function(resolve,reject){
		
		if(param === undefined){
			param = {};
		}

		Project.find({})
		//.where('projects')//.in([{"priority":"JAVA"}])
		.exec(function(err,docs){
			console.log("プロジェクトを検索します");
			if(err){
				reject(err);
			}

			var projects = [];
			for(i=0;i<docs.length;i++){
				projects.push(docs[i]);				
			}

			var results = projects;

			//console.log(typeof(results.priority));


			/*スキル検索*/
			var skillResult = [];
			if(param.skill){
				results.filter(function(project,index){
					project.priority.filter(function(skill,index){
						if(skill.name === param.skill){
							console.log("一致");
							skillResult.push(project);
						}
					});
				});
				results = skillResult;
			}


			/*経験年数*/
			var experienceResult = [];
			if(param.experience){
				results.filter(function(project,index){
					project.priority.filter(function(skill,index){
						console.log(skill.experience+":"+param.experience);
						if(skill.experience <= Math.ceil(param.experience)){
							console.log("一致");
							experienceResult.push(project);
						}
					});
				});
				results = experienceResult;
			}

			

			/*単価*/
			var costResult = [];
			if(param.cost){
				results.filter(function(project,index){
					if(project.cost >= param.cost/0.84){
						console.log("一致");
						costResult.push(project);
					}
				});
				results = costResult;
			}
			resolve(results);

		});

	});
};


exports.postProject = postProject = function(param){
	return new Promise(function(resolve,reject){
		var project = new Project(param);
		console.log("a:"+JSON.stringify(param));

		project.save(function(err){
			if(err){
				console.log(err);
			}
			console.log("保存が完了");
			resolve(true);
		});
	});
}




exports.findAll = findAll = function(param){
	return new Promise(function(resolve,reject){
		Project.find({},function(err,docs){
			resolve(docs);
		});
	});
}