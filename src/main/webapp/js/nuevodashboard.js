var fecha;
var perfil;
var area;
var areaId;

var MDS_ACTIVAS = 1
var MDS_ATRASADAS = 2;
var MDS_CANCELADAS = 0;

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
	        labels: {
	             style: {
	                 color: 'white'
	             }
	        }
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
	    	   shared: false,
	    	   formatter: function() {
	    		   var text="";
	    		  
	    		   text = this.x;
	    		   
	    		   if(text=="Ene") {
	    	         return ('<b>Objetivo:</b> '+ene_plan+'<br><b>Real: </b> '+ene_real);
	    	       } 
	    		   if(text=="Feb") {
	    			   return ('<b>Objetivo:</b> '+feb_plan+'<br><b>Real: </b> '+feb_real);
		    	    }
	    		   if(text=="Mar") {
	    			   return ('<b>Objetivo:</b> '+mar_plan+'<br><b>Real: </b> '+mar_real);
		    	    }
	    		   if(text=="Abr") {
	    			   return ('<b>Objetivo:</b> '+abr_plan+'<br><b>Real: </b> '+abr_real);
		    	    }
	    		   if(text=="May") {
	    			   return ('<b>Objetivo:</b> '+may_plan+'<br><b>Real: </b> '+may_real);
		    	    }
	    		   if(text=="Jun") {
	    			   return ('<b>Objetivo:</b> '+jun_plan+'<br><b>Real: </b> '+jun_real);
		    	    }
	    		   if(text=="Jul") {
	    			   return ('<b>Objetivo:</b> '+jul_plan+'<br><b>Real: </b> '+jul_real);
		    	    }
	    		   if(text=="Ago") {
	    			   return ('<b>Objetivo:</b> '+ago_plan+'<br><b>Real: </b> '+ago_real);
		    	    }
	    		   if(text=="Sep") {
	    			   return ('<b>Objetivo:</b> '+sep_plan+'<br><b>Real: </b> '+sep_real);
		    	    }
	    		   if(text=="Oct") {
	    			   return ('<b>Objetivo:</b> '+oct_plan+'<br><b>Real: </b> '+oct_real);
		    	    }
	    		   if(text=="Nov") {
	    			   return ('<b>Objetivo:</b> '+nov_plan+'<br><b>Real: </b> '+nov_real);
		    	    }
	    		   if(text=="Dic") {
	    			   return ('<b>Objetivo:</b> '+dic_plan+'<br><b>Real: </b>'+dic_real);
		    	    }
	    		   
	    	      /* var text = '';
	    	       if(this.series.name == 'Objetivo') {
	    	           text = this.x + ': ' + this.series.name +
	    	                  '<br> $' + Highcharts.numberFormat(this.y, 0);
	    	       } else {
	    	           text = 'In ' + this.x + ' the median value was' + this.median +
	    	                  'and the total $' + Highcharts.numberFormat(this.y, 0);
	    	       }
	    	       return text;*/
	    	   }
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
			var size_total=size*descripcion_arreglo.length;
		}
		else{
			var size_total=6.6*descripcion_arreglo.length;
			var size=100/descripcion_arreglo.length;
		}
		
		pintaActivas(descripcion_arreglo, filtrados);
		
		$('#proceso').css('min-width',size_total+'%');
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
			$('#proceso').css('min-width',size_total+'%');
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
			$('#proceso').css('min-width',size_total+'%');
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
			$('#proceso').css('min-width',size_total+'%');
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

 //arreglo son submodulos para enviar a las tablas
function pintaActivas(arreglo,filtrados){
	$('#proceso').hide();
	html=inicio();

	var cont=0;
	var existe_modulo=false;
	var submodulos_global=[];
	
	for(var i=0;i<arreglo.length;i++){
		var existe_submodulo=false;
		var existe_submodulo2=false;
		
		$.each($(".permisos_sub"),function(index, value){
			if(value.value=='PRIVILEGIO.MENU.VOKSE.16=true'){
				existe_modulo=true;
			}
			if(value.value=='PRIVILEGIO.SUBMENU.VOKSE.16,'+filtrados[cont].estatusid+'=true'){
				existe_submodulo=true;
			}
			if(arreglo[i]==2){
				if(value.value=='PRIVILEGIO.SUBMENU.VOKSE.16,'+filtrados[cont+1].estatusid+'=true'){
					existe_submodulo2=true;
				}
			}
			
		});
		
		var cadenas=filtrados[cont].estatus.replace('VALIDACION','VOBO').split('-',2);
		var cant="";
		var color="";
		var estatusId = filtrados[cont].estatusid;
		
		if(filtrados[cont].totalSum!=undefined){
			cant=filtrados[cont].totalSum;
		}else{
			cant=filtrados[cont].total;
		}
			if(existe_submodulo==true || existe_modulo==false && filtrados[cont].areaValidacion==$('#areaId').val() && perfil!='3'){
				color="verde cursor";
				submodulos_global.push(filtrados[cont].estatusid);
			}
			else{
				color="blanco";
				if(perfil=='3'){
					color="blanco cursor";
					submodulos_global.push(filtrados[cont].estatusid);
				}		
			}
		
		if(arreglo[i]==1){
			html=html+simple(cadenas[1] ,cant ,cadenas[0], color, estatusId, MDS_ACTIVAS);
		}
		if(arreglo[i]==2){
			var cadenas2= filtrados[cont+1].estatus.replace('VALIDACION','VOBO').split('-',2);
			var cant2= "";
			var color2="";
			var estatusId2 = filtrados[cont+1].estatusid;
			
			if(filtrados[cont+1].totalSum!=undefined){
				cant2=filtrados[cont+1].totalSum;
			}else{
				cant2=filtrados[cont+1].total;
			}
			if(existe_submodulo2==true || existe_modulo==false && filtrados[cont+1].areaValidacion==$('#areaId').val() && perfil!='3'){
				color2="verde cursor";
				submodulos_global.push(filtrados[cont+1].estatusid);
			}
			else{
				color2="blanco";
				if(perfil=='3'){
					color2="blanco cursor";
					submodulos_global.push(filtrados[cont+1].estatusid);
				}
			}
			html=html+doble(cadenas[1] ,cant ,cadenas[0],color ,cadenas2[1] ,cant2 ,cadenas2[0], color2, estatusId, estatusId2, MDS_ACTIVAS);	
			
			cont++;
		}
		cont++;
	}
	EnviaSubmodulosAction(submodulos_global);
	
	$('#proceso').html(html);
	$('.hexa').css('background-image','url("img/hexaverde.svg")');
	
	$('#proceso').fadeIn();
}
function pintaAtrasadas(arreglo,filtrados){
	$('#proceso').hide();
	html=inicio();

	var cont=0;
	var existe_modulo=false;
	var submodulos_global=[];
	
	for(var i=0;i<arreglo.length;i++){
		var existe_submodulo=false;
		var existe_submodulo2=false;
		
		$.each($(".permisos_sub"),function(index, value){
			if(value.value=='PRIVILEGIO.MENU.VOKSE.16=true'){
				existe_modulo=true;
			}
			if(value.value=='PRIVILEGIO.SUBMENU.VOKSE.16,'+filtrados[cont].estatusid+'=true'){
				existe_submodulo=true;
			}
			if(arreglo[i]==2){
				if(value.value=='PRIVILEGIO.SUBMENU.VOKSE.16,'+filtrados[cont+1].estatusid+'=true'){
					existe_submodulo2=true;
				}
			}
			
		});
		
		var cadenas=filtrados[cont].estatus.replace('VALIDACION','VOBO').split('-',2);
		var cant="";
		var color="";
		var estatusId = filtrados[cont].estatusid;
		
		if(filtrados[cont].atrasadasSum!=undefined){
			cant=filtrados[cont].atrasadasSum;
		}else{
			cant=filtrados[cont].atrasadas;
		}
		
			if(existe_submodulo==true || existe_modulo==false && filtrados[cont].areaValidacion==$('#areaId').val() && perfil!='3'){
				color="rojo cursor";
				submodulos_global.push(filtrados[cont].estatusid);
			}
			else{
				color="blanco";
				if(perfil=='3'){
					color="blanco cursor";
					submodulos_global.push(filtrados[cont].estatusid);
				}
			}
		if(arreglo[i]==1){
			html=html+simple(cadenas[1] ,cant ,cadenas[0],color,estatusId, MDS_ATRASADAS);
		}
		if(arreglo[i]==2){
			var cadenas2= filtrados[cont+1].estatus.replace('VALIDACION','VOBO').split('-',2);
			var cant2="";
			var color2="";
			var estatusId2 = filtrados[cont+1].estatusid;
			
			if(filtrados[cont+1].atrasadasSum!=undefined){
				cant2=filtrados[cont+1].atrasadasSum;
			}else{
				cant2=filtrados[cont+1].atrasadas;
			}
			
					if(existe_submodulo2==true || existe_modulo==false && filtrados[cont+1].areaValidacion==$('#areaId').val() && perfil!='3'){
							color2="rojo cursor";
							submodulos_global.push(filtrados[cont+1].estatusid);
					}
					else{
							color2="blanco";
							if(perfil=='3'){
								color2="blanco cursor";
								submodulos_global.push(filtrados[cont+1].estatusid);
							}
								
					}
			html=html+doble(cadenas[1] ,cant ,cadenas[0],color,  cadenas2[1] ,cant2 ,cadenas2[0],color2,estatusId,estatusId2, MDS_ATRASADAS);	
			
			cont++;
		}
		cont++;
	}
	EnviaSubmodulosAction(submodulos_global);
	$('#proceso').html(html);
	$('.hexa').css('background-image','url("img/hexarojo.svg")');
	
	$('#proceso').fadeIn();
}

function pintaCanceladas(arreglo,filtrados){
	$('#proceso').hide();
	html=inicio();
	var cont=0;
	var existe_modulo=false;
	var submodulos_global=[];
	
	for(var i=0;i<arreglo.length;i++){
		var existe_submodulo=false;
		var existe_submodulo2=false;
		
		$.each($(".permisos_sub"),function(index, value){
			if(value.value=='PRIVILEGIO.MENU.VOKSE.16=true'){
				existe_modulo=true;
			}
			if(value.value=='PRIVILEGIO.SUBMENU.VOKSE.16,'+filtrados[cont].estatusid+'=true'){
				existe_submodulo=true;
			}
			if(arreglo[i]==2){
				if(value.value=='PRIVILEGIO.SUBMENU.VOKSE.16,'+filtrados[cont+1].estatusid+'=true'){
					existe_submodulo2=true;
				}
			}
			
		});
		
		var cadenas=filtrados[cont].estatus.replace('VALIDACION','VOBO').split('-',2);
		var cant=filtrados[cont].total;
		var color="";
		var estatusId = filtrados[cont].estatusid;
		if(existe_submodulo==true || existe_modulo==false && filtrados[cont].areaValidacion==$('#areaId').val() && perfil!='3'){
			color="cgris cursor";
			submodulos_global.push(filtrados[cont].estatusid);
		}
		else{
			color="blanco";
			if(perfil=='3'){
				color="blanco cursor";
				submodulos_global.push(filtrados[cont].estatusid);
			}
		}	
		if(arreglo[i]==1){
			html=html+simple(cadenas[1] ,cant ,cadenas[0], color, estatusId, MDS_CANCELADAS);
		}
		if(arreglo[i]==2){
			var cadenas2= filtrados[cont+1].estatus.replace('VALIDACION','VOBO').split('-',2);
			var cant2= filtrados[cont+1].total;
			var color2="";
			var estatusId2 = filtrados[cont+1].estatusid;
				if(existe_submodulo2==true || existe_modulo==false && filtrados[cont+1].areaValidacion==$('#areaId').val() && perfil!='3'){
					color2="cgris cursor";
					submodulos_global.push(filtrados[cont+1].estatusid);
				}
				else{
					color2="blanco";
					if(perfil=='3'){
						color2="blanco cursor";
						submodulos_global.push(filtrados[cont+1].estatusid);
					}		
				}
			
			html=html+doble(cadenas[1] ,cant ,cadenas[0],color  ,cadenas2[1] ,cant2 ,cadenas2[0],color2,estatusId,estatusId2, MDS_CANCELADAS);	
			
			cont++;
		}
		cont++;
	}
	EnviaSubmodulosAction(submodulos_global);
	$('#proceso').html(html);
	$('.hexa').css('background-image','url("img/hexagris.svg")');
	$('#proceso').fadeIn();
}

function simple(titulo,cant,pie,color,estatusId, estatusMd){
	return '<div class="simple">'+
	'<div class="negrita '+color+' titulo_hex"  onclick="redirige(this,' + estatusId + ',' + estatusMd + ')">'+titulo+'</div>'+
	'<div class="hexa '+color+'" onclick="redirige(this,' + estatusId + ',' + estatusMd + ')">'+
	'<div class="negrita blanco cont_hex">'+cant+'</div></div>'+
	'<div class="'+color+' pie_hex"  onclick="redirige(this,'+ estatusId + ', ' + estatusMd + ')">'+pie+'</div>'+	
	'</div>';
}
function doble(x1,x2,x3,color1,  y1,y2,y3,color2,estatusId,estatusId2, estatusMd){
	return '<div class="simple" style="padding:0 5;">'+
	'<div class="lineadoble fazul">'+
	'<div class="doble">'+
	'<div class="hexa '+color1+'" onclick="redirige(this,' + estatusId + ',' + estatusMd + ')">'+
	'<div class="negrita blanco cont_hex_doble">'+x2+'</div>'+
	'</div><div class="hexa '+color2+'"  onclick="redirige(this, ' + estatusId2 + ',' + estatusMd + ')">'+
		'<div class="negrita blanco cont_hex_doble">'+y2+'</div>'+
	'</div></div>'+
	'</div>'+
	'<div class="negrita '+color1+' titulo_hex_doble" style="bottom:120"  onclick="redirige(this,' + estatusId + ',' + estatusMd + ')">'+x1+'</div>'+
	'<div class="'+color1+' pie_hex_doble"  style="bottom:73"  onclick="redirige(this,' + estatusId + ',' + estatusMd + ')">'+x3+'</div>'+
	
	'<div class="negrita '+color2+' titulo_hex_doble" style="bottom:57"  onclick="redirige(this,' + estatusId2 + ',' + estatusMd + ')">'+y1+'</div>'+
	'<div class="'+color2+' pie_hex_doble" style="bottom:10"  onclick="redirige(this,' + estatusId2 + ',' + estatusMd + ')">'+y3+'</div>'+
	'</div>';
}
function inicio(){
	return '<div class="linea"></div>';
}

function redirige(valor, estatusId, estatusMd){
	$.each($(".permisos_sub"),function(index, value){
		if(value.value=="PRIVILEGIO.MENU.VOKSE.14=true"){ //tablero
			if(perfil=='3'){
				window.location.href='tablero?estatusId=' + estatusId + '&estatusMd=' + estatusMd;
			}
			if ($(valor).is(".cgris")){
				window.location.href='tablero?estatusId=' + estatusId + '&estatusMd=' + estatusMd;
			}	
		}
		if(value.value=="PRIVILEGIO.MENU.VOKSE.8=true"){ //asignadas
			if ($(valor).is(".verde")){
				window.location.href='asignadas';
			}
			if ($(valor).is(".rojo")){
				window.location.href='asignadas';
			}
		}
	});
}


//--------------------- ENVIA FECHA A LAS TABLAS
function EnviaFecha(){

	invocarJSONServiceAction("EnviaFechaAction", {}, '');
}

function EnviaSubmodulosAction(submodulos_global){
	
	submodulos=submodulos_global.toString();	
	$.ajax({
        type     : "POST",
        url      : 'EnviaSubmodulosAction',
        data     : {'submodulos': submodulos},
        async	 : false
	});
}