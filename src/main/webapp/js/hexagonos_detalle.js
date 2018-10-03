var seleccionado=0;
function pintaFlujo(data){
	var arreglo=data.areasAutorizadas;
	var html="";
	
	if(arreglo.length<21){
		var size=100/arreglo.length;
		var size_total=size*arreglo.length;
	}
	else{
		var size_total=4*arreglo.length;
		var size=100/arreglo.length;	
	}
		html=html+'<div id="contenedor_int" style="width:'+(size*arreglo.length)+'%">';
		html=html+'<div class="linea"></div>';	
		for(var i=0; i<arreglo.length; i++){
			var num=0;
			if(i<9){
				num='0'+(i+1)
			}
			else{
				num=i+1;
			}
			
			var cadena=Object.keys(arreglo[i]);
			var estatusValidacion=arreglo[i][cadena[0]][0].estatusValidacion;
			
			if(estatusValidacion==1){
				html=html+'<div class="contenedor_hexa" style="width:'+size+'%">';
				html=html+'<div id="proceso_'+i+'"  class="hexa activo cursor">'+num+'</div>';
				html=html+'</div>';	
			}
			else{
				html=html+'<div class="contenedor_hexa" style="width:'+size+'%">';
				html=html+'<div id="proceso_'+i+'" class="hexa desactivado">'+num+'</div>';
				html=html+'</div>';	
			}	
		}
		html=html+'</div>';
		$('#flujo').html(html);
	
			   $('.activo').click(function(){
			      var division=$(this).attr('id').split('_');
			      var dato_buscar=division[1];
			      
			      var cadena=Object.keys(arreglo[dato_buscar]);
			      var diasVencidos=arreglo[dato_buscar][cadena[0]][0].diasVencidos;
			      var estatusValidacion=arreglo[dato_buscar][cadena[0]][0].estatusValidacion;
			      var fechaAutorizacion=arreglo[dato_buscar][cadena[0]][0].fechaAutorizacion;
			      var fechaLimite=arreglo[dato_buscar][cadena[0]][0].fechaLimite;
			      var nombre=arreglo[dato_buscar][cadena[0]][0].nombre;
			      var dias;
			      
			      if(diasVencidos < 0)
			    	  dias = 'A ' + (diasVencidos * -1) + ' días de vencer';
			      else if(diasVencidos == 0)
			    	  dias = 'En tiempo';
			      else if(diasVencidos > 0)
			    	  dias = ' ' + diasVencidos + ' días después';
			      
			     
			      $('.info1').text('Autorizó');
			      $('.dato1').text(nombre);
			      if(dato_buscar==0){
			    	  $('.info2').text('Fecha de creación');
			      }else{
			    	  $('.info2').text('Fecha de autorización');
			      }
			      $('.dato2').text(fechaAutorizacion);
			      $('.info3').text('Fecha límite');
			      $('.dato3').text(fechaLimite);
			      $('.info4').text('Días vencidos');
			      $('.dato4').text(dias);
			      
			      $('#titulo_proceso').text(cadena);
			      $('#modal_flujo').modal('show');
			   });


}
function muestra_proceso(valor){
	seleccionado=$(valor).attr('id');
	console.log('seleccionado'+ seleccionado);
}