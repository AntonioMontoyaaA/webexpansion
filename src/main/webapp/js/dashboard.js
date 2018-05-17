//-------- CARGA AL INICIO
var usuario;
var fecha; 
var mes;
var dia;
var año;
var fecha_entera;
$(function(){
		$('#iddashboard').addClass('resaltado'); //para el efecto de header
		usuario=$('#usuario').val();
		$('#usuario').val('');
		cargafechas();
		$('#mes_actual').text(mes);
		
		progGeneral();
		progSemanal();
		AperturaMensual();
});
function cargafechas(){
	var f=new Date();
	var mesesarr = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
	var mesint = new Array ("01","02","03","04","05","06","07","08","09","10","11","12");
	
	mes = mesesarr[f.getMonth()];
	dia = f.getDate();
	año = f.getFullYear();
	fecha = f.getDate() + "/" + mesint[f.getMonth()] + "/" + f.getFullYear();
	fecha_entera='HOY '+dia+' DE '+mes+' DEL '+año+' '+f.getHours()+':'+f.getMinutes()+' HRS';
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
		cargaMensajeModal('MD ASIGNADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
		console.log("*** ENTRA A DATOS ***");
		progGeneral_grafica(data);
		Resumen_grafica(data);
		
		if($('#opcion').val()=="1")
			$('#pg_fecha').text(dia+' DE '+mes);
		if($('#opcion').val()=="2")
			$('#pg_fecha').text('SEMANA');
		if($('#opcion').val()=="3")
			$('#pg_fecha').text(mes+' '+año);
		if($('#opcion').val()=="4")
			$('#pg_fecha').text('BIMESTRE');
		if($('#opcion').val()=="5")
			$('#pg_fecha').text('TRIMESTRE');
		if($('#opcion').val()=="6")
			$('#pg_fecha').text('SEMESTRE');
		if($('#opcion').val()=="7")
			$('#pg_fecha').text('AÑO '+año);
	}
};	
}
function progSemanal(){
	cargafechas();
	$('#fecha_ps').text(fecha_entera);
	progSemanal_grafica();

}
function AperturaMensual(){
	invocarJSONServiceAction("DashboardPlanAperturaMAction", 
			{'usuarioId': usuario, 'fecha':fecha}, 
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


// ------------------------------- ARMA GRAFICA PROGRESO GENERAL
function progGeneral_grafica(data){
var E=data.areas.EXPANSION;
var G=data.areas.GESTORIA;
var C=data.areas.CONSTRUCCION;
var O=data.areas.OPERACIONES;
	
var sumaE=E.asignadas+E.atrasadas+E.autorizadas+E.rechazadas
var sumaG=G.asignadas+G.atrasadas+G.autorizadas+G.rechazadas
var sumaC=C.asignadas+C.atrasadas+C.autorizadas+C.rechazadas
var sumaO=O.asignadas+O.atrasadas+O.autorizadas+O.rechazadas

var sum_asignadas=E.asignadas+G.asignadas+C.asignadas+O.asignadas;
var sum_atrasadas=E.atrasadas+G.atrasadas+C.atrasadas+O.atrasadas;
var sum_autorizadas=E.autorizadas+G.autorizadas+C.autorizadas+O.autorizadas;
var sum_rechazadas=E.rechazadas+G.rechazadas+C.rechazadas+O.rechazadas;
var sum_totales= sum_asignadas + sum_atrasadas + sum_autorizadas + sum_rechazadas;

$('#sum_asignadas').text(sum_asignadas);
$('#sum_atrasadas').text(sum_atrasadas);
$('#sum_autorizadas').text(sum_autorizadas);
$('#sum_rechazadas').text(sum_rechazadas);
$('#sum_totales').text(sum_totales);


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
	        name: 'Asignadas',
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
	    tooltip: {
	        formatter: function () {
	            return '<b>' + this.series.name + '</b><br/>' +
	                this.point.y + ' ' + this.point.name.toLowerCase();
	        }
	    }
	});
	
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
        name: 'Asignadas',
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
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.point.y + ' ' + this.point.name.toLowerCase();
        }
    }
});

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
        name: 'Asignadas',
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
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.point.y + ' ' + this.point.name;
        }
    }
});
}
//-------------------------   ARMA GRAFICA PROGRESO SEMANAAL
function progSemanal_grafica(){
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
	        categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8']
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
	        data: [1, 3, 1, 5, 3, 2, 2, 5]
	    }, {
	        name: 'Autorizadas',
	        color: '#CCE0F4',
	        data: [1, 2, 2, 1, 4, 2, 1, 3]
	    }, {
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: [1, 1, 1, 2, 4, 1, 3, 1]
	    }],

	});
}
//---------------------------------  ARMA GRAFICA PLAN DE APERTURA MENSUAL
function AperturaMensual_grafica(data){
var	datos=data.meses;

if(mes=="ENERO"){
	$('#metas').text(datos.Enero.plan);
	$('#t_abiertas').text(datos.Enero.real);
}
if(mes=="FEBRERO"){
	$('#metas').text(datos.Febrero.plan);
	$('#t_abiertas').text(datos.Febrero.real);
}
if(mes=="MARZO"){
	$('#metas').text(datos.Marzo.plan);
	$('#t_abiertas').text(datos.Marzo.real);
}
if(mes=="ABRIL"){
	$('#metas').text(datos.Abril.plan);
	$('#t_abiertas').text(datos.Abril.real);
}
if(mes=="MAYO"){
	$('#metas').text(datos.Mayo.plan);
	$('#t_abiertas').text(datos.Mayo.real);
}
if(mes=="JUNIO"){
	$('#metas').text(datos.Junio.plan);
	$('#t_abiertas').text(datos.Junio.real);
}
if(mes=="JULIO"){
	$('#metas').text(datos.Julio.plan);
	$('#t_abiertas').text(datos.Julio.real);
}
if(mes=="AGOSTO"){
	$('#metas').text(datos.Agosto.plan);
	$('#t_abiertas').text(datos.Agosto.real);
}
if(mes=="SEPTIEMBRE"){
	$('#metas').text(datos.Septiembre.plan);
	$('#t_abiertas').text(datos.Septiembre.real);
}
if(mes=="OCTUBRE"){
	$('#metas').text(datos.Octubre.plan);
	$('#t_abiertas').text(datos.Octubre.real);
}
if(mes=="NOVIEMBRE"){
	$('#metas').text(datos.Noviembre.plan);
	$('#t_abiertas').text(datos.Noviembre.real);
}
if(mes=="DICIEMBRE"){
	$('#metas').text(datos.Diciembre.plan);
	$('#t_abiertas').text(datos.Diciembre.real);
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
		        data: [datos.Enero.plan - datos.Enero.real,
		        	datos.Febrero.plan - datos.Febrero.real,
		        	datos.Marzo.plan - datos.Marzo.real,
		        	datos.Abril.plan - datos.Abril.real,
		        	datos.Mayo.plan - datos.Mayo.real,
		        	datos.Junio.plan - datos.Junio.real,
		        	datos.Julio.plan - datos.Julio.real,
		        	datos.Agosto.plan - datos.Agosto.real,
		        	datos.Septiembre.plan - datos.Septiembre.real,
		        	datos.Octubre.plan - datos.Octubre.real,
		        	datos.Noviembre.plan - datos.Noviembre.real,
		        	datos.Diciembre.plan - datos.Diciembre.real]
		    },{
		    	name: 'Aperturas',
		    	color: '#40BCD8',
		    	data: [datos.Enero.real,
		    		datos.Febrero.real,
		    		datos.Marzo.real,
		    		datos.Abril.real,
		    		datos.Mayo.real,
		    		datos.Junio.real,
		    		datos.Julio.real,
		    		datos.Agosto.real,
		    		datos.Septiembre.real,
		    		datos.Octubre.real,
		    		datos.Noviembre.real,
		    		datos.Diciembre.real]
		    }]
	});
}
//---------------------------------  ARMA GRAFICA RESUMEN
// ASIGNADAS
function Resumen_grafica(data){
	var E=data.areas.EXPANSION;
	var G=data.areas.GESTORIA;
	var C=data.areas.CONSTRUCCION;
	var O=data.areas.OPERACIONES;

	var sum_asignadas=E.asignadas+G.asignadas+C.asignadas+O.asignadas;
	var sum_atrasadas=E.atrasadas+G.atrasadas+C.atrasadas+O.atrasadas;
	var sum_autorizadas=E.autorizadas+G.autorizadas+C.autorizadas+O.autorizadas;
	var sum_rechazadas=E.rechazadas+G.rechazadas+C.rechazadas+O.rechazadas;
	var sum_totales= sum_asignadas + sum_atrasadas + sum_autorizadas + sum_rechazadas;
	
	Highcharts.chart('container_asignadas', {
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
	        text: '<span class="numero_grande">'+6+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
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
	        	size: "135%",
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
	        name: 'Asignadas',
	        innerSize: '80%',
	        data: [{
	                name: 'Personales',
	                color: '#00427F',
	                y: 1, //poner la resta de num max - personales - area
	                dataLabels: {
	                    enabled: false}
	        	},{
		            name: 'Area',
		            color: '#64DEF1',
		            y: 5, //poner la resta de num max - personales - area
		            dataLabels: {
		                    enabled: false}
	        	},{
	                name: 'Faltantes',
	                color: '#C9C9C9',
	                y: sum_totales-1-5, //poner la resta de num max - personales - area
	                dataLabels: {
	                    enabled: false}
	            }]
	    }]
	    
	});
// ATRASADAS
	Highcharts.chart('container_atrasadas', {
	    chart: {
	    	events: {
                click: function () {location.href = 'atrasadas'}
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
	        text: '<span class="numero_grande">'+9+'</span><br><span class="numero_chico">de '+sum_asignadas+'</span>',
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
	        	size: "135%",
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
	        name: 'Asignadas',
	        innerSize: '80%',
	        data: [{
                name: 'Personales',
                color: '#00427F',
                y: 1, //poner la resta de num max - personales - area
                dataLabels: {
                    enabled: false}
        	},{
	            name: 'Area',
	            color: '#64DEF1',
	            y: 5, //poner la resta de num max - personales - area
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color: '#C9C9C9',
                y: sum_asignadas-1-5, //poner la resta de num max - personales - area
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
// AUTORIZADAS	
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
	        text: '<span class="numero_grande">'+10+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
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
	        	size: "135%",
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
	        name: 'Asignadas',
	        innerSize: '80%',
	        data: [{
                name: 'Personales',
                color: '#00427F',
                y: 1, //poner la resta de num max - personales - area
                dataLabels: {
                    enabled: false}
        	},{
	            name: 'Area',
	            color:'#64DEF1', 
	            y: 5, //poner la resta de num max - personales - area
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color:'#C9C9C9',
                y: sum_totales-1-5, //poner la resta de num max - personales - area
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
// RECHAZADAS	
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
	        text: '<span class="numero_grande">'+2+'</span><br><span class="numero_chico">de '+sum_totales+'</span>',
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
	        	size: "135%",
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
                y: 1, //poner la resta de num max - personales - area
                dataLabels: {
                    enabled: false}
        	},{
	            name: 'Area',
	            color: '#64DEF1',
	            y: 5, //poner la resta de num max - personales - area
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Faltantes',
                color: '#C9C9C9',
                y: sum_totales-1-5, //poner la resta de num max - personales - area
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
}