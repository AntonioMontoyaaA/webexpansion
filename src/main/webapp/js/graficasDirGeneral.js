
function Resumen_grafica_dirGeneral(data){
	$('#nombrePerfil').text('DASHBOARD DIRECTOR GENERAL');

	$('#sum_asignadas').text(sum_asignadas);
	$('#sum_atrasadas').text(sum_atrasadas);
	$('#sum_autorizadas').text(sum_autorizadas);
	$('#sum_rechazadas').text(sum_rechazadas);
	$('#sum_totales').text(sum_totales);

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
		            legend_o,
		            legend_a
		        ],
		        crosshair: true },
		  
		        series: [{
		        name: serie_proceso,
		        color: color_proceso,
		        data: [E.asignadas, G.asignadas, C.asignadas, O.asignadas, A.asignadas]
		    }, {
		        name: serie_atrasadas,
		        color: color_atrasadas,
		        data: [E.atrasadas, G.atrasadas, C.atrasadas, O.atrasadas, A.atrasadas]
		    }, {
		        name: serie_autorizadas,
		        color: color_autorizadas,
		        data: [E.autorizadas, G.autorizadas, C.autorizadas, O.autorizadas, A.autorizadas]
		    },{
		        name: serie_rechazadas,
		        color: color_rechazadas,
		        data: [E.rechazadas, G.rechazadas, C.rechazadas, O.rechazadas, A.rechazadas]
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
	        	 legend_e,
		            legend_g
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
	        	legend_c,
	            legend_o,
	            legend_a
	        ],
	        crosshair: true },
	        series: [{
	        name: serie_proceso,
	        color: color_proceso,
	        data: [data.areas.CONSTRUCCION.asignadas, data.areas.OPERACIONES.asignadas, data.areas.AUDITORIA.asignadas]
	    }, {
	        name: serie_atrasadas,
	        color: color_atrasadas,
	        data: [data.areas.CONSTRUCCION.atrasadas, data.areas.OPERACIONES.atrasadas, data.areas.AUDITORIA.atrasadas]
	    }, {
	        name: serie_autorizadas,
	        color: color_autorizadas,
	        data: [data.areas.CONSTRUCCION.autorizadas, data.areas.OPERACIONES.autorizadas, data.areas.AUDITORIA.autorizadas]
	    },{
	        name: serie_rechazadas,
	        color: color_rechazadas,
	        data: [data.areas.CONSTRUCCION.rechazadas, data.areas.OPERACIONES.rechazadas, data.areas.AUDITORIA.rechazadas]
	    }],
	    tooltip:{
	    	headerFormat:''
	    }
	});
	

// ********************** RESUMEN GENERAL
//************** ASIGNADAS
	var color_e="#00417F";
	var color_g="#FF5B16";
	var color_c="#1E9D42";
	var color_o="#40BCD8";
	var color_a="#FFC300";

	
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
		            name: 'Expansión',
		            color: color_e,
		            y: E.asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},{
		            name: 'Gestoría',
		            color: color_g,
		            y: G.asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},{
		            name: 'Construcción',
		            color: color_c,
		            y: C.asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},{
		            name: 'Operaciones',
		            color: color_o,
		            y: O.asignadas, 
		            dataLabels: {
		                    enabled: false}
	        	},
	        	{
		            name: 'Auditoria',
		            color: color_a,
		            y: A.asignadas, 
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
	            name: 'Expansión',
	            color: color_e,
	            y: E.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Gestoría',
	            color: color_g,
	            y: G.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Construcción',
	            color: color_c,
	            y: C.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Operaciones',
	            color: color_o,
	            y: O.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Auditoria',
	            color: color_a,
	            y: A.atrasadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Otras',
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
	            name: 'Expansión',
	            color: color_e,
	            y: E.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Gestoría',
	            color: color_g,
	            y: G.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Construcción',
	            color: color_c,
	            y: C.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Operaciones',
	            color:color_o,
	            y: O.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Auditoría',
	            color:color_a,
	            y: A.autorizadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
                name: 'Otras',
                color: 'white',
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
	            name: 'Expansión',
	            color: color_e,
	            y: E.rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Gestoría',
	            color: color_g,
	            y: G.rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Construcción',
	            color: color_c,
	            y: C.rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Operaciones',
	            color:color_o,
	            y: O.rechazadas, 
	            dataLabels: {
	                    enabled: false}
        	},{
	            name: 'Auditoría',
	            color:color_a,
	            y: A.rechazadas, 
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

