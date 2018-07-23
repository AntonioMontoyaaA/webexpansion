$('#hexa_user').click(function(){
	console.log("hizo clic user");
	$('#user').focus();
});
$('#hexa_pass').click(function(){
	console.log("hizo clic pass");
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
		console.log($('#user').val());
        return false;
    }
	if ($('#pass').val() == '') {
        return false;
    }
	
}