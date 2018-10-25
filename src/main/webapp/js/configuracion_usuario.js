var ARREGLO_USUARIOS; //variable global
$(function(){
		$('#idconfiguracion').addClass('resaltado'); //resalta en el header
		cargafiltros(); //funcion inicial
		initTablaUsuarios('DivTabla', 0, 'tabla');
});

function activa(valor){
    $('.boton_sup').removeClass('activo');
    
    if(valor.id=="boton_sup_perfiles"){
        $(valor).addClass('activo');
        $("#confPerfiles").submit();
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
		if($('#filtros_cont').css('display') == 'block'){
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
function seleccionEvento(){
		if($('#campo_estatus').css('display') == 'none'){
			$('#campo_estatus').css('display','block');
		}else{
			$('#campo_estatus').css('display','none');
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
		var html="";
		$.each( data.radios, function( i, dato ) {
			 html=html+'<option value="'+dato.areaId+'">'+dato.area+'</option>';
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
			}
			if($('#campo_idUsuario').val()!=""){
				usrBuscaId=$('#campo_idUsuario').val();
			}		
		buscaUsuarios(areaId, puestoId, estatus, usrBuscaId);
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
		} else {
			ARREGLO_USUARIOS=data.salida;
			var resultados = data.salida;		
			var datos = new Array();
			for( var i = 0 ; i < resultados.length; i++){
				
				datos[i] = new Array();	 	 		 			 
				datos[i][0] = resultados[i].usuarioId; 
				datos[i][1] = resultados[i].usuario; 
				datos[i][2] = resultados[i].area; 
				datos[i][3] = resultados[i].puesto;
				datos[i][4] = resultados[i].estatus; 
				datos[i][5] = i; 				
			 }
			
			 initTablaUsuarios('DivTabla', datos, 'tabla');
			
			 
			$("#tabla tr td").click(function() {
				var posicion=$(this).parent().find("td:eq(5)").html();
				mostrarDetalle(posicion);
			});
			
		}
	};	
}
function mostrarDetalle(posicion){	
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
		if(resultados[i].estatusPerfil==1){
			datos[i][2] = '<label class="switch"><input id="'+resultados[i].perfilId+'" type="checkbox" checked><span class="slider round"></span></label>'; 
		}else{
			datos[i][2] = '<label class="switch"><input type="checkbox"><span class="slider round"></span></label>'; 
		}
		
	 }
	 initTablaUsuarios_Perfiles('DivTablaPerfiles', datos, 'tablaPerfiles');

	$('.bloque1').css('display', 'none');
	$('.bloque2').css('display', 'block');
	 $("#tablaPerfiles").dataTable().fnFilter('');//para actualizar la tabla y ajustar el tamaño
}

function ejecutaBuscador() {
	$("#tabla").dataTable().fnFilter($("#buscador").val());
}

