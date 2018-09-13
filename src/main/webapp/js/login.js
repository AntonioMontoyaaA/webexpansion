var reestablecePass = false;

$(function(){
	if($('#respuesta').val()=='error'){
		
		$('.inicio_user').hide();
		$('.inicio_pass').hide();
		
		$('.inicio_user2').show();
		$('.inicio_pass2').show();
		
		$('.mensajeerror').show();	
	}	
});

function olvidaPass(){
	reestablecePass = false;
	$("#tokenLabel").hide();
	$("#tokenText").hide();
	$("#tokenText").val('');
	$('#idusuario').val('');
	$('#mensaje').text('');
	$('#idusuario').removeClass("dato_faltante");
	$('#idusuario').focus();
	$('#informacion').hide();
	$('#cajas').show();
	$('#modalPass').modal('show');
}
function recuperaPass() {
	$('#mensaje').text('');
	
	if(!reestablecePass) {
		if($('#idusuario').val()!="") {
			$('#idusuario').removeClass("dato_faltante");
				$.ajax({
					type     : "POST",
					url      : 'recuperaPassAction',
					data     : {
						'usuario': $('#idusuario').val()
					},
					async	 : false,
					beforeSend : function(){
						$("#loadingPagina").modal('show');
					},
					success  : function(data) {
						$("#loadingPagina").modal('hide');
		        	
						if(data.codigo != 200) {
							$('#idusuario').val(''); 
							$('#mensaje').text("Ocurrio un error: "+data.mensaje );
							$('#informacion').show();
						} else {
							//$('#cajas').hide();
							//$('#mensaje').text(data.mensaje);
							//$('#informacion').show();
							$('#idusuario').attr('readonly', true);
							$("#tokenLabel").show();
							$("#tokenText").show();
							$("#tokenBoton").text("Reestablecer");
							reestablecePass = true;
						}
					}
				});
		} else {
			$('#idusuario').addClass("dato_faltante");
		}
	} else if(reestablecePass) {
		if($('#idclave').val()!="") {
			$('#idclave').removeClass("dato_faltante");
				$.ajax({
					type     : "POST",
					url      : 'reestablecePassAction',
					data     : {
						'usuario': $('#idusuario').val(),
						'token': $('#idclave').val()
					},
					async	 : false,
					beforeSend : function(){
						$("#loadingPagina").modal('show');
					},
					success  : function(data) {
						$("#loadingPagina").modal('hide');
		        	
						if(data.codigo != 200) {
							$('#idclave').val(''); 
							$('#mensaje').text("Ocurrio un error: "+data.mensaje );
							$('#informacion').show();
						} else {
							$('#cajas').hide();
							$('#mensaje').text(data.mensaje);
							$('#informacion').show();
							$('#idusuario').attr('readonly', false);
						}
					}
				});
		} else {
			$('#idclave').addClass("dato_faltante");
		}
	}
}


$(document).ready(function(){   
    var inputs = $("form :text"),
    length = inputs.length,
    i = 0;

    inputs.on("keydown", function(event) {
        var code = event.keyCode || event.which; 
        if (code == 9) {
            event.preventDefault();
            $('#login_submit').submit();
        }
    });
});

$('#hexa_user').click(function(){
	$('#user').focus();
});
$('#hexa_pass').click(function(){
	$('#pass').focus();
});

function ocultauser(){
if($('.inicio_user').is(":visible")){
	$('.inicio_user').fadeOut('fast');
	setTimeout(muestrauser,200);
}
}
function muestrauser(){
	$('.inicio_user2').fadeIn('fast');
	$('#user').focus();
}
function ocultapass(){
if($('.inicio_pass').is(":visible")){
	$('.inicio_pass').fadeOut('fast');
	setTimeout(muestrapass,200)
	}
}
function muestrapass(){
	$('.inicio_pass2').fadeIn('fast');
	$('#pass').focus();
}

function validacion(){
	
	if ($('#user').val()== '') {
		$('#user_pass').click();
        return false;
    }
	if ($('#pass').val() == '') {
		$('#hexa_pass').click();
        return false;
    }

}
function entrar_boton(){
	$('#login_submit').submit();
}