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

var ARRAYOBJGERENTES;
var ARRAYOBJJEFES;
var androidId;
var imei;
var editaImei;

var ARRAYOBJMDS;

//Dropzone.autoDiscover = false;
var uploader;
var dropzone;
var BASE64Upload = "";
var typeFileExt = "";
var nameFileExt = "";
var dropTipo ;
var MDID;

var elemMD;
var elemMDAux;
var aplicaPredial =  false;
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
	$("#select_employeeMDGereModal").change(function(){ cargarJefesXGerente(this, 0);});
	$("#guardarImei").click(function(){ confirmaGuardadoImei();});
	$("#select_gerenteMD").change(function(){
		limpiaModalFotosSelect();
		cargarJefesXGerente(this, 1); });	
	$("#select_jefes_fotos").change(function(){ 
		limpiaModalFotosSelect();
		cargaMDXUsuario(this); });
	$("#select_MD").change(function(){
		
		limpiaModalFotosSelect();
		superficiePreconsulta(this)
		consultaSuperficieMD(this); 

		});
	
	$(".img_edit").click(function(){
		pos =   
		dropTipo =  $(".drop_file")[$(".img_edit")[this.id].id].id;
		$("input.var_pdfUpload")[this.id].click()
	});
	
	$(".drop_file").click(function(){
		dropTipo =  this.id
		$(this.parentElement.children[1]).trigger("click");
	});
	$("input.var_pdfUpload").change(function (evt) {
		var element = this;		
	    var tgt = evt.target || window.event.srcElement,
	        files = tgt.files;
	    	typeFileExt = files[0].type;
	    	fileExt = files[0].name.split('.').slice(1, 2).join('.');
	    	namefileExt = files[0].name.split('.').slice(0, 1).join('.');
	    // FileReader support
	    if (FileReader && files && files.length) {
	        var fr = new FileReader();
	        fr.onload = function () {
	        	BASE64Upload = fr.result;
	        	
	        }
	        fr.readAsDataURL(files[0]);
	        setTimeout(function(){
				if(BASE64Upload != undefined && BASE64Upload != ""){  
					cargaMensajeModal("Subir Foto MD","¿Estás seguro de guardar la foto seleccionada? ", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, fnSubeFoto);
				}		    	
			},350);
	    } else {
	        // fallback
	    }

	});	
	$('input.form-check-input').change(function (evt) {
		elemMD.esquina = this.checked ? 1 : 0;
	});

	$("#guardarFotosMD").click(function(){ 
		 if(elemMD.fondo == 0 || elemMD.fondo == undefined || elemMD.fondo == "") {
				cargaMensajeModal("Subir Foto MD","Falta llenar campo: PROFUNDIDAD", TIPO_MENSAJE_ACEPTAR , TIPO_ESTATUS_ALERTA, abreModal);
		 }else if(elemMD.frente == 0 || elemMD.frente == undefined || elemMD.frente == "") {
				cargaMensajeModal("Subir Foto MD","Falta llenar campo: FRENTE ", TIPO_MENSAJE_ACEPTAR , TIPO_ESTATUS_ALERTA, abreModal);
		 }else{
			 let cont = 0;
			 if(elemMD.imgFrontal != "" && elemMD.imgFrontal != undefined && elemMD.imgLateral1 != "" && elemMD.imgLateral1 != undefined 
				 && elemMD.imgLateral2 != "" && elemMD.imgLateral2 != undefined  && elemMD.imgEnt1 != "" && elemMD.imgEnt1 != undefined 
				 && elemMD.imgEnt2 != "" && elemMD.imgEnt2 != undefined && elemMD.imgEnt3 != "" && elemMD.imgEnt3 != undefined ){ 
				
				 if(aplicaPredial && (elemMD.imgPredial == "" || elemMD.imgPredial == undefined )){
					 cargaMensajeModal("Subir Foto MD","Faltan imagenes por cargar", TIPO_MENSAJE_ACEPTAR , TIPO_ESTATUS_ALERTA, abreModal);
				 }else{
					 cargaMensajeModal("Subir Foto MD","¿Desea continuar?, esta acción no se puede deshacer", TIPO_MENSAJE_SI_NO , TIPO_ESTATUS_ALERTA, guardaFotosMD);
				 }
				 
			 }else{
					cargaMensajeModal("Subir Foto MD","Faltan imagenes por cargar", TIPO_MENSAJE_ACEPTAR , TIPO_ESTATUS_ALERTA, abreModal);
			 }
		 }
		
		
	});
});

function invocarJSONServiceAction(nombreAction, parametros, successFunction, errorFunction, completeFunction) {
	
	cargaLoading();
	var path = location.pathname.split("/")[1];
	
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
	$('#editaIMEI').hide;

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

function getObtenerEmpleadosGerentes(obj){	
	$(obj.idHtmlGerente).html("");
	$(obj.idHtmlGerente)
    .append('<option selected="selected" value="-1">Selecione un gerente </option>');
	
	$('#select_employeeMDJefesModal').html("");
	$('#select_employeeMDJefesModal').append($('<option>', {
			value: "-1",
			text :"Selecione un jefe"
		}));	
	
	$('#imei_Id').val("");
	
	$('#select_MD').append($('<option>', {
		value: "-1",
		text :"---"
	}));	
 if(ARRAYOBJGERENTES == undefined){
	 cargaLoading();
	invocarJSONServiceAction("obtenerEmpleadosGerentes",{},
			'llenarComboEmpleados',
			function() {
				//Funcion de error
				cargaMensajeModal(obj.cabecero,"Error en el servicio obtener jefes de expansión.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				$(obj.idHtmlGerente)
			    .empty()
			    .append('<option selected="selected" value="-2">Selecione un gerente </option>')
			;

			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	llenarComboEmpleados = function(data){
		if(data.codigo == 400){
			cargaMensajeModal(obj.cabecero,data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			return false;
		}

		objArrayEmployee = data;
		ARRAYOBJGERENTES = objArrayEmployee.usuarios;

		objArrayEmployee.usuarios.forEach(function(item, i){
			 $(obj.idHtmlGerente).append($('<option>', {
			        value: item.gerenteId,
			        text : item.gerenteId +' - '+ item.gerente
			    }));
		});
		
		setTimeout(function(){ $(obj.idHtmlGerente).trigger('chosen:updated'); },100);
		
	}
 }else{
	 ARRAYOBJGERENTES.forEach(function(item, i){
		 $(obj.idHtmlGerente).append($('<option>', {
		        value: item.gerenteId,
		        text : item.gerenteId +' - '+ item.gerente
		    }));
	});
	
	setTimeout(function(){ $(obj.idHtmlGerente).trigger('chosen:updated'); },100);
 }
}

function cargarJefesXGerente(element,tipo){
	var idJefe = '';
	if(tipo == 0){
		idJefe = '#select_employeeMDJefesModal';
	}else{
		idJefe = '#select_jefes_fotos';
	}
	$(idJefe).html("");
	$(idJefe).append($('<option>', {
			value: "-1",
			text :"Todos los jefes"
		}));
	
	if(ARRAYOBJGERENTES != undefined && Object.keys(ARRAYOBJGERENTES).length > 0){
		
		ARRAYOBJGERENTES.forEach(function(item, i){
			if(element.value === item.gerenteId){
				item.jefes.forEach(function(itemj, y){
					$(idJefe).append($('<option>', {
						value: itemj.jefeId,
						text : itemj.jefeId  +' - '+ itemj.jefe
					}));
				});
			}else if(element.value == -1){
				item.jefes.forEach(function(itemj, y){
					$(idJefe).append($('<option>', {
						value: itemj.jefeId,
						text : itemj.jefeId + ' - '+ itemj.jefe
					}));
				});
			}
		});
	}
	
	setTimeout(function(){ $(idJefe).trigger('chosen:updated'); },100);
}

/* == GUARDAR ID ==*/
function modalID(){
$('#modal_id').modal('show');
var cabecero = "CAMBIAR IMEI"
var obj = {
	cabecero: 	"CAMBIAR IMEI",
	idHtmlGerente : '#select_employeeMDGereModal',
	}
getObtenerEmpleadosGerentes(obj)
}

function confirmaGuardadoImei(){
	if( ($("#select_employeeMDJefesModal").val() != "-1" || $("#select_employeeMDGereModal").val() != "-1" ) && $("#imei_Id").val()  != ""){
		imei = $("#imei_Id").val();
		var gerenteId = $("#select_employeeMDGereModal").val();
		var jefeId = $("#select_employeeMDJefesModal").val()
		var id = 0;
		var nombre = "";
		
		if(jefeId != "-1"){
			id = jefeId;
			
			ARRAYOBJGERENTES.forEach(function(item, i){
				if(gerenteId === item.gerenteId){
					item.jefes.forEach(function(itemj, y){
						if(itemj.jefeId == id){
							nombre = "Jefe: <br> " + itemj.jefe;
						}
					});
				}
			});
		}else{
			id = gerenteId;
			ARRAYOBJGERENTES.forEach(function(item, i){
				if(id === item.gerenteId){
					nombre = "Gerente: <br> " + item.gerente;
				}
			});
		}
		androidId = id;
		
		cargaMensajeModal("Guarda ID android","Estás a punto de modificar el ID del  "+ nombre +", ¿Deseas continuar?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, guardaIMEI);
		
	
	}else{
		cargaMensajeModal("Guarda ID android","Sin cambios para guardar", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
	}
	
}

	
function guardaIMEI(){
		cargaLoading();
		invocarJSONServiceAction("guardaIdAndroid",{
								 'androidId' : imei, 
								 'usrActualizaId': androidId },
				'responseGuardaId',
				function() {
					//Funcion de error
					cargaMensajeModal("Guarda ID android","Error en guardar la información", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				},
				function() {
					//Función al finalizar
					cierraLoading();
				});

		responseGuardaId = function(data){
			if(data.codigo == 400){
				cargaMensajeModal("Guarda ID android",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			}else{
				cargaMensajeModal("Guarda ID android",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			}			
		}	
}

/* == SUBIR FOTOS MD ==*/
function subirFotosMD(){
$('#modal_fotos').modal('show');
var cabecero = "SUBIR FOTOS MD"
	var obj = {
		cabecero: 	cabecero,
		idHtmlGerente : '#select_gerenteMD',
		}

		$('#select_jefes_fotos').html("");
		$('#select_jefes_fotos').append($('<option>', {
				value: "-1",
				text :"Selecione un jefe"
			}));	
		
		$('#select_MD').html("");
		limpiaModalFotosSelect()
	getObtenerEmpleadosGerentes(obj)
	
}

function abreModal(){
	$('#modal_fotos').modal('show');
}

function limpiaModalFotosSelect(){	
	limpiaModalFotos();
	$("#botonMd").show();
	$("#botonesMd").hide();
	$("#contenidoMd").hide()
	elemMD = undefined;
	elemMDAux =  undefined;		
}

function cargaMDXUsuario(){
	cargaLoading(); 
	$('#select_MD').html("");
	$('#select_MD').append($('<option>', {
			value: "-1",
			text :"---"
		}));	
	invocarJSONServiceAction("obtieneMDS",{
							 'usuarioGerenteId' : $("#select_gerenteMD").val() , 
							 'usuarioJefeId': $("#select_jefes_fotos").val()  },
			'response',
			function() {
				//Funcion de error
				cargaMensajeModal("Obtiene MD´S","Error en obtener la información", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	response = function(data){
		// recibir lista de MDS
		if(data.codigo == 400){
			cargaMensajeModal("Obtiene MD´S",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}else{

			objArrayMDs = data;
			ARRAYOBJMDS =objArrayMDs.mds;
			if(objArrayMDs.mds != undefined){
					objArrayMDs.mds.forEach(function(item, i){
					
					 $('#select_MD').append($('<option>', {
					        value: item.mdsId,
					        text : item.mdsId + " - "+ item.nombreMd 
					    }));
				});
				
				setTimeout(function(){ $('#select_MD').trigger('chosen:updated'); },100);
			}else{
				cargaMensajeModal("Obtiene MD´S",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			}
			
		}
		
	}
}

function superficiePreconsulta(element){
	cargaLoading();
	invocarJSONServiceAction("superficiePreconsulta",{
		 'mdId': element.value },
		 'responsePreConsulta',
	function() {
		//Funcion de error
		cargaMensajeModal("Consulta MD's","Error en obtener la información", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
	},
	function() {
		//Función al finalizar
		cierraLoading();
	});
	
	responsePreConsulta = function(data){
		if(data.codigo == 400){
			cargaMensajeModal("Consulta MD's",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}else{
			if(data.aplicaPredial == 1){
				aplicaPredial = true;
				$("#div_predial").show();
			}else{
				aplicaPredial = false;
				$("#div_predial").hide();
			}
			
		}
	}
}

function consultaSuperficieMD(element){	
	cargaLoading(); 
	MDID = element.value;
	
	invocarJSONServiceAction("consultaSuperficie",{
							 'mdId': element.value },
			'response',
			function() {
				//Funcion de error
				cargaMensajeModal("Consulta MD's","Error en obtener la información", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	response = function(data){
		// recibir lista de MDS
		if(data.codigo == 400){
			cargaMensajeModal("Consulta MD's",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}else if( data.codigo == 403){
			$("#botonMd").hide();
			$("#botonesMd").show();
			$("#contenidoMd").show();
			elemMD = {
				frente : 0,
				fondo: 0,
				total: 0,
				imgLateral1: "",
				fechaLateral1: "",
				imgFrontal: "",
				fechaFrontal: "",
				imgLateral2: "",
				fechaLateral2: "",
				imgEnt1: "",
				fechaEnt1: "",
				imgEnt2: "",
				fechaEnt2: "",
				imgEnt3: "",
				fechaEnt3: "",
				esquina: 0,
				imgPredial: "",
				fechaPredial: ""
				}
			elemMDAux = Object.assign({},elemMD);
			limpiaModalFotos()
					
		}else{
			
			/* Datos de la superficie */
			$("#botonMd").hide();
			$("#botonesMd").show();
			$("#contenidoMd").show();
			
			if(data.niveles != undefined) {
				 superficie = undefined; // nivel [2]
				 esquina = { valorreal : 0 }; // nivel[0]
				 frente = { valorreal : 0 } // nivel[1]
				data.niveles.forEach(function(item, i){
					if(item.nombrenivel == "ESQUINA"){
						esquina = item; 
					}else if(item.nombrenivel.split(" ")[0] == "FRENTE"){
						frente = item;
					}else if(item.imgFrenteId != undefined){
						superficie = item;
					}
				});
					
				$("#frenteMdModal").val(frente.valorreal);
				$("#profundidadMdModal").val(superficie.fondo);
				$("#tamanioTotalMdModal").html(superficie.valorreal + " mts<sup>2</sup>");
				if(esquina.valorreal == 1){
					$('#esquinaModal').prop('checked', true);
				}else if(esquina.valorreal == 0){
					$('#esquinaModal').prop('checked', false);
				}
				
				if(superficie.imgFrenteId != ""){
					$("#vistaFrontalMdModal").attr("src", superficie.imgFrenteId);
					$("#vistaFrontalMdModal").show();
					$("#0").show();
					$("#subidaFrontal").hide();
				}
				if(superficie.fecha_fente != ""){
				$("#fechaVistaFrontalModal").text(new Date(superficie.fecha_fente.split(" ")[0].replaceAll('-', '/')).format("dd/mm/yyyy"));
				$("#horaVistaFrontalModal").text(superficie.fecha_fente.split(" ")[1]);
				}
				
				if(superficie.imgLateral1Id != ""){
					$("#vistaLateral1MdModal").attr("src", superficie.imgLateral1Id);
					$("#vistaLateral1MdModal").show();
					$("#1").show();
					$("#subidaLateral1").hide();
				}
				if(superficie.fecha_lat1 != ""){
					$("#fechaVistaLateral1Modal").text(new Date(superficie.fecha_lat1.split(" ")[0].replaceAll('-', '/')).format("dd/mm/yyyy"));
					$("#horaVistaLateral1Modal").text(superficie.fecha_lat1.split(" ")[1]);
				}
								
				if(superficie.imgLateral2Id != ""){
					$("#vistaLateral2MdModal").attr("src", superficie.imgLateral2Id);
					$("#vistaLateral2MdModal").show();
					$("#2").show();
					$("#subidaLateral2").hide();
				}
				if(superficie.fecha_lat2 != ""){
					$("#fechaVistaLateral2Modal").text(new Date(superficie.fecha_lat2.split(" ")[0].replaceAll('-', '/')).format("dd/mm/yyyy"));
					$("#horaVistaLateral2Modal").text(superficie.fecha_lat2.split(" ")[1]);
				}				
				
				if(superficie.imgEnt1 != ""){
					$("#vistaEntorno1MdModal").attr("src", superficie.imgEnt1);
					$("#vistaEntorno1MdModal").show();
					$("#3").show();
					$("#subidaEnt1").hide();
				}
				if(superficie.fecha_ent1 != ""){
					$("#fechaVistaEntorno1Modal").text(new Date(superficie.fecha_ent1.split(" ")[0].replaceAll('-', '/')).format("dd/mm/yyyy")); 
					$("#horaVistaEntorno1Modal").text(superficie.fecha_ent1.split(" ")[1]);
				}				
				
				if(superficie.imgEnt2 != ""){
					$("#vistaEntorno2MdModal").attr("src", superficie.imgEnt2);
					$("#vistaEntorno2MdModal").show();
					$("#4").show();
					$("#subidaEnt2").hide();
				}
				if(superficie.fecha_ent2){
					$("#fechaVistaEntorno2Modal").text(new Date(superficie.fecha_ent2.split(" ")[0].replaceAll('-', '/')).format("dd/mm/yyyy"));
					$("#horaVistaEntorno2Modal").text( superficie.fecha_ent2.split(" ")[1]);
				}				
				
				if(superficie.imgEnt3 != ""){
					$("#vistaEntorno3MdModal").attr("src", superficie.imgEnt3);
					$("#vistaEntorno3MdModal").show();
					$("#5").show();
					$("#subidaEnt3").hide();
				}
				if(superficie.fecha_ent3 != ""){
					$("#fechaVistaEntorno3Modal").text(new Date(superficie.fecha_ent3.split(" ")[0].replaceAll('-', '/')).format("dd/mm/yyyy"));
					$("#horaVistaEntorno3Modal").text(superficie.fecha_ent3.split(" ")[1]);
				}				

				if(superficie.imgPredial != ""){
					$("#img_predialModal").attr("src", superficie.imgPredial);
					$("#img_predialModal").show();
					$("#6").show();
					$("#subidaPredial").hide();
				}
				if(superficie.fecha_pred != ""){
				$("#fechaVistaPredialModal").text(new Date(superficie.fecha_pred.split(" ")[0].replaceAll('-', '/')).format("dd/mm/yyyy"));
				$("#horaVistaPredialModal").text(superficie.fecha_pred.split(" ")[1]);
				}
				
				elemMD = {
				frente : frente.valorreal,
				fondo: superficie.fondo,
				total: superficie.valorreal ,
				imgLateral1: superficie.imgLateral1Id,
				fechaLateral1: superficie.fecha_lat1,
				imgFrontal: superficie.imgFrenteId,
				fechaFrontal: superficie.fecha_fente,
				imgLateral2: superficie.imgLateral2Id,
				fechaLateral2: superficie.fecha_lat2,
				imgEnt1: superficie.imgEnt1,
				fechaEnt1: superficie.fecha_ent1,
				imgEnt2: superficie.imgEnt2,
				fechaEnt2: superficie.fecha_ent2,
				imgEnt3: superficie.imgEnt3,
				fechaEnt3: superficie.fecha_ent3,
				esquina:esquina.valorreal,
				imgPredial: superficie.imgPredial,
				fechaPredial: superficie.fecha_pred
				}
				elemMDAux = Object.assign({},elemMD);
			}else{
				cargaMensajeModal("Consulta MD's",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			}
			
		}
		
	}
}

var tamanio=60;
var grados=0;
function rotar(valor){
	if(valor==0){
		grados=grados-90;
		$('#imageModal').css('-webkit-transform','rotate('+grados+'deg)');
	}
	if(valor==1){
		grados=grados+90;
		$('#imageModal').css('-webkit-transform','rotate('+grados+'deg)');
	}
	if(valor==2){ //imagen en posicion inicial
		grados=0;
		$('#imageModal').css('-webkit-transform','rotate('+grados+'deg)');
	}
	if(valor==3){
		if(tamanio<140){
			tamanio=tamanio+20;
		}
		$('#imageModal').css('width',tamanio+'%');
	}
	if(valor==4){
		if(tamanio>60){
			tamanio=tamanio-20;
		}
		$('#imageModal').css('width',tamanio+'%');
	}
}

function fnSubeFoto(){	
	cargaLoading();
	var fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	var fechaAux = new Date().format("yyyy-mm-dd H:MM:ss");
	
	var f ;

			var f ;
			var type = BASE64Upload.split(";")[0].split("/")[1];
			var nom =  MDID + dropTipo.split("-")[0]; 
		
			invocarJSONServiceAction("subeArchivo", 
					{	'tipoServicio': 2,
						'mdId': MDID,
						'nombreArchivo': nom,
						'archivo' : BASE64Upload,
						'formato' :type,
						'tipoArchivo': 1,
						'fecha': fecha,
						'monto': '',
						'acc': ''
					},
					'respSubeArchivo', 
					function() {},
					function() {});
			
			respSubeArchivo = function(data){			
				
				if(data.codigo != 200){	
					cargaMensajeModal('CARGA DE IMAGEN', 'Error al guardar la imagen', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
				} else {
					cargaMensajeModal('CARGA DE IMAGEN', 'Carga de imagen exitoso', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
					url = data.url
					
					switch(dropTipo.split("-")[1]){
					
					case "0" :						
						$("#vistaLateral1MdModal").attr("src", url);
						$("#vistaLateral1MdModal").show();
						$("#0").show();
						$("#subidaLateral1").hide();
						
						$("#fechaVistaLateral1Modal").text(fecha.split(" ")[0]);
						$("#horaVistaLateral1Modal").text(fecha.split(" ")[1]);
						elemMD.imgLateral1 = url;
						elemMD.fechaLateral1 = fechaAux;
						break;
						
					case "1": 
						$("#vistaFrontalMdModal").attr("src", url);
						$("#vistaFrontalMdModal").show();
						$("#1").show();
						$("#subidaFrontal").hide();
						
						$("#fechaVistaFrontalModal").text(fecha.split(" ")[0]);
						$("#horaVistaFrontalModal").text(fecha.split(" ")[1]);
						elemMD.imgFrontal = url;
						elemMD.fechaFrontal = fechaAux;
						break;
						
					case "2": 
						$("#vistaLateral2MdModal").attr("src", url);
						$("#vistaLateral2MdModal").show();
						$("#2").show();
						$("#subidaLateral2").hide();
						
						$("#fechaVistaLateral2Modal").text(fecha.split(" ")[0]);
						$("#horaVistaLateral2Modal").text(fecha.split(" ")[1]);
						elemMD.imgLateral2 = url;
						elemMD.fechaLateral2 = fechaAux;
						break;
						
					case "3": 
						$("#vistaEntorno1MdModal").attr("src", url);
						$("#vistaEntorno1MdModal").show();
						$("#3").show();
						$("#subidaEnt1").hide();
						
						$("#fechaVistaEntorno1Modal").text(fecha.split(" ")[0]);
						$("#horaVistaEntorno1Modal").text(fecha.split(" ")[1]);
						elemMD.imgEnt1 = url;
						elemMD.fechaEnt1 = fechaAux;
						break;
						
					case "4": 
						$("#vistaEntorno2MdModal").attr("src", url);
						$("#vistaEntorno2MdModal").show();
						$("#4").show();
						$("#subidaEnt2").hide();
						
						$("#fechaVistaEntorno2Modal").text(fecha.split(" ")[0]);
						$("#horaVistaEntorno2Modal").text(fecha.split(" ")[1]);
						elemMD.imgEnt2 = url;
						elemMD.fechaEnt2 = fechaAux;
						break;
						
					case "5": 
						$("#vistaEntorno3MdModal").attr("src", url);
						$("#vistaEntorno3MdModal").show();
						$("#5").show();
						$("#subidaEnt3").hide();
						
						$("#fechaVistaEntorno3Modal").text(fecha.split(" ")[0]);
						$("#horaVistaEntorno3Modal").text(fecha.split(" ")[1]);
						elemMD.imgEnt3 = url;
						elemMD.fechaEnt3 = fechaAux;
						break;
						
					case "6": 
						$("#img_predialModal").attr("src", url);
						$("#img_predialModal").show();
						$("#6").show();
						$("#subidaPredial").hide();
						
						$("#fechaVistaPredialModal").text(fecha.split(" ")[0]);
						$("#horaVistaPredialModal").text(fecha.split(" ")[1]);
						elemMD.imgPredial = url;
						elemMD.fechaPredial = fechaAux;
						break;
						
					}
				}
				cierraLoading();
			}		
}



function recalculaTotal(value, tipo){
	if( tipo == 1){
		value.value
		elemMD.frente =  value.value
		elemMD.total = elemMD.frente  * elemMD.fondo;
		$("#tamanioTotalMdModal").html(elemMD.total + " mts<sup>2</sup>");
	} else if( tipo == 2){
		elemMD.fondo =  value.value
		elemMD.total = elemMD.frente  * elemMD.fondo;
		$("#tamanioTotalMdModal").html(elemMD.total + " mts<sup>2</sup>");
	}
}

function guardaFotosMD(){
	invocarJSONServiceAction("guardaSuperficie", 
			{	
				'mdId': MDID,
				'frente': elemMD.frente,
				'fondo': elemMD.fondo,
				'latitud': " ",
				'longitud': " ",
				'imgPredial': elemMD.imgPredial,
				'fechaPredial': elemMD.fechaPredial,
				'imgFrenteId': elemMD.imgFrontal,
				'imgEntorno1Id': elemMD.imgLateral1,
				'imgEntorno2Id': elemMD.imgLateral2,
				'imgEnt1': elemMD.imgEnt1,
				'imgEnt2': elemMD.imgEnt2,
				'imgEnt3': elemMD.imgEnt3,
				'fechaFrente': elemMD.fechaFrontal,
				'fechaEntorno1': elemMD.fechaLateral1, 
				'fechaEntorno2': elemMD.fechaLateral2,
				'fechaEnt1': elemMD.fechaEnt1,
				'fechaEnt2': elemMD.fechaEnt2,
				'fechaEnt3': elemMD.fechaEnt3,
				'numTelefono': " ",
				'versionApp': " ",
				'esquina': elemMD.esquina,
				'drenaje': 0
			},
			'respSubeArchivo', 
			function() {},
			function() {});
	
	respSubeArchivo = function(data){
		
		cierraLoading();
		if(data.codigo != 200){	
			cargaMensajeModal('GUARDAR FOTOS MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		} else {
			cargaMensajeModal('GUARDAR FOTOS MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO,cierraModalFotos);
		}
	}

}

function limpiaModalFotos(){
	$('#esquinaModal').prop('checked', false);
	$('#profundidadMdModal').val("")
	$('#frenteMdModal').val("")
	$('#tamanioTotalMdModal').val("")
	$("#vistaLateral1MdModal").attr("src", "img/cargando_imagen.gif");
	$("#vistaLateral1MdModal").hide();
	$("#0").hide();
	$("#subidaLateral1").show();
	
	$("#fechaVistaLateral1Modal").text("----");
	$("#horaVistaLateral1Modal").text("----");
	 
	$("#vistaFrontalMdModal").attr("src", "img/cargando_imagen.gif");
	$("#vistaFrontalMdModal").hide();
	$("#1").hide();
	$("#subidaFrontal").show();
	
	$("#fechaVistaFrontalModal").text("----");
	$("#horaVistaFrontalModal").text("----");
	 
	$("#vistaLateral2MdModal").attr("src", "img/cargando_imagen.gif");
	$("#vistaLateral2MdModal").hide();
	$("#2").hide();
	$("#subidaLateral2").show();
	
	$("#fechaVistaLateral2Modal").text("----");
	$("#horaVistaLateral2Modal").text("----");
	 
	$("#vistaEntorno1MdModal").attr("src", "img/cargando_imagen.gif");
	$("#vistaEntorno1MdModal").hide();
	$("#3").hide();
	$("#subidaEnt1").show();
	
	$("#fechaVistaEntorno1Modal").text("----");
	$("#horaVistaEntorno1Modal").text("----");
	  
	$("#vistaEntorno2MdModal").attr("src", "img/cargando_imagen.gif");
	$("#vistaEntorno2MdModal").hide();
	$("#4").hide();
	$("#subidaEnt2").show();
	
	$("#fechaVistaEntorno2Modal").text("----");
	$("#horaVistaEntorno2Modal").text("----");
	 
	$("#vistaEntorno3MdModal").attr("src", "img/cargando_imagen.gif");
	$("#vistaEntorno3MdModal").hide();
	$("#5").hide();
	$("#subidaEnt3").show();
	
	$("#fechaVistaEntorno3Modal").text("----");
	$("#horaVistaEntorno3Modal").text("----");
	
	$("#img_predialModal").attr("src", "img/cargando_imagen.gif");
	$("#img_predialModal").hide();
	$("#6").hide();
	$("#subidaPredial").show();
	
	$("#horaVistaPredialModal").text("----");
	$("#horaVistaPredialModal").text("----");
}

function cierraModalFotos(){
	$('#modal_fotos').modal('hide');
}

function verificaCambiosModal(elem){
	if(elem == 1){
		if(JSON.stringify(elemMD) != JSON.stringify(elemMDAux)){
			cargaMensajeModal('GUARDAR FOTOS MD', "Existen cambios sin guardar, ¿Desea continuar?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, limpiaModalFotosSelect);
		}else{
		
		}
	}else if(elem == 0){
		if(JSON.stringify(elemMD) != JSON.stringify(elemMDAux)){
		cargaMensajeModal('GUARDAR FOTOS MD', "Existen cambios sin guardar, ¿Desea continuar?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, cierraModalFotos); 
		}else{
			$('#modal_fotos').modal('hide');
		}
	}
}
