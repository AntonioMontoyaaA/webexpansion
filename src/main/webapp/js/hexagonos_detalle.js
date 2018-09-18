function pintaFlujo(data){
	var arreglo=data.areasAutorizadas;
	var html="";
		html='<div class="contenedor_boton fazul"><button class="btn atras" type="button" onclick="history.back()" style="margin: 0"></button></div>';

		for(var i=0; i<arreglo.length; i++){
			html=html+'<div class="contenedor_hexa">';
			html=html+'<div class="hexa_activo">'+i+'</div>';
			html=html+'</div>';
		}
		$('#flujo').html(html);
}