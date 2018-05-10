//-------- CARGA AL INICIO
$(function(){
		$('#iddashboard').addClass('resaltado'); //para el efecto de header
		$('.fecha').text('Hoy 04 de Mayo del 2018 12:22PM');
		progGeneral();
		progSemanal();
		AperturaMensual();
		Resumen();
					
});

// ---------------------- CONSULTAS AL ACTION
function progGeneral(){
	invocarJSONServiceAction("DashboardGeneralAction", 
			{'tipoConsulta': $('#opcion').val(), 'fechaConsulta': '23/04/2018'}, 
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
	if(data.codigo == 404){
		console.log("*** ENTRA A ERROR ***");	
	}
	if(data.codigo==200) {
		console.log("*** ENTRA A DATOS ***");
		progGeneral_grafica(data);
	}
};	
}
function progSemanal(){
	progSemanal_grafica();
}
function AperturaMensual(){
	AperturaMensual_grafica();
}
function Resumen(){
	Resumen_grafica();
}

// ------------------------------- ARMA GRAFICA PROGRESO GENERAL
function progGeneral_grafica(data){
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
	            'Expansion',
	            'Gestoría',
	            'Construcción',
	            'Operaciones'
	        ],
	        crosshair: true },
	  
	        series: [{
	        name: 'Asignadas',
	        color: '#CCE0F4',
	        data: [data.areas.EXPANSION.asignadas, data.areas.GESTORIA.asignadas, data.areas.CONSTRUCCION.asignadas, data.areas.OPERACIONES.asignadas]
	    }, {
	        name: 'Atrasadas',
	        color: '#005B97',
	        data: [data.areas.EXPANSION.atrasadas, data.areas.GESTORIA.atrasadas, data.areas.CONSTRUCCION.atrasadas, data.areas.OPERACIONES.atrasadas]
	    }, {
	        name: 'Autorizadas',
	        color: '#64DEF1',
	        data: [data.areas.EXPANSION.autorizadas, data.areas.GESTORIA.autorizadas, data.areas.CONSTRUCCION.autorizadas, data.areas.OPERACIONES.autorizadas]
	    },{
	        name: 'Rechazadas',
	        color: '#FF5B16',
	        data: [data.areas.EXPANSION.rechazadas, data.areas.GESTORIA.rechazadas, data.areas.CONSTRUCCION.rechazadas, data.areas.OPERACIONES.rechazadas]
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
function AperturaMensual_grafica(){
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
		        data: [15-10,15-3,15-4, 15-7, 15-2,15-3,15-3,15-3,15-3,15-3,15-3,15-3]
		    },{
		    	name: 'Aperturas',
		    	color: '#40BCD8',
		    	data: [10, 3, 4, 7, 2,3,3,3,3,3,3,3]
		    }]
	});
}
//---------------------------------  ARMA GRAFICA RESUMEN
// ASIGNADAS
function Resumen_grafica(){
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
	        text: '<span class="numero_grande">'+6+'</span><br><span class="numero_chico">de '+17+'</span>',
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
	                y: 17-1-5, //poner la resta de num max - personales - area
	                dataLabels: {
	                    enabled: false}
	            }]
	    }]
	    
	});
// ATRASADAS
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
	        text: '<span class="numero_grande">'+9+'</span><br><span class="numero_chico">de '+17+'</span>',
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
                y: 17-1-5, //poner la resta de num max - personales - area
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
	        text: '<span class="numero_grande">'+10+'</span><br><span class="numero_chico">de '+17+'</span>',
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
                y: 17-1-5, //poner la resta de num max - personales - area
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
	        text: '<span class="numero_grande">'+2+'</span><br><span class="numero_chico">de '+17+'</span>',
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
                y: 17-1-5, //poner la resta de num max - personales - area
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
}