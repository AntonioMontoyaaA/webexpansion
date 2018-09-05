var AUTORIZA_MODULO			= 1;
var RECHAZA_MODULO			= 0;

var TOTAL_ATENCIONES = 1;
var MOTIVOS_RECHAZO = {};
var FACTORES = {};
var PERMISOS = {};
var ESTATUS_FINALIZA_MD = -1;

Dropzone.autoDiscover = false;

var LAYOUT_B64 = '';
var LAYOUT_Type = '';
var uploader;
var dropzoneLayouts;
var dropzoneOptions;
var ARCHIVO_SUBIDO = false;
var CONTEO_GUARDADO = false;
var ARCHIVOS_MD;

var areaExpansion = 1;
var areaGestoria = 2;
var areaConstruccion = 3;
var areaAuditoria = 4;
var areaOperaciones = 5;
var areaFinanzas = 6;

var AREA_USUARIO;
var PUESTO;
var DIR_OPE = 19;
var ESTATUS_MD;

var ESTATUS_LAYOUT = [6,7];
var ESTATUS_VALIDACION_LAYOUT = 9;
var ESTATUS_PRESUPUESTO_CONSTRUCCION = 10;
var ESTATUS_PRESUPUESTO_AUDITORIA = 11;
var ESTATUS_VOBO_FINAL = 12;
var ESTATUS_COMITE = [22,23];
var ESTATUS_CORRECCION_LAYOUT = 18;
var ESTATUS_CORRECCION_PRESUPUESTO_CONSTRUCCION = 19;
var ESTATUS_CORRECCION_PRESUPUESTO_AUDITORIA = 20;
var ESTATUS_CONTRATO = 13;
var ESTATUS_CECO = 24;
var ESTATUS_GESTORIA = 14;
var ESTATUS_OBRA = 15;

var HORAI;
var HORAF;

var AREAS_A;

var ATENCION_POR_ESTATUS;

var FILES_B64 = new Array();
var FILES_Type = new Array();

var USUARIO;

$(function(){
	
	AREA_USUARIO = parseInt($('#areaUsuario').val());
	PUESTO = parseInt($('#puestoUsuario').val());
	USUARIO = parseInt($('#usuarioId').val());
	
	inicializaFactores();
	parseaPermisos();

	MOTIVOS_RECHAZO = {};
	
	funcionesAutorizacion();
});

function inicializaFactores(){
	FACTORES[1] = new FactorAutorizacion(1,'Datos del sitio',false);
	FACTORES[2] = new FactorAutorizacion(2,'Datos del propietario',false);
	FACTORES[3] = new FactorAutorizacion(3,'Superficie',false);
	FACTORES[4] = new FactorAutorizacion(4,'Zonificacion',false);
	FACTORES[5] = new FactorAutorizacion(5,'Construccion',false);
	FACTORES[6] = new FactorAutorizacion(6,'Generalidades',false);
	FACTORES[7] = new FactorAutorizacion(7,'Flujo peatonal',false);
	
	AREAS_A = {};
	AREAS_A[areaExpansion] = false;
	AREAS_A[areaGestoria] = false;
	AREAS_A[areaAuditoria] = false;
	AREAS_A[areaConstruccion] = false;
	AREAS_A[areaOperaciones] = false;
	
	ATENCION_POR_ESTATUS = {};
	ATENCION_POR_ESTATUS[3] = [areaExpansion];
	ATENCION_POR_ESTATUS[8] = [areaExpansion, areaOperaciones];
	ATENCION_POR_ESTATUS[5] = [areaGestoria, areaAuditoria];
	ATENCION_POR_ESTATUS[7] = [areaGestoria, areaAuditoria];
	ATENCION_POR_ESTATUS[6] = [areaConstruccion];
	ATENCION_POR_ESTATUS[13] = [areaOperaciones];
}

function validaEstatusAtencion(estatus, idObjetos){
	
	$('#autoriza8').hide();
	$('#rechaza8').hide();
	$('#voboMD').hide();
	
	if(PERMISOS[idObjetos] != undefined && PERMISOS[idObjetos].permiteAutorizar == 1 && ESTATUS_MD < ESTATUS_VALIDACION_LAYOUT){
		
		$('#autoriza' + idObjetos).show();
		$('#rechaza' + idObjetos).show();
		
		$('#autoriza' + idObjetos).removeClass('autorizado');
		$('#rechaza' + idObjetos).removeClass('autorizado');
		$('#autoriza' + idObjetos).addClass('sin_autorizar');
		$('#rechaza' + idObjetos).addClass('sin_autorizar');
		
		if(estatus == 2){// pendiente atencion
			$('#autoriza'  + idObjetos).addClass('sin_autorizar');
			$('#rechaza'  + idObjetos).addClass('sin_autorizar');
			FACTORES[idObjetos].motivo = 0;
		}else if(estatus == 1){ //autorizado
			$('#autoriza' + idObjetos).removeClass('sin_autorizar');
			$('#autoriza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
			FACTORES[idObjetos].motivo = -1;
		}else if(estatus == 0){//rechazado
			$('#rechaza' + idObjetos).removeClass('sin_autorizar');
			$('#rechaza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
			FACTORES[idObjetos].motivo = 1;
		}else if(estatus == 3){//rechazado con motivo definitivo
			$('#rechaza' + idObjetos).removeClass('sin_autorizar');
			$('#rechaza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
			FACTORES[idObjetos].motivoRechazoDefinitivo =  true;
			FACTORES[idObjetos].motivo = 1;
		}else{//desconocido
			$('#autoriza' + idObjetos).addClass('sin_autorizar');
			$('#rechaza' + idObjetos).addClass('sin_autorizar');
		}
	}else{
		$('#autoriza' + idObjetos).hide();
		$('#rechaza' + idObjetos).hide();
	}
}

function dibujaGraficaAutorizaciones(){
	$('#containerProgreso').html('');
	$('#autoriza8').hide();
	$('#rechaza8').hide();
	$('#voboMD').hide();
	
	if(permiteAutorizacion() && !AREAS_A[AREA_USUARIO]){
		$('#autoriza8').show();
		$('#voboMD').show();
		if(AREA_USUARIO != areaAuditoria && AREA_USUARIO != areaConstruccion)
			$('#rechaza8').show();
		else{
			$('#msjFinalizacion').html('¿Finalizar MD?');
			$('#autoriza8').text('Finalizar')
		}
	}
	
}


function permiteAutorizacion(){
	return $.inArray(AREA_USUARIO, ATENCION_POR_ESTATUS[ESTATUS_MD]) != -1;
}

function permiteLayout(){
	return $.inArray(ESTATUS_MD, ESTATUS_LAYOUT) != -1;
}

function permiteComite(){
	if(PUESTO != DIR_OPE)
		return false;
	else
		return $.inArray(ESTATUS_MD, ESTATUS_COMITE) != -1;
}


function autorizaPantalla(modulo, elemento) {
	if($(elemento).hasClass('sin_autorizar') && ESTATUS_MD < ESTATUS_PRESUPUESTO_CONSTRUCCION && !AREAS_A[AREA_USUARIO]){
		$("#tituloModalAutorizacion").text("¿Estás seguro de autorizar " + FACTORES[modulo].nombre + "?");
		$("#tipoAutorizacion").val(AUTORIZA_MODULO);
		$("#finaliza").val(0);
		$("#moduloId").val(modulo);
		$("#mdIdAutorizacion").val($("#mdId").val());
		$("#comboMotivos").hide();
		$('#detalleMensajeModal textarea').val('');
		$("#modal_autorizacion").modal("show");
	}
}

function rechazaPantalla(modulo, elemento) {
	if($(elemento).hasClass('sin_autorizar') && ESTATUS_MD < ESTATUS_PRESUPUESTO_CONSTRUCCION && !AREAS_A[AREA_USUARIO]){
		cargaLoading();
		buscaMotivosRechazo(modulo);
	}
}

function buscaMotivosRechazo(modulo){
	if(MOTIVOS_RECHAZO[modulo] == undefined){ //no se han consultado los motivos de rechazo
		consultaMotivosRechazo(modulo,2);
	}else{//ya se consultaron los motivos
		cargaComboMotivos(modulo);
	}

}

function cargaComboMotivos(modulo){
	strCombo = '<select id="motivoRechazo" class="motivoRechazo">' + 
				'<option value="0" disabled>SELECCIONA EL MOTIVO DE RECHAZO</option>';
	$.each(MOTIVOS_RECHAZO[modulo], function(){
		strCombo += '<option ' + ((this.isDefinitivo) ? 'style="color: red"' : '') + ' value="' + this.id + '">' + this.nombre + '</option>' 
	});
	
	strCombo += '</select>';
	
	$("#comboMotivos").html(strCombo);
	$('#motivoRechazo').val(0);
	if(modulo == 0)
		$("#tituloModalAutorizacion").text("¿Estás seguro de rechazar la MD?");
	else
		$("#tituloModalAutorizacion").text("¿Estás seguro de rechazar " + FACTORES[modulo].nombre + "?");
	$("#tipoAutorizacion").val(RECHAZA_MODULO);
	$("#finaliza").val(0);
	$("#moduloId").val(modulo);
	$("#mdIdAutorizacion").val($("#mdId").val());
	$("#comboMotivos").show();
	$('#detalleMensajeModal textarea').val('');
	$("#modal_autorizacion").modal("show");
}



function finalizaMD(estatus){
	if(!AREAS_A[AREA_USUARIO]){

		ESTATUS_FINALIZA_MD = estatus;
		permiteAutorizacion = true;
		
		if(AREA_USUARIO == areaConstruccion && !ARCHIVO_SUBIDO){
			permiteAutorizacion = false;
			cargaMensajeModal('DETALLE MD', 
					'Debes adjuntar el archivo de layout antes de autorizar',
					TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
		}else if(AREA_USUARIO == areaAuditoria && !CONTEO_GUARDADO){
			permiteAutorizacion = false;
			cargaMensajeModal('DETALLE MD', 
					'Debes cargar el promedio peatonal antes de autorizar',
					TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
		}
		
		if(estatus == 1 && permiteAutorizacion){
			
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de autorizar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
		}else if(estatus == 0 && permiteAutorizacion){
			
			var conRechazo = false;
			for(i in FACTORES){
				if(FACTORES[i].motivo != -1){
					conRechazo = true;
					break;
				}
			}
			
			if(conRechazo){
				cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de rechazar la MD?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, consultaMotivosRechazo);
			}else{
				consultaMotivosRechazo(0, 1);
			}
		}
	}else if(ESTATUS_MD == ESTATUS_VOBO_FINAL && AREA_USUARIO == areaOperaciones){
		ESTATUS_FINALIZA_MD = estatus;
		if(estatus == 1){
			monto = $('#tiendaID').val();
			if(monto == ''){
				cargaMensajeModal('DETALLE MD', 
						'Debes capturar el monto de la venta presupuestada',
						TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
			}else{
				cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de autorizar la MD?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionvoboFinal);
			}
		}else if(estatus == 0){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de rechazar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, consultaMotivosRechazo);
		}
	}else if(permiteComite() && AREA_USUARIO == areaOperaciones){
		ESTATUS_FINALIZA_MD = estatus;
		if(estatus == 1){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de autorizar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
		}else if(estatus == 0){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de rechazar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, consultaMotivosRechazo);
		}
	}else if(ESTATUS_MD == ESTATUS_GESTORIA && AREA_USUARIO == areaGestoria){
		ESTATUS_FINALIZA_MD = estatus;
		if(estatus == 1){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de autorizar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
		}else if(estatus == 0){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de rechazar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, consultaMotivosRechazo);
		}
	}else if(ESTATUS_MD == ESTATUS_CONTRATO && AREA_USUARIO == areaGestoria){
		ESTATUS_FINALIZA_MD = estatus;
		if(estatus == 1){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de autorizar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
		}else if(estatus == 0){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de rechazar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, consultaMotivosRechazo);
		}
	}
}

function actionfinalizaMD(motivo, comment){
	cargaLoading();
	
	if(motivo == undefined)
		motivo = 0;
	if(comment == undefined)
		comment = '';
	
	invocarJSONServiceAction("autorizaMd", 
			{'modulo':0,
			 'md': $("#mdIdAutorizacion").val(),
			 'validacion': ESTATUS_FINALIZA_MD,
			 'motivo': motivo,
			 'finaliza' : 1,
			 'comentario': comment
			 }, 
			'responseFinalizacion', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});
	
	responseFinalizacion = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		}else{
			if(ESTATUS_FINALIZA_MD == 1)
				cargaMensajeModal('DETALLE MD', 'Autorizaci\u00f3n exitosa', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, redireccionaAsignadas);
			else if(ESTATUS_FINALIZA_MD == 0)
				cargaMensajeModal('DETALLE MD', 'Rechazo exitoso', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, redireccionaAsignadas);
		}
	}
}

function actionvoboFinal(){
	cargaLoading();
	
	monto = $('#tiendaID').val();
	tipoServicio = 11;
	mdId = $("#mdId").val();
	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	
	invocarJSONServiceAction("subeArchivo", 
			{'mdId': mdId,
			'tipoServicio' : tipoServicio,
			'fecha': fecha,
			'monto': monto}, 
			'respVOBO', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});

	respVOBO = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('DETALLE MD', 'Ocurrio un error, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		}else{
			ESTATUS_FINALIZA_MD = 1;
			actionfinalizaMD();
		}
	}
}

function funcionesAutorizacion(){
	$("#btnModalAutorizacion").click(function() {
		var motivoSeleccionado = 0;
		if($("#tipoAutorizacion").val() == AUTORIZA_MODULO){
			if($('#detalleMensajeModal textarea').val() == '')
				$('#detalleMensajeModal textarea').val(' ');
			motivoSeleccionado = 0;
			autoriza(motivoSeleccionado);
		}else if($("#tipoAutorizacion").val() == RECHAZA_MODULO){
			mensaje = '';
			if($('#detalleMensajeModal textarea').val() == '')
				mensaje += 'Porfavor escriba el motivo de rechazo';
			if($('#motivoRechazo option:selected').val() == 0){
				if(mensaje == '')
					mensaje += 'Por favor selecciona el motivo de rechazo';
				else
					mensaje = 'Porfavor escriba y seleccione el motivo de rechazo';
			}else
				motivoSeleccionado = $('#motivoRechazo option:selected').val();
			
			if(mensaje == '')
				autoriza(motivoSeleccionado);
			else{
				$("#modal_autorizacion").modal("hide");
				cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, muestraPopAutorizacion);
			}
		}
		
	});	
}

function autoriza(motivoSeleccionado){
	$("#modal_autorizacion").modal("hide");
	
	modulo = $("#moduloId").val();
	cargaLoading();
	if(modulo != 0){
		invocarJSONServiceAction("autorizaMd", 
				{'modulo': modulo,
				 'md': $("#mdIdAutorizacion").val(),
				 'validacion':$("#tipoAutorizacion").val(),
				 'motivo': motivoSeleccionado,
				 'finaliza' : $("#finaliza").val(),
				 'comentario': $('#detalleMensajeModal textarea').val()
				 }, 
				'responseAutorizacion', 
				function() {
					cierraLoading();
				},
				function() {
					cierraLoading();
				});
	}else{
		actionfinalizaMD(motivoSeleccionado, $('#detalleMensajeModal textarea').val())
	}
}


function responseAutorizacion(data){
	if(data.codigo != 200){
		cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
	}else{
		
		moduloEjecutado = $("#moduloId").val();
		
		if($("#tipoAutorizacion").val() == AUTORIZA_MODULO){
			$('#autoriza' + moduloEjecutado).removeClass('sin_autorizar');
			$('#autoriza' + moduloEjecutado).addClass('autorizado');
			
			$('#rechaza' + moduloEjecutado).removeClass('autorizado');
			$('#rechaza' + moduloEjecutado).addClass('sin_autorizar');
			FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
			FACTORES[moduloEjecutado].motivo = -1;
		}else if($("#tipoAutorizacion").val() == RECHAZA_MODULO){
			$('#rechaza' + moduloEjecutado).removeClass('sin_autorizar');
			$('#rechaza' + moduloEjecutado).addClass('autorizado');
			
			$('#autoriza' + moduloEjecutado).removeClass('autorizado');
			$('#autoriza' + moduloEjecutado).addClass('sin_autorizar');
			
			if(MOTIVOS_RECHAZO[moduloEjecutado][$('#motivoRechazo').val()].isDefinitivo){
				FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  true;
				FACTORES[moduloEjecutado].motivo = $('#motivoRechazo').val();
			}else{
				FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
				FACTORES[moduloEjecutado].motivo = $('#motivoRechazo').val();
			}
		}else{
			$('#autoriza' + moduloEjecutado).removeClass('autorizado');
			$('#rechaza' + moduloEjecutado).removeClass('autorizado');
			$('#autoriza' + moduloEjecutado).addClass('sin_autorizar');
			$('#rechaza' + moduloEjecutado).addClass('sin_autorizar');
			FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
			FACTORES[moduloEjecutado].motivo = 1;
		}
		
		
		FACTORES[moduloEjecutado].atendido = true;
		dibujaGraficaAutorizaciones();
	}
}

function consultaMotivosRechazo(modulo, tipo){
	if(modulo == undefined)
		modulo = 0;
	if(tipo == undefined)
		tipo = 1;
	
	invocarJSONServiceAction("motivosRechazo", 
			{'modulo': modulo,
			'tipoModulo': tipo}, 
			'almacenaMotivosRechazo', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});

	almacenaMotivosRechazo = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		}else{
			if(data.motivos != undefined){
				motivos = {};
				$.each(data.motivos, function(){
					if(motivos[this.motivoId] == undefined){
						motivos[this.motivoId] = new MotivoRechazo(this.motivoId, this.descripcion, this.rechazoDefinitvo == 1)
					}
				});
				
				MOTIVOS_RECHAZO[modulo] = motivos;
				
				cargaComboMotivos(modulo);
			}
		}
	}
}

function parseaPermisos(){
	PERMISOS = {};
	$('.permisos_detalleMd').each(function(){
		
		rel = $(this).attr('rel');
		
		if(rel == 8){//Modulo para detalle de la MD
			a = JSON.parse($(this).val().replaceAll("'",'"'));
			
			if(PERMISOS[a.FISUBMODULO] == undefined){
				PERMISOS[a.FISUBMODULO] = new Permiso(
						a.BLOQUEASEGUIMIENTO,
						a.FIESTATUS,
						a.FIMODULOID,
						a.FISUBMODULO,
						a.PERMITEEDITAR,
						a.PERMITECOMENTAR,
						a.PERMITERECHAZAR,
						a.PERMITEAUTORIZAR
				);
				
				if(a.PERMITEAUTORIZAR == 1)
					TOTAL_ATENCIONES++;
			}
		}
		
	});
}

function inicializaDropzone(){

	//LAYOUT
	if(AREA_USUARIO == areaConstruccion 
			&& !AREAS_A[areaConstruccion] 
			&& (permiteLayout() 
					|| ESTATUS_MD == ESTATUS_CORRECCION_LAYOUT)){
		$('#manejadorArchivos').show();
		$('#montoPresupuesto').hide();
		$('.simbolo').hide();
		$('#divACC').hide();
		dropzoneOptions = {
	            dictDefaultMessage: 'Arrastra aqui el layout o da clic para buscarlo en tu equipo',
	            dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
	            dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
	            dictInvalidFileType: 'Archivo no permitido',
	            dictRemoveFile: 'Eliminar archivo', 
	            dictRemoveFileConfirmation: 'Archivo eliminado',
	            dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
	            paramName: "file",
	            autoProcessQueue: false,
	            uploadMultiple: false,
	            maxFilesize: 3, // MB
	            maxFiles: 1,
	            addRemoveLinks: true,
	            acceptedFiles: 'image/*,application/pdf,.psd',
	            accept: function(file, done){
	                reader = new FileReader();
	                reader.onload = handleReaderLoad;
	                reader.readAsDataURL(file);
	                
	                LAYOUT_B64 = '';
	                LAYOUT_Type = '';
	                
	                function handleReaderLoad(evt) {
	                	LAYOUT_B64 = evt.target.result;
	                	LAYOUT_Type = file.type;
	                	$('#subeArchivo').show();
	                }
	                done();
	            }
	        };
		
	        uploader = document.querySelector('#uploader');
	        dropzoneLayouts = new Dropzone(uploader, dropzoneOptions);
	        ARCHIVO_SUBIDO = false;
	        
	        dibujaArchivos();
	        $('#subeArchivo').unbind('click');
	        $('#subeArchivo').click(function(){
	        	
	        	cargaLoading();
	        	
	        	mdId = $("#mdId").val();
	        	nombreArchivo = 'LYT' + mdId; 
	        	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        	archivo = LAYOUT_B64;
	        	formato = LAYOUT_Type.split('/')[1];
	        	tipoArchivo = 2;
	        	tipoServicio = 1;
	        	
	        	invocarJSONServiceAction("subeArchivo", 
	        			{'mdId': mdId,
	        			'nombreArchivo': nombreArchivo,
	        			'archivo': archivo,
	        			'formato': formato,
	        			'tipoArchivo': tipoArchivo,
	        			'tipoServicio' : tipoServicio,
	        			'fecha': fecha,
	        			'monto': '',
	        			'acc' : ''}, 
	        			'respSubeArchivo', 
	        			function() {
	        				cierraLoading();
	        			},
	        			function() {
	        				cierraLoading();
	        			});

	        	respSubeArchivo = function(data){
	        		if(data.codigo != 200){
	        			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        		}else{
	        			ARCHIVO_SUBIDO = true;
	        			dropzoneLayouts.destroy();
	        			$('#subeArchivo').hide();
	        			$('#contenedorUploader').hide();
	        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el layout sea validado por el area correspondiente.');
	        			$('#msjUploader').show();
	        			ARCHIVOS_MD.push(new Archivo(
	        					nombreArchivo,
	        					data.url,
	        					1,
	        					$('#nombreCompletoUsuario').val(),
	        					null,
	        					null));
	        			dibujaArchivos();
	        			if(ESTATUS_MD == ESTATUS_CORRECCION_LAYOUT){
	        				ESTATUS_FINALIZA_MD = 1;
	        				actionfinalizaMD();
	        			}
	        		}
	        	}
	        });
	}//Validacion Layout
	else if(AREA_USUARIO == areaOperaciones 
			&& ESTATUS_MD == ESTATUS_VALIDACION_LAYOUT){
		$('#manejadorArchivos').show();
		$('#subeArchivo').hide();
		$('#montoPresupuesto').hide();
		$('#contenedorUploader').hide();
		$('#divACC').hide();
		if (ARCHIVOS_MD.length > 0)
			$('#msjUploader').html('Deberás autorizar el layout.');
		else
			$('#msjUploader').html('Deberás esperar a que el layout sea cargado por el area correspondiente');
		
		$('#msjUploader').show();
		
		dibujaArchivos();
	}//PRESUPUESTO OBRA Construccion
	else if(AREA_USUARIO == areaConstruccion 
			&& (ESTATUS_MD == ESTATUS_PRESUPUESTO_CONSTRUCCION
					|| ESTATUS_MD == ESTATUS_CORRECCION_PRESUPUESTO_CONSTRUCCION)){
		$('#manejadorArchivos').show();
		$('#montoPresupuesto').show();
		$('#montoPresupuesto').attr('placeholder', 'Captura el monto total de presupuesto');
		$('#subeArchivo').show();
		
		dropzoneOptions = {
	            dictDefaultMessage: 'Arrastra aqui el detalle de presupuesto o da clic para buscarlo en tu equipo',
	            dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
	            dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
	            dictInvalidFileType: 'Archivo no permitido',
	            dictRemoveFile: 'Eliminar archivo', 
	            dictRemoveFileConfirmation: 'Archivo eliminado',
	            dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
	            paramName: "file",
	            autoProcessQueue: false,
	            uploadMultiple: false,
	            maxFilesize: 3, // MB
	            maxFiles: 1,
	            addRemoveLinks: true,
	            acceptedFiles: 'image/*,application/pdf,.psd,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	            accept: function(file, done){
	                reader = new FileReader();
	                reader.onload = handleReaderLoad;
	                reader.readAsDataURL(file);
	                
	                LAYOUT_B64 = '';
	                LAYOUT_Type = '';
	                
	                function handleReaderLoad(evt) {
	                	LAYOUT_B64 = evt.target.result;
	                	LAYOUT_Type = file.type;
	                	
	                	if(LAYOUT_Type.includes('sheet'))
	                		LAYOUT_Type = 'xlsx';
	                	
	                	$('#subeArchivo').show();
	                }
	                done();
	            }
	        };
		
	        uploader = document.querySelector('#uploader');
	        dropzoneLayouts = new Dropzone(uploader, dropzoneOptions);
	        ARCHIVO_SUBIDO = false;
	        
	        dibujaArchivos();
	        $('#subeArchivo').unbind('click');
	        $('#subeArchivo').click(function(){
	        	
	        	mdId = $("#mdId").val();
	        	nombreArchivo = 'PPTO-CO' + mdId; 
	        	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        	archivo = LAYOUT_B64;
	        	if(!LAYOUT_Type.includes('xlsx'))
	        		formato = LAYOUT_Type.split('/')[1];
	        	else
	        		formato = LAYOUT_Type;
	        	tipoArchivo = 4;
	        	tipoServicio = 2;
	        	monto = $('#montoPresupuesto').val();
	        	acc = (($('#checkACC').prop('checked')) ? 1 : 0);
	        	mensaje = '';
	        	
	        	if(monto == '')
	        		mensaje = 'Escribe el monto total presupuestado';
	        	if(LAYOUT_B64 == ''){
	        		if(mensaje == '')
	        			mensaje = 'Carga el archivo detalle del presupuesto';
	        		else
	        			mensaje = 'Carga el archivo detalle del presupuesto y escribe el monto total presupuestado';
	        	}
	        	
	        	if(mensaje == ''){
	        		cargaLoading();
		        	monto = parseFloat(monto).toFixed(2);
		        	$('#montoPresupuesto').val(monto);
		        	
		        	invocarJSONServiceAction("subeArchivo", 
		        			{'mdId': mdId,
		        			'nombreArchivo': nombreArchivo,
		        			'archivo': archivo,
		        			'formato': formato,
		        			'tipoArchivo': tipoArchivo,
		        			'tipoServicio' : tipoServicio,
		        			'fecha': fecha,
		        			'monto': monto,
		        			'acc' : acc}, 
		        			'respSubeArchivo', 
		        			function() {
		        				cierraLoading();
		        			},
		        			function() {
		        				cierraLoading();
		        			});

		        	respSubeArchivo = function(data){
		        		if(data.codigo != 200){
		        			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		        		}else{
		        			ARCHIVO_SUBIDO = true;
		        			dropzoneLayouts.destroy();
		        			$('#subeArchivo').hide();
		        			$('#contenedorUploader').hide();
		        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el presupuesto sea validado por el area correspondiente.');
		        			$('#msjUploader').show();
		        			ARCHIVOS_MD.push(new Archivo(
		        					nombreArchivo,
		        					data.url,
		        					1,
		        					$('#nombreCompletoUsuario').val(),
		        					monto,
		        					null));
		        			dibujaArchivos();
		        			ESTATUS_FINALIZA_MD = 1;
		        			actionfinalizaMD();
		        		}
		        	}
	        	}else
	        		cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        });
	}//PRESUPUESTO OBRA AUDITORIA
	else if(AREA_USUARIO == areaAuditoria 
			&& (ESTATUS_MD == ESTATUS_PRESUPUESTO_AUDITORIA || ESTATUS_MD == ESTATUS_CORRECCION_PRESUPUESTO_AUDITORIA)){
		$('#manejadorArchivos').show();
		$('#montoPresupuesto').show();
		$('#montoPresupuesto').attr('placeholder', 'Captura el monto total de presupuesto');
		$('#subeArchivo').show();
		
		dropzoneOptions = {
	            dictDefaultMessage: 'Arrastra aqui el detalle de presupuesto o da clic para buscarlo en tu equipo',
	            dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
	            dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
	            dictInvalidFileType: 'Archivo no permitido',
	            dictRemoveFile: 'Eliminar archivo', 
	            dictRemoveFileConfirmation: 'Archivo eliminado',
	            dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
	            paramName: "file",
	            autoProcessQueue: false,
	            uploadMultiple: false,
	            maxFilesize: 3, // MB
	            maxFiles: 1,
	            addRemoveLinks: true,
	            acceptedFiles: 'image/*,application/pdf,.psd,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	            accept: function(file, done){
	                reader = new FileReader();
	                reader.onload = handleReaderLoad;
	                reader.readAsDataURL(file);
	                
	                LAYOUT_B64 = '';
	                LAYOUT_Type = '';
	                
	                function handleReaderLoad(evt) {
	                	LAYOUT_B64 = evt.target.result;
	                	LAYOUT_Type = file.type;
	                	
	                	if(LAYOUT_Type.includes('sheet'))
	                		LAYOUT_Type = 'xlsx';
	                	
	                	$('#subeArchivo').show();
	                }
	                done();
	            }
	        };
		
	        uploader = document.querySelector('#uploader');
	        dropzoneLayouts = new Dropzone(uploader, dropzoneOptions);
	        ARCHIVO_SUBIDO = false;
	        
	        dibujaArchivos();
	        $('#subeArchivo').unbind('click');
	        $('#subeArchivo').click(function(){
	        	
	        	mdId = $("#mdId").val();
	        	nombreArchivo = 'PPTOAU' + mdId; 
	        	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        	archivo = LAYOUT_B64;
	        	if(!LAYOUT_Type.includes('xlsx'))
	        		formato = LAYOUT_Type.split('/')[1];
	        	else
	        		formato = LAYOUT_Type;
	        	tipoArchivo = 4;
	        	tipoServicio = 3;
	        	monto = $('#montoPresupuesto').val();
	        	acc = (($('#checkACC').prop('checked')) ? 1 : 0);
	        	
	        	mensaje = '';
	        	
	        	if(monto == '')
	        		mensaje = 'Escribe el monto total presupuestado';
	        	if(LAYOUT_B64 == ''){
	        		if(mensaje == '')
	        			mensaje = 'Carga el archivo detalle del presupuesto';
	        		else
	        			mensaje = 'Carga el archivo detalle del presupuesto y escribe el monto total presupuestado';
	        	}
	        	
	        	if(mensaje == ''){
	        		cargaLoading();
		        	monto = parseFloat(monto).toFixed(2);
		        	$('#montoPresupuesto').val(monto);
		        	
		        	invocarJSONServiceAction("subeArchivo", 
		        			{'mdId': mdId,
		        			'nombreArchivo': nombreArchivo,
		        			'archivo': archivo,
		        			'formato': formato,
		        			'tipoArchivo': tipoArchivo,
		        			'tipoServicio' : tipoServicio,
		        			'fecha': fecha,
		        			'monto': monto,
		        			'acc' : acc}, 
		        			'respSubeArchivo', 
		        			function() {
		        				cierraLoading();
		        			},
		        			function() {
		        				cierraLoading();
		        			});

		        	respSubeArchivo = function(data){
		        		if(data.codigo != 200){
		        			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		        		}else{
		        			ARCHIVO_SUBIDO = true;
		        			dropzoneLayouts.destroy();
		        			$('#subeArchivo').hide();
		        			$('#contenedorUploader').hide();
		        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el presupuesto sea validado por el area correspondiente.');
		        			$('#msjUploader').show();
		        			ARCHIVOS_MD.push(new Archivo(
		        					nombreArchivo,
		        					data.url,
		        					0,
		        					$('#nombreCompletoUsuario').val(),
		        					monto,
		        					null));
		        			dibujaArchivos();
		        			ESTATUS_FINALIZA_MD = 1;
		        			actionfinalizaMD();
		        		}
		        	}
	        	}else
	        		cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        });
	}else if(permiteComite()){ //COMITE
		$('#autoriza9').hide();
		$('#rechaza9').hide();
		if(AREA_USUARIO == areaOperaciones){
			$('#autoriza9').show();
			$('#rechaza9').show();
		}
		$('#voboMD').hide();
		strArchivos = '';
		$.each(ARCHIVOS_MD, function(i, item){
			clase = 'filePendiente';
			
			strArchivos = '<div class="fileMD ' + clase + '">'
								+ '<div class="datosFile" rel="' + i + '">'
									+ '<div class="nombreFile">' + item.nombre + '</div>'
									+ '<div class="autorFile">' 
										+ ((item.autor != undefined) ? item.autor : '--') + '/' 
										+ ((item.monto != undefined) ? item.monto : '--') 
										+ ((item.ACC != null && item.ACC != 0) ? '/ACC'  : '') + '</div>'
								+ '</div>'
								+ '<div class="actionsFile">'
										+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
								+ '</div>'
							+ '</div>' +strArchivos;
		});
		
		$('#containerFilesVoboFinal').html(strArchivos);
		$('#voboFinal').show();
		
		
	}else if(ESTATUS_MD == ESTATUS_CECO){ //CECO
		$('#autoriza9').hide();
		$('#rechaza9').hide();
		if(AREA_USUARIO == areaFinanzas){
			$('#tiendaIdCECO').show();
		}
		$('#voboMD').hide();
		strArchivos = '';
		$.each(ARCHIVOS_MD, function(i, item){
			clase = 'filePendiente';
			
			strArchivos = '<div class="fileMD ' + clase + '">'
								+ '<div class="datosFile" rel="' + i + '">'
									+ '<div class="nombreFile">' + item.nombre + '</div>'
									+ '<div class="autorFile">' 
										+ ((item.autor != undefined) ? item.autor : '--') + '/' 
										+ ((item.monto != undefined) ? item.monto : '--') 
										+ ((item.ACC != null && item.ACC != 0) ? '/ACC'  : '') + '</div>'
								+ '</div>'
								+ '<div class="actionsFile">'
										+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
								+ '</div>'
							+ '</div>' +strArchivos;
		});
		
		$('#containerFilesVoboFinal').html(strArchivos);
		$('#voboFinal').show();
		
		 $('#subeTiendaId').unbind('click');
	        $('#subeTiendaId').click(function(){
	        	tiendaId = $('#tiendaID').val();
	        	mensaje = '';
	        	
	        	if(tiendaId == '')
	        		mensaje = 'Escribe el CECO para la sucursal';
	        	
	        	if(mensaje == ''){
	        		cargaLoading();
	        		tipoServicio = 10;
	        		mdId = $("#mdId").val();
	        		fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        		
		        	invocarJSONServiceAction("subeArchivo", 
		        			{'mdId': mdId,
		        			'tipoServicio' : tipoServicio,
		        			'fecha': fecha,
		        			'tiendaId': tiendaId}, 
		        			'respCECO', 
		        			function() {
		        				cierraLoading();
		        			},
		        			function() {
		        				cierraLoading();
		        			});

		        	respCECO = function(data){
		        		if(data.codigo != 200){
		        			cargaMensajeModal('DETALLE MD', 'Ocurrio un error, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		        		}else{
		        			ESTATUS_FINALIZA_MD = 1;
		        			actionfinalizaMD();
		        		}
		        	}
	        	}else
	        		cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        });
	        
	}else if(ESTATUS_MD == ESTATUS_VOBO_FINAL){ // VoBo FINAL OPERACIONES
		$('#autoriza9').hide();
		$('#rechaza9').hide();
		if(AREA_USUARIO == areaOperaciones){
			$('#autoriza9').show();
			$('#rechaza9').show();
			$('#tiendaID').attr('placeholder', 'Venta presupuestada')
			$('#subeTiendaId').hide();
			$('#tiendaIdCECO').show();
		}
		$('#voboMD').hide();
		strArchivos = '';
		$.each(ARCHIVOS_MD, function(i, item){
			clase = 'filePendiente';
			
			strArchivos = '<div class="fileMD ' + clase + '">'
								+ '<div class="datosFile" rel="' + i + '">'
									+ '<div class="nombreFile">' + item.nombre + '</div>'
									+ '<div class="autorFile">' 
										+ ((item.autor != undefined) ? item.autor : '--') + '/' 
										+ ((item.monto != undefined) ? item.monto : '--') 
										+ ((item.ACC != null && item.ACC != 0) ? '/ACC'  : '') + '</div>'
								+ '</div>'
								+ '<div class="actionsFile">'
										+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
								+ '</div>'
							+ '</div>' +strArchivos;
		});
		
		$('#containerFilesVoboFinal').html(strArchivos);
		$('#voboFinal').show();
	}else if(AREA_USUARIO == areaGestoria && ESTATUS_MD == ESTATUS_CONTRATO){//Contrato
		$('#manejadorArchivos').show();
		$('#montoPresupuesto').show();
		$('#montoPresupuesto').attr('placeholder', 'Captura el monto total de presupuesto');
		$('#subeArchivo').show();
		$('#rechazaMD').show();
		
		$('#montoPresupuesto').hide();
		$('.simbolo').hide();
		$('#divACC').hide();
		
		dropzoneOptions = {
	            dictDefaultMessage: 'Arrastra aqui el contrato o da clic para buscarlo en tu equipo',
	            dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
	            dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
	            dictInvalidFileType: 'Archivo no permitido',
	            dictRemoveFile: 'Eliminar archivo', 
	            dictRemoveFileConfirmation: 'Archivo eliminado',
	            dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
	            paramName: "file",
	            autoProcessQueue: false,
	            uploadMultiple: false,
	            maxFilesize: 3, // MB
	            maxFiles: 1,
	            addRemoveLinks: true,
	            acceptedFiles: 'image/*,application/pdf,.psd',
	            accept: function(file, done){
	                reader = new FileReader();
	                reader.onload = handleReaderLoad;
	                reader.readAsDataURL(file);
	                
	                LAYOUT_B64 = '';
	                LAYOUT_Type = '';
	                
	                function handleReaderLoad(evt) {
	                	LAYOUT_B64 = evt.target.result;
	                	LAYOUT_Type = file.type;
	                	$('#subeArchivo').show();
	                }
	                done();
	            }
	        };
		
	        uploader = document.querySelector('#uploader');
	        dropzoneLayouts = new Dropzone(uploader, dropzoneOptions);
	        ARCHIVO_SUBIDO = false;
	        
	        dibujaArchivos();
	        $('#subeArchivo').unbind('click');
	        $('#subeArchivo').click(function(){
	        	
	        	mdId = $("#mdId").val();
	        	nombreArchivo = 'CTO' + mdId; 
	        	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        	archivo = LAYOUT_B64;
	        	formato = LAYOUT_Type.split('/')[1];
	        	tipoArchivo = 5;
	        	tipoServicio = 4;
	        	monto = '';
	        	acc = '';
	        	
	        	mensaje = '';
	        	
	        	if(LAYOUT_B64 == ''){
	        		mensaje = 'Carga el archivo del contrato';
	        	}
	        	
	        	if(mensaje == ''){
	        		cargaLoading();

		        	invocarJSONServiceAction("subeArchivo", 
		        			{'mdId': mdId,
		        			'nombreArchivo': nombreArchivo,
		        			'archivo': archivo,
		        			'formato': formato,
		        			'tipoArchivo': tipoArchivo,
		        			'tipoServicio' : tipoServicio,
		        			'fecha': fecha,
		        			'monto': monto,
		        			'acc' : acc}, 
		        			'respSubeArchivo', 
		        			function() {
		        				cierraLoading();
		        			},
		        			function() {
		        				cierraLoading();
		        			});

		        	respSubeArchivo = function(data){
		        		if(data.codigo != 200){
		        			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		        		}else{
		        			ARCHIVO_SUBIDO = true;
		        			dropzoneLayouts.destroy();
		        			$('#subeArchivo').hide();
		        			$('#contenedorUploader').hide();
		        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el presupuesto sea validado por el area correspondiente.');
		        			$('#msjUploader').show();
		        			ARCHIVOS_MD.push(new Archivo(
		        					nombreArchivo,
		        					data.url,
		        					0,
		        					$('#nombreCompletoUsuario').val(),
		        					monto,
		        					null));
		        			dibujaArchivos();
		        			ESTATUS_FINALIZA_MD = 1;
		        			actionfinalizaMD();
		        		}
		        	}
	        	}else
	        		cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        });
	}else if(ESTATUS_MD == ESTATUS_GESTORIA && AREA_USUARIO == areaGestoria){
		/*$('#manejadorArchivos').show();
		$('#subeArchivo').hide();
		
		$('#montoPresupuesto').hide();
		$('.simbolo').hide();
		$('#divACC').hide();
		
		FILES_B64 = new Array();
		FILES_Type = new Array();
		
		dropzoneOptions = {
	            dictDefaultMessage: 'Arrastra aqui los documentos',
	            dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
	            dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
	            dictInvalidFileType: 'Archivo no permitido',
	            dictRemoveFile: 'Eliminar archivo', 
	            dictRemoveFileConfirmation: 'Archivo eliminado',
	            dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
	            paramName: "file",
	            autoProcessQueue: false,
	            maxFilesize: 3, // MB
	            maxFiles: 5,
	            addRemoveLinks: true,
	            acceptedFiles: 'image/*,application/pdf,.psd',
	            accept: function(file, done){
	                reader = new FileReader();
	                reader.onload = handleReaderLoad;
	                reader.readAsDataURL(file);

	                function handleReaderLoad(evt) {
	                	FILES_B64.push(evt.target.result);
	                	FILES_Type.push(file.type);
	                	$('#subeArchivo').show();
	                }
	                done();
	            }
	        };
		
	        uploader = document.querySelector('#uploader');
	        dropzoneLayouts = new Dropzone(uploader, dropzoneOptions);
	        ARCHIVO_SUBIDO = false;
	        
	        dibujaArchivos();
	        $('#subeArchivo').unbind('click');
	        $('#subeArchivo').click(function(){
	        	
	        	mdId = $("#mdId").val();
	        	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        	tipoArchivo = 6;
	        	tipoServicio = 5;

	        	mensaje = '';
	        	
	        	if(FILES_B64.length == 0){
	        		mensaje = 'Carga los archivos';
	        	}
	        	
	        	if(mensaje == ''){
	        		cargaLoading();

		        	invocarJSONServiceAction("subeArchivosGestoria", 
		        			{'mdId': mdId,
		        			'archivos': JSON.stringify(FILES_B64),
		        			'formatos': JSON.stringify(FILES_Type),
		        			'tipoArchivo': tipoArchivo,
		        			'tipoServicio' : tipoServicio,
		        			'fecha': fecha}, 
		        			'respSubeArchivo', 
		        			function() {
		        				cierraLoading();
		        			},
		        			function() {
		        				cierraLoading();
		        			});

		        	respSubeArchivo = function(data){
		        		if(data.codigo != 200){
		        			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		        		}else{
		        			ARCHIVO_SUBIDO = true;
		        			dropzoneLayouts.destroy();
		        			$('#subeArchivo').hide();
		        			$('#contenedorUploader').hide();
		        			$('#msjUploader').html('¡Felicidades! Los archivo fue cargado con exito. Deberás esperar a que el presupuesto sea validado por el area correspondiente.');
		        			$('#msjUploader').show();
		        			
		        			dibujaArchivos();
		        			ESTATUS_FINALIZA_MD = 1;
		        			actionfinalizaMD();
		        		}
		        	}
	        	}else
	        		cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        });*/
		
		$('#autoriza9').hide();
		$('#rechaza9').hide();
		if(AREA_USUARIO == areaGestoria){
			$('#autoriza9').show();
			$('#rechaza9').show();
		}
		$('#voboMD').hide();
		strArchivos = '';
		$.each(ARCHIVOS_MD, function(i, item){
			clase = 'filePendiente';
			
			strArchivos = '<div class="fileMD ' + clase + '">'
								+ '<div class="datosFile" rel="' + i + '">'
									+ '<div class="nombreFile">' + item.nombre + '</div>'
									+ '<div class="autorFile">' 
										+ ((item.autor != undefined) ? item.autor : '--') + '/' 
										+ ((item.monto != undefined) ? item.monto : '--') 
										+ ((item.ACC != null && item.ACC != 0) ? '/ACC'  : '') + '</div>'
								+ '</div>'
								+ '<div class="actionsFile">'
										+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
								+ '</div>'
							+ '</div>' +strArchivos;
		});
		
		$('#containerFilesVoboFinal').html(strArchivos);
		$('#voboFinal').show();
	}else if(ESTATUS_MD == ESTATUS_OBRA){
		$('#autoriza9').hide();
		$('#rechaza9').hide();
		if(AREA_USUARIO != areaConstruccion){
			
			$('#voboMD').hide();
			strArchivos = '';
			$.each(ARCHIVOS_MD, function(i, item){
				clase = 'filePendiente';
				
				strArchivos = '<div class="fileMD ' + clase + '">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + item.nombre + '</div>'
										+ '<div class="autorFile">' 
											+ ((item.autor != undefined) ? item.autor : '--') + '/' 
											+ ((item.monto != undefined) ? item.monto : '--') 
											+ ((item.ACC != null && item.ACC != 0) ? '/ACC'  : '') + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
									+ '</div>'
								+ '</div>' +strArchivos;
			});
			
			$('#containerFilesVoboFinal').html(strArchivos);
			$('#voboFinal').show();
		}else{
			$('#containerFilesVoboFinal').hide();
			
			$('#voboFinal').show();
			$('#containerFechasObra').show();
			
			inicializaCalendarioObra();
			
			$('#subeObra').unbind('click');
			$('#subeObra').click(function(){
				inicio = $("#inicioObra").val();
				duracion = parseInt($('#duracionObra option:selected').val());
				
				if(duracion == 0)
					cargaMensajeModal('DETALLE MD', 'Selecciona la duración de obra', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
				else{
	        		cargaLoading();

	        		mdId = $("#mdId").val();
		        	tipoServicio = 6;
		        	
		        	invocarJSONServiceAction("subeObra", 
		        			{'mdId': mdId,
		        			'tipoServicio' : tipoServicio,
		        			'inicio': inicio,
		        			'duracion' : duracion}, 
		        			'respSubeObra', 
		        			function() {
		        				cierraLoading();
		        			},
		        			function() {
		        				cierraLoading();
		        			});

		        	respSubeObra = function(data){
		        		if(data.codigo != 200){
		        			cargaMensajeModal('DETALLE MD', 'No se logro guardar la información, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		        		}else{
		        			dibujaArchivos();
		        			ESTATUS_FINALIZA_MD = 1;
		        			actionfinalizaMD();
		        		}
		        	}
				}
			})
		}
	}else{
		$('#autoriza9').hide();
		$('#rechaza9').hide();

		$('#containerFilesVoboFinal').parent().parent().hide();
		if(!AREAS_A[AREA_USUARIO]){
			$('#voboMD').show();
			$('#voboFinal').show();
		}else{

			$('#containerFilesVoboFinal').parent().parent().show();
			strArchivos = '';
			$.each(ARCHIVOS_MD, function(i, item){
				clase = 'filePendiente';
				
				strArchivos = '<div class="fileMD ' + clase + '">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + item.nombre + '</div>'
										+ '<div class="autorFile">' 
											+ ((item.autor != undefined) ? item.autor : '--') + '/' 
											+ ((item.monto != undefined) ? item.monto : '--') 
											+ ((item.ACC != null && item.ACC != 0) ? '/ACC'  : '') + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
									+ '</div>'
								+ '</div>' +strArchivos;
			});
			
			$('#containerFilesVoboFinal').html(strArchivos);
			
			$('#voboFinal').show();
		}
		
	}
}

function guardaConteoAuditor(total){
	cargaLoading();
	
	
	var date = new Date();
	fecha = date.format("dd/mm/yyyy");
	
	invocarJSONServiceAction("guardaConteoAuditor", 
			{'mdId': $("#mdIdAutorizacion").val(),
			 'horaI':HORAI,
			 'horaF':HORAF,
			 'fecha': fecha,
			 'total' : total
			 }, 
			'responseGuardarConteo', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});
	
	responseGuardarConteo =  function(data){
		if(data.codigo != 200) {
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			$('totalConteoAuditor').val('');
		}else{
			//$('#preConteos').hide();
			$('#promedioConteosAuditoria').html(total);
			//$('#posConteos').show();
			$("#totalConteoAuditor").val('');
			CONTEO_GUARDADO = true;
		}
	}
}

function descargaArchivo(i){
	window.open(ARCHIVOS_MD[i].url);
}


function dibujaArchivos(){
	$('.filesMD').html('');
	if(ARCHIVOS_MD.length == 0){
		$('.filesMD').html('<div class="msjFiles">La MD no cuenta con archivos</div>');
	}else{
		strArchivos = '';
		if(AREA_USUARIO == areaConstruccion){
			$.each(ARCHIVOS_MD, function(i, item){
				if(item.estatus == 2){
					clase = 'filePendiente';
					if(ESTATUS_MD != ESTATUS_CORRECCION_LAYOUT 
							&& ESTATUS_MD != ESTATUS_CORRECCION_PRESUPUESTO_CONSTRUCCION
							&& ESTATUS_MD != ESTATUS_PRESUPUESTO_CONSTRUCCION){
						ARCHIVO_SUBIDO = true;
						$('#subeArchivo').hide();
	        			$('#contenedorUploader').hide();
	        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el presupuesto sea validado por el area correspondiente.');
	        			$('#msjUploader').show();
					}
				}else if(item.estatus == 1)
					clase = 'fileAutorizado';
				else if(item.estatus == 0)
					clase = 'fileRechazado';
				else
					clase = 'filePendiente';
				
				strArchivos = '<div class="fileMD ' + clase + '">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + item.nombre + '</div>'
										+ '<div class="autorFile">' + ((item.autor != undefined) ? item.autor : '--') + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
									+ '</div>'
								+ '</div>' +strArchivos;
			});
		}else if(AREA_USUARIO == areaOperaciones){
			$.each(ARCHIVOS_MD, function(i, item){
				strAcciones = '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;';
				if(item.estatus == 2){
					clase = 'filePendiente';
					strAcciones = '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
						+ '<span> <img title="Autorizar layout" class="sin_autorizar" onclick="autorizaArchivo(1, ' + i + ', this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;'
						+ '<span> <img title="Rechazar layout" class="sin_autorizar" onclick="autorizaArchivo(0, ' + i + ', this);" style="cursor: pointer;" src="img/rechaza_mark.png">&nbsp;';
				}else if(item.estatus == 1)
					clase = 'fileAutorizado';
				else if(item.estatus == 0)
					clase = 'fileRechazado';
				else
					clase = 'filePendiente';
				
				strArchivos = '<div class="fileMD ' + clase + '">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + item.nombre + '</div>'
										+ '<div class="autorFile">' + ((item.autor != undefined) ? item.autor : '--') + '/' + ((item.monto != undefined) ? item.monto : '--') + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ strAcciones
									+ '</div>'
								+ '</div>' +strArchivos;
			});
		}else if(AREA_USUARIO == areaAuditoria || AREA_USUARIO == areaGestoria){
			$.each(ARCHIVOS_MD, function(i, item){
				strAcciones = '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;';
				clase = 'filePendiente';
				
				strArchivos = '<div class="fileMD ' + clase + '">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + item.nombre + '</div>'
										+ '<div class="autorFile">' + ((item.autor != undefined) ? item.autor : '--') + '/' + ((item.monto != undefined) ? item.monto : '--') + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ strAcciones
									+ '</div>'
								+ '</div>' +strArchivos;
			});
		}
		
		
		$('.filesMD').html(strArchivos);
		
	}
} 

function isNumberKey(evt, obj) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function autorizaArchivo(autoriza, id, btn){
	if($(btn).hasClass('sin_autorizar')){
		$('.commentsByFile').hide();
		
		if(autoriza == 0){
			obtieneMotivosGenerales('motivoRechazoLayout');
			$('.tituloComment').html('Selecciona un motivo de rechazo y escribe un comentario');
			$('#commentFile').val('');
		}else{
			$('.tituloComment').html('¿Deseas comentar algo acerca del layout?');
			$('#motivoRechazoLayout').hide();
			$('#commentFile').val('');
		}
		
		NOMBRE_ARCHIVO = $(btn).parent().parent().parent().parent().parent().find('.nombrefile').html()
		
		$('.commentFileContainer').show();
		
		$('#submitComment').unbind('click');
		$('#submitComment').click(function(){
			comentario = $('#commentFile').val();
			ESTATUS_FINALIZA_MD = autoriza;
			if(autoriza == 0){
				motivo = $('#motivoRechazoLyt option:selected').val();
				mensaje = '';
				
				if(comentario == '')
					mensaje += 'Porfavor escriba el motivo de rechazo';
				if(motivo == 0){
					if(mensaje == '')
						mensaje += 'Por favor selecciona el motivo de rechazo';
					else
						mensaje = 'Porfavor escriba el mensaje y seleccione el motivo de rechazo';
				}
				
				if(mensaje == '')
					actionfinalizaMD(motivo, comentario + '|' + NOMBRE_ARCHIVO);
				else
					cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
			}else{
				motivo = 0;
				actionfinalizaMD(motivo, comentario);
			}
		});
	}
}

function obtieneMotivosGenerales(combo){
	
	invocarJSONServiceAction("motivosRechazo", 
			{'modulo': 0,
			'tipoModulo': 1}, 
			'setMotivosGenerales', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});

	setMotivosGenerales = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		}else{
			if(data.motivos != undefined){
				strCombo = '<select id="motivoRechazoLyt" class="motivoRechazo" style="background-color: white;">' + 
				'<option value="0" disabled>SELECCIONA EL MOTIVO DE RECHAZO</option>';
				
				$.each(data.motivos, function(){
					strCombo += '<option ' + ((this.isDefinitivo) ? 'style="color: red"' : '') + ' value="' + this.motivoId + '">' + this.descripcion + '</option>' 
				});
	
				strCombo += '</select>';
	
				$("#" + combo).html(strCombo);
				$('#motivoRechazoLyt').val(0);
			}
		}
	}
}

Archivo = function(
		nombre,
		url,
		estatus,
		autor,
		monto, 
		acc){
	this.nombre = nombre;
	this.url = url;
	this.estatus = estatus;
	this.autor = autor;
	this.monto = monto;
	this.acc = acc;
};

Permiso = function(
		bloqueaSeguimiento,
		estatus,
		modulo,
		submodulo,
		permiteEditar,
		permiteComentar,
		permiteRechazar,
		permiteAutorizar){
	
	this.bloqueaSeguimiento = bloqueaSeguimiento;
	this.estatu = estatus;
	this.modulo = modulo;
	this.submodulo = submodulo;
	this.permiteEditar = permiteEditar;
	this.permiteComentar = permiteComentar;
	this.permiteRechazar = permiteRechazar;
	this.permiteAutorizar = permiteAutorizar;
}

FactorAutorizacion = function(id, nombre, atendido){
	this.id = id;
	this.nombre = nombre;
	this.atendido = atendido;
	
	this.motivoRechazoDefinitivo = false;
	this.motivo = -1;
};

MotivoRechazo = function(id, nombre, isDefinitivo){
	this.id = id;
	this.nombre = nombre;
	this.isDefinitivo = isDefinitivo;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Object.size = function(obj) {
    var size = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function formatear(cnt, cents) {
	cnt = cnt.toString().replace(/\$|\u20AC|\,/g,'');
	if (isNaN(cnt))
		return 0;	
	var sgn = (cnt == (cnt = Math.abs(cnt)));
	cnt = Math.floor(cnt * 100 + 0.5);
	cvs = cnt % 100;
	cnt = Math.floor(cnt / 100).toString();
	if (cvs < 10)
	cvs = '0' + cvs;
	for (var i = 0; i < Math.floor((cnt.length - (1 + i)) / 3); i++)
		cnt = cnt.substring(0, cnt.length - (4 * i + 3)) + ',' 
                        + cnt.substring(cnt.length - (4 * i + 3));

	return (((sgn) ? '' : '-') + cnt) + ( cents ?  '.' + cvs : '');
}
