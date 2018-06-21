var datosExcel = "";
var perfil;

$(function(){
	$('#idautorizadas').addClass('resaltado');
	perfil=$('#perfil_usuario').val();
	inicializaCalendarios();
	if($( "#datepicker1").val()!='')
		creatabla();
	
	$("#descargaExcel").click(function() {
		$("#datos").val(JSON.stringify(datosExcel));
		$("#submitBotonAutorizadas").click();
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
}

function refreshAutorizadas() {
	creatabla();
}


function creatabla(){
	invocarJSONServiceAction("autorizadas_info", 
				{'fechaConsulta': $( "#datepicker1").val(),
				 'tipoConsulta': '1'}, 
				 'obtieneAutorizadasResponse', 
				function() {
					cierraLoading();
				},
				function() {	
					cierraLoading();
				});
	
	obtieneAutorizadasResponse = function( data ) {
		if(data.codigo != 200) {
			cargaMensajeModal('MD AUTORIZADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			$("#descargaExcel").hide();
			initTablaMemoriasAutorizadas('DivTablaAutorizadas', 0, 'tablaMemoriasAutorizadas');
			initTablaMemoriasAutorizadasDirGeneral('DivTablaAutorizadas', 0, 'tablaMemoriasAutorizadas');

		} else {
			var resultados = data.mds;
			datosExcel = data;
			$("#descargaExcel").show();
			
			var datosMemoriasAutorizadas = new Array();
			var total = 0;
			var puntuacionEnTiempoA = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionEnTiempoB = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionEnTiempoC = "<img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaA = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaB = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaC = "<img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var estrellas = "";
			var variable;
			for( var i = 0 ; i < resultados.length; i++){
				
				
				switch(resultados[i].categoria) {
					case 'A':	estrellas = puntuacionEnTiempoA;
								break;
					case 'B':	estrellas = puntuacionEnTiempoB;
								break;
					case 'C':	estrellas = puntuacionEnTiempoC;
								break;
				};
				
				resultados[i].mdVencida ? variable = "Fuera de tiempo" : variable = "En tiempo";
				
				if(perfil==3){
					datosMemoriasAutorizadas[i] = new Array();	 	 		 			 
					datosMemoriasAutorizadas[i][0] = "<span>" + resultados[i].nombreMd + "</span>"; 
					datosMemoriasAutorizadas[i][1] = "<span>" + resultados[i].categoria + "</span>";
					datosMemoriasAutorizadas[i][2] = "<span>" + resultados[i].puntuacion + '</span><span> puntos'+ estrellas+"</span>";
					datosMemoriasAutorizadas[i][3] = "<span>" + resultados[i].creador + "</span>";
					datosMemoriasAutorizadas[i][4] = "<span>" + resultados[i].fechaCreacion + "</span>";
					datosMemoriasAutorizadas[i][5] = "<span>" + variable + "</span>";
					datosMemoriasAutorizadas[i][6] = resultados[i].mdId;
				}
				else{
				datosMemoriasAutorizadas[i] = new Array();	 	 		 			 
				datosMemoriasAutorizadas[i][0] = "<span>" + resultados[i].nombreMd + "</span>"; 
				datosMemoriasAutorizadas[i][1] = "<span>" + resultados[i].categoria + "</span>";
				datosMemoriasAutorizadas[i][2] = "<span>" + resultados[i].puntuacion + '</span><span> puntos'+ estrellas+"</span>";
				datosMemoriasAutorizadas[i][3] = "<span>" + resultados[i].creador + "</span>";
				datosMemoriasAutorizadas[i][4] = "<span>" + resultados[i].fechaCreacion + "</span>";
				datosMemoriasAutorizadas[i][5] = "<span>" + resultados[i].autorizador + "</span>";
				datosMemoriasAutorizadas[i][6] = "<span>" + resultados[i].fechaAutorizacion + "</span>";
				datosMemoriasAutorizadas[i][7] = "<span>" + variable + "</span>";
				datosMemoriasAutorizadas[i][8] = resultados[i].mdId;
				}
			 }	
			if(perfil==3){
			initTablaMemoriasAutorizadasDirGeneral('DivTablaAutorizadas', datosMemoriasAutorizadas, 'tablaMemoriasAutorizadas');
			$("#tablaMemoriasAutorizadas tr td").not(":eq(6)").click(function() {
				var nombreMd = $(this).parent().find("td:eq(0) span").html();
				var mdId = $(this).parent().find("td:eq(6)").html();
				obtieneDetalleMd(nombreMd, mdId);
			});
			}
			else{
			initTablaMemoriasAutorizadas('DivTablaAutorizadas', datosMemoriasAutorizadas, 'tablaMemoriasAutorizadas');
			
			$("#tablaMemoriasAutorizadas tr td").not(":eq(8)").click(function() {
				var nombreMd = $(this).parent().find("td:eq(0) span").html();
				var mdId = $(this).parent().find("td:eq(8)").html();
				obtieneDetalleMd(nombreMd, mdId);
			});
			}
			
			
		}
	};	
}
function ejecutaBusquedaAutorizadas() {
	$("#tablaMemoriasAutorizadas").dataTable().fnFilter($("#buscador").val());
}
function obtieneDetalleMd(nombreMd, mdId) {
	$("#nombreMd").val(nombreMd);
	$("#mdId").val(mdId);
	$("#tipoMd").val('1');
	$("#detalleMemoriaAsignadaAction").submit();
}