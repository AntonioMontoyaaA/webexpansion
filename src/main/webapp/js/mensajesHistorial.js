var TIPO_MENSAJE_GRAL = 0;
var TIPO_MENSAJE_JEFE = 110;
var TIPO_MENSAJE_GERENTE = 111;
var TIPO_MENSAJE_EXPANSION = 1;
var TIPO_MENSAJE_GESTORIA = 2;
var TIPO_MENSAJE_CONSTRUCCION = 3;
var TIPO_MENSAJE_OPERACIONES = 5;

$(function(){
		$('#idasignadas').addClass('resaltado'); //para el efecto de header
		consultaMensaje();
		escribirMensajes();
});

function consultaMensaje(){
	invocarJSONServiceAction("MensajeHistorialAction", 
			{'mdId': $("#mdIdChat").val()}, 
			'obtieneResponse', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});
	obtieneResponse = function( data ) {	
		if(data.codigo==200) {
			if(data.comentarios != undefined) {
				escribirMensajes(data.comentarios);
			} else {
				limpiarChats();
			}
		} else {
			cargaMensajeModal('Chat', "Error al obtener los mensajes", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
};
}

function limpiarChats() {
	$('#jefe_expansion').text('');
	$('#gerente_expansion').text('');
	$('#expansion').text('');
	$('#gestoria').text('');
	$('#construccion').text('');
	$('#operaciones').text('');
	 resetChat();
}

function escribirMensajes(mensajes){
	limpiarChats();
	
	if(mensajes != undefined) {
		if(mensajes.GENERAL != undefined && mensajes.GENERAL.length > 0) {
			insertChat(mensajes.GENERAL, $("#usuarioLogin").val());
		}
		
		if(mensajes.JEFE != undefined && mensajes.JEFE.length > 0){ //modulo
			icono='<img src="img/web_gerenteExpansionc.png">';
			
			$.each(mensajes.JEFE, function(i, data) {
				
				/*if(mensajes.JEFE.areaId == "JEFE EXPANSION"){ //areaId
					icono='<img src="img/web_expansionc.png">';
				}
				if(areaId==2){ //areaId
					icono='<img src="img/web_gestoriac.png">';
				}
				if(areaId==3){ //areaId
					icono='<img src="img/web_construccionc.png">';
				}
				if(areaId==4){ //areaId
					icono='<img src="img/web_operacionesc.png">';*/
				
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.puesto+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor == "null") {
						pantalla += data.nombreFactor + ": ";
					}
					html=html+'<div class="msj_icono" style="width: 50%">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.puesto+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#jefe_expansion').append(html);
				//$("#jefe_expansion").animate({ scrollTop: $('#jefe_expansion').prop("scrollHeight")}, 50);
				$('#jefe_expansion').scrollTop($('#jefe_expansion')[0].scrollHeight);
			});
		}
		if(mensajes.GERENTE != undefined && mensajes.GERENTE.length > 0){ //modulo
			icono='<img src="img/web_gerenteExpansionc.png">';
			
			$.each(mensajes.GERENTE, function(i, data) {
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.puesto+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor == "null") {
						pantalla += data.nombreFactor + ": ";
					}
					html=html+'<div class="msj_icono" style="width: 50%">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.puesto+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#gerente_expansion').append(html);
				//$("#gerente_expansion").animate({ scrollTop: $('#gerente_expansion').prop("scrollHeight")}, 50);
				$('#gerente_expansion').scrollTop($('#gerente_expansion')[0].scrollHeight);
			});
		}
		if(mensajes.EXPANSION != undefined && mensajes.EXPANSION.length > 0){ //modulo
			icono='<img src="img/web_expansionc.png">';
			
			$.each(mensajes.EXPANSION, function(i, data) {
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.puesto+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor == "null") {
						pantalla += data.nombreFactor + ": ";
					}
					html=html+'<div class="msj_icono" style="width: 50%">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.puesto+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#expansion').append(html);
				//$("#expansion").animate({ scrollTop: $('#expansion').prop("scrollHeight")}, 50);
				$('#expansion').scrollTop($('#expansion')[0].scrollHeight);
			});
		}
		if(mensajes.GESTORIA != undefined && mensajes.GESTORIA.length > 0){ //modulo
			icono='<img src="img/web_gestoriac.png">';
			
			$.each(mensajes.GESTORIA, function(i, data) {
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.puesto+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor == "null") {
						pantalla += data.nombreFactor + ": ";
					}
					html=html+'<div class="msj_icono" style="width: 50%">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.puesto+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#gestoria').append(html);
				//$("#gestoria").animate({ scrollTop: $('#gestoria').prop("scrollHeight")}, 50);
				$('#gestoria').scrollTop($('#gestoria')[0].scrollHeight);
			});
		}
		if(mensajes.CONSTRUCCION != undefined && mensajes.CONSTRUCCION.length > 0){ //modulo
			icono='<img src="img/web_construccionc.png">';
			
			$.each(mensajes.CONSTRUCCION, function(i, data) {
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.puesto+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor == "null") {
						pantalla += data.nombreFactor + ": ";
					}
					html=html+'<div class="msj_icono" style="width: 50%">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.puesto+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#construccion').append(html);
				//$("#construccion").animate({ scrollTop: $('#construccion').prop("scrollHeight")}, 50);
				$('#construccion').scrollTop($('#construccion')[0].scrollHeight);
			});
		}
		if(mensajes.OPERACIONES != undefined && mensajes.OPERACIONES.length > 0){ //modulo
			icono='<img src="img/web_operacionesc.png">';
			
			$.each(mensajes.OPERACIONES, function(i, data) {
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.puesto+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor == "null") {
						pantalla += data.nombreFactor + ": ";
					}
					html=html+'<div class="msj_icono" style="width: 50%">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.puesto+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#operaciones').append(html);
				//$("#operaciones").animate({ scrollTop: $('#operaciones').prop("scrollHeight")}, 50);
				$('#operaciones').scrollTop($('#operaciones')[0].scrollHeight);
			});
		}
	}
}

// INSERT CHAT ----------------------------------         
function insertChat(mensajes, usuario){
    var control = "";
    
    $.each(mensajes, function(i, data) {
    	if (data.usuarioId != usuario){
            control = '<li style="width:100%">' +
                            '<div class="msj macro">' +
                                '<div class="text-l">' +
                        		'<div class="texto_chat azul"><font class="area">'+
                        		data.puesto + '</font><br>'+ data.comentario +'</div>'+
                        		'<div class="hora azul">'+
                        		data.fecha +'</div>'+
                                '</div>' +
                            '</div>' +
                        '</li>';                    
        }else{
            control = '<li style="width:100%;">' +
                            '<div class="msj-rta macro">' +
                                '<div class="text-r">' +
                                '<div class="texto_chat azul"><font class="area">'+
                        		data.puesto +'</font><br>'+ data.comentario +'</div>'+
            						'<div class="hora azul">'+
                            		data.fecha +'</div>'+
                                '</div>' +
                      '</li>';
        }
    	
    	$('#chat').append(control).scrollTop($('#chat').prop('scrollHeight'));
    });
}
// RESET CHAT -----------------------------------
function resetChat(){
    $('#chat').empty();
}

function enviaMensajeGralSend() {
	if($("#chatGral").val() != "") {
		enviaMensaje($("#chatGral").val(), TIPO_MENSAJE_GRAL);
		$("#chatGral").val("");
		$("#chatGralSend").removeClass("sendDisable");
	} else {
		$("#chatGralSend").addClass("sendDisable");
	}
}

function enviaMensajeGral(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chatGral").val() != "") {
        enviaMensaje($("#chatGral").val(), TIPO_MENSAJE_GRAL);
        $("#chatGral").val("");
    } else if($("#chatGral").val() != "") {
    	$("#chatGralSend").removeClass("sendDisable");
    } else {
    	$("#chatGralSend").addClass("sendDisable");
    }
}

function enviaMensajeJefeSend() {
	if($("#chatJefe").val() != "") {
		enviaMensaje($("#chatJefe").val(), TIPO_MENSAJE_JEFE);
		$("#chatJefe").val("");
		$("#chatJefeSend").removeClass("sendDisable");
	} else {
		$("#chatJefeSend").addClass("sendDisable");
	}
}

function enviaMensajeJefe(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chatJefe").val() != "") {
        enviaMensaje($("#chatJefe").val(), TIPO_MENSAJE_JEFE);
        $("#chatJefe").val("");
    } else if($("#chatJefe").val() != "") {
    	$("#chatJefeSend").removeClass("sendDisable");
    } else {
    	$("#chatJefeSend").addClass("sendDisable");
    }
}

function enviaMensajeGerenteSend() {
	if($("#chatGerente").val() != "") {
		enviaMensaje($("#chatGerente").val(), TIPO_MENSAJE_GERENTE);
		$("#chatGerente").val("");
		$("#chatGerenteSend").removeClass("sendDisable");
	} else {
		$("#chatGerenteSend").addClass("sendDisable");
	}
}

function enviaMensajeGerente(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chatGerente").val() != "") {
        enviaMensaje($("#chatGerente").val(), TIPO_MENSAJE_GERENTE);
        $("#chatGerente").val("");
    } else if($("#chatGerente").val() != "") {
    	$("#chatGerenteSend").removeClass("sendDisable");
    } else {
    	$("#chatGerenteSend").addClass("sendDisable");
    }
}

function enviaMensajeExpansionSend() {
	if($("#chatExpansion").val() != "") {
		enviaMensaje($("#chatExpansion").val(), TIPO_MENSAJE_EXPANSION);
		$("#chatExpansion").val("");
		$("#chatExpansionSend").removeClass("sendDisable");
	} else {
		$("#chatExpansionSend").addClass("sendDisable");
	}
}

function enviaMensajeExpansion(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chatExpansion").val() != "") {
        enviaMensaje($("#chatExpansion").val(), TIPO_MENSAJE_EXPANSION);
        $("#chatExpansion").val("");
    } else if($("#chatExpansion").val() != "") {
    	$("#chatExpansionSend").removeClass("sendDisable");
    } else {
    	$("#chatExpansionSend").addClass("sendDisable");
    }
}

function enviaMensajeGestoriaSend() {
	if($("#chatGestoria").val() != "") {
		enviaMensaje($("#chatGestoria").val(), TIPO_MENSAJE_GESTORIA);
		$("#chatGestoria").val("");
		$("#chatGestoriaSend").removeClass("sendDisable");
	} else {
		$("#chatGestoriaSend").addClass("sendDisable");
	}
}

function enviaMensajeGestoria(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chatGestoria").val() != "") {
        enviaMensaje($("#chatGestoria").val(), TIPO_MENSAJE_GESTORIA);
        $("#chatGestoria").val("");
    } else if($("#chatGestoria").val() != "") {
    	$("#chatGestoriaSend").removeClass("sendDisable");
    } else {
    	$("#chatGestoriaSend").addClass("sendDisable");
    }
}

function enviaMensajeConstruccionSend() {
	if($("#chatConstruccion").val() != "") {
		enviaMensaje($("#chatConstruccion").val(), TIPO_MENSAJE_CONSTRUCCION);
		$("#chatConstruccion").val("");
		$("#chatConstruccionSend").removeClass("sendDisable");
	} else {
		$("#chatConstruccionSend").addClass("sendDisable");
	}
}

function enviaMensajeConstruccion(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chatConstruccion").val() != "") {
        enviaMensaje($("#chatConstruccion").val(), TIPO_MENSAJE_CONSTRUCCION);
        $("#chatConstruccion").val("");
    } else if($("#chatConstruccion").val() != "") {
    	$("#chatConstruccionSend").removeClass("sendDisable");
    } else {
    	$("#chatConstruccionSend").addClass("sendDisable");
    }
}

function enviaMensajeOperacionesSend() {
	if($("#chatOperaciones").val() != "") {
		enviaMensaje($("#chatOperaciones").val(), TIPO_MENSAJE_OPERACIONES);
		$("#chatOperaciones").val("");
		$("#chatOperacionesSend").removeClass("sendDisable");
	} else {
		$("#chatOperacionesSend").addClass("sendDisable");
	}
}

function enviaMensajeOperaciones(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chatOperaciones").val() != "") {
        enviaMensaje($("#chatOperaciones").val(), TIPO_MENSAJE_OPERACIONES);
        $("#chatOperaciones").val("");
    } else if($("#chatOperaciones").val() != "") {
    	$("#chatOperacionesSend").removeClass("sendDisable");
    } else {
    	$("#chatOperacionesSend").addClass("sendDisable");
    }
}

function enviaMensaje(comentario, tipo) {
	invocarJSONServiceAction("GuardaMensajeAction", 
			{'mdId': $("#mdIdChat").val(), 'mensaje': comentario, 'tipo': tipo}, 
			'obtieneResponse', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});
	obtieneResponse = function( data ) {	
		if(data.codigo==200) {
			limpiarChats();
			consultaMensaje();
		} else {
			cargaMensajeModal('Chat', "Error al guardar el mensaje", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	};
}


