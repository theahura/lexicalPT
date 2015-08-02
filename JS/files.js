/**
@author: Amol Kapoor
@date: 7-29-15
@version: 0.1

File manipulation functions
*/

var global_formCount = 0;

function removeForms(callback) {
    $(".multi-day-form-exercises-info-container").fadeOut(function() {
        $(".multi-day-form-exercises-info-container").empty();
        global_formCount = 0;

        if(callback)
            callback();
    });
}

function createForm() {

    var globalCount = global_formCount;

    var $form = $("#form-default").clone(true);

    $form.attr("id","form-" + globalCount);

    $form.removeClass("hidden");
    
    $form.find(".data-form").submit(function(event) {
        event.preventDefault();
        loadFormToDB("#form-" + globalCount);
    });

    $form.find(".submit-data").click(function() {
        $form.find(".hidden-submit-data").click();
    });

    $(".multi-day-form-exercises-info-container").append($form);

    $(".multi-day-form-exercises-info-container").fadeIn();

    global_formCount++;
}

/**
	Triggered on form submit, compiles the form into JSON and loads to server to db
*/
function loadFormToDB(form) {
    console.log(form)
    var $inputs = $(form +' :input');
    var values = {};
    values.name = "store";
    values.userKey = global_userKey;

    console.log($inputs);

    $inputs.each(function() {
        values[this.name] = $(this).val();
    });

    values['apptDate'] = new Date(values['apptDate']).getTime();

    console.log(values)

	socket.emit("clientToServer", values,
		function(data, err, isAppError) {
		if(err) {
			errorHandler(err, isAppError);
		} 
		else {
			alert("Success?")
		}
	});
}

function _loadFormFromDB(data) {
	console.log(data);

    removeForms(function() {
        for(var i = 0; i < data.length; i++) {

            if(i > global_formCount - 1) {
                createForm();
            }

            for(classnames in data[i]) {      
                console.log(classnames);

                if(classnames === 'apptDate') {
                    $("#form-" + i + " .apptDate").val(new Date(parseInt(data[i][classnames].N)).toISOString().substring(0, 10));
                    continue;
                }

                console.log(data[i][classnames].S)

                console.log($("#form-" + i + " ." + classnames))

                $("#form-" + i + " ." + classnames).val(data[i][classnames].S);
            }
        }
    
        $(".tables").fadeIn();
        $('html, body').animate({
                scrollTop: $("#BreakOne").offset().top
        }, 400);
    });
}

/**
	Triggered on form request, (currently) prompts for patient name and apptDate 	
*/
function loadFormFromDB() {
	patient = prompt("PatientName?");
    apptDate = prompt("apptDate?");

    socket.emit("clientToServer", {
        name: 'retrieve',
        userKey: global_userKey,
        patient: patient,
        apptDate: apptDate
    }, function(data, err, appError) {
      if(err) {
        errorHandler(err, appError);
      }   
      else {
        _loadFormFromDB(data);
      }    
    });
}
