/**
@author: Amol Kapoor
@`: 6-30-15
@version: 0.1

Runner file. Executes program, initializes available libraries, etc. 
*/

//Event triggers

//The only default function that should be here: default error handler
function errorHandler(data, isAppError) {
    console.log(data);
    alert(data.message);

    if(data.name && data.name === 'loginFailure') {
        submitLogout();
        logout();
    }
}

$("#SubmitLogin").click(function () {
    submitLogin();
});

$("#TitlebarForm").submit(function(event) {
    event.preventDefault();
    $("#SubmitLogin").trigger("click");
});

$("#Logout").click(function() {   
    submitLogout();
});

//Retrieve/store info (note: store is in files.js, under form.find('hidden-submit').click(), and retrieve is under widget)
/*$("#RetrieveInfoTest").click(function() {
    loadFormFromDB();
});*/

$("#CreateNewForm").click(function(){
    createNewForm();
});

// Reveal delete form checkboxes
$("#DeleteMode").click(function() {

    $('#DeleteMode').hide();
    $('#CancelDelete').show();
    $('#DeleteSelected').show();
    $('#DeleteAll').show();

    $('.data-form').closest("li").css('background', 'red');

    deleteToggle();
});

$('#CancelDelete').click(function() {
    $('#DeleteMode').show();
    $('#CancelDelete').hide();
    $('#DeleteSelected').hide();
    $('#DeleteAll').hide();

    $(".data-form").unbind( "click" );

    $('.data-form').closest("li").css('background', 'white');
    deletedForms = {};

})

$('#DeleteSelected').click(function() {
    finalDelete(false);
    $('#CancelDelete').trigger('click');
})

$('#DeleteAll').click(function() {
    finalDelete(true);
    $('#CancelDelete').trigger('click');
})

//Copy forward
$("#CopyForward").click(function() {
    copyForward();
});

// Load removeForms
$("#SubmitForms").click(function(){
    console.log(1);
    loadChangedFormsToDB(function() {
        removeForms();
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        $("#queryResetButton").click();
    });
    console.log(2);
});

//Load next/prev five docs
$("#NextFive").click(function() {
    loadNextFive();
});

$("#PrevFive").click(function() {
    loadPrevFive();
});

//Create new form for the patient
$("#SettingsNewForm").click(function() {
    createNewPatientForm();
});

//Download form as pdf
$("#DownloadForms").click(function() {
    downloadFormsAsPDF();
});

//Closes a patient cycle
$("#CloseInjury").click(function() {
    closePatientInjury();
});

//Password/username
function main() {
    if (localStorage.getItem("username")) {
        $("#UsernameField").val(localStorage.getItem("username"));
    }

    if (localStorage.getItem("password")) {
        $("#PasswordField").val(localStorage.getItem("password"));
    }  
}

main();