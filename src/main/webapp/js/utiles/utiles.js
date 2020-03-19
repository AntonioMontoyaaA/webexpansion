var TIPO_MENSAJE_ACEPTAR	= 0;
var TIPO_MENSAJE_SI_NO		= 1;

var TIPO_ESTATUS_ERROR		= 0;
var TIPO_ESTATUS_ALERTA		= 1;
var TIPO_ESTATUS_EXITO		= 2;

var funcionEvalSi			= "";

var AR_AUTORIZADAS;
var AR_PAUSADAS;
var AR_CANCEL;
var AR_RECHAZADAS ;
var totalVerde = 0;
var totalRojo = 0;
var tipoPeriodo = 2; // 1 día  / 2 Semana / 3 Mes / 4 Año
var statusId;

$(function(){
	actionsPerfiles();
	consultaNotificaciones(tipoPeriodo);
	popover();
	mueveReloj();
	$('#buscador').val('');
	
	$("#botonMensajeAceptar").unbind("click");
	$("#botonMensajeAceptar").click(function() {
		if(funcionEvalSi != null) {
			eval(funcionEvalSi)();
		}
		cierraMensajeModal();
	});
	
	$("#botonMensajeNo").unbind("click");
	$("#botonMensajeNo").click(function() {
		cierraMensajeModal();
	});
	
	$("#botonMensajeSi").unbind("click");
	$("#botonMensajeSi").click(function() {
		if(funcionEvalSi != null) {
			eval(funcionEvalSi)();
		}
		cierraMensajeModal();
	});
});

function invocarJSONServiceAction(nombreAction, parametros, successFunction, errorFunction, completeFunction) {
	
	cargaLoading();
	var path = location.pathname.split("/")[1];
	nombreAction = "/" + path + "/" + nombreAction;
	
	funcionSuccess = function redireccionarMenuEj(respuesta)
	{
		if(respuesta == undefined || respuesta.codigo == undefined) {
			try{
				cierraLoading();
			}
			catch (err){
				//-- No estaba bloqueado
			}
			
			cargaMensajeModal('ERROR', 'Error en la comunicacion con el servidor', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR) 
		} else if (respuesta.codigo == 501) {
			try{
				cierraLoading();
			}
			catch (err){
				//-- No estaba bloqueado
			}
			finally{
				setTimeout("errorSesionCaduca()", 500);
				setTimeout("reloadLoginPage()", 2500);
			}
			
		}
		else{
			eval( successFunction +  "(respuesta);" );
		
		}
	};
	
	// obtener catalogo de estatus y llenar combo
	jQuery.ajax(nombreAction, {
				type: 'POST',
				data: parametros,
				scriptCharsetString: 'UTF-8',
				dataType: 'json',
				success: funcionSuccess,
				error: errorFunction,
				complete: completeFunction
	});
}

function cargaLoading() {
	$("#loadingPagina").modal('show');
}

function cierraLoading() {
	$("#loadingPagina").modal('hide');
}

function cargaMensajeModal(titulo, descripcionMensaje, tipoMensaje, estatusMensaje, funcionEvalSi) {
	$("#tituloMensaje").text(titulo);
	$("#descripcionMensaje").html(descripcionMensaje);
	this.funcionEvalSi = funcionEvalSi;
	
	switch(tipoMensaje) {
	case TIPO_MENSAJE_ACEPTAR: 
		$("#botonMensajeSi").hide();
		$("#botonMensajeNo").hide();
		$("#botonMensajeAceptar").show();
		break;
	case TIPO_MENSAJE_SI_NO: 
		$("#botonMensajeSi").show();
		$("#botonMensajeNo").show();
		$("#botonMensajeAceptar").hide();
		break;
	};
	
	switch(estatusMensaje) {
	case TIPO_ESTATUS_ERROR:
		$("#mensajeHeader").css("background", "#071B36");
		break;
	case TIPO_ESTATUS_ALERTA:
		$("#mensajeHeader").css("background", "#071B36");
		break;
	case TIPO_ESTATUS_EXITO:
		$("#mensajeHeader").css("background", "#071B36");
		break;
	};
	
	
	//$("#mensajes_modal").css('display','flex');
	$("#mensajes_modal").modal('show');
}

function cierraMensajeModal() {
	//$("#mensajes_modal").css('display','none');
	$("#mensajes_modal").modal('hide');
}

function errorSesionCaduca(){
	cargaMensajeModal("ERROR", "La sesi&oacute;n ha caducado", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redirecLogin);
}

function errorPermisoDenegado(){
	cargaMensajeModal("ERROR", "Permiso denegado", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redirecBack);
	redirecBack();
}

function redirecBack(){
	
	setTimeout(function(){history.back();},1500);
}

function redirecLogin(){
	window.location.href = getContextPath() ;
}

function getContextPath() {
	   return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
	}

function reloadLoginPage(){
	window.location.replace(".");
}

function formato(cnt, cents) {
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

	return (((sgn) ? '' : '-') + cnt);// + ( cents ?  '.' + cvs : '');
}


function mueveReloj(){
	var f=new Date();
    var mesesarr = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");	
	mes = mesesarr[f.getMonth()];
	dia = f.getDate();
	anio = f.getFullYear();
	minutos=f.getMinutes();
	horas=f.getHours();
	
	if(minutos<10){
		minutos='0'+minutos;
	}
	if(horas<10){
		horas='0'+horas;
	}
	
	fecha_header=dia+' de '+mes+' del '+anio+' '+horas+':'+minutos+' hrs';
     $('#fecha_header').text(fecha_header);

     //La función se tendrá que llamar así misma para que sea dinámica, 
     //de esta forma:
     setTimeout(mueveReloj,60000)
}

function popover(){ //popover del header
	 $('#perfil').popover({
		 container: 'body',
		 html:true
	 });
	 
	 $('#notificaciones').popover({
		 container: 'body',
		 html:true
	 });
	 
	$('.popover-dismiss').popover({
		  trigger: 'focus'
	});
}
function salir(){
	$('#logout').submit();
}

var notificaciones="";

function showNotificaciones(tipo){
	dibujaNotificaciones([]);
	if(tipo == 1){
		$('.segmentoNotificaciones1').show();
		$('.segmentoNotificaciones2').hide();
		$('.opcionNotificacion').removeClass('notificacionActivada');
		$('#not01').addClass('notificacionActivada');
		$('#divisionAvisos').hide();
		dibujaNotificaciones(AR_AUTORIZADAS);
		
		$('#modal_notificaciones').modal('show');
		
		$('#not01').unbind('click');
		$('#not01').click(function(){
			if(!$('#not01').hasClass('notificacionActivada')){// Sino se esta mostrando
				$('#not02').removeClass('notificacionActivada');
				$('#not01').addClass('notificacionActivada');
				$('#divisionAvisos').hide();
				$('.leidos').show();
				dibujaNotificaciones(AR_AUTORIZADAS);
			}
		});
		
		$('#not02').unbind('click');
		$('#not02').click(function(){
			if(!$('#not02').hasClass('notificacionActivada')){// Sino se esta mostrando
				$('.opcionNotificacion').removeClass('notificacionActivada');
				$('#not02').addClass('notificacionActivada');
				dibujaNotificaciones(AR_PAUSADAS);
			}
		});
	}else if(tipo ==2){
		$('.segmentoNotificaciones1').hide();
		$('.segmentoNotificaciones2').show();
		$('.opcionNotificacion').removeClass('notificacionActivada');
		$('#not03').addClass('notificacionActivada');
		dibujaNotificaciones(AR_CANCEL);
		
		$('#modal_notificaciones').modal('show');
		
		$('#not03').unbind('click');
		$('#not03').click(function(){
			if(!$('#not03').hasClass('notificacionActivada')){// Sino se esta mostrando
				$('#not04').removeClass('notificacionActivada');
				$('#not03').addClass('notificacionActivada');
				$('#divisionAvisos').hide();
				$('.leidos').show();
				dibujaNotificaciones(AR_CANCEL);
			}
		});
		
		$('#not04').unbind('click');
		$('#not04').click(function(){
			if(!$('#not04').hasClass('notificacionActivada')){// Sino se esta mostrando
				$('.opcionNotificacion').removeClass('notificacionActivada');
				$('#not04').addClass('notificacionActivada');
				dibujaNotificaciones(AR_RECHAZADAS);
			}
		});
	}
	
}

function dibujaNotificaciones(ar){
	$('.contenedorNotificaciones').html('');
	htmlNotificaciones = '';
	
	$.each(ar, function(){
		
			htmlNotificaciones += '<div class="notificacion" id="' + this.mdId + '" rel="' + this.tipo + '">'
										+ '<div class="titulos">'
											+ '<div class="tituloNotificacion azul">' + this.titulo + '</div>'
											+ '<div class="subtituloNotificacion azulTurquesa">' + this.subtitulo + '</div>'
										+ '</div>'
										+ '<div class="fechaNotificacion">' + this.fecha + '</div>'
								+ '</div>';
		
	});
	
	if(htmlNotificaciones != '')
		$('.contenedorNotificaciones').html(htmlNotificaciones);
	else
		$('.contenedorNotificaciones').html('<div class="sinNotificaciones">Nada que mostrar :(</div>');
	
	$('.notificacion').unbind('click');
	$('.notificacion').click(function(){
		
		id = $(this).attr('id');
		nombre = $(this).find('.tituloNotificacion').html();
			
		$("#nombreMd").val(nombre);
		$("#mdId").val(id);
		$("#tipoMd").val('0');
		$("#detalleMemoriaAsignadaAction").submit();
		
	});
}

function marcarMensajeLeido(tipo, mdId, consulta){
	invocarJSONServiceAction("marcaNotificacionLeida", 
			{'tipoComentario':tipo,
			'mdId' : mdId}, 
			'notificacionLeida', 
			function(){cierraLoading();},
			function(){cierraLoading();});
	
	notificacionLeida = function(data){
		if(consulta == true)
			consultaNotificaciones();
		cierraLoading();
		if(data.codigo == 200){}
	}
}

Notificacion = function(mdId, titulo, subtitulo, fecha, estatus, tipo){
	this.mdId = mdId;
	this.titulo = titulo;
	this.subtitulo = subtitulo;
	this.fecha = fecha;
	this.estatus = estatus;
	this.tipo = tipo;
};

function actualizaTotalNotificaciones(totalVerde, totalRojo){
	var TOTAL_VERDE = parseInt(totalVerde);
	var TOTAL_ROJO = parseInt(totalRojo);
	if(TOTAL_VERDE > 0){
		$('#alerta_circulo_verde').text(TOTAL_VERDE);
		$('#alerta_circulo_verde').show();
		$('#bell_verde')[0].src='img/web_AVISOS.png'; 
	} else{
		$('#alerta_circulo_verde').hide();
		$('#bell_verde')[0].src = 'img/bell_verde.svg';
	}
	if(TOTAL_ROJO > 0){
		$('#alerta_circulo_rojo').text(TOTAL_ROJO);
		$('#alerta_circulo_rojo').show();
		$('#bell_rojo')[0].src='img/web_AVISOS.png';
	}else{
		$('#alerta_circulo_rojo').hide();
		$('#bell_rojo')[0].src = 'img/bell_roja.svg';
	}
	
	
}

function consultaNotificaciones(periodo){
	 invocarJSONServiceAction("notificaciones", 
				{'tipoComentario':3, 
				'propiedad' : 'notificacionesAvisos',
				'tipoServicio' : 2, // tipoServicio:  2 para canceladas/rechazadas
				'periodo' : periodo},
				'asignaRojos', 
				null,
				null);
	 
	 invocarJSONServiceAction("notificaciones", 
				{'tipoComentario':3,
				'propiedad' : 'notificacionesAvisos',
				'tipoServicio' : 1,
				'periodo' : ""
				}, 
				'asignaVerde', 
				null,
				null);
	 actualizaTotalNotificaciones(totalVerde, totalRojo);
	 
	 asignaRojos = function(data) {
		
		if(data.codigo == 200){
			
		totalRojo =  data.totalNotificacionesR + data.totalNotificacionesC;
			
			AR_CANCEL = new Array();
			$.each(data.notificacionesC, function(){
				
				e = new Notificacion(
						this.mdId,
						'MD ' + this.nombreSitio,
						this.comentario,
						this.fecha,
						'',''
				);
				
				AR_CANCEL.push(e);
			});
			
			AR_RECHAZADAS = new Array();
			$.each(data.notificacionesR, function(){
				
				e = new Notificacion(
						this.mdId,
						'MD ' + this.nombreSitio,
						this.comentario,
						this.fecha,
						'', ''
				);
				
				AR_RECHAZADAS.push(e);
			});
			actualizaTotalNotificaciones(totalVerde, totalRojo);
		}
	};
	
	asignaVerde = function(data) {
		
		if(data.codigo == 200){
			totalVerde = data.totalNotificaciones + data.totalNotificacionesP;
			total = parseInt(totalVerde);
	     		AR_PAUSADAS = new Array();
				
				$.each(data.notificacionesP, function(){
					e = new Notificacion(
							this.mdId,
							'MD ' + this.nombreSitio,
							this.comentario,
							this.fecha,
							'',''
							
					);
		
					AR_PAUSADAS.push(e);
				});
		
			
			AR_AUTORIZADAS = new Array();
			
			$.each(data.notificaciones, function(){
				
				e = new Notificacion(
						this.mdId,
						'MD ' + this.nombreSitio,
						this.comentario,
						this.fecha,
						'', ''						
				);
				
				AR_AUTORIZADAS.push(e);
			});
			actualizaTotalNotificaciones(totalVerde, totalRojo);
		}
	};	
}

/* == ACTUALIZAR DATOS PERFIL ==*/
function editaPerfil(){
	$('#modal_perfil').modal('show');
}

function actionsPerfiles(){
	$("div.circulo_imagen").click(function(){$("input[name=imagen_usuario]").trigger("click");});
	$("#GuardarDatosPerfil").click(function(){ if(inputsInvalidos()){ cargaMensajeModal("Perfil","Verificar campos en color rojo.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, editaPerfil);  }else{ doActualizaDatosPerfil();}});
	$("#CloseDatosPerfil").click(function(){ cleanFormPerfil();});
	
	
	$("input[name=imagen_usuario]").change(function (evt) {
	    var tgt = evt.target || window.event.srcElement,
	        files = tgt.files;

	    // FileReader support
	    if (FileReader && files && files.length) {
	        var fr = new FileReader();
	        fr.onload = function () {
	        	$("img.circulo_imagen")[0].src = fr.result;
	        	$("img.circulo_imagen").css("display","block");
	        	$("img.circulo_imagen").css("background","white");
	        	
	        }
	        fr.readAsDataURL(files[0]);
	    }
	    else {
	        // fallback
	    }
	});	
}


/* -- GUARDAR DATOS PERFIL --*/
function doActualizaDatosPerfil(){
	cargaLoading();

	var array    = new Array();
	var nom      = $("#nombre_usuario").val().trim();
	var apPa     = $("#apellidoP_usuario").val().trim();
	var apMa     = $("#apellidoM_usuario").val().trim();
	var cel      = $("#celular_usuario").val().trim();
	var mail     = $("#email_usuario").val().trim();
	var passusr  = $("#contraseña_usuario").val().trim();
	var passnew  = $("#contraseñanueva_usuario").val().trim();
	var passconf = $("#rcontraseñanueva_usuario").val().trim();
	var imgUser  = $("img.circulo_imagen")[0].src;
	var imgUserInit = $("img.circulo_imagen")[0].getAttribute("relinit");
	
	if(imgUser === imgUserInit || imgUserInit === ""){
		imgUser = "";
	}
	
	array[0] = nom;
	array[1] = apPa;
	array[2] = apMa;
	array[3] = cel;
	array[4] = mail;
	array[5] = passusr;
	array[6] = passnew;
	array[7] = passconf;
	array[8] = imgUser;
	

	if(emptyValue(array)){
		cierraLoading();
		cargaMensajeModal("Perfil","Sin cambios para guardar.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, cleanFormPerfil);
		return false;
	}

	invocarJSONServiceAction("editaPerfilAction",{nombre:nom,
												  apellidop : apPa,
												  apellidom : apMa,
												  cel       : cel,
												  email     : mail,
												  passAct   : passusr,
												  passnew   : passnew,
												  passconf  : passconf,
												  imgUser   : imgUser
												  },
			'responseGuardaDatosPerfil',
			function() {
				//Funcion de error
				cargaMensajeModal("Perfil","Error en el servicio actualizar datos de perfil.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	responseGuardaDatosPerfil = function(data){
		
		if(data.codigo == 200){
			cargaMensajeModal("Perfil","Información actualizada correctamente.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);			
			cleanFormPerfil();
			actualizarValueFormDP(nom,apPa,apMa,cel,mail);
			
			
			if(imgUser === imgUserInit || imgUser === ""){
				//CODE
			}else{
				$("div.circulo_imagen_inicio img")[0].src = imgUser;
				$("img.circulo_imagen")[0].relinit = imgUser;
				$("img.circulo_imagen")[0].src = imgUser;				
			}
			
			if(nom !== ""){
				$("#nombre_UsuarioHeader").html(" "+nom);
			}
			if(apPa !== ""){
				$("#apPa_UsuarioHeader").html(apPa+" ");
			}
			
			return false;
		}else if(data.codigo == 445){
			$("#contraseña_usuario").val("");
			$("#contraseñanueva_usuario").val("");
			$("#rcontraseñanueva_usuario").val("");
			cargaMensajeModal("Perfil",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, editaPerfil);
			
		}else{
			$("img.circulo_imagen")[0].src = imgUserInit;
			cargaMensajeModal("Perfil",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			
		}


	}
}


/* == ACTUALIZAR DATOS ==*/
function actualizarValueFormDP(nom,apPa,apMa,cel,mail){
	if(nom !== ""){$("#nombre_usuario").attr('placeholder',nom);}
	if(apPa !== ""){$("#apellidoP_usuario").attr('placeholder',apPa);}
	if(apMa !== ""){$("#apellidoM_usuario").attr('placeholder',apMa);}
	if(cel !== ""){$("#celular_usuario").attr('placeholder',cel);}
	if(mail !== ""){$("#email_usuario").attr('placeholder',mail);}
}

/* == LIMPIAR CAMPOS ==*/
function cleanFormPerfil(){
	$("#nombre_usuario").val("");
	$("#nombre_usuario").removeClass("inputerror");
	$("#nombre_usuario").addClass("inputform");
	$("#apellidoP_usuario").val("");
	$("#apellidoP_usuario").removeClass("inputerror");
	$("#apellidoP_usuario").addClass("inputform");
	$("#apellidoM_usuario").val("");
	$("#apellidoM_usuario").removeClass("inputerror");
	$("#apellidoM_usuario").addClass("inputform");
	$("#celular_usuario").val("");
	$("#celular_usuario").removeClass("inputerror");
	$("#celular_usuario").addClass("inputform");
	$("#email_usuario").val("");
	$("#email_usuario").removeClass("inputerror");
	$("#email_usuario").addClass("inputform");
	$("#contraseña_usuario").val("");
	$("#contraseñanueva_usuario").val("");
	$("#rcontraseñanueva_usuario").val("");
	$("img.circulo_imagen")[0].src = $("div.circulo_imagen_inicio img")[0].src;

			
}


/* == VALIDAR CAMPOS ==*/
function inputsInvalidos(){
	if(inputError($("#nombre_usuario"))){
		return true;
	} else if(inputError($("#nombre_usuario"))){
		return true;
	}else if(inputError($("#apellidoP_usuario"))){
		return true;
	}else if(inputError($("#apellidoM_usuario"))){
		return true;
	}else if(inputError($("#celular_usuario"))){
		return true;
	}else if(inputError($("#email_usuario"))){
		return true;
	}
}

/* ==== CAMPOS SIN CAMBIOS ===*/
function inputError(inputValue){

	return inputValue.hasClass("inputerror");
}


/* ==== CAMPOS SIN CAMBIOS ===*/
function emptyValue(inputValue){
	var sinCambios = true;
	
	inputValue.forEach(function(element) {
		if(element.trim() !== ""){
			sinCambios = false;
			return false;
		}
	});
	
	return sinCambios;
}


var regexpNombre   = /^[A-Za-z]*()\s{0,1}[A-Za-z]*()\s{0,1}$/;
var regexpApellido = /^[A-Za-z]*()\s{0,1}[A-Za-z]*()\s{0,1}$/;
var regexpEmail    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var regexpCelular  = /^\d{7,10}/;
var regexletras    = /[äA-ZÁÉÍÓÚ.,?¡°!@"#$%&/()?´+*}{ ¨[_:;,._-¬\\¿+.äa-zñáéíóú]/g;
var regexletrasemail = /[äÁÉÍÓÚ,?¡°!"#$%&/()?´+*}{ ¨[:;,¬\\¿+äñáéíóú]/g;
var regexnumeros   = /[äÁÉÍÓÚ.,?¡°@!"#$%&/()=?´+*}{\-1234567890¨[_:;,._¬\\¿+.äñáéíóú]+/g;

/*======= funciones regexp ====== */    
function validaNombre(value){
	value.value = value.value.replace(regexnumeros, '');
	if(value.value === ""){
		$(value).removeClass("inputerror");
		$(value).addClass("inputform");		
	}else if (!value.value.match(regexpNombre)){
		$(value).removeClass("inputform");
		$(value).addClass("inputerror");
	}else{
		$(value).removeClass("inputerror");
		$(value).addClass("inputform");
	}	
}

function validaApellido(value){
	value.value = value.value.replace(regexnumeros, '');
	if(value.value === ""){
		$(value).removeClass("inputerror");
		$(value).addClass("inputform");		
	}else if (!value.value.match(regexpApellido)){
		$(value).removeClass("inputform");
		$(value).addClass("inputerror");
	}else{
		$(value).removeClass("inputerror");
		$(value).addClass("inputform");
	}	
}

function validaEmail(value){
	if(value.value.trim() === ""){
		$(value).removeClass("inputerror");
		$(value).addClass("inputform");		
	}else if (regexpEmail.test(value.value) !== true ){
		$(value).removeClass("inputform");
		$(value).addClass("inputerror");
	}else{
		$(value).removeClass("inputerror");
		$(value).addClass("inputform");		
	}	
	value.value = value.value.replace(regexletrasemail, '');
}

function validaCelular(value){ 	
	
	if(value.value.trim() === ""){
		$(value).removeClass("inputerror");
		$(value).addClass("inputform");		
	}else
	if (regexpCelular.test(value.value) !== true){
		$(value).removeClass("inputform");
		$(value).addClass("inputerror");
	}else{
		$(value).removeClass("inputerror");
		$(value).addClass("inputform");		
	}		
	
	value.value = value.value.replace(regexletras, '');
}

function permisos_perfil(){
	$('#time').hide;
	$('#edit').hide;
	$('#despausar').hide;
	$('#reactivar').hide;
	$('#pause').hide;
	$('#refuse').hide;
	$('#change').hide;
	$('#descargaExcelTablero').hide;

	var permiso=true;
	$.each($(".permisos_sub"),function(index, value){  // permisos de perfil	
		
		/*501 - DESCARGA EXCEL
		502 - VER GANT
		503 - EDITAR MD
		504 - PAUSAR MD
		505 - CANCELAR MD
		506 - CAMBIAR ESTATUS MD
		507 - Descargar PDF detalle MD*/
		if(value.value=="PRIVILEGIO.MENU.VOKSE.501=true"){
			$('#descargaExcelTablero').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.502=true"){
			$('#time').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.503=true"){
			$('#edit').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.503=true"){
			$('#despausar').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.503=true"){
			$('#reactivar').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.504=true"){
			$('#pause').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.505=true"){
			$('#refuse').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.506=true"){
			$('#change').removeClass('sin_permiso');
		}
		if(value.value == "PRIVILEGIO.MENU.VOKSE.507=true"){
			$('#botondescarga').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.508=true"){
			$('#layoutUp').removeClass('sin_permiso');
		}
	});
}

function ShowSelectedItem(){
	var cod = $('#select')[0].value;
	console.log(cod)
	tipoPeriodo = cod;
	
	$('.drop')[0].getElementsByTagName('select')[0].style.background= '#E5E5E5';
	$('#modal_notificaciones')[0]
		.getElementsByTagName('div')[0]
		.getElementsByTagName('div')[0]
		.getElementsByTagName('div')[0]
		.style.background = '#E5E5E5';
	consultaPeriodo(tipoPeriodo);
	
}
function consultaPeriodo(periodo){
	 invocarJSONServiceAction("notificaciones", 
				{'tipoComentario':3,
				'propiedad' : 'notificacionesAvisos',
				'tipoServicio' : 2, // tipoServicio:  2 para canceladas/rechazadas
				'periodo': periodo }, 
				'asignaRojos', 
				null,
				null);
	 
	 
	 asignaRojos = function(data) {
		
		if(data.codigo == 200){
			
		totalRojo =  data.totalNotificacionesR + data.totalNotificacionesC;
			
			AR_CANCEL = new Array();
			$.each(data.notificacionesC, function(){
				
				e = new Notificacion(
						this.mdId,
						'MD ' + this.nombreSitio,
						this.comentario,
						this.fecha,
						'',''
				);
				
				AR_CANCEL.push(e);
			});
			
			AR_RECHAZADAS = new Array();
			$.each(data.notificacionesR, function(){
				
				e = new Notificacion(
						this.mdId,
						'MD ' + this.nombreSitio,
						this.comentario,
						this.fecha,
						'', ''
				);
				
				AR_RECHAZADAS.push(e);
			});
			console.log("periodo: ", tipoPeriodo)
		}
		cierraLoading();
		$('.drop')[0].getElementsByTagName('select')[0].style.background= '';
		$('#modal_notificaciones')[0]
			.getElementsByTagName('div')[0]
			.getElementsByTagName('div')[0]
			.getElementsByTagName('div')[0]
			.style.background = '#FFF';
		if($('#not03').hasClass('notificacionActivada')){// Sino se esta mostrando
			dibujaNotificaciones(AR_CANCEL);
		}else{
			dibujaNotificaciones(AR_RECHAZADAS);
		}
	};
}
