/**
@author: Amol Kapoor
@date: 8-16-15
@version: 0.1

File manipulation functions for settings bar specifically
*/

/**
    Calls for the previous set of five forms from the server
*/
function loadPrevFive() {
    loadChangedFormsToDB();
    loadFormFromDB(currentPatient, firstDateLoaded, null, true);
}

/**
    Calls for the next set of five forms from the server
*/
function loadNextFive() {
    loadChangedFormsToDB();
    loadFormFromDB(currentPatient, lastDateLoaded, true)
}

/**
    Creates a new form for a specific patient and copies in the patient name, precautions, and diagnosis for the new form
*/
function createNewPatientForm() {
    createForm(true);
    attachSubmitHandler('#form-' + global_formCount);

    $(".forms").animate({ scrollLeft: document.getElementById("Forms").scrollWidth}, 400);
}

/**
    Copies all of the data from the last day to the current day
*/
function copyForward() {
    if(global_formCount < 1)
        return;

    $('#form-' + (global_formCount - 1) + ' :input').each(function(){

        if($(this).val()) {
            var classes = $(this).attr("class")     
            classes = classes.split(" ");

            if(classes[0] !== 'apptDate') {
                openFormData("#form-" + global_formCount, classes[0], $(this).val());  
            }
        }
    });
}

/**
    Downloads all visible forms as pdfs
*/
function downloadFormsAsPDF() {
    var doc = new jsPDF();

    var labelfontSize = 8;
    var yStart = 20;
    var xStart = 20;
    var yDelta = 5;
    var xDelta = 45;

    var xValueOffset = 10;

    var yOffset = yStart;
    var xOffset = xStart;

    doc.setFontSize(labelfontSize);

    $('.multi-day-form-exercises-info-container .data-form').each(function() {
     
        var text = $(this).find('label, input, tr');

        var valueText = "";

        for(var i = 0; i < text.length; i++) {

            if($(text[i]).is("input")) {

                if ($(text[i]).val()) {
                    if(valueText)
                        valueText = valueText + ", " + $(text[i]).val();
                    else
                        valueText = $(text[i]).val();
                }

            }
            else if ($(text[i]).is("tr")) {
                
                if(valueText) {
                    doc.text(xOffset + xValueOffset, yOffset, valueText);
                    yOffset += yDelta;
                    valueText = "";
                }

            }
            else {

                if(valueText) {
                    doc.text(xOffset + xValueOffset, yOffset, valueText);
                    yOffset += yDelta;
                    valueText = "";
                }

                doc.text(xOffset, yOffset, $(text[i]).html())
                yOffset += yDelta;
            }
        }

        if(valueText) {
            doc.text(xOffset + xValueOffset, yOffset, valueText);
            yOffset += yDelta;
            valueText = "";
        }

        yOffset = yStart;
        xOffset = xOffset + xDelta;

    });

    //$.when.apply($, deferredArray).then(function() {
        doc.save('test.pdf');
    //});

}