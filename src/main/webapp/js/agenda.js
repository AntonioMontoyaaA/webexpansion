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
	if(data.codigo != 200){ //arma agenda vacia
		creaAgendaVacia();
		//cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	else{ //arma agenda con valores
		
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
							var nombreEvento=data.agenda[i].nombre;
							var eventoId=data.agenda[i].eventoId;
							var idusuario=data.agenda[i].usuarioAsignadoId;
							
							var ubicacion=data.agenda[i].lugar;
							var participantes=data.agenda[i].nombreUsuarioAsignado;
							var fechainicial=(data.agenda[i].fechaCompleta).substring(0,10);
							var horainicial=data.agenda[i].tiempoInicio;
							var fechafinal=(data.agenda[i].fechaCompletaFinal).substring(0,10);
							var horafinal=data.agenda[i].tiempoFinal;
							var descripcion=nombreEvento+" "+ubicacion;
							var asignadopor=data.agenda[i].nombreUsuarioAsigna;
							
							
							var espacio=participantes.indexOf(" ");
							var abreviacion=participantes[0]+participantes[espacio+1];
							
							if(data.agenda[i].diaMes==contadordías){
													
								html=html+'<div class="col-12 personal_'+idusuario+' ocultableEvento'+eventoId+'">';
								html=html+'<a tabindex="0" class="agenda_link" data-toggle="popover" data-trigger="focus" data-placement="bottom" '+
								'data-content="'+
								"<div class='col-12 blanco center negrita t12'>"+nombreEvento+"</div>"+
								"<div class='row'>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Ubicacion</div>"+
									ubicacion+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Participantes</div>"+
									participantes+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Fecha inicial</div>"+
									fechainicial+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Hora inicial</div>"+
									horainicial+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Fecha final</div>"+
									fechafinal+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Hora final</div>"+
									horafinal+"</div>"+
									"<div class='col-12 t12 blanco'>"+
									"<div class='negrita sub'>Descripción</div>"+
									descripcion+"</div>"+
									"<div class='col-12 t12 blanco'>"+
									"<div class='negrita sub'>Asignado por</div>"+
									asignadopor+"</div>"+
								"</div>"+
								'">';
								
								html=html+'<div class="circulo float_left back_'+eventoId+'">'+abreviacion+'</div>';
								html=html+'<div class="t10 gris texto_circulo">'+nombreEvento+'</div></a>';
								
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
			$('#cuerpoTabla').text('');
			$('#cuerpoTabla').append(html);	
			
			$('.agenda_link').popover({
				 	html:true,
			    });  

			
	}
	}
}

function creaAgendaVacia(){
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
		$('#cuerpoTabla').text('');	
		$('#cuerpoTabla').append(html);	
	
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
					var id=data.empleados[arregloAreas[i]][arregloPuestos[a]][emp].empleadoId;
					
					var espacio=nombre.indexOf(" ");
					var abreviacion=nombre[0]+nombre[espacio+1];
					
					html=html+'<div class="col-12 cursor" id="'+id+'" onclick="seleccionPersonal(this)">';
					html=html+'<div class="circulo float_left fazul circulo_'+id+'">'+abreviacion+'</div>';
					html=html+'<div class="t12 texto_circulo azul texto_'+id+'">'+nombre+'</div>';
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
					html=html+'<div class="caja_texto float_left  back_'+eventoId+'">';
						html=html+'<img class="ocultableEvento'+eventoId+'" src="img/check.png">';
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
		$('.ocultableEvento'+id).addClass("oculto_evento");
	}
	else{
		$('.ocultableEvento'+id).removeClass("oculto_evento");
	}
	
}
function seleccionPersonal(valor){
	var id=valor.id;
	
	if($('.circulo_'+id).hasClass("ffgris")==true){
		
		$('.circulo_'+id).removeClass("ffgris");
		$('.texto_'+id).removeClass("gris");
		
		$('.circulo_'+id).addClass("fazul");
		$('.texto_'+id).addClass("azul");
		$('.personal_'+id).removeClass("oculto_personal");

	}
	else{
		$('.circulo_'+id).removeClass("fazul");
		$('.texto_'+id).removeClass("azul");
		
		$('.circulo_'+id).addClass("ffgris");
		$('.texto_'+id).addClass("gris");
		$('.personal_'+id).addClass("oculto_personal");


		
	}
	
}

