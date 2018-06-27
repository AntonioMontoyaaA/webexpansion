$(function(){
	$('#idagenda').addClass('resaltado');
	inicializaCalendarios();
	
});

function inicializaCalendarios(){
	$('#embeddingDatePicker').datepicker({
		setDate : new Date(),
		format : 'dd/mm/yyyy',
		autoclose : true,
		language : 'es',
		todayHighlight : true
    }).on('changeDate', function(e) {
	    	$("#selectedDate").val($("#embeddingDatePicker").datepicker('getFormattedDate'));

	    });

   
	/*$('#calendarioPrincipal').datepicker({
			setDate : new Date(),
			format : 'dd/mm/yyyy',
			autoclose : true,
			language : 'es',
			todayHighlight : true
	   }).on('changeDate', function(e) {
	    	$("#selectedDate2").val($("#calendarioPrincipal").datepicker('getFormattedDate'));

	    });
	   */
}
