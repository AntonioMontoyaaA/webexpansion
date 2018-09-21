var AUTORIZA_MODULO			= 1;
var RECHAZA_MODULO			= 0;

var MOTIVOS_RECHAZO = {};
var ESTATUS_FINALIZA_MD = -1;

Dropzone.autoDiscover = false;
var uploader;
var dropzone;
var dropzoneOptions = {
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
        addRemoveLinks: true,
        removedfile: function(file) {
        	FILE_B64 = '';
        	FILE_Type = '';
        	ACCION_REALIZADA = false;
        	var _ref;
        	  
        	return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
        }
    };

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

var HORAI;
var HORAF;

var USUARIO;

var flujoAutorizaciones;

//Tipos de RECHAZO
var sinRechazo = 0;
var rechazoParcial = 1;
var rechazoDefinitivo = 2;
var todosRechazos = 3;

//Tipos de Archivos
var sinArchivos = 0;
var segundoConteo = 1;
var layout = 2;
var presupuesto = 3;
var venta = 4;
var comite = 5;
var contrato = 6;
var ceco = 7;
var inicioObra = 8;
var predial = 9;
var doctosContrato = 10;

var ACCION_REALIZADA;
var FILE_B64 = '';
var FILE_Type = '';
var strArchivos;
var strCabeceros;

var prefijo = ''; 
var tipoArchivo = ''; 
var tipoServicio = ''; 
var monto = ''; 
var acc = ''; 

$(function(){
	
	AREA_USUARIO = parseInt($('#areaUsuario').val());
	PUESTO = parseInt($('#puestoUsuario').val());
	USUARIO = parseInt($('#usuarioId').val());

	inicializaFlujoAutorizaciones();
	MOTIVOS_RECHAZO = {};
	
	funcionesAutorizacion();
	
});

function inicializaFlujoAutorizaciones(){
	flujoAutorizaciones = {};
	flujoAutorizaciones[3] = new Estatus(3, 'Validacion Expansion');
	flujoAutorizaciones[8] = new Estatus(8, 'Validacion Expansion y VoBo Inicial Operaciones');
	flujoAutorizaciones[5] = new Estatus(5, 'Validacion Gestoria y Segundo conteo Auditoria');
	flujoAutorizaciones[7] = new Estatus(7, 'Validacion Gestoria y Segundo conteo Auditoria');
	flujoAutorizaciones[6] = new Estatus(6, 'Carga de layout');
	flujoAutorizaciones[9] = new Estatus(9, 'Validacion de layout');
	flujoAutorizaciones[10] = new Estatus(10, 'Presupuesto Construccion');
	flujoAutorizaciones[11] = new Estatus(11, 'Presupuesto Auditoria');
	flujoAutorizaciones[12] = new Estatus(12, 'Vobo final Operaciones');
	flujoAutorizaciones[22] = new Estatus(22, 'Comite');
	flujoAutorizaciones[23] = new Estatus(23, 'Comite');
	flujoAutorizaciones[18] = new Estatus(18, 'Correccion de layout');
	flujoAutorizaciones[19] = new Estatus(19, 'Correccion de presupuesto Construccion');
	flujoAutorizaciones[13] = new Estatus(13, 'Contrato firmado');
	flujoAutorizaciones[24] = new Estatus(24, 'CECO finanzas');
	flujoAutorizaciones[14] = new Estatus(14, 'Gestoria');
	flujoAutorizaciones[15] = new Estatus(15, 'Inicio de obra');
	
	flujoAutorizaciones[3].agregaArea(areaExpansion, new Area(areaExpansion, todosRechazos, sinArchivos));
	
	flujoAutorizaciones[8].agregaArea(areaExpansion, new Area(areaExpansion, todosRechazos, sinArchivos));
	flujoAutorizaciones[8].agregaArea(areaOperaciones, new Area(areaOperaciones, todosRechazos, sinArchivos));
	
	flujoAutorizaciones[5].agregaArea(areaGestoria, new Area(areaGestoria, rechazoDefinitivo, sinArchivos));
	flujoAutorizaciones[5].agregaArea(areaAuditoria, new Area(areaAuditoria, rechazoParcial, segundoConteo));
	
	flujoAutorizaciones[7].agregaArea(areaGestoria, new Area(areaGestoria, rechazoDefinitivo, sinArchivos));
	flujoAutorizaciones[7].agregaArea(areaAuditoria, new Area(areaAuditoria, rechazoParcial, segundoConteo));
	
	flujoAutorizaciones[6].agregaArea(areaConstruccion, new Area(areaConstruccion, sinRechazo, layout));
	flujoAutorizaciones[18].agregaArea(areaConstruccion, new Area(areaConstruccion, sinRechazo, layout));
	
	flujoAutorizaciones[9].agregaArea(areaOperaciones, new Area(areaOperaciones, todosRechazos, sinArchivos));
	
	flujoAutorizaciones[10].agregaArea(areaConstruccion, new Area(areaConstruccion, sinRechazo, presupuesto));
	flujoAutorizaciones[19].agregaArea(areaConstruccion, new Area(areaConstruccion, sinRechazo, presupuesto));
	
	flujoAutorizaciones[11].agregaArea(areaAuditoria, new Area(areaAuditoria, rechazoParcial, presupuesto));
	
	flujoAutorizaciones[12].agregaArea(areaOperaciones, new Area(areaOperaciones, todosRechazos, venta));
	
	flujoAutorizaciones[22].agregaArea(areaOperaciones, new Area(areaOperaciones, todosRechazos, comite));
	flujoAutorizaciones[23].agregaArea(areaOperaciones, new Area(areaOperaciones, todosRechazos, comite));
	
	flujoAutorizaciones[13].agregaArea(areaGestoria, new Area(areaGestoria, todosRechazos, contrato));
	
	flujoAutorizaciones[24].agregaArea(areaFinanzas, new Area(areaFinanzas, sinRechazo, ceco));
	
	flujoAutorizaciones[14].agregaArea(areaGestoria, new Area(areaGestoria, rechazoDefinitivo, sinArchivos));
	
	flujoAutorizaciones[15].agregaArea(areaConstruccion, new Area(areaConstruccion, sinRechazo, inicioObra));
}

function finalizacionMDAutorizada(){
	if(flujoAutorizaciones[ESTATUS_MD] != undefined && flujoAutorizaciones[ESTATUS_MD].area[AREA_USUARIO] != undefined){
		
		area = flujoAutorizaciones[ESTATUS_MD].area[AREA_USUARIO];
		
		if(area.tipoArchivo == sinArchivos || area.tipoArchivo == comite){ //Autorizacion simple
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de autorizar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
		}else if(area.tipoArchivo == segundoConteo){ //Segundo conteo
			if(ACCION_REALIZADA)
				cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de autorizar la MD?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
			else
				cargaMensajeModal('DETALLE MD', 
						'Agrega el promedio peatonal',
						TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
		}else if(area.tipoArchivo == layout){ // layout
			
			if(ACCION_REALIZADA)
				cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de finalizar?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, finalizaConCargaPrevia);
			else
				cargaMensajeModal('DETALLE MD', 
						'Agrega el archivo de layout',
						TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
		}else if (area.tipoArchivo == presupuesto) {//presupuestos
			if(!ACCION_REALIZADA)
				cargaMensajeModal('DETALLE MD', 
						'Agrega el archivo de presupuesto',
						TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
			else{
				acc = $('input[type=radio]:checked').val();
				monto = $('#montoPresupuesto').val();
				
				if(acc == undefined){
					cargaMensajeModal('DETALLE MD', 
							'¿El sitio contará con aire acondicionado?',
							TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
					return;
				}
				if(monto == ''){
					cargaMensajeModal('DETALLE MD', 
							'Captura el monto total presupuestado',
							TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
					return;
				}
					
				tipoArchivo = 4;
				if(AREA_USUARIO == areaConstruccion){
					tipoServicio = 2;
					prefijo = 'PPTO-CO';
				}else if(AREA_USUARIO == areaAuditoria){
					tipoServicio = 3;
					prefijo = 'PPTO-AU';
				}
					
		        cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de finalizar?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, finalizaConCargaPrevia);
				
				
			}
		}else if(area.tipoArchivo == venta){ //Venta
			monto = $('#montoVenta').val();
			
			if(monto == ''){
				cargaMensajeModal('DETALLE MD', 
						'Captura el monto de venta semanal presupuestada',
						TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
				return;
			}else{
				tipoServicio = 11;
					
		        cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de finalizar?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, finalizaConCargaPrevia);
			}
				
			
		}else if(area.tipoArchivo == contrato){ //Contrato
			if(ACCION_REALIZADA)
				cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de finalizar?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, finalizaConCargaPrevia);
			else
				cargaMensajeModal('DETALLE MD', 
						'Agrega el archivo del contrato',
						TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
		}else if(area.tipoArchivo == ceco){ //CECO
			monto = $('#idCeco').val();
			
			if(monto == ''){
				cargaMensajeModal('DETALLE MD', 
						'Captura el numero de centro de costos',
						TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
				return;
			}else{
				tipoServicio = 10;
					
		        cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de finalizar?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, finalizaConCargaPrevia);
			}
		}else if(area.tipoArchivo == inicioObra){
			monto = $("#inicioObra").val();
			acc = parseInt($('#duracionObra option:selected').val());
			
			if(acc == 0){
				cargaMensajeModal('DETALLE MD', 
						'Selecciona la duración de la obra que iniciará el ' + monto,
						TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
				return;
			}
			
			tipoServicio = 6;
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de finalizar?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, finalizaConCargaPrevia);
		}
	}
}

function validaAutorizacion(){
	if(flujoAutorizaciones[ESTATUS_MD] != undefined && flujoAutorizaciones[ESTATUS_MD].area[AREA_USUARIO] != undefined){//Corresponde autorizacion al area del usuario en el estatus actual
		
		area = flujoAutorizaciones[ESTATUS_MD].area[AREA_USUARIO];
		
		if(area.tipoArchivo == sinArchivos){//Autorizacion simple
			generaAutorizacionSimple(area);
		}else if(area.tipoArchivo == comite){//Autorizacion comite
			if(PUESTO == DIR_OPE)
				generaAutorizacionSimple(area);
		}else if(area.tipoArchivo == segundoConteo){//Segundo conteo
			$('#preConteos').show();
			ACCION_REALIZADA =  false;
			generaAutorizacionSimple(area);
		
		}else if(area.tipoArchivo == layout){// Layout
			$('#msjFinalizacion').html('¿Finalizar MD?');
			generaAutorizacionSimple(area);
			
			$('#tipoArchivos').html('<div class="selecciona">No hay carpetas generadas</div>');
			
			$('#archivos').removeClass('col-lg-10');
			$('#archivos').addClass('col-lg-7');
			$('#archivos').html('<div class="selecciona">...</div>');
			
			$('#subida').show();
			
			dropzoneOptions.maxFilesize = 3;
			dropzoneOptions.maxFiles = 1;
			dropzoneOptions.acceptedFiles = 'image/*,application/pdf,.psd';
			dropzoneOptions.accept = function(file, done){
						                reader = new FileReader();
						                reader.onload = handleReaderLoad;
						                reader.readAsDataURL(file);
						                
						                FILE_B64 = '';
						                FILE_Type = '';
						                
						                function handleReaderLoad(evt) {
						                	FILE_B64 = evt.target.result;
						                	FILE_Type = file.type;
						                	
						                	ACCION_REALIZADA = true;
						                }
						                done();
						            };

	        uploader = document.querySelector('#uploader');
			dropzone = new Dropzone(uploader, dropzoneOptions);
			
			tipoArchivo = 2;
        	tipoServicio = 1;
        	prefijo = 'LYT';
        	
			$('#manejadorArchivos').show();
		}else if(area.tipoArchivo == presupuesto){// Presupuestos
			
			if(AREA_USUARIO == areaConstruccion)
				$('#msjFinalizacion').html('¿Finalizar MD?');
				
			generaAutorizacionPresupuesto(area);
			
			$('#archivos').removeClass('col-lg-10');
			$('#archivos').addClass('col-lg-7');
			
			$('#subida').show();
			
			dropzoneOptions.maxFilesize = 3;
			dropzoneOptions.maxFiles = 1;
			dropzoneOptions.acceptedFiles = 'image/*,application/pdf,.psd,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
			dropzoneOptions.accept = function(file, done){
						                reader = new FileReader();
						                reader.onload = handleReaderLoad;
						                reader.readAsDataURL(file);
						                
						                FILE_B64 = '';
						                FILE_Type = '';
						                
						                function handleReaderLoad(evt) {
						                	FILE_B64 = evt.target.result;
						                	FILE_Type = file.type;
						                	
						                	ACCION_REALIZADA = true;
						                }
						                done();
						            };

	        uploader = document.querySelector('#uploader');
			dropzone = new Dropzone(uploader, dropzoneOptions);

			$('#manejadorArchivos').show();
			
		}else if(area.tipoArchivo == venta){ //Venta
			
			generaAutorizacionVenta(area);
		}else if(area.tipoArchivo == contrato){ //Contrato
			generaAutorizacionSimple(area);
			
			$('#tipoArchivos').html('<div class="selecciona">No hay carpetas generadas</div>');
			
			$('#archivos').removeClass('col-lg-10');
			$('#archivos').addClass('col-lg-7');
			$('#archivos').html('<div class="selecciona">...</div>');
			
			$('#subida').show();
			
			dropzoneOptions.maxFilesize = 3;
			dropzoneOptions.maxFiles = 1;
			dropzoneOptions.acceptedFiles = 'image/*,application/pdf,.psd';
			dropzoneOptions.accept = function(file, done){
						                reader = new FileReader();
						                reader.onload = handleReaderLoad;
						                reader.readAsDataURL(file);
						                
						                FILE_B64 = '';
						                FILE_Type = '';
						                
						                function handleReaderLoad(evt) {
						                	FILE_B64 = evt.target.result;
						                	FILE_Type = file.type;
						                	
						                	ACCION_REALIZADA = true;
						                }
						                done();
						            };

	        uploader = document.querySelector('#uploader');
			dropzone = new Dropzone(uploader, dropzoneOptions);
			
			tipoArchivo = 5;
        	tipoServicio = 4;
        	prefijo = 'CTO';
        	
			$('#manejadorArchivos').show();
		}else if(area.tipoArchivo == ceco){ //CECO
			generaAutorizacionCeco(area);
		}else if(area.tipoArchivo == inicioObra){
			generaAutorizacionObra(area);
		}
	}
	
	dibujaArchivos();
}

function generaAutorizacionObra(area){
	if(area.tipoRechazo == sinRechazo)
		$('#rechazaMD').hide();
		
	$('#msjFinalizacion').html('¿Finalizar MD?');
	$('#obra').show();
	$('#divAutorizacion').show();
	
	inicializaCalendarioObra();
}

function generaAutorizacionCeco(area){
	if(area.tipoRechazo == sinRechazo)
		$('#rechazaMD').hide();
		
	$('#msjFinalizacion').html('¿Finalizar MD?');
	$('#ceco').show();
	$('#divAutorizacion').show();
}

function generaAutorizacionVenta(area){
	if(area.tipoRechazo == sinRechazo)
		$('#rechazaMD').hide();
		
	$('#venta').show();
	$('#divAutorizacion').show();
}

function generaAutorizacionPresupuesto(area){
	if(area.tipoRechazo == sinRechazo)
		$('#rechazaMD').hide();
		
	$('#presupuesto').show();
	$('#divAutorizacion').show();
}

function generaAutorizacionSimple(area){
	if(area.tipoRechazo == sinRechazo)
		$('#rechazaMD').hide();
		
	$('#divAutorizacion').show();
}

Estatus = function(id, nombre){
	this.id = id;
	this.nombre = nombre;
	this.area = {};
	
	this.agregaArea = function(id, a){
		this.area[id] = a;
	};
};

Area = function(id, tipoRechazo, tipoArchivo){
	this.id = id;
	this.tipoRechazo = tipoRechazo;
	/*
	 * 0: sin rechazo, 
	 * 1: solo rechazo parcial, 
	 * 2: solo rechazo definitivo, 
	 * 3: todos lo rechazos
	 */
	this.tipoArchivo = tipoArchivo;
	/*
	 * 0: sin archivos, 
	 * 1: segundo conteo, 
	 * 2: layout, 
	 * 3: presupuesto, 
	 * 4: venta, 
	 * 5: comite, 
	 * 6: contrato, 
	 * 7: ceco
	 * 8: inicio obra
	 */

};

function obtieneMotivosGenerales(){
	
	invocarJSONServiceAction("motivosRechazo", 
			{'modulo': 0,
			'tipoModulo': 1,
			'estatus' : ESTATUS_MD}, 
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
				strCombo = '<select id="motivoRechazo" class="motivoRechazo" style="background-color: white;">' + 
				'<option value="0" disabled>SELECCIONA EL MOTIVO DE RECHAZO</option>';
				
				tRechazo = flujoAutorizaciones[ESTATUS_MD].area[AREA_USUARIO].tipoRechazo;
				
				$.each(data.motivos, function(){
					if(tRechazo == rechazoParcial){// Solo rechazos parciales
						if(!this.rechazoDefinitvo)
							strCombo += '<option ' + ((this.rechazoDefinitvo) ? 'style="color: red"' : '') + ' value="' + this.motivoId + '">' + capitalizeFirstLetter(this.descripcion) + '</option>'; 
					}else if(tRechazo == rechazoDefinitivo){//Solo rechazos definitivos
						if(this.rechazoDefinitvo)
							strCombo += '<option ' + ((this.rechazoDefinitvo) ? 'style="color: red"' : '') + ' value="' + this.motivoId + '">' + capitalizeFirstLetter(this.descripcion) + '</option>';
					}else
						strCombo += '<option ' + ((this.rechazoDefinitvo) ? 'style="color: red"' : '') + ' value="' + this.motivoId + '">' + capitalizeFirstLetter(this.descripcion) + '</option>' ;
				});
	
				strCombo += '</select>';
	
				$("#comboMotivos").html(strCombo);
				
				$("#tituloModalAutorizacion").text("¿Estás seguro de rechazar la MD?");
				$("#tipoAutorizacion").val(RECHAZA_MODULO);
				$("#finaliza").val(0);
				$("#moduloId").val(0);
				$("#mdIdAutorizacion").val($("#mdId").val());
				$("#comboMotivos").show();
				$("#motivoRechazo").val(0);
				$('#detalleMensajeModal textarea').val('');
				$("#modal_autorizacion").modal("show");
				
			}
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

function finalizaConCargaPrevia(){
	cargaLoading();
	
	mdId = $("#mdId").val();
	nombreArchivo = prefijo + mdId; 
	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	
	if(!FILE_Type.includes('xlsx'))
		formato = FILE_Type.split('/')[1];
	else
		formato = FILE_Type;
	if(tipoServicio == 10){//CECO
    	invocarJSONServiceAction("subeArchivo", 
				{'mdId': mdId,
				'tipoServicio' : tipoServicio,
				'fecha': fecha,
				'tiendaId': monto}, 
				'respSubeArchivo', 
				function() {
					cierraLoading();
				},
				function() {
					cierraLoading();
				});
	}else if(tipoServicio == 6){//Iniccio de obra
		invocarJSONServiceAction("subeObra", 
    			{'mdId': mdId,
    			'tipoServicio' : tipoServicio,
    			'inicio': monto,
    			'duracion' : acc}, 
    			'respSubeArchivo', 
    			function() {
    				cierraLoading();
    			},
    			function() {
    				cierraLoading();
    			});
	}else{
		invocarJSONServiceAction("subeArchivo", 
				{'mdId': mdId,
				'nombreArchivo': nombreArchivo,
				'archivo': FILE_B64,
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
	}
	
	
	respSubeArchivo = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		}else{
			if(dropzone != undefined)
				dropzone.destroy();
			
			ESTATUS_FINALIZA_MD = 1;
			actionfinalizaMD();
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
	$('#btnModalAutorizacion').unbind('click');
	$("#btnModalAutorizacion").click(function() {
		$("#modal_autorizacion").modal("hide");
		var motivoSeleccionado = 0;
		if($("#tipoAutorizacion").val() == AUTORIZA_MODULO){
			if($('#detalleMensajeModal textarea').val() == '')
				$('#detalleMensajeModal textarea').val(' ');
			motivoSeleccionado = 0;
			actionfinalizaMD();
		}else if($("#tipoAutorizacion").val() == RECHAZA_MODULO){
			mensaje = '';
			
			if($('#detalleMensajeModal textarea').val() == '')
				mensaje += 'Porfavor escriba el motivo de rechazo';
			else
				comentario = $('#detalleMensajeModal textarea').val();
				
			if($('#motivoRechazo option:selected').val() == 0){
				if(mensaje == '')
					mensaje += 'Por favor selecciona el motivo de rechazo';
				else
					mensaje = 'Porfavor escriba y seleccione el motivo de rechazo';
			}else
				motivoSeleccionado = $('#motivoRechazo option:selected').val();
			
			if(mensaje == '')
				actionfinalizaMD(motivoSeleccionado, comentario);
			else{
				$("#modal_autorizacion").modal("hide");
				cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, muestraPopAutorizacion);
			}
		}
		
	});
	
	$('#subeConteo').unbind('click');
	$('#subeConteo').click(function(){
		total = $("#totalConteoAuditor").val();
		
		if(total == '')
			cargaMensajeModal('DETALLE MD', 
					'Agrega el promedio peatonal',
					TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
		else
			guardaConteoAuditor(total);
	});
	
	$('#rechazaMD').unbind('click');
	$("#rechazaMD").click(function(){
		ESTATUS_FINALIZA_MD = RECHAZA_MODULO;
		obtieneMotivosGenerales();
	});
	
	$('#autorizaMD').unbind('click');
	$("#autorizaMD").click(function(){
		ESTATUS_FINALIZA_MD = AUTORIZA_MODULO;
		finalizacionMDAutorizada();
	});
	
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
			$('#promedioConteosAuditoria').html(total);
			$("#totalConteoAuditor").val('');
			ACCION_REALIZADA = true;
		}
	}
}

function descargaArchivo(carpeta, archivo){
	window.open(ARCHIVOS_MD[carpeta][archivo].url);
}

function documentacion(data){
	
	ARCHIVOS_MD =  {};
	if(data.superficie.predial != undefined && data.superficie.predial.trim() != "") {
		ARCHIVOS_MD[predial] = new Array();
		ARCHIVOS_MD[predial].push(new Archivo(
				'Predial ',
				data.superficie.predial,
				1,
				$("#creadorMd").html(), null, null
		));
	}
	
	if(eval(data)["seguimiento"]["LEVANTAMIENTO CONSTRUCCION"] != undefined
			&& eval(data)["seguimiento"]["LEVANTAMIENTO CONSTRUCCION"] != null){
		
		
		$.each(eval(data)["seguimiento"]["LEVANTAMIENTO CONSTRUCCION"], function(i,item){
			
			ARCHIVOS_MD[layout] = new Array();
			ARCHIVOS_MD[layout].push(new Archivo(
					item.nombreArchivo,
					item.url,
					item.estatus,
					item.autor,
					null, 
					null)
			);
		});
	}
	
	if(eval(data)["seguimiento"]["PRESUPUESTO CONSTRUCCION"] != undefined
			&& eval(data)["seguimiento"]["PRESUPUESTO CONSTRUCCION"] != null){
		
		$.each(eval(data)["seguimiento"]["PRESUPUESTO CONSTRUCCION"], function(i,item){
			
			ARCHIVOS_MD[presupuesto] = new Array();
			ARCHIVOS_MD[presupuesto].push(new Archivo(
					item.nombreArchivo,
					item.url,
					item.estatus,
					item.autor,
					'$' + formatear(item.monto, true), 
					((item.aireAcondicionado != undefined) ? item.aireAcondicionado : null))
			);
		});
	}
	
	if(eval(data)["seguimiento"]["CORRECION PRESUPUESTO CONSTRUCCION"] != undefined
			&& eval(data)["seguimiento"]["CORRECION PRESUPUESTO CONSTRUCCION"] != null){
		
		$.each(eval(data)["seguimiento"]["CORRECION PRESUPUESTO CONSTRUCCION"], function(i,item){
			
			ARCHIVOS_MD[presupuesto].push(new Archivo(
					item.nombreArchivo,
					item.url,
					item.estatus,
					item.autor,
					'$' + formatear(item.monto, true), 
					((item.aireAcondicionado != undefined) ? item.aireAcondicionado : null))
			);
		});
	}
	
	if(eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"] != undefined
			&& eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"] != null){
		
		$.each(eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"], function(i,item){
			
			ARCHIVOS_MD[presupuesto].push(new Archivo(
					item.nombreArchivo,
					item.url,
					item.estatus,
					item.autor,
					'$' + formatear(item.monto, true), 
					((item.aireAcondicionado != undefined) ? item.aireAcondicionado : null))
			);
		});
	}
	
	if(eval(data)["seguimiento"]["CONTRATO FIRMADO GESTORIA"] != undefined
			&& eval(data)["seguimiento"]["CONTRATO FIRMADO GESTORIA"] != null){
		
		$.each(eval(data)["seguimiento"]["CONTRATO FIRMADO GESTORIA"], function(i,item){
			
			ARCHIVOS_MD[contrato] = new Array();
			ARCHIVOS_MD[contrato].push(new Archivo(
					item.nombreArchivo,
					item.url,
					item.estatus,
					item.autor,
					null, 
					((item.aireAcondicionado != undefined) ? item.aireAcondicionado : null))
			);
		});
	}
	
	if(eval(data)["seguimiento"]["CARGA DOCUMENTOS EXPANSION"] != undefined
			&& eval(data)["seguimiento"]["CARGA DOCUMENTOS EXPANSION"] != null){
		
		$.each(eval(data)["seguimiento"]["CARGA DOCUMENTOS EXPANSION"], function(i,item){
			
			if(item.estatus == 2) { 
				if(item.documentos != undefined && item.documentos.length > 0) {
					for(var i = 0; i < item.documentos.length; i++) {
						
						if(item.documentos[i].archivos != undefined && item.documentos[i].archivos.length > 0) {
							for(var j = 0; j < item.documentos[i].archivos.length; j++) {
								ARCHIVOS_MD.push(new Archivo(
										item.documentos[i].nombreArchivo + " " + (j+1) + " de " + item.documentos[i].archivos.length,
										item.documentos[i].archivos[j].url,
			        					item.estatus,
			        					item.autor,
			        					null, 
			        					((item.aireAcondicionado != undefined) ? item.aireAcondicionado : null))
								);
							}
						}
					}
				}
			}
		});
		ARCHIVOS_MD[ARCHIVOS_MD.length -1].estatus = 0;
	}
}

function dibujaArchivos(){
	
	$('.filesMD').html('');

	nombres = {};
	nombres[layout] = 'LAYOUT';
	nombres[presupuesto] = 'PRESUPUESTO';
	nombres[contrato] = 'CONTRATO';
	nombres[predial] = 'PREDIAL';
	nombres[doctosContrato] = 'TRAMITES';
	
	if(Object.size(ARCHIVOS_MD) > 0){
		strArchivos = {};
		strCabeceros = '';
		
		$.each(ARCHIVOS_MD, function(i, item){

			//Cabeceros
			strCabeceros += '<div class="tipoArchivo negrita azul t14" rel="' + i + '">' +  (nombres[i] != undefined ? nombres[i] : 'Otros') + '</div>';
			
			//Archivos
			strArchivos[i] = '';
			$.each(item, function(a, archivo){
				strArchivos[i] = '<div class="fileMD">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + archivo.nombre + '</div>'
										+ '<div class="autorFile">' + ((archivo.autor != undefined) ? archivo.autor : '--') + '</div>'
										+ '<div class="fechaFile">' + ((archivo.fecha != undefined) ? archivo.fecha : '--') + '</div>'
										+ '<div class="estatusFile">' + ((archivo.estatus != undefined) ? archivo.estatus : '--') + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ',' + a + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
									+ '</div>'
								+ '</div>' + strArchivos[i];
			});
		});
		
		$('#tipoArchivos').html(strCabeceros);
		
		$('#archivos').html('<div class="selecciona">Selecciona una carpeta para ver su contenido</div>');
		
		$('#manejadorArchivos').show();
		
		$('.tipoArchivo').unbind('click');
		$('.tipoArchivo').click(function(){
			carpeta = $(this).attr('rel');
			
			$.each($('.carpetaActiva'), function(){
				$(this).removeClass('carpetaActiva');
			});
			
			$(this).addClass('carpetaActiva');
			
			$('#archivos').html(strArchivos[carpeta]);
		});
		
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

function capitalizeFirstLetter(string) {
	string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
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
