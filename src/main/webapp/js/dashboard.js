$(function(){
		$('#iddashboard').addClass('resaltado');
		
		Highcharts.chart('container', {
		    data: {
		        table: 'datatable'
		    },
		    chart: {
		        type: 'column'
		    },   
		    title: {
		        text: 'Proceso general de tablas'
		    },
		    yAxis: {
		        allowDecimals: false,
		        title: {
		            text: 'Units'
		        }
		    },
		    tooltip: {
		        formatter: function () {
		            return '<b>' + this.series.name + '</b><br/>' +
		                this.point.y + ' ' + this.point.name.toLowerCase();
		        }
		    }
		});
});

