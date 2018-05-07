var tablaMemoriasAsignadas = null;

$(function(){
	$('#idasignadas').addClass('resaltado');
	inicializaCalendarios();
	creatabla();
	
});

function inicializaCalendarios() {
	$(".ui-datepicker-trigger").hide();
	
	var dateHoy = new Date();
	var FECHA_HOY = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	
	$( "#datepicker1").datepicker({
		maxDate:0,
		autoSize : true,
		showOn: 'both',
		showAnim: 'slideDown',
        buttonImageOnly: true,
        onClose: function( selectedDate ) {
			var date = $(this).datepicker('getDate');			
			var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	
			$("#datepicker2").datepicker( "option", "minDate", selectedDate );
        }
	});
	
	$("#datepicker1").datepicker.dateFormat = 'dd/MM/yy';
	$("#datepicker1").val(FECHA_HOY);
}

function creatabla(){
	
	invocarJSONServiceAction("asignadas_info", 
				{'variable1': 'valor1', 'mdId': 'valor2'}, 
				'obtieneMdsResponse', 
				function() {
					//Funcion de error
					
					cierraLoading();
				},
				function() {
					//Función al finalizar
					
					cierraLoading();
				});
	
	obtieneMdsResponse = function( data ) {
		
		
		if(data == null || data.error == true || data.vacia == true) {
			console.log("*** ENTRA A ERROR ***");
			
			
		}
		
		if(!data.vacia) {
			console.log("*** ENTRA A DATOS ***");
			//cargaMensajeModal('MD ASIGNADAS', 'Se consultaron exitosamente los datos', TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ERROR, redireccionaConsulta);
			
			var resultados = data.listaAsignadas
			
			var datosMemoriasAsignadas = new Array();
			var total = 0;
			
			for( var i = 0 ; i < resultados.length; i++){
				
				datosMemoriasAsignadas[i] = new Array();	 	 		 			 
				datosMemoriasAsignadas[i][0]=resultados[i].nombreMd; 
				datosMemoriasAsignadas[i][1]=resultados[i].categoria;
				datosMemoriasAsignadas[i][2]=resultados[i].puntuacion;
				datosMemoriasAsignadas[i][3]=resultados[i].creador;
				datosMemoriasAsignadas[i][4]=resultados[i].fechaCreacion;
				datosMemoriasAsignadas[i][5]=resultados[i].fechaVencimiento;
				datosMemoriasAsignadas[i][6]="<div><img src='img/iconos_COMENTARIOS.png'></div>"
				datosMemoriasAsignadas[i][7]=resultados[i].mdId;
			 }
			
			 initTablaMemoriasAsignadas('DivTablaAsignadas', datosMemoriasAsignadas, 'tablaMemoriasAsignadas');
			
			$("#tablaMemoriasAsignadas tr").click(function() {
				var nombreMd = $(this).find("td:eq(0)").html();
				var mdId = $(this).find("td:eq(7)").html();
				obtieneDetalleMd(nombreMd, mdId);
			});
		}
	};	
}

function obtieneDetalleMd(nombreMd, mdId) {
	console.log("*** Detalle de la MD: " + mdId);
	$("#nombreMd").val(nombreMd);
	$("#mdId").val(mdId);
	$("#detalleMemoriaAsignadaAction").submit();
}

function ejecutaBusquedaAsignadas() {
	tablaMemoriasAsignadas.DataTable().fnFilter($("#buscadorAsignadas").val());
}


function redireccionaConsulta() {
	console.log("*** LE DIERON EN EL SI ***");
}

function redireccionaConsultaDos() {
	console.log("*** LE DIERON EN EL SI V2 ***");
}