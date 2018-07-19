$(function(){
	
	consultaLinea();
});
function consultaLinea(){
	
	invocarJSONServiceAction("lineaTiempoMdAction", 
			{'mdId': $('#mdId').val()}, 
			'obtieneLinea', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneLinea = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('LINEA DE TIEMPO ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
			inicializaGrantt(data);
		
		}
	}
}
function reformat(fecha){
	nuevafecha=fecha.substring(6,10)+"-"+fecha.substring(3,5)+"-"+fecha.substring(0,2);
	return nuevafecha;
}

function inicializaGrantt(datos){
	var data=datos.detalleSeguimiento;
	
	function stopEvent(event) {
		event.preventDefault();
		event.stopPropagation();
	}
	
	var fecha_inicioMd=data[0].fechaInicial.substring(0,10);
	var fecha_finalMd;
	
	if(data[data.length-1].fechaFinal!=""){
		fecha_finalMd=data[data.length-1].fechaFinal.substring(0,10);
	}
	else{
		fecha_finalMd=data[data.length-1].fechaRealEstimada.substring(0,10);
	}
	
	
	fecha_inicioMd=reformat(fecha_inicioMd);
	fecha_finalMd=reformat(fecha_finalMd);
	
	var task=new Array();	
	tasks = [
		{
			    id: $('#mdId').val(),
			    name: $('#nombreMd').val(),
			    start: fecha_inicioMd,
			    end: fecha_finalMd,
			    progress: 100
			   
	  }];
	
	for(var i=0;i<data.length;i++){
		var fechafinal_formato;
		
		var fechafinal=data[i].fechaFinal.substring(0,10);
		var fechareal=data[i].fechaRealEstimada.substring(0,10);
		var color="verde";	
		
		var date_fechafinal=new Date(reformat(fechafinal));
		var date_fechareal=new Date(reformat(fechareal));
	
		
		if(data[i].fechaFinal!=""){
			fechafinal_formato=reformat(fechafinal);
		}
		else{
			fechafinal_formato=reformat(fechareal);
		}
		
		if(date_fechafinal > date_fechareal)
			color="rojo";	
		
		cadena={
				 id: data[i].nivelEstatusArea,
				name: data[i].nivelEstatusArea+" -  &nbsp; "+data[i].duracion+" días",
				start: reformat(data[i].fechaInicial.substring(0,10)),	
				end: fechafinal_formato,
				progress: '0',
				dependencies:data[i].estatusDependencia,
				custom_class: "accion "+color
				};
				
				tasks.push(cadena);
	}
	 
	var gantt = new Gantt("#gantt", tasks, {
	    header_height: 45, //alto de cabecera (dias, meses)
	    column_width: 30, //?
	    step: 24,
	    view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
	    bar_height: 25,
	    bar_corner_radius: 2,
	    arrow_curve: 3,
	    padding: 15,
	    view_mode: 'Day',   
	    date_format: 'DD/MM/YYYY',
	    on_view_change: function() {
			var bars = document.querySelectorAll("#gantt" + " .bar-group");
			for (var i = 0; i < bars.length; i++) {
				bars[i].addEventListener("mousedown", stopEvent, true);
			}
			var handles = document.querySelectorAll("#gantt" + " .handle-group");
			for (var i = 0; i < handles.length; i++) {
				handles[i].remove();
			}
		},
	});

	$('.accion').click(function(){
		var index;
		var nombre = $(this).attr('data-id');
		
		for(var i=0;i<data.length;i++){
			
			if(data[i].nivelEstatusArea==nombre){
				index=i;
			}
		}
		
		var responsable=data[index].responsable;
		var estatus=data[index].estatus;
		var duracion=data[index].duracion;
		var motivo="";
		if(motivo.length>1){
			motivo=data[index].motivo[motivo.length-1];
		}
		var completados=data[index].completados;
		var faltantes=data[index].faltantes;
		var fechainicial=data[index].fechaInicial;
		var fechareal=data[index].fechaRealEstimada;
		var fechafinal=data[index].fechaFinal;
		var dependencia=data[index].dependencia;
		var progres_int=data[index].progreso;
		
		
		$('#responsable').val(responsable);
		$('#estatus').val(estatus);
		$('#duracion').val(duracion);
		$('#motivo').val(motivo);
		$('#completados').val(completados);
		$('#faltantes').val(faltantes);
		$('#fechainicial').val(fechainicial);
		$('#fechareal').val(fechareal);
		$('#fechafinal').val(fechafinal);
		$('#dependencia').val(dependencia);
		$('#progres_int').css('width',progres_int);
		$('#porcentaje').text(progres_int);
		$('#nombrepuesto').text(nombre);
		
		if(data[index].permisoEditar==1){
			$('.cuadroeditar').show();
		}
		else{
			$('.cuadroeditar').hide();
		}
		
		llenacombo(datos.estatus);
	});
	
	$('.cuadroeditar').click(function(){
		$('.cuadroguardar').show();
		$('.cuadrocancelar').show();
		$('.cuadroeditar').hide();
		$('.grupo').removeAttr("readonly");	
		$('#estatus').hide();
		$('#combo_estatus').show();
		
		
		
		
	});
	$('.cuadroguardar').click(function(){
		guardar(datos);
		
		$('.cuadroguardar').hide();
		$('.cuadrocancelar').hide();
		$('.cuadroeditar').show();
		
	});
	$('.cuadrocancelar').click(function(){
		$('.grupo').attr("readonly",true);
		$('#combo_estatus').hide();
		$('#estatus').show();
		
		
		
		$('.cuadroguardar').hide();
		$('.cuadrocancelar').hide();
		$('.cuadroeditar').show();
	});
}

function llenacombo(estatus){
	html="";
	var valor=$('#estatus').val();	
	
	$('#combo_estatus').text('');
	
	for(var i=0;i<estatus.length;i++){
	var activo="";
		if(valor==estatus[i].estatus){
			activo="selected";
		}
		html=html+'<option '+activo+' value="'+estatus[i].id+'">'+estatus[i].estatus+'</option>';
	}
	$('#combo_estatus').append(html);
	
}
function guardar(datos){
	
}