var perfiles;
var clase="";
var esPantallaDetalle = false;
var modulosSelect;
var modulosSeleccionadosArray;
var perfilEdita;
var perfilElimina;

$(function(){
	$('#idconfiguracion').addClass('resaltado');
	
	limpiaBuscador();
	creatabla();
});

function limpiaBuscador() {
	$("#buscador").val('');
	$("#tablaPerfiles").dataTable().fnFilter($("#buscador").val());
	$("#tablaPerfilesDetalle").dataTable().fnFilter('');
}

function ejecutaBuscador() {
	if(esPantallaDetalle) {
		$("#tablaPerfilesDetalle").dataTable().fnFilter($("#buscador").val());
	} else {
		$("#tablaPerfiles").dataTable().fnFilter($("#buscador").val());
	}
}

function activa(valor){
	$('.boton_sup').removeClass('activo');
	
	 if(valor.id=="boton_sup_perfiles"){
	        $(valor).addClass('activo');
	        $("#confPerfiles").submit();
	    }
	 if(valor.id=="boton_sup_usuario"){
			$(valor).addClass('activo');
			$("#confUsuario").submit();
		}
}

function creatabla() {
	clase="";
	$( '#edit' ).removeClass("activado");
	$( '#refuse' ).removeClass("activado");
	
	invocarJSONServiceAction("perfilesAction", 
				{}, 
				'obtienePerfilesResponse', 
				function() {
					//Funcion de error
					cierraLoading();
				},
				function() {
					//Función al finalizar
					cierraLoading();
				});
	
	obtienePerfilesResponse = function( data ) {
		
		limpiaBuscador();
		
		if(data.codigo != 200) {
			cargaMensajeModal('PERFILES', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			initTablaPerfiles('DivTablaPerfiles', 0, 'tablaPerfiles');
		} else {
			perfiles = data.perfiles;
			modulosSelect = data.modulos;
			esPantallaDetalle = false;
			
			imprimePerfiles();
		}
	};
}

function imprimePerfiles() {
	var datosPerfiles = new Array();
	if(perfiles != undefined) {
		for( var i = 0 ; i < perfiles.length; i++){
			datosPerfiles[i] = new Array();
			datosPerfiles[i][0] = perfiles[i].perfilId;
			datosPerfiles[i][1] = perfiles[i].perfil + ' <span class="descripcion_perfil">(' + perfiles[i].descripcion + ')</span>';
			datosPerfiles[i][2] = perfiles[i].fechaModifica;
			datosPerfiles[i][3] = perfiles[i].estatus;
		}
	}
	initTablaPerfiles('DivTablaPerfiles', datosPerfiles, 'tablaPerfiles');
	
	$('#tablaPerfiles tr').hover(function() { 
		$(this).find("td.imagen").addClass(clase);
		
	}, function() { 
		$(this).find("td.imagen").removeClass(clase);

	});
	
	$("#tablaPerfiles tr").click(function() {
		var perfilId = $(this).find("td:eq(0)").html();
		
		if(clase!="") {	
			if(clase=="edit_tabla"){
				editaPerfil(perfilId);
			}
			if(clase=="refuse_tabla"){
				perfilElimina=perfilId;
				eliminarPerfil();
			}
		} else {
			cargaPerfilDetalle(perfilId);
		}
	});
}

function cargaPerfilDetalle(perfil) {
	$( "#divPerfiles" ).fadeOut( "fast" );
	$( "#divPerfilesDetalle" ).fadeIn( "fast" );
	
	for(var i = 0; i < perfiles.length; i++) {
		if(perfil == perfiles[i].perfilId) {
			esPantallaDetalle = true;
			$("#btnAtras").show();
			$("#crear").hide();
			$("#asignar").show();
			$("#agregar").show();
			$("#edit").hide();
			$("#refuse").hide();
			creaTablaPerfilDetalle(perfiles[i]);
			$("#perfilNombre").text(perfiles[i].perfil);
			$("#perfilDescripcion").text(perfiles[i].descripcion);
			$("#estatusPerfil").text(perfiles[i].estatus);
			break;
		}
	}
}

function atrasPerfiles() {
	esPantallaDetalle = true;
	limpiaBuscador();
	$("#btnAtras").hide();
	$("#crear").show();
	$("#asignar").hide();
	$("#agregar").hide();
	$("#edit").show();
	$("#refuse").show();
	$( "#divPerfiles" ).fadeIn( "fast" );
	$( "#divPerfilesDetalle" ).fadeOut( "fast" );
	imprimePerfiles();
}

function creaTablaPerfilDetalle(data) {
	var resultados = data.perfiles;
	var datosPerfilesDetalle = new Array();
	
	if(data.modulos != undefined) {
		for( var i = 0 ; i < data.modulos.length; i++) {
			if(data.modulos[i].submodulos != undefined && data.modulos[i].submodulos.length > 0) {
				for(var j = 0; j < data.modulos[i].submodulos.length; j++) {
					datosPerfilesDetalle[i] = new Array();
					datosPerfilesDetalle[i][0] = data.modulos[i].modulo;
					datosPerfilesDetalle[i][1] = data.modulos[i].submodulos[j].submodulo;
					datosPerfilesDetalle[i][2] = data.modulos[i].tipo;
					datosPerfilesDetalle[i][3] = data.modulos[i].estatus == 1 ? 'Activo' : 'Inactivo';
					datosPerfilesDetalle[i][4] = data.modulos[i].moduloId;
					datosPerfilesDetalle[i][5] = data.modulos[i].submodulos[j].submoduloId;
				}
			} else {
				datosPerfilesDetalle[i] = new Array();
				datosPerfilesDetalle[i][0] = data.modulos[i].modulo;
				datosPerfilesDetalle[i][1] = '-';
				datosPerfilesDetalle[i][2] = data.modulos[i].tipo;
				datosPerfilesDetalle[i][3] = data.modulos[i].estatus == 1 ? 'Activo' : 'Inactivo';
				datosPerfilesDetalle[i][4] = data.modulos[i].moduloId;
				datosPerfilesDetalle[i][5] = 0;
			}
		}
	}
	initTablaPerfilesDetalle('DivTablaPerfilesDetalle', datosPerfilesDetalle, 'tablaPerfilesDetalle');
	
	$('#tablaPerfilesDetalle tr').hover(function() { 
		$(this).find("td.imagen").addClass(clase);
		
	}, function() { 
		$(this).find("td.imagen").removeClass(clase);

	});
	
	$("#tablaPerfiles tr").click(function() {
		
	});
}

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

function creaEditaPerfil(perfilId) {
	var cadena = "";
	var modulos = "";
	modulosSeleccionadosArray = new Array();
	perfilEdita = perfilId != undefined ? perfilId : ''; 
	
	//Módulos al select
	for(var i = 0; i < modulosSelect.length; i++) {
		modulos += "<option value='" + modulosSelect[i].moduloId + "'>" + modulosSelect[i].modulo + "</option>";
	}
	
	cadena = "<div class='row padding_bottom_10'>" +
				"<div class='col-lg-12 col-12'><input type='text' onkeyup='activaCreaPerfil()' id='nombrePerfilCrea' style='width: 100%' placeholder='Nombre del perfil'/></div>" +
			"</div>" +
			"<div id='nombrePerfilError' class='row padding_bottom_10' style='display: none;'>" +
				"<div class='col-lg-12 col-12'><span style='color: #FF0000;font-size: 10px;'>Introduce un nombre de perfil</span></div>" +
			"</div>" +
			"<div class='row padding_bottom_10'>" +
				"<div class='col-lg-6 col-6'><span>Estatus</span></div>" +
				"<div class='col-lg-6 col-6' style='text-align: right'>" +
				"<label class='contenedor'>Activo" +
				  "<input id='estatusCreaPerfil' type='checkbox' checked='checked'>" +
				  "<span class='checkmark'></span>" +
				"</label>" +
				"</div>" +
			"</div>" +
			"<div class='row padding_bottom_10'>" +
				"<div class='col-lg-11 col-11 custom_select'>" +
					"<select id='selectModuloCrea' name='selectModulo' onchange='seleccionaSubmoduloCrea()' class='combo_modulos'>" +	
						"<option value='0'>Seleccionar módulo</option>" +
						modulos +
					"</select>" +
				"</div>" +
				"<div class='col-lg-1 col-1' style='margin-left: -10px;margin-top: 5px;' onclick='agregaModuloCrear()'>" +
					"<img style='cursor: pointer;width: 15px;' src='img/agregar.svg'/>" +
				"</div>" +
			"</div>" +
			"<div id='moduloPerfilCrea' class='row padding_bottom_10' style='display:none;'>" +
				"<div class='col-lg-12 col-12'><span style='color: #FF0000;font-size: 10px;'>Selecciona un módulo</span></div>" +
			"</div>" +
			"<div class='row padding_bottom_10'>" +
				"<div class='col-lg-12 col-12 custom_select'>" +
					"<select id='selectSubmodulosCrea' name='selectSubmodulos' class='combo_modulos'>" +	
						"<option value='0'>Seleccionar submódulo</option>" +
					"</select>" +
				"</div>" +
			"</div>" +
			"<div id='submoduloPerfilCrea' class='row padding_bottom_10' style='display:none;'>" +
				"<div class='col-lg-12 col-12'><span style='color: #FF0000;font-size: 10px;'>Selecciona un submódulo</span></div>" +
			"</div>" +
			"<div class='row padding_bottom_10' style=''>" +
				"<div class='col-12' id='modulosLista' style='display:none; background: #F1F1F1;overflow-y: scroll;max-height: 120px;'>" +
				"</div>" +
			"</div>" +
			"<div class='row padding_bottom_10'>" +
				"<div class='col-12'><input type='text' onkeyup='activaCreaPerfil()' id='descripcionPerfilCrea' style='width: 100%; height: 100px;' placeholder='Descripción del perfil'/></div>" +
			"</div>" +
			"<div id='errorGenerico' class='row padding_bottom_10' style='display:none;'>" +
				"<div class='col-lg-12 col-12'><span style='color: #FF0000;font-size: 10px;'>---</span></div>" +
			"</div>";
			
		cargaMensajeModal('Crear perfil', cadena, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, creaNuevoPerfil);
	
	$("#botonMensajeAceptar").hide();
}

function editaPerfil(perfil) {
	modulosSeleccionadosArray = new Array();
	
	for(var i = 0; i < perfiles.length; i++) {
		if(perfil == perfiles[i].perfilId) {
			creaEditaPerfil(perfil);
			
			if(perfiles[i].modulos != undefined) {
				for(var j = 0; j < perfiles[i].modulos.length; j++) {
					if(perfiles[i].modulos[j].submodulos != undefined) {
						for(var k = 0; k < perfiles[i].modulos[j].submodulos.length; k++) {
							var subId = '';
							var subNombre = '';
							if(perfiles[i].modulos[j].submodulos[k].submoduloId != null && perfiles[i].modulos[j].submodulos[k].submoduloId != 'null') {
								subId = perfiles[i].modulos[j].submodulos[k].submoduloId;
								subNombre = perfiles[i].modulos[j].submodulos[k].submodulo;
							}
							modulosSeleccionadosArray.push({'modulo': perfiles[i].modulos[j].moduloId, 'moduloNombre': perfiles[i].modulos[j].modulo, 
								'submodulo': perfiles[i].modulos[j].submodulos[k].submoduloId, 'submoduloNombre': perfiles[i].modulos[j].submodulos[k].submodulo});
						}
					} else {
						modulosSeleccionadosArray.push({'modulo': perfiles[i].modulos[j].moduloId, 'moduloNombre': perfiles[i].modulos[j].modulo});
					}
				}
			}
			
			$("#nombrePerfilCrea").val(perfiles[i].perfil);
			$("#descripcionPerfilCrea").val(perfiles[i].descripcion);
			if(perfiles[i].estatus == "ACTIVO") {
				$("#estatusCreaPerfil").prop('checked', true);
			} else {
				$("#estatusCreaPerfil").prop('checked', false);
			}	
			dibujaModulosCrea();
			activaCreaPerfil();
			break;
		}
	}
}

function seleccionaSubmoduloCrea() {
	var moduloId = $("#selectModuloCrea").val();
	$("#selectSubmodulosCrea").empty();
	$('#selectSubmodulosCrea').append($('<option>', {value:0, text:'Seleccionar submódulo'}));
	 
	for(var i = 0; i < modulosSelect.length; i++) {
		if(moduloId == modulosSelect[i].moduloId) {
			if(modulosSelect[i].subModulos != undefined) {
				for(var j = 0; j < modulosSelect[i].subModulos.length; j++) {
					$('#selectSubmodulosCrea').append($('<option>', {value:modulosSelect[i].subModulos[j].submoduloId, text:modulosSelect[i].subModulos[j].submodulo}));
				}
			}
			break;
		}
	}
}

function agregaModuloCrear() {
	var agregaModulo = true;
	
	$("#errorGenerico").hide();
	if($("#selectModuloCrea").val() == 0) {
		$("#moduloPerfilCrea").show();
		agregaModulo = false;
	} else {
		$("#moduloPerfilCrea").hide();
	}
	
	if($("#selectSubmodulosCrea").val() == 0) {
		$("#submoduloPerfilCrea").show();
		agregaModulo = false;
	} else {
		$("#submoduloPerfilCrea").hide();
	}
	
	if(agregaModulo) {
		for(var i = 0; i < modulosSeleccionadosArray.length; i++) {
			if($("#selectModuloCrea").val() == modulosSeleccionadosArray[i].modulo && $("#selectSubmodulosCrea").val() == modulosSeleccionadosArray[i].submodulo) {
				$("#errorGenerico").find("span").text("Ya se agregó este módulo");
				$("#errorGenerico").show();
				return;
			}
		}
		modulosSeleccionadosArray.push({'modulo': $("#selectModuloCrea").val(), 'moduloNombre': $("#selectModuloCrea").find('option:selected').text(), 
										'submodulo': $("#selectSubmodulosCrea").val(), 'submoduloNombre': $("#selectSubmodulosCrea").find('option:selected').text()});
		
		dibujaModulosCrea();
		activaCreaPerfil();
		
		$('#selectModuloCrea option[value=0]').prop('selected', true);
		$("#selectSubmodulosCrea").empty();
		$('#selectSubmodulosCrea').append($('<option>', {value:0, text:'Seleccionar submódulo'}));
	}	
}

function dibujaModulosCrea() {
	$("#modulosLista").show();
	$("#modulosLista").html('');
	var html = '';
	
	html += "<div class='row'>" +
				"<div class='col-6' style='text-align: center; border-bottom: 1px solid #A2A2A2;'><span>Módulo</span></div>" +
				"<div class='col-6' style='text-align: center; border-bottom: 1px solid #A2A2A2;'><span>Submódulo</span></div>" +
			"</div>";
	
	for(var i = 0; i < modulosSeleccionadosArray.length; i++) {
		var subModuloNombre = '';
		var subModuloId = '';
		
		if(modulosSeleccionadosArray[i].submoduloNombre != undefined) {
			subModuloNombre = modulosSeleccionadosArray[i].submoduloNombre;
		}
		
		html += "<div class='row' style='padding-top: 5px;padding-bottom: 5px;'>" +
					"<div class='col-5' style='text-align: center'><span>" + modulosSeleccionadosArray[i].moduloNombre + "</span></div>" +
					"<div class='col-5' style='text-align: center'><span>" + subModuloNombre + "</span></div>" +
					"<div class='col-2' style='text-align: center' onclick='eliminaPerfilCrea(" + modulosSeleccionadosArray[i].modulo + 
						"," + modulosSeleccionadosArray[i].submodulo + ")'><img style='cursor:pointer; width: 15px;padding-top: 5px;' src='img/eliminar.svg' /></div>" +
				"</div>";
	}
	$("#modulosLista").html(html);
}

function eliminaPerfilCrea(modulo, submodulo) {
	for(var i = 0; i < modulosSeleccionadosArray.length; i++) {
		if(submodulo != undefined) {
			
		}
		if(modulo == modulosSeleccionadosArray[i].modulo && submodulo != undefined && submodulo == modulosSeleccionadosArray[i].submodulo) {
			modulosSeleccionadosArray.splice(i,1);
		} else if(modulo == modulosSeleccionadosArray[i].modulo) {
			modulosSeleccionadosArray.splice(i,1);
		}
	}
	dibujaModulosCrea();
	activaCreaPerfil();
}

function activaCreaPerfil() {
	if($("#nombrePerfilCrea").val() != '' && modulosSeleccionadosArray.length > 0 && $("#descripcionPerfilCrea").val() != '') {
		$("#botonMensajeAceptar").show();
	} else {
		$("#botonMensajeAceptar").hide();
	}
}

function creaNuevoPerfil() {
	var arregloModulos = new Array();
	var estatus = 0;
	
	if($("#estatusCreaPerfil").is(":checked")) {
		estatus = 1;
	}
	
	for(var i = 0; i < modulosSeleccionadosArray.length; i++) {
		if(modulosSeleccionadosArray[i].submodulo != undefined) {
			arregloModulos.push("{\"FIMODULOID\": " + modulosSeleccionadosArray[i].modulo + ", \"FISUBMODULOID\": " + modulosSeleccionadosArray[i].submodulo + "}");
		} else {
			arregloModulos.push("{\"FIMODULOID\": " + modulosSeleccionadosArray[i].modulo + "}");
		}
	}
	
	
	invocarJSONServiceAction("creaPerfilAction", 
			{
				perfilId: perfilEdita,
				nombre: $("#nombrePerfilCrea").val(),
				estatus: estatus,
				descripcion: $("#descripcionPerfilCrea").val(),
				modulos: arregloModulos.join()
			}, 
			'creaPerfilResponse', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	creaPerfilResponse = function( data ) {
	
	if(data.codigo != 200) {
		cargaMensajeModal('PERFILES', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	} else {
		cargaMensajeModal('PERFILES', "Cambios guardados con éxito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
		creatabla();
	}
	};
}

	function eliminarPerfil() {
		 cargaMensajeModal('PERFILES', 
		            '¿Está seguro de eliminar el perfil seleccionado?',
		            TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, eliminaPerfilAction);
	}
	
	function eliminaPerfilAction() {
	    invocarJSONServiceAction("eliminaPerfilAction", 
	            {'perfilId': perfilElimina}, 
	            'accionEliminarResponse', 
	            function() {
	                //Funcion de error               
	                cierraLoading();
	            },
	            function() {
	                //Función al finalizar                
	                cierraLoading();
	            });

	    accionEliminarResponse = function( data ) {
	        if(data.codigo != 200) {
	            cargaMensajeModal('PERFILES', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	        } else {
	            cargaMensajeModal('PERFILES', "Perfil eliminado con éxito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
	            creatabla();
	        }
	    }
	}