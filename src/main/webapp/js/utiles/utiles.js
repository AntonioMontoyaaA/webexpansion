var TIPO_MENSAJE_ACEPTAR	= 0;
var TIPO_MENSAJE_SI_NO		= 1;

var TIPO_ESTATUS_ERROR		= 0;
var TIPO_ESTATUS_ALERTA		= 1;
var TIPO_ESTATUS_EXITO		= 2;

var funcionEvalSi			= "";

$(function(){
	actionsPerfiles();
	consultaNotificaciones();
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
		if (respuesta.codigo == 501) {
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
		 content:function(){
			 return  notificaciones;
		 },
		 html:true
	 });
	 
	$('.popover-dismiss').popover({
		  trigger: 'focus'
	});
}
function salir(){
	console.log("entro");
	$('#logout').submit();
}

var notificaciones="";
function consultaNotificaciones(){
	 
	 invocarJSONServiceAction("notificacionesAction", 
				{'tipoNotificacion':2}, 
				'cargaNotificaciones', 
				function() {
					//cierraLoading();
				},
				function() {
					//cierraLoading();
				});
	 cargaNotificaciones = function(data) {
			if(data.codigo != 200){
				
			}else{
				var noti=data.notificaciones;
				
				notificaciones="";
				notificaciones+="<div>";
				notificaciones+="<div class='t12 negrita azul titulo_avisos'>Avisos</div>";
				notificaciones+="<div class='t12 negrita azul avisos'>";
				var positivo=0;
				
				if(noti.length>0){
				for(var i=0;i<noti.length;i++){
					var estatus= noti[i].estatus;
					
					if(estatus==1){
						notificaciones+="<div mdId='"+noti[i].mdId+"' tipoNotificacion='"+noti[i].tipoNotificacion+
						"' fechaRegistro='"+noti[i].fechaRegistro+"' nivelEstatusAreaId='"+noti[i].nivelEstatusAreaId+
						"' nombreSitio='"+noti[i].nombreSitio+
						"' class='t12 leido cursor' style='font-weight:normal' onclick='marca_notificacion(this)'><span>"+
						noti[i].mensaje+"</span><span class='t10'>&emsp;"+noti[i].fechaRegistro+"</span></div>";
					}
					else{
						positivo++;
						notificaciones+="<div mdId='"+noti[i].mdId+"' tipoNotificacion='"+noti[i].tipoNotificacion+
						"' fechaRegistro='"+noti[i].fechaRegistro+"' nivelEstatusAreaId='"+noti[i].nivelEstatusAreaId+
						"' nombreSitio='"+noti[i].nombreSitio+
						"' class='t12 noleido cursor' style='font-weight:normal' onclick='marca_notificacion(this)'><span>"+
						noti[i].mensaje+"</span><span class='t10'>&emsp;"+noti[i].fechaRegistro+"</span></div>";
					}
					
				}
				}
				else{
					notificaciones+="<div class='t12 leido cursor' style='font-weight:normal;'><span>No existen avisos nuevos</span></div>";
				}
				notificaciones+="</div>";
				notificaciones+="</div>";
				
				if(positivo>0){
					$('#alerta_circulo').text(positivo);
					$('#alerta_circulo').show();
				}
				else{
					$('#alerta_circulo').hide();
				}
			}
			}
}
function marca_notificacion(valor){
	
	var id=$(valor).attr('mdId');
	var tipoNotificacion=$(valor).attr('tipoNotificacion');
	var fechaRegistro=$(valor).attr('fechaRegistro');
	var nivelEstatusAreaId=$(valor).attr('nivelEstatusAreaId');
	var nombreSitio=$(valor).attr('nombreSitio');

	invocarJSONServiceAction("marcaNotificacionAction",
			{'mdId':id,
			 'tipoNotificacion':tipoNotificacion,
			 'fecha':fechaRegistro,
			 'nivelEstatusArea':nivelEstatusAreaId
			 },
			'marcaNotificacion', 
				function() {
					cierraLoading();
				},
				function() {
					cierraLoading();
				});

		marcaNotificacion = function( data ) {
			if(data.codigo != 200){
				console.log("error "+data.mensaje+" mensaje");
			}
			else{
				console.log("ok "+data.mensaje+" mensaje");
		}
		}
		
		
	/*if(tipoNotificacion==1){
		$("#nombreMd").val(nombreSitio);
		$("#mdId").val(id);
		$("#detalleMemoriaAsignadaAction").submit();
	}*/
	if(tipoNotificacion==1||tipoNotificacion==2||tipoNotificacion==4){
		$("#mdIdChat").val(id);
		$("#chatPorMd").submit();
	}
	else{
		consultaNotificaciones();
	}
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
	
	if(imgUser === imgUserInit){
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
		
		console.log(data);
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
	}else
	if (regexpEmail.test(value.value) !== true ){
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
		506 - CAMBIAR ESTATUS MD*/
		if(value.value=="PRIVILEGIO.MENU.VOKSE.501=true"){
			console.log(value.value);
			$('#descargaExcelTablero').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.502=true"){
			console.log(value.value);
			$('#time').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.503=true"){
			console.log(value.value);
			$('#edit').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.504=true"){
			console.log(value.value);
			$('#pause').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.505=true"){
			console.log(value.value);
			$('#refuse').removeClass('sin_permiso');
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.506=true"){
			console.log(value.value);
			$('#change').removeClass('sin_permiso');
		}		
	});
}
