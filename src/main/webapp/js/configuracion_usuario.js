var ARREGLO_USUARIOS; //variable global
var ARREGLO_AREAS;

$(function(){
		$('#idconfiguracion').addClass('resaltado'); //resalta en el header
		cargafiltros(); //funcion inicial
		initTablaUsuarios('DivTabla', 0, 'tabla');
		cargaAsignarPerfiles();
});

function activa(valor){
    $('.boton_sup').removeClass('activo');
    
    if(valor.id=="boton_sup_perfiles"){
        $(valor).addClass('activo');
        $("#confPerfiles").submit();
    }
    if(valor.id=="boton_sup_usuario"){
		$(valor).addClass('activo');
		$("#confUsuario").submit();
	}
}

function mostrarfiltros(){
	
	if( $(window).width() < 768){
		$('#usuarios_cont').css('width', '100%');
		$('#filtros_cont').css('width', '100%');
		$('#nuevo_usuario').css('width', '100%');
		
		if($('#usuarios_cont').css('display') == 'block'){
			$('#filtros_cont').show();
			$('#usuarios_cont').hide();
		}
		else if($('#nuevo_usuario').css('display') == 'block'){
			$('#nuevo_usuario').hide();
			$('#filtros_cont').show();
		}
		else{
			$('#usuarios_cont').show();
			$('#filtros_cont').hide();	
		}
	}else{
		if($('#nuevo_usuario').css('display') == 'block'){
			$('#nuevo_usuario').hide();
			$('#usuarios_cont').show();
		}
		if($('#filtros_cont').css('display') == 'block'){
			$('#filtros_cont').hide();
			$('#usuarios_cont').show();
			$('#usuarios_cont').css('width', '100%');
		}
		else{
			$('#usuarios_cont').css('width', 'calc(100% - 475px)');
			$('#filtros_cont').css('width', '474px');
			$('#filtros_cont').show();
		}
	}
	$("#tabla").dataTable().fnFilter('');//para actualizar la tabla y ajustar el tamaño
}
function mostrarNuevoUsuario(){
	if( $(window).width() < 768){
		$('#usuarios_cont').css('width', '100%');
		$('#nuevo_usuario').css('width', '100%');
		
		
		if($('#usuarios_cont').css('display') == 'block'){
			$('#nuevo_usuario').show();
			$('#usuarios_cont').hide();
		}
		else if($('#filtros_cont').css('display') == 'block'){
			$('#filtros_cont').hide();
			$('#nuevo_usuario').show();
		}
		else{
			$('#usuarios_cont').show();
			$('#nuevo_usuario').hide();
		}
	}else{
		if($('#filtros_cont').css('display') == 'block'){
			$('#filtros_cont').css('display','none');
			$('#usuarios_cont').show();
		}
		if($('#nuevo_usuario').css('display') == 'block'){
			$('#nuevo_usuario').hide();
			$('#usuarios_cont').show();
			$('#usuarios_cont').css('width', '100%');
		}
		else{
			$('#usuarios_cont').css('width', 'calc(100% - 475px)');
			$('#nuevo_usuario').css('width', '474px');
			$('#nuevo_usuario').show();
		}
	}
	$("#tabla").dataTable().fnFilter(''); //para actualizar la tabla y ajustar el tamaño
}
function mostrarAsignar(){
	$('.seleccion_usuario img').css('display','none');
	$('.seleccion_usuario div').css('background-color','white');
	$('.seleccion_usuario').removeClass('activado');
	
	$('.seleccion_perfil img').css('display','none');
	$('.seleccion_perfil div').css('background-color','white');
	$('.seleccion_perfil').removeClass('activado');
	
	
	if($('.bloque3').css('display') == 'none'){
		$('.contenedor_botones_superiores').hide();
		$('.bloque1').hide();
		$('.bloque2').hide();
		$('.bloque3').show();
		
		$("#tablaAsignarUsuarios").dataTable().fnFilter(''); //para actualizar las medidas de la tabla (largo de columnas)
		$("#tablaAsignarPerfiles").dataTable().fnFilter(''); //para actualizar las medidas de la tabla (largo de columnas)
	
	}else{
		$('.contenedor_botones_superiores').hide();
		$('.bloque1').show();
		$('.bloque3').hide();
	}
}
function seleccionEvento(){
		if($('#campo_estatus').css('display') == 'none'){
			$('#campo_estatus').css('display','block');
			$('.caja').css('background-color','#40BCD8');
		}else{
			$('#campo_estatus').css('display','none');
			$('.caja').css('background-color','white');
		}
}

function seleccionCheck(valor){
	if($('#'+valor.id+' img').css('display') == 'none'){
		$('#'+valor.id+' img').css('display','block');
		$('#'+valor.id +' div').css('background-color','#40BCD8');
		$('#'+valor.id).addClass('activado');
		
	}else{
		$('#'+valor.id+' img').css('display','none');
		$('#'+valor.id +' div').css('background-color','white');
		$('#'+valor.id).removeClass('activado');
	}
}

function cargafiltros(){
	invocarJSONServiceAction("cargaFiltrosAction", {}, 'obtieneResponse', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});

	obtieneResponse = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('CONFIGURACION', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	}
	if(data.codigo==200){
		ARREGLO_AREAS=data.radios;
		
		var html="";
		$.each( data.radios, function( i, dato ) {
			 html=html+'<option value="'+i+'">'+dato.area+'</option>';
		});
		$('#campo_area').html(html);
		$('#nuevo_area').html(html);
		
		
		var opcion=$('#campo_area').val();
		var html="";
		
		 html=html+'<option value=null>Selecciona un puesto..</option>';
		$.each( data.radios[opcion].puesto, function( i, dato ) {
			 html=html+'<option value="'+i+'">'+dato.puesto+'</option>';
		});
		$('#campo_puesto').html(html);
		$('#nuevo_puesto').html(html);
	}
	
	$('#campo_area').change(function() {
		var opcion=$('#campo_area').val();
		var html="";
		
		 html=html+'<option value=null>Selecciona un puesto..</option>';
		$.each( data.radios[opcion].puesto, function( i, dato ) {
			 html=html+'<option value="'+i+'">'+dato.puesto+'</option>';
		});
		$('#campo_puesto').html(html);
	});
	
	$('#nuevo_area').change(function() {
		var opcion=$('#nuevo_area').val();
		var html="";
		
		 html=html+'<option value=null>Selecciona un puesto..</option>';
		$.each( data.radios[opcion].puesto, function( i, dato ) {
			 html=html+'<option value="'+i+'">'+dato.puesto+'</option>';
		});
		$('#nuevo_puesto').html(html);
	});
	
	 $('#boton_consultar').on('click', function(){
		var puestoId=0;
		var areaId=0;
		var usrBuscaId=0;
		var estatus=0;	

			if($('#campo_area').val()!=null){
				areaId=data.radios[$('#campo_area').val()].areaId;
			}
			if($('#campo_puesto').val()!="null" && $('#campo_puesto').val()!=null){
				puestoId=data.radios[$('#campo_area').val()].puesto[$('#campo_puesto').val()].puestoId;
			}
			if($('#campo_estatus').css('display')=='block'){
				estatus=1;
			}else{
				estatus=0;
			}
			if($('#campo_idUsuario').val()!=""){
				usrBuscaId=$('#campo_idUsuario').val();
			}		
		buscaUsuarios(areaId, puestoId, estatus, usrBuscaId);
		mostrarfiltros();
	});
};}


function buscaUsuarios(areaId, puestoId, estatus, usrBuscaId){
	invocarJSONServiceAction("buscaUsuariosPerfiles", {
		'puestoId':puestoId,
		'areaId':areaId,
		'usrBuscaId':usrBuscaId,
		'estatus':estatus,
	}, 
				'responseUserList', 
				function() {
					//Funcion de error
					cierraLoading();
				},
				function() {
					//Función al finalizar			
					cierraLoading();
				});
	responseUserList = function( data ) {
		if(data.codigo != 200) {
			cargaMensajeModal('CONFIGURACION', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			initTablaUsuarios('DivTabla', 0, 'tabla');
			initTablaAsignarUsuarios('DivTablaAsignarUsuarios', 0, 'tablaAsignarUsuarios');

		} else {
			ARREGLO_USUARIOS=data.salida;
			var resultados = data.salida;		
			var datos = new Array();
			for( var i = 0 ; i < resultados.length; i++){// datos para tabla Usuarios
				datos[i] = new Array();	 	 		 			 
				datos[i][0] = resultados[i].usuarioId; 
				datos[i][1] = resultados[i].usuario; 
				datos[i][2] = resultados[i].area; 
				datos[i][3] = resultados[i].puesto;
				if(resultados[i].estatus==1){
				datos[i][4] = "Activo"; 
				}else{
				datos[i][4] = "Inactivo"; 
				}			
				datos[i][5] = i; 				
			 }
			initTablaUsuarios('DivTabla', datos, 'tabla');
			
			var datosTablaAsignarUsuarios = new Array();
			for( var i = 0 ; i < resultados.length; i++){// datos para tabla Usuarios
				datosTablaAsignarUsuarios[i] = new Array();	 	 		 			 
				datosTablaAsignarUsuarios[i][0] = '<div class="seleccion_usuario cursor" id="'+resultados[i].usuarioId+'" onclick="seleccionCheck(this)" style="margin-top:5px;">'+
				'<div class="caja float_left" style="border: 1px solid #c9c9c9; width:16px; height:16px;"><img src="img/check.png" style="display:none;">'+
				'</div></div>';
				datosTablaAsignarUsuarios[i][1] = resultados[i].usuarioId; 
				datosTablaAsignarUsuarios[i][2] = resultados[i].usuario; 
				datosTablaAsignarUsuarios[i][3] = resultados[i].area; 
				datosTablaAsignarUsuarios[i][4] = resultados[i].puesto;			
			 }
			initTablaAsignarUsuarios('DivTablaAsignarUsuarios', datosTablaAsignarUsuarios, 'tablaAsignarUsuarios');
			
			if(resultados.length>0){
				$("#asignar").show();
			}else{
				$("#asignar").hide();
			}
					 
			$("#tabla tr td").click(function() {
				var posicion=$(this).parent().find("td:eq(5)").html();
				mostrarDetalle(posicion);
			});
			
			
		}
	};	
}
function mostrarDetalle(posicion){	
	$('#UsuarioId').val(ARREGLO_USUARIOS[posicion].usuarioId);
	$('#nombreusuario').html(ARREGLO_USUARIOS[posicion].usuario);
	$('#areausuario').html(ARREGLO_USUARIOS[posicion].area);
	$('#no_perfiles').html(ARREGLO_USUARIOS[posicion].numPerfiles);
	$('#ultima_mod').html(ARREGLO_USUARIOS[posicion].ultimaModificacion);
	
	if(ARREGLO_USUARIOS[posicion].imagen !=undefined && ARREGLO_USUARIOS[posicion].imagen != null && ARREGLO_USUARIOS[posicion].imagen != "null"){
		$('#imagenusuario').html('<img class="circulo_imagen" style="position: initial; background: white;" src="'+ARREGLO_USUARIOS[posicion].imagen+'">');
	}
	else{
		$('#imagenusuario').html('<img class="circulo_imagen" style="position: initial; background: white;" src="img/perfil_azul.svg">');
	}
	
	var datos = new Array();
	var resultados = ARREGLO_USUARIOS[posicion].perfiles;	
	
	for( var i = 0 ; i < resultados.length; i++){
		datos[i] = new Array();	 	 		 			 
		datos[i][0] = resultados[i].nombrePerfil; 
		datos[i][1] = resultados[i].descPerfil; 
		datos[i][2] = '<label class="switch"><input class="switch_perfil" id="'+resultados[i].perfilId+'_id'+'" type="checkbox"><span class="slider round"></span></label>'; 
		
	 }
	 initTablaUsuarios_Perfiles('DivTablaPerfiles', datos, 'tablaPerfiles');
	
	 for( var i = 0 ; i < resultados.length; i++){
		 if(resultados[i].estatusPerfil==1){
			 $('#'+resultados[i].perfilId+'_id').prop("checked",true);	
			 
		 }
	 }
	 
	$('.bloque1').css('display', 'none');
	$('.bloque2').css('display', 'block');
	 $("#tablaPerfiles").dataTable().fnFilter('');//para actualizar la tabla y ajustar el tamaño
}

function validaCamposOcultos(){
	if($('#nuevo_puesto').val()!="null" && $('#nuevo_puesto').val()!=null && $('#nuevo_puesto').val()!=undefined){
		var puestoId=ARREGLO_AREAS[$('#nuevo_area').val()].puesto[$('#nuevo_puesto').val()].puestoId;
		
		invocarJSONServiceAction("validaPuestoJefeAction", {
			'puestoId': puestoId
		}, 
					'respuestaPuestoJefe', 
					function() {
						//Funcion de error
						cierraLoading();
					},
					function() {
						//Función al finalizar			
						cierraLoading();
					});
			respuestaPuestoJefe = function( data ) {
			if(data.codigo != 200) {
				cargaMensajeModal('CONFIGURACION', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			} else {
				if(data.jefesUsuario.length>0){
					 var html="";
					 html=html+'<option value=null>Selecciona un Jefe.. </option>';
					$.each( data.jefesUsuario, function( i, dato ) {
						 html=html+'<option value="'+dato.jefeUsuarioId+'">'+dato.nombreUsuario+'</option>';
					});
					$('#nuevo_jefe').html(html);
				}
			}
			};	
			if(puestoId==2 || puestoId==3 || puestoId==11){
				$('.nuevo_imei').show();	
				if(puestoId==2 || puestoId==3){
					$('.nuevo_jefe').show();
					$('.nuevo_fotoFueraRadio').show();
					$('.nuevo_conteoFueraRadio').show();	
				}
			}
			else{
				$('.nuevo_jefe').hide();
				$('.nuevo_imei').hide();
				$('.nuevo_fotoFueraRadio').hide();
				$('.nuevo_conteoFueraRadio').hide();
			}	
	}
}

function nuevoUsuario(){
	var nuevo_fotoFueraRadio=0;
	var nuevo_conteoFueraRadio=0;
	var nuevo_tipoUsuario=0;
	
	if($('#nuevo_fotoFueraRadio').prop("checked")){
		nuevo_fotoFueraRadio=1;
	}
	if($('#nuevo_conteoFueraRadio').prop("checked")){
		nuevo_conteoFueraRadio=1;
	}
	if($('#nuevo_tipoUsuario').prop("checked")){
		nuevo_tipoUsuario=1;
	}
	
	
	
	if($('#nuevo_noempleado').val()!="" && $('#nuevo_nombre').val()!="" &&
			$('#nuevo_appat').val()!="" && $('#nuevo_apmat').val()!=""&&
			$('#nuevo_puesto').val()!="null" && $('#nuevo_telefono').val()!="" &&
			$('#nuevo_email').val()!=""){
			
		var puestoId=ARREGLO_AREAS[$('#nuevo_area').val()].puesto[$('#nuevo_puesto').val()].puestoId;
		
					if(puestoId==2 || puestoId==3){
						if($('#nuevo_imei').val()!="null" && $('#nuevo_jefe').val()!="null"){
					
						invocarJSONServiceAction("nuevoUsuarioAction", {
								'usrCrearId':$('#nuevo_noempleado').val(),
								'puestoId':puestoId,
								'nombre':$('#nuevo_nombre').val(),
								'apellidoPaterno':$('#nuevo_appat').val(),
								'apellidoMaterno':$('#nuevo_apmat').val(),
								'correo':$('#nuevo_email').val(),
								'numTelefono':$('#nuevo_telefono').val(),
								'tipoEmpleado':nuevo_tipoUsuario,
								'usuariosJefe':$('#nuevo_jefe').val(),
								'imei':$('#nuevo_imei').val(),
								'fotoFueraRadio':nuevo_fotoFueraRadio,
								'conteoFueraRadio':nuevo_conteoFueraRadio,
							}, 
							'responseNuevoUsuario', 
							function() {
								cierraLoading();
							},
							function() {
								cierraLoading();
							});
						}
					}
					else if(puestoId==11){
						if($('#nuevo_imei').val()!="null"){
						
						invocarJSONServiceAction("nuevoUsuarioAction", {
							'usrCrearId':$('#nuevo_noempleado').val(),
							'puestoId':puestoId,
							'nombre':$('#nuevo_nombre').val(),
							'apellidoPaterno':$('#nuevo_appat').val(),
							'apellidoMaterno':$('#nuevo_apmat').val(),
							'correo':$('#nuevo_email').val(),
							'numTelefono':$('#nuevo_telefono').val(),
							'tipoEmpleado':nuevo_tipoUsuario,
							'imei':$('#nuevo_imei').val(),
						}, 
						'responseNuevoUsuario', 
						function() {
							cierraLoading();
						},
						function() {
							cierraLoading();
						});
					}
					}else{
						
						invocarJSONServiceAction("nuevoUsuarioAction", {
							'usrCrearId':$('#nuevo_noempleado').val(),
							'puestoId':puestoId,
							'nombre':$('#nuevo_nombre').val(),
							'apellidoPaterno':$('#nuevo_appat').val(),
							'apellidoMaterno':$('#nuevo_apmat').val(),
							'correo':$('#nuevo_email').val(),
							'numTelefono':$('#nuevo_telefono').val(),
							'tipoEmpleado':nuevo_tipoUsuario,
						}, 
						'responseNuevoUsuario', 
						function() {
							cierraLoading();
						},
						function() {
							cierraLoading();
						});
				}
	
		responseNuevoUsuario = function( data ) {
		if(data.codigo != 200) {
			cargaMensajeModal('CONFIGURACION', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		} else {
			cargaMensajeModal('CONFIGURACION', 'Usuario creado correctamente', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
			$('#nuevo_noempleado').val('');
			$('#nuevo_area').removeAttr('selected').find('option:first').attr('selected', 'selected');
			$('#nuevo_puesto').removeAttr('selected').find('option:first').attr('selected', 'selected');
			$('#nuevo_nombre').val(''),
			$('#nuevo_appat').val(''),
			$('#nuevo_apmat').val(''),
			$('#nuevo_email').val(''),
			$('#nuevo_telefono').val(''),
			$('#nuevo_tipoUsuario').prop('checked',false),
			$('#nuevo_jefe').removeAttr('selected').find('option:first').attr('selected', 'selected');
			$('#nuevo_imei').val(''),
			$('#nuevo_fotoFueraRadio').prop('checked',false),
			$('#nuevo_conteoFueraRadio').prop('checked',false)
		}
	};	
	}
}
//funcion para cargar la lista de perfiles para ASIGNAR
function cargaAsignarPerfiles(){
	
		invocarJSONServiceAction("listaPerfilesAction", '', 
					'respuestaPerfilesAction', 
					function() {
						//Funcion de error
						cierraLoading();
					},
					function() {
						//Función al finalizar			
						cierraLoading();
					});

		respuestaPerfilesAction = function( data ) {
			if(data.codigo != 200) {
				cargaMensajeModal('CONFIGURACION', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
				initTablaAsignarPerfiles('DivTablaAsignarPerfiles', 0, 'tablaAsignarPerfiles');
			} else {
				var resultados = data.perfiles;		
				var datos = new Array();
				for( var i = 0 ; i < resultados.length; i++){
					datos[i] = new Array();	 	 		 			 
					datos[i][0] = '<div class="seleccion_perfil cursor" id="'+resultados[i].perfilId+'" onclick="seleccionCheck(this)" style="margin-top:5px;">'+
					'<div class="caja float_left" style="border: 1px solid #c9c9c9; width:16px; height:16px;"><img src="img/check.png" style="display:none;">'+
					'</div></div>';
					datos[i][1] = resultados[i].perfilId; 
					datos[i][2] = resultados[i].nombrePerfil+ " ("+resultados[i].descripcion+") "; 
					
				 }
				initTablaAsignarPerfiles('DivTablaAsignarPerfiles', datos, 'tablaAsignarPerfiles');
						 
				$("#tabla tr td").click(function() {
					var posicion=$(this).parent().find("td:eq(5)").html();
					mostrarDetalle(posicion);
				});
				
			}
		};	
	}
function actualizaAsignacion(){
	var perfiles="";
	var usuarios="";
	
	$.each($(".seleccion_perfil.activado"),function(i, value){  
		if(i==0){
			perfiles=value.id;
		}else{
		perfiles=perfiles+","+value.id;
		}
		
	});
	$.each($(".seleccion_usuario.activado"),function(i, value){  
		if(i==0){
			usuarios=value.id;
		}else{
		usuarios=usuarios+","+value.id;
		}
	});
	
	if(perfiles!="" && usuarios!=""){
		//console.log("perfiles "+perfiles + " usuarios "+usuarios);
	invocarJSONServiceAction("asignarUsuarioPerfilAction", 
			{'perfilIds': perfiles,
			'usrsActualizaPerfil': usuarios}, 
			'respuestaPerfilesAction', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar			
				cierraLoading();
			});

respuestaPerfilesAction = function( data ) {
	if(data.codigo != 200) {
		cargaMensajeModal('CONFIGURACION', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	} else {
		cargaMensajeModal('CONFIGURACION', "Perfiles asignados correctamente", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
		mostrarAsignar();
		$('#boton_consultar').click();
		
		}
	}
	}else{
		if(perfiles==""){
		cargaMensajeModal('CONFIGURACION', "No se ha seleccinado un perfil", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
		else{
		cargaMensajeModal('CONFIGURACION', "No se ha seleccinado un usuario", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	}
}

function guardaActualizacionPerfiles(){
	var estatus="";
	var perfilId="";
	var array = new Array();
	
	$.each($(".switch_perfil"),function(i, value){  
		var info = new Object();
		
		if($('#'+value.id).is( ":checked" )){
			cadena=value.id.split('_');
			info.perfilId = cadena[0];
		    info.estatus = "1";
		   
		}else{
			cadena=value.id.split('_');
			info.perfilId = cadena[0];
		    info.estatus = "0";
		}
		array.push(info);
	});
	var json = JSON.stringify(array);
	invocarJSONServiceAction("editarPerfilesUsuarioAction", 
			{'perfiles': json,
			'usrActualizarId': $('#UsuarioId').val()
			}, 
			'respuestaeditarPerfiles', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar			
				cierraLoading();
			});

	respuestaeditarPerfiles = function( data ) {
	if(data.codigo != 200) {
		cargaMensajeModal('CONFIGURACION', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	} else {
		cargaMensajeModal('CONFIGURACION', "Perfiles actualizados correctamente", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
		$('#boton_consultar').click();
	}
}
	
}

function ejecutaBuscador() {
	$("#tabla").dataTable().fnFilter($("#buscador").val());
}
function ejecutaBuscadorPerfiles() {
	$("#tablaAsignarPerfiles").dataTable().fnFilter($("#buscadorPerfiles").val());
}
function ejecutaBuscadorUsuarios() {
	$("#tablaAsignarUsuarios").dataTable().fnFilter($("#buscadorUsuarios").val());
}
function ejecutaBuscadorDetalle() {
	$("#tablaPerfiles").dataTable().fnFilter($("#buscadorDetalle").val());
}
function atras(){
	$('.contenedor_botones_superiores').show();
	$('.bloque1').show();
	$('.bloque2').hide();
	$('.bloque3').hide();
	$("#tabla").dataTable().fnFilter($("#buscador").val());
	
}
