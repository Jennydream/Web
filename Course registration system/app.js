var http = require('http');
var express = require('express');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var mongoose = require("mongoose");

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
	console.log("connected to mongod server");
});

mongoose.connect('mongodb://localhost/project', {useNewUrlParser:true});

app.set('view engine', 'pug')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

var users = require('./models/user');
var classes = require('./models/class');


var Cl;

app.get('/', function(req, res){
	var id = req.cookies.student_id;
	
	res.render('human-index', {student_id : id});
});

app.get('/natural', function(req, res){
	var id = req.cookies.student_id;
	
	res.render('natural-index', {student_id : id});
});

app.get('/human', function(req, res){
	var id = req.cookies.student_id;

	res.render('human-index', {student_id : id});
});

app.get('/gls', function(req, res){
	
	var id = req.cookies.student_id;
	var valu = req.cookies.val;
	var outvalu = req.cookies.outval;
	//var atempp = req.cookies.cval;
	
	//console.log('outvalu '+ atempp);
	
	if(id !="admin"){	
		var tempp=0;
		users.findOne({student_id : id},{name : 1, birth: 1, department: 1}, function(err, gstudent){;	
			var n = gstudent.name;	
			var b = gstudent.birth;	
			var d = gstudent.department;

			classes.find(function(err, cstudent){	
				Cl = cstudent.length;	
				if(valu != "undefined" ){
					for(var i=0; i<cstudent.length; i++){
						if(valu==cstudent[i].class && cstudent[i].bagvalue==0){
							cstudent[i].bagvalue= 1;	
							classes.updateOne({class:valu},{$set:{bagvalue:1}}, function(err,cstudent){});
							//res.render('gls_main', {student_id: id, namee : n, birthh: b,departmentt:d, clength: Cl, carry: cstudent, temp : 1});		
							tempp=1;
							
						}					
					}
					
				}
				else if(outvalu != "undefined"){

					for(var i=0; i<cstudent.length; i++){


						if(outvalu == cstudent[i].class && cstudent[i].bagvalue==1){
							cstudent[i].bagvalue= 0;	
							classes.updateOne({class:outvalu},{$set:{bagvalue:0}}, function(err, cstudent){});
							//res.render('gls_main', {student_id: id, namee : n, birthh: b,departmentt:d, clength: Cl, carry: cstudent, temp : 1});				
							tempp=2;
							
							console.log('out  '+ outvalu);
						}						
					}	
															
				}else{
					tempp=0;
					
				}
				

				res.render('gls_main', {student_id: id, namee : n, birthh: b,departmentt:d, clength: Cl, carry: cstudent, temp : tempp});																
				
			});
		});
		
	}else {

		classes.find(function(err, cstudent){	
			var Cl = cstudent.length;			
			res.render('gls_main', {student_id : id, clength: Cl, carry: cstudent});
					
		});
	}
	
});

app.get('/sugang', function(req, res){
	
	var id = req.cookies.student_id;
	var cancle = req.cookies.val;
	var register = req.cookies.outval;
	users.find({student_id : id}, function(err, gstudent){;	
			var n = gstudent[0].name;	
			var b = gstudent[0].birth;	
			var d = gstudent[0].department;
			var sugang_credit=0;
			var sugang_register=0;
			//users.updateOne({student_id : id},{$set:{allow_credit:18}}, function(err,gstudent){});
			
			classes.find(function(err, cstudent){	
				Cl = cstudent.length;		
					
				//classes.updateOne({regi_student : 1},{$set:{regi_student : 0}}, function(err, cstudent){});
				if(register != "undefined" ){

					for(var i=0; i<cstudent.length; i++){
						if(register==cstudent[i].class && cstudent[i].bagvalue==1){
							
							cstudent[i].sugangvalue= 4;	
					
							classes.updateOne({class:register},{$set:{sugangvalue:4}}, function(err, cstudent){});
							
							sugang_credit = gstudent[0].allow_credit-cstudent[i].credit;

							if(sugang_credit<0 ){
								sugang_register = cstudent[i].regi_student;
								cstudent[i].regi_student= sugang_register;	
								classes.updateOne({class:register},{$set:{regi_student :sugang_register}}, function(err, cstudent){});
								sugang_credit=gstudent[0].allow_credit;
								users.updateOne({student_id : id},{$set:{allow_credit:sugang_credit}}, function(err,gstudent){});
								
							}
							else{
									
								sugang_register = cstudent[i].regi_student+1;
								cstudent[i].regi_student= sugang_register;	
								classes.updateOne({class:register},{$set:{regi_student :sugang_register}}, function(err, cstudent){});		
								users.updateOne({student_id : id},{$set:{allow_credit:sugang_credit}}, function(err,gstudent){});			
								gstudent[0].allow_credit=sugang_credit;
							}
							
						}			
					}	
									
				}

				else if(cancle != "undefined"){		
						
					for(var i=0; i<cstudent.length; i++){
						if(cancle == cstudent[i].class && cstudent[i].sugangvalue==4){
							cstudent[i].sugangvalue=2;						
							classes.updateOne({class:cancle},{$set:{sugangvalue:2}}, function(err, cstudent){});				
							sugang_register = cstudent[i].regi_student-1;
							cstudent[i].regi_student= sugang_register;	
							classes.updateOne({class:cancle},{$set:{regi_student :sugang_register}}, function(err, cstudent){});

							sugang_credit = gstudent[0].allow_credit+cstudent[i].credit;
							
							users.updateOne({student_id : id},{$set:{allow_credit:sugang_credit}}, function(err,gstudent){});
							gstudent[0].allow_credit=sugang_credit;
						}						
					}										
				}
				
				res.render('sugang', {student_id: id, namee : n, birthh: b,departmentt:d,clength: Cl, carry: cstudent, allow : gstudent[0].allow_credit });																									
			
			});
		});	
});
app.post('/user/login', function(req,res){

	
	if(req.body.id == "" || req.body.password == "" ){
		res.send({result : "2"});
	}else{
		users.find({$and : [{student_id :req.body.id}, {password : req.body.password}]},function(err, student){
			if(student != "" && student!= ""){
				//console.log(req.body.id);
				res.cookie('student_id', req.body.id);	
        		res.send({result: "1"});
			}else{
				res.cookie('student_id' , null);
				res.send({result : "0"});
			}
		});
	}
});

app.post('/user/sign', function(req,res){

	const student = new users();
	student.student_id = req.body.idd;
	student.password = req.body.passwordd;
	student.name = req.body.name;
	student.birth = req.body.birth;
	student.department = req.body.department;
	student.allow_credit=18;

	if(student.student_id.length==0 || student.password.length == 0 || student.name.length == 0 || student.birth.length==0 ||student.department.length==0 ){
		res.send({result : "0"});
	}
	else{
		users.find({ student_id : req.body.idd }, function(err, fstudent){
			if(fstudent == ""){			
				student.save(function(err, fstudent){ 			
				});
				res.send({result: "1"});
			}else{		
				res.send({result : "2"});
			}
		});	
	}	
});

app.post('/user/logout', function(req,res){
	res.cookie('student_id', null);
	res.send({result: null});	
});

app.post('/user/gls', function(req,res){
	res.send({result:"1"});
	
});

app.post('/class/gls', function(req,res){

	const course = new classes();
	course.class = req.body.class;
	course.cname = req.body.cname;
	course.profe = req.body.profe;
	course.Mstudent = req.body.Mstudent;
	course.credit = req.body.credit;
	course.bagvalue=0;
	course.sugangvalue=2;
	course.regi_student=0;
	
	var val = req.body.value;
	var outval=req.body.outvalue;
	
	
	res.cookie('val',val);
	res.cookie('outval',outval);
	

	if(val !=null || outval !=null){
		var temp=0;
		classes.find(function(err, sstudent){		
			for( var i=0; i<sstudent.length; i++){
				if(val== sstudent[i].class && sstudent[i].bagvalue==0){
					temp=1
				}
			}
		 	if(temp==1){
		 		res.send({result:"1"});		 		
		 	}
		 	else{
		 		res.send({result:"2"});		 		
		 	}

		});
	}
	else if(val == null) {
		
		if(course.class=="" || course.cname == ""|| course.profe == "" || course.Mstudent=="" ||course.credit=="" ){
		res.send({result : "0"});
		}
		else{
			classes.find({ class : req.body.class }, function(err, cstudent){
				
				if(cstudent == ""  ) {				
					
					course.save(function(err,cstudent){ 				
					});			
					res.send({result: "1"});
											
				}else{
					
					res.send({result : "2"});		
									
				}				
			});						
		}	
	}
	
});


app.post('/class/sugang', function(req,res){
	
	var suvalue = req.body.svalue; //cancle button
	var registervalue=req.body.regvalue; //registerbutton
	var couvalue = req.body.courvalue; //coursebutton

	

	res.cookie('outval',registervalue);
	res.cookie('val',suvalue);
	res.cookie('couvalue',couvalue);

	if(suvalue !=null || registervalue !=null){
		var temp=0;
		var cred=0;
		var cal=0;
		var compare=0;
		classes.find(function(err, sstudent){		
			for( var i=0; i<sstudent.length; i++){
				if(sstudent[i].sugangvalue==4){
					cal+=sstudent[i].credit;
				}
				if(registervalue == sstudent[i].class && sstudent[i].sugangvalue==2){
					temp=1;
					compare=sstudent[i].credit;
					
				}
				
			}			
			cred=18-cal-compare;
						
		 	if(temp==1 && cred>0){
		 		res.send({result:"1"});		 		
		 	}
		 	else if(temp!=1 && cred>0){
		 		res.send({result:"2"});		 		
		 		temp=0;		 		
		 	}
		 	else{
				res.send({result:"3"});	
			}
		});
	}
});

app.listen(8000, function(){
	console.log("server is ready on port 8000!");
});
