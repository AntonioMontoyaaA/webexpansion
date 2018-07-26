var resultadoTablero = null;
var datosExcel = "";

var DETALLE_MD = 3;
var EDITA_MD = 4;
var ESTATUS_PAUSA_MD = 21;
var ESTATUS_CANCELADAS_MD = 17;
var mdIdEstatus = 0;

var togSrc = [
    "../img/arrowDown.png",
    "../img/arrowUp.png"
];

$(function(){
	$('#idtablero').addClass('resaltado');
	inicializaCalendarios();
	
	if($( "#datepicker1").val()!='')
		creatabla();
	
	$( "#datepicker1").change(function() {
		creatabla();
	});
	
	$("#descargaExcelTablero").click(function() {
		$("#datos").val(JSON.stringify(datosExcel));
		$("#submitBotonTablero").click();
	});
	
	$(".slide-toggle").click(function(){
        $(".box").slideToggle();
    });
	
});

function dibujaEstatus(resumen) {
	var datos = "";
	var total = 0;
	var totalAtrasadas = 0;
	
	for(var i = 0; i < resumen.length; i++) {
		datos += '<div onclick="filtraEstatus(\'' + resumen[i].estatus + '\')" class="tabla_pendientes" style="width: 65%;"><span>' + resumen[i].estatus + '</span></div>' +
				'<div class="tabla_pendientes" style="width: 18%;padding-left: 10px;"><span>' + resumen[i].total + '</span></div>' +
				'<div class="tabla_pendientes" style="width: 17%;padding-left: 10px;"><span>' + resumen[i].atrasadas + '</span></div>';
		total += resumen[i].total;
		totalAtrasadas += resumen[i].atrasadas;
	}
	datos += '<div onclick="filtraEstatus(\'\')" class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 65%;"><span>Total</span></div>' +
			'<div class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 18%;padding-left: 10px;"><span id="totalPendientes">' + total + '</span></div>' +
			'<div class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 17%;padding-left: 10px;"><span id="totalPendientes">' + totalAtrasadas + '</span></div>';
	$("#box-inner").html(datos);
}

function filtraEstatus(cadena) {
	 $(".box").slideToggle();
	 $("#tablaMemoriasTablero").dataTable().fnFilter(cadena);
}

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
	$("#datepicker1").val(FECHA_HOY); //TODO remove
}

function creatabla(){
	
	invocarJSONServiceAction("tablero_info", 
				{'fechaConsulta': $( "#datepicker1").val()}, 
				'obtieneTableroResponse', 
				function() {
					//Funcion de error
					
					cierraLoading();
				},
				function() {
					//Función al finalizar
					
					cierraLoading();
				});
	
	obtieneTableroResponse = function( data ) {
		
		
		if(data.codigo != 200) {
			cargaMensajeModal('Memorias descriptivas', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			$("#descargaExcelTablero").hide();
			$("#time").hide();
			$("#edit").hide();
			$("#pause").hide();
			$("#refuse").hide();
			$("#change").hide();
			initTablaMemoriasTablero('DivTablaTablero', 0, 'tablaMemoriasTablero');
		} else {
			resultadoTablero = data.detalleTablero;
			datosExcel = data;
			$("#descargaExcelTablero").show();
			$("#time").show();
//			$("#edit").show();
//			$("#change").show();
			$("#pause").show();
			$("#refuse").show();

			//TODO remove
			$("#edit").hide();
			$("#change").hide();
			
			var datosMemorias = new Array();
			
			if(data.resumen != undefined && data.resumen != null && data.resumen != "null") {
				dibujaEstatus(data.resumen);
			}
			
			for( var i = 0 ; i < resultadoTablero.length; i++){
				
				
				datosMemorias[i] = new Array();	 	 		 			 
				datosMemorias[i][0] =  resultadoTablero[i].MDID;
				if(resultadoTablero[i].FECHARECEPCION != undefined) {
					datosMemorias[i][1] = "<span style='"  + "'>" + resultadoTablero[i].FECHARECEPCION.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][1] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].FUENTEMD != undefined) {
					datosMemorias[i][2] = "<span style='"  + "'>" + resultadoTablero[i].FUENTEMD + "</span>";
				} else {
					datosMemorias[i][2] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].NOMBRETDA != undefined) {
					datosMemorias[i][3] = resultadoTablero[i].NOMBRETDA;
				} else {
					datosMemorias[i][3] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].CATEGORIA != undefined) {
					datosMemorias[i][4] = "<span style='"  + "'>" + resultadoTablero[i].CATEGORIA + "</span>";
				} else {
					datosMemorias[i][4] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].PRE_OPERACIONES != undefined) {
					datosMemorias[i][5] = "<span style='"  + "'>" + resultadoTablero[i].PRE_OPERACIONES.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][5] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].CONTEOAUDITOR != undefined) {
					datosMemorias[i][6] = "<span style='"  + "'>" + formato(resultadoTablero[i].CONTEOAUDITOR, true) + "</span>";
				} else {
					datosMemorias[i][6] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].PRE_GESTORIA != undefined) {
					datosMemorias[i][7] = "<span>" + resultadoTablero[i].PRE_GESTORIA.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][7] = "<span>---</span>";
				}
				if(resultadoTablero[i].PRE_CONSTRUCCION != undefined) {
					datosMemorias[i][8] = "<span>" + resultadoTablero[i].PRE_CONSTRUCCION.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][8] = "<span>---</span>";
				}
				if(resultadoTablero[i].VOBO_LAYOUT != undefined) {
					datosMemorias[i][9] = "<span>" + resultadoTablero[i].VOBO_LAYOUT.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][9] = "<span>---</span>";
				}
				if(resultadoTablero[i].PRESUPUESTO_OBRA != undefined) {
					datosMemorias[i][10] = "<span>$ " + formato(resultadoTablero[i].PRESUPUESTO_OBRA, true) + "</span>";
				} else {
					datosMemorias[i][10] = "<span>---</span>";
				}
				if(resultadoTablero[i].PRESUPUESTO_AUDITORIA != undefined) {
					datosMemorias[i][11] = "<span>$ " + formato(resultadoTablero[i].PRESUPUESTO_AUDITORIA, true) + "</span>";
				} else {
					datosMemorias[i][11] = "<span>---</span>";
				}
				if(resultadoTablero[i].TRAMITES != undefined) {
					datosMemorias[i][12] = "<span>" + resultadoTablero[i].TRAMITES.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][12] = "<span>---</span>";
				}
				if(resultadoTablero[i].VOBOFNL_OPERACIONES != undefined) {
					datosMemorias[i][13] = "<span>" + resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][13] = "<span>---</span>";
				}
				if(resultadoTablero[i].FIRMA_CONTRATO != undefined) {
					datosMemorias[i][14] = "<span>" + resultadoTablero[i].FIRMA_CONTRATO.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][14] = "<span>---</span>";
				}
				if(resultadoTablero[i].INICIO_OBRA != undefined) {
					datosMemorias[i][15] = "<span>" + resultadoTablero[i].INICIO_OBRA.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][15] = "<span>---</span>";
				}
				if(resultadoTablero[i].ESTIMADO_FINOBRA != undefined) {
					datosMemorias[i][16] = "<span>" + resultadoTablero[i].ESTIMADO_FINOBRA + "</span>";
				} else {
					datosMemorias[i][16] = "<span>---</span>";
				}
				if(resultadoTablero[i].ESTIMADO_APERTURA != undefined) {
					datosMemorias[i][17] = "<span>" + resultadoTablero[i].ESTIMADO_APERTURA + "</span>";
				} else {
					datosMemorias[i][17] = "<span>" + resultadoTablero[i].ESTIMADO_APERTURA + "</span>";
				}
				datosMemorias[i][18] = resultadoTablero[i].MDID;
				datosMemorias[i][19] = resultadoTablero[i].ESTATUSMD;
			 }
			
			initTablaMemoriasTablero('DivTablaTablero', datosMemorias, 'tablaMemoriasTablero');
			
			$("#tablaMemoriasTablero tr td").click(function() {
				var mdId = $(this).parent().find("td:eq(18)").html();
				var nombreMd=$(this).parent().find("td:eq(3)").html();
				
				if(clase!=""){	// -- si hay alguna opcion seleccionada (botones)
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
				else{
				
				idColumna = jQuery("#tablaMemoriasTablero").dataTable().fnGetPosition(this);
				var col = idColumna[1];
				
				for(var i = 0; i < resultadoTablero.length; i++) {
					if(mdId == resultadoTablero[i].MDID) {
						switch(col) {
							case 5:
							if(resultadoTablero[i].PRE_OPERACIONES.validacion == "SI") {
								var usuario = resultadoTablero[i].PRE_OPERACIONES.usuario != null ? resultadoTablero[i].PRE_OPERACIONES.usuario : '-';
								
								var mensaje = "¿Quién autorizó? " + usuario + "<br/>" +
										"Del área: " + resultadoTablero[i].PRE_OPERACIONES.Area + "<br/>" +
										"En la fecha: " +  resultadoTablero[i].PRE_OPERACIONES.fechaValidacion;
								cargaMensajeModal('PRE-OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
							} else {
								var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
								cargaMensajeModal('PRE-OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
							}
							break;
							case 7:
								if(resultadoTablero[i].PRE_GESTORIA.validacion == "SI") {
									var usuario = resultadoTablero[i].PRE_GESTORIA.usuario != null ? resultadoTablero[i].PRE_GESTORIA.usuario : '-';
									
									var mensaje = "¿Quién autorizó? " + usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].PRE_GESTORIA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].PRE_GESTORIA.fechaValidacion;
									cargaMensajeModal('PRE-GESTORIA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('PRE-GESTORIA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 8:
								if(resultadoTablero[i].PRE_CONSTRUCCION.validacion == "SI") {
									var usuario = resultadoTablero[i].PRE_CONSTRUCCION.usuario != null ? resultadoTablero[i].PRE_CONSTRUCCION.usuario : '-';
									
									var mensaje = "¿Quién autorizó? " + usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].PRE_CONSTRUCCION.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].PRE_CONSTRUCCION.fechaValidacion;
									cargaMensajeModal('PRE-CONSTRUCCION', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('PRE-CONSTRUCCION', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 9:
								if(resultadoTablero[i].VOBO_LAYOUT.validacion == "SI") {
									var usuario = resultadoTablero[i].VOBO_LAYOUT.usuario != null ? resultadoTablero[i].VOBO_LAYOUT.usuario : '-';
									
									var mensaje = "¿Quién autorizó? " + usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].VOBO_LAYOUT.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].VOBO_LAYOUT.fechaValidacion;
									cargaMensajeModal('VOBO LAYOUT', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('VOBO LAYOUT', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 12:
								if(resultadoTablero[i].TRAMITES.validacion == "SI") {
									var usuario = resultadoTablero[i].TRAMITES.usuario != null ? resultadoTablero[i].TRAMITES.usuario : '-';
									
									var mensaje = "¿Quién autorizó? " + usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].TRAMITES.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].TRAMITES.fechaValidacion;
									cargaMensajeModal('GESTORÍA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('GESTORÍA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 13:
								if(resultadoTablero[i].VOBOFNL_OPERACIONES.validacion == "SI") {
									var usuario = resultadoTablero[i].VOBOFNL_OPERACIONES.usuario != null ? resultadoTablero[i].VOBOFNL_OPERACIONES.usuario : '-';
									
									var mensaje = "¿Quién autorizó? " + usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].VOBOFNL_OPERACIONES.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion;
									cargaMensajeModal('VOBO FINAL OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('VOBO FINAL OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 14:
								if(resultadoTablero[i].FIRMA_CONTRATO.validacion == "SI") {
									var usuario = resultadoTablero[i].FIRMA_CONTRATO.usuario != null ? resultadoTablero[i].FIRMA_CONTRATO.usuario : '-';
									
									var mensaje = "¿Quién autorizó? " + usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].FIRMA_CONTRATO.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].FIRMA_CONTRATO.fechaValidacion;
									cargaMensajeModal('CONTRATO FIRMADO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('CONTRATO FIRMADO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 15:
								if(resultadoTablero[i].INICIO_OBRA.validacion == "SI") {
									var usuario = resultadoTablero[i].INICIO_OBRA.usuario != null ? resultadoTablero[i].INICIO_OBRA.usuario : '-';
									
									var mensaje = "¿Quién autorizó? " + usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].INICIO_OBRA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].INICIO_OBRA.fechaValidacion;
									cargaMensajeModal('INICIO DE OBRA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('INICIO DE OBRA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
						};
						break;
					}
				}
				}
			});
			$('#tablaMemoriasTablero tr').hover(function() { //accion al hover
				$(this).find("td.imagen").addClass(clase);
			}, function() { //accion al salir de hover
				$(this).find("td.imagen").removeClass(clase);

			});
			
			$(".DTFC_Cloned tr td").click(function() {
				var mdId = $(this).parent().find("td:eq(0)").html();
				
				idColumna = jQuery("#tablaMemoriasTablero").dataTable().fnGetPosition(this);
				var col = idColumna[1];
				
				for(var i = 0; i < resultadoTablero.length; i++) {
					if(mdId == resultadoTablero[i].MDID) {
						switch(col) {
						case 0:
							abreDetalleMd(resultadoTablero[i].NOMBRETDA, mdId);
							break;
						case 1:
							if(resultadoTablero[i].FECHARECEPCION.validacion == "SI") {
								var mensaje = "¿Quién autorizó? " + resultadoTablero[i].FECHARECEPCION.usuario + "<br/>" +
												"Del área: " + resultadoTablero[i].FECHARECEPCION.Area + "<br/>" +
												"En la fecha: " +  resultadoTablero[i].FECHARECEPCION.fechaValidacion;
								cargaMensajeModal('RECEPCIÓN', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
							} else {
								var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
								cargaMensajeModal('RECEPCIÓN', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
							}
							break;
						};
						break;
					}
				}				
			});
		}
	};	
}

function abreDetalleMd(nombreMd, mdId) {
	$("#nombreMd").val(nombreMd);
	$("#mdId").val(mdId);
	$("#tipoMd").val('5');
	$("#detalleMemoriaAsignadaAction").submit();
}

function ejecutaBusquedaTablero() {
	$("#tablaMemoriasTablero").dataTable().fnFilter($("#buscador").val());
}
// FUNCIONES DE LOS BOTONES ACTIVADO/DESACTIVADO
//-----------------  inicio BOTONES DE ACCIONES EN LA TABLA ---------------------
var clase="";
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
//--------------------------------- FUNCIONES DE LOS BOTONES
function historialMD(nombreMd, mdId){
		$("#nombreMd_tiempo").val(nombreMd);
		$("#mdId_tiempo").val(mdId);
		$("#tipoMd_tiempo").val('5');
		$("#lineaTiempoAction").submit();
}
function editarMD(nombreMd, mdId){
	$("#nombreMd").val(nombreMd);
    $("#mdId").val(mdId);
    $("#tipoMd").val(EDITA_MD);
    $("#detalleMemoriaAsignadaAction").submit();
}
// -------------------------------------------------- FUNCIONES

function pausarMD(nombreMd, mdId){
	mdIdEstatus = mdId;
    cargaMensajeModal('TABLERO', 
            '¿Está seguro de pausar la MD?',
            TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, pausaMdAction);
}
function rechazarMD(nombreMd, mdId){
	mdIdEstatus = mdId;
    cargaMensajeModal('TABLERO', 
            '¿Está seguro de rechazar la MD?',
            TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, rechazaMdAction);
}
function cambiarStatusMD(nombreMd, mdId){
    cargaMensajeModal('TABLERO', 
            '¿Está seguro de cambiar el estatus de la MD?',
            TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, '');
}

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