$(function(){
		$('#iddashboard').addClass('resaltado'); //para el efecto de header
		progGeneral_Tablas();
});
function progGeneral_Tablas(){
	invocarJSONServiceAction("DashboardGeneralAction", 
			{'tipoConsulta': '2', 'fechaConsulta': '23/04/2018'}, 
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
	//prueba de cambio :)
	if(data.codigo==200) {
		console.log("*** ENTRA A DATOS ***");
		//cargaMensajeModal('MD ASIGNADAS', 'Se consultaron exitosamente los datos', TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ERROR, redireccionaConsulta);
		//var resultados = data.listaAsignadas
		cargaMensajeModal("Dashboard", "Se consult\u00F3 exitosamente", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ERROR, funcion_prueba);

	}
};	

	
	var id="";
	var contenedor="";
	
	var html="";
    html=html+'<thead>';
    html=html+'<tr>';
    html=html+'<th></th>';
    html=html+'<th>Asignadas</th>';
    html=html+'<th>Atrasadas</th>';
    html=html+'<th>Autorizadas</th>';
    html=html+'<th>Rechazadas</th>';
    html=html+'</tr>';
    html=html+'</thead>';
    html=html+'<tbody>';
    
    html=html+'<tr>';
    html=html+'<th>EXPANSION</th>';
    html=html+'<td>8</td>';
    html=html+'<td>2</td>';
    html=html+'<td>2</td>';
    html=html+'<td>5</td>';
    html=html+'</tr>';
   
    html=html+'<tr>';
    html=html+'<th>GESTORIA</th>';
    html=html+'<td>1</td>';
    html=html+'<td>0.2</td>';
    html=html+'<td>0.2</td>';
    html=html+'<td>1</td>';
    html=html+'</tr>';
    
    html=html+'<tr>';
    html=html+'<th>CONSTRUCCION</th>';
    html=html+'<td>0.2</td>';
    html=html+'<td>0.2</td>';
    html=html+'<td>1</td>';
    html=html+'<td>1</td>';
    html=html+'</tr>';
    
    html=html+'<tr>';
    html=html+'<th>OPERACIONES</th>';
    html=html+'<td>2</td>';
    html=html+'<td>2</td>';
    html=html+'<td>0.2</td>';
    html=html+'<td>0.2</td>';
    html=html+'</tr>';
    
    html=html+'</tbody>';
    
    $('#datatable').append(html);
    id='datatable';
    contenedor='container';
	armaGrafica(id,contenedor);
   
	// ---------------------------------------------------- TABLA_SM1
	html="";
    html=html+'<thead>';
    html=html+'<tr>';
    html=html+'<th></th>';
    html=html+'<th>Asignadas</th>';
    html=html+'<th>Atrasadas</th>';
    html=html+'<th>Autorizadas</th>';
    html=html+'<th>Rechazadas</th>';
    html=html+'</tr>';
    html=html+'</thead>';
    html=html+'<tbody>';
    
    html=html+'<tr>';
    html=html+'<th>EXPANSION</th>';
    html=html+'<td>8</td>';
    html=html+'<td>2</td>';
    html=html+'<td>2</td>';
    html=html+'<td>5</td>';
    html=html+'</tr>';
   
    html=html+'<tr>';
    html=html+'<th>GESTORIA</th>';
    html=html+'<td>1</td>';
    html=html+'<td>0.2</td>';
    html=html+'<td>0.2</td>';
    html=html+'<td>1</td>';
    html=html+'</tr>';
    
    html=html+'</tbody>';
    
    $('#datatable_sm1').append(html);
    id='datatable_sm1';
    contenedor='container_sm1';
	armaGrafica(id,contenedor);
    
    html="";
    html=html+'<thead>';
    html=html+'<tr>';
    html=html+'<th></th>';
    html=html+'<th>Asignadas</th>';
    html=html+'<th>Atrasadas</th>';
    html=html+'<th>Autorizadas</th>';
    html=html+'<th>Rechazadas</th>';
    html=html+'</tr>';
    html=html+'</thead>';
    html=html+'<tbody>';
    
    html=html+'<tr>';
    html=html+'<th>CONSTRUCCION</th>';
    html=html+'<td>0.2</td>';
    html=html+'<td>0.2</td>';
    html=html+'<td>1</td>';
    html=html+'<td>1</td>';
    html=html+'</tr>';
    
    html=html+'<tr>';
    html=html+'<th>OPERACIONES</th>';
    html=html+'<td>2</td>';
    html=html+'<td>2</td>';
    html=html+'<td>0.2</td>';
    html=html+'<td>0.2</td>';
    html=html+'</tr>';
    
    html=html+'</tbody>';
    
    $('#datatable_sm2').append(html);
    id='datatable_sm2';
    contenedor='container_sm2';
	armaGrafica(id,contenedor);
}
function funcion_prueba(){
	console.log("se ejecutó exitosamente");
}
// ------------------------------------------------------ ARMA GRAFICA
function armaGrafica(id,contenedor){
Highcharts.chart(contenedor, {
    data: {
        table: id
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
        }
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.point.y + ' ' + this.point.name.toLowerCase();
        }
    }
});
}