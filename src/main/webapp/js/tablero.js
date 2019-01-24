var resultadoTablero = null;
var datosExcel = "";

var DETALLE_MD = 3;
var EDITA_MD = 4;
var ESTATUS_PAUSA_MD = 21;
var ESTATUS_CANCELADAS_MD = 17;
var mdIdEstatus = 0;


var PREGES_GES 		= 5;
var PRECONS_CONS	= 6;
var PREAUDIT_AUDIT	= 7;
var VOBOINICOPER	= 8;
var VOBOLAY			= 9;
var PPTO_CONS		= 10;
var PPTO_AUDIT		= 11;
var VOBOFINOPER		= 12;
var FIRMACONTR		= 13;
var COMTE			= 22;
var GDOCTOS			= 23;
var CENTRCOST		= 24;
var TRM_GES			= 14;
var INICOBA		    = 15;
var ENOBRA			= 26;
var INGTDA			= 16;


var togSrc = [
    "../img/arrowDown.png",
    "../img/arrowUp.png"
];

$(function(){
	$('#idtablero').addClass('resaltado');
	inicializaCalendarios();
	
	//if($( "#datepicker1").val()!='')
	filtraTableroPorMDEstatus();
	creatabla();
	
	$( "#datepicker1").change(function() {
		creatabla();
	});
	
	$("#descargaExcelTablero").click(function() {
		$("#datos").val(JSON.stringify(datosExcel));
		$("#submitBotonTablero").click();
	});
	
	$("select#selectEstatus").change(function(){
		creatabla();
	});
	
	$(".slide-toggle").click(function(){
        $(".box").slideToggle();
    });
	permisos_perfil();
});

function filtraMDPorEstatus() {
	var url_string = window.location.href
	var url = new URL(url_string);
	var estatusId = url.searchParams.get("estatusId");
	var estatusMd = url.searchParams.get("estatusMd");
	
	if(estatusId != undefined && estatusMd != undefined && estatusMd == 1) {
		$("#divEstatus" + estatusId).click();
	} else if(estatusId != undefined && estatusMd != undefined && estatusMd == 2) {
		$("#divAtraso" + estatusId).click();
	}
}

function filtraTableroPorMDEstatus() {
	var url_string = window.location.href
	var url = new URL(url_string);
	var estatusMd = url.searchParams.get("estatusMd");
	
	if(estatusMd != undefined && estatusMd == 0) {
		 $('[name=selectEstatus]').val( '0' );
	}
}

function dibujaEstatus(resumen) {
    var datos = "";
    var total = 0;
    var totalAtrasadas = 0;
    
    for(var i = 0; i < resumen.length; i++) {
        if(resumen[i].estatusid != 0) {
            var busqueda = "";
            
            if(resumen[i].estatusid == PREGES_GES) {
                busqueda = "PREGES_GES";
            } else if(resumen[i].estatusid == PRECONS_CONS) {
                busqueda = "PRECONS_CONS";
            } else if(resumen[i].estatusid == PREAUDIT_AUDIT) {
                busqueda = "PREAUDIT_AUDIT";
            } else if(resumen[i].estatusid == VOBOINICOPER) {
                busqueda = "VOBOINICOPER";
            } else if(resumen[i].estatusid == VOBOLAY) {
                busqueda = "VOBOLAY";
            } else if(resumen[i].estatusid == PPTO_CONS) {
                busqueda = "PPTO_CONS";
            } else if(resumen[i].estatusid == PPTO_AUDIT) {
                busqueda = "PPTO_AUDIT";
            } else if(resumen[i].estatusid == VOBOFINOPER) {
                busqueda = "VOBOFINOPER";
            } else if(resumen[i].estatusid == FIRMACONTR) {
                busqueda = "FIRMACONTR";
            } else if(resumen[i].estatusid == COMTE) {
                busqueda = "COMTE";
            } else if(resumen[i].estatusid == GDOCTOS) {
                busqueda = "GDOCTOS";
            } else if(resumen[i].estatusid == CENTRCOST) {
                busqueda = "CENTRCOST";
            } else if(resumen[i].estatusid == TRM_GES) {
                busqueda = "TRM_GES";
            } else if(resumen[i].estatusid == INICOBA) {
                busqueda = "INICOBA";
            } else if(resumen[i].estatusid == INGTDA) {
                busqueda = "INGTDA";
            } else if(resumen[i].estatusid == ENOBRA) {
                busqueda = "&_&";
            }
            
            var busquedaCadena = "";
            if(resumen[i].atrasadas != "NA") {
                busquedaCadena = 'onclick="filtraEstatus(\'#&' + resumen[i].estatusid + '&# &ATR_' + busqueda + '\',' + resumen[i].total + ',' + resumen[i].atrasadas + ', this, \'' + resumen[i].estatus + '\')"';
            } else {
                busquedaCadena = '';
            }
            
            datos += '<div id="divEstatus' + resumen[i].estatusid + '" onclick="filtraEstatus(\'#&' + resumen[i].estatusid + '&#\',' + resumen[i].total + ',' + resumen[i].atrasadas + ', this, \'' + resumen[i].estatus + '\')" class="tabla_pendientes" style="width: 65%;"><span>' + resumen[i].estatus + '</span></div>' +
                    '<div  onclick="filtraEstatus(\'#&' + resumen[i].estatusid + '&#\',' + resumen[i].total + ',' + resumen[i].atrasadas + ', this, \'' + resumen[i].estatus + '\')" class="tabla_pendientes" style="width: 18%;padding-left: 10px;"><span>' + resumen[i].total + '</span></div>' +
                    '<div id="divAtraso' + resumen[i].estatusid + '" ' + busquedaCadena + ' class="tabla_pendientes" style="width: 17%;padding-left: 10px;"><span>' + resumen[i].atrasadas + '</span></div>';
            total += resumen[i].total;
            if(resumen[i].atrasadas != "NA") {
                totalAtrasadas += resumen[i].atrasadas;
            } else {
                totalAtrasadas = -1;
            }
        } else if(resumen[i].estatusid == 0) {
            total = resumen[i].total;
            totalAtrasadas = resumen[i].atrasadas;
        }
    }
    if(totalAtrasadas == -1) {
        datos += '<div  class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 65%;"><span>Total</span></div>' +
        '<div class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 18%;padding-left: 10px;"><span id="totalPendientes">' + total + '</span></div>' +
        '<div class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 17%;padding-left: 10px;"><span id="totalPendientes">NA</span></div>';
    } else {
        datos += '<div onclick="filtraEstatus(\'\',' + total + ',' + totalAtrasadas + ', this)" class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 65%;"><span>Total</span></div>' +
        '<div onclick="filtraEstatus(\'\',' + total + ',' + totalAtrasadas + ', this)" class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 18%;padding-left: 10px;"><span id="totalPendientes">' + total + '</span></div>' +
        '<div onclick="filtraEstatus(\'$#&1&#$\',' + total + ',' + totalAtrasadas + ', this, \'TOTAL\')" class="tabla_pendientes" style="border-top: 2px solid #FFF;width: 17%;padding-left: 10px;"><span id="totalPendientes">' + totalAtrasadas + '</span></div>';
    }
    $("#box-inner").html(datos);
}

function filtraEstatus(cadena, pendientes, atrasadas, o, cadenaAtrasadas) {
	$(".box").slideToggle();
	
	if($(o).hasClass("cicle_tiempo_sem_selecc")) {
		$(o).removeClass("cicle_tiempo_sem_selecc");
		$("#tablaMemoriasTablero").dataTable().fnFilter('');
		$("#areaTextTablero").text("Área");
		$("#areaPendientesTablero").text("Pendientes");
		$("#areaAtrasadasTablero").text("Atrasadas");
	} else {
		$(".tabla_pendientes").removeClass("cicle_tiempo_sem_selecc");
		$(o).addClass("cicle_tiempo_sem_selecc");
		$("#tablaMemoriasTablero").dataTable().fnFilter(cadena);
		if(cadena == "" || cadena == "&ATR_") {
			$("#areaTextTablero").text("TOTAL");
		} else if(cadenaAtrasadas != undefined) {
			$("#areaTextTablero").text(cadenaAtrasadas);
		} else {
			$("#areaTextTablero").text(cadena);
		}
		
		$("#areaPendientesTablero").text(pendientes);
		$("#areaAtrasadasTablero").text(atrasadas);
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
	
	var tipoTabla = $("#selectEstatus").val();
	$("#areaTextTablero").text("Área");
	$("#areaPendientesTablero").text("Pendientes");
	$("#areaAtrasadasTablero").text("Atrasadas");
	
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
			$('#time').hide;
			$('#edit').hide;
			$('#pause').hide;
			$('#refuse').hide;
			$('#change').hide;
			$('#descargaExcelTablero').hide;
			initTablaMemoriasTablero('DivTablaTablero', 0, 'tablaMemoriasTablero');
		} else {
			resultadoTablero = data.detalleTablero;
			datosExcel = data;
			$("#descargaExcelTablero").show();
			$("#time").show();
			
			if(tipoTabla == 1) {
				$("#pause").show();
				$("#refuse").show();
				$("#edit").show();
				$("#change").show();
			} else {
				$("#pause").hide();
				$("#refuse").hide();
				$("#edit").hide();
				$("#change").hide();
			}
			var datosMemorias = new Array();
			
			if(data.resumen != undefined && data.resumen != null && data.resumen != "null") {
				dibujaEstatus(data.resumen);
			}
			
			for( var i = 0 ; i < resultadoTablero.length; i++){
				var esMdAtrasada = false;
				var cadenaAtraso = '';
				
				datosMemorias[i] = new Array();	 	
				datosMemorias[i][1] =  "<div onclick='obtieneNombreMd(\"" + resultadoTablero[i].MDID + "\");'><span class='text_seleccion'>" + resultadoTablero[i].MDID + "</span></div>";
				if(resultadoTablero[i].GERENTE_EXP != undefined) {
					datosMemorias[i][2] = "<div onclick='muestraFechaMdGerente(\"" + resultadoTablero[i].MDID + "\");'><span class='text_seleccion_dos'>" + resultadoTablero[i].GERENTE_EXP.fechaValidacion + "</span></div>";
				} else {
					datosMemorias[i][2] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].FECHARECEPCION != undefined) {
					datosMemorias[i][3] = "<div onclick='muestraFechaMd(\"" + resultadoTablero[i].MDID + "\");'><span class='text_seleccion_dos'>" + resultadoTablero[i].FECHARECEPCION.fechaValidacion + "</span></div>";
				} else {
					datosMemorias[i][3] = "<span style='"  + "'>---</span>";
				}
				/*if(resultadoTablero[i].FUENTEMD != undefined) {
					datosMemorias[i][4] = "<span style='"  + "'>" + resultadoTablero[i].FUENTEMD + "</span>";
				} else {
					datosMemorias[i][4] = "<span style='"  + "'>---</span>";
				}*/
				if(resultadoTablero[i].NOMBRETDA != undefined) {
					datosMemorias[i][4] = resultadoTablero[i].NOMBRETDA;
				} else {
					datosMemorias[i][4] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].REGION != undefined) {
					datosMemorias[i][5] = resultadoTablero[i].REGION;
				} else {
					datosMemorias[i][5] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].CATEGORIA != undefined) {
					datosMemorias[i][6] = "<span style='"  + "'>" + resultadoTablero[i].CATEGORIA + "</span>";
				} else {
					datosMemorias[i][6] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].PUNTOSTOTALES != undefined) {
					datosMemorias[i][7] = "<span style='"  + "'>" + resultadoTablero[i].PUNTOSTOTALES + "</span>";
				} else {
					datosMemorias[i][7] = "<span style='"  + "'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].PRE_OPERACIONES.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].PRE_OPERACIONES.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_VOBOINICOPER";
							esMdAtrasada = true;
						}
						datosMemorias[i][8] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].PRE_OPERACIONES.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][8] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][8] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].PRE_AUDITORIA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].PRE_AUDITORIA.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_PREAUDIT_AUDIT";
							esMdAtrasada = true;
						}
						if(resultadoTablero[i].CONTEOAUDITOR != undefined) {
							datosMemorias[i][9] = "<span class='" + claseEstatus + "'>" + formato(resultadoTablero[i].CONTEOAUDITOR, true) + "</span>";
						} else {
							datosMemorias[i][9] = "<span class='" + claseEstatus + "'>---</span>";
						}
					} else {
						datosMemorias[i][9] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][9] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].PRE_GESTORIA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].PRE_GESTORIA.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_PREGES_GES";
							esMdAtrasada = true;
						}
						datosMemorias[i][10] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].PRE_GESTORIA.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][10] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][10] = "<span class='text_sin_atencion'>---</span>";
				}
				
				/*== LEVANTAMIENTO ==*/
				if(resultadoTablero[i].LEVANTAMIENTO != undefined) {
					if(resultadoTablero[i].LEVANTAMIENTO.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].LEVANTAMIENTO.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].LEVANTAMIENTO.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].LEVANTAMIENTO.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].LEVANTAMIENTO.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].LEVANTAMIENTO.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_VOBOLAY";
							esMdAtrasada = true;
						}
						datosMemorias[i][11] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].LEVANTAMIENTO.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][11] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][11] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].PRE_CONSTRUCCION.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].PRE_CONSTRUCCION.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_PRECONS_CONS";
							esMdAtrasada = true;
						}
						datosMemorias[i][12] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].PRE_CONSTRUCCION.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][12] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][12] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].VOBO_LAYOUT.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].VOBO_LAYOUT.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_VOBOLAY";
							esMdAtrasada = true;
						}
						datosMemorias[i][13] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].VOBO_LAYOUT.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][13] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][13] = "<span class='text_sin_atencion'>---</span>";
				}
			
				/*== FIN LEVANTAMIENTO == */
				
				
				
				
				if(resultadoTablero[i].JSONPTOOBRA != undefined) {
					if(resultadoTablero[i].JSONPTOOBRA.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].JSONPTOOBRA.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].JSONPTOOBRA.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].JSONPTOOBRA.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].JSONPTOOBRA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].JSONPTOOBRA.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_PPTO_CONS";
							esMdAtrasada = true;
						}
						if(resultadoTablero[i].PRESUPUESTO_OBRA != undefined) {
							datosMemorias[i][14] = "<span class='" + claseEstatus + "'>$ " + formato(resultadoTablero[i].PRESUPUESTO_OBRA, true) + "</span>";
						} else {
							datosMemorias[i][14] = "<span class='" + claseEstatus + "'>---</span>";
						}
					} else {
						datosMemorias[i][14] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][14] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].JSONPTOAUDITORIA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].JSONPTOAUDITORIA.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_PPTO_AUDIT";
							esMdAtrasada = true;
						}
						if(resultadoTablero[i].PRESUPUESTO_AUDITORIA != undefined) {
							datosMemorias[i][15] = "<span class='" + claseEstatus + "'>$ " + formato(resultadoTablero[i].PRESUPUESTO_AUDITORIA, true) + "</span>";
						} else {
							datosMemorias[i][15] = "<span class='" + claseEstatus + "'>---</span>";
						}
					} else {
						datosMemorias[i][15] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][15] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_VOBOFINOPER";
							esMdAtrasada = true;
						}
						datosMemorias[i][16] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][16] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][16] = "<span class='text_sin_atencion'>---</span>";
				}
				
				if(resultadoTablero[i].MONTOVNT != undefined) {
					if(resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].VOBOFNL_OPERACIONES.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].VOBOFNL_OPERACIONES.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						datosMemorias[i][17] = "<span class='" + claseEstatus + "'>$" + formato(resultadoTablero[i].MONTOVNT, true) + "</span>";
					} else {
						datosMemorias[i][17] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][17] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].COMITE.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].COMITE.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_COMTE";
							esMdAtrasada = true;
						}
						datosMemorias[i][18] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].COMITE.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][18] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][18] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].CARGADATOS.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].CARGADATOS.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_GDOCTOS";
							esMdAtrasada = true;
						}
						datosMemorias[i][19] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].CARGADATOS.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][19] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][19] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].FIRMA_CONTRATO.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].FIRMA_CONTRATO.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_FIRMACONTR";
							esMdAtrasada = true;
						}
						datosMemorias[i][20] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].FIRMA_CONTRATO.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][20] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][20] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].CCO.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].CCO.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_CENTRCOST";
							esMdAtrasada = true;
						}
						datosMemorias[i][21] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].CCO.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][21] = "<span class='text_sin_atencion'></span>";
					}
				} else {
					datosMemorias[i][21] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].TRAMITES.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].TRAMITES.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_TRM_GES";
							esMdAtrasada = true;
						}
						datosMemorias[i][22] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].TRAMITES.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][22] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][22] = "<span class='text_sin_atencion'>---</span>";
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
							esMdAtrasada = true;
						} else if(resultadoTablero[i].INICIO_OBRA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].INICIO_OBRA.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_INICOBA";
							esMdAtrasada = true;
						}
						datosMemorias[i][23] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].INICIO_OBRA.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][23] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][23] = "<span class='text_sin_atencion'>---</span>";
				}
				if(resultadoTablero[i].EN_OBRA != undefined) {
					if(resultadoTablero[i].EN_OBRA.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].EN_OBRA.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].EN_OBRA.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].EN_OBRA.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].EN_OBRA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].EN_OBRA.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_INICOBA";
							esMdAtrasada = true;
						}
						datosMemorias[i][24] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].EN_OBRA.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][24] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][24] = "<span class='text_sin_atencion'>---</span>";
				}
				
				if(resultadoTablero[i].TIENDA_ABIERTA != undefined) {
					if(resultadoTablero[i].TIENDA_ABIERTA.fechaValidacion != undefined) {
						var claseEstatus = "";
						if(resultadoTablero[i].TIENDA_ABIERTA.validacion == "NO") {
							claseEstatus = "text_sin_atencion";
						} else if(resultadoTablero[i].TIENDA_ABIERTA.estatus == "EN TIEMPO") {
							claseEstatus = "text_en_tiempo";
						} else if(resultadoTablero[i].TIENDA_ABIERTA.estatus == "ATRASADA") {
							claseEstatus = "text_atrasada";
							esMdAtrasada = true;
						} else if(resultadoTablero[i].TIENDA_ABIERTA.estatus == "RECHAZADA") {
							claseEstatus = "text_rechazada";
						}
						
						if(resultadoTablero[i].TIENDA_ABIERTA.estatus == "ATRASADA") {
							cadenaAtraso += "&ATR_INICOBA";
							esMdAtrasada = true;
						}
						datosMemorias[i][25] = "<span class='" + claseEstatus + "'>" + resultadoTablero[i].TIENDA_ABIERTA.fechaValidacion + "</span>";
					} else {
						datosMemorias[i][25] = "<span class='text_sin_atencion'>---</span>";
					}
				} else {
					datosMemorias[i][25] = "<span class='text_sin_atencion'>---</span>";
				}
				
				
				/*if(resultadoTablero[i].ESTIMADO_FINOBRA != undefined) {
					datosMemorias[i][24] = "<span class=''>" + resultadoTablero[i].ESTIMADO_FINOBRA + "</span>";
				} else {
					datosMemorias[i][24] = "<span class='text_sin_atencion'>---</span>";
				}
				*/
				/*if(resultadoTablero[i].ESTIMADO_APERTURA != undefined) {
					datosMemorias[i][25] = "<span class=''>" + resultadoTablero[i].ESTIMADO_APERTURA + "</span>";
				} else {
					datosMemorias[i][25] = "<span class='text_sin_atencion'>---</span>";
				}
				*/
				if(resultadoTablero[i].INAUGURACIONINICIAL != undefined) {
					datosMemorias[i][26] = "<span class=''>" + resultadoTablero[i].INAUGURACIONINICIAL + "</span>";
				} else {
					datosMemorias[i][26] = "<span class='text_sin_atencion'>---</span>";
				}
				datosMemorias[i][27] = resultadoTablero[i].MDID;
				var estatusPorTablero = "";
				
                if(resultadoTablero[i].ESTATUSMD != undefined && resultadoTablero[i].ESTATUSMD.length > 0) {
                    for(var j = 0; j < eval(resultadoTablero[i].ESTATUSMD).length; j++) {
                        estatusPorTablero += "#&" + eval(resultadoTablero[i].ESTATUSMD)[j].estatusId + "&#";
                    }
                }
                datosMemorias[i][28] = estatusPorTablero;
				datosMemorias[i][29] = cadenaAtraso;
				datosMemorias[i][30] = "$#&" + resultadoTablero[i].ESTATUSFINAL + "&#$";
				if(esMdAtrasada) {
					datosMemorias[i][0] = "<div class='circle_atrasadas_semaforo' style='margin-left: 8px;'></div><span style='font-size:1px; color: #FFF;'>0</span>";
				} else {
					datosMemorias[i][0] = "<div class='circle_tiempo_semaforo' style='margin-left: 8px;'></div><span style='font-size:1px; color: #FFF;'>1</span>";
				}
			 }
			
			initTablaMemoriasTablero('DivTablaTablero', datosMemorias, 'tablaMemoriasTablero');
			
			
			//valida filtro de MDs
			filtraMDPorEstatus();
			
			
			$("#tablaMemoriasTablero tr td").click(function() {
				var mdId = $(this).parent().find("td:eq(27)").html();
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
						$( '#edit' ).removeClass("activado");
						$( '#pause' ).removeClass("activado");
						$( '#refuse' ).removeClass("activado");
						$( '#time' ).removeClass("activado");
						$( '#change' ).removeClass("activado");
						$("#tablaMemoriasTablero tr").find("td.imagen").removeClass(clase); console.log("llego hasta aca");
						clase="";
						
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
							case 8:
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
							if(resultadoTablero[i].PRE_AUDITORIA.validacion == "SI") {
								usuario = resultadoTablero[i].PRE_AUDITORIA.usuario != null ? resultadoTablero[i].PRE_AUDITORIA.usuario : '-';
								
								if(resultadoTablero[i].PRE_AUDITORIA.estatus == "RECHAZADA") {
									mensaje = "¿Quién rechazó? ";
									motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].PRE_AUDITORIA.motivoRechazo;
								} else {
									mensaje = "¿Quién autorizó? ";
								}
								mensaje += usuario + "<br/>" +
										"Del área: " + resultadoTablero[i].PRE_AUDITORIA.Area + "<br/>" +
										"En la fecha: " +  resultadoTablero[i].PRE_AUDITORIA.fechaValidacion + "<br />" +
										motivoRechazo;
								cargaMensajeModal('CONTEOS', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
							} else {
								var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
								cargaMensajeModal('CONTEOS', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
							}
							break;
							case 10:
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
								
								/* == LEVANTAMIENTO == */	
							case 11:
								if(resultadoTablero[i].LEVANTAMIENTO.validacion == "SI") {
									usuario = resultadoTablero[i].LEVANTAMIENTO.usuario != null ? resultadoTablero[i].LEVANTAMIENTO.usuario : '-';
									
									if(resultadoTablero[i].LEVANTAMIENTO.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].LEVANTAMIENTO.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].LEVANTAMIENTO.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].LEVANTAMIENTO.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('LEVANTAMIENTO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('LEVANTAMIENTO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
								
							case 12:
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
							case 13:
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
								if(resultadoTablero[i].JSONPTOOBRA.validacion == "SI") {
									usuario = resultadoTablero[i].JSONPTOOBRA.usuario != null ? resultadoTablero[i].JSONPTOOBRA.usuario : '-';
									
									if(resultadoTablero[i].JSONPTOOBRA.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].JSONPTOOBRA.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].JSONPTOOBRA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].JSONPTOOBRA.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('PPTO CONSTRUCCIÓN', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('PPTO CONSTRUCCIÓN', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 15:
								if(resultadoTablero[i].JSONPTOAUDITORIA.validacion == "SI") {
									usuario = resultadoTablero[i].JSONPTOAUDITORIA.usuario != null ? resultadoTablero[i].JSONPTOAUDITORIA.usuario : '-';
									
									if(resultadoTablero[i].JSONPTOAUDITORIA.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].JSONPTOAUDITORIA.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].JSONPTOAUDITORIA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].JSONPTOAUDITORIA.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('PPTO AUDITORIA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('PPTO AUDITORIA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 16:
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
							 case 17:
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
							case 18:
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
							case 19:
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
							case 20:
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
							case 21:
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
							case 22:
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
							case 23:
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
								
							case 24:
								if(resultadoTablero[i].EN_OBRA.validacion == "SI") {
									usuario = resultadoTablero[i].EN_OBRA.usuario != null ? resultadoTablero[i].EN_OBRA.usuario : '-';
									
									if(resultadoTablero[i].EN_OBRA.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].EN_OBRA.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].EN_OBRA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].EN_OBRA.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('FIN DE OBRA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('FIN DE OBRA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
								
							case 25:
								if(resultadoTablero[i].TIENDA_ABIERTA.validacion == "SI") {
									usuario = resultadoTablero[i].TIENDA_ABIERTA.usuario != null ? resultadoTablero[i].TIENDA_ABIERTA.usuario : '-';
									
									if(resultadoTablero[i].TIENDA_ABIERTA.estatus == "RECHAZADA") {
										mensaje = "¿Quién rechazó? ";
										motivoRechazo = "Motivo de rechazo: " + resultadoTablero[i].TIENDA_ABIERTA.motivoRechazo;
									} else {
										mensaje = "¿Quién autorizó? ";
									}
									mensaje += usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].TIENDA_ABIERTA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].TIENDA_ABIERTA.fechaValidacion + "<br />" +
											motivoRechazo;
									cargaMensajeModal('INAUGURACION', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
									cargaMensajeModal('INAUGURACION', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
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

function muestraFechaMdGerente(mdId) {
	for(var i = 0; i < resultadoTablero.length; i++) {
		if(mdId == resultadoTablero[i].MDID) {
			if(resultadoTablero[i].GERENTE_EXP.validacion == "SI") {
				var mensaje = "¿Quién autorizó? " + resultadoTablero[i].GERENTE_EXP.usuario + "<br/>" +
								"Del área: " + resultadoTablero[i].GERENTE_EXP.Area + "<br/>" +
								"En la fecha: " +  resultadoTablero[i].GERENTE_EXP.fechaValidacion;
				cargaMensajeModal('GERENTE EXPANSIÓN', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
			} else {
				var mensaje = "ATENCIÓN: Este estatus no ha sido validado.";
				cargaMensajeModal('GERENTE EXPANSIÓN', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
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
            creatabla();
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
            cargaMensajeModal('EDITA MD', "Memoria descriptiva cancelada con éxito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
            creatabla();
        }
    }
}