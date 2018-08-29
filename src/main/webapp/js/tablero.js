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
	
	$("#checkTipoTablero").click(function() {
		creatabla();
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
		var busqueda = "";
		
		if(resumen[i].estatus == "PREGESTORIA - GESTORIA") {
            busqueda = "PREGES_GES";
        } else if(resumen[i].estatus == "PRECONSTRUCCION - CONSTRUCCION") {
            busqueda = "PRECONS_CONS";
        } else if(resumen[i].estatus == "PREAUDITORIA - AUDITORIA") {
            busqueda = "PREAUDIT_AUDIT";
        } else if(resumen[i].estatus == "VOBO INICIAL OPERACIONES - OPERACIONES") {
            busqueda = "VOBOINICOPER";
        } else if(resumen[i].estatus == "VALIDACION LAYOUT - OPERACIONES") {
            busqueda = "VOBOLAY";
        } else if(resumen[i].estatus == "PRESUPUESTO OBRA - CONSTRUCCION") {
            busqueda = "PPTO_CONS";
        } else if(resumen[i].estatus == "PRESUPUESTO AUDITORIA - AUDITORIA") {
            busqueda = "PPTO_AUDIT";
        } else if(resumen[i].estatus == "VOBO FINAL OPERACIONES - OPERACIONES") {
            busqueda = "VOBOFINOPER";
        } else if(resumen[i].estatus == "FIRMA DE CONTRATO - EXPANSION") {
            busqueda = "FIRMACONTR";
        } else if(resumen[i].estatus == "RECHAZADA - EXPANSION") {
            busqueda = "RECH_EXPAN";
        }
		
		var busquedaCadena = "";
		if(resumen[i].atrasadas != "NA") {
			busquedaCadena = 'onclick="filtraEstatus(\'' + resumen[i].estatus + ' &ATR_' + busqueda + '\', this)"';
		} else {
			busquedaCadena = '';
		}
		
		datos += '<div onclick="filtraEstatus(\'' + resumen[i].estatus + '\', this)" class="tabla_pendientes" style="width: 65%;"><span>' + resumen[i].estatus + '</span></div>' +
				'<div onclick="filtraEstatus(\'' + resumen[i].estatus + '\', this)" class="tabla_pendientes" style="width: 18%;padding-left: 10px;"><span>' + resumen[i].total + '</span></div>' +
				'<div ' + busquedaCadena + ' class="tabla_pendientes" style="width: 17%;padding-left: 10px;"><span>' + resumen[i].atrasadas + '</span></div>';
		total += resumen[i].total;
		if(resumen[i].atrasadas != "NA") {
			totalAtrasadas += resumen[i].atrasadas;
		} else {
			totalAtrasadas = -1;
		}
	}
	
	if(totalAtrasadas == -1) {
		datos += '<div  class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 65%;"><span>Total</span></div>' +
		'<div class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 18%;padding-left: 10px;"><span id="totalPendientes">' + total + '</span></div>' +
		'<div class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 17%;padding-left: 10px;"><span id="totalPendientes">NA</span></div>';
	} else {
		datos += '<div onclick="filtraEstatus(\'\', this)" class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 65%;"><span>Total</span></div>' +
		'<div onclick="filtraEstatus(\'\', this)" class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 18%;padding-left: 10px;"><span id="totalPendientes">' + total + '</span></div>' +
		'<div onclick="filtraEstatus(\'\', this)" class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 17%;padding-left: 10px;"><span id="totalPendientes">' + totalAtrasadas + '</span></div>';
	}
	$("#box-inner").html(datos);
}

function filtraEstatus(cadena, o) {
	$(".box").slideToggle();
	
	if($(o).hasClass("cicle_tiempo_sem_selecc")) {
		$("#tablaMemoriasTablero").dataTable().fnFilter('');
		$(o).removeClass("cicle_tiempo_sem_selecc");
	} else {
		$(".tabla_pendientes").removeClass("cicle_tiempo_sem_selecc");
		$(o).addClass("cicle_tiempo_sem_selecc");
		$("#tablaMemoriasTablero").dataTable().fnFilter(cadena);
	}
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
	
	var tipoTabla = 0;
	if(!$("#checkTipoTablero").is(":checked")) {
		tipoTabla = 1;
	}
	
	invocarJSONServiceAction("tablero_info", 
				{'fechaConsulta': $( "#datepicker1").val(), "estatus": tipoTabla}, 
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
				var esMdAtrasada = false;
				var cadenaAtraso = '';
				
				datosMemorias[i] = new Array();	 	
				datosMemorias[i][1] =  "<div onclick='obtieneNombreMd(\"" + resultadoTablero[i].MDID + "\");'><span class='text_seleccion'>" + resultadoTablero[i].MDID + "</span></div>";
				if(resultadoTablero[i].FECHARECEPCION != undefined) {
					datosMemorias[i][2] = "<div onclick='muestraFechaMd(\"" + resultadoTablero[i].MDID + "\");'><span class='text_seleccion_dos'>" + resultadoTablero[i].FECHARECEPCION.fechaValidacion + "</span></div>";
				} else {
					datosMemorias[i][2] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].FUENTEMD != undefined) {
					datosMemorias[i][3] = "<span style='"  + "'>" + resultadoTablero[i].FUENTEMD + "</span>";
				} else {
					datosMemorias[i][3] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].NOMBRETDA != undefined) {
					datosMemorias[i][4] = resultadoTablero[i].NOMBRETDA;
				} else {
					datosMemorias[i][4] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].CATEGORIA != undefined) {
					datosMemorias[i][5] = "<span style='"  + "'>" + resultadoTablero[i].CATEGORIA + "</span>";
				} else {
					datosMemorias[i][5] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].PUNTOSTOTALES != undefined) {
					datosMemorias[i][6] = "<span style='"  + "'>" + resultadoTablero[i].PUNTOSTOTALES + "</span>";
				} else {
					datosMemorias[i][6] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].PRE_OPERACIONES != undefined) {
					if(resultadoTablero[i].PRE_OPERACIONES.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].PRE_OPERACIONES.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].PRE_OPERACIONES.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].PRE_OPERACIONES.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_VOBOINICOPER";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].PRE_OPERACIONES.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][7] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].PRE_OPERACIONES.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][7] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][7] = "<span class='text_sin_atencion'>---</span>";
				} 
				if(resultadoTablero[i].PRE_AUDITORIA != undefined) {
					if(resultadoTablero[i].PRE_AUDITORIA.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].PRE_AUDITORIA.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].PRE_AUDITORIA.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].PRE_AUDITORIA.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_PREAUDIT_AUDIT";
							esMdAtrasada = true;
						} else else if(resultadoTablero[i].PRE_AUDITORIA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						if(resultadoTablero[i].CONTEOAUDITOR != undefined) {
							datosMemorias[i][8] = "<span class='" + claseEstatus + "'>" + formato(resultadoTablero[i].CONTEOAUDITOR, true) + "</span>";
						} else {
							datosMemorias[i][8] = "<span class='" + claseEstatus + "'>---</span>";
						}
					} else {
						datosMemorias[i][8] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][8] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].PRE_GESTORIA != undefined) {
					if(resultadoTablero[i].PRE_GESTORIA.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].PRE_GESTORIA.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].PRE_GESTORIA.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].PRE_GESTORIA.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_PREGES_GES";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].PRE_GESTORIA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][9] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].PRE_GESTORIA.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][9] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][9] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].PRE_CONSTRUCCION != undefined) {
					if(resultadoTablero[i].PRE_CONSTRUCCION.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].PRE_CONSTRUCCION.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].PRE_CONSTRUCCION.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].PRE_CONSTRUCCION.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_PRECONS_CONS";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].PRE_CONSTRUCCION.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][10] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].PRE_CONSTRUCCION.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][10] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][10] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].VOBO_LAYOUT != undefined) {
					if(resultadoTablero[i].VOBO_LAYOUT.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].VOBO_LAYOUT.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].VOBO_LAYOUT.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].VOBO_LAYOUT.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_VOBOLAY";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].VOBO_LAYOUT.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][11] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].VOBO_LAYOUT.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][11] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][11] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].JSONPTOOBRA != undefined) {
					if(resultadoTablero[i].JSONPTOOBRA.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].JSONPTOOBRA.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].JSONPTOOBRA.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].JSONPTOOBRA.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_PPTO_CONS";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].JSONPTOOBRA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						if(resultadoTablero[i].PRESUPUESTO_OBRA != undefined) {
							datosMemorias[i][12] = "<span class='" + claseEstatus + "'>$ " + formato(resultadoTablero[i].PRESUPUESTO_OBRA, true) + "</span>";
						} else {
							datosMemorias[i][12] = "<span class='" + claseEstatus + "'>---</span>";
						}
					} else {
						datosMemorias[i][12] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][12] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].JSONPTOAUDITORIA != undefined) {
					if(resultadoTablero[i].JSONPTOAUDITORIA.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].JSONPTOAUDITORIA.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].JSONPTOAUDITORIA.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].JSONPTOAUDITORIA.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_PPTO_AUDIT";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].JSONPTOAUDITORIA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						if(resultadoTablero[i].PRESUPUESTO_AUDITORIA != undefined) {
							datosMemorias[i][13] = "<span class='" + claseEstatus + "'>$ " + formato(resultadoTablero[i].PRESUPUESTO_AUDITORIA, true) + "</span>";
						} else {
							datosMemorias[i][13] = "<span class='" + claseEstatus + "'>---</span>";
						}
					} else {
						datosMemorias[i][13] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][13] = "<span class='text_sin_atencion'>---</span>";
				}
				
				if(resultadoTablero[i].VOBOFNL_OPERACIONES != undefined) {
					if(resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].VOBOFNL_OPERACIONES.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_VOBOFINOPER";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][14] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][14] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][14] = "<span class='text_sin_atencion'>---</span>";
				}
				
				if(resultadoTablero[i].COMITE != undefined) {
					if(resultadoTablero[i].COMITE.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].COMITE.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].COMITE.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].COMITE.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_COMTE";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].COMITE.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][15] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].COMITE.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][15] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][15] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].CARGADATOS != undefined) {
					if(resultadoTablero[i].CARGADATOS.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].CARGADATOS.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].CARGADATOS.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].CARGADATOS.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_GDOCTOS";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].CARGADATOS.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][16] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].CARGADATOS.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][16] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][16] = "<span class='text_sin_atencion'>---</span>";
				}
				
				
				if(resultadoTablero[i].FIRMA_CONTRATO != undefined) {
					if(resultadoTablero[i].FIRMA_CONTRATO.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].FIRMA_CONTRATO.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].FIRMA_CONTRATO.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].FIRMA_CONTRATO.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_FIRMACONTR";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].FIRMA_CONTRATO.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][17] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].FIRMA_CONTRATO.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][17] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][17] = "<span class='text_sin_atencion'>---</span>";
				}
				
				if(resultadoTablero[i].CCO != undefined) {
					if(resultadoTablero[i].CCO.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].CCO.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].CCO.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].CCO.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_GDOCTOS";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].CCO.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][18] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].CCO.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][18] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][18] = "<span class='text_sin_atencion'>---</span>";
				}
				
				
				if(resultadoTablero[i].TRAMITES != undefined) {
					if(resultadoTablero[i].TRAMITES.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].TRAMITES.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].TRAMITES.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].TRAMITES.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_TRM_GES";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].TRAMITES.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][19] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].TRAMITES.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][19] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][19] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].INICIO_OBRA != undefined) {
					if(resultadoTablero[i].INICIO_OBRA.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].INICIO_OBRA.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].INICIO_OBRA.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].INICIO_OBRA.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							cadenaAtraso += "&ATR_INICOBRA";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].INICIO_OBRA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][20] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].INICIO_OBRA.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][20] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][20] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].ESTIMADO_FINOBRA != undefined) {
					datosMemorias[i][21] = "<span class=''>" + resultadoTablero[i].ESTIMADO_FINOBRA + "</span>";
				} else {
					datosMemorias[i][21] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].ESTIMADO_APERTURA != undefined) {
					datosMemorias[i][22] = "<span class=''>" + resultadoTablero[i].ESTIMADO_APERTURA + "</span>";
				} else {
					datosMemorias[i][22] = "<span class='text_sin_atencion'>---</span>";
				}
				datosMemorias[i][23] = resultadoTablero[i].MDID;
				datosMemorias[i][24] = resultadoTablero[i].ESTATUSMD;
				datosMemorias[i][25] = cadenaAtraso;
				if(esMdAtrasada) {
					datosMemorias[i][0] = "<div class='circle_atrasadas_semaforo' style='margin-left: 8px;'></div><span style='font-size:1px; color: #FFF;'>0</span>";
				} else {
					datosMemorias[i][0] = "<div class='circle_tiempo_semaforo' style='margin-left: 8px;'></div><span style='font-size:1px; color: #FFF;'>1</span>";
				}
			 }
			
			initTablaMemoriasTablero('DivTablaTablero', datosMemorias, 'tablaMemoriasTablero');
			
			$("#tablaMemoriasTablero tr td").click(function() {
				var mdId = $(this).parent().find("td:eq(23)").html();
				var nombreMd=$(this).parent().find("td:eq(4)").html();
				
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
						var usuario = "";
						var mensaje = "";
						var motivoRechazo = "";
						switch(col) {
							case 7:
							if(resultadoTablero[i].PRE_OPERACIONES.validacion == "SI") {
								usuario = resultadoTablero[i].PRE_OPERACIONES.usuario != null ? resultadoTablero[i].PRE_OPERACIONES.usuario : '-';
								
								if(resultadoTablero[i].PRE_OPERACIONES.estatus == "RECHAZADA") {
									mensaje = "¿Quién rechazó? ";
									motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].PRE_OPERACIONES.motivoRechazo;
								} else {
									mensaje = "¿Quién autorizó? ";
								}
								mensaje += usuario + "<br/>" +
										"Del área: " + resultadoTablero[i].PRE_OPERACIONES.Area + "<br/>" +
										"En la fecha: " +  resultadoTablero[i].PRE_OPERACIONES.fechaValidacion + "<br />" +
										motivoRechazo;
								cargaMensajeModal('PRE-OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
							} else {
								var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
								cargaMensajeModal('PRE-OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
							}
							break;
							case 9:
								if(resultadoTablero[i].PRE_GESTORIA.validacion == "SI") {
									usuario = resultadoTablero[i].PRE_GESTORIA.usuario != null ? resultadoTablero[i].PRE_GESTORIA.usuario : '-'; 
									
									if(resultadoTablero[i].PRE_GESTORIA.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].PRE_GESTORIA.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].PRE_GESTORIA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].PRE_GESTORIA.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('PRE-GESTORIA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('PRE-GESTORIA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 10:
								if(resultadoTablero[i].PRE_CONSTRUCCION.validacion == "SI") {
									usuario = resultadoTablero[i].PRE_CONSTRUCCION.usuario != null ? resultadoTablero[i].PRE_CONSTRUCCION.usuario : '-';
									
									if(resultadoTablero[i].PRE_CONSTRUCCION.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].PRE_CONSTRUCCION.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].PRE_CONSTRUCCION.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].PRE_CONSTRUCCION.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('PRE-CONSTRUCCION', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('PRE-CONSTRUCCION', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 11:
								if(resultadoTablero[i].VOBO_LAYOUT.validacion == "SI") {
									usuario = resultadoTablero[i].VOBO_LAYOUT.usuario != null ? resultadoTablero[i].VOBO_LAYOUT.usuario : '-';
									
									if(resultadoTablero[i].VOBO_LAYOUT.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].VOBO_LAYOUT.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].VOBO_LAYOUT.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].VOBO_LAYOUT.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('VOBO LAYOUT', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('VOBO LAYOUT', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 14:
								if(resultadoTablero[i].VOBOFNL_OPERACIONES.validacion == "SI") {
									usuario = resultadoTablero[i].VOBOFNL_OPERACIONES.usuario != null ? resultadoTablero[i].VOBOFNL_OPERACIONES.usuario : '-';
									
									if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].VOBOFNL_OPERACIONES.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].VOBOFNL_OPERACIONES.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('VOBO FINAL OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('VOBO FINAL OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 15:
								if(resultadoTablero[i].COMITE.validacion == "SI") {
									usuario = resultadoTablero[i].COMITE.usuario != null ? resultadoTablero[i].COMITE.usuario : '-';
									
									if(resultadoTablero[i].COMITE.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].COMITE.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].COMITE.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].COMITE.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('COMITE', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('COMITE', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 16:
								if(resultadoTablero[i].CARGADATOS.validacion == "SI") {
									usuario = resultadoTablero[i].CARGADATOS.usuario != null ? resultadoTablero[i].CARGADATOS.usuario : '-';
									
									if(resultadoTablero[i].CARGADATOS.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].CARGADATOS.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].CARGADATOS.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].CARGADATOS.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('CARGA DOCUMENTOS', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('CARGA DOCUMENTOS', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 17:
								if(resultadoTablero[i].FIRMA_CONTRATO.validacion == "SI") {
									usuario = resultadoTablero[i].FIRMA_CONTRATO.usuario != null ? resultadoTablero[i].FIRMA_CONTRATO.usuario : '-';
									
									if(resultadoTablero[i].FIRMA_CONTRATO.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].FIRMA_CONTRATO.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].FIRMA_CONTRATO.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].FIRMA_CONTRATO.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('CONTRATO FIRMADO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('CONTRATO FIRMADO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 18:
								if(resultadoTablero[i].CCO.validacion == "SI") {
									usuario = resultadoTablero[i].CCO.usuario != null ? resultadoTablero[i].CCO.usuario : '-';
									
									if(resultadoTablero[i].CCO.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].CCO.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].CCO.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].CCO.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('CECO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('CECO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 19:
								if(resultadoTablero[i].TRAMITES.validacion == "SI") {
									usuario = resultadoTablero[i].TRAMITES.usuario != null ? resultadoTablero[i].TRAMITES.usuario : '-';
									
									if(resultadoTablero[i].TRAMITES.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].TRAMITES.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].TRAMITES.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].TRAMITES.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('GESTORÍA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('GESTORÍA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 20:
								if(resultadoTablero[i].INICIO_OBRA.validacion == "SI") {
									usuario = resultadoTablero[i].INICIO_OBRA.usuario != null ? resultadoTablero[i].INICIO_OBRA.usuario : '-';
									
									if(resultadoTablero[i].INICIO_OBRA.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].INICIO_OBRA.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].INICIO_OBRA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].INICIO_OBRA.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('INICIO DE OBRA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
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
		}
	};	
}

function obtieneNombreMd(mdId) {
	for(var i = 0; i < resultadoTablero.length; i++) {
		if(mdId == resultadoTablero[i].MDID) {
			abreDetalleMd(resultadoTablero[i].NOMBRETDA, mdId);
			break;
		}
	}
}

function muestraFechaMd(mdId) {
	for(var i = 0; i < resultadoTablero.length; i++) {
		if(mdId == resultadoTablero[i].MDID) {
			if(resultadoTablero[i].FECHARECEPCION.validacion == "SI") {
				var mensaje = "¿Quién autorizó? " + resultadoTablero[i].FECHARECEPCION.usuario + "<br/>" +
								"Del área: " + resultadoTablero[i].FECHARECEPCION.Area + "<br/>" +
								"En la fecha: " +  resultadoTablero[i].FECHARECEPCION.fechaValidacion;
				cargaMensajeModal('RECEPCIÓN', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
			} else {
				var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
				cargaMensajeModal('RECEPCIÓN', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			}
			break;
		}
	}
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