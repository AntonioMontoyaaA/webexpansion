$(function(){
		$('#idasignadas').addClass('resaltado'); //para el efecto de header
		consultaMensaje();
		escribirMensajes();
					
});

function consultaMensaje(){
	invocarJSONServiceAction("MensajeHistorialAction", 
			{'mdId': '0'}, 
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
		console.log(data);
	if(data.codigo == 404){
		console.log("*** ENTRA A ERROR ***");	
	}
	if(data.codigo==200) {
		console.log("*** ENTRA A DATOS ***");
	}
};
}

function escribirMensajes(){
	$('#datos_sitio').text('');
	$('#datos_prop').text('');
	$('#superficie').text('');
	$('#zonificacion').text('');
	$('#generalidades_sitio').text('');
	$('#flujo_peatonal').text('');
	 resetChat();

	
	
	var datos = [ 
		 {"hora": "15/05/18 09:00", "quien": 1, "areaId": 1, "area": "Expansión", "modulo": 1, "mensaje": "Favor de mejorar la informacion de datos del sitio ya que no es precisa"}, 
		 {"hora": "15/05/18 10:00", "quien": 0, "areaId": 3, "area": "Contrucción", "modulo": 1, "mensaje": "La informacion de datos del sitio sigue sin ser exacta, favor de corregir"}, 
		 {"hora": "15/05/18 13:00", "quien": 0, "areaId": 2, "area": "Gestoría", "modulo": 3, "mensaje": "la superficie del local es poco exacta, favor de escribir metros y centimetros"},
		 {"hora": "15/05/18 15:30", "quien": 0, "areaId": 4, "area": "Operaciones", "modulo": 2, "mensaje": "verificar los datos del propietario"},
		 {"hora": "15/05/18 15:35", "quien": 1, "areaId": 1, "area": "Expansión", "modulo": 2, "mensaje": "nombre del propietario incorrecto"},
		 {"hora": "15/05/18 16:00", "quien": 0, "areaId": 2, "area": "Gestoría", "modulo": 2, "mensaje": "escribir correctamente la informacion del propietario"},
		 {"hora": "15/05/18 16:03", "quien": 1, "areaId": 3, "area": "Contrucción", "modulo": 2, "mensaje": "verificar informacion"}
		 ];
	
	$.each(datos, function(i, data) {
	var areaId=data.areaId;
	var area=data.area;
	var modulo=data.modulo;
	var mensaje=data.mensaje;
	var quien=data.quien;
	var hora=data.hora;
		
	insertChat(area,quien, mensaje, hora);  
	
	if(areaId==1){ //areaId
		icono='<img src="img/web_expansionc.png">';
	}
	if(areaId==2){ //areaId
		icono='<img src="img/web_gestoriac.png">';
	}
	if(areaId==3){ //areaId
		icono='<img src="img/web_construccionc.png">';
	}
	if(areaId==4){ //areaId
		icono='<img src="img/web_operacionesc.png">';
	}
	
	if(modulo==1){ //modulo
		html="";
		html=html+'<div class="row msj_bloque">';
		html=html+'<div class="msj_icono">'+icono+'</div>';
		html=html+'<div class="msj_texto blanco"><font class="area">'+area+'</font><br>'+mensaje+'</div>';
		html=html+'</div>';
		
		$('#datos_sitio').append(html);
	}
	if(modulo==2){ //modulo
		html="";
		html=html+'<div class="row msj_bloque">';
		html=html+'<div class="msj_icono">'+icono+'</div>';
		html=html+'<div class="msj_texto blanco"><font class="area">'+area+'</font><br>'+mensaje+'</div>';
		html=html+'</div>';
		$('#datos_prop').append(html);	
	}
	if(modulo==3){ //modulo
		html="";
		html=html+'<div class="row msj_bloque">';
		html=html+'<div class="msj_icono">'+icono+'</div>';
		html=html+'<div class="msj_texto azul"><font class="area">'+area+'</font><br>'+mensaje+'</div>';
		html=html+'</div>';
		$('#superficie').append(html);
	}
	if(modulo==4){ //modulo
		html="";
		html=html+'<div class="row msj_bloque">';
		html=html+'<div class="msj_icono">'+icono+'</div>';
		html=html+'<div class="msj_texto azul"><font class="area">'+area+'</font><br>'+mensaje+'</div>';
		html=html+'</div>';
		$('#zonificacion').append(html);
	}
	if(modulo==5){ //modulo
		html="";
		html=html+'<div class="row msj_bloque">';
		html=html+'<div class="msj_icono">'+icono+'</div>';
		html=html+'<div class="msj_texto azul"><font class="area">'+area+'</font><br>'+mensaje+'</div>';
		html=html+'</div>';
		$('#construccion').append(html);
	}
	if(modulo==6){ //modulo
		html="";
		html=html+'<div class="row msj_bloque">';
		html=html+'<div class="msj_icono">'+icono+'</div>';
		html=html+'<div class="msj_texto blanco"><font class="area">'+area+'</font><br>'+mensaje+'</div>';
		html=html+'</div>';
		$('#generalidades_sitio').append(html);
	}
	if(modulo==7){ //modulo
		html="";
		html=html+'<div class="row msj_bloque">';
		html=html+'<div class="msj_icono">'+icono+'</div>';
		html=html+'<div class="msj_texto blanco"><font class="area">'+area+'</font><br>'+mensaje+'</div>';
		html=html+'</div>';
		$('#flujo_peatonal').append(html);
	}

	});
}

// INSERT CHAT ----------------------------------         
function insertChat(area, who, text, date){
    var control = "";
    if (who == 0){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                            '<div class="text-l">' +
                    		'<div class="texto_chat azul"><font class="area">'+
                    		area+'</font><br>'+text+'</div>'+
                    		'<div class="hora azul">'+
                    		date+'</div>'+
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text-r">' +
                            '<div class="texto_chat azul"><font class="area">'+
                    		area+'</font><br>'+text+'</div>'+
        						'<div class="hora azul">'+
                        		date+'</div>'+
                            '</div>' +
                  '</li>';
    }
$('#chat').append(control).scrollTop($('#chat').prop('scrollHeight'));
}
// RESET CHAT -----------------------------------
function resetChat(){
    $('#chat').empty();
}


