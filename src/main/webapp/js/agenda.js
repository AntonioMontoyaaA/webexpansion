$(function(){
	$('#idagenda').addClass('resaltado');
	
	$('#embeddingDatePicker').datepicker({
		setDate : new Date(),
		format : 'dd M, yyyy',
		autoclose : true,
		language : 'es',
		todayHighlight : true
    })
    .on('changeDate', function(e) {
        // Set the value for the date input
    	$("#selectedDate").val($("#embeddingDatePicker").datepicker('getFormattedDate'));

    });
});


