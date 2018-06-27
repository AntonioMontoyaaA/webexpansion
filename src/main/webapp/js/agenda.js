$(function(){
	$('#idagenda').addClass('resaltado');
	inicializaCalendarios();
	calculaFechaActual();
	llenaPersonal();
	
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
	
	html=''
	var contador=1;
	var contadordías=1;
		
	for(var i=0;contadordías<ultimoDia;i++){
	html=html+'<tr>';
		for(var cont=0;cont<7;cont++){
			
			if(contador>=posicionSemana && contadordías<=ultimoDia){
				html=html+'<td>';
				html=html+'<div class="row center gris">'+contadordías+'</div>';
				
				html=html+'<div class="row">';
				
				html=html+'<div class="col-12">';
				html=html+'<div class="circulo float_left"></div>';
				html=html+'<div class="t12 gris texto_circulo">'+''+'</div>';
				html=html+'</div>';
				
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
		cargaMensajeModal('DASHBOARD ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
		
		}
	}
}