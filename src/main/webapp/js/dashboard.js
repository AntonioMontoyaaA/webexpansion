//-------- CARGA AL INICIO
var fecha; 
var mes;
var dia;
var año;
var fecha_entera;
var perfil;
var area;
var areaId;
var fecha_general;
var fecha_generalH;
mesesarr = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
//variables para el dashboard-progreso general
var legend_e;
var legend_g;
var legend_c;
var legend_o;
var actual;
var E=0;
var G=0;
var C=0;
var O=0;
var sumaE=0;
var sumaG=0;
var sumaC=0;
var sumaO=0;
var sum_asignadas=0;
var sum_atrasadas=0;
var sum_autorizadas=0;
var sum_rechazadas=0;
var sum_totales=0;
var serie_proceso;
var serie_atrasadas;
var serie_autorizadas;
var serie_rechazadas;

$(function(){
		$('#iddashboard').addClass('resaltado'); //resalta en el header
		perfil=$('#perfil_usuario').val();
		area= $('#area').val();
		areaId=$('#areaId').val();
		
		$('#nombrePerfil').text('DASHBOARD ANALISTA '+area);
		cargafechas();
		inicializadatepickers();
		
		selectGeneral();
		selectHistorico();
		
		fecha_general="01/"+$('#datepickermes').val();
		fecha_generalH=$('#datepickersemanaH').val();
		
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
	invocarJSONServiceAction("DashboardGeneralAction", 
			{'tipoConsulta': $('#opcion').val(), 'fechaConsulta': fecha_general}, 
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
		E=data.areas.EXPANSION;
		G=data.areas.GESTORIA;
		C=data.areas.CONSTRUCCION;
		O=data.areas.OPERACIONES;
		sumaE=E.total;
		sumaG=G.total;
		sumaC=C.total;
		sumaO=O.total;
		

		serie_proceso='<span class="blanco t14 letra">En Proceso </span>';
		serie_atrasadas='<span class="blanco t14 letra">Atrasadas </span>';
		serie_autorizadas='<span class="blanco t14 letra">Autorizadas </span>';
		serie_rechazadas='<span class="blanco t14 letra">Rechazadas</span>';
		
		legend_e='<span class="negrita t14">EXPANSION</span><br><span class="negrita t14">'+sumaE+'</span>';
		legend_g='<span class="negrita t14">GESTORIA</span><br><span class="negrita t14">'+sumaG+'</span>';
		legend_c='<span class="negrita t14">CONSTRUCCION</span><br><span class="negrita t14">'+sumaC+'</span>';
		legend_o='<span class="negrita t14">OPERACIONES</span><br><span class="negrita t14">'+sumaO+'</span>';
		
		
		if(areaId==1){
			legend_e='<span class="blanco t14 negrita">EXPANSION</span><br><span class="negrita t14 blanco">'+sumaE+'</span>';
			actual=E;
		}
		if(areaId==2){
			legend_g='<span class="blanco t14 negrita">GESTORIA</span><br><span class="negrita t14 blanco">'+sumaG+'</span>';
			actual=G;
		}
		if(areaId==3){
			legend_c='<span class="blanco t14 negrita">CONSTRUCCION</span><br><span class="negrita t14 blanco">'+sumaC+'</span>';
			actual=C;
		}
		if(areaId==5){
			legend_o='<span class="blanco t14 negrita">OPERACIONES</span><br><span class="negrita t14 blanco">'+sumaO+'</span>';
			actual=O;
		}
	//perfil=4; //dir_area
	//perfil=3; //dir_general
	
	if(perfil==3){
	  $('.dir_general').show();
	  $('#container_proceso,#container_atrasadas,#container_autorizadas,#container_rechazadas').css('height','22%');
	  
	  sum_asignadas=E.asignadas+G.asignadas+C.asignadas+O.asignadas;
	  sum_atrasadas=E.atrasadas+G.atrasadas+C.atrasadas+O.atrasadas;
	  sum_autorizadas=E.autorizadas+G.autorizadas+C.autorizadas+O.autorizadas;
	  sum_rechazadas=E.rechazadas+G.rechazadas+C.rechazadas+O.rechazadas;
	  sum_totales= sum_asignadas + sum_autorizadas + sum_rechazadas;

	  
		Resumen_grafica_dirGeneral(data);	
	}
	if(perfil==4){
		$('#container_proceso,#container_atrasadas,#container_autorizadas,#container_rechazadas').css('height','24%');
		sum_asignadas=actual.asignadas;
		sum_atrasadas=actual.atrasadas;
		sum_autorizadas=actual.autorizadas;
		sum_rechazadas=actual.rechazadas;
		sum_totales= sum_asignadas + sum_autorizadas + sum_rechazadas;
		
		Resumen_grafica_dirArea(data);
	}
	if(perfil==5){
		$('.analista').show();
		sum_asignadas=actual.asignadas;
		sum_atrasadas=actual.atrasadas;
		sum_autorizadas=actual.autorizadas;
		sum_rechazadas=actual.rechazadas;
		sum_totales= sum_asignadas + sum_autorizadas + sum_rechazadas;
		
		Resumen_grafica_analista(data);
	}
	}
};	
}
function progSemanal(){
	cargafechas();

	invocarJSONServiceAction("DashboardPSemanalAction", 
			{'tipoConsulta': $('#opcion_historial').val(), 'fechaConsulta': fecha_generalH,
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
	}
	if($('#opcion_historial').val()=="1"){
		for(i=0;i<arreglo.length;i++){
			nuevacadena="Semana "+arreglo[i].substring(7,9)+"<br>"+arreglo[i].substring(10);
			ejex.push(nuevacadena);
		}
	
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
	        name: '<span class="letra azul t14">En proceso<span>',
	        color: color_proceso,
	        data: asignadas
	    }, {
	        name: '<span class="letra azul t14">Autorizadas<span>',
	        color: color_autorizadas,
	        data: autorizadas
	    }, {
	        name: '<span class="letra azul t14">Rechazadas<span>',
	        color: color_rechazadas,
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

if(datos.Enero!="undefined"){
	console.log("hhjhkjhk");
	ene_plan=datos.Enero.plan;
	ene_real=datos.Enero.real;
	if(mes=="ENERO"){
	$('#metas').text(ene_plan);
	$('#t_abiertas').text(ene_real);
	}
}
if(datos.Febrero!="undefined"){
	feb_plan=datos.Febrero.plan;
	feb_real=datos.Febrero.real;
	if(mes=="FEBRERO"){
	$('#metas').text(feb_plan);
	$('#t_abiertas').text(feb_real);
	}
}
if(datos.Marzo!="undefined"){
	mar_plan=datos.Marzo.plan;
	mar_real=datos.Marzo.real;
	if(mes=="MARZO"){
	$('#metas').text(mar_plan);
	$('#t_abiertas').text(mar_real);
	}
}
if(datos.Abril!="undefined"){
	abr_plan=datos.Abril.plan;
	abr_real=datos.Abril.real;
	if(mes=="ABRIL"){
	$('#metas').text(abr_plan);
	$('#t_abiertas').text(abr_real);
	}
}
if(datos.Mayo!="undefined"){
	may_plan=datos.Mayo.plan;
	may_real=datos.Mayo.real;
	if(mes=="MAYO"){
	$('#metas').text(may_plan);
	$('#t_abiertas').text(may_real);
	}
}
if(datos.Junio!="undefined"){
	jun_plan=datos.Junio.plan;
	jun_real=datos.Junio.real;
	if(mes=="JUNIO"){
	$('#metas').text(jun_plan);
	$('#t_abiertas').text(jun_real);
	}
}
if(datos.Julio!="undefined"){
	jul_plan=datos.Julio.plan;
	jul_real=datos.Julio.real;
	if(mes=="JULIO"){
	$('#metas').text(jul_plan);
	$('#t_abiertas').text(jul_real);
	}
}
if(datos.Agosto!="undefined"){
	ago_plan=datos.Agosto.plan;
	ago_real=datos.Agosto.real;
	if(mes=="AGOSTO"){
	$('#metas').text(ago_plan);
	$('#t_abiertas').text(ago_real);
	}
}
if(datos.Septiembre!="undefined"){
	sep_plan=datos.Septiembre.plan;
	sep_real=datos.Septiembre.real;
	if(mes=="SEPTIEMBRE"){
	$('#metas').text(sep_plan);
	$('#t_abiertas').text(sep_real);
	}
}
if(datos.Octubre!="undefined"){
	oct_plan=datos.Octubre.plan;
	oct_real=datos.Octubre.real;
	if(mes=="OCTUBRE"){
	$('#metas').text(oct_plan);
	$('#t_abiertas').text(oct_real);
	}
}
if(datos.Noviembre!="undefined"){
	nov_plan=datos.Noviembre.plan;
	nov_real=datos.Noviembre.real;
	if(mes=="NOVIEMBRE"){
	$('#metas').text(nov_plan);
	$('#t_abiertas').text(nov_real);
	}
}
if(datos.Diciembre!="undefined"){
	dic_plan=datos.Diciembre.plan;
	dic_real=datos.Diciembre.real;
	if(mes=="DICIEMBRE"){
	$('#metas').text(dic_plan);
	$('#t_abiertas').text(dic_real);
	}
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
//---------------------------------  ARMA GRAFICA RESUMEN
// ASIGNADAS
var color_proceso="#40BCD8";
var color_rechazadas="#FF5B16";
var color_autorizadas="#1E9D42";
var color_atrasadas="#00417F";

function inicializadatepickers(){
	$('#datepickerdia').datepicker({
		endDate: new Date(),
		format : 'dd/mm/yyyy',
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	$('#datepickersemana').datepicker({
		endDate: new Date(),
		format : 'dd/mm/yyyy',
		autoclose : true,
		language : 'es',
		todayHighlight : true,
    });
	
	$('#datepickermes').datepicker({
		endDate: new Date(),
		format : 'mm/yyyy',
		 startView: "months", 
		 minViewMode: "months",
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	$('#datepickerbim').datepicker({
		endDate: new Date(),
		format : 'mm/yyyy',
		 startView: "months", 
		 minViewMode: "months",
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	$('#datepickertrim').datepicker({
		endDate: new Date(),
		format : 'mm/yyyy',
		 startView: "months", 
		 minViewMode: "months",
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	$('#datepickersem').datepicker({
		endDate: new Date(),
		format : 'mm/yyyy',
		 startView: "months", 
		 minViewMode: "months",
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	
	$('#datepickeraño').datepicker({
		endDate: new Date(),
		format : 'yyyy',
		startView: "years", 
		 minViewMode: "years",
		autoclose : true,
		language : 'es',
		todayHighlight : true,
		viewMode: 'weeks'
    });

	$('#datepickerdiaH').datepicker({
		endDate: new Date(),
		format : 'dd/mm/yyyy',
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	$('#datepickersemanaH').datepicker({
		endDate: new Date(),
		format : 'dd/mm/yyyy',
		autoclose : true,
		language : 'es',
		todayHighlight : true,
    });
	
	$('#datepickermesH').datepicker({
		endDate: new Date(),
		format : 'mm/yyyy',
		 startView: "months", 
		 minViewMode: "months",
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	$('#datepickerbimH').datepicker({
		endDate: new Date(),
		format : 'mm/yyyy',
		 startView: "months", 
		 minViewMode: "months",
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	$('#datepickertrimH').datepicker({
		endDate: new Date(),
		format : 'mm/yyyy',
		 startView: "months", 
		 minViewMode: "months",
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	$('#datepickersemH').datepicker({
		endDate: new Date(),
		format : 'mm/yyyy',
		 startView: "months", 
		 minViewMode: "months",
		autoclose : true,
		language : 'es',
		todayHighlight : true
    });
	
	$('#datepickerañoH').datepicker({
		endDate: new Date(),
		format : 'yyyy',
		startView: "years", 
		 minViewMode: "years",
		autoclose : true,
		language : 'es',
		todayHighlight : true,
		viewMode: 'weeks'
    });
	
	$('#datepickerdia').on("change", function() {
	       if($('#datepickerdia').val()!=''){
	    	   fecha_general=$('#datepickerdia').val();
	    	   $('#pg_fecha').text(fecha_general);
	    	   progGeneral();
	    	   $("#fechaConsulta").val(fecha_general);
	    	   EnviaFecha();
	       }
	    });
	$('#datepickersemana').on("change", function() {
    	if($('#datepickersemana').val()!=''){
    		fecha_general=$('#datepickersemana').val();
    		progGeneral();
    		 $('#pg_fecha').text('SEMANA '+fecha_general);
    		$("#fechaConsulta").val(fecha_general);
    		EnviaFecha();
    	}
     });
	$('#datepickermes').on("change", function() {
    	if($('#datepickermes').val()!=''){
    		fecha_general="01/"+$('#datepickermes').val();
    		$('#pg_fecha').text('MES '+$('#datepickermes').val());
    		progGeneral();
    		$("#fechaConsulta").val(fecha_general);
    		EnviaFecha();
    	}
     });
	$('#datepickerbim').on("change", function() {
    	if($('#datepickerbim').val()!=''){
    		fecha_general="01/"+$('#datepickerbim').val();
    		$('#pg_fecha').text('BIMESTRE '+$('#datepickerbim').val());
    		progGeneral();
    		$("#fechaConsulta").val(fecha_general);
    		EnviaFecha();
    	}
     });
	$('#datepickertrim').on("change", function() {
    	if($('#datepickertrim').val()!=''){
    		fecha_general="01/"+$('#datepickertrim').val();
    		$('#pg_fecha').text('TRIMESTRE '+$('#datepickertrim').val());
    		progGeneral();
    		$("#fechaConsulta").val(fecha_general);
    		EnviaFecha();
    	}
     });
	$('#datepickersem').on("change", function() {
    	if($('#datepickersem').val()!=''){
    		fecha_general="01/"+$('#datepickersem').val();
    		$('#pg_fecha').text('SEMESTRE '+$('#datepickersem').val());
    		progGeneral();
    		$("#fechaConsulta").val(fecha_general);
    		EnviaFecha();
    	}
     });
	$('#datepickeraño').on("change", function() {
    	if($('#datepickeraño').val()!=''){
    		fecha_general="01/01/"+$('#datepickeraño').val();
    		$('#pg_fecha').text("AÑO "+$('#datepickeraño').val());
    		progGeneral();
    		$("#fechaConsulta").val(fecha_general);
    		EnviaFecha();
    	}
     });
	$('#datepickerdiaH').on("change", function() {
	       if($('#datepickerdiaH').val()!=''){
	    	   fecha_generalH=$('#datepickerdiaH').val();
	    	   $('#sub_historial').text(fecha_generalH);
	    	   progSemanal();
	       }
	    });
	$('#datepickersemanaH').on("change", function() {
	    	if($('#datepickersemanaH').val()!=''){
	    		fecha_generalH=$('#datepickersemanaH').val();
	    		 $('#sub_historial').text('SEMANA '+fecha_generalH);
	    		progSemanal();
	    	}
	     });
	$('#datepickermesH').on("change", function() {
    	if($('#datepickermesH').val()!=''){
    		fecha_generalH="01/"+$('#datepickermesH').val();
    		progSemanal();
    	}
     });
	$('#datepickerbimH').on("change", function() {
    	if($('#datepickerbimH').val()!=''){
    		fecha_generalH="01/"+$('#datepickerbimH').val();
    		progSemanal();
    	}
     });
	$('#datepickertrimH').on("change", function() {
    	if($('#datepickertrimH').val()!=''){
    		fecha_generalH="01/"+$('#datepickertrimH').val();
    		progSemanal();
    	}
     });
	$('#datepickersemH').on("change", function() {
    	if($('#datepickersemH').val()!=''){
    		fecha_generalH="01/"+$('#datepickersemH').val();
    		progSemanal();
    	}
     });
	$('#datepickerañoH').on("change", function() {
    	if($('#datepickerañoH').val()!=''){
    		fecha_generalH="01/01/"+$('#datepickerañoH').val();
    		progSemanal();
    	}
     });
}

function selectGeneral() {
	$('#datepickerdia').hide();
	$('#datepickersemana').hide();
	$('#datepickermes').hide();
	$('#datepickerbim').hide();
	$('#datepickertrim').hide();
	$('#datepickersem').hide();
	$('#datepickeraño').hide();

	if ($('#opcion').val() == "0") {
		$('#pg_fecha').text(fecha);
		$('#datepickerdia').datepicker("setDate", "0");
		if ($('#datepickerdia').val() != '') {
			fecha_general = $('#datepickerdia').val();
			progGeneral();
			$("#fechaConsulta").val(fecha_general);
			EnviaFecha();
		}
		$('#datepickerdia').show();

	}
	if ($('#opcion').val() == "1") {
		$('#pg_fecha').text('SEMANA '+fecha);
		if ($('#datepickersemana').val() != '') {
			fecha_general = $('#datepickersemana').val();
			progGeneral();
			$("#fechaConsulta").val(fecha_general);
			EnviaFecha();
		}
		$('#datepickersemana').datepicker("setDate", "0");
		$('#datepickersemana').show();
	}

	if ($('#opcion').val() == "2") {
		$('#pg_fecha').text(mes + ' ' + año);

		if ($('#datepickermes').val() != '') {
			fecha_general = "01/" + $('#datepickermes').val();
			progGeneral();
			$("#fechaConsulta").val(fecha_general);
			EnviaFecha();
		}
		$('#datepickermes').datepicker("setDate", "0");
		$('#datepickermes').show();
	}
	if ($('#opcion').val() == "3") {
		$('#pg_fecha').text('BIMESTRE');
		if ($('#datepickerbim').val() != '') {
			fecha_general = "01/" + $('#datepickerbim').val();
			progGeneral();
			$("#fechaConsulta").val(fecha_general);
			EnviaFecha();
		}
		$('#datepickerbim').datepicker("setDate", "0");
		$('#datepickerbim').show();

	}
	if ($('#opcion').val() == "4") {
		$('#pg_fecha').text('TRIMESTRE');
		if ($('#datepickertrim').val() != '') {
			fecha_general = "01/" + $('#datepickertrim').val();
			progGeneral();
			$("#fechaConsulta").val(fecha_general);
			EnviaFecha();
		}
		$('#datepickertrim').datepicker("setDate", "0");
		$('#datepickertrim').show();
	}
	if ($('#opcion').val() == "5") {
		$('#pg_fecha').text('SEMESTRE');
		if ($('#datepickersem').val() != '') {
			fecha_general = "01/" + $('#datepickersem').val();
			progGeneral();
			$("#fechaConsulta").val(fecha_general);
			EnviaFecha();
		}
		$('#datepickersem').datepicker("setDate", "0");
		$('#datepickersem').show();

	}
	if ($('#opcion').val() == "6") {
		$('#pg_fecha').text('AÑO ' + año);
		if ($('#datepickeraño').val() != '') {
			fecha_general = "01/01/" + $('#datepickeraño').val();
			progGeneral();
			$("#fechaConsulta").val(fecha_general);
			EnviaFecha();
		}
		$('#datepickeraño').datepicker("setDate",'"'+año+'"');
		$('#datepickeraño').show();
	}
}

function selectHistorico(){
	$('#datepickerdiaH').hide();
	$('#datepickersemanaH').hide();
	$('#datepickermesH').hide();
	$('#datepickerbimH').hide();
	$('#datepickertrimH').hide();
	$('#datepickersemH').hide();
	$('#datepickerañoH').hide();
	


		if ($('#opcion_historial').val() == "0") {
		$('#sub_historial').text(fecha);
		if ($('#datepickerdiaH').val() != '') {
			fecha_generalH = $('#datepickerdiaH').val();
			progSemanal();
		}
		$('#datepickerdiaH').datepicker("setDate", "0");
		$('#datepickerdiaH').show();
	}
	if ($('#opcion_historial').val() == "1") {
		if ($('#datepickersemanaH').val() != '') {
			fecha_generalH = $('#datepickersemanaH').val();
			progSemanal();
		}

		$('#datepickersemanaH').datepicker("setDate", "0");
		$('#datepickersemanaH').show();
	}

	if ($('#opcion_historial').val() == "2") {
		if ($('#datepickermesH').val() != '') {
			fecha_generalH = "01/" + $('#datepickermesH').val();
			progSemanal();
		}
		$('#datepickermesH').datepicker("setDate", "0");
		$('#datepickermesH').show();
	}
	if ($('#opcion_historial').val() == "3") {
		if ($('#datepickerbimH').val() != '') {
			fecha_generalH = "01/" + $('#datepickerbimH').val();
			progSemanal();
		}
		$('#datepickerbimH').datepicker("setDate", "0");
		$('#datepickerbimH').show();

	}
	if ($('#opcion_historial').val() == "4") {
		if ($('#datepickertrimH').val() != '') {
			fecha_generalH = "01/" + $('#datepickertrimH').val();
			progSemanal();
		}
		$('#datepickertrimH').datepicker("setDate", "0");
		$('#datepickertrimH').show();
	}
	if ($('#opcion_historial').val() == "5") {
		if ($('#datepickersemH').val() != '') {
			fecha_generalH = "01/" + $('#datepickersemH').val();
			progSemanal();
		}
		$('#datepickersemH').datepicker("setDate", "0");
		$('#datepickersemH').show();
	}

	if ($('#opcion_historial').val() == "6") {
		$('#titulo_historial').text('AÑO ' + año);

		if ($('#datepickerañoH').val() != '') {
			fecha_generalH = "01/01/" + $('#datepickerañoH').val();
			progSemanal();
		}
		$('#datepickerañoH').datepicker("setDate", '"'+año+'"');
		$('#datepickerañoH').show();
	}
}

function EnviaFecha(){

	invocarJSONServiceAction("EnviaFechaAction", 
			{'fechaConsulta': fecha_general}, 
			'');
}