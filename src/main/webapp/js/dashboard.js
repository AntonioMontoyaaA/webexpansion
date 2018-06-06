//-------- CARGA AL INICIO
var fecha; 
var mes;
var dia;
var año;
var fecha_entera;
var perfil;
var area;
var areaId;
mesesarr = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");

$(function(){
		$('#iddashboard').addClass('resaltado'); //resalta en el header
		perfil=$('#perfil_usuario').val();
		area= $('#area').val();
		areaId=$('#areaId').val();
		
		cargafechas();
		
		progGeneral();
		progSemanal();
		AperturaMensual();
});

function cargafechas(){
	var f=new Date();
	var mesint = new Array ("01","02","03","04","05","06","07","08","09","10","11","12");
	
	mes = mesesarr[f.getMonth()];
	dia = f.getDate();
	año = f.getFullYear();
	fecha = f.getDate() + "/" + mesint[f.getMonth()] + "/" + f.getFullYear();
	fecha_entera='HOY '+dia+' DE '+mes+' DEL '+año+' '+f.getHours()+':'+f.getMinutes()+' HRS';
	$('#mes_actual').text(mes);
}
// ---------------------- CONSULTAS AL ACTION
function progGeneral(){
	cargafechas();
	$('#fecha_pg').text(fecha_entera);
	invocarJSONServiceAction("DashboardGeneralAction", 
			{'tipoConsulta': $('#opcion').val(), 'fechaConsulta': fecha}, 
			'obtieneDashboardResponse', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneDashboardResponse = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('DASHBOARD ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
		console.log("*** ENTRA A DATOS ***");
	
	//perfil=4; //dir_area
	//perfil=3; //dir_general
		
	if(perfil==3){
	  $('.dir_general').show();
	  $('#container_proceso,#container_atrasadas,#container_autorizadas,#container_rechazadas').css('height','22%');
		Resumen_grafica_dirGeneral(data);	
	}
	if(perfil==4){
		$('#container_proceso,#container_atrasadas,#container_autorizadas,#container_rechazadas').css('height','24%');
		Resumen_grafica_dirArea(data);
	}
	if(perfil==5){
		$('.analista').show();
		Resumen_grafica_analista(data);
	}
		
		if($('#opcion').val()=="0")
			$('#pg_fecha').text(dia+' DE '+mes);
		if($('#opcion').val()=="1")
			$('#pg_fecha').text('SEMANA');
		if($('#opcion').val()=="2")
			$('#pg_fecha').text(mes+' '+año);
		if($('#opcion').val()=="3")
			$('#pg_fecha').text('BIMESTRE');
		if($('#opcion').val()=="4")
			$('#pg_fecha').text('TRIMESTRE');
		if($('#opcion').val()=="5")
			$('#pg_fecha').text('SEMESTRE');
		if($('#opcion').val()=="6")
			$('#pg_fecha').text('AÑO '+año);
	}
};	
}
function progSemanal(){
	cargafechas();
	$('#fecha_ps').text(fecha_entera);

	invocarJSONServiceAction("DashboardPSemanalAction", 
			{'tipoConsulta': $('#opcion_historial').val(), 'fechaConsulta': fecha,
				'num': "10"}, 
			'obtieneDashboardResponseSemanal', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneDashboardResponseSemanal = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('DASHBOARD ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
		console.log("*** ENTRA A DATOS ***");
		
		if($('#opcion_historial').val()=="0"){
			$('#titulo_historial').text('Progreso Diario');
		}
		if($('#opcion_historial').val()=="1"){
			$('#titulo_historial').text('Progreso Semanal');
		}
		if($('#opcion_historial').val()=="2"){
			$('#titulo_historial').text('Progreso Mensual');
		}
		if($('#opcion_historial').val()=="3"){
			$('#titulo_historial').text('Progreso Bimestral');
		}
		if($('#opcion_historial').val()=="4"){
			$('#titulo_historial').text('Progreso Trimestral');
		}
		if($('#opcion_historial').val()=="5"){
			$('#titulo_historial').text('Progreso Semestral');
		}
		if($('#opcion_historial').val()=="6"){
			$('#titulo_historial').text('Progreso Anual');
		}
		
		progSemanal_grafica(data);
	}
};	
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


//-------------------------   ARMA GRAFICA PROGRESO SEMANAAL
function progSemanal_grafica(data){
	var arreglo=Object.keys(data.historial).sort();
	var ejex=[];
	var nuevacadena;
	
	if($('#opcion_historial').val()=="0"){
		for(i=0;i<arreglo.length;i++){
			cadenaaño=arreglo[i].substring(4,8);
			cadenames=arreglo[i].substring(9,11);
			cadenadia=arreglo[i].substring(12,14);
			nuevacadena=cadenadia+"/"+cadenames+"<br>"+cadenaaño;
			ejex.push(nuevacadena);
		}
		$('#sub_historial').text(mes);
	}
	if($('#opcion_historial').val()=="1"){
		for(i=0;i<arreglo.length;i++){
			nuevacadena="Semana "+arreglo[i].substring(7,9)+"<br>"+arreglo[i].substring(10);
			ejex.push(nuevacadena);
		}
		$('#sub_historial').text(mes);
	}
	
	if($('#opcion_historial').val()=="2"){
		for(i=0;i<arreglo.length;i++){
			cadenaaño=arreglo[i].substring(4,8);
			cadenames=arreglo[i].substring(9,11);
			nuevacadena=cadenames+"/"+cadenaaño;
			ejex.push(nuevacadena);
		}
		$('#sub_historial').text(mesesarr[parseInt(arreglo[0].substring(9,11))-1]+" "+arreglo[0].substring(4,8)+
				" - "+mesesarr[parseInt(arreglo[arreglo.length-1].substring(9,11))-1]+" "+arreglo[arreglo.length-1].substring(4,8));
	}
	if($('#opcion_historial').val()=="3"){
		for(i=0;i<arreglo.length;i++){
			cadenaaño2=arreglo[i].substring(9,13);
			cadenames2=arreglo[i].substring(14,16);
			cadenaaño=arreglo[i].substring(17,21);
			cadenames=arreglo[i].substring(22,24);
			
			nuevacadena=cadenames+"/"+cadenaaño+"<br>"+cadenames2+"/"+cadenaaño2;
			ejex.push(nuevacadena);
		}
		$('#sub_historial').text(mesesarr[parseInt(arreglo[0].substring(22,24))-1]+" "+arreglo[0].substring(17,21)+
				" - "+mesesarr[parseInt(arreglo[arreglo.length-1].substring(14,16))-1]+" "+arreglo[arreglo.length-1].substring(9,13));
	}
	if($('#opcion_historial').val()=="4"){
		for(i=0;i<arreglo.length;i++){
			cadenaaño2=arreglo[i].substring(10,14);
			cadenames2=arreglo[i].substring(15,17);
			cadenaaño=arreglo[i].substring(18,22);
			cadenames=arreglo[i].substring(23,25);
			
			nuevacadena=cadenames+"/"+cadenaaño+"<br>"+cadenames2+"/"+cadenaaño2;
			ejex.push(nuevacadena);
		}
		$('#sub_historial').text(mesesarr[parseInt(arreglo[0].substring(23,25))-1]+" "+arreglo[0].substring(18,22)+
				" - "+mesesarr[parseInt(arreglo[arreglo.length-1].substring(15,17))-1]+" "+arreglo[arreglo.length-1].substring(10,14));
	}
	if($('#opcion_historial').val()=="5"){
		for(i=0;i<arreglo.length;i++){
			cadenaaño2=arreglo[i].substring(9,13);
			cadenames2=arreglo[i].substring(14,16);
			cadenaaño=arreglo[i].substring(17,21);
			cadenames=arreglo[i].substring(22,24);
			
			nuevacadena=cadenames+"/"+cadenaaño+"<br>"+cadenames2+"/"+cadenaaño2;
			ejex.push(nuevacadena);
		}
		$('#sub_historial').text(mesesarr[parseInt(arreglo[0].substring(22,24))-1]+" "+arreglo[0].substring(17,21)+
				" - "+mesesarr[parseInt(arreglo[arreglo.length-1].substring(14,16))-1]+" "+arreglo[arreglo.length-1].substring(9,13));
	}
	if($('#opcion_historial').val()=="6"){
		for(i=0;i<arreglo.length;i++){
			cadenaaño=arreglo[i].substring(4,8);
			nuevacadena=cadenaaño;
			ejex.push(nuevacadena);
		}
		
		$('#sub_historial').text(arreglo[0].substring(4,8)+" - "+arreglo[arreglo.length-1].substring(4,8));
	}
	
	var autorizadas=[];
	var rechazadas=[];
	var asignadas=[];
	
	
	for(i=0;i<arreglo.length;i++){
		autorizadas.push(eval(data.historial[arreglo[i]]["autorizadas"]));
		rechazadas.push(eval(data.historial[arreglo[i]]["rechazadas"]));	
		asignadas.push(eval(data.historial[arreglo[i]]["asignadas"]));
	}
	
	Highcharts.chart('container_psemanal', {
		title: {
	        text: null,
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    xAxis: {
	        categories: ejex
	    },
	    yAxis: {
	        title: {
	        	 offset: 0,
	        	 text: null
	        }
	    },
	    legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
        },
	    series: [{
	        name: 'Asignadas',
	        color: '#64DEF1',
	        data: asignadas
	    }, {
	        name: 'Autorizadas',
	        color: '#CCE0F4',
	        data: autorizadas
	    }, {
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: rechazadas
	    }],

	});
}
//---------------------------------  ARMA GRAFICA PLAN DE APERTURA MENSUAL
function AperturaMensual_grafica(data){
var	datos=data.meses;
var ene_plan=0, ene_real=0, feb_plan=0, feb_real=0, mar_plan=0, mar_real=0, abr_plan=0, abr_real=0, may_plan=0, may_real=0;
var jun_plan=0, jun_real=0, jul_plan=0, jul_real=0, ago_plan=0, ago_real=0, sep_plan=0, sep_real=0, oct_plan=0, oct_real=0;
var nov_plan=0, nov_real=0, dic_plan=0, dic_real=0;

if(mes=="ENERO" && datos.Enero!="undefined"){
	ener_plan=datos.Enero.plan;
	ene_real=datos.Enero.real;
	$('#metas').text(ene_plan);
	$('#t_abiertas').text(ene_real);
}
if(mes=="FEBRERO"  && datos.Febrero!="undefined"){
	feb_plan=datos.Febrero.plan;
	feb_real=datos.Febrero.real;
	$('#metas').text(feb_plan);
	$('#t_abiertas').text(feb_real);
}
if(mes=="MARZO"  && datos.Marzo!="undefined"){
	mar_plan=datos.Marzo.plan;
	mar_real=datos.Marzo.real;
	$('#metas').text(mar_plan);
	$('#t_abiertas').text(mar_real);
}
if(mes=="ABRIL"  && datos.Abril!="undefined"){
	abr_plan=datos.Abril.plan;
	abr_real=datos.Abril.real;
	$('#metas').text(abr_plan);
	$('#t_abiertas').text(abr_real);
}
if(mes=="MAYO"  && datos.Mayo!="undefined"){
	may_plan=datos.Mayo.plan;
	may_real=datos.Mayo.real;
	$('#metas').text(may_plan);
	$('#t_abiertas').text(may_real);
}
if(mes=="JUNIO"  && datos.Junio!="undefined"){
	jun_plan=datos.Junio.plan;
	jun_real=datos.Junio.real;
	$('#metas').text(jun_plan);
	$('#t_abiertas').text(jun_real);
}
if(mes=="JULIO"  && datos.Julio!="undefined"){
	jul_plan=datos.Julio.plan;
	jul_real=datos.Julio.real;
	$('#metas').text(jul_plan);
	$('#t_abiertas').text(jul_real);
}
if(mes=="AGOSTO"  && datos.Agosto!="undefined"){
	ago_plan=datos.Agosto.plan;
	ago_real=datos.Agosto.real;
	$('#metas').text(ago_plan);
	$('#t_abiertas').text(ago_real);
}
if(mes=="SEPTIEMBRE"  && datos.Septiembre!="undefined"){
	sep_plan=datos.Septiembre.plan;
	sep_real=datos.Septiembre.real;
	$('#metas').text(sep_plan);
	$('#t_abiertas').text(sep_real);
}
if(mes=="OCTUBRE"  && datos.Octubre!="undefined"){
	oct_plan=datos.Octubre.plan;
	oct_real=datos.Octubre.real;
	$('#metas').text(oct_plan);
	$('#t_abiertas').text(oct_real);
}
if(mes=="NOVIEMBRE"  && datos.Noviembre!="undefined"){
	nov_plan=datos.Noviembre.plan;
	nov_real=datos.Noviembre.real;
	$('#metas').text(nov_plan);
	$('#t_abiertas').text(nov_real);
}
if(mes=="DICIEMBRE"  && datos.Diciembre!="undefined"){
	dic_plan=datos.Diciembre.plan;
	dic_real=datos.Diciembre.real;
	$('#metas').text(dic_plan);
	$('#t_abiertas').text(dic_real);
}

	
	Highcharts.chart('container_apmensual', {
	    chart: {
	        type: 'column'
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
	        max:15,
	        gridLineWidth: 0,
	        title:{
	        	offset: 0,
       	 		text: null
	        }
	    },
	    tooltip: {
	        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
	        shared: true
	    },
	    plotOptions: {
	        column: {
	        	stacking: 'normal'
	        }
	    },
	    series: [{
		        name: 'Faltante',
		        color: '#C9C9C9',
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
//---------------------------------  ARMA GRAFICA RESUMEN
// ASIGNADAS
function Resumen_grafica_analista(data){
	$('#nombrePerfil').text('DASHBOARD ANALISTA '+area);
	if(areaId==1)
		var actual=data.areas.EXPANSION;
	if(areaId==2)
		var actual=data.areas.GESTORIA;
	if(areaId==3)
		var actual=data.areas.CONSTRUCCION;
	if(areaId==5)
		var actual=data.areas.OPERACIONES;
	
	
	var E=data.areas.EXPANSION;
	var G=data.areas.GESTORIA;
	var C=data.areas.CONSTRUCCION;
	var O=data.areas.OPERACIONES;
		
	var sumaE=E.total;
	var sumaG=G.total;
	var sumaC=C.total;
	var sumaO=O.total;

	var sum_asignadas=actual.asignadas;
	var sum_atrasadas=actual.atrasadas;
	var sum_autorizadas=actual.autorizadas;
	var sum_rechazadas=actual.rechazadas;
	var sum_totales= sum_asignadas + sum_autorizadas + sum_rechazadas;

	$('#sum_asignadas').text(sum_asignadas);
	$('#sum_atrasadas').text(sum_atrasadas);
	$('#sum_autorizadas').text(sum_autorizadas);
	$('#sum_rechazadas').text(sum_rechazadas);
	$('#sum_totales').text(sum_totales);
	
	$('#proceso_p').text(actual.asignadasUsuario);
	$('#proceso_a').text(sum_asignadas-actual.asignadasUsuario);
	
	$('#atrasadas_p').text(actual.atrasadasUsuario);
	$('#atrasadas_a').text(sum_atrasadas-actual.atrasadasUsuario);
	
	$('#autorizadas_p').text(actual.autorizadasUsuario);
	$('#autorizadas_a').text(sum_autorizadas-actual.autorizadasUsuario);
	
	$('#rechazadas_p').text(actual.rechazadasUsuario);
	$('#rechazadas_a').text(sum_rechazadas-actual.rechazadasUsuario);

//GRAFICA PANTALLA GRANDE
		Highcharts.chart('container', {
		    chart: {
		        type: 'column'
		    },  
		    credits: {
		        enabled: false
		    },
		    exporting: {
		        enabled: false
		    },
		    title: {
		        text: null,
		    },
		    yAxis: {
		        allowDecimals: false,
		        title: {
		        	 offset: 0,
		        	 text: null
		        }
		    },
		    xAxis: {
		        categories: [
		            'Expansion <br>'+sumaE,
		            'Gestoría <br>'+sumaG,
		            'Construcción <br>'+sumaC,
		            'Operaciones <br>'+sumaO
		        ],
		        crosshair: true },
		  
		        series: [{
		        name: 'En proceso',
		        color: '#CCE0F4',
		        data: [E.asignadas, G.asignadas, C.asignadas, O.asignadas]
		    }, {
		        name: 'Atrasadas',
		        color: '#005B97',
		        data: [E.atrasadas, G.atrasadas, C.atrasadas, O.atrasadas]
		    }, {
		        name: 'Autorizadas',
		        color: '#64DEF1',
		        data: [E.autorizadas, G.autorizadas, C.autorizadas, O.autorizadas]
		    },{
		        name: 'Rechazadas',
		        color: '#FF5B16',
		        data: [E.rechazadas, G.rechazadas, C.rechazadas, O.rechazadas]
		    }],
		    tooltip:{
		    	headerFormat:''
		    }
		    
		});
// GRAFICA PANTALLA CHICA 1
	Highcharts.chart('container_sm1', {
	    chart: {
	        type: 'column'
	    }, 
	    credits: {
	        enabled: false
	    },
	    exporting: {
	        enabled: false
	    },
	    title: {
	        text: '',
	    },
	    yAxis: {
	        allowDecimals: false,
	        title: {
	        	 offset: 0,
	        	 text: null
	        }
	    },
	    xAxis: {
	        categories: [
	            'Expansion',
	            'Gestoría',
	        ],
	        crosshair: true },
	        series: [{
	        name: 'En proceso',
	        color: '#CCE0F4',
	        data: [data.areas.EXPANSION.asignadas, data.areas.GESTORIA.asignadas]
	    }, {
	        name: 'Atrasadas',
	        color: '#005B97',
	        data: [data.areas.EXPANSION.atrasadas, data.areas.GESTORIA.atrasadas]
	    }, {
	        name: 'Autorizadas',
	        color: '#64DEF1',
	        data: [data.areas.EXPANSION.autorizadas, data.areas.GESTORIA.autorizadas]
	    },{
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: [data.areas.EXPANSION.rechazadas, data.areas.GESTORIA.rechazadas]
	    }],
	    tooltip:{
	    	headerFormat:''
	    }
	});
// GRAFICA PANTALLA CHICA 2
	Highcharts.chart('container_sm2', {
	    chart: {
	        type: 'column'
	    },  
	    exporting: {
	        enabled: false
	    },
	    title: {
	        text: '',
	    },
	    credits: {
	        enabled: false
	    },
	    yAxis: {
	        allowDecimals: false,
	        title: {
	        	 offset: 0,
	        	 text: null
	        }
	    },
	    xAxis: {
	        categories: [
	            'Construcción',
	            'Operaciones'
	        ],
	        crosshair: true },
	        series: [{
	        name: 'En proceso',
	        color: '#CCE0F4',
	        data: [data.areas.CONSTRUCCION.asignadas, data.areas.OPERACIONES.asignadas]
	    }, {
	        name: 'Atrasadas',
	        color: '#005B97',
	        data: [data.areas.CONSTRUCCION.atrasadas, data.areas.OPERACIONES.atrasadas]
	    }, {
	        name: 'Autorizadas',
	        color: '#64DEF1',
	        data: [data.areas.CONSTRUCCION.autorizadas, data.areas.OPERACIONES.autorizadas]
	    },{
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: [data.areas.CONSTRUCCION.rechazadas, data.areas.OPERACIONES.rechazadas]
	    }],
	    tooltip:{
	    	headerFormat:''
	    }
	});
// ********************** RESUMEN GENERAL
//************** ASIGNADAS
		Highcharts.chart('container_proceso', {
	    chart: {
	    	events: {
                click: function () {location.href = 'asignadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_asignadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'En proceso',
	        innerSize: '80%',
	        data: [{
	                name: 'Personales',
	                color: '#00427F',
	                y: actual.asignadasUsuario, 
	                dataLabels: {
	                    enabled: false}
	        	},{
		            name: 'Area',
		            color: '#64DEF1',
		            y: sum_asignadas-actual.asignadasUsuario, 
		            dataLabels: {
		                    enabled: false}
	        	},{
	                name: 'Faltantes',
	                color: '#C9C9C9',
	                y: sum_totales-sum_asignadas, 
	                dataLabels: {
	                    enabled: false}
	            }]
	    }]
	    
	});
// *************** ATRASADAS
	Highcharts.chart('container_atrasadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'asignadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_atrasadas+'</span><br><span class="numero_chico">de '+sum_asignadas+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Atrasadas',
	        innerSize: '80%',
	        data: [{
                name: 'Personales',
                color: '#00427F',
                y: actual.atrasadasUsuario,
                dataLabels: {
                    enabled: false}
        	},{
	            name: 'Area',
	            color: '#64DEF1',
	            y: sum_atrasadas-actual.atrasadasUsuario,
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color: '#C9C9C9',
                y: sum_asignadas-sum_atrasadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
// ***************************** AUTORIZADAS	
	Highcharts.chart('container_autorizadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'autorizadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_autorizadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Autorizadas',
	        innerSize: '80%',
	        data: [{
                name: 'Personales',
                color: '#00427F',
                y: actual.autorizadasUsuario, 
                dataLabels: {
                    enabled: false}
        	},{
	            name: 'Area',
	            color:'#64DEF1', 
	            y: sum_autorizadas-actual.autorizadasUsuario, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color:'#C9C9C9',
                y: sum_totales-sum_autorizadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
// ************************************ RECHAZADAS	
	Highcharts.chart('container_rechazadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'rechazadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_rechazadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Rechazadas',
	        innerSize: '80%',
	        data: [{
                name: 'Personales',
                color: '#00427F',
                y: actual.rechazadasUsuario, 
                dataLabels: {
                    enabled: false}
        	},{
	            name: 'Area',
	            color: '#64DEF1',
	            y: sum_rechazadas-actual.rechazadasUsuario, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color: '#C9C9C9',
                y: sum_totales-sum_rechazadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
}

function Resumen_grafica_dirArea(data){
	$('#nombrePerfil').text('DASHBOARD '+area);
	
	if(areaId==1)
		var actual=data.areas.EXPANSION;
	if(areaId==2)
		var actual=data.areas.GESTORIA;
	if(areaId==3)
		var actual=data.areas.CONSTRUCCION;
	if(areaId==4)
		var actual=data.areas.OPERACIONES;
	
	
	var E=data.areas.EXPANSION;
	var G=data.areas.GESTORIA;
	var C=data.areas.CONSTRUCCION;
	var O=data.areas.OPERACIONES;
		
	var sumaE=E.total;
	var sumaG=G.total;
	var sumaC=C.total;
	var sumaO=O.total;

	var sum_asignadas=actual.asignadas;
	var sum_atrasadas=actual.atrasadas;
	var sum_autorizadas=actual.autorizadas;
	var sum_rechazadas=actual.rechazadas;
	var sum_totales= sum_asignadas + sum_autorizadas + sum_rechazadas;

	$('#sum_asignadas').text(sum_asignadas);
	$('#sum_atrasadas').text(sum_atrasadas);
	$('#sum_autorizadas').text(sum_autorizadas);
	$('#sum_rechazadas').text(sum_rechazadas);
	$('#sum_totales').text(sum_totales);

//GRAFICA PANTALLA GRANDE
		Highcharts.chart('container', {
		    chart: {
		        type: 'column'
		    },  
		    credits: {
		        enabled: false
		    },
		    exporting: {
		        enabled: false
		    },
		    title: {
		        text: null,
		    },
		    yAxis: {
		        allowDecimals: false,
		        title: {
		        	 offset: 0,
		        	 text: null
		        }
		    },
		    xAxis: {
		        categories: [
		            'Expansion <br>'+sumaE,
		            'Gestoría <br>'+sumaG,
		            'Construcción <br>'+sumaC,
		            'Operaciones <br>'+sumaO
		        ],
		        crosshair: true },
		  
		        series: [{
		        name: 'En proceso',
		        color: '#CCE0F4',
		        data: [E.asignadas, G.asignadas, C.asignadas, O.asignadas]
		    }, {
		        name: 'Atrasadas',
		        color: '#005B97',
		        data: [E.atrasadas, G.atrasadas, C.atrasadas, O.atrasadas]
		    }, {
		        name: 'Autorizadas',
		        color: '#64DEF1',
		        data: [E.autorizadas, G.autorizadas, C.autorizadas, O.autorizadas]
		    },{
		        name: 'Rechazadas',
		        color: '#FF5B16',
		        data: [E.rechazadas, G.rechazadas, C.rechazadas, O.rechazadas]
		    }],
		    tooltip:{
		    	headerFormat:''
		    }
		});
// GRAFICA PANTALLA CHICA 1
	Highcharts.chart('container_sm1', {
	    chart: {
	        type: 'column'
	    }, 
	    credits: {
	        enabled: false
	    },
	    exporting: {
	        enabled: false
	    },
	    title: {
	        text: '',
	    },
	    yAxis: {
	        allowDecimals: false,
	        title: {
	        	 offset: 0,
	        	 text: null
	        }
	    },
	    xAxis: {
	        categories: [
	            'Expansion',
	            'Gestoría',
	        ],
	        crosshair: true },
	        series: [{
	        name: 'En proceso',
	        color: '#CCE0F4',
	        data: [data.areas.EXPANSION.asignadas, data.areas.GESTORIA.asignadas]
	    }, {
	        name: 'Atrasadas',
	        color: '#005B97',
	        data: [data.areas.EXPANSION.atrasadas, data.areas.GESTORIA.atrasadas]
	    }, {
	        name: 'Autorizadas',
	        color: '#64DEF1',
	        data: [data.areas.EXPANSION.autorizadas, data.areas.GESTORIA.autorizadas]
	    },{
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: [data.areas.EXPANSION.rechazadas, data.areas.GESTORIA.rechazadas]
	    }],
	    tooltip:{
	    	headerFormat:''
	    }
	});
// GRAFICA PANTALLA CHICA 2
	Highcharts.chart('container_sm2', {
	    chart: {
	        type: 'column'
	    },  
	    exporting: {
	        enabled: false
	    },
	    title: {
	        text: '',
	    },
	    credits: {
	        enabled: false
	    },
	    yAxis: {
	        allowDecimals: false,
	        title: {
	        	 offset: 0,
	        	 text: null
	        }
	    },
	    xAxis: {
	        categories: [
	            'Construcción',
	            'Operaciones'
	        ],
	        crosshair: true },
	        series: [{
	        name: 'En proceso',
	        color: '#CCE0F4',
	        data: [data.areas.CONSTRUCCION.asignadas, data.areas.OPERACIONES.asignadas]
	    }, {
	        name: 'Atrasadas',
	        color: '#005B97',
	        data: [data.areas.CONSTRUCCION.atrasadas, data.areas.OPERACIONES.atrasadas]
	    }, {
	        name: 'Autorizadas',
	        color: '#64DEF1',
	        data: [data.areas.CONSTRUCCION.autorizadas, data.areas.OPERACIONES.autorizadas]
	    },{
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: [data.areas.CONSTRUCCION.rechazadas, data.areas.OPERACIONES.rechazadas]
	    }],
	    tooltip:{
	    	headerFormat:''
	    }
	});
// ********************** RESUMEN GENERAL
//************** ASIGNADAS
		Highcharts.chart('container_proceso', {
	    chart: {
	    	events: {
                click: function () {location.href = 'asignadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_asignadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'En proceso',
	        innerSize: '80%',
	        data: [{
		            name: 'Area',
		            color: '#64DEF1',
		            y: sum_asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},{
	                name: 'Faltantes',
	                color: '#C9C9C9',
	                y: sum_totales-sum_asignadas, 
	                dataLabels: {
	                    enabled: false}
	            }]
	    }]
	    
	});
// *************** ATRASADAS
	Highcharts.chart('container_atrasadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'asignadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_atrasadas+'</span><br><span class="numero_chico">de '+sum_asignadas+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Atrasadas',
	        innerSize: '80%',
	        data: [{
	            name: 'Area',
	            color: '#64DEF1',
	            y: sum_atrasadas,
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color: '#C9C9C9',
                y: sum_asignadas-sum_atrasadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
// ***************************** AUTORIZADAS	
	Highcharts.chart('container_autorizadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'autorizadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_autorizadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Autorizadas',
	        innerSize: '80%',
	        data: [{
	            name: 'Area',
	            color:'#64DEF1', 
	            y: sum_autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color:'#C9C9C9',
                y: sum_totales-sum_autorizadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
// ************************************ RECHAZADAS	
	Highcharts.chart('container_rechazadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'rechazadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_rechazadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Rechazadas',
	        innerSize: '80%',
	        data: [{
	            name: 'Area',
	            color: '#64DEF1',
	            y: sum_rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color: '#C9C9C9',
                y: sum_totales-sum_rechazadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
	
}

function Resumen_grafica_dirGeneral(data){
	$('#nombrePerfil').text('DASHBOARD DIRECTOR GENERAL');
	
	var E=data.areas.EXPANSION;
	var G=data.areas.GESTORIA;
	var C=data.areas.CONSTRUCCION;
	var O=data.areas.OPERACIONES;
		
	var sumaE=E.total;
	var sumaG=G.total;
	var sumaC=C.total;
	var sumaO=O.total;

	var sum_asignadas=E.asignadas+G.asignadas+C.asignadas+O.asignadas;
	var sum_atrasadas=E.atrasadas+G.atrasadas+C.atrasadas+O.atrasadas;
	var sum_autorizadas=E.autorizadas+G.autorizadas+C.autorizadas+O.autorizadas;
	var sum_rechazadas=E.rechazadas+G.rechazadas+C.rechazadas+O.rechazadas;
	var sum_totales= sum_asignadas + sum_autorizadas + sum_rechazadas;

	$('#sum_asignadas').text(sum_asignadas);
	$('#sum_atrasadas').text(sum_atrasadas);
	$('#sum_autorizadas').text(sum_autorizadas);
	$('#sum_rechazadas').text(sum_rechazadas);
	$('#sum_totales').text(sum_totales);

//GRAFICA PANTALLA GRANDE
		Highcharts.chart('container', {
		    chart: {
		        type: 'column'
		    },  
		    credits: {
		        enabled: false
		    },
		    exporting: {
		        enabled: false
		    },
		    title: {
		        text: null,
		    },
		    yAxis: {
		        allowDecimals: false,
		        title: {
		        	 offset: 0,
		        	 text: null
		        }
		    },
		    xAxis: {
		        categories: [
		            'Expansion <br>'+sumaE,
		            'Gestoría <br>'+sumaG,
		            'Construcción <br>'+sumaC,
		            'Operaciones <br>'+sumaO
		        ],
		        crosshair: true },
		  
		        series: [{
		        name: 'En proceso',
		        color: '#CCE0F4',
		        data: [E.asignadas, G.asignadas, C.asignadas, O.asignadas]
		    }, {
		        name: 'Atrasadas',
		        color: '#005B97',
		        data: [E.atrasadas, G.atrasadas, C.atrasadas, O.atrasadas]
		    }, {
		        name: 'Autorizadas',
		        color: '#64DEF1',
		        data: [E.autorizadas, G.autorizadas, C.autorizadas, O.autorizadas]
		    },{
		        name: 'Rechazadas',
		        color: '#FF5B16',
		        data: [E.rechazadas, G.rechazadas, C.rechazadas, O.rechazadas]
		    }],
		    tooltip:{
		    	headerFormat:''
		    }
		});
// GRAFICA PANTALLA CHICA 1
	Highcharts.chart('container_sm1', {
	    chart: {
	        type: 'column'
	    }, 
	    credits: {
	        enabled: false
	    },
	    exporting: {
	        enabled: false
	    },
	    title: {
	        text: '',
	    },
	    yAxis: {
	        allowDecimals: false,
	        title: {
	        	 offset: 0,
	        	 text: null
	        }
	    },
	    xAxis: {
	        categories: [
	            'Expansion',
	            'Gestoría',
	        ],
	        crosshair: true },
	        series: [{
	        name: 'En proceso',
	        color: '#CCE0F4',
	        data: [data.areas.EXPANSION.asignadas, data.areas.GESTORIA.asignadas]
	    }, {
	        name: 'Atrasadas',
	        color: '#005B97',
	        data: [data.areas.EXPANSION.atrasadas, data.areas.GESTORIA.atrasadas]
	    }, {
	        name: 'Autorizadas',
	        color: '#64DEF1',
	        data: [data.areas.EXPANSION.autorizadas, data.areas.GESTORIA.autorizadas]
	    },{
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: [data.areas.EXPANSION.rechazadas, data.areas.GESTORIA.rechazadas]
	    }],
	    tooltip:{
	    	headerFormat:''
	    }
	});
// GRAFICA PANTALLA CHICA 2
	Highcharts.chart('container_sm2', {
	    chart: {
	        type: 'column'
	    },  
	    exporting: {
	        enabled: false
	    },
	    title: {
	        text: '',
	    },
	    credits: {
	        enabled: false
	    },
	    yAxis: {
	        allowDecimals: false,
	        title: {
	        	 offset: 0,
	        	 text: null
	        }
	    },
	    xAxis: {
	        categories: [
	            'Construcción',
	            'Operaciones'
	        ],
	        crosshair: true },
	        series: [{
	        name: 'En proceso',
	        color: '#CCE0F4',
	        data: [data.areas.CONSTRUCCION.asignadas, data.areas.OPERACIONES.asignadas]
	    }, {
	        name: 'Atrasadas',
	        color: '#005B97',
	        data: [data.areas.CONSTRUCCION.atrasadas, data.areas.OPERACIONES.atrasadas]
	    }, {
	        name: 'Autorizadas',
	        color: '#64DEF1',
	        data: [data.areas.CONSTRUCCION.autorizadas, data.areas.OPERACIONES.autorizadas]
	    },{
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: [data.areas.CONSTRUCCION.rechazadas, data.areas.OPERACIONES.rechazadas]
	    }],
	    tooltip:{
	    	headerFormat:''
	    }
	});
// ********************** RESUMEN GENERAL
//************** ASIGNADAS
		Highcharts.chart('container_proceso', {
	    chart: {
	    	events: {
                click: function () {location.href = 'asignadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_asignadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'En proceso',
	        innerSize: '80%',
	        data: [{
		            name: 'Expansión',
		            color: '#006dac',
		            y: E.asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},{
		            name: 'Gestoría',
		            color: '#194377',
		            y: G.asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},{
		            name: 'Construcción',
		            color: '#97dfcf',
		            y: C.asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},{
		            name: 'Operaciones',
		            color: '#07c0d7',
		            y: O.asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},{
	                name: '-',
	                color: '#C9C9C9',
	                y: sum_totales-sum_asignadas, 
	                dataLabels: {
	                    enabled: false}
	            }]
	    }]
	    
	});
// *************** ATRASADAS
	Highcharts.chart('container_atrasadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'asignadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_atrasadas+'</span><br><span class="numero_chico">de '+sum_asignadas+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Atrasadas',
	        innerSize: '80%',
	        data: [{
	            name: 'Expansión',
	            color: '#006dac',
	            y: E.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Gestoría',
	            color: '#194377',
	            y: G.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Construcción',
	            color: '#97dfcf',
	            y: C.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Operaciones',
	            color: '#07c0d7',
	            y: O.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: '-',
                color: '#C9C9C9',
                y: sum_totales-sum_atrasadas, 
                dataLabels: {
                    enabled: false}
            }]	        
	    }]
	});
// ***************************** AUTORIZADAS	
	Highcharts.chart('container_autorizadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'autorizadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_autorizadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Autorizadas',
	        innerSize: '80%',
	        data: [{
	            name: 'Expansión',
	            color: '#006dac',
	            y: E.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Gestoría',
	            color: '#194377',
	            y: G.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Construcción',
	            color: '#97dfcf',
	            y: C.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Operaciones',
	            color: '#07c0d7',
	            y: O.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: '-',
                color: '#C9C9C9',
                y: sum_totales-sum_autorizadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
// ************************************ RECHAZADAS	
	Highcharts.chart('container_rechazadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'rechazadas'}
            },
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    exporting: {
	        enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	    	 style: {
	             color: '#00437e'
	         },
	        text: '<span class="numero_grande">'+sum_rechazadas+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 5
	    },
	    tooltip: {
	    	// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	    	series: {
	            states: {
	                hover: {
	                    halo: {
	                        size: 5
	                    }

	                }
	            }
	        },
	        pie: {
	        	size: "122%",
	            dataLabels: {
	                enabled: false
	            },
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '50%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Rechazadas',
	        innerSize: '80%',
	        data: [{
	            name: 'Expansión',
	            color: '#006dac',
	            y: E.rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Gestoría',
	            color: '#194377',
	            y: G.rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Construcción',
	            color: '#97dfcf',
	            y: C.rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Operaciones',
	            color: '#07c0d7',
	            y: O.rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: '-',
                color: '#C9C9C9',
                y: sum_totales-sum_rechazadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
}
