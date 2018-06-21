var datosExcel = "";
var perfil;

$(function(){
	$('#idrechazadas').addClass('resaltado');
	perfil=$('#perfil_usuario').val();
	if(perfil==3)
		$('.ocultable').show();
	inicializaCalendarios();
	
	if($( "#datepicker1").val()!='')
		creatabla();
	
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

function refreshRechazadas() {
	creatabla();
}

var icono_expansion='<span><img src="img/web_expansionc.png"></span>&nbsp;';
var icono_gestoria='<span><img src="img/web_gestoriac.png"></span>&nbsp;';
var icono_construccion='<span><img src="img/web_construccionc.png"></span>&nbsp;';
var icono_operaciones='<span><img src="img/web_operacionesc.png"></span>&nbsp;';
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
			initTablaMemoriasRechazadasDirGeneral('DivTablaRechazadas', 0, 'tablaMemoriasRechazadas');
			
		} else {
			
			if(perfil==3){
			var resultados = data.mds;
			datosExcel = data;
			$("#descargaExcel").show();
			var datosMemoriasRechazadas = new Array();
			var total = 0;
			var puntuacionEnTiempoA = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionEnTiempoB = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionEnTiempoC = "<img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaA = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaB = "<img class='estrellaPuntuacion' src='img/estrellita.png'><img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var puntuacionVencidaC = "<img class='estrellaPuntuacion' src='img/estrellita.png'>";
			var estrellas = "";
			var variable;
			var areasrechazo=[];
			
			for( var i = 0 ; i < resultados.length; i++){
				var listaiconos="";
				areasrechazo=resultados[i].areasRechazo;	
				
				for(var x=0; x < areasrechazo.length;x++){
					if(areasrechazo[x].areaId==1)
						listaiconos=listaiconos+""+icono_expansion;
					if(areasrechazo[x].areaId==2)
						listaiconos=listaiconos+""+icono_gestoria;
					if(areasrechazo[x].areaId==3)
						listaiconos=listaiconos+""+icono_construccion;
					if(areasrechazo[x].areaId==5)
						listaiconos=listaiconos+""+icono_operaciones;
				}
				
				switch(resultados[i].categoria) {
					case 'A':	estrellas = puntuacionEnTiempoA;
								break;
					case 'B':	estrellas = puntuacionEnTiempoB;
								break;
					case 'C':	estrellas = puntuacionEnTiempoC;
								break;
				};
								
				datosMemoriasRechazadas[i] = new Array();	 	 		 			 
				datosMemoriasRechazadas[i][0] = "<span>" + resultados[i].nombreMd + "</span>"; 
				datosMemoriasRechazadas[i][1] = "<span>" + resultados[i].categoria + "</span>";
				datosMemoriasRechazadas[i][2] = "<span>" + resultados[i].puntuacion + '</span><span> puntos '+ estrellas+"</span>";
				datosMemoriasRechazadas[i][3] = "<span>" + resultados[i].creador + "</span>";
				datosMemoriasRechazadas[i][4] = "<span>" + resultados[i].fechaCreacion + "</span>";
				datosMemoriasRechazadas[i][5] = listaiconos;
				datosMemoriasRechazadas[i][6] = "<span>" + resultados[i].tipoRechazo + "</span>";
				datosMemoriasRechazadas[i][7] = resultados[i].mdId;
			 }			
			initTablaMemoriasRechazadasDirGeneral('DivTablaRechazadas', datosMemoriasRechazadas, 'tablaMemoriasRechazadas');
		
			$("#tablaMemoriasRechazadas tr td").not(".motivos").click(function() {
				var nombreMd = $(this).parent().find("td:eq(0) span").html();
				var mdId = $(this).parent().find("td:eq(7)").html();
				obtieneDetalleMd(nombreMd, mdId);
			});
			
			 $('#tablaMemoriasRechazadas tbody').on('click', 'td.motivos', function () {
					var table=$("#tablaMemoriasRechazadas").DataTable();
					var mdId = $(this).parent().find("td:eq(7)").html();

				        var tr = $(this).closest('tr');
				        var row = table.row( tr );
				 
				        if ( row.child.isShown() ) {
				            row.child.hide();
				            tr.removeClass('shown');
				        }
				        else {
				            row.child( format(data.mds, mdId) ).show();
				            tr.addClass('shown');
				        }
				    } );
			
			
			}
			
		else{
			var resultados = data.mds;
			datosExcel = data;
			$("#descargaExcel").show();
			var datosMemoriasRechazadas = new Array();
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
								
				datosMemoriasRechazadas[i] = new Array();	 	 		 			 
				datosMemoriasRechazadas[i][0] = "<span>" + resultados[i].nombreMd + "</span>"; 
				datosMemoriasRechazadas[i][1] = "<span>" + resultados[i].categoria + "</span>";
				datosMemoriasRechazadas[i][2] = "<span>" + resultados[i].puntuacion + '</span><span> puntos '+ estrellas+"</span>";
				datosMemoriasRechazadas[i][3] = "<span>" + resultados[i].creador + "</span>";
				datosMemoriasRechazadas[i][4] = "<span>" + resultados[i].fechaCreacion + "</span>";
				datosMemoriasRechazadas[i][5] = "<span>" + resultados[i].nombreRechazo + "</span>";
				datosMemoriasRechazadas[i][6] = "<span>" + resultados[i].fechaRechazo + "</span>";
				datosMemoriasRechazadas[i][7] = "<span>" + resultados[i].motivoRechazo + "</span>";
				datosMemoriasRechazadas[i][8] = "<span>" + resultados[i].tipoRechazo + "</span>";
				datosMemoriasRechazadas[i][9] = resultados[i].mdId;
			 }			
			initTablaMemoriasRechazadas('DivTablaRechazadas', datosMemoriasRechazadas, 'tablaMemoriasRechazadas');
		
			$("#tablaMemoriasRechazadas tr td").not(":eq(9)").click(function() {
				var nombreMd = $(this).parent().find("td:eq(0) span").html();
				var mdId = $(this).parent().find("td:eq(9)").html();
				obtieneDetalleMd(nombreMd, mdId);
			});
		}
		}
	};	
}


function format(data, mdId){
	var html="";
	
	for(i=0;i<data.length;i++){
		if(data[i].mdId==mdId){
			 html= '<table class="fgris">'+
		     '<tr>'+
	            '<td class=" negro" style="width:13%;">Motivo de Rechazo</td>'+
	            '<td class=" negro left">'+
	            '<div class="row">';
					var areasrechazo=data[i].areasRechazo;	
		
							for(var x=0; x < areasrechazo.length;x++){
								var icono="";								
										if(areasrechazo[x].areaId==1)
											icono=icono_expansion;
										if(areasrechazo[x].areaId==2)
											icono=icono_gestoria;
										if(areasrechazo[x].areaId==3)
											icono=icono_construccion;
										if(areasrechazo[x].areaId==5)
											icono=icono_operaciones;
										
										mensaje= areasrechazo[x].motivoRechazo;
										html=html+'<div class="col-lg-3"><span >'+icono+'</span><span style="position:relative; top:1px;">'+mensaje+'</span></div>';
							}
		}
	            	
	            html=html+'</div>'+
	            '</td>'+
	        '</tr>'+
	    '</table>';
			
	}
	return html;
}
	 

function ejecutaBusquedaRechazadas() {
	$("#tablaMemoriasRechazadas").dataTable().fnFilter($("#buscador").val());
}
function obtieneDetalleMd(nombreMd, mdId) {
	$("#nombreMd").val(nombreMd);
	$("#mdId").val(mdId);
	$("#consultaDetalleAction").submit();
}