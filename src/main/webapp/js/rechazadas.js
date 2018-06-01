var datosExcel = "";

$(function(){
	$('#idrechazadas').addClass('resaltado');
	inicializaCalendarios();
	
	$("#descargaExcel").click(function() {
		$("#datos").val(JSON.stringify(datosExcel));
		$("#submitBotonRechazadas").click();
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


function creatabla(){
	invocarJSONServiceAction("rechazadas_info", 
				{'fechaConsulta': $( "#datepicker1").val(),
				 'tipoConsulta': '0'}, 
				 'obtieneRechazadasResponse', 
				function() {
					cierraLoading();
				},
				function() {	
					cierraLoading();
				});
	
	obtieneRechazadasResponse = function( data ) {
		if(data.codigo != 200) {
			cargaMensajeModal('MD RECHAZADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			$("#descargaExcel").hide();
			initTablaMemoriasRechazadas('DivTablaRechazadas', 0, 'tablaMemoriasRechazadas');
		} else {
			var resultados = data.mds;
			datosExcel = data;
			$("#descargaExcel").show();
			
			var datosMemoriasRechazadas = new Array();
			var total = 0;
			var puntuacionEnTiempoA = "<img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'>";
			var puntuacionEnTiempoB = "<img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'>";
			var puntuacionEnTiempoC = "<img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'>";
			var puntuacionVencidaA = "<img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'><img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'><img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'>";
			var puntuacionVencidaB = "<img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'><img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'>";
			var puntuacionVencidaC = "<img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'>";
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
				
				datosMemoriasRechazadas[i] = new Array();	 	 		 			 
				datosMemoriasRechazadas[i][0] = "<span>" + resultados[i].nombreMd + "</span>"; 
				datosMemoriasRechazadas[i][1] = "<span>" + resultados[i].categoria + "</span>";
				datosMemoriasRechazadas[i][2] = "<span>" + resultados[i].puntuacion + '</span><span class="estrellas">'+ estrellas+"</span>";
				datosMemoriasRechazadas[i][3] = "<span>" + resultados[i].creador + "</span>";
				datosMemoriasRechazadas[i][4] = "<span>" + resultados[i].fechaCreacion + "</span>";
				datosMemoriasRechazadas[i][5] = "<span>" + resultados[i].autorizador + "</span>";
				datosMemoriasRechazadas[i][6] = "<span>" + resultados[i].fechaAutorizacion + "</span>";
				datosMemoriasRechazadas[i][7] = "<span>" + variable + "</span>";
				datosMemoriasRechazadas[i][8] = resultados[i].mdId;
			 }			
			initTablaMemoriasRechazadas('DivTablaRechazadas', datosMemoriasRechazadas, 'tablaMemoriasRechazadas');
		}
	};	
}
function ejecutaBusquedaRechazadas() {
	$("#tablaMemoriasRechazadas").dataTable().fnFilter($("#buscadorRechazadas").val());
}
