var AUTORIZA_MODULO			= 1;
var RECHAZA_MODULO			= 0;

var ESTATUS_FINALIZA_MD = -1;

Dropzone.autoDiscover = false;
var uploader;
var dropzone;
var dropzoneOptions = {
        dictDefaultMessage: 'Arrastra aqui el archivo o da clic para buscarlo en tu equipo',
        dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
        dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
        dictInvalidFileType: 'Archivo no permitido',
        dictRemoveFile: 'Eliminar archivo', 
        dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
        paramName: "file",
        maxFilesize: 5, //MB
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
var areaCalidadOperativa = 7;

var AREA_USUARIO;
var PUESTO;
var DIR_OPE = 19;
var DIR_GRAL = 13;
var GERENTE = 3;
var ESTATUS_MD;
var arrEstatus;

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
var fechaSimple = 11;

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

var permisos;
var SOLO_CONSULTA = false;

var MOTIVO_RECHAZO_SELECCIONADO;
var COMENTARIO_RECHAZO;

$(function(){
	
	AREA_USUARIO = parseInt($('#areaUsuario').val());
	PUESTO = parseInt($('#puestoUsuario').val());
	USUARIO = parseInt($('#usuarioId').val());

	inicializaFlujoAutorizaciones();
	
	funcionesAutorizacion();
	obtienePermisos();
});

function obtienePermisos(){
	privilegios = $('.permisos_sub');
	permisos = new Array();
	
	$.each(privilegios, function(){
		if(this.value.indexOf("VOKSE.16") != -1){
			if(this.value.indexOf(",") != -1){
				per = this.value.split(',')[1];
				per = per.split('=')[0];
				
				permisos.push(parseInt(per));
			}
		}else if(this.value.indexOf("VOKSE.17,1") != -1) //Modulo de solo consulta
			SOLO_CONSULTA = true;
	});
}

function inicializaFlujoAutorizaciones(){
	flujoAutorizaciones = {};
	flujoAutorizaciones[3] = new Estatus(3, [3], 'Validacion Expansion');
	flujoAutorizaciones[8] = new Estatus(8, [3,8], 'Validacion Expansion y VoBo Inicial Regional');
	flujoAutorizaciones[5] = new Estatus(5, [5,7], 'Validacion Gestoria y Segundo conteo Auditoria');
	flujoAutorizaciones[7] = new Estatus(7, [5,7], 'Validacion Gestoria y Segundo conteo Auditoria');
	flujoAutorizaciones[6] = new Estatus(6, [6], 'Carga de layout');
	flujoAutorizaciones[9] = new Estatus(9, [9], 'Validacion de layout');
	flujoAutorizaciones[10] = new Estatus(10, [10], 'Presupuesto Construccion');
	flujoAutorizaciones[11] = new Estatus(11, [11], 'Presupuesto Auditoria');
	flujoAutorizaciones[12] = new Estatus(12, [12], 'Vobo final Operaciones');
	flujoAutorizaciones[22] = new Estatus(22, [22], 'Comite');
	flujoAutorizaciones[23] = new Estatus(23, [22], 'Comite');
	flujoAutorizaciones[18] = new Estatus(18, [18], 'Correccion de layout');
	flujoAutorizaciones[19] = new Estatus(19, [19], 'Correccion de presupuesto Construccion');
	flujoAutorizaciones[13] = new Estatus(13, [13], 'Contrato firmado');
	flujoAutorizaciones[24] = new Estatus(24, [24], 'CECO finanzas');
	flujoAutorizaciones[14] = new Estatus(14, [14], 'Gestoria');
	flujoAutorizaciones[15] = new Estatus(15, [15], 'Inicio de obra');
	flujoAutorizaciones[26] = new Estatus(26, [26], 'Confirmacion fin de obra');
	flujoAutorizaciones[16] = new Estatus(16, [16], 'Confirmacion Inauguracion');
	flujoAutorizaciones[28] = new Estatus(28, [28], 'Validacion de levantamiento');
	
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
	flujoAutorizaciones[28].agregaArea(areaOperaciones, new Area(areaOperaciones, todosRechazos, comite));
	
	
	flujoAutorizaciones[13].agregaArea(areaGestoria, new Area(areaGestoria, todosRechazos, contrato));
	
	flujoAutorizaciones[24].agregaArea(areaFinanzas, new Area(areaFinanzas, sinRechazo, ceco));
	
	flujoAutorizaciones[14].agregaArea(areaGestoria, new Area(areaGestoria, rechazoDefinitivo, sinArchivos));
	
	flujoAutorizaciones[15].agregaArea(areaConstruccion, new Area(areaConstruccion, sinRechazo, inicioObra));
	
	flujoAutorizaciones[26].agregaArea(areaConstruccion, new Area(areaConstruccion, sinRechazo, fechaSimple));
	
	flujoAutorizaciones[16].agregaArea(areaCalidadOperativa, new Area(areaCalidadOperativa, sinRechazo, fechaSimple));
}

function parseaEstatus(estatus){
	arrEstatus = {};
	
	$.each(estatus, function(){
		arrEstatus[this.areaValidacion] =  new AreasPendientes(
				this.areaValidacion, 
				this.nivelEstatusId, 
				this.usuarioAsignadoId);
	});
}

function finalizacionMDAutorizada(){
	if(flujoAutorizaciones[ESTATUS_MD] != undefined && flujoAutorizaciones[ESTATUS_MD].area[AREA_USUARIO] != undefined){
		
		area = flujoAutorizaciones[ESTATUS_MD].area[AREA_USUARIO];
		
		if(area.tipoArchivo == sinArchivos || area.tipoArchivo == comite){ //Autorizacion simple
			mensajeConfirmacion('¿Est\u00e1s seguro de finalizar?', 0);
		}else if(area.tipoArchivo == segundoConteo){ //Segundo conteo
			if(ACCION_REALIZADA)
				mensajeConfirmacion('¿Est\u00e1s seguro de finalizar?', 0);
			else
				mensajeAlerta('Agrega el promedio peatonal');
				
		}else if(area.tipoArchivo == layout){ // layout
			
			if(ACCION_REALIZADA)
				mensajeConfirmacion('¿Est\u00e1s seguro de finalizar?', 1);
			else
				mensajeAlerta('Agrega el archivo de layout');
		}else if (area.tipoArchivo == presupuesto) {//presupuestos
			if(!ACCION_REALIZADA)
				mensajeAlerta('Agrega el archivo de presupuesto');
			else{
				acc = $('input[type=radio]:checked').val();
				monto = $('#montoPresupuesto').val();
				
				if(acc == undefined){
					mensajeAlerta('¿El sitio contará con aire acondicionado?');
					return;
				}
				if(monto == ''){
					mensajeAlerta('Captura el monto total presupuestado');
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
				mensajeConfirmacion('¿Est\u00e1s seguro de finalizar?', 1);
			}
		}else if(area.tipoArchivo == venta){ //Venta
			monto = $('#montoVenta').val();
			
			if(monto == ''){
				mensajeAlerta('Captura el monto de venta semanal presupuestada');
				return;
			}else{
				tipoServicio = 11;
				mensajeConfirmacion('¿Est\u00e1s seguro de finalizar?', 1);
			}
				
			
		}else if(area.tipoArchivo == contrato){ //Contrato
			if(ACCION_REALIZADA)
				mensajeConfirmacion('¿Est\u00e1s seguro de finalizar?', 1);
			else
				mensajeAlerta('Agrega el archivo del contrato');

		}else if(area.tipoArchivo == ceco){ //CECO
			monto = $('#idCeco').val();
			
			if(monto == ''){
				mensajeAlerta('Captura el numero de centro de costos');
				return;
			}else{
				tipoServicio = 10;	
				mensajeConfirmacion('¿Est\u00e1s seguro de finalizar?', 1);
			}
		}else if(area.tipoArchivo == inicioObra){// Inicio de obra
			monto = $("#inicioObra").val();
			acc = parseInt($('#duracionObra option:selected').val());
			
			if(acc == 0){
				mensajeAlerta('Selecciona la duración de la obra que iniciará el ' + monto);
				return;
			}
			
			tipoServicio = 6;
			mensajeConfirmacion('¿Est\u00e1s seguro de finalizar?', 1);
			
		}else if(area.tipoArchivo == fechaSimple){ //Fin de obra e inauguracion
			monto = $("#simpleDate").val();
			
			if(area.id == areaConstruccion){
				tipoServicio = 12;
				mensajeConfirmacion('¿Est\u00e1s seguro de confirmar el fin de obra en ' + monto + '?', 1);
			}else{
				tipoServicio = 13;
				mensajeConfirmacion('¿Est\u00e1s seguro de confirmar la inauguracion en ' + monto + '?', 1);
			}
		}
	}
}

function mensajeAlerta(mensaje){
	cargaMensajeModal('DETALLE MD', 
			mensaje,
			TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
}

function mensajeConfirmacion(mensaje, metodo){
	if(metodo == 0)
		cargaMensajeModal('DETALLE MD', 
				mensaje,
				TIPO_MENSAJE_SI_NO, 
				TIPO_ESTATUS_ALERTA, 
				actionfinalizaMD);
	else
		cargaMensajeModal('DETALLE MD', 
				mensaje,
				TIPO_MENSAJE_SI_NO, 
				TIPO_ESTATUS_ALERTA, 
				finalizaConCargaPrevia);
}

function validaAutorizacion(){
	if(arrEstatus[AREA_USUARIO] != undefined)
		ESTATUS_MD = arrEstatus[AREA_USUARIO].idEstatus;
	else
		ESTATUS_MD = -1;
	
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
			
			/* == VISTA CARGA ARCHIVO ==*/
			if(ESTATUS_MD == 6){
				
				$.each($(".perfiles_usuario"), function(index,obj){ 
					if(obj.value == 15){ 
						$('#subida').show();
					}
				});			
				
			}else{
				$('#subida').show();
			}
			
			
			
			
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
			else
				$('#msjFinalizacion').html('¿Deseas autorizar el presupuesto?');
				
			generaAutorizacionPresupuesto(area);
			
			$('#archivos').removeClass('col-lg-10');
			$('#archivos').addClass('col-lg-7');
			
			/* == VISTA CARGA ARCHIVO ==*/
			if(ESTATUS_MD == 10){
				
				$.each($(".perfiles_usuario"), function(index,obj){ 
					if(obj.value == 19){ 
						$('#subida').show();
					}
				});			
				
			}else{
				$('#subida').show();
			}
			
			
			
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
		}else if(area.tipoArchivo == inicioObra){// inicio de obra
			generaAutorizacionObra(area);
		}else if(area.tipoArchivo == fechaSimple){// Fin de obra e inauguracion
			generaAutorizacionFechaSimple(area);
		}
	}
	
	dibujaArchivos();

}

function generaAutorizacionFechaSimple(area){
	$('#msjFinalizacion').html('¿Confirmar fecha?');
	$('#fechaSimple').show();
	inicializaCalendario('simpleDate', 1);
	
	if(area.id == areaCalidadOperativa)
		$('.tituloAutorizacion').html('Confirma la fecha de inauguración')
		
	generaAutorizacionSimple(area);
}

function generaAutorizacionObra(area){
	$('#msjFinalizacion').html('¿Finalizar MD?');
	$('#obra').show();
	inicializaCalendario('inicioObra', 0);
	
	generaAutorizacionSimple(area);
}

function generaAutorizacionCeco(area){
	$('#msjFinalizacion').html('¿Finalizar MD?');
	$('.simbolo').hide();
	$('#ceco').show();
	
	generaAutorizacionSimple(area);
}

function generaAutorizacionVenta(area){
	$('#venta').show();
	
	generaAutorizacionSimple(area);
}

function generaAutorizacionPresupuesto(area){
	$('#presupuesto').show();

	generaAutorizacionSimple(area);
}

function generaAutorizacionSimple(area){
	if(PUESTO != DIR_GRAL){
		if(tienePermiso(area)){
			userPermitido = arrEstatus[AREA_USUARIO].usuarioId;
			if((userPermitido == -1 && PUESTO != GERENTE) || USUARIO == userPermitido){
				if(area.tipoRechazo == sinRechazo)
					$('#rechazaMD').hide();
					
				$('#divAutorizacion').show();
			}
		}
	}
}

function tienePermiso(area){
	if(SOLO_CONSULTA) //Tiene bloqueo de solo consulta
		return false;
	else if(permisos.length == 0)//No tiene perfiles asignados, tiene acceso a toda su area
		return true;
	else{
		permisosNecesarios = flujoAutorizaciones[ESTATUS_MD].permisos;
		for (var i = 0; i < permisosNecesarios.length; i++) {
			if(permisos.indexOf(permisosNecesarios[i]) != -1)//Tiene el perfil necesario asignado
				return true;
			
		}
		return false;//No tiene el perfil necesaario asignado
	}
}

AreasPendientes = function(idArea, idEstatus, usuarioId){
	this.idArea = idArea;
	this.idEstatus = idEstatus;
	this.usuarioId = usuarioId;
};

Estatus = function(id, permisos, nombre){
	this.id = id;
	this.permisos = permisos;
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
							strCombo += '<option rel="0" value="' + this.motivoId + '">' + capitalizeFirstLetter(this.descripcion) + '</option>'; 
					}else if(tRechazo == rechazoDefinitivo){//Solo rechazos definitivos
						if(this.rechazoDefinitvo)
							strCombo += '<option ' + ((this.rechazoDefinitvo) ? 'rel="1" style="color: red"' : 'rel="0"') + ' value="' + this.motivoId + '">' + capitalizeFirstLetter(this.descripcion) + '</option>';
					}else
						strCombo += '<option ' + ((this.rechazoDefinitvo) ? 'rel="1" style="color: red"' : 'rel="0"') + ' value="' + this.motivoId + '">' + capitalizeFirstLetter(this.descripcion) + '</option>' ;
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

function finalizaConCargaPrevia(){
	cargaLoading();
	
	mdId = $("#mdId").val();
	nombreArchivo = prefijo + mdId; 
	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	
	if(FILE_Type.includes('sheet'))
		formato = 'xlsx';
	else if(FILE_Type.includes('excel'))
		formato = 'xls';
	else
		formato = FILE_Type.split('/')[1];
		
	if(tipoServicio == 10){//CECO
    	invocarJSONServiceAction("subeArchivo", 
				{'mdId': mdId,
				'tipoServicio' : tipoServicio,
				'fecha': fecha,
				'tiendaId': monto}, 
				'respSubeArchivo', 
				function() {},
				function() {});
	}else if(tipoServicio == 6){//Iniccio de obra
		invocarJSONServiceAction("subeObra", 
    			{'mdId': mdId,
    			'tipoServicio' : tipoServicio,
    			'inicio': monto,
    			'duracion' : acc}, 
    			'respSubeArchivo', 
    			function() {},
    			function() {});
	}else if(tipoServicio == 12 || tipoServicio == 13){//Fecha Simple
		invocarJSONServiceAction("subeFechaSimple", 
    			{'mdId': mdId,
    			'tipoServicio' : tipoServicio,
    			'fecha': monto}, 
    			'respSubeArchivo', 
    			function() {},
    			function() {});
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
				function() {},
				function() {});
	}
	
	
	respSubeArchivo = function(data){
		if(tipoServicio == 10 && data.codigo == 450){
			cierraLoading();
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		}else if(data.codigo != 200){
			cierraLoading();
			cargaMensajeModal('DETALLE MD', 'Ocurrio un error, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
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
			}else{
				motivoSeleccionado = $('#motivoRechazo option:selected').val();
				tipoMotivoSeleccionado = parseInt($('#motivoRechazo option:selected').attr('rel'));
			}
			if(mensaje == '')
				if(tipoMotivoSeleccionado == 0)//selecciona motivo de rechazo parcial
					actionfinalizaMD(motivoSeleccionado, comentario);
				else{//Selecciona motivo de rechazo definitivo
					
					MOTIVO_RECHAZO_SELECCIONADO = motivoSeleccionado;
					COMENTARIO_RECHAZO = comentario;
					
					cargaMensajeModal('DETALLE MD',
							'¿Estas seguro de rechazar la MD? Esto ocasionará que el sitio sea cancelado.',
							TIPO_MENSAJE_SI_NO,
							TIPO_ESTATUS_ALERTA,
							actionfinalizaMDDefinitivo);
				}
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
	
	inputNoPegar = document.getElementsByClassName('inputNoPegar');
	for (var i = 0; i < inputNoPegar.length; i++) {
		inputNoPegar[i].onpaste = function(e) {
			e.preventDefault();
		}
	}
}

function actionfinalizaMDDefinitivo(){
	actionfinalizaMD(MOTIVO_RECHAZO_SELECCIONADO, COMENTARIO_RECHAZO);
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
				$("#creadorMd").html(), 
				data.superficie.fechaPredial + ' ' +  data.superficie.horaPredial, 
				null,
		));
	}
	
	if(eval(data)["seguimiento"]["LEVANTAMIENTO CONSTRUCCION"] != undefined
			&& eval(data)["seguimiento"]["LEVANTAMIENTO CONSTRUCCION"] != null){
		
		ARCHIVOS_MD[layout] = new Array();
		$.each(eval(data)["seguimiento"]["LEVANTAMIENTO CONSTRUCCION"], function(i,item){

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
	
	if(eval(data)["seguimiento"]["CARGA LAYOUT CONSTRUCCION"] != undefined
			&& eval(data)["seguimiento"]["CARGA LAYOUT CONSTRUCCION"] != null){
		
		ARCHIVOS_MD[layout] = new Array();
		$.each(eval(data)["seguimiento"]["CARGA LAYOUT CONSTRUCCION"], function(i,item){

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
		
		ARCHIVOS_MD[presupuesto] = new Array();
		$.each(eval(data)["seguimiento"]["PRESUPUESTO CONSTRUCCION"], function(i,item){
			
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
		
		ARCHIVOS_MD[contrato] = new Array();
		$.each(eval(data)["seguimiento"]["CONTRATO FIRMADO GESTORIA"], function(i,item){

			ARCHIVOS_MD[contrato].push(new Archivo(
					item.nombreArchivo,
					item.url,
					item.estatus,
					item.autor,
					item.fechaSubida, 
					null)
			);
		});
	}
	
	if(eval(data)["seguimiento"]["CARGA DOCUMENTOS EXPANSION"] != undefined
			&& eval(data)["seguimiento"]["CARGA DOCUMENTOS EXPANSION"] != null){
		
		ARCHIVOS_MD[doctosContrato] = new Array();
		$.each(eval(data)["seguimiento"]["CARGA DOCUMENTOS EXPANSION"], function(i,item){
			
				if(item.documentos != undefined && item.documentos.length > 0) {
					for(var i = 0; i < item.documentos.length; i++) {
						
						if(item.documentos[i].archivos != undefined && item.documentos[i].archivos.length > 0) {
							for(var j = 0; j < item.documentos[i].archivos.length; j++) {
								ARCHIVOS_MD[doctosContrato].push(new Archivo(
										item.documentos[i].nombreArchivo + " " + (j+1) + " de " + item.documentos[i].archivos.length,
										item.documentos[i].archivos[j].url,
			        					item.estatus,
			        					item.autor,
			        					item.fechaSubida, 
			        					null)
								);
							}
						}
					}
				}
		});
	}
}

function dibujaArchivos(){
	
	$('.filesMD').html('');

	nombres = {};
	nombres[layout] = 'LAYOUT';
	nombres[presupuesto] = 'PRESUPUESTO';
	nombres[contrato] = 'CONTRATO';
	nombres[predial] = 'PREDIAL';
	nombres[doctosContrato] = 'DOCUMENTOS SITIO';
	
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
										+ '<div class="autorFile">' + ((archivo.autor != undefined) ? capitalizeName(archivo.autor) : '--') + '</div>'
										+ '<div class="fechaFile">' + ((archivo.monto != undefined) ? archivo.monto : '--') + ((archivo.acc == 1) ? '/ACC' : '') + '</div>'
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

function inicializaCalendario(element, tipo) {
	$(".ui-datepicker-trigger").hide();
	
	var dateHoy = new Date();
	var FECHA_HOY = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	
	$("#" + element).datepicker({
		minDate: (tipo == 0) ? 0 : '-3y',
		autoSize : true,
		showOn: 'both',
		showAnim: 'slideDown',
        buttonImageOnly: true,
        onClose: function( selectedDate ) {
			var date = $(this).datepicker('getDate');			
			var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }
	});
	
	$("#" + element).datepicker.dateFormat = 'dd/MM/yy';
	$("#" + element).val(FECHA_HOY);
	$("#" + element).show();
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

function capitalizeName(name){
	arrName = name.split(' ');
	nombre = '';
	for (var i = 0; i < arrName.length; i++) {
		nombre += capitalizeFirstLetter(arrName[i]) + ' ';
	}
	return nombre;
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
	this.autor = autor;
	this.monto = monto;
	
	if(estatus == 0)
		this.estatus = 'Rechazado';
	else if(estatus == 1)
		this.estatus = 'Autorizado';
	else
		this.estatus = 'Pendiente';
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
