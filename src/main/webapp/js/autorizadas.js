var datosExcel = "";

$(function(){
	$('#idautorizadas').addClass('resaltado');
	$('#datos').val('{"mds":[{"mdId":"180522133303","nombreMd":"uxmal","categoria":"B","puntuacion":2,"creador":"JOSE ALFONSO DIAZ MENDEZ","fechaCreacion":"22/05/2018","autorizador":"Guadalupe Mariana","fechaAutorizacion":"24/04/2018","tipoAutorizacion":"En tiempo"}],"codigo":200,"mensaje":"MDs autorizadas al area encontradas"}');

	inicializaCalendarios();
	
	$("#descargaExcel").click(function() {
		//$("#datos").val(JSON.stringify(datosExcel));
		$('#datos').val('{"mds":[{"mdId":"180522133303","nombreMd":"uxmal","categoria":"B","puntuacion":2,"creador":"JOSE ALFONSO DIAZ MENDEZ","fechaCreacion":"22/05/2018","autorizador":"Guadalupe Mariana","fechaAutorizacion":"24/04/2018","tipoAutorizacion":"En tiempo"}],"codigo":200,"mensaje":"MDs autorizadas al area encontradas"}');
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


function creatabla(){
	invocarJSONServiceAction("autorizadas_info", 
				{'fechaConsulta': $( "#datepicker1").val(),
				 'cadena': $('#datos').val()}, 
				'obtieneMdsResponse', 
				function() {
					cierraLoading();
				},
				function() {	
					cierraLoading();
				});
	
	obtieneMdsResponse = function( data ) {
		if(data.codigo != 200) {
			cargaMensajeModal('MD AUTORIZADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			$("#descargaExcel").hide();
			initTablaMemoriasAutorizadas('DivTablaAutorizadas', 0, 'tablaMemoriasAutorizadas');
		} else {
			var resultados = data.mds;
			datosExcel = data;
			$("#descargaExcel").show();
			
			var datosMemoriasAutorizadas = new Array();
			var total = 0;
			var spanRojo = "";
			var puntuacionEnTiempoA = "<img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'>";
			var puntuacionEnTiempoB = "<img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'>";
			var puntuacionEnTiempoC = "<img class='estrellaPuntuacion' src='img/icono_estrella_azul.png'>";
			var puntuacionVencidaA = "<img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'><img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'><img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'>";
			var puntuacionVencidaB = "<img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'><img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'>";
			var puntuacionVencidaC = "<img class='estrellaPuntuacion' src='img/icono_estrella_roja.png'>";
			var estrellas = "";
			
			for( var i = 0 ; i < resultados.length; i++){
				
				if(resultados[i].mdVencida) {
					spanRojo = "color: #FF5B16";
				} else {
					spanRojo = "";
				}
				
				switch(resultados[i].categoria) {
					case 'A':	resultados[i].mdVencida ? estrellas = puntuacionVencidaA : estrellas = puntuacionEnTiempoA;
								break;
					case 'B':	resultados[i].mdVencida ? estrellas = puntuacionVencidaB : estrellas = puntuacionEnTiempoB;
								break;
					case 'C':	resultados[i].mdVencida ? estrellas = puntuacionVencidaC : estrellas = puntuacionEnTiempoC;
								break;
				};
				
				datosMemoriasAutorizadas[i] = new Array();	 	 		 			 
				datosMemoriasAutorizadas[i][0] = "<span style='" + spanRojo + "'>" + resultados[i].nombreMd + "</span>"; 
				datosMemoriasAutorizadas[i][1] = "<span style='" + spanRojo + "'>" + resultados[i].categoria + "</span>";
				datosMemoriasAutorizadas[i][2] = "<span style='" + spanRojo + "'>" + resultados[i].puntuacion + "</span>" + estrellas;
				datosMemoriasAutorizadas[i][3] = "<span style='" + spanRojo + "'>" + resultados[i].creador + "</span>";
				datosMemoriasAutorizadas[i][4] = "<span style='" + spanRojo + "'>" + resultados[i].fechaCreacion + "</span>";
				datosMemoriasAutorizadas[i][5] = "<span style='" + spanRojo + "'>" + resultados[i].autorizador + "</span>";
				datosMemoriasAutorizadas[i][6] = "<span style='" + spanRojo + "'>" + resultados[i].fechaAutorizacion + "</span>";
				datosMemoriasAutorizadas[i][7] = "<span style='" + spanRojo + "'>" + resultados[i].tipo + "</span>";
				datosMemoriasAutorizadas[i][8] = resultados[i].mdId;
			 }			
			initTablaMemoriasAutorizadas('DivTablaAutorizadas', datosMemoriasAutorizadas, 'tablaMemoriasAutorizadas');
		}
	};	
}
function ejecutaBusquedaAutorizadas() {
	$("#tablaMemoriasAutorizadas").dataTable().fnFilter($("#buscadorAutorizadas").val());
}
