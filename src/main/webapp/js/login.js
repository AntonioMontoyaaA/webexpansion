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
	$('#idusuario').val(''); 
	$('#informacion').hide();
	$('#modalPass').modal('show');
}
function recuperaPass(){
	if($('#idusuario').val()!=""){
	
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
		    			$('#cajas').hide();
		    			$('#mensaje').text(data.mensaje);
		    			$('#informacion').show();
		    		}
		        }
		      
		 });
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