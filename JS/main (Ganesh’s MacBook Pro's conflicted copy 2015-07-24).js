/**
@author: Amol Kapoor
@date: 6-30-15
@version: 0.1

Runner file. Executes program, initializes available libraries, etc. 
*/

//Event triggers

$("#DataForm").submit(function(event) {
	event.preventDefault();

    var $inputs = $('#DataForm :input');
	var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    // console.log($("#DataForm").elements["PatientInput"]);
});

$("#SubmitData").click(function() {
	$("#DataForm").submit();
});

$("#SubmitLogin").click(function () {
	alert('bitch2');
    $("#TitlebarForm").submit(function(event) {
		event.preventDefault();

	    var $inputs = $('#TitlebarForm :input');
		var values = {};
	    $inputs.each(function() {
	        values[this.name] = $(this).val();
	    });
	    console.log(values);
		socket.emit("clientToServer", {
	        name: "login",
	        username: values.username,
			password: values.password
		}, function(data, err, isAppError) {
			if(err) {
				errorHandler(err, isAppError);
			} 
			else {
				login(data);
			}
		});
	});

	$("#TitlebarForm").submit();
});

$("#LogoutButton").click(function() {   
	alert("Not logged in");
});

$("#RegisterNewUser").submit(function(event) {
	event.preventDefault();

    var $inputs = $('#RegisterNewUser :input');
    console.log($inputs);
	var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    console.log(values)
	socket.emit("clientToServer", {
		name: "newUser",
		username: values.username,
		password: values.password,
		email: values.email, 
		fullname: values.firstname + " " + values.lastname
	}, function(data, err, appError) {
		if(err) {
			errorHandler(err, appError);
		}		
		else {
			login(data);
		}
	});
});

$("#HiddenSubmitLogin").submit(function() {
	alert('bitch');
	$("#SubmitLogin").trigger("click");
})

