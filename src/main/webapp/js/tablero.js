var resultadoTablero = null;
var datosExcel = "";

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
			initTablaMemoriasTablero('DivTablaTablero', 0, 'tablaMemoriasTablero');
		} else {
			resultadoTablero = data.detalleTablero;
			datosExcel = data;
			$("#descargaExcelTablero").show();
			var datosMemorias = new Array();
			
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
					datosMemorias[i][3] = "<span style='"  + "'>" + resultadoTablero[i].NOMBRETDA + "</span>";
				} else {
					datosMemorias[i][3] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].CONTEOAUDITOR != undefined) {
					datosMemorias[i][4] = "<span style='"  + "'>" + formato(resultadoTablero[i].CONTEOAUDITOR, true) + "</span>";
				} else {
					datosMemorias[i][4] = "<span style='"  + "'>---</span>";
				}
				if(resultadoTablero[i].PRE_GESTORIA != undefined) {
					datosMemorias[i][5] = "<span>" + resultadoTablero[i].PRE_GESTORIA.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][5] = "<span>---</span>";
				}
				if(resultadoTablero[i].PRE_CONSTRUCCION != undefined) {
					datosMemorias[i][6] = "<span>" + resultadoTablero[i].PRE_CONSTRUCCION.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][6] = "<span>---</span>";
				}
				if(resultadoTablero[i].VOBO_LAYOUT != undefined) {
					datosMemorias[i][7] = "<span>" + resultadoTablero[i].VOBO_LAYOUT.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][7] = "<span>---</span>";
				}
				if(resultadoTablero[i].PRESUPUESTO_OBRA != undefined) {
					datosMemorias[i][8] = "<span>$ " + formato(resultadoTablero[i].PRESUPUESTO_OBRA, true) + "</span>";
				} else {
					datosMemorias[i][8] = "<span>---</span>";
				}
				if(resultadoTablero[i].PRESUPUESTO_AUDITORIA != undefined) {
					datosMemorias[i][9] = "<span>$ " + formato(resultadoTablero[i].PRESUPUESTO_AUDITORIA, true) + "</span>";
				} else {
					datosMemorias[i][9] = "<span>---</span>";
				}
				if(resultadoTablero[i].TRAMITES != undefined) {
					datosMemorias[i][10] = "<span>" + resultadoTablero[i].TRAMITES.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][10] = "<span>---</span>";
				}
				if(resultadoTablero[i].VOBOFNL_OPERACIONES != undefined) {
					datosMemorias[i][11] = "<span>" + resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][11] = "<span>---</span>";
				}
				if(resultadoTablero[i].FIRMA_CONTRATO != undefined) {
					datosMemorias[i][12] = "<span>" + resultadoTablero[i].FIRMA_CONTRATO.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][12] = "<span>---</span>";
				}
				if(resultadoTablero[i].INICIO_OBRA != undefined) {
					datosMemorias[i][13] = "<span>" + resultadoTablero[i].INICIO_OBRA.fechaValidacion + "</span>";
				} else {
					datosMemorias[i][13] = "<span>---</span>";
				}
				if(resultadoTablero[i].ESTIMADO_FINOBRA != undefined) {
					datosMemorias[i][14] = "<span>" + resultadoTablero[i].ESTIMADO_FINOBRA + "</span>";
				} else {
					datosMemorias[i][14] = "<span>---</span>";
				}
				if(resultadoTablero[i].ESTIMADO_APERTURA != undefined) {
					datosMemorias[i][15] = "<span>" + resultadoTablero[i].ESTIMADO_APERTURA + "</span>";
				} else {
					datosMemorias[i][15] = "<span>" + resultadoTablero[i].ESTIMADO_APERTURA + "</span>";
				}
				datosMemorias[i][16] = resultadoTablero[i].MDID;
			 }
			
			initTablaMemoriasTablero('DivTablaTablero', datosMemorias, 'tablaMemoriasTablero');
			
			$("#tablaMemoriasTablero tr td").click(function() {
				var mdId = $(this).parent().find("td:eq(16)").html();
				
				idColumna = jQuery("#tablaMemoriasTablero").dataTable().fnGetPosition(this);
				var col = idColumna[1];
				
				console.log("::: columna :::" + col);
				
				for(var i = 0; i < resultadoTablero.length; i++) {
					if(mdId == resultadoTablero[i].MDID) {
						switch(col) {
							case 5:
								if(resultadoTablero[i].PRE_GESTORIA.validacion == "SI") {
									var mensaje = "¿Quién autorizó? " + resultadoTablero[i].PRE_GESTORIA.usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].PRE_GESTORIA.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].PRE_GESTORIA.fechaValidacion;
									cargaMensajeModal('PRE-GESTORIA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('PRE-GESTORIA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 6:
								if(resultadoTablero[i].PRE_CONSTRUCCION.validacion == "SI") {
									var mensaje = "¿Quién autorizó? " + resultadoTablero[i].PRE_CONSTRUCCION.usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].PRE_CONSTRUCCION.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].PRE_CONSTRUCCION.fechaValidacion;
									cargaMensajeModal('PRE-CONSTRUCCION', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('PRE-CONSTRUCCION', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 7:
								if(resultadoTablero[i].VOBO_LAYOUT.validacion == "SI") {
									var mensaje = "¿Quién autorizó? " + resultadoTablero[i].VOBO_LAYOUT.usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].VOBO_LAYOUT.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].VOBO_LAYOUT.fechaValidacion;
									cargaMensajeModal('VOBO LAYOUT', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('VOBO LAYOUT', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 10:
								if(resultadoTablero[i].TRAMITES.validacion == "SI") {
									var mensaje = "¿Quién autorizó? " + resultadoTablero[i].TRAMITES.usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].TRAMITES.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].TRAMITES.fechaValidacion;
									cargaMensajeModal('GESTORÍA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('GESTORÍA', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 11:
								if(resultadoTablero[i].VOBOFNL_OPERACIONES.validacion == "SI") {
									var mensaje = "¿Quién autorizó? " + resultadoTablero[i].VOBOFNL_OPERACIONES.usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].VOBOFNL_OPERACIONES.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].VOBOFNL_OPERACIONES.fechaValidacion;
									cargaMensajeModal('VOBO FINAL OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('VOBO FINAL OPERACIONES', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 12:
								if(resultadoTablero[i].FIRMA_CONTRATO.validacion == "SI") {
									var mensaje = "¿Quién autorizó? " + resultadoTablero[i].FIRMA_CONTRATO.usuario + "<br/>" +
											"Del área: " + resultadoTablero[i].FIRMA_CONTRATO.Area + "<br/>" +
											"En la fecha: " +  resultadoTablero[i].FIRMA_CONTRATO.fechaValidacion;
									cargaMensajeModal('CONTRATO FIRMADO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
								} else {
									var mensaje = "ATENCIÓN: Este paso no ha sido validado.";
									cargaMensajeModal('CONTRATO FIRMADO', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
								}
								break;
							case 13:
								if(resultadoTablero[i].INICIO_OBRA.validacion == "SI") {
									var mensaje = "¿Quién autorizó? " + resultadoTablero[i].INICIO_OBRA.usuario + "<br/>" +
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
			});
			
			$(".DTFC_Cloned tr td").click(function() {
				var mdId = $(this).parent().find("td:eq(0)").html();
				
				for(var i = 0; i < resultadoTablero.length; i++) {
					if(mdId == resultadoTablero[i].MDID) {
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
					}
				}
			});
		}
	};	
}

function ejecutaBusquedaTablero() {
	$("#tablaMemoriasTablero").dataTable().fnFilter($("#buscador").val());
}