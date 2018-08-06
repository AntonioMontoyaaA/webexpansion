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
				datosMemoriasAsignadas[i][2] = "<span style='"  + "'>" + resultados[i].puntuacion + " </span> " + estrellas;
				datosMemoriasAsignadas[i][3] = "<span style='"  + "'>" + resultados[i].creador + "</span>";
				datosMemoriasAsignadas[i][4] = "<span style='"  + "'>" + resultados[i].fechaCreacion + "</span>";
				datosMemoriasAsignadas[i][5] = "<span style='"  + "'>" + resultados[i].fechaVencimiento + "</span>";
				datosMemoriasAsignadas[i][6] = "<div><img src='img/iconos_COMENTARIOS.png'></div>";
				datosMemoriasAsignadas[i][7] = resultados[i].mdId;
			 }
			
			 initTablaMemoriasAsignadas('DivTablaAsignadas', datosMemoriasAsignadas, 'tablaMemoriasAsignadas');
			 
			$("#tablaMemoriasAsignadas tr td").not(".liga_chat, .seguimiento").click(function() {
				var nombreMd = $(this).parent().find("td:eq(0) span").html();
				var mdId = $(this).parent().find("td:eq(7)").html();
				obtieneDetalleMd(nombreMd, mdId);
			});
			
			 $('#tablaMemoriasAsignadas tbody').on('click', 'td.seguimiento', function () {
				var table=$("#tablaMemoriasAsignadas").DataTable();
				var mdId = $(this).parent().find("td:eq(7)").html();

			        var tr = $(this).closest('tr');
			        var row = table.row( tr );
			 
			        if ( row.child.isShown() ) {
			            row.child.hide();
			            tr.removeClass('shown');
			        }
			        else {
			            row.child( format(mdId) ).show();
			            tr.addClass('shown');
			        }
			    } );
			
			$("#tablaMemoriasAsignadas tr td.liga_chat").click(function() {
				var mdId = $(this).parent().find("td:eq(7)").html();
				muestraChatXMd(mdId);
			});
		}
	};	
}

function format(mdId){
	var html="";
	var au_gerenteExpasion="";
	var au_expansion="";
	var au_gestoria="";
	var au_construccion="";
	var au_operaciones="";
	var reloj_gerenteExpasion="";
	var reloj_expansion="";
	var reloj_gestoria="";
	var reloj_construccion="";
	var reloj_operaciones="";
	var reloj='<img class="reloj" src="img/iconos_reloj_atraso.png">';
	
	 $.ajax({
	        type     : "POST",
	        url      : 'memoria_detalle_x_id',
	        data     : {'mdId': mdId},
	        async	 : false,
	        success  : function(data) {
	        	
	        	if(data.codigo != 200) {} 
	    		else {
	    			var AREAS=data.areasAutorizadas;
	    			
	    				for(var i = 0; i < AREAS.length; i++) {
	    					if(AREAS[i].EXPANSION != undefined && 
	    							AREAS[i].EXPANSION.length > 0 && 
	    							AREAS[i].EXPANSION[0].puestosValida != undefined && 
	    							AREAS[i].EXPANSION[0].puestosValida.length > 0) {
	    						if(AREAS[i].EXPANSION[0].puestosValida[0] == 'GERENTE DE EXPANSION') {
	    							au_gerenteExpasion='circuloSeguimientoAprobado';
	    							
	    							if(AREAS[i].EXPANSION[0].diasVencidos > 0) {
	    								reloj_gerenteExpasion=reloj;
	    							}
	    						}else if(AREAS[i].EXPANSION[0].puestosValida[0] == 'ANALISTA DE EXPANSION') {
	    							au_expansion="circuloSeguimientoAprobado";							
	    							if(AREAS[i].EXPANSION[0].diasVencidos > 0) {
	    								reloj_expansion=reloj;
	    							}
	    						}
	    					}else if(AREAS[i].GESTORIA != undefined && 
	    							AREAS[i].GESTORIA.length > 0) {
	    						au_gestoria="circuloSeguimientoAprobado";							
	    						if(AREAS[i].GESTORIA[0].diasVencidos > 0) {
	    							reloj_gestoria=reloj;
	    						}
	    					}else if(AREAS[i].CONSTRUCCION != undefined && 
	    							AREAS[i].CONSTRUCCION.length > 0) {
	    						au_construccion="circuloSeguimientoAprobado";
	    						if(AREAS[i].CONSTRUCCION[0].diasVencidos > 0) {
	    							reloj_construccion=reloj;
	    						}
	    					}else if(AREAS[i].OPERACIONES != undefined && 
	    							AREAS[i].OPERACIONES.length > 0) {
	    						au_operaciones="circuloSeguimientoAprobado";
	    							
	    						if(AREAS[i].OPERACIONES[0].diasVencidos > 0) {
	    							reloj_operaciones=reloj;
	    						}
	    						
	    					}
	    					
	    				}
	    		}
	        }
	    });
	 
		 return '<table class="fgris">'+
	        '<tr>'+
            '<td class="padding negro">AUTORIZADAS</td>'+
            '<td class="left negro"  style="width:20%;">'+
            	'<div id="circuloAutorizaGerenteExpansion" class="circuloSeguimiento circulos_tablas '+au_gerenteExpasion+'"></div>'+
            	'Gerente Expansión<span>'+reloj_gerenteExpasion+'</span></td>'+
            '<td class="left negro">'+
            	'<div id="circuloAutorizaExpansion" class="circuloSeguimiento circulos_tablas '+au_expansion+'"></div>'+
            	'Expansión<span>'+reloj_expansion+'</span></td>'+
            '<td class="left negro">'+
            	'<div id="circuloAutorizaGestoria" class="circuloSeguimiento circulos_tablas '+au_gestoria+'"></div>'+
            	'Gestoría<span>'+reloj_gestoria+'</span></td>'+
            '<td class="left negro">'+
            	'<div id="circuloAutorizaConstruccion" class="circuloSeguimiento circulos_tablas '+au_construccion+'"></div>'+
            	'Construcción<span>'+reloj_construccion+'</span></td>'+
            '<td class="left negro">'+
            	'<div id="circuloAutorizaOperaciones" class="circuloSeguimiento circulos_tablas '+au_operaciones+'"></div>'+
            	'Operaciones<span>'+reloj_operaciones+'</span></td>'+
        '</tr>'+
    '</table>';
}

function muestraChatXMd(mdId) {
	$("#mdIdChat").val(mdId);
	$("#chatPorMd").submit();
}

function obtieneDetalleMd(nombreMd, mdId) {
	$("#nombreMd").val(nombreMd);
	$("#mdId").val(mdId);
	$("#tipoMd").val('0');
	$("#detalleMemoriaAsignadaAction").submit();
}

function ejecutaBusquedaAsignadas() {
	$("#tablaMemoriasAsignadas").dataTable().fnFilter($("#buscador").val());
}


function redireccionaConsulta() {
	
}

function redireccionaConsultaDos() {
	
}