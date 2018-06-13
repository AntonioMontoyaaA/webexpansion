function Resumen_grafica_analista(data){

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
		    	backgroundColor: '#071B36',
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
		           legend_e,
		           legend_g,
		           legend_c,
		           legend_o
		        ],
		        crosshair: true },
		  
		        series: [{
		        name: serie_proceso,
		        color: color_proceso,
		        data: [E.asignadas, G.asignadas, C.asignadas, O.asignadas]
		    }, {
		        name: serie_atrasadas,
		        color: color_atrasadas,
		        data: [E.atrasadas, G.atrasadas, C.atrasadas, O.atrasadas]
		    }, {
		        name: serie_autorizadas,
		        color: color_autorizadas,
		        data: [E.autorizadas, G.autorizadas, C.autorizadas, O.autorizadas]
		    },{
		        name: serie_rechazadas,
		        color: color_rechazadas,
		        data: [E.rechazadas, G.rechazadas, C.rechazadas, O.rechazadas]
		    }],
		    tooltip:{
		    	headerFormat:''
		    }
		    
		});
// GRAFICA PANTALLA CHICA 1
	Highcharts.chart('container_sm1', {
	    chart: {
	    	backgroundColor: '#071B36',
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
	        name: serie_proceso,
	        color: color_proceso,
	        data: [data.areas.EXPANSION.asignadas, data.areas.GESTORIA.asignadas]
	    }, {
	        name: serie_atrasadas,
	        color: color_atrasadas,
	        data: [data.areas.EXPANSION.atrasadas, data.areas.GESTORIA.atrasadas]
	    }, {
	        name: serie_autorizadas,
	        color: color_autorizadas,
	        data: [data.areas.EXPANSION.autorizadas, data.areas.GESTORIA.autorizadas]
	    },{
	        name: serie_rechazadas,
	        color: color_rechazadas,
	        data: [data.areas.EXPANSION.rechazadas, data.areas.GESTORIA.rechazadas]
	    }],
	    tooltip:{
	    	headerFormat:''
	    }
	});
// GRAFICA PANTALLA CHICA 2
	Highcharts.chart('container_sm2', {
	    chart: {
	    	backgroundColor: '#071B36',
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
	        name: serie_proceso,
	        color: color_proceso,
	        data: [data.areas.CONSTRUCCION.asignadas, data.areas.OPERACIONES.asignadas]
	    }, {
	        name: serie_atrasadas,
	        color: color_atrasadas,
	        data: [data.areas.CONSTRUCCION.atrasadas, data.areas.OPERACIONES.atrasadas]
	    }, {
	        name: serie_autorizadas,
	        color: color_autorizadas,
	        data: [data.areas.CONSTRUCCION.autorizadas, data.areas.OPERACIONES.autorizadas]
	    },{
	        name: serie_rechazadas,
	        color: color_rechazadas,
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
	        text: '<span class="numero_grande negrita azul">'+sum_asignadas+'</span><br><span class="numero_chico azul">de '+sum_totales+'</span>',
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
	                name: 'Otras',
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
	        text: '<span class="numero_grande azul negrita">'+sum_atrasadas+'</span><br><span class="numero_chico azul">de '+sum_asignadas+'</span>',
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
                name: 'Otras',
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
	    	backgroundColor: '#071B36',
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
	        text: '<span class="numero_grande negrita blanco">'+sum_autorizadas+'</span><br><span class="numero_chico blanco">de '+sum_totales+'</span>',
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
                name: 'Otras',
                color:'white',
                y: sum_totales-sum_autorizadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
// ************************************ RECHAZADAS	
	Highcharts.chart('container_rechazadas', {
	    chart: {
	    	backgroundColor: '#071B36',
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
	        text: '<span class="numero_grande negrita blanco">'+sum_rechazadas+'</span><br><span class="numero_chico blanco">de '+sum_totales+'</span>',
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
                name: 'Otras',
                color: 'white',
                y: sum_totales-sum_rechazadas, 
                dataLabels: {
                    enabled: false}
            }]
	    }]
	});
}

