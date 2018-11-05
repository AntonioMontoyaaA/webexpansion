var TIPO_MENSAJE_GRAL = 0;
var TIPO_MENSAJE_JEFE = 99;
var TIPO_MENSAJE_GERENTE = 111;
var TIPO_MENSAJE_EXPANSION = 1;
var TIPO_MENSAJE_GESTORIA = 2;
var TIPO_MENSAJE_CONSTRUCCION = 3;
var TIPO_MENSAJE_OPERACIONES = 5;
var TIPO_MENSAJE_AUDITORIA = 4;
var PARAMETRO;
var VALOR;


var AREA_EXPANSION = 1;
var AREA_GESTORIA = 2;
var AREA_CONSTRUCCION = 3;
var AREA_OPERACIONES = 5;
var AREA_AUDITORIA = 4;
var TIPOMD;

$(function(){
	TIPOMD = $("#tipoMdChat").val();
	
	if(TIPOMD == 0){
		$('#idasignadas').addClass('resaltado');
		$('#titulo_tipo').text('EN PROCESO');
	}else if(TIPOMD == 1){
		$('#idautorizadas').addClass('resaltado');
		$('#titulo_tipo').text('AUTORIZADAS');
	}else if(TIPOMD == 2){
		$('#idrechazadas').addClass('resaltado');
		$('#titulo_tipo').text('RECHAZADAS');
	}else if(TIPOMD == 3){
		$('#idaprobadas').addClass('resaltado');
		$('#titulo_tipo').text('APROBADAS');
	}else if(TIPOMD == 4 || TIPOMD == 5){
		$('#idtablero').addClass('resaltado');
		$('#titulo_tipo').text('TABLERO');
	}
	
	
		$("#titulo_chat").html($("#nombreMdChat").val());
		cargaLista();
		
		//consultaMensaje();
		//escribirMensajes();
});

function cargaLista(){
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
				var lista='<table style="width:100%;">';
				var cont=0;
				
				
				$.each( data.comentarios, function( i, dato ) {
				var clase_globo="";
				var numeroMensajes=0;
					
				if(dato.estatusEvaluacion!=0){
						cont++;
						
						if(dato.numMensajesSum!=undefined){
							if(dato.numMensajesNuevosSum>0){
								numeroMensajes=dato.numMensajesNuevosSum;
								clase_globo="globo";
							}else{
								numeroMensajes=dato.numMensajesSum;
							}
						}
						else{
							if(dato.numMensajesNuevos>0){
								numeroMensajes=dato.numMensajesNuevos;
								clase_globo="globo";
							}else{
								numeroMensajes=dato.numMensajes;
							}
						}
						
						if(cont<10){
							numero='0'+cont;
						}else{
							numero=cont;
						}
						lista=lista+'<tr class="opcion_lista" id="'+dato.estatusId+'" descr="'+dato.estatus+'" onclick="cargaMensajes(this)">';
						lista=lista+'<td class="columna1"><div class="hexa_lista azul negrita opacidad">'+numero+'</div></td>';
						lista=lista+'<td class="columna2"><div class="descr blanco t12 opacidad">'+dato.estatus+'</div></td>';
						lista=lista+'<td class="columna3"><div class="t12 blanco center opacidad '+clase_globo+'" style="margin-right:5px;">'+numeroMensajes+'</div></td>';
						lista=lista+'</tr>';
						
						/*lista=lista+'<div class="opcion_lista" id="'+dato.estatusId+'"><div class="hexa_lista azul float_left opacidad">'+numero+'</div>';
						lista=lista+'<div class="descr blanco float_left opacidad">'+dato.estatus+'</div></div>';*/
					}
				});
				lista=lista+'</table>';
				
				$('#contenedor_lista').html(lista);
				$('#'+PARAMETRO+" td div").removeClass("opacidad");
			} 
		} else {
			cargaMensajeModal('Chat', "Error al obtener los mensajes", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	};
}
function cargaMensajes(valor){
	$('#'+PARAMETRO+" td div").addClass("opacidad");
	VALOR=valor;
	PARAMETRO=valor.id;
	$('#'+PARAMETRO+" td div").removeClass("opacidad");
	invocarJSONServiceAction("obtieneMensajes", 
			{'mdId': $("#mdIdChat").val(),
				'nivelesEstatus':PARAMETRO
			}, 
			'obtieneResponse', 
			function() {	//Funcion de error	
				cierraLoading();
			},
			function() {	//Función al finalizar
				cierraLoading();
			});
	obtieneResponse = function( data ) {	
	if(data.codigo==200) {
		$('#subtitulo_chat').text($(valor).attr('descr'));
		var mensajes='<table style="width:100%;" id="chat_principal_tabla">';
		
		$.each( data.comentarios, function( i, dato ) {
			var url="";
			if(dato.urlImagen==null){
				url="img/perfil_azul.svg";
			}else{
				url=dato.urlImagen;	
			}
				
			if(dato.tipoComentario==3||dato.tipoComentario==5){
				mensajes=mensajes+'<tr class="renglon_chat">';
				mensajes=mensajes+'<td colspan="2"><div class="linea" style="background:#3FB961;"></div><div class="mensajeFloat" style="color:#3FB961;">'+dato.comentario+'</div></td>';
				mensajes=mensajes+'</tr>';	
			}
			else{
					mensajes=mensajes+'<tr class="renglon_chat">';
					mensajes=mensajes+'<td class="imagen_chat"><div class="msj_icono" style="background:url('+url+'); background-size:30px;"></div></td>';
					mensajes=mensajes+'<td class="mensaje_chat">';
						mensajes=mensajes+'<div class="t12 negrita gris">'+dato.area+':'+dato.autor+'</div>';
						mensajes=mensajes+'<div class="t14 azul">'+dato.comentario+'</div>';
						mensajes=mensajes+'<div class="t10 fecha_chat">'+dato.fecha+'</div>';
					mensajes=mensajes+'</td>';
					mensajes=mensajes+'</tr>';
			}
		});
		mensajes=mensajes+'</table>';
		$('#chat_principal').html(mensajes);
		$("#chatSend").addClass("sendDisable");
		$("#chat_principal").animate({ scrollTop: $('#chat_principal').prop("scrollHeight")}, 50);
		$('#chat_principal').scrollTop($('#chat_principal')[0].scrollHeight);
		$('.buscador').show();
		
		if($('#'+PARAMETRO+" td div").hasClass( "globo" )){
			validacionMensajes();
			cargaLista();
		}
	}
	else{
			cargaMensajeModal('Chat', "Error al obtener los mensajes", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	}
}

function validacionMensajes() {
	invocarJSONServiceAction("validacionMensajesAction", 
			{'mdId': $("#mdIdChat").val(), 'nivelEstatusArea': PARAMETRO}, 
			'obtieneResponseValidacion', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});
	obtieneResponseValidacion = function( data ) {	
	};
}

function enviaMensajeChatSend() {
	if($("#chat_input").val() != "") {
		enviaMensaje($("#chat_input").val(), PARAMETRO);
		$("#chat_input").val("");
		$("#chatSend").removeClass("sendDisable");
	} else {
		$("#chatSend").addClass("sendDisable");
	}
}

function enviaMensajeChat(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chat_input").val() != "") {
        enviaMensaje($("#chat_input").val(), PARAMETRO);
        $("#chat_input").val("");
        $("#chatSend").addClass("sendDisable");
    } else if($("#chat_input").val() != "") {
    	$("#chatSend").removeClass("sendDisable");
    } else {
    	$("#chatSend").addClass("sendDisable");
    }
}

function enviaMensaje(comentario, parametro) {
	invocarJSONServiceAction("GuardaMensajeAction", 
			{'mdId': $("#mdIdChat").val(), 'mensaje': comentario, 'tipo': parametro}, 
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
			cargaMensajes(VALOR);
		} else {
			cargaMensajeModal('Chat', "Error al guardar el mensaje", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	};
}

function limpiarChats() {
	$('#chat_principal').text('');
}
// -----------------------------------------------antiguo chat------------------------------------------------------------------
/*function consultaMensaje(){
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
	$('#chat_principal').text('');
	$('#jefe_expansion').text('');
	$('#gerente_expansion').text('');
	$('#expansion').text('');
	$('#gestoria').text('');
	$('#construccion').text('');
	$('#operaciones').text('');
	$('#auditoria').text('');
	$('#finanzas').text('');
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
				
				if(data.areaId != undefined) {
					switch(data.areaId) {
						case AREA_EXPANSION :
							icono='<img src="img/web_expansionc.png">';
							break;
						case AREA_GESTORIA :
							icono='<img src="img/web_gestoriac.png">';
							break;
						case AREA_CONSTRUCCION :
							icono='<img src="img/web_construccionc.png">';
							break;
						case AREA_OPERACIONES :
							icono='<img src="img/web_operacionesc.png">';
							break;
						case AREA_AUDITORIA :
							icono='<img src="img/web_auditoriac.svg" width="29px" height="22px" />';
							break;
					};
				}
				
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%"><span class="negrita">'+data.autor + '</span><br>' + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.autor+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
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
					html=html+'<div class="msj_icono">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.autor+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
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
				
				if(data.areaId != undefined) {
					switch(data.areaId) {
						case AREA_EXPANSION :
							icono='<img src="img/web_expansionc.png">';
							break;
						case AREA_GESTORIA :
							icono='<img src="img/web_gestoriac.png">';
							break;
						case AREA_CONSTRUCCION :
							icono='<img src="img/web_construccionc.png">';
							break;
						case AREA_OPERACIONES :
							icono='<img src="img/web_operacionesc.png">';
							break;
						case AREA_AUDITORIA :
							icono='<img src="img/web_auditoriac.svg" width="29px" height="22px" />';
							break;
					};
				}
				
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.autor + ' ' + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.autor+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
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
					html=html+'<div class="msj_icono">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.autor+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#gerente_expansion').append(html);
				//$("#gerente_expansion").animate({ scrollTop: $('#gerente_expansion').prop("scrollHeight")}, 50);
				//$('#gerente_expansion').scrollTop($('#gerente_expansion')[0].scrollHeight);
			});
		}
		if(mensajes.EXPANSION != undefined && mensajes.EXPANSION.length > 0){ //modulo
			icono='<img src="img/web_expansionc.png">';
			
			$.each(mensajes.EXPANSION, function(i, data) {
				
				if(data.areaId != undefined) {
					switch(data.areaId) {
						case AREA_EXPANSION :
							icono='<img src="img/web_expansionc.png">';
							break;
						case AREA_GESTORIA :
							icono='<img src="img/web_gestoriac.png">';
							break;
						case AREA_CONSTRUCCION :
							icono='<img src="img/web_construccionc.png">';
							break;
						case AREA_OPERACIONES :
							icono='<img src="img/web_operacionesc.png">';
							break;
						case AREA_AUDITORIA :
							icono='<img src="img/web_auditoriac.svg" width="29px" height="22px" />';
							break;
					};
				}
				
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.autor + ' ' + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.autor+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
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
					html=html+'<div class="msj_icono">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.autor+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#expansion').append(html);
				//$("#expansion").animate({ scrollTop: $('#expansion').prop("scrollHeight")}, 50);
				//$('#expansion').scrollTop($('#expansion')[0].scrollHeight);
			});
		}
		if(mensajes.GESTORIA != undefined && mensajes.GESTORIA.length > 0){ //modulo
			icono='<img src="img/web_gestoriac.png">';
			
			$.each(mensajes.GESTORIA, function(i, data) {
				
				if(data.areaId != undefined) {
					switch(data.areaId) {
						case AREA_EXPANSION :
							icono='<img src="img/web_expansionc.png">';
							break;
						case AREA_GESTORIA :
							icono='<img src="img/web_gestoriac.png">';
							break;
						case AREA_CONSTRUCCION :
							icono='<img src="img/web_construccionc.png">';
							break;
						case AREA_OPERACIONES :
							icono='<img src="img/web_operacionesc.png">';
							break;
						case AREA_AUDITORIA :
							icono='<img src="img/web_auditoriac.svg" width="29px" height="22px" />';
							break;
					};
				}
				
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.autor + ' ' + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.autor+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
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
					html=html+'<div class="msj_icono">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.autor+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#gestoria').append(html);
				//$("#gestoria").animate({ scrollTop: $('#gestoria').prop("scrollHeight")}, 50);
				//$('#gestoria').scrollTop($('#gestoria')[0].scrollHeight);
			});
		}
		if(mensajes.CONSTRUCCION != undefined && mensajes.CONSTRUCCION.length > 0){ //modulo
			icono='<img src="img/web_construccionc.png">';
			
			$.each(mensajes.CONSTRUCCION, function(i, data) {
				
				if(data.areaId != undefined) {
					switch(data.areaId) {
						case AREA_EXPANSION :
							icono='<img src="img/web_expansionc.png">';
							break;
						case AREA_GESTORIA :
							icono='<img src="img/web_gestoriac.png">';
							break;
						case AREA_CONSTRUCCION :
							icono='<img src="img/web_construccionc.png">';
							break;
						case AREA_OPERACIONES :
							icono='<img src="img/web_operacionesc.png">';
							break;
						case AREA_AUDITORIA :
							icono='<img src="img/web_auditoriac.svg" width="29px" height="22px" />';
							break;
					};
				}
				
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.autor + ' ' + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.autor+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
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
					html=html+'<div class="msj_icono">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.autor+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#construccion').append(html);
				//$("#construccion").animate({ scrollTop: $('#construccion').prop("scrollHeight")}, 50);
				//$('#construccion').scrollTop($('#construccion')[0].scrollHeight);
			});
		}
		if(mensajes.OPERACIONES != undefined && mensajes.OPERACIONES.length > 0){ //modulo
			icono='<img src="img/web_operacionesc.png">';
			
			$.each(mensajes.OPERACIONES, function(i, data) {
				
				if(data.areaId != undefined) {
					switch(data.areaId) {
						case AREA_EXPANSION :
							icono='<img src="img/web_expansionc.png">';
							break;
						case AREA_GESTORIA :
							icono='<img src="img/web_gestoriac.png">';
							break;
						case AREA_CONSTRUCCION :
							icono='<img src="img/web_construccionc.png">';
							break;
						case AREA_OPERACIONES :
							icono='<img src="img/web_operacionesc.png">';
							break;
						case AREA_AUDITORIA :
							icono='<img src="img/web_auditoriac.svg" width="29px" height="22px" />';
							break;
					};
				}
				
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.autor + ' ' + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.autor+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
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
					html=html+'<div class="msj_icono">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.autor+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#operaciones').append(html);
				//$("#operaciones").animate({ scrollTop: $('#operaciones').prop("scrollHeight")}, 50);
				//$('#operaciones').scrollTop($('#operaciones')[0].scrollHeight);
			});
		}
		if(mensajes.AUDITORIA != undefined && mensajes.AUDITORIA.length > 0){ //modulo
			icono='<img src="img/web_auditoriac.png">';
			
			$.each(mensajes.AUDITORIA, function(i, data) {
				
				if(data.areaId != undefined) {
					switch(data.areaId) {
						case AREA_EXPANSION :
							icono='<img src="img/web_expansionc.png">';
							break;
						case AREA_GESTORIA :
							icono='<img src="img/web_gestoriac.png">';
							break;
						case AREA_CONSTRUCCION :
							icono='<img src="img/web_construccionc.png">';
							break;
						case AREA_OPERACIONES :
							icono='<img src="img/web_operacionesc.png">';
							break;
						case AREA_AUDITORIA :
							icono='<img src="img/web_auditoriac.svg" width="29px" height="22px" />';
							break;
					};
				}
				
				html="";
				html=html+'<div class="row msj_bloque">';
				
				if(data.tipoComentario == 3) {
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_evento" style="width:91%">'+data.autor + ' ' + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				} else if(data.usuarioId != $("#usuarioLogin").val())  {
					var pantalla = "En pantalla ";
					if(data.nombreFactor != undefined && data.nombreFactor != null && data.nombreFactor != "null") {
						pantalla += data.nombreFactor + ": ";
					} else {
						pantalla = "";
					}
					html=html+'<div class="msj_icono">'+icono+'</div>';
					html=html+'<div class="msj_texto azul mensaje_recibido"><font class="area">'+data.autor+'</font><br>' + pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
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
					html=html+'<div class="msj_icono">&nbsp;</div>';
					html=html+'<div class="msj_texto azul mensaje_enviado" style="width: 50%"><font class="area">'+ data.autor+'</font><br>'+  pantalla + data.comentario+'<br><span style="font-size: 9px;">' + data.fecha + '</span></div>';
				}
				html=html+'</div>';
				$('#auditoria').append(html);
				//$("#operaciones").animate({ scrollTop: $('#operaciones').prop("scrollHeight")}, 50);
				//$('#auditoria').scrollTop($('#auditoria')[0].scrollHeight);
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
                        		data.autor + '</font><br>'+ data.comentario +'</div>'+
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
                        		data.autor +'</font><br>'+ data.comentario +'</div>'+
            						'<div class="hora azul">'+
                            		data.fecha +'</div>'+
                                '</div>' +
                      '</li>';
        }
    	
    //	$('#chat').append(control).scrollTop($('#chat').prop('scrollHeight'));
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
        $("#chatJefeSend").addClass("sendDisable");
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
        $("#chatGerenteSend").addClass("sendDisable");
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
        $("#chatExpansionSend").addClass("sendDisable");
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
        $("#chatGestoriaSend").addClass("sendDisable");
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
        $("#chatConstruccionSend").addClass("sendDisable");
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
        $("#chatOperacionesSend").addClass("sendDisable");
    } else if($("#chatOperaciones").val() != "") {
    	$("#chatOperacionesSend").removeClass("sendDisable");
    } else {
    	$("#chatOperacionesSend").addClass("sendDisable");
    }
}

function enviaMensajeAuditoriaSend() {
	if($("#chatAuditoria").val() != "") {
		enviaMensaje($("#chatAuditoria").val(), TIPO_MENSAJE_AUDITORIA);
		$("#chatAuditoria").val("");
		$("#chatAuditoriaSend").removeClass("sendDisable");
	} else {
		$("#chatAuditoriaSend").addClass("sendDisable");
	}
}

function enviaMensajeAuditoria(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);
	
    if (keycode == '13' && $("#chatAuditoria").val() != "") {
        enviaMensaje($("#chatAuditoria").val(), TIPO_MENSAJE_AUDITORIA);
        $("#chatAuditoria").val("");
        $("#chatAuditoriaSend").addClass("sendDisable");
    } else if($("#chatAuditoria").val() != "") {
    	$("#chatAuditoriaSend").removeClass("sendDisable");
    } else {
    	$("#chatAuditoriaSend").addClass("sendDisable");
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
	cargaMensajes(valor);
}
*/

function buscador() {
if($('#chat_buscador')!=null){
  var input, filter, table, tr, td, i;
  
  input = document.getElementById("chat_buscador");
  filter = input.value.toUpperCase();
  table = document.getElementById("chat_principal_tabla");
  tr = table.getElementsByTagName("tr");
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
	}
}
