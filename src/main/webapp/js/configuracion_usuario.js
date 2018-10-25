$(function(){
		$('#idconfiguracion').addClass('resaltado'); //resalta en el header
		
});

function activa(valor){
	$('.boton_sup').removeClass('activo');
	
	if(valor.id=="boton_sup_perfiles"){
		$(valor).addClass('activo');
		$("#confPerfiles").submit();
	}
}