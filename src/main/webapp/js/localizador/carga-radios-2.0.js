
/* =================== MAIN FUNCTION *-JS-*  ==================*/
$(function(){

});


/* ----------- Crear Radios con XSL-X -----------*/
var contadorAuxCarga = 1000;
function pintarCirculosXslx(arrayDatosRadios){
	clearMarkers();
	bounds = new google.maps.LatLngBounds();
	var esfilasVacias = false;
	var filasCadena = [];
	var indexAux = 0;
	
	
	if(arrayDatosRadios.length <= 2){
		cargaMensajeModal("Localizador","La plantilla no contiene radios para cargar.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		return;
	}
	
	arrayDatosRadios.forEach(function(element,index){
		
		if(index != 0 && index != 1){
			var esVacioObj = true;
			for(var i = 0; i < element.length ; i++){
				if(!validaDatosFila( element[i])){
					esVacioObj = validaDatosFila( element[i]); 
					esfilasVacias = true;
					filasCadena[index] = (index+1);   
					indexAux++;
				}
				
			}
			
			if(esVacioObj){
				coordenadas = new  CoordenadaClass(parseFloat(element[2]),parseFloat(element[3]));
				infoSitio = new ClassInfoRadio();
					infoSitio.fcUrl 				= element[5];
					infoSitio.fcCallePrincipal 	= element[6];
					infoSitio.fcCalle1 				= element[7];
					infoSitio.fcCalle2 				= element[8];
					infoSitio.fcColonia 			= element[9];
					infoSitio.fcMunicipio 			= element[11];
					
					infoSitio.fcPobTotal 		= element[12];
					infoSitio.fcPea 			= element[13];
					infoSitio.fcPobFlotante 	= element[14];
					infoSitio.fcTotalHogares 		= element[15];
					 
					infoSitio.fcMenos26 	= element[29];
					infoSitio.fcDe26a30 	= element[30];
					infoSitio.fcDe31a40 	= element[31];
					infoSitio.fcDe41a50 	= element[32];
					infoSitio.fcDe51a60 	= element[33];
					infoSitio.fcMas60 		= element[34];
					 
					infoSitio.fcAmaDeCasa 	= element[16];
					infoSitio.fcDesempleado = element[17];
					infoSitio.fcEjidatario 	= element[18];
					infoSitio.fcEmpleado 	= element[19];
					infoSitio.fcEstudiante 	= element[20];
					infoSitio.fcJornalero 	= element[21];
					infoSitio.fcJubilado 	= element[22];
					infoSitio.fcObrero 		= element[23];
					infoSitio.fcEmpresario 	= element[24];
					infoSitio.fcProfesionista 	   = element[25];
					infoSitio.fcServidorPublico    = element[26];
					infoSitio.fcTrabajoPorCuenta   = element[27];
					infoSitio.fcOtraOcupacion  	   = element[28];
					
	
					infoSitio.fcVentaAlimentos 	= element[35];
					infoSitio.fcServicios 		= element[36];
					infoSitio.fcVentaArticulos 	= element[37];
					infoSitio.fcTotalUE 		= element[38];
					
					infoSitio.fcOficinasGobierno 	= element[39];
					infoSitio.fcEscuelas 			= element[40];
					infoSitio.fcHospitales 			= element[41];
					infoSitio.fcTemplos 			= element[42];
					infoSitio.fcMercados 			= element[43];
					infoSitio.fcTotalGeneradores 	= element[44];
					
				
					infoSitio.fcBBB  = element[45];
					infoSitio.fcBAE  = element[46];
					infoSitio.fcMIBA = element[47];
					infoSitio.fcTotalCompetencia = element[48];
	
	
				radio = new ClassRadios();
					radio.id = contadorAuxCarga;
					radio.sitio  	= element[0];
					radio.anillo 	= element[1];
					radio.lat    	= element[2];
					radio.lng 		= element[3];
					radio.infoSitio = infoSitio;	
					radio.estado    = element[10];
					radio.objCoordenadas 		= coordenadas;
	
					
				objArray[contadorAuxCarga] = radio;
				addMarker(objArray[contadorAuxCarga], map);
				contadorAuxCarga++;
			}
		}
		
	});	
		
	
	
	if( esfilasVacias){
		var cadenaMsg = "";
		for(var i = 0; i < filasCadena.length; i++){
			if(filasCadena[i] != null && filasCadena[i] != undefined && filasCadena[i] != ""  ){
				 if((i+1) == filasCadena.length){
					 cadenaMsg +=  " "+ filasCadena[i];	 
				 }else{
					 cadenaMsg +=  " "+ filasCadena[i]+",";					 
				 }
			}
		}
		cargaMensajeModal("Localizador","Algunos radios no se pudieron cargar, revisar los datos de las siguientes filas "+ cadenaMsg +". <br>", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);		
	}
	
	
	if(Object.keys(objArray).length <= 0){
		 return false;
	 }
	
	map.fitBounds(bounds);
}



function validaDatosFila(param){
	var esVacio = true;
	if(param == "" || param == undefined){
		esVacio = false;
	}
	return esVacio;
}

/* ---------- Adds a marker to the map. --------*/
function addMarker(obj, map) {
	
	var icon = {
			url: iconMarke.NUEVO, // url
			scaledSize: new google.maps.Size(35, 35)// scaled size
		};
	
  var marker = new google.maps.Marker({
    position: obj.objCoordenadas,
    //draggable: true,
    animation: google.maps.Animation.DROP,
    map: map,
    id : obj.id,
    icon : icon
  });
  

  google.maps.event.addListener(marker, 'dragend', function (evt) {
	  var center = new CoordenadaClass(evt.latLng.lat(), evt.latLng.lng());
	  objArray[obj.id].circle = crearCirculo(center,colors.NUEVO);

	});

  marker.addListener("dblclick", function() {
	    deleteObjMarkerMap(obj.id);
	});

  marker.addListener("click", function() {

		 if (marker.getAnimation() !== null) {
	          marker.setAnimation(null);
	          radioSeleccionado.circle.setMap(null);
	          $(".contentPopUpInfo").hide();
	          map.setZoom(12);

	        } else {
	          if(radioSeleccionado != undefined && radioSeleccionado != null){
	        	  radioSeleccionado.marker.setAnimation(null);	 
	        	  radioSeleccionado.circle.setMap(null);
	          }
	          
	          
	          marker.setAnimation(google.maps.Animation.BOUNCE);
	          setTimeout(function(){marker.setAnimation(google.maps.Animation.BOUNCE);},1100);
	          radioSeleccionado = objArray[obj.id];
	          
	          radioSeleccionado.circle.setMap(map);
	          verInformacionRadio(radioSeleccionado, PANT_OPCION.ALTARADIOS);	  
	          map.setCenter(new google.maps.LatLng(radioSeleccionado.lat , radioSeleccionado.lng));
	          map.setZoom(15);
	          $(".contentPopUpInfo").show();
	        }
	  
  	
	});

//	google.maps.event.addListener(marker, 'dragstart', function (evt) {
//		objArray[obj.id].circle.setMap(null);
//	});

	bounds.extend(marker.position);
	obj.marker   = marker;
	obj.circle   = crearCirculo(obj.objCoordenadas, colors.NUEVO, obj.anillo );
	boundsGeneral = bounds;
}



/* ---------- Consume WS GUARDA RADIOS --------*/
function guardaRadiosLocalizados(){
	cargaLoading();

	$(".contentPopUpInfo").hide();
	$(".contentPopUpInfoMD").hide();
	
	 if(Object.keys(objArray).length <= 0){
		 cierraLoading();
		 cargaMensajeModal("Localizador", "Sin radios para guardar.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		 return false;
	 }

	 Object.keys(objArray).forEach(function (key){
//		 var lonRadio_ = objArray[key].anillo == undefined? 500: objArray[key].anillo;

		 var objAux = {... objArray[key]};
		 
		 delete objAux['marker'];
		 delete objAux['circle'];
		 

		 radiosArray.push( objAux );
	});

	invocarJSONServiceAction("guardarRadiosLocalizados",{"radiosLocalizados" :  JSON.stringify(radiosArray)},
			'responseGuardarLocalizados',
			function() {
				//Funcion de error
				cargaMensajeModal("Localizador","Error en el servicio guardar radios localizados.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				clearMarkers();
				//cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	responseGuardarLocalizados = function(data){

		if(data.codigo == 403){
			cargaMensajeModal("Localizador","Revisar el registro de la fila "+data.jsonError.indexXSLX+" <br>"+ data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}else{
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}

		clearMarkers();
		closePopUpInfo();
		radiosArray = [];
		getObtenerEstados();
	}
}


var chart = null;
var ctx = "";
function verInformacionRadio(obj, vista_opcion){
	
	if(obj.rechazado == 2 || obj.rechazado == 4){
		$(".solicitud-rechazo-anillo").show();
		
		if(obj.rechazado == 2){
			$("#tipo-solicitud-autorizacion").html("Solicitud sin sitios.");
			$("#btonRechazarAnillo").html("Autorizar");
			$("#btonDenegarRechazo").html("Denegar");
			
			
		}else if(obj.rechazado == 4){
			$("#tipo-solicitud-autorizacion").html("Solicitud de rechazo.");
			$("#btonRechazarAnillo").html("Autorizar");
			$("#btonDenegarRechazo").html("Denegar rechazo");
		}else{
			$(".solicitud-rechazo-anillo").hide();
		}
		
		
	}else{
		$(".solicitud-rechazo-anillo").hide();
	}
	
	if(vista_opcion == 0 || obj.estatusId == 5 || obj.estatusId == 4 ){
		$("#btonRecalculaGeneradores").hide();
	}else{
		$("#btonRecalculaGeneradores").show();
	}
	
	$('#option-vista-a').prop("checked", true);
	
	$('#option-vista-a').unbind();
	$('#option-vista-b').unbind();
	$('#option-vista-a').click(function(){ mostrarVistaSeccion();});
	$('#option-vista-b').click(function(){ mostrarVistaSeccion();});
	
	
	$("#contenido-vista-a").show();
	$("#contenido-vista-b").hide();
	
	$("#seccionDatos1").show();
	$("#seccionDatos2").hide();
	
	

	/* ==== INFORMACION ====*/	
	$("#infoTituloPopUp").html(validaValorObj(obj.sitio));
	$("#infoCoordenadas").html(obj.lat+' , '+obj.lng);
	$(".infoRadio").html(obj.anillo+' mts.');
	$("#infoUrl").html("");
	$("#infoUrl").append("<a href='"+ obj.infoSitio.fcUrl+"' target='_blank'> "+ obj.infoSitio.fcUrl+"  </a>");
	$(".infoEstatus").html(obj.estatus);
	$("#infoCalle").html(obj.infoSitio.fcCallePrincipal);
	$("#infoCalle1").html(obj.infoSitio.fcCalle1);
	$("#infoCalle2").html(obj.infoSitio.fcCalle2);
	$("#infoColonia").html(obj.infoSitio.fcColonia);
	$("#infoMunicipio").html(obj.infoSitio.fcMunicipio);
	$("#infoNoVisitas").html(obj.visitasRadio);
	
	
	/* ==== INFORMACION ====*/
	$("#edadMenor1").html(obj.infoSitio.fcMenos26);
	$("#edadMenor2").html(obj.infoSitio.fcDe26a30);
	$("#edadMenor3").html(obj.infoSitio.fcDe31a40);
	$("#edadMenor4").html(obj.infoSitio.fcDe41a50);
	$("#edadMenor5").html(obj.infoSitio.fcDe51a60);
	$("#edadMenor6").html(obj.infoSitio.fcMas60);
	
	$("#poblacion").html(obj.infoSitio.fcPobTotal);
	$("#pea").html(obj.infoSitio.fcPea);
	$("#poblacionFlot").html(obj.infoSitio.fcPobFlotante);
	$("#hogares").html(obj.infoSitio.fcTotalHogares);
	
	/* ==== GENEREDORES ====*/
	$("#ofiGob").html(obj.infoSitio.fcOficinasGobierno);
	$("#escuelas").html(obj.infoSitio.fcEscuelas);
	$("#hopitales").html(obj.infoSitio.fcHospitales);
	$("#templos").html(obj.infoSitio.fcTemplos);
	$("#mercados").html(obj.infoSitio.fcMercados);
	
	
	/* ==== COMPETENCIAS ====*/
	$("#bbb").html(obj.infoSitio.fcBBB);
	$("#bae").html(obj.infoSitio.fcBAE);
	$("#miba").html(obj.infoSitio.fcMIBA);

	/* ==== UNIDADES ECONOMICAS ====*/
	$("#alimentos").html(obj.infoSitio.fcVentaAlimentos);
	$("#servicios").html(obj.infoSitio.fcServicios);
	$("#artlsPersoHogar").html(obj.infoSitio.fcVentaArticulos);
	
	
	
	
	/* ==== OCUPACIONES ====*/
	var array = new Array();
	array[0] = new Array();
	array[0][0] = formatMiles(obj.infoSitio.fcAmaDeCasa);
	array[0][1] = "Ama de casa";
	
	array[1] = new Array();
	array[1][0] = formatMiles(obj.infoSitio.fcDesempleado);
	array[1][1] = "Desempleado";
	
	array[2] = new Array();
	array[2][0] = formatMiles(obj.infoSitio.fcEjidatario);
	array[2][1] = "Ejidatario";
		
	array[3] = new Array();
	array[3][0] = formatMiles(obj.infoSitio.fcEmpleado);
	array[3][1] = "Empleado";
		
	array[4] = new Array();
	array[4][0] = formatMiles(obj.infoSitio.fcEstudiante);
	array[4][1] = "Estudiante";
	
	array[5] = new Array();
	array[5][0] = formatMiles(obj.infoSitio.fcJornalero);
	array[5][1] = "Jornalero";
	
	array[6] = new Array();
	array[6][0] = formatMiles(obj.infoSitio.fcJubilado);
	array[6][1] = "Jubilado";
	
	array[7] = new Array();
	array[7][0] = formatMiles(obj.infoSitio.fcObrero);
	array[7][1] = "Obrero";
	
	array[8] = new Array();
	array[8][0] = formatMiles(obj.infoSitio.fcProfesionista);
	array[8][1] = "Profesionista";
		
	array[9] = new Array();
	array[9][0] = formatMiles(obj.infoSitio.fcServidorPublico);
	array[9][1] = "Servidor público";
		
	array[10] = new Array();
	array[10][0] = formatMiles(obj.infoSitio.fcOtraOcupacion);
	array[10][1] = "Otra";
		
	array[11] = new Array();
	array[11][0] = formatMiles(obj.infoSitio.fcTrabajoPorCuenta);
	array[11][1] = "Emprendedor";

	array[12] = new Array();
	array[12][0] = formatMiles(obj.infoSitio.fcEmpresario);
	array[12][1] = "Empresario";
	
		
	
	array.sort(function(a, b){
		return b[0]-a[0]
		});
	
	$("#list-empleos").html("");
	array.forEach(function(obj, i){
		$("#list-empleos").append('<div class="col-6 etiqueta-white-l">'+obj[1]+': 	<span> '+numberWithCommas(obj[0])+' </span> </div>');
	});
	
	
	if(vista_opcion == 0 || vista_opcion == undefined){
		$("#infoEstatus").html("Nuevo");
	}

	var usuarioAsignado = "";
	$("#divContentInfoRadio").html("");
		
	if( obj.estatusId == 5 || obj.estatusId == 4 || obj.estatusId == 3 || obj.estatusId == 2 || obj.estatusId == 1 && (obj.UsrAsignado != null && obj.usrAsignadoId != undefined && obj.usrAsignadoId != "None")){
			usuarioAsignado = '<div id="divInfoAsinacion" style="height: 18px;"> <h6 class="subTitleInfo-asig-anillo left_float">Asignado :  '+obj.UsrAsignado+'</h6>'+
			'<button type="button" id="btonDescAsig" value="'+obj.id+'" class=" btn bton-quitar-asignacion btn_aceptar float-right">Quitar asignación </button></div> <div id="divFechAsinacion" class="pb-1"><h6 class="subTitleInfo-asig-anillo ">Fecha asignación :  '+obj.fechaAsignado+'</h6></div>';
		
			if(obj.estatusId == 5 || obj.estatusId == 4 ){
				$("#divContentInfoRadio").html("");
				usuarioAsignado = '<div id="divInfoAsinacion" style="height: 18px;"> <h6 class="subTitleInfo-asig-anillo left_float">Asignado :  '+obj.UsrAsignado+'</h6>'+
				'</div> <div id="divFechAsinacion" class="pb-1"><h6 class="subTitleInfo-asig-anillo ">Fecha asignación :  '+obj.fechaAsignado+'</h6></div>';						
			}	
			
		$("#divContentInfoRadio").append(usuarioAsignado);
	}else{
		$("#divContentInfoRadio").children("div#divInfoAsinacion").html("");
	}
	
	

		$("#templos").html(0);
	 $("#hopitales").html(0);
	 $("#escuelas").html(0);
	 $("#mercados").html(0);
	 $("#ofiGob").html(0);
	 $("#t-PANADERIA").html(0);
	 $("#t-TORTILLERIA").html(0);
	 $("#t-ABARROTES").html(0);
	  $("#t-CARNICERIA").html(0);
	 $("#t-POLLERIA").html(0);
	 $("#t-RECAUDERIAS").html(0);
	 
	
	
	if(obj.totalUE != undefined){
		$(".div-unidades-economicas").show();
		
		if(obj.totalUE.length > 0){
			obj.totalUE.forEach(function(t_,index){
				$("#t-"+t_.generador).html(t_.total);
			});				
		}		
	}else{
		$(".div-unidades-economicas").hide();
	}
	
	setTimeout(function(){
		$("#btonDescAsig").unbind();
		$("#btonDescAsig").click(function(){desAsignarRadio(); idRadioDesAsignar = this.value; });    
		
		$("#btonRechazarAnillo").unbind();
		$("#btonRechazarAnillo").click(function(){ ejecutarAutorizaAnillo(obj, 1); });    	
		
		$("#btonDenegarRechazo").unbind();
		$("#btonDenegarRechazo").click(function(){ ejecutarAutorizaAnillo(obj, 0); });  

		
		$("#check-tdos-gen").prop("checked", true);
		$("#check-mercados").prop("checked", true);
		$("#check-escuela").prop("checked", true);
		$("#check-hospital").prop("checked", true);
		$("#check-templo").prop("checked", true);
		$("#check-ofGob").prop("checked", true);
		
		$("#check-tdos-ue").prop("checked", false);
		$("#check-panaderia").prop("checked", false);
		$("#check-tortilleria").prop("checked", false);
		$("#check-abarrotes").prop("checked", false);
		$("#check-carniceria").prop("checked", false);
		$("#check-recauderia").prop("checked", false);
		$("#check-polleria").prop("checked", false);
 
		
		$("#check-mercados").unbind();
		$("#check-mercados").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100004);
		}); 
		
		$("#check-escuela").unbind();
		$("#check-escuela").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100003);
		}); 
		
		$("#check-hospital").unbind();
		$("#check-hospital").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100002);
		}); 
		
		$("#check-templo").unbind();
		$("#check-templo").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100001);
		}); 
		
		$("#check-ofGob").unbind();
		$("#check-ofGob").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100005);
		}); 
		
		
		$("#check-panaderia").unbind();
		$("#check-panaderia").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100006);
		}); 
		
		$("#check-tortilleria").unbind();
		$("#check-tortilleria").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100007);
		}); 
		
		$("#check-abarrotes").unbind(); 
		$("#check-abarrotes").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100008);
		}); 
		
		$("#check-carniceria").unbind();
		$("#check-carniceria").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100009);
		}); 
		
		
		$("#check-recauderia").unbind();
		$("#check-recauderia").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100011);
		}); 
		
		$("#check-polleria").unbind(); 
		$("#check-polleria").change(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100010);
																 
		});  
		
		$("#check-tdos-gen").unbind(); 
		$("#check-tdos-gen").click(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100004);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100003);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100002);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100001);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100005);

			
			$("#check-mercados").prop("checked", $(this).is(":checked"));
			$("#check-escuela").prop("checked", $(this).is(":checked"));
			$("#check-hospital").prop("checked", $(this).is(":checked"));
			$("#check-templo").prop("checked", $(this).is(":checked"));
			$("#check-ofGob").prop("checked", $(this).is(":checked"));	
			
			
			
		});  
		 
		
		pintarGeneradoresFiltro(obj.generadores, null, 100006);
		pintarGeneradoresFiltro(obj.generadores, null, 100007);
		pintarGeneradoresFiltro(obj.generadores, null, 100008);
		pintarGeneradoresFiltro(obj.generadores, null, 100009);
		pintarGeneradoresFiltro(obj.generadores, null, 100011);
		pintarGeneradoresFiltro(obj.generadores, null, 100010);
		
		$("#check-tdos-ue").unbind(); 
		$("#check-tdos-ue").click(function(){  
			var mapChecked = null;
			if($(this).is(":checked"))
				mapChecked = map;
			
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100006);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100007);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100008);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100009);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100011);
			pintarGeneradoresFiltro(obj.generadores, mapChecked, 100010);
			
			$("#check-panaderia").prop("checked", $(this).is(":checked"));
			$("#check-tortilleria").prop("checked", $(this).is(":checked"));
			$("#check-abarrotes").prop("checked", $(this).is(":checked"));
			$("#check-carniceria").prop("checked", $(this).is(":checked"));
			$("#check-recauderia").prop("checked", $(this).is(":checked"));
			$("#check-polleria").prop("checked", $(this).is(":checked"));													 
		});  
		 
	},250);
	
	ctx = document.getElementById('radar_ocupaciones').getContext('2d');
	
	if(chart != null){
		chart.destroy();		
	}
	
	setTimeout(function(){ 
			chart = new Chart(ctx, {
			    // The type of chart we want to create
				type: 'radar',
			    // The data for our dataset
			    data: {
			    	labels: ['Ama de casa', 	// 1
			    			 'Empresario',  	// 2
			    			 'Desempleado', 	// 3
			    			 'Profesionista',  	// 4
			    			 'Ejidatario',   	// 5
			    			 'Servidor público',// 6
			    			 'Empleado',   		// 7
			    			 'Emprendedor', 	// 8
			    			 'Estudiante', 		// 9
			    			 'Jornalero',  		// 10  
			    			 'Obrero',     		// 11
			    			 'Jubilado',   		// 12
			    			 'Otra',       		// 13
			    			 ],
			    			 
			        datasets: [{
			            label: 'Ocupación',
			            backgroundColor: '#ffeb3b5c',
			            borderColor: '#be8f00',
			            borderWidth: 1,
		        	    radius: 4,
		        	    pointRadius: 3,
		        	    pointBorderWidth: 2,
		        	    pointBackgroundColor: "#FFC107",
		        	    pointBorderColor: "rgba(200, 74, 0, 0.6)",
		        	    pointHoverRadius: 10,
		        	 data: [ parseFloat(obj.infoSitio.fcAmaDeCasa.replace(/,/g,'')), 		// 1
		        			 parseFloat(obj.infoSitio.fcEmpresario.replace(/,/g,'')) , 		// 2
		        			 parseFloat(obj.infoSitio.fcDesempleado.replace(/,/g,'')), 		// 3
		        			 parseFloat(obj.infoSitio.fcProfesionista.replace(/,/g,'')),   	// 4
		        			 parseFloat(obj.infoSitio.fcEjidatario.replace(/,/g, '')), 		// 5
		        			 parseFloat(obj.infoSitio.fcServidorPublico.replace(/,/g,'')), 	// 6
		        			 parseFloat(obj.infoSitio.fcEmpleado.replace(/,/g, ''))  	, 	// 7 
		        			 parseFloat(obj.infoSitio.fcTrabajoPorCuenta.replace(/,/g,'')),	// 8
		        			 parseFloat(obj.infoSitio.fcEstudiante.replace(/,/g, '')), 		// 9
		        			 parseFloat(obj.infoSitio.fcJornalero.replace(/,/g, '')),		// 10
		        			 parseFloat(obj.infoSitio.fcObrero.replace(/,/g, '')), 			// 11 
		        			 parseFloat(obj.infoSitio.fcJubilado.replace(/,/g, '')), 		// 12
		        			 parseFloat(obj.infoSitio.fcOtraOcupacion.replace(/,/g, '')), 	// 13
		        			 ]
			        }]
			    },
			    
			    // Configuration options go here
			    options: {
				    scale: {
					    gridLines: {
					      color: '#7b7b7b'
					    },
					    angleLines: {
		
					    },
					    ticks: {
					    	beginAtZero: true,
					        fontSize : 11,
					        fontColor: "white",
					        backdropColor: "#000000",
					    }, 
					    pointLabels: {
				          fontSize: 11,
				          fontColor : "#FF5722"
				        }
				    },	    
				    tooltips: {
				      callbacks: {
				        label : function(tooltipItem, data) {
				          return " " + tooltipItem.yLabel;
				        }
				      }
				    },
				    legend:{ 
				    	display : false,
				    }
				  }
			});	
	},200);
}

function  ejecutarAutorizaAnillo(obj, solicitudId){
	cargaLoading();
	
	invocarJSONServiceAction("autorizarAnillos",{"idAnillo" : obj.id,  valorSolicitud: solicitudId},
			'response',
			function() {
				//Funcion de error
				cargaMensajeModal("Localizador","Error en el servicio obtener radios asignados.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	response = function(data){
		cleanRadiosDispoAsignados();
		cleanMapRutas();
		clearMapsMds(MdsArray);
		cleanMapRutasAllJefes();
		pintarMdsAnillos(radioSeleccionado,null);
		pintarGeneradores(radioSeleccionado,null);
		pintarCompetencias(radioSeleccionado,null);
		cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		getAnillosXConsulta();
		
	}
}




/* =================== CLASS OBJ RADIOS  ==================*/
function ClassRadios(){
	id = 0;
	sitio = "";
	estado = "";
	anillo = "";
	lat = "";
	lng = "";
	estatus = "";
	estatusId = 0; 
	infoRadioLocalizado = {};
	competencia = [];
	generadores = [];

}

function ClassInfoRadio(){
	 fcUrl = " ";
	 fcCallePrincipal = "";
	 fcCalle1 = "";
	 fcCalle2 = "";
	 fcColonia = "";
	 fcMunicipio = "";
	 fcPobTotal = "";
	 fcPea = "";
	 fcPobFlotante = "";
	 fcTotalHogares = "";
	 fcAmaDeCasa = "";
	 fcDesempleado = "";
	 fcEjidatario = "";
	 fcEmpleado = "";
	 fcEstudiante = "";
	 fcJornalero = "";
	 fcJubilado = "";
	 fcObrero = "";
	 fcEmpresario = "";
	 fcProfesionista = "";
	 fcServidorPublico = "";
	 fcTrabajoPorCuenta = "";
	 fcOtraOcupacion = "";
	 fcMenos26 = "";
	 fcDe26a30 = "";
	 fcDe31a40 = "";
	 fcDe41a50 = "";
	 fcDe51a60 = "";
	 fcMas60 = "";
	 fcVentaAlimentos = "";
	 fcServicios = "";
	 fcVentaArticulos = "";
	 fcTotalUE = "";
	 fcOficinasGobierno = "";
	 fcEscuelas = "";
	 fcHospitales = "";
	 fcTemplos = "";
	 fcMercados = "";
	 fcTotalGeneradores = "";
	 fcBBB = "";
	 fcBAE = "";
	 fcMIBA = "";
	 fcTotalCompetencia = "";
	
}

/* -- class Detalle sitio --*/
function ClassUbicacion(){
	direccion = "";
	url = "";
	calle = "";
	calle1 = "";
	calle2 = "";
	colonia = "";
	municipio = "";
	numVisitas = 0;

}

/* -- class Info Socio demografica  --*/
function ClassInfoSocioDemografica(){
	poblacion = "";
	pea  = "";
	poblacionFlot  = "";
	hogares  = "";
	edadMenor1  = "";
	edadMenor2  = "";
	edadMenor3  = "";
	edadMenor4  = "";
	edadMenor5  = "";
	edadMenor6  = "";

}

/* -- class Detalle sitio --*/
function ClassOcupaciones(){
	ocupa_amaCasa = "";
	ocupa_desem = "";
	ocupa_ejida = "";
	ocupa_emple = "";
	ocupa_estud = "";
	ocupa_jorna = "";
	ocupa_jubil = "";
	ocupa_obrer = "";
	ocupa_empre = "";
	ocupa_profe = "";
	ocupa_servi = "";
	ocupa_cuent = "";
	ocupa_otra  = "";

}

/* -- class Unidades economicas --*/
function ClassUnidadesEco(){
	alimentos = "";
	servicios = "";
	artlsPersoHogar = "";
		
}

/* -- class Generadores --*/
function ClassGeneradores(){
	ofiGob 		= "";
	escuelas 	= "";
	hopitales 	= "";
	templos   	= "";
	mercados  	= "";
}

/* -- class Competencia --*/
function ClassCompetencia(){
	bbb = "";
	bae = "";
	miba = "";
}


/* ------  TOTAL de Radios -------*/
function getSizeRadios(){
  return Object.keys(objArray).length;
}

function formatMiles(numberf){
	var number = 0;
	number = parseInt(numberf.replace(",","")) 
	 return number
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}