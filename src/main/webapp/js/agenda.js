$(function(){
	$('#idagenda').addClass('resaltado');
	inicializaCalendarios();
	calculaFechaActual();
	llenaPersonal();
	llenaEventos();
	
});

var mes;
var año;
var dia;
var ultimoDia;
var posicionSemana;
var meses_letra = ["","Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var fecha_datep;

function calculaFechaActual(){
	var date = new Date();
	mes=date.getMonth()+1;
	año=date.getFullYear();
	
	calcula_Días();	
}

function calcula_Días(){
	ultimoDia = new Date(año, mes, 0).getDate();
	
	var dt = new Date(mes+' '+'01'+' '+año);
	posicionSemana=dt.getUTCDay();	
	
	if(posicionSemana==0)
	posicionSemana=7;
			
	armaAgenda();
}

function armaAgenda(){
	$('#mesCabecera').text(meses_letra[mes]+" "+año);
	$('#cuerpoTabla').text('');
	
	var fecha="01"+"/"+mes+"/"+año;
	invocarJSONServiceAction("obtieneAgenda", {"fecha":fecha},
			'obtieneAgenda', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneAgenda = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	else{
		html=''
			var contador=1;
			var contadordías=1;
				
			for(var i=0;contadordías<ultimoDia;i++){
			html=html+'<tr>';
				for(var cont=0;cont<7;cont++){
					
					if(contador>=posicionSemana && contadordías<=ultimoDia){
						
						html=html+'<td>';
						html=html+'<div class="row center gris">'+contadordías+'</div>';
						html=html+'<div class="row contenido">';
						
						for(var i=0;i<data.agenda.length;i++){
							
							if(data.agenda[i].diaMes==contadordías){
								
								html=html+'<div class="col-12">';
								html=html+'<div class="circulo float_left fazul"></div>';
								html=html+'<div class="t10 gris texto_circulo">'+data.agenda[i].nombre+'</div>';
								html=html+'</div>';
							}
							
						}	
						
						html=html+'</div>';
						html=html+'</td>';
						
						contadordías++;
					}
					else{
					html=html+'<td></td>';
					}
					contador++;
				}	
			html=html+'</tr>';
			}
			$('#cuerpoTabla').append(html);	
	}
	}
}

function botonNext(){
	if(mes<12){
		mes++;
	}
	else{
		mes=1;
		año++;
	}
	
	calcula_Días();	
}
function botonPrev(){
	if(mes>1){
		mes--;
	}
	else{
		año--;
		mes=12;
	}
	calcula_Días();
}

function inicializaCalendarios(){
	$('#embeddingDatePicker').datepicker({
		setDate : new Date(),
		format : 'dd/mm/yyyy',
		autoclose : true,
		language : 'es',
		todayHighlight : true
    }).on('changeDate', function(e) {
	    	$("#selectedDate").val($("#embeddingDatePicker").datepicker('getFormattedDate'));
	    	
	    	fecha_datep=$("#selectedDate").val();
	    	
	    	var tempdia=fecha_datep.substring(0,2);
	    	var tempmes=fecha_datep.substring(3,5);
	    	var tempaño=fecha_datep.substring(6,10);
	    	var date=new Date(tempmes+' '+tempdia+' '+tempaño);
	    	mes=date.getMonth()+1;
	    	año=date.getFullYear();
	    	
	    	calcula_Días();
	    });
}

function llenaPersonal(){
	
	invocarJSONServiceAction("obtieneEmpleados", {},
			'obtieneEmpleados', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneEmpleados = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
		var arregloAreas=Object.keys(data.empleados);
		var arregloSuperior;
		var arregloPuestos;
		html='';
		html=html+'<div class="row">';
		
		for(var i=0;i<arregloAreas.length;i++){
			arregloPuestos= Object.keys(data.empleados[arregloAreas[i]]);
			
			html=html+'<div class="col-12">';
			html=html+'<div class="t12 gris negrita">'+arregloAreas[i]+'</div>';
			html=html+'</div>';
			
			for(var a=0; a<arregloPuestos.length;a++){
				html=html+'<div class="col-12">';
				html=html+'<div class="t12 gris negrita">'+arregloPuestos[a]+'</div>';
				html=html+'</div>';
				
				for(var emp=0;emp<data.empleados[arregloAreas[i]][arregloPuestos[a]].length;emp++){
					var nombre=data.empleados[arregloAreas[i]][arregloPuestos[a]][emp].nombre;
					var espacio=nombre.indexOf(" ");
					var abreviacion=nombre[0]+nombre[espacio+1];
					
					html=html+'<div class="col-12">';
					html=html+'<div class="circulo float_left fazul">'+abreviacion+'</div>';
					html=html+'<div class="t12 gris texto_circulo">'+nombre+'</div>';
					html=html+'</div>';	
				}
			}	
		}
		html=html+'</div>';
		$('#personal').append(html);
		
		}
	}
}

function llenaEventos(){
	
	invocarJSONServiceAction("obtieneEventos", {},
			'obtieneEventos', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneEventos = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
		var arreglo=data.eventos;
		html='';
		html=html+'<div class="row">';
		
				for(var i=0;i<arreglo.length;i++){
					var nombre=arreglo[i].nombre;
					var eventoId=arreglo[i].eventoId;
										
					html=html+'<div class="col-12 cursor" id="'+eventoId+'" onclick="seleccionEvento(this)">';
					html=html+'<div class="caja_texto float_left fazul">';
						html=html+'<img class="ocultableEvento'+eventoId+'" src="img/check.png" style="display:none">';
					html=html+'</div>';
					html=html+'<label class="gris t12 cursor texto_circulo" for="'+eventoId+'">'+nombre+'</label>';
					html=html+'</div>';	
				}
				
		html=html+'</div>';
		$('#eventos').append(html);
		
		}
	}
}

function seleccionEvento(valor){
	var id=valor.id;
	
	if($('.ocultableEvento'+id).is(":visible")){
		$('.ocultableEvento'+id).hide();
		console.log("visible");
	}
	else{
		$('.ocultableEvento'+id).show();
		console.log("no visible");
	}
	
}

