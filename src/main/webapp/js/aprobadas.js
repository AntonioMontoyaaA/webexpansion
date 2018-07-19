var datosExcel = "";
var perfil;

$(function(){
	$('#idaprobadas').addClass('resaltado');
	
	perfil=$('#perfil_usuario').val();
	inicializaCalendarios();
	if($( "#datepicker1").val()!='')
		creatabla();
	
	$("#descargaExcel").click(function() {
		$("#datos").val(JSON.stringify(datosExcel));
		$("#submitBotonAprobadas").click();
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

function refreshAprobadas() {
	creatabla();
}


function creatabla(){
	invocarJSONServiceAction("aprobadas_info", 
				{'fechaConsulta': $( "#datepicker1").val(),
				 'tipoConsulta': '1'}, 
				 'obtieneAprobadasResponse', 
				function() {
					cierraLoading();
				},
				function() {	
					cierraLoading();
				});
	
	obtieneAprobadasResponse = function( data ) {
		if(data.codigo != 200 || data.aprobadas.length==0) {
			cargaMensajeModal('MD APROBADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			$("#descargaExcel").hide();
			$("#time").hide();
			$("#edit").hide();
			$("#pause").hide();
			$("#refuse").hide();
			$("#change").hide();
			
			initTablaMemoriasAprobadas('DivTablaAprobadas', 0, 'tablaMemoriasAprobadas');
		} else {
			var resultados = data.aprobadas;
			datosExcel = data;
			$("#descargaExcel").show();
			$("#time").show();
			$("#edit").show();
			$("#pause").show();
			$("#refuse").show();
			$("#change").show();
			
			var datosMemoriasAprobadas = new Array();
			var variable;
			
			for( var i = 0 ; i < resultados.length; i++){
				resultados[i].mdVencida ? variable = "Fuera de tiempo" : variable = "En tiempo";
			
			
				datosMemoriasAprobadas[i] = new Array();	 	 		 			 
				datosMemoriasAprobadas[i][0] = "<span>" + resultados[i].nombreMd + "</span>"; 
				datosMemoriasAprobadas[i][1] = "<span>" + resultados[i].responsable + "</span>";
				datosMemoriasAprobadas[i][2] = "<span>" + resultados[i].estatus + '</span>';
				datosMemoriasAprobadas[i][3] = "<span>" + resultados[i].autorizo + "</span>";
				datosMemoriasAprobadas[i][4] = "<span>" + resultados[i].fechaCompromiso + "</span>";
				if(resultados[i].motivo != undefined && resultados[i].motivo != null && resultados[i].motivo != "null") {
					datosMemoriasAprobadas[i][5] = "<span>" + resultados[i].motivo + "</span>";
				} else {
					datosMemoriasAprobadas[i][5] = "<span>-</span>";
				}
				datosMemoriasAprobadas[i][6] = resultados[i].mdId;
				
			 }	
			initTablaMemoriasAprobadas('DivTablaAprobadas', datosMemoriasAprobadas, 'tablaMemoriasAprobadas');
			
			$("#tablaMemoriasAprobadas tr td").click(function() {				
				if(clase!=""){	// -- si hay alguna opcion seleccionada (botones)
					var nombreMd = $(this).parent().find("td:eq(0) span").html();
					var mdId = $(this).parent().find("td:eq(6)").html();
					
						if(clase=="time_tabla"){
							historialMD(nombreMd, mdId);
						}
						if(clase=="edit_tabla"){
							editarMD(nombreMd, mdId);
						}
						if(clase=="pause_tabla"){
							pausarMD(nombreMd, mdId);
						}
						if(clase=="refuse_tabla"){
							rechazarMD(nombreMd, mdId);
						}
						if(clase=="change_tabla"){
							cambiarStatusMD(nombreMd, mdId);
						}	
				}
				else{	// -- si no hay opcion seleccionada, entra al detalle normal
					var nombreMd = $(this).parent().find("td:eq(0) span").html();
					var mdId = $(this).parent().find("td:eq(6)").html();
					obtieneDetalleMd(nombreMd, mdId);
				}
			});	
			
			$('#tablaMemoriasAprobadas tr').hover(function() { //accion al hover
				$(this).find("td.imagen").addClass(clase);
			}, function() { //accion al salir de hover
				$(this).find("td.imagen").removeClass(clase);

			});
		}
	};	
}
function ejecutaBusquedaAprobadas() {
	$("#tablaMemoriasAprobadas").dataTable().fnFilter($("#buscador").val());
}
function obtieneDetalleMd(nombreMd, mdId) {
	$("#nombreMd").val(nombreMd);
	$("#mdId").val(mdId);
	$("#tipoMd").val('3');
	$("#detalleMemoriaAsignadaAction").submit();
}


var clase="";
// --------------------------------------------------------------------------------
 // -----------------  inicio BOTONES DE ACCIONES EN LA TABLA ---------------------
$( '#time' ).click(function() {
	if(clase!="time_tabla"){
		clase="time_tabla";
		$( '#time' ).addClass("activado");
		
		$( '#edit' ).removeClass("activado");
		$( '#pause' ).removeClass("activado");
		$( '#refuse' ).removeClass("activado");
		$( '#change' ).removeClass("activado");
	}
	else{
		clase="";
		$( '#time' ).removeClass("activado");
	}
});
$( '#edit' ).click(function() {
	if(clase!="edit_tabla"){
		clase="edit_tabla";
		$( '#edit' ).addClass("activado");
		
		$( '#time' ).removeClass("activado");
		$( '#pause' ).removeClass("activado");
		$( '#refuse' ).removeClass("activado");
		$( '#change' ).removeClass("activado");
	}
	else{
		clase="";
		$( '#edit' ).removeClass("activado");
	}
});
$( '#pause' ).click(function() {
	if(clase!="pause_tabla"){
		clase="pause_tabla";
		$( '#pause' ).addClass("activado");
		
		$( '#edit' ).removeClass("activado");
		$( '#time' ).removeClass("activado");
		$( '#refuse' ).removeClass("activado");
		$( '#change' ).removeClass("activado");
	}
	else{
		$( '#pause' ).removeClass("activado");
		clase="";
	}
});
$( '#refuse' ).click(function() {
	if(clase!="refuse_tabla"){
		clase="refuse_tabla";
		$( '#refuse' ).addClass("activado");
		
		$( '#edit' ).removeClass("activado");
		$( '#pause' ).removeClass("activado");
		$( '#time' ).removeClass("activado");
		$( '#change' ).removeClass("activado");
	}
	else{
		$( '#refuse' ).removeClass("activado");
		clase="";
	}
});
$( '#change' ).click(function() {
	if(clase!="change_tabla"){
		clase="change_tabla";
		$( '#change' ).addClass("activado");
		
		$( '#edit' ).removeClass("activado");
		$( '#pause' ).removeClass("activado");
		$( '#refuse' ).removeClass("activado");
		$( '#time' ).removeClass("activado");
	}
	else{
		$( '#change' ).removeClass("activado");
		clase="";
	}
});
// -----------------  fin BOTONES
// --------------------------------- FUNCIONES DE LOS BOTONES
function historialMD(nombreMd, mdId){
		$("#nombreMd_tiempo").val(nombreMd);
		$("#mdId_tiempo").val(mdId);
		$("#tipoMd_tiempo").val('3');
		$("#lineaTiempoAction").submit();
}
function editarMD(nombreMd, mdId){
	
}
function pausarMD(nombreMd, mdId){
	mdIdEstatus = mdId;
    cargaMensajeModal('MD APROBADAS', 
            '¿Está seguro de pausar la MD?',
            TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, pausaMdAction);
}
function rechazarMD(nombreMd, mdId){
	mdIdEstatus = mdId;
    cargaMensajeModal('MD APROBADAS', 
            '¿Está seguro de rechazar la MD?',
            TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, rechazaMdAction);
}
function cambiarStatusMD(nombreMd, mdId){
    cargaMensajeModal('MD APROBADAS', 
            '¿Está seguro de cambiar el estatus de la MD?',
            TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, '');
}

var ESTATUS_PAUSA_MD = 21;
var ESTATUS_CANCELADAS_MD = 17;
var mdIdEstatus = 0;

function pausaMdAction() {
    invocarJSONServiceAction("accion_md_action", 
            {'mdId': mdIdEstatus,
            'estatusvalidacion': ESTATUS_PAUSA_MD
            }, 
            'accionMdResponse', 
            function() {
                //Funcion de error
                
                cierraLoading();
            },
            function() {
                //Función al finalizar
                
                cierraLoading();
            });

    accionMdResponse = function( data ) {
        if(data.codigo != 200) {
            cargaMensajeModal('EDITA MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
        } else {
            cargaMensajeModal('EDITA MD', "Memoria descriptiva pausada con éxito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
            refreshAprobadas();
        }
    }
}

function rechazaMdAction() {
    invocarJSONServiceAction("accion_md_action", 
            {'mdId': mdIdEstatus,
            'estatusvalidacion': ESTATUS_CANCELADAS_MD
            }, 
            'accionMdResponse', 
            function() {
                //Funcion de error
                
                cierraLoading();
            },
            function() {
                //Función al finalizar
                
                cierraLoading();
            });

    accionMdResponse = function( data ) {
        if(data.codigo != 200) {
            cargaMensajeModal('EDITA MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
        } else {
            cargaMensajeModal('EDITA MD', "Memoria descriptiva pausada con éxito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
            refreshAprobadas();
        }
    }
}