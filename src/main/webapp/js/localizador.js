
var earthRadii = {
        mi: 3963.1676,
        km: 6378.1,
        ft: 20925524.9,
        mt: 6378100,
        in: 251106299,
        yd: 6975174.9,
        fa: 3487587.49,
        na: 3443.89849,
        ch: 317053.408,
        rd: 1268213.63,
        fr: 31705.3408
    };
var bounds;
var infowindow;
var labelIndex = 0;
var bangalore = { lat: 12.97, lng: 77.59 };
var map;
var json_excel;
var objArray = {};
var radiosArray = [];
var markerId = 0;
var radioSeleccionado;
var objArrayEmployee;
var iconMarkerSelect = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var iconMarker = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var element_call;




/* =================== MAIN FUNCTION *-JS-*  ==================*/
$(function(){
	$('#idlocalizador').addClass('resaltado');
	$('#asignarRadio').click(function(){ showContentRadios(this);});
	$('#altaRadio').click(function(){ showContentRadios(this);});
	$('#btonGuardarRadios').click(function(){ guardaRadiosLocalizados();});
	$('#btonCancelarRadios').click(function(){ clearMarkers();});
	$("#btnAsignarRadio").click(function(){ asignarRadio();});
	$("#btnRemovelAsign").click(function(){ cancelarSelecRadio();});
});



/* ---------- Function show hidden *- alta radios - asignacion --------*/
function showContentRadios(element_call_){
	element_call = element_call_;
  if(getSizeRadios() > 0){
    cargaMensajeModal("Localizador", "Hay radios cargados<br> ¿Deseas salir ?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, showOptionAction);
  }else{
	  showOptionAction();
  }
}

function showOptionAction(){
    $(element_call).parent().parent().children().children("div").addClass("hidden");
    $(element_call).parent().children("div").removeClass("hidden");
    $(element_call).parent().parent().children().children("span").removeClass("color_3");
    $(element_call).addClass("color_3");
    clearMarkers();
    
    if(element_call.id == "asignarRadio"){
    	getRadiosLocalizados();
    	getObtenerEmpleados();
    }
}

/* ---------- Consume WS GUARDA RADIOS --------*/
function guardaRadiosLocalizados(){
	cargaLoading();

	 if(Object.keys(objArray).length <= 0){
		 cierraLoading();
		 cargaMensajeModal("Localizador", "Sin radios para guardar.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		 return false;
	 }

	 Object.keys(objArray).forEach(function (key){
		 var lonRadio_ = objArray[key].longRadio==undefined? 500: objArray[key].longRadio;
		 var idZona_ = objArray[key].idZona==undefined? "Sin asignar": objArray[key].idZona;
		 radiosArray.push(new RadiosLocalizados(objArray[key].coordenada.lat, objArray[key].coordenada.lng, idZona_, objArray[key].infoMarker,lonRadio_));
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
		cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		clearMarkers();
		radiosArray = [];
	}
}






/* =================== PAINT MARKERS GOOGLE MAPS  ==================*/
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 19.356703, lng: -99.276124}
  //,mapTypeId: 'terrain'
  });

  //This event listener calls addMarker() when the map is clicked.
  // Add a marker at the center of the map.
  /*google.maps.event.addListener(map, 'click', function(event) {
	  objArray[markerId] = new RadiosClass("Radio",new  CoordenadaClass(event.latLng.lat(), event.latLng.lng()), markerId);
		addMarker(objArray[markerId], map);
  });*/
  bounds = new google.maps.LatLngBounds();
  setTimeout(function(){cierraLoading();},1850);
}


/* ---------- Adds a marker to the map. --------*/
function addMarker(obj, map) {
  var marker = new google.maps.Marker({
    position: obj.coordenada,
    //draggable: true,
    animation: google.maps.Animation.DROP,
    map: map,
    id : obj.idMarker,
    icon : iconMarker
  });

  google.maps.event.addListener(marker, 'dragend', function (evt) {
	  var center = new CoordenadaClass(evt.latLng.lat(), evt.latLng.lng());
	  objArray[obj.idMarker].circle = crearCirculo(center,"red");

	    //document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
	});

  marker.addListener("dblclick", function() {
	    deleteObjMarkerMap(obj.idMarker);
	});

  marker.addListener("click", function() {
  	if(infowindow == undefined){
    	infowindow =  new  google.maps.InfoWindow({ content: crearInfoRadioLocalizado(obj)  });
		  infowindow.open(map,marker);
      radioSeleccionado = objArray[obj.idMarker];
  	}else{
  		if(radioSeleccionado.idMarker != obj.idMarker){
  			infowindow.close();
  			infowindow = new  google.maps.InfoWindow({ content: crearInfoRadioLocalizado(obj) });
  			infowindow.open(map,marker);
        radioSeleccionado = objArray[obj.idMarker];
  		}
  	}
	});

	google.maps.event.addListener(marker, 'dragstart', function (evt) {
		objArray[obj.idMarker].circle.setMap(null);
	});

  bounds.extend(marker.position);
  
	obj.marker   = marker;
	obj.circle   = crearCirculo(obj.coordenada,"red",obj.longRadio);
	markerId++;

}

/* ---------- toggleBounce  --------*/
function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

/* ---------- Crear Radio  --------*/
function crearCirculo(location,color, radius){

	//radius = parseFloat(document.getElementById('radiusInput').value)
	if(radius == undefined || radius == null || radius == ""){
		radius = 500;		
	}else 
		if(radius < 500){
			radius = 500;
		}
	
    radius = (radius / earthRadii['mt']) * earthRadii['mt']

	 return new google.maps.Circle({
	    	strokeColor: 'white',
	    	 position: location,
	        strokeOpacity: 0.8,
	        strokeWeight: .5,
	        fillColor: color,
	        fillOpacity: 0.2,
	        map: map,
	        center: location,
	        radius: radius
	      });
}

function crearInfoRadioLocalizado(obj){

	if(obj.infoMarker == undefined){
		return "Sin información del radio.";
	}
	
	var infoHtml =  '<div id="containerInfoRadio">'+
	'	   <h2 class="titleInfoRadio">'+validaValorObj(obj.infoMarker.fcSitio)+'</h2>'+
	 '<h6 class="subtitleInfoRadio">'+validaValorObj(obj.infoMarker.fcEstrategia)+'</h6>'+
	'		<div id="contentInfoDemograf" class="classContents">'+
	'		  <table>'+
	'		   <thead><tr><th colspan="2">Información Socio demográfica</th></tr> </thead>'+
	'			  <tbody>'+
	'			  	<tr><td>Población total</td><td>'+validaValorObj(obj.infoMarker.fcPoblacionTotal)+'</td></tr>'+
	'			  	<tr><td>PEA</td><td>'+validaValorObj(obj.infoMarker.fcPea)+'</td></tr>'+
	'			  	<tr><td>Viviendas</td><td>'+validaValorObj(obj.infoMarker.fcViviendas)+'</td></tr>'+
	'			  	<tr><td>NSE</td><td>'+validaValorObj(obj.infoMarker.fcNse)+'</td></tr>'+
	'			  </tbody>'+
	'		  </table>'+
	'		</div>'+

	'		<div id="contentInfoGenerado" class="classContents">'+
	'		<table>'+
	'		   <thead><tr><th colspan="2">Generadores</th></tr> </thead>'+
	'		 <tbody>'+
	'			  	<tr><td>Mercados</td><td>'+validaValorObj(obj.infoMarker.fcMercados)+'</td></tr>'+
	'			  	<tr><td>Escuelas</td><td>'+validaValorObj(obj.infoMarker.fcEscuelas)+'</td></tr>'+
	'			  	<tr><td>Hospitales</td><td>'+validaValorObj(obj.infoMarker.fcHospitales)+'</td></tr>'+
	'			  	<tr><td>Templos</td><td>'+validaValorObj(obj.infoMarker.fcTemplos)+'</td></tr>'+
	'			  </tbody>'+
	'		  </table>'+
	'		</div>'+

	'		<div id="contentInfoDireccion" class="classContents">'+
	'		<table id="tableInfoDireccion">'+
	'		   <thead><tr><th colspan="2">Ubicación</th></tr> </thead>'+
	'		 <tbody>'+
	'			  	<tr><td>Calle</td><td>'+validaValorObj(obj.infoMarker.fcCallePrin)+'</td></tr>'+
	'			  	<tr><td>Entre Calle 1</td><td>'+validaValorObj(obj.infoMarker.fcCalle1)+'</td></tr>'+
	'			  	<tr><td>Entre Calle 2</td><td>'+validaValorObj(obj.infoMarker.fcCalle2)+'</td></tr>'+
	'			  </tbody>'+
	'		  </table>'+
	'		</div>		'+
	'	</div>';

	return infoHtml;

}

function positionMapInit(){
	 map.setZoom(6);
	 map.setCenter( {lat: 19.356703, lng: -99.276124});
}

function validaValorObj(valor){
	if(valor == undefined){
		valor = "Sin asignar";
	}
	return valor;
}


/* ----------- Crear Radios con XSL-X -----------*/
function pintarCirculosXslx(arrayDatosRadios){
	clearMarkers();
	bounds = new google.maps.LatLngBounds();
	
	arrayDatosRadios.forEach(function(element,index){
		if(index != 0 && index != 1){
			objArray[markerId] = new RadiosClass(element[2],
												new  CoordenadaClass(parseFloat(element[0]),parseFloat(element[1])),
												markerId);

			objArray[markerId].setInfoMarker(new InfoRadiosLocalizados(element[3],element[4],element[5],element[6],element[7],element[8],element[9],element[10],element[11],element[12],element[13],element[14],element[15]));
			objArray[markerId].setLongRadio(element[16]);
			addMarker(objArray[markerId], map);
		}
	});
	
	map.fitBounds(bounds);
}

/* ------  Cant Radios -------*/
function getSizeRadios(){
  return Object.keys(objArray).length;
}

/* -------------  Clear Map Radios --------------*/
function clearMarkers(){
	
	if(getSizeRadios() > 0){
		cargaLoading();
		Object.keys(objArray).forEach(function(key){
			deleteObjMarkerMap(objArray[key].idMarker);
		});
		
		if(radioSeleccionado != undefined)
			radioSeleccionado.idMarker = -1 ;
		
		positionMapInit();
		objArray = {};
		radiosArray = [];
		setTimeout(function(){cierraLoading();},400);	
		markerId = 0;
	}
  }

/* -------------  Remove Marker and Circle --------------*/
function deleteObjMarkerMap(markerId){
	objArray[markerId].marker.setMap(null);
	objArray[markerId].circle.setMap(null);
	delete objArray[markerId];
}










/* =================== CLASS OBJ RADIOS  ==================*/

function RadiosClass(idZona,coordenada, idMarker,marker, circle){
	this.idZona     = idZona;
	this.coordenada = coordenada;
	this.marker     = marker;
	this.idMarker   = idMarker;
	this.circle     = circle;
	this.estatus    = 1;
	this.longRadio;
	this.infoMarker;

	//**** Getter Setter
	this.getEstatus = function (){
		return this.estatus;
	}

	this.setEstatus = function (estatus){
		this.estatus = estatus;
	}

	this.getIdMarker = function (){
		return this.idMarker;
	}

	this.setIdMarker = function (idMarker){
		this.idMarker = idMarker;
	}


	this.getInfoMarker = function (){
		return this.infoMarker;
	}

	this.setInfoMarker = function (infoMarker){
		this.infoMarker = infoMarker;
	}
	
	/* ==== long Radio  === */
	this.getLongRadio = function (){
		return this.longRadio;
	}

	this.setLongRadio = function (longRadio){
		this.longRadio = longRadio;
	}
	
	
}

/* -- class --*/
function CoordenadaClass(lat, lng, radio){
	this.radio  = radio;
	this.lat    = lat;
	this.lng    = lng;
}

/* -- class --*/
function RadiosLocalizados(lat, lng, zonaId, infoRadioLocalizado, longRadio){
	this.lat    = lat;
	this.lng    = lng;
	this.zonaId = zonaId;
	this.infoRadioLocalizado = infoRadioLocalizado;
	this.longRadio = longRadio;
}

/* -- class Info --*/
function InfoRadiosLocalizados(fcEstrategia, fcPoblacionTotal, fcPea, fcViviendas, fcNse, fcMercados, fcEscuelas, fcHospitales, fcTemplos, fcCallePrin, fcCalle1, fcCalle2, fcSitio){
	this.fcEstrategia = fcEstrategia;
	this.fcPoblacionTotal = fcPoblacionTotal;
	this.fcPea = fcPea;
	this.fcViviendas = fcViviendas;
	this.fcNse = fcNse;
	this.fcMercados = fcMercados;
	this.fcEscuelas = fcEscuelas;
	this.fcHospitales = fcHospitales;
	this.fcTemplos = fcTemplos;
	this.fcCallePrin = fcCallePrin;
	this.fcCalle1 = fcCalle1;
	this.fcCalle2 = fcCalle2;
	this.fcSitio  = fcSitio;
}





/* =================== LOAD XSLS ==================*/

var X = XLSX;
var XW = {
	/* worker message */
	msg: 'xlsx',
	/* worker scripts */
	worker: './js/xslx/xlsxworker.js'
};

var global_wb;

var process_wb = (function() {

	var to_json = function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			
			var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
			if(roa.length) result[sheetName] = roa;
		});
		return JSON.stringify(result, 2, 2);
	};


	return function process_wb(wb) {
		global_wb = wb;
		var output = "";

		pintarCirculosXslx(JSON.parse(to_json(wb)).Radios);

		if(typeof console !== 'undefined') console.log("output", new Date());

	};
})();

var setfmt = window.setfmt = function setfmt() { if(global_wb) process_wb(global_wb); };

var do_file = (function() {

	var rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
 	var use_worker = typeof Worker !== 'undefined';

	var xw = function xw(data, cb) {
		var worker = new Worker(XW.worker);
		worker.onmessage = function(e) {
			switch(e.data.t) {
				case 'ready': break;
				case 'e': console.error(e.data.d); break;
				case XW.msg: cb(JSON.parse(e.data.d)); break;
			}
		};
		worker.postMessage({d:data,b:rABS?'binary':'array'});
	};

	return function do_file(files) {
		cargaLoading();

		var f = files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
			var data = e.target.result;
			if(!rABS) data = new Uint8Array(data);
			if(use_worker) xw(data, process_wb);
			else process_wb(X.read(data, {type: rABS ? 'binary' : 'array'}));
		};

		if(rABS) reader.readAsBinaryString(f);
		else reader.readAsArrayBuffer(f);

		setTimeout(function(){cierraLoading();},1550);


	};


})();

(function() {
	var drop = document.getElementById('drop');
	if(!drop.addEventListener) return;

	function handleDrop(e) {
		e.stopPropagation();
		e.preventDefault();
		do_file(e.dataTransfer.files);
	}

	function handleDragover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}

	drop.addEventListener('dragenter', handleDragover, false);
	drop.addEventListener('dragover', handleDragover, false);
	drop.addEventListener('drop', handleDrop, false);
})();

(function() {
	var xlf = document.getElementById('xlf');
	if(!xlf.addEventListener) return;
	function handleFile(e) { do_file(e.target.files); }
	xlf.addEventListener('change', handleFile, false);
})();

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-36810333-1']);
	_gaq.push(['_trackPageview']);

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();






	/* =================== ASIGNAR RADIOS ==================*/

	/* ---------- Adds a marker to the map. STATIC--------*/
	function addMarkerAsigna(obj, map) {
	  var marker = new google.maps.Marker({
	    position: obj.coordenada,
	    draggable: false,
	    animation: google.maps.Animation.DROP,
	    map: map,
	    id : obj.idMarker,
	    icon : iconMarker
	  });

	 bounds.extend(marker.position);
	 marker.addListener("click", function() {
	   
    	if(infowindow == undefined){
    		obj.marker.setIcon(iconMarkerSelect);
    		
      	infowindow =  new  google.maps.InfoWindow({
    	    content: crearInfoRadioLocalizado(obj)
    	  });
      	
    	infowindow.open(map,marker);
    	objArray[obj.idMarker].circle.setMap(null);
    	 objArray[obj.idMarker].circle = crearCirculo(obj.coordenada,"blue",obj.longRadio);
    	 radioSeleccionado = objArray[obj.idMarker];
    	 
    	}else{

    		if(radioSeleccionado.idMarker != obj.idMarker){
    			obj.marker.setIcon(iconMarkerSelect);
    			infowindow.close();

    			infowindow = new  google.maps.InfoWindow({
    				content: crearInfoRadioLocalizado(obj)
    			});

    			if(radioSeleccionado.idMarker != -1){
    				radioSeleccionado.circle.setMap(null);
    				radioSeleccionado.circle = crearCirculo(radioSeleccionado.coordenada,"red",radioSeleccionado.longRadio);
    				radioSeleccionado.marker.setIcon(iconMarker);
    			}

    			infowindow.open(map,marker);
    			objArray[obj.idMarker].circle.setMap(null);
    			objArray[obj.idMarker].circle = crearCirculo(obj.coordenada,"blue",obj.longRadio);

    			radioSeleccionado = objArray[obj.idMarker];
    			
    		}else 
    			if(radioSeleccionado.idMarker == obj.idMarker){
    				infowindow.close();
    				radioSeleccionado.circle.setMap(null);
    				radioSeleccionado.circle = crearCirculo(radioSeleccionado.coordenada,"red",radioSeleccionado.longRadio);
    				radioSeleccionado.marker.setIcon(iconMarker);
    				radioSeleccionado = undefined;
    				infowindow = undefined;
    			}
    	}
	});

		obj.marker   = marker;
		obj.circle   = crearCirculo(obj.coordenada,"red",obj.longRadio);
		markerId++;
	}

/* === Cancelar Select  ===*/
function cancelarSelecRadio(){
		if(infowindow != undefined){
			infowindow.close();
			radioSeleccionado.circle.setMap(null);
			radioSeleccionado.circle = crearCirculo(radioSeleccionado.coordenada,"red",radioSeleccionado.longRadio);
			radioSeleccionado.marker.setIcon(iconMarker);
			radioSeleccionado = undefined;
			infowindow = undefined;
		}
	}
	
	/* ---------- Consume WS Empleados --------*/
	function asignarRadio(){
		cargaLoading();
		var idJefeExpansion = $("#select_employee option:selected").val();
		var idRadioAginar   =  radioSeleccionado == undefined ? undefined :  radioSeleccionado.idMarker;

		if(idJefeExpansion == 0){
			cargaMensajeModal("Localizador","Seleccione a quien se le asignara el radio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			cierraLoading();
			return false;
		}

		if(idRadioAginar == undefined || idRadioAginar == -1){
			cargaMensajeModal("Localizador","Seleccione un radio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			cierraLoading();
			return false;
		}

		invocarJSONServiceAction("asignarRadioLocalizado",{"idJefeExpansion" : idJefeExpansion,"idRadioAginar":idRadioAginar },
				'responseAsignacionRadio',
				function() {
					//Funcion de error
					cargaMensajeModal("Localizador","Error en el servicio obtener radios asignados.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					//cierraLoading();
				},
				function() {
					//Función al finalizar
					cierraLoading();
				});

		responseAsignacionRadio = function(data){
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);

			if(data.codigo == 200){
				 deleteObjMarkerMap(radioSeleccionado.idMarker);
				 radioSeleccionado.idMarker = -1 ;
			}
		}
	}
	

	/* ---------- Consume WS JEFES Disponibles por zona --------*/
	function getObtenerEmpleados(){
		cargaLoading();

		invocarJSONServiceAction("obtenerEmpleadosZona",{},
				'llenarComboEmpleados',
				function() {
					//Funcion de error
					cargaMensajeModal("Localizador","Error en el servicio obtener jefes de expansión.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					$('#select_employee')
				    .empty()
				    .append('<option selected="selected" value="-1">Selecione un jefe </option>')
				;

				},
				function() {
					//Función al finalizar
					cierraLoading();
				});

		llenarComboEmpleados = function(data){
			
			if(data.codigo == 400){
				cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				return false;
			}

			objArrayEmployee = data;

			objArrayEmployee.usuarios.forEach(function(item, i){
				 $('#select_employee').append($('<option>', {
				        value: item.usuarioId,
				        text : item.usuario
				    }));
			});
		}
	}


	/* ---------- Consume WS Radios por asignar --------*/
	function getRadiosLocalizados(){
		cargaLoading();
		invocarJSONServiceAction("obtieneRadiosLocalizados",{},
				'responseRadiosLocalizados_',
				function() {
					//Funcion de error
					cargaMensajeModal("Localizador","Error en el servicio consultar radios localizados.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					clearMarkers();
					//cierraLoading();
				},
				function() {
					//Función al finalizar
					
				});

		responseRadiosLocalizados_ = function(data){
			clearMarkers();
			if(data.codigo == 205){
				cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				return false;
			}
				
			radiosArray = [];
			bounds = new google.maps.LatLngBounds();
			data.radios.forEach(function(element,index){

				objArray[element.radioId] = new RadiosClass(element.zona.trim(),
													new  CoordenadaClass(parseFloat(element.latitud),parseFloat(element.longitud)),
													element.radioId);
				
				objArray[element.radioId].setLongRadio(element.longRadio);
				
				if(element.datosRadio != undefined && element.datosRadio!= null){
					var infoRadios = element.datosRadio;
					objArray[element.radioId].setInfoMarker(new InfoRadiosLocalizados(infoRadios.fcEstrategia, infoRadios.fcPoblacionTotal, infoRadios.fcPea, infoRadios.fcViviendas, infoRadios.fcNse, infoRadios.fcMercados, infoRadios.fcEscuelas, infoRadios.fcHospitales, infoRadios.fcTemplos, infoRadios.fcCallePrin, infoRadios.fcCalle1, infoRadios.fcCalle2, infoRadios.fcSitio ));					
				}

				addMarkerAsigna(objArray[element.radioId], map);			
			});

			map.fitBounds(bounds);
			setTimeout(function(){cierraLoading();},500);
		}
	}

