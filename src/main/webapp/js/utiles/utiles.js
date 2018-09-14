var TIPO_MENSAJE_ACEPTAR	= 0;
var TIPO_MENSAJE_SI_NO		= 1;

var TIPO_ESTATUS_ERROR		= 0;
var TIPO_ESTATUS_ALERTA		= 1;
var TIPO_ESTATUS_EXITO		= 2;

var funcionEvalSi			= "";

$(function(){
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
	cargaMensajeModal("ERROR", "La sesión ha caducado", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
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
	año = f.getFullYear();
	minutos=f.getMinutes();
	horas=f.getHours();
	
	if(minutos<10){
		minutos='0'+minutos;
	}
	if(horas<10){
		horas='0'+horas;
	}
	
	fecha_header=dia+' de '+mes+' del '+año+' '+horas+':'+minutos+' hrs';
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
