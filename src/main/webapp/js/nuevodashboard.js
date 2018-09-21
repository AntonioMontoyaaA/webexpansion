var fecha;
var perfil;
var area;
var areaId;

$(function(){
		$('#iddashboard').addClass('resaltado'); //resalta en el header
		perfil=$('#perfil_usuario').val();
		area= $('#area').val();
		areaId=$('#areaId').val();
		
		if(perfil==3){
			$('#nombrePerfil').text('DASHBOARD '+'DIRECTOR GENERAL');
		}
		else{
			$('#nombrePerfil').text('DASHBOARD '+area);
		}
		cargafechas();
		EnviaFecha();
		AperturaMensual();
		cargaDashboard();
		
});

function cargafechas(){
	var f=new Date();
	var mesint = new Array ("01","02","03","04","05","06","07","08","09","10","11","12");
	fecha = f.getDate() + "/" + mesint[f.getMonth()] + "/" + f.getFullYear();
	
	if(f.getMonth()-2<0){
		var resta=f.getMonth()-2;
		var año=f.getFullYear()-1;
		fecha_enviar = f.getDate() + "/" + mesint[12+resta] + "/" + año;
	}
	else{
		fecha_enviar = f.getDate() + "/" + mesint[f.getMonth()-2] + "/" + f.getFullYear();
	}
	
}

function AperturaMensual(){
	invocarJSONServiceAction("DashboardPlanAperturaMAction", 
			{'fecha':fecha}, 
			'obtieneResponse', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar}
				cierraLoading();
			});

	obtieneResponse = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('DASHBOARD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	}
	if(data.codigo==200){
		AperturaMensual_grafica(data);
	}
};	
}

function AperturaMensual_grafica(data){
var	datos=data.meses;
var ene_plan=0, ene_real=0, feb_plan=0, feb_real=0, mar_plan=0, mar_real=0, abr_plan=0, abr_real=0, may_plan=0, may_real=0;
var jun_plan=0, jun_real=0, jul_plan=0, jul_real=0, ago_plan=0, ago_real=0, sep_plan=0, sep_real=0, oct_plan=0, oct_real=0;
var nov_plan=0, nov_real=0, dic_plan=0, dic_real=0;
$('#suma').text(data.totalAperturas);

if(datos.Enero!="undefined"){
	ene_plan=datos.Enero.plan;
	ene_real=datos.Enero.real;
}
if(datos.Febrero!="undefined"){
	feb_plan=datos.Febrero.plan;
	feb_real=datos.Febrero.real;
}
if(datos.Marzo!="undefined"){
	mar_plan=datos.Marzo.plan;
	mar_real=datos.Marzo.real;
}
if(datos.Abril!="undefined"){
	abr_plan=datos.Abril.plan;
	abr_real=datos.Abril.real;
}
if(datos.Mayo!="undefined"){
	may_plan=datos.Mayo.plan;
	may_real=datos.Mayo.real;
}
if(datos.Junio!="undefined"){
	jun_plan=datos.Junio.plan;
	jun_real=datos.Junio.real;
}
if(datos.Julio!="undefined"){
	jul_plan=datos.Julio.plan;
	jul_real=datos.Julio.real;
}
if(datos.Agosto!="undefined"){
	ago_plan=datos.Agosto.plan;
	ago_real=datos.Agosto.real;
}
if(datos.Septiembre!="undefined"){
	sep_plan=datos.Septiembre.plan;
	sep_real=datos.Septiembre.real;
}
if(datos.Octubre!="undefined"){
	oct_plan=datos.Octubre.plan;
	oct_real=datos.Octubre.real;
}
if(datos.Noviembre!="undefined"){
	nov_plan=datos.Noviembre.plan;
	nov_real=datos.Noviembre.real;
}
if(datos.Diciembre!="undefined"){
	dic_plan=datos.Diciembre.plan;
	dic_real=datos.Diciembre.real;
}
	
	Highcharts.chart('container_apmensual', {
	    chart: {
	        type: 'column',
	   		backgroundColor: '#071B36'
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null,
	    },
	    legend: {
	        enabled: false
	    },
	    xAxis: {
	        categories: ['Ene','Feb','Mar','Abr','Mayo','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
	    },
	    yAxis: {
	        min: 0,
	       
	        gridLineWidth: 0,
	        title:{
	        	offset: 0,
       	 		text: null
	        }
	    },
	    tooltip: {
	        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
	        shared: true
	    },
	    plotOptions: {
	        column: {
	        	stacking: 'normal'
	        }
	    },
	    series: [{
		        name: 'Objetivo',
		        color: 'white',
		        data: [
		        	ene_plan - ene_real,
		        	feb_plan - feb_real,
		        	mar_plan - mar_real,
		        	abr_plan - abr_real,
		        	may_plan - may_real,
		        	jun_plan - jun_real,
		        	jul_plan - jul_real,
		        	ago_plan - ago_real,
		        	sep_plan - sep_real,
		        	oct_plan - oct_real,
		        	nov_plan - nov_real,
		        	dic_plan - dic_real]
		    },{
		    	name: 'Aperturas',
		    	color: '#40BCD8',
		    	data: [ene_real,
		    		feb_real,
		    		mar_real,
		    		abr_real,
		    		may_real,
		    		jun_real,
		    		jul_real,
		    		ago_real,
		    		sep_real,
		    		oct_real,
		    		nov_real,
		    		dic_real]
		    }]
	});
}

function cargaDashboard(){
	invocarJSONServiceAction("cargaProcesoAction", 
			{}, 
			'obtieneResponseProceso', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar}
				cierraLoading();
			});

	obtieneResponseProceso = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('DASHBOARD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	}
	if(data.codigo==200){
		$('#total_activas').text(data.totales);
		$('#total_atrasadas').text(data.atrasadas);
		$('#total_canceladas').text(data.canceladas);
		
		armaGraficas(data);
// ----------------------- ARMA DIAGRAMA DE FLUJO -------------------------
		var descripcion_arreglo=[];
		var original=data.nivelEstatusActivos;
		var original_canceladas=data.nivelEstatusCancelado;
		var filtrados=[];
		
		for(var i=0;i<original.length;i++){
			if(original[i].estatusValidacion==1){
				filtrados.push(original[i]);
			}
		}
		
		for(var i=0;i<filtrados.length;i++){
			if(i<filtrados.length-1){
				if(filtrados[i].prioridad==filtrados[i+1].prioridad){
					descripcion_arreglo.push(2);
					i++;
				}
				else{
					descripcion_arreglo.push(1);
				}
			}
			else{
					descripcion_arreglo.push(1);
			}
		}
		
		if(descripcion_arreglo.length<16){
			var size=100/descripcion_arreglo.length;
		}
		else{
			var size=6.6;
		}
		pintaActivas(descripcion_arreglo, filtrados);
		
		$('#proceso').css('width',size*descripcion_arreglo.length+'%');
		$('.simple').css('width',size+'%');
		
		$( "#container_activas" ).on( "click", function() {
			var descripcion_arreglo=[];
			var filtrados=[];
			for(var i=0;i<original.length;i++){
				if(original[i].estatusValidacion==1){
					filtrados.push(original[i]);
				}
			}
			
			for(var i=0;i<filtrados.length;i++){
				if(i<filtrados.length-1){
					if(filtrados[i].prioridad==filtrados[i+1].prioridad){
						descripcion_arreglo.push(2);
						i++;
					}
					else{
						descripcion_arreglo.push(1);
					}
				}
				else{
						descripcion_arreglo.push(1);
				}
			}
			pintaActivas(descripcion_arreglo,filtrados);
			$('#proceso').css('width',size*descripcion_arreglo.length+'%');
			$('.simple').css('width',size+'%');

		});
		
		$( "#container_atrasadas" ).on( "click", function() {
			var descripcion_arreglo=[];
			var filtrados=[];
			for(var i=0;i<original.length;i++){
				if(original[i].estatusValidacion==1){
					filtrados.push(original[i]);
				}
			}
			for(var i=0;i<filtrados.length;i++){
				if(i<filtrados.length-1){
					if(filtrados[i].prioridad==filtrados[i+1].prioridad){
						descripcion_arreglo.push(2);
						i++;
					}
					else{
						descripcion_arreglo.push(1);
					}
				}
				else{
						descripcion_arreglo.push(1);
				}
			}
			pintaAtrasadas(descripcion_arreglo,filtrados);
			$('#proceso').css('width',size*descripcion_arreglo.length+'%');
			$('.simple').css('width',size+'%');

		});
		
		$( "#container_canceladas" ).on( "click", function() {
			var descripcion_arreglo=[];
			var filtrados=[];
			for(var i=0;i<original_canceladas.length;i++){
				if(original_canceladas[i].estatusValidacion==1){
					filtrados.push(original_canceladas[i]);
				}
			}
			for(var i=0;i<filtrados.length;i++){
				if(i<filtrados.length-1){
					if(filtrados[i].prioridad==filtrados[i+1].prioridad){
						descripcion_arreglo.push(2);
						i++;
					}
					else{
						descripcion_arreglo.push(1);
					}
				}
				else{
						descripcion_arreglo.push(1);
				}
			}
			pintaCanceladas(descripcion_arreglo,filtrados);
			$('#proceso').css('width',size*descripcion_arreglo.length+'%');
			$('.simple').css('width',size+'%');
		});
// ----------------------  ARMA DIAGRAMA DE FLUJO FIN ---------------------------------
	}
};	
}


function armaGraficas(data){
	var meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	var activas=[];
	var atrasadas=[];
	var canceladas=[];
	var nombres=[];
	var nombres_c=[];
	
	for(var i=0;i<data.activosMes.length;i++){
		activas.push(data.activosMes[i].totales);
		atrasadas.push(data.activosMes[i].atrasadas);
		nombres.push(meses[(data.activosMes[i].mes)-1]);
	}
	for(var i=0;i<data.canceladasMes.length;i++){
		canceladas.push(data.canceladasMes[i].totales);
		nombres_c.push(meses[(data.canceladasMes[i].mes)-1]);
	}
	
		Highcharts.chart('container_activas', {
		    chart: {
		        type: 'column',
		   		backgroundColor: '#071B36'
		    },
		    exporting: {
		        enabled: false
		    },
		    credits: {
		        enabled: false
		    },
		    title: {
		        text: null,
		    },
		    legend: {
		        enabled: false
		    },
		    xAxis: {
		        categories: nombres,
		    },
		    yAxis: {
		        min: 0,
		        gridLineWidth: 0,
		        title:{
		        	offset: 0,
	       	 		text: null
		        }
		    },
		    tooltip: {
		        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>',
		        shared: true
		    },
		    plotOptions: {
		        column: {
		        	stacking: 'normal'
		        }
		    },
		    series: [{
			    	name: 'Activas',
			    	color: '#3FB961',
			    	data: activas
			    }]
		});
		
		Highcharts.chart('container_atrasadas', {
		    chart: {
		        type: 'column',
		   		backgroundColor: '#071B36'
		    },
		    exporting: {
		        enabled: false
		    },
		    credits: {
		        enabled: false
		    },
		    title: {
		        text: null,
		    },
		    legend: {
		        enabled: false
		    },
		    xAxis: {
		    	 categories: nombres,
		    },
		    yAxis: {
		        min: 0,
		        gridLineWidth: 0,
		        title:{
		        	offset: 0,
	       	 		text: null
		        }
		    },
		    tooltip: {
		        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>',
		        shared: true
		    },
		    plotOptions: {
		        column: {
		        	stacking: 'normal'
		        }
		    },
		    series: [{
			    	name: 'Atrasadas',
			    	color: '#C93535',
			    	data: atrasadas
			    }]
		});
		
		Highcharts.chart('container_canceladas', {
		    chart: {
		        type: 'column',
		   		backgroundColor: '#071B36'
		    },
		    exporting: {
		        enabled: false
		    },
		    credits: {
		        enabled: false
		    },
		    title: {
		        text: null,
		    },
		    legend: {
		        enabled: false
		    },
		    xAxis: {
		    	 categories: nombres_c,
		    },
		    yAxis: {
		        min: 0,
		        gridLineWidth: 0,
		        title:{
		        	offset: 0,
	       	 		text: null
		        }
		    },
		    tooltip: {
		        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>',
		        shared: true
		    },
		    plotOptions: {
		        column: {
		        	stacking: 'normal'
		        }
		    },
		    series: [{
			    	name: 'Canceladas',
			    	color: '#657488',
			    	data: canceladas
			    }]
		});
}

function pintaActivas(arreglo,filtrados){
	$('#proceso').hide();
	html=inicio();

	var cont=0;
	for(var i=0;i<arreglo.length;i++){
		var cadenas=filtrados[cont].estatus.replace('VALIDACION','VOBO').split('-',2);
		var cant=filtrados[cont].total;
		var color="";
		
			if(filtrados[cont].areaValidacion==$('#areaId').val() && perfil!='3'){
				color="verde cursor";
			}
			else{
				color="blanco";
				if(perfil=='3')
					color="blanco cursor";
			}
		
		if(arreglo[i]==1){
			html=html+simple(cadenas[1] ,cant ,cadenas[0], color);
		}
		if(arreglo[i]==2){
			var cadenas2= filtrados[cont+1].estatus.replace('VALIDACION','VOBO').split('-',2);
			var cant2= filtrados[cont+1].total;
			var color2="";
			
			if(filtrados[cont+1].areaValidacion==$('#areaId').val()&& perfil!='3'){
				color2="verde cursor";
			}
			else{
				color2="blanco";
				if(perfil=='3')
					color2="blanco cursor";
			}
			html=html+doble(cadenas[1] ,cant ,cadenas[0],color ,cadenas2[1] ,cant2 ,cadenas2[0], color2);	
			
			cont++;
		}
		cont++;
	}
	
	$('#proceso').html(html);
	$('.hexa').css('background-image','url("img/hexaverde.svg")');
	
	$('#proceso').fadeIn();
}
function pintaAtrasadas(arreglo,filtrados){
	$('#proceso').hide();
	html=inicio();

	var cont=0;
	
	for(var i=0;i<arreglo.length;i++){
		var cadenas=filtrados[cont].estatus.replace('VALIDACION','VOBO').split('-',2);
		var cant=filtrados[cont].atrasadas;
		var color="";
			if(filtrados[cont].areaValidacion==$('#areaId').val()&& perfil!='3'){
				color="rojo cursor";
			}
			else{
				color="blanco";
				if(perfil=='3')
					color="blanco cursor";
			}
		if(arreglo[i]==1){
			html=html+simple(cadenas[1] ,cant ,cadenas[0],color);
		}
		if(arreglo[i]==2){
			var cadenas2= filtrados[cont+1].estatus.replace('VALIDACION','VOBO').split('-',2);
			var cant2= filtrados[cont+1].atrasadas;
			var color2="";
					if(filtrados[cont+1].areaValidacion==$('#areaId').val()&& perfil!='3'){
							color2="rojo cursor";
					}
					else{
							color2="blanco";
							if(perfil=='3')
								color2="blanco cursor";
					}
			html=html+doble(cadenas[1] ,cant ,cadenas[0],color,  cadenas2[1] ,cant2 ,cadenas2[0],color2);	
			
			cont++;
		}
		cont++;
	}
	
	$('#proceso').html(html);
	$('.hexa').css('background-image','url("img/hexarojo.svg")');
	
	$('#proceso').fadeIn();
}

function pintaCanceladas(arreglo,filtrados){
	$('#proceso').hide();
	html=inicio();
	var cont=0;
	
	for(var i=0;i<arreglo.length;i++){
		var cadenas=filtrados[cont].estatus.replace('VALIDACION','VOBO').split('-',2);
		var cant=filtrados[cont].total;
		var color="";
		if(filtrados[cont].areaValidacion==$('#areaId').val() && perfil!='3'){
			color="cgris cursor";
		}
		else{
			color="blanco";
			if(perfil=='3')
				color="blanco cursor";
		}	
		if(arreglo[i]==1){
			html=html+simple(cadenas[1] ,cant ,cadenas[0], color);
		}
		if(arreglo[i]==2){
			var cadenas2= filtrados[cont+1].estatus.replace('VALIDACION','VOBO').split('-',2);
			var cant2= filtrados[cont+1].total;
			var color2="";
				if(filtrados[cont+1].areaValidacion==$('#areaId').val() && perfil!='3'){
					color2="cgris cursor";
				}
				else{
					color2="blanco";
					if(perfil=='3')
						color2="blanco cursor";
				}
			
			html=html+doble(cadenas[1] ,cant ,cadenas[0],color  ,cadenas2[1] ,cant2 ,cadenas2[0],color2);	
			
			cont++;
		}
		cont++;
	}
	
	$('#proceso').html(html);
	$('.hexa').css('background-image','url("img/hexagris.svg")');
	$('#proceso').fadeIn();
}

function simple(titulo,cant,pie,color){
	return '<div class="simple">'+
	'<div class="negrita '+color+' titulo_hex"  onclick="redirige(this)">'+titulo+'</div>'+
	'<div class="hexa '+color+'" onclick="redirige(this)">'+
	'<div class="negrita blanco cont_hex">'+cant+'</div></div>'+
	'<div class="'+color+' pie_hex"  onclick="redirige(this)">'+pie+'</div>'+	
	'</div>';
}
function doble(x1,x2,x3,color1,  y1,y2,y3,color2){
	return '<div class="simple" style="padding:0 5;">'+
	'<div class="lineadoble fazul">'+
	'<div class="doble">'+
	'<div class="hexa '+color1+'" onclick="redirige(this)">'+
	'<div class="negrita blanco cont_hex_doble">'+x2+'</div>'+
	'</div><div class="hexa '+color2+'"  onclick="redirige(this)">'+
		'<div class="negrita blanco cont_hex_doble">'+y2+'</div>'+
	'</div></div>'+
	'</div>'+
	'<div class="negrita '+color1+' titulo_hex_doble" style="bottom:120"  onclick="redirige(this)">'+x1+'</div>'+
	'<div class="'+color1+' pie_hex_doble"  style="bottom:73"  onclick="redirige(this)">'+x3+'</div>'+
	
	'<div class="negrita '+color2+' titulo_hex_doble" style="bottom:57"  onclick="redirige(this)">'+y1+'</div>'+
	'<div class="'+color2+' pie_hex_doble" style="bottom:10"  onclick="redirige(this)">'+y3+'</div>'+
	'</div>';
}
function inicio(){
	return '<div class="linea"></div>';
}

function redirige(valor){
	if ($(valor).is(".verde")){
		window.location.href='asignadas';
	}
	if ($(valor).is(".rojo")){
		window.location.href='asignadas';
	}
	if ($(valor).is(".cgris")){
		window.location.href='tablero';
	}
	if(perfil=='3'){
		window.location.href='tablero';
	}	
	
}

//--------------------- ENVIA FECHA A LAS TABLAS
function EnviaFecha(){

	invocarJSONServiceAction("EnviaFechaAction", 
			{'fechaConsulta': fecha_enviar}, 
			'');
}