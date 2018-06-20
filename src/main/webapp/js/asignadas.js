var datosExcel = "";

$(function(){
	$('#idasignadas').addClass('resaltado');
	inicializaCalendarios();
//	creatabla(); //TODO remove
	if($( "#datepicker1").val()!='')
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
//	$("#datepicker1").val('01/05/2018'); //TODO remove
}

function refreshAsignadas() {
	creatabla();
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
			var spanColor = "";
			var puntuacionEnTiempoA = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionEnTiempoB = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionEnTiempoC = "<img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaA = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaB = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaC = "<img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var estrellas = "";
			
			for( var i = 0 ; i < resultados.length; i++){
				
				if(resultados[i].mdVencida) {
					spanColor = "color: #FF5B16";
				} else {
					spanColor = "color: #13b86f";
				}
				
				switch(resultados[i].categoria) {
					case 'A':	resultados[i].mdVencida ? estrellas = puntuacionVencidaA : estrellas = puntuacionEnTiempoA;
								break;
					case 'B':	resultados[i].mdVencida ? estrellas = puntuacionVencidaB : estrellas = puntuacionEnTiempoB;
								break;
					case 'C':	resultados[i].mdVencida ? estrellas = puntuacionVencidaC : estrellas = puntuacionEnTiempoC;
								break;
				};
				
				datosMemoriasAsignadas[i] = new Array();	 	 		 			 
				datosMemoriasAsignadas[i][0] = "<span style='" + spanColor + "'>" + resultados[i].nombreMd + "</span>"; 
				datosMemoriasAsignadas[i][1] = "<span style='" + spanColor + "'>" + resultados[i].categoria + "</span>";
				datosMemoriasAsignadas[i][2] = "<span style='"  + "'>" + resultados[i].puntuacion + " puntos </span>" + estrellas;
				datosMemoriasAsignadas[i][3] = "<span style='"  + "'>" + resultados[i].creador + "</span>";
				datosMemoriasAsignadas[i][4] = "<span style='"  + "'>" + resultados[i].fechaCreacion + "</span>";
				datosMemoriasAsignadas[i][5] = "<span style='"  + "'>" + resultados[i].fechaVencimiento + "</span>";
				datosMemoriasAsignadas[i][6] = "<div><img src='img/iconos_COMENTARIOS.png'></div>";
				datosMemoriasAsignadas[i][7] = resultados[i].mdId;
			 }
			
			 initTablaMemoriasAsignadas('DivTablaAsignadas', datosMemoriasAsignadas, 'tablaMemoriasAsignadas');
			 
			$("#tablaMemoriasAsignadas tr td").not(":eq(6)").click(function() {
				var nombreMd = $(this).parent().find("td:eq(0) span").html();
				var mdId = $(this).parent().find("td:eq(7)").html();
				obtieneDetalleMd(nombreMd, mdId);
			});
			
			$("#tablaMemoriasAsignadas tr td:eq(6)").click(function() {
				var mdId = $(this).parent().find("td:eq(7)").html();
				muestraChatXMd(mdId);
			});
		}
	};	
}

function muestraChatXMd(mdId) {
	$("#mdIdChat").val(mdId);
	$("#chatPorMd").submit();
}

function obtieneDetalleMd(nombreMd, mdId) {
	$("#nombreMd").val(nombreMd);
	$("#mdId").val(mdId);
	$("#detalleMemoriaAsignadaAction").submit();
}

function ejecutaBusquedaAsignadas() {
	$("#tablaMemoriasAsignadas").dataTable().fnFilter($("#buscador").val());
}


function redireccionaConsulta() {
	
}

function redireccionaConsultaDos() {
	
}