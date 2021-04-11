function hideNavi(id) {
	var navi = document.getElementById(id);
	if(navi.style.visibility == "hidden")
		navi.style.visibility = "visible";
	else
		navi.style.visibility = "hidden";
}

function changeTableStyle(common_id){
	i = 0;
	do
	{
		id = common_id + "_" + i;
		t = document.getElementById(id)

		if( t == null )	break;

		t = t.getElementsByTagName("table");
		
		for(var j=0;j<t.length;j++)
		{
			if(t[j].className == "table table-striped table-dark")
				t[j].className = "table table-striped table-hover";
			else
				t[j].className = "table table-striped table-dark";
		}

		i++;
	}while(t != null);
}


$(function(){
	$("#login").click(function(){
		$("#login_popup").slideToggle();
	});

	$("#register").click(function(){
		$("#register_popup").slideToggle();
	});

	$("#LoginBtn").click(function(){
		var formData = $("#LoginForm").serialize();
		$.ajax({
	 		type : "POST",
	 		url : "/user/login",
	 		data : formData,
	 		success : function(res){
	 			if (res.result == "1"){
	 				//console.log("login");
	 				window.location.replace("/human");
	 			}else if(res.result=="0"){
	 				alert("ID or Password is wrong!");
	 			}
	 			else {
	 				alert("Fill all input!");
	 			}
			}
		});
	});

	$("#signBtn").click(function(){
		var formData = $("#signForm").serialize();
		$.ajax({
	 		type : "POST",
	 		url : "/user/sign",
	 		data : formData,
	 		success : function(res){
	 			if (res.result == "1"){
	 				//console.log("log");
	 				window.location.replace("/");
	 				//$( "#testDatepicker" ).datepicker({
    				//});
    				console.log('eeeeee');

	 			}else if(res.result == "0"){
	 				alert("Fill all input!");
	 			}
	 			else {
	 				alert("Duplicated ID!");
	 				window.location.replace("/");
	 			}

			}
		});
	});


	$("#LogoutBtn").click(function(){
		var formData = $("#LogoutForm").serialize();
		$.ajax({
	 		type : "POST",
	 		url : "/user/logout",
	 		data : formData,
	 		success : function(res){
	 			if (res.result == null){
	 				window.location.replace("/");	
	 				window.location.reload();		
				}
			}
		});
	});

	$("#glsBtn").click(function(){
		var formData = $("#glsForm").serialize();
		$.ajax({
	 		type : "POST",
	 		url : "/user/gls",
	 		data : formData,
	 		success : function(res){
	 			if (res.result == "1"){
	 				window.location.replace("/gls");

				}
			}
		});
	});

	$("#courseBtn").click(function(){
		var formData = $("#courseForm").serialize();

		$.ajax({
	 		type : "POST",
	 		url : "/class/gls",
	 		data : formData,
	 		success : function(res){
	 			if (res.result == "1"){
	 					
	 				window.location.reload();
	 						 				
	 				
	 			}else if(res.result == "0"){
	 				alert("Fill all input!");
	 			}
	 			else {
	 				alert("There is already course!");
	 				window.location.replace("/gls#");
	 			}

			}
		});
	});
	$(".PutBtn").click(function(){
		var formData = $(".PutBtn").serialize();
		var value = $(this).attr('value');

				
		$.ajax({
	 		type : "POST",
	 		url : "/class/gls",
	 		data : {formData, value},
	 		success : function(res){
	 			if (res.result == "1"){ 
	 				window.location.reload();
	 				console.log
	 			}
	 			else { 				
	 				alert("There is already course!");	 				
	 			}
			}			
		});
		
	});


	$(".OutBtn").click(function(){
		var formData = $(".OutBtn").serialize();
		var outvalue = $(this).attr('outvalue');	
		  		
		$.ajax({
	 		type : "POST",
	 		url : "/class/gls",
	 		data : {formData, outvalue},
	 		success : function(res){	 							
	 			//window.location.replace("/gls#");
	 			window.location.reload(true);	
	 			//window.location.replace("/gls#bag"); 			
			}
		});
	});
	$(".CancleBtn").click(function(){
		var formData = $(".CancleBtn").serialize();
		var svalue = $(this).attr('svalue');
		console.log(svalue);
		$.ajax({
	 		type : "POST",
	 		url : "/class/sugang",
	 		data : {formData,svalue},
	 		success : function(res){
	 				window.location.reload();
	 			}
			
		});
	});

	$(".RegisterBtn").click(function(){
		var formData = $(".RegisterBtn").serialize();
		var regvalue = $(this).attr('regvalue');
		//var idvalue = $(this).attr('idvalue');

		//console.log(idvalue);
		$.ajax({
	 		type : "POST",
	 		url : "/class/sugang",
	 		data : {formData,regvalue},
	 		success : function(res){ 		
	 			if (res.result == "1"){ 					 		
	 				//window.location.replace("/sugang"); 	 	
	 				window.location.reload();		
	 			}
	 			else if(res.result=="2"){	 				
	 				alert("There is already course!");
	 				//window.location.replace("/sugang");		 				
	 			}
	 			else{
	 				alert("Not enough credits");
	 			}					
	 		}		
		});
	});
	
	$(".nav-link").click(function(){
		
	//	console.log($(this).attr('id'));
		var id = ['home', 'add', 'list', 'student','course','bag'];

		for(var i=0;i<id.length;i++)
		{
			if($(this).attr('class') == 'nav-link disabled')
				break;

			if($(this).attr('id') == id[i])
			{
				
	
				$('#'+id[i]).removeClass('link');
				$('#'+id[i]).addClass('active');
				$('#'+id[i]+'Content').show();
			}
			else
			{
				
				$('#'+id[i]).removeClass('active');
				$('#'+id[i]).addClass('link');
				$('#'+id[i]+'Content').hide();
			}

		}
		
	});
});