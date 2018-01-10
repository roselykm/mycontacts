$(function(){
   $('#login-form-link').click(function(e) {
		$("#loginform").delay(100).fadeIn(100);
 		$("#registerform").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#register-form-link').click(function(e) {
		$("#registerform").delay(100).fadeIn(100);
 		$("#loginform").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$("#loginform").submit(function(e){	
		e.preventDefault();
		e.stopPropagation();

		var email = $("#email").val();
		var password = $("#password").val();

		var obj = new Object();
		obj.email = email;
		obj.password = password;
		console.log(JSON.stringify(obj));
	});

	$("#registerform").submit(function(e){	
		e.preventDefault();
		e.stopPropagation();

		var fname = $("#regfname").val();
      var lname = $("#reglname").val();
		var email = $("#regemail").val();
		var password = $("#regpassword").val();
		var confirmpassword = $("#regconfirmpassword").val();

		if (password != confirmpassword) {
			bootbox.alert("Password and confirm password is not the same!");
			return;
		}

		var obj = new Object();
		obj.fname = fname;
      obj.lname = lname;
		obj.email = email;
		obj.password = password;
		console.log(JSON.stringify(obj));

      $.ajax({
         type: "post",
         contentType: 'application/json',
         url: 'http://www.kerjadigital.net/mycontacts/api/registration',
         data: JSON.stringify(obj),            
         dataType: "json",
         success: function(data){
            if (data.insertstatus == true) {
            	bootbox.alert("Registration successful, you can login now!");
            	$("#registerform")[0].reset();
            } else {
            	bootbox.alert("<p>Registration failed</p>" + data.error);
            	$("#registerform")[0].reset();
            }
         },
         error: function() {
            console.log("error");
         }
      });  
	});

	$("#regemail").blur(function(){

		var email = $("#regemail").val();
      $.ajax({
         type: "get",
         url: "http://www.kerjadigital.net/mycontacts/api/checkemail/" + email,
         dataType: "json",            
         success: function(data){
         	if (data.exist) {
         		bootbox.alert("Email: " + email + ", already being used! Please use different email");
         		$("#regemail").val("");
         	} else {
         		bootbox.alert("Email ok, still not being used!");
         	}
         },
         error: function() {
            bootbox.alert("general error - please try to login again");
         }
      });		
   });

   $("#regpassword").blur(function(){

   	var password = $("#regpassword").val();

   	if (password == "")
   		return;

		//validate password
		var passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;  

		if(passwordregex.test(password))   
		{
			bootbox.alert("password valid: " + password);
			return;
		} else {
			bootbox.alert("Password not valid: " + password + 
				           "<br /><br />Minumum 8 characters" +
				           "<br />At least 1 lowercase [a-z]" +
				           "<br />At least 1 uppercase [A-Z]" +
				           "<br />At least 1 number [0-9]");
			return;
		}   
   });

	$("#loginform").submit(function(e){	
		e.preventDefault();
		e.stopPropagation();

		var email = $("#email").val();
		var password = $("#password").val();

		var obj = new Object();
		obj.email = email;
		obj.password = password;

      $.ajax({
         type: "post",
         contentType: 'application/json',
         url: 'http://www.kerjadigital.net/mycontacts/api/auth',
         data: JSON.stringify(obj),            
         dataType: "json",
         success: function(data){
            if (data.status == 1) {

            	sessionStorage.session = true;
            	sessionStorage.token = data.token;
            	sessionStorage.fname = data.fname;
               sessionStorage.lname = data.lname;
            	sessionStorage.photo = data.photo;

            	bootbox.alert("Login successful!", function() {
            		window.location.href = "index.html";
					});

            } 
            else if (data.status == 0) {
            	sessionStorage.clear();
            	bootbox.alert("Login failed - wrong password!");
            }
            else if (data.status == -1) {
            	sessionStorage.clear();
            	bootbox.alert("Login failed - user with that email not exist!");
            }
         },
         error: function() {
            console.log("error");
         }
      });  
	});
});