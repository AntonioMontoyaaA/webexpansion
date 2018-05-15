var datosExcel = "";

$(function(){
	$('#idasignadas').addClass('resaltado');
	inicializaCalendarios();
	creatabla();
	
	$( "#datepicker1").change(function() {
		creatabla();
	});
	
	$("#descargaExcelAsignadas").click(function() {
		$("#datos").val(JSON.stringify(datosExcel));
		$("#submitBotonAsignadas").click();
	});
	
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
        }
	});
	
	$("#datepicker1").datepicker.dateFormat = 'dd/MM/yy';
	$("#datepicker1").val(FECHA_HOY);
}

function creatabla(){
	
	invocarJSONServiceAction("asignadas_info", 
				{'fechaConsulta': $( "#datepicker1").val()}, 
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
		
		
		if(data.codigo != 200) {
			cargaMensajeModal('MD ASIGNADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			$("#descargaExcelAsignadas").hide();
			initTablaMemoriasAsignadas('DivTablaAsignadas', 0, 'tablaMemoriasAsignadas');
		} else {
			var resultados = data.mds;
			datosExcel = data;
			$("#descargaExcelAsignadas").show();
			
			var datosMemoriasAsignadas = new Array();
			var total = 0;
			var spanRojo = "";
			var puntuacionEnTiempoA = "<img src='img/icono_estrella_azul.png'>&nbsp;&nbsp;&nbsp;<img src='img/icono_estrella_azul.png'>&nbsp;&nbsp;&nbsp;<img src='img/icono_estrella_azul.png'>";
			var puntuacionEnTiempoB = "<img src='img/icono_estrella_azul.png'>&nbsp;&nbsp;&nbsp;<img src='img/icono_estrella_azul.png'>";
			var puntuacionEnTiempoC = "<img src='img/icono_estrella_azul.png'>";
			var puntuacionVencidaA = "<img src='img/icono_estrella_roja.png'>&nbsp;&nbsp;&nbsp;<img src='img/icono_estrella_roja.png'>&nbsp;&nbsp;&nbsp;<img src='img/icono_estrella_roja.png'>";
			var puntuacionVencidaB = "<img src='img/icono_estrella_roja.png'>&nbsp;&nbsp;&nbsp;<img src='img/icono_estrella_roja.png'>";
			var puntuacionVencidaC = "<img src='img/icono_estrella_roja.png'>";
			var estrellas = "";
			
			for( var i = 0 ; i < resultados.length; i++){
				
				if(resultados[i].mdVencida) {
					spanRojo = "color: #FF5B16";
				} else {
					spanRojo = "";
				}
				
				if(resultados[i].categoria == 'A' && resultados[i].mdVencida) {
					estrellas = puntuacionVencidaA;
				} else {
					estrellas = puntuacionEnTiempoA;
				}
				if(resultados[i].categoria == 'B' && resultados[i].mdVencida) {
					estrellas = puntuacionVencidaB;
				} else {
					estrellas = puntuacionEnTiempoB;
				}
				if(resultados[i].categoria == 'C' && resultados[i].mdVencida) {
					estrellas = puntuacionVencidaC;
				} else {
					estrellas = puntuacionEnTiempoC;
				}
				
				datosMemoriasAsignadas[i] = new Array();	 	 		 			 
				datosMemoriasAsignadas[i][0] = "<span style='" + spanRojo + "'>" + resultados[i].nombreMd + "</span>"; 
				datosMemoriasAsignadas[i][1] = "<span style='" + spanRojo + "'>" + resultados[i].categoria + "</span>";
				datosMemoriasAsignadas[i][2] = "<span style='" + spanRojo + "'>" + resultados[i].puntuacion + "</span>" + estrellas;
				datosMemoriasAsignadas[i][3] = "<span style='" + spanRojo + "'>" + resultados[i].creador + "</span>";
				datosMemoriasAsignadas[i][4] = "<span style='" + spanRojo + "'>" + resultados[i].fechaCreacion + "</span>";
				datosMemoriasAsignadas[i][5] = "<span style='" + spanRojo + "'>" + resultados[i].fechaVencimiento + "</span>";
				datosMemoriasAsignadas[i][6] = "<div><img src='img/iconos_COMENTARIOS.png'></div>"
				datosMemoriasAsignadas[i][7] = resultados[i].mdId;
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
	$("#tablaMemoriasAsignadas").dataTable().fnFilter($("#buscadorAsignadas").val());
}


function redireccionaConsulta() {
	console.log("*** LE DIERON EN EL SI ***");
}

function redireccionaConsultaDos() {
	console.log("*** LE DIERON EN EL SI V2 ***");
}