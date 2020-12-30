var ANALISTA_RADIOS = 15;

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


var boundsAsig;
var bounds; 
var boundsRutaTodos;
var boundsRadiosEstatus;
var boundsMds;
var boundsGeneral;

var infowindow;
var labelIndex = 0;
var map;
var json_excel;
var objArray = {};
var radiosArray = [];
var MdsArray = [];

var markerId = 0;
var radioSeleccionado;
var objArrayEmployee;
var icon_Mds = "img/localizador/pin/icon-pin-md.png";
var iconMarke = { NUEVO : "img/icon-marker-new.svg",
				  ASIGNADO: "img/markers_NA.svg", 
				  EN_PROCESO: "img/icon-marker-proceso.svg", 
				  CONCLUIDO: "img/icon-marker-concluido.svg",
			      CANCELADO:"img/icon-marker-cancelado.svg", 
			      SELECTED:"img/markers_RADIOblue.svg",
			      HERE: 'img/markers_NA.svg', 
			      MD : 'img/icon_conMD.svg' }; 

var iconMarkeGenerador = {  100001   : "img/localizador/pin/pin_templo.svg", 		// IGLESIA
							100002  : "img/localizador/pin/pin_hospital.svg", 	 		// HOSPITAL		
							100003	: "img/localizador/pin/pin_escuela.svg",  	// ESCUELA
							100004	: "img/localizador/pin/pin_mercado.svg",  	// MERCADO
							100005	: "img/localizador/pin/pin_ofgobierno.svg",  	// OFICINA DE GOBIERNO
							100006	: "img/localizador/pin/pin_panaderia.svg",  	// PANADERIA
							100007 	: 'img/localizador/pin/pin_tortilleria.svg', 			// TORTILLERIA
							100008	: 'img/localizador/pin/pin_abarrotes.svg', 			// ABARROTES
							100009	: 'img/localizador/pin/pin_carniceria.svg', 			// CARNICERIA
							100010 	: "img/localizador/pin/pin_polleria.svg",	    // POLLERIA
							100011	: "img/localizador/pin/pin_recauderia.svg"};			// RECAUDERIA
				      	  	
var iconMarkeCompetencias = {  100001   : "img/localizador/pin/pin_3b.svg", 		// 3b
								100002  : "img/localizador/pin/pin_aurrera_express.svg", 	 	    // Bodega express
								100011	: "img/localizador/pin/pin_aurrera.svg"};			// mi bodega
  	  	

var PANT_OPCION   = {	ALTARADIOS : 0,
						ASIGNARRADIOS : 1, 
						LOCALIZACION : 2, 
						MISMDS : 3, 
						RADIOSXMD : 4};

var colors = {NUEVO:"#FFC300", ASIGNADO:"gray" ,EN_PROCESO : "#00bf5f",  CONCLUIDO : "#007fff", CANCELADO : "#ff5656"};


var element_call;
var idRadioDesAsignar = -1;

/* == MDS RADIOS X MDS == */
var ARRAYOBJGERENTES;
var ARRAYOBJJEFES;
var ARRAYOBJESTADOS;


/* === LOCALIZACION RUTA === */
var MARKER_HERE;
var UBICACIONACTUAL;
var INICIO_UBICACION;
var LIST_UBICACIONES;
var ESTATUS_CONSULTA = false;
var directionsDisplay;
var directionsService;

/* =================== MAIN FUNCTION *-JS-*  ==================*/
$(function(){
	
	inicializaCalendarios();
	$('#idlocalizador').addClass('resaltado');
	$('#asignarRadio').click(function(){ showContentRadios(this);});
	$('#altaRadio').click(function(){ showContentRadios(this);});
	$('#localizaTime') .click(function(){ showContentRadios(this);});
	$('#verMds')	   .click(function(){ showContentRadios(this);});
	$('#verRadiosEstatus')	   .click(function(){ showContentRadios(this);});
	
	
	$('#btonGuardarRadios').click(function(){ guardaRadiosLocalizados();});
	$('#btonCancelarRadios').click(function(){$("#xlf").val(""); $(".contentPopUpInfo").hide(); $(".contentPopUpInfoMD").hide(); clearMarkers();});
	$("#btnAsignarRadio").click(function(){ asignarRadio(1);});
	$("#btnConsultaAnillos").click(function(){ getAnillosXFiltros();});
	$("#btnConsultaAnillosConsulta").click(function(){ getAnillosXConsulta();});
	
	
	$("#download_plantillaRadios").click(function(){ download_ejemplo(); });
	$("#btnRemovelAsign").click(function(){ closePopUpInfo();  var selet = {value:0};	radiosUsuario(selet); });
	
	$("#select_employee").change(function(){ radiosUsuario(this); });
	$("#select_employeeMDGere").change(function(){ cargarJefesXGerente(this);});
	
	$("#btnUbicacionTR").click(function(){ consultarRutaRecorridaJefe();});
	$("#checkTodaRuta").change(function(){ 
		if(validaFechaConsultada(1))
			return false;
			
		verRutaUbicacion();
		});
	
	/*-- ver MD's --*/
	$("#btnVerMds").click(function(){ getObtenerMDs();});
	$(".btn_infoClose").click(function(){closePopUpInfo();});
	
	/* == UBICACION TIEMPO REAL ==*/
	$("#datepicker1").change(function(){validaFechaConsultada(2);});
	$('#select_employeeLocalizar').change(function(){ validaFechaConsultada(2); ESTATUS_CONSULTA = false;});
	
	
	/* == INICAR CHOSEN ==*/
	setTimeout(function(){$('.chosen-select').chosen( { width: '100%' } );},100);
	getObtenerEstados();
	getObtenerEmpleados($('#select_employee'),2);
	
	
	$('#verRadiosEstatus').trigger('click');
	
});

/* === DOWNLOAD PLANTILLA ===*/
function download_ejemplo(){
	cargaLoading();

	$.fileDownload('download_format_radius')
    .done(function () { 
    	setTimeout(function(){cierraLoading();},500);
    		alert('File download a success!'); })
    .fail(function () {
    	setTimeout(function(){cierraLoading();},500);
    		alert('File download failed!'); });
	
	setTimeout(function(){cierraLoading();},250);
	
	$("#download_plantillaRadios").unbind();
	setTimeout(function(){ $("#download_plantillaRadios").bind();  $("#download_plantillaRadios").click(function(){ download_ejemplo(); });},5500);
	
}



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
    	$("#select_employee").val(-1);
    	
    	/* ==== FILTROS Consulta de anillos === */
    	llenarComboBoxEstados($('#comboBox_estado'),1);
    	
    	var dateHoy = new Date();
    	var FECHA_HOY2 = $.datepicker.formatDate('dd/mm/yy',dateHoy);
    	$("#datepicker2").val(FECHA_HOY2);

    }
    
    /* === VER MIS MDS ===*/
    if(element_call.id == "verMds"){
    	if(ARRAYOBJGERENTES == undefined || Object.keys(ARRAYOBJGERENTES).length < 0){
    		getObtenerEmpleadosGerentes();    		
    		
    	}else{

    		
    	}
    }
    
    /*=== INTI LOCALIZACION EN TIEMPO REAL ===*/
    if(element_call.id == "localizaTime"){
	    if($("#select_employeeLocalizar")[0].length <= 2){
	    	getObtenerEmpleados($('#select_employeeLocalizar'),3);	    	
	    }else{
    		var dateHoy = new Date();
    		var FECHA_HOY = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	    	 $("#datepicker1").val(FECHA_HOY);
	    	 $("#checkTodaRuta").prop("checked", false);
		     $('#select_employeeLocalizar').val(-2);	    	
	    }
    }
    
	    /*=== INIT VER RADIOS CON MDS ===*/
	    if(element_call.id == "verRadiosEstatus"){
	    	$("#check_nuevos").prop("checked",true);
	    	$("#check_asignados").prop("checked",true);
	    	$("#check_proceso").prop("checked",false);
	    	$("#check_concluido").prop("checked",false);
	    	$("#check_cancelado").prop("checked",false);
	    	$("#check_MdsRadios").prop("checked",false);
	
        	var dateHoy3 = new Date();
        	var FECHA_HOY3 = $.datepicker.formatDate('dd/mm/yy',dateHoy3);
        	$("#datepicker3").val(FECHA_HOY3);
	    }
	    
	    
	    /* =============== CLEAN MAP MARKERS =========*/
		clearMapsRadiosMDsBuscar(arrayRadios_4);
		clearMapsRadiosMDsBuscar(arrayMds_4);
		quitarPinUbicacionActual();
		cleanMapRutas();
		clearMapsMds(MdsArray);
		cleanMapRutasAllJefes();
		pintarMdsAnillos(radioSeleccionado,null);
		pintarGeneradores(radioSeleccionado,null);
		pintarCompetencias(radioSeleccionado,null);
		
		ESTATUS_CONSULTA = false; 
		positionMapInit();
		$(".contentPopUpInfo").hide();
		$(".contentPopUpInfoMD").hide();
		$("#xlf").val("");
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
  boundsRadiosEstatus = new google.maps.LatLngBounds();
  boundsMds = new google.maps.LatLngBounds();
  boundsAsig = new google.maps.LatLngBounds();
  boundsRutaTodos = new google.maps.LatLngBounds();
  
  setTimeout(function(){cierraLoading();},1850);
  
  
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: false,
    map: map,
    panel: document.getElementById('right-panel'),
    suppressMarkers: true
  });

}



/* ---------- toggleBounce  --------*/
function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){marker.setAnimation(google.maps.Animation.BOUNCE);},1100);
    }
  }

/* ---------- Crear Radio  --------*/
function crearCirculo(location,color, radius){

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
	        strokeOpacity: 0.5,
	        strokeWeight: .5,
	        fillColor: color,
	        fillOpacity: 0.4,
	        map: map,
	        center: location,
	        radius: radius
	      });
}


function positionMapInit(){
	if(map != null && map != undefined){
		map.setZoom(6);
		map.setCenter( {lat: 19.356703, lng: -99.276124});		
	}
}

function validaValorObj(valor){
	if(valor == undefined){
		valor = "Sin asignar";
	}
	return valor;
}

function validaValorObjRadio(valor){
	if(valor == undefined){
		valor = "Sin asignar";
	}else{
		valor += "m";
	}
	return valor ;
}



/* ------  Cant Radios -------*/
function getSizeRadios(){
  return Object.keys(objArray).length;
}

/* -------------  Clear Map Radios --------------*/
function clearMarkers(){
	
	$("#div-asignacion-anillo").hide();
	
	if(getSizeRadios() > 0){
		cargaLoading();
		Object.keys(objArray).forEach(function(key){
			deleteObjMarkerMap(objArray[key].id);
		});
		
		if(radioSeleccionado != undefined)
			radioSeleccionado.id = -1 ;
		
		positionMapInit();
		objArray = {};
		radiosArray = [];
		setTimeout(function(){cierraLoading();},400);	
	}
  }

/* -------------  Remove Marker and Circle --------------*/
function deleteObjMarkerMap(markerId){
	objArray[markerId].marker.setMap(null);
	objArray[markerId].circle.setMap(null);

	if(objArray[markerId].generadores != undefined &&
			objArray[markerId].generadores.length > 0 ){
		if(objArray[markerId].generadores != undefined){
			objArray[markerId].generadores.forEach(function(generador,index){
				generador.marker.setMap(null);
			});			
		}
	}
	
	delete objArray[markerId];
}










/* =================== CLASS OBJ RADIOS  ==================*/

function RadiosClass(idZona,coordenada, idMarker,marker, circle, estatusId, usuarioId, NombreUsr){
	this.idZona     = idZona;
	this.coordenada = coordenada;
	this.marker     = marker;
	this.idMarker   = idMarker;
	this.circle     = circle;
	this.estatusId  = estatusId;
	this.usuarioId  = usuarioId;
	this.NombreUsr  = NombreUsr; 
	this.longRadio;
	this.infoMarker;
	this.generadoresMarker = [];

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
	
	
	this.addGeneradoresMarker = function (generadoresMarker){
		this.generadoresMarker.push(generadoresMarker);
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
function InfoRadiosLocalizados(fcEstrategia, fcPoblacionTotal, fcPea, fcViviendas, fcNse, fcMercados, fcEscuelas,
								fcHospitales, fcTemplos, fcCallePrin, fcCalle1, fcCalle2, fcSitio, fcRadio, fcCedis, fcDistancia, fcTipot, fcTiempo,indexXSLX){
	this.fcEstrategia = fcEstrategia;
	this.fcPoblacionTotal = fcPoblacionTotal;
	this.fcPea        = fcPea;
	this.fcViviendas  = fcViviendas;
	this.fcNse        = fcNse;
	this.fcMercados   = fcMercados;
	this.fcEscuelas   = fcEscuelas;
	this.fcHospitales = fcHospitales;
	this.fcTemplos    = fcTemplos;
	this.fcCallePrin  = fcCallePrin;
	this.fcCalle1     = fcCalle1;
	this.fcCalle2     = fcCalle2;
	this.fcSitio      = fcSitio;
	this.fcRadio      = fcRadio;
	
	//== CEDIS
	this.fcCedis      = fcCedis;
	this.fcDistancia  = fcDistancia;
	this.fcTipot      = fcTipot;
	this.fcTiempo     = fcTiempo;
	this.indexXSLX    = indexXSLX;
	
	
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

		if(wb.Sheets.Radios == undefined){
			cierraLoading();
			$("#xlf").val("");
			cargaMensajeModal("Localizador","Plantilla incorrecta, descargue la plantilla más reciente.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			return false;
		}
		pintarCirculosXslx(JSON.parse(to_json(wb)).Radios);
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
		clearMarkers();
		$(".contentPopUpInfo").hide();
		$(".contentPopUpInfoMD").hide();
		var f = files[0];
		
		 extensiones_permitidas = new Array(".xlsx"); 
		   mierror = ""; 
		   if (f == undefined || !f.name) { 
			   cierraLoading();
			   clearMarkers();
			   $("#xlf").val("");
		      	cargaMensajeModal("Localizador","No has seleccionado ningún archivo.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		      	return false;
		   }else{ 

		      extension = (f.name.substring(f.name.lastIndexOf("."))).toLowerCase(); 
		      permitida = false; 
		      for (var i = 0; i < extensiones_permitidas.length; i++) { 
		         if (extensiones_permitidas[i] == extension) { 
		         permitida = true; 
		         break; 
		         } 
		      } 
		      if (!permitida) {  
		    	  clearMarkers();
		    	  cierraLoading();
		    	  $("#xlf").val("");
		    	  cargaMensajeModal("Localizador","Comprueba la extensión del archivo a subir. \n Descarga la plantilla para dar de alta radios.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		    	  return false;
		      	}
		   }
		   
		   
		var reader = new FileReader();
		reader.onload = function(e) {
			if(typeof console !== 'undefined') 
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






	/* ========================= ASIGNAR RADIOS =========================*/

	/* ---------- Adds a marker to the map. STATIC--------*/
	function addMarkerAsigna(obj, map) {
      var iconTipo;
	  var colorCicle;
      
      iconTipo   = obj.estatusId == 2? iconMarke.ASIGNADO : iconMarke.NUEVO;
      colorCicle = obj.estatusId == 2? colors.ASIGNADO : colors.NUEVO;
      
      
  	var icon = {
			url: iconTipo, // url
			scaledSize: new google.maps.Size(35, 35)// scaled size
		};
      
	  var marker = new google.maps.Marker({
		    position: obj.objCoordenadas,
		    draggable: false,
		    animation: google.maps.Animation.DROP,
		    map: map,
		    id : obj.id,
		    icon : icon
		  }); 
	  
	  boundsAsig.extend(marker.position);
	 marker.addListener("click", function() {
		 if (marker.getAnimation() !== null) {
	          marker.setAnimation(null);
	          $(".contentPopUpInfo").hide();
	          $("#div-asignacion-anillo").hide();
	          
	          
	         // map.fitBounds(boundsAsig);
	          map.setZoom(12);
	          pintarGeneradores(obj,null);
	          pintarMdsAnillos(obj,null);
	          obj.circle.setMap(null);
	        } else {
	          if(radioSeleccionado != undefined && radioSeleccionado != null){
	        	  radioSeleccionado.marker.setAnimation(null);
	        	  pintarGeneradores(radioSeleccionado,null);
	        	  pintarMdsAnillos(radioSeleccionado,null);
	          }

	          
	          marker.setAnimation(google.maps.Animation.BOUNCE);
	          setTimeout(function(){marker.setAnimation(google.maps.Animation.BOUNCE);},1100);
	          radioSeleccionado = objArray[obj.id];
	          verInformacionRadio(radioSeleccionado, PANT_OPCION.ASIGNARRADIOS);	  
	          map.setCenter(new google.maps.LatLng(radioSeleccionado.lat , radioSeleccionado.lng));
	          map.setZoom(16);
	          
	          var estatusId = parseInt(obj.estatusId);

	          $(".contentPopUpInfo").show();
	          
	          if(estatusId == 2 || estatusId == 3 || estatusId == 5 ){
	        	  $("#div-asignacion-anillo").hide();	        	 	        	  
	          }else{
	        	  $("#div-asignacion-anillo").show();
	          }
	          
	          
	          obj.circle.setMap(map);
	          pintarGeneradores(obj,map);
	        }

	});

	 boundsGeneral = boundsAsig;
		obj.marker   = marker;
		markerId++;
}

/* === Cancelar Select  ===*/
function cancelarSelecRadio(){
		if(infowindow != undefined){
			if(radioSeleccionado.estatusId != 2){
				radioSeleccionado.circle.setMap(null);
				radioSeleccionado.circle = crearCirculo(radioSeleccionado.coordenada,colors.NUEVO,radioSeleccionado.longRadio);
				radioSeleccionado.marker.setIcon(iconMarke.NUEVO);
			}
			infowindow.close();
			radioSeleccionado = undefined;
			infowindow = undefined;
		}
	}
	
function desAsignarRadio(){
	 cargaMensajeModal("Localizador", "¿Estás seguro que deseas quitar la asignación del radio?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, asignarRadio);
}

	/* ---------- Consume WS Empleados --------*/
	function asignarRadio(tipoAction){
		
		if(tipoAction == 1){
			idRadioDesAsignar = -1;
		}else if(tipoAction == 2){
			
		}

		cargaLoading();
		var valorAsigna = 1;
		var idJefeExpansion = $("#select_employee option:selected").val();
		var idRadioAginar   =  radioSeleccionado == undefined ? undefined :  radioSeleccionado.id;

		if(objArray[idRadioDesAsignar] != undefined && (objArray[idRadioDesAsignar].estatusId == 2 || objArray[idRadioDesAsignar].estatusId == 3)){
			valorAsigna = (objArray[idRadioDesAsignar].estatusId == 2 || objArray[idRadioDesAsignar].estatusId == 3)? 2 : 1;
			idRadioAginar = idRadioDesAsignar;
		}else{
			
			
				if(idJefeExpansion == -1 ||idJefeExpansion == null || idJefeExpansion == undefined ){
					cargaMensajeModal("Localizador","Seleccione a quien se le asignara el radio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					cierraLoading();
					return false;
				}
				
				if(idRadioAginar == undefined || idRadioAginar == -1 || radioSeleccionado.estatusId == 2){
					cargaMensajeModal("Localizador","Seleccione un radio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					cierraLoading();
					return false;
				}
				
				if(objArray[idRadioAginar].estatusId == 2){
					cierraLoading();
					cargaMensajeModal("Localizador","Seleccione un radio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					return false;
				}
		}
		
		

		invocarJSONServiceAction("asignarRadioLocalizado",{"idJefeExpansion" : idJefeExpansion,"idRadioAginar":idRadioAginar , valorAsigna: valorAsigna},
				'responseAsignacionRadio',
				function() {
					//Funcion de error
					cargaMensajeModal("Localizador","Error en el servicio obtener radios asignados.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					cierraLoading();
				},
				function() {
					//Función al finalizar
					cierraLoading();
				});

		responseAsignacionRadio = function(data){
			cleanRadiosDispoAsignados();
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			getAnillosXConsulta();
			
		}
		
		
		$("#select_employee").val(-1);
		$(".btn_infoClose").trigger("click");
	}
	

	/* ---------- Consume WS JEFES Disponibles por zona --------*/
	function getObtenerEmpleados(elementId, tipo){
		cargaLoading();
		

		invocarJSONServiceAction("obtenerEmpleadosZona",{},
				'llenarComboEmpleados',
				function() {
					//Funcion de error
					cargaMensajeModal("Localizador","Error en el servicio obtener jefes de expansión.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					elementId
				    .empty()
				    .append('<option selected="selected" value="">Selecione un jefe </option>')
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

			$(elementId).html("");
			elementId.empty().append('<option selected="selected" value="-1">Selecione un jefe </option>')
		    
			if(tipo == 3){
				$(elementId).html("");
				elementId.empty().append('<option selected="selected" value="-2">Selecione un jefe </option>')
				elementId.append('<option value="-1">Todos los jefes </option>')
			}
			objArrayEmployee = data;
			ARRAYOBJJEFES = objArrayEmployee.usuarios;
			objArrayEmployee.usuarios.forEach(function(item, i){
				elementId.append($('<option>', {
				        value: item.usuarioId,
				        text : item.usuario
				    }));
			});
			
			 $(elementId).trigger("chosen:updated");
			 
		}
	}


	/* ---------- Consume WS Radios por asignar --------*/
	function getRadiosLocalizados(){

	}

/* === MOSTRAR SOLO CIRCULOS ===*/
function radiosUsuario(select){

	
	if(select.value == 0 || select.value == -1){
		$("#btnAsignarRadio").hide();
		$("#btnRemovelAsign").hide();
	}else{
		$("#btnAsignarRadio").show();
		$("#btnRemovelAsign").show();
	}
	
}


/* === MOSTRAR SOLO CIRCULOS ===*/
function cleanRadiosDispoAsignados(){

	 if(Object.keys(objArray).length <= 0){
		 return false;
	 }

	 Object.keys(objArray).forEach(function (key){

			 if( objArray[key].circle != undefined && objArray[key].circle != null && objArray[key].circle.getMap() != null){
				 objArray[key].circle.setMap(null);
			 } 
			 
			 if( objArray[key].marker != undefined && objArray[key].marker != null && objArray[key].marker.getMap() != null){
				 objArray[key].marker.setMap(null);
			 } 

 
	});
}



/* ========================= LOCALIZACION TIMEPO REAL ========================= */
var ArrayInfoRutas   = [];
var ArrayMarkerRutas = [];
var ArrayMarkerAllJefes = [];
var infoUbicacion ="";
function consultarRutaRecorridaJefe(){

	quitarPinUbicacionActual();
	cleanMapRutasAllJefes();
	directionsDisplay.setDirections({routes: []});
	
	ESTATUS_CONSULTA = false;
	cargaLoading();
	ArrayInfoRutas   = [];
	var usuarioId = $('#select_employeeLocalizar').val();
	var fecha     = $("#datepicker1").val().split('/');
	var formatDate = fecha[2]+"-"+fecha[1]+"-"+fecha[0];
	
	if(usuarioId == -2 ){
		cierraLoading();
		cargaMensajeModal("Localizador","Selecione un jefe.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		return false;
	}	
	
	
	invocarJSONServiceAction("consultaRutaRecorrida",{idJefeExpansion: usuarioId ,fechaRecorrido:formatDate},
			'pintarRudaMaps',
			function() {
				//Funcion de error
				cargaMensajeModal("Localizador","Error en el servicio localización tiempo real.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			},
			function() {
				//Función al finalizar
				//cierraLoading();
			});

	pintarRudaMaps = function(data){
		if(data.codigo == 400 || data.codigo == 205){
			cierraLoading();
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			positionMapInit();
			return false;
		}
		
		var inicioRuta = data.ubicacion[0].datos.length-1;
		LIST_UBICACIONES = new Array();

		if(inicioRuta > 23){
			inicioRuta  = 23;
		}
		ArrayInfoRutas = [];
		var numAux = 0;
		
		if(usuarioId == -1 ){
			data.ubicacion.forEach(function(item,i){				
				if(usuarioId == -1 ){	
						if(item.datos.length != 0){
							LIST_UBICACIONES.push(new google.maps.LatLng(item.datos[0].datosRadio[0].fcLatitud , item.datos[0].datosRadio[0].fcLongitud));
							ArrayInfoRutas[numAux]  = "<span class='fecha_ubicacion'>Nombre : "+item.nombre+"</span><br>"+
							"<span class='fecha_ubicacion'>Fecha : "+item.datos[0].fecha+"</span>";		
							numAux++;
						}
				}	
			});
		}else if(usuarioId != -1 && usuarioId != -2 ){
			data.ubicacion[0].datos.forEach(function(item,i){	
				if(i <= 23 && usuarioId != -1 ){			
					
					if(item.id == 1){
						infoUbicacion = "<span class='fecha_ubicacion'>Nombre : "+data.ubicacion[0].nombre+"</span><br>"+
										"<span class='fecha_ubicacion'>Fecha registro : "+item.fecha+"</span>";
						UBICACIONACTUAL = new google.maps.LatLng(item.datosRadio[0].fcLatitud , item.datosRadio[0].fcLongitud);		 
					}
					
					if(i ==  inicioRuta){
						INICIO_UBICACION =  new google.maps.LatLng(item.datosRadio[0].fcLatitud , item.datosRadio[0].fcLongitud);
						if(data.ubicacion[0].datos.length  == 2){													
							LIST_UBICACIONES.push({location: new google.maps.LatLng(item.datosRadio[0].fcLatitud , item.datosRadio[0].fcLongitud), stopover: true});		
						}
					}else{
						if(data.ubicacion[0].datos.length  != 2){
							LIST_UBICACIONES.push({location: new google.maps.LatLng(item.datosRadio[0].fcLatitud , item.datosRadio[0].fcLongitud), stopover: true});													
						}
					}
					
					if(data.ubicacion[0].datos.length == 1){
						INICIO_UBICACION =  new google.maps.LatLng(item.datosRadio[0].fcLatitud , item.datosRadio[0].fcLongitud);
						ArrayInfoRutas[1] = "<span class='fecha_ubicacion'>Registro : "+item.id +" <br>  Fecha registro : "+item.fecha+"</span>"; 
					}
					ArrayInfoRutas[i] = "<span class='fecha_ubicacion'>Registro : "+item.id +" <br>  Fecha registro : "+item.fecha+"</span>"; 
				} 
			});			
		}

		ESTATUS_CONSULTA = true;
		verRutaUbicacion();		
	}
}

function verRutaUbicacion(){
	if(ESTATUS_CONSULTA){
		cargaLoading();
		quitarPinUbicacionActual();
		directionsDisplay.setDirections({routes: []});
		directionsDisplay = new google.maps.DirectionsRenderer({
			    draggable: false,
			    map: map,
			    panel: document.getElementById('right-panel'),
			    suppressMarkers: true
			  });
		  
	
		if($("#checkTodaRuta").is(":checked") && $('#select_employeeLocalizar').val() != -1){
			
			displayRoute(UBICACIONACTUAL, INICIO_UBICACION, directionsService, directionsDisplay, LIST_UBICACIONES);	
			
		}else{
			if(ESTATUS_CONSULTA){
				hiddenMapRutas();
				
				directionsDisplay = new google.maps.DirectionsRenderer({
					draggable: false,
					map: map,
					panel: document.getElementById('right-panel')
				});	
							
				var icon = {
						url: 
							iconMarke.HERE, // url
						scaledSize: new google.maps.Size(35, 35)// scaled size
					};
				
				if($('#select_employeeLocalizar').val() == -1 ){
					
					if(LIST_UBICACIONES.length <= 0){positionMapInit(); cierraLoading(); return false;}
					
					LIST_UBICACIONES.forEach(function(item,i){
						ArrayMarkerAllJefes[i] = new google.maps.Marker({
							position: item,
							animation: google.maps.Animation.DROP,
							map: map,
							icon : icon
						});
					
						var infowindow = new google.maps.InfoWindow({ 
							size: new google.maps.Size(100,50)
						});
						boundsRutaTodos.extend(ArrayMarkerAllJefes[i].position);
						google.maps.event.addListener(ArrayMarkerAllJefes[i], 'click', function() {
							infowindow.setContent(ArrayInfoRutas[i]); 
							infowindow.open(map,ArrayMarkerAllJefes[i]);
						});
						
					});	
					map.fitBounds(boundsRutaTodos);
				}else{
					
					MARKER_HERE = new google.maps.Marker({
						position: UBICACIONACTUAL,
						animation: google.maps.Animation.DROP,
						map: map,
						icon : icon
					});
					map.setCenter(UBICACIONACTUAL);
					map.setZoom(17);
					var infowindow = new google.maps.InfoWindow({ 
						size: new google.maps.Size(150,50)
					});
					
					google.maps.event.addListener(MARKER_HERE, 'click', function() {
						infowindow.setContent(infoUbicacion); 
						infowindow.open(map,MARKER_HERE);
					});
				}
			}
		}
		 setTimeout(function(){cierraLoading();},1500);
	}
}


/* == QUITAR PIN UBICACION ==*/
function quitarPinUbicacionActual(){
	if(MARKER_HERE != null && MARKER_HERE != undefined){
		MARKER_HERE.setMap(null);
	}
}

/* == PINTAR RUTA ==*/
function displayRoute(origin, destination, service, display, listRuta) {
	
	service.route({
		origin: origin,
		destination: destination,
		waypoints: listRuta,
		travelMode: 'WALKING',
		avoidTolls: true
	}, function(response, status) {
		if (status === 'OK') {
			display.setDirections(response);
		} else {
			alert('Could not display directions due to: ' + status);
		}
		
        var legs = response.routes[0].legs;
        cleanMapRutas();        
        var numMArker = 1;
        var color = "red";
 
        for (var i=0; i < legs.length;i++){
        	color = (numMArker == 1 || numMArker == legs.length )? "blue" : "red";
	          ArrayMarkerRutas[i] =  createMarker(directionsDisplay.getMap(), legs[i].start_location, ArrayInfoRutas[i], legs[i].start_address,color,numMArker);
	          if(numMArker == 1 || numMArker == legs.length){
	        	  ArrayMarkerRutas[i].setMap(null);
	          }
	          numMArker++;
        }
        
        var resaltarMArker = 1;
        setTimeout(function(){
        	for(var i = 0; i < legs.length ;i++){
        		if(resaltarMArker == 1 || resaltarMArker == legs.length){
        			ArrayMarkerRutas[i].setMap(directionsDisplay.getMap());
        		}
        		resaltarMArker++;
        	}        	
        },100);
        
	});
}

/* == PUNTAR RUTA ==*/
function createMarker(map, latlng, label, html, color, text) {

	
	  var infowindow = new google.maps.InfoWindow({ 
			    size: new google.maps.Size(100,50)
			  });

  var contentString = '<b>'+label+'</b><br>'+html;
  var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: "img/markers_nums/marker_"+color+text+".png" ,
      title: label,
      zIndex: Math.round(latlng.lat()*-100000)<<5
      });
      marker.myname = label;

  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(contentString); 
      infowindow.open(map,marker);
      });
  return marker;
}

/* == LIMPIAR MAP RUTAS ==*/
function cleanMapRutas(){
	if(ArrayMarkerRutas.length > 0){
		
		ArrayMarkerRutas.forEach(function(element, index){
			
			if(element.getMap() != undefined ){
				element.setMap(null);
			}
			
		});
	}
	ArrayMarkerRutas = [];
}

/* == LIMPIAR UBICACIONES ==*/
function cleanMapRutasAllJefes(){
	if(ArrayMarkerAllJefes.length > 0){
		
		ArrayMarkerAllJefes.forEach(function(element, index){
			
			if(element.getMap() != undefined ){
				element.setMap(null);
			}
			
		});
	}
	ArrayMarkerAllJefes = [];
}

/* == OCULTAR RUTA ==*/
function hiddenMapRutas(){
	if(ArrayMarkerRutas.length > 0){
		
		ArrayMarkerRutas.forEach(function(element, index){
			
			if(element.getMap() != undefined ){
				element.setMap(null);
			}
			
		});
	}

}

/* == CALENDARIO FECHA RUTA ==*/
function inicializaCalendarios() {
	$(".ui-datepicker-trigger").hide();
	
	var dateHoy = new Date();
	var FECHA_HOY = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	var FECHA_HOY2 = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	var FECHA_HOY3 = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	
	$( "#datepicker1").datepicker({
		maxDate:0,
		autoSize : true,
		showOn: 'both',
		showAnim: 'slideDown',
        buttonImageOnly: false,
        onClose: function( selectedDate ) {
			var date = $(this).datepicker('getDate');			
			var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			
			$( "#datepicker3" ).datepicker( "option", "minDate", selectedDate );
        }
	});
	
	$("#datepicker1").datepicker.dateFormat = 'dd/MM/yy';
	$("#datepicker1").val(FECHA_HOY);
	
	
	
	$( "#datepicker2").datepicker({
		maxDate:0,
		autoSize : true,
		showOn: 'both',
		showAnim: 'slideDown',
        buttonImageOnly: false,
        onClose: function( selectedDate ) {
			var date = $(this).datepicker('getDate');			
			var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			
			$( "#datepicker3" ).datepicker( "option", "minDate", selectedDate );
        }
	});

	$( "#datepicker3").datepicker({
		maxDate:0,
		autoSize : true,
		showOn: 'both',
		showAnim: 'slideDown',
        buttonImageOnly: false,
	});
	
	$("#datepicker3").datepicker.dateFormat = 'dd/MM/yy';
	$("#datepicker3").val(FECHA_HOY3);
}


function validaFechaConsultada(tipoChange){
	var dateHoy = new Date();
	var FECHA_HOY = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	var fechaSelected = $("#datepicker1").val();
	var toDate = false;
	
	if(fechaSelected != FECHA_HOY && tipoChange != 2){
		$("#checkTodaRuta").prop("checked",true);
		toDate = true;
	} 
	
	if(fechaSelected == FECHA_HOY && tipoChange == 2){
		if($("#select_employeeLocalizar").val() == -1){
			$("#checkTodaRuta").prop("checked",false);
			$("#checkTodaRuta").attr("disabled","disabled");
			$("#checkTextRuta").addClass("checkBlock");
			toDate = true;
		}else{
			$("#checkTodaRuta").prop("checked",false);
			$("#checkTodaRuta").removeAttr("disabled","disabled");
			$("#checkTextRuta").removeClass("checkBlock");
			toDate = false;			
		}
		
	}else if(fechaSelected != FECHA_HOY && tipoChange == 2){

		if($("#select_employeeLocalizar").val() == -1){
			$("#checkTodaRuta").prop("checked",false);
			$("#checkTodaRuta").attr("disabled","disabled");
			$("#checkTextRuta").addClass("checkBlock");
			toDate = true;
		}else{
			$("#checkTodaRuta").prop("checked",true);
			$("#checkTodaRuta").attr("disabled","disabled");	
			$("#checkTextRuta").addClass("checkBlock");
			toDate = true;		
		}
		
		
	}
	
	return toDate;
}




  
  /* ============================  CONSULTA MD'S POR EMPLEADO ===============================================*/
  
/*-- CONSULTA MD'S --*/
function getObtenerMDs(){
	cargaLoading();
	clearMapsMds(MdsArray);
	MdsArray = [];
	$(".contentPopUpInfoMD").hide();
	
	var idGerente = $("#select_employeeMDGere").val();
	var idJefe    = $("#select_employeeMDJefes").val();
	
	if(idGerente == 0){
		cierraLoading();
		cargaMensajeModal("Localizador","Selecione un gerente.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		return false;
	}

	invocarJSONServiceAction("obtenerMdsAutorizadas",{idGerenteExpansion:idGerente ,idJefeExpansion:idJefe},
			'responseMdsAutorizadas',
			function() {
				//Funcion de error
				cargaMensajeModal("Localizador","Error en el servicio obtener  Md's autorizadas.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	responseMdsAutorizadas = function(data){
		if(data.codigo == 400 || data.codigo == 205 || data.codigo == 403 || data.Arreglo == undefined){
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			return false;
		}

		bounds = new google.maps.LatLngBounds();
		data.Arreglo.forEach(function(element, i){
			
			element.arrayMD.forEach(function(item,y){
				var objMd = new MdsPorRadio(item.categoria, item.direccion, element.jefeId, item.latitud, item.longitud, item.mdId, item.nombreJefe, item.nombreSitio, item.propietario);
				objMd.id = item.mdId+""+element.jefeId;
				
				if(MdsArray[objMd.id] == undefined ){
					MdsArray[objMd.id] = objMd;
					addMarkerMDs(MdsArray[objMd.id], map,bounds,MdsArray);
				}
				
			});
		});
		
		if(Object.keys(MdsArray).length <= 0){				
			cargaMensajeModal("Localizador","No se encontraron MD´s.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			positionMapInit();
		}else{
			map.fitBounds(bounds);			
		}
	}
}


function clearMapsMds(array_){
	Object.keys(MdsArray).forEach(function(key){
		MdsArray[key].marker.setMap(null);
		removeItemFromArr(MdsArray , key);
	});
	MdsArray = [];	
}

function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}


function pintarMdsMaps(md_){
	
	var icon = {
			url: iconMarke.MD, // url
			scaledSize: new google.maps.Size(35, 35)// scaled size
		};
	
	return  new google.maps.Marker({
		position: md_,
		animation: google.maps.Animation.DROP,
		map: map,
		icon: icon,
		map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
	});
}


/* -- Consume WS JEFES Disponibles por zona --*/
function getObtenerEmpleadosGerentes(){
	cargaLoading();

	invocarJSONServiceAction("obtenerEmpleadosGerentes",{},
			'llenarComboEmpleados',
			function() {
				//Funcion de error
				cargaMensajeModal("Localizador","Error en el servicio obtener jefes de expansión.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				$('#select_employeeMDGere')
			    .empty()
			    .append('<option selected="selected" value="-2">Selecione un gerente </option>')
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
		ARRAYOBJGERENTES = objArrayEmployee.usuarios;

		objArrayEmployee.usuarios.forEach(function(item, i){
			 $('#select_employeeMDGere').append($('<option>', {
			        value: item.gerenteId,
			        text : item.gerente
			    }));
		});
		
		setTimeout(function(){ $("#select_employeeMDGere").trigger('chosen:updated'); },100);
		
	}
}
	
	
/* -- RECARGAR SELECT JEFES --*/
function cargarJefesXGerente(element){
	$('#select_employeeMDJefes').html("");
	$('#select_employeeMDJefes').append($('<option>', {
			value: "-1",
			text :"Todos los jefes"
		}));
	
	if(ARRAYOBJGERENTES != undefined && Object.keys(ARRAYOBJGERENTES).length > 0){
		
		ARRAYOBJGERENTES.forEach(function(item, i){
			if(element.value === item.gerenteId){
				item.jefes.forEach(function(itemj, y){
					$('#select_employeeMDJefes').append($('<option>', {
						value: itemj.jefeId,
						text : itemj.jefe
					}));
				});
			}else if(element.value == -1){
				item.jefes.forEach(function(itemj, y){
					$('#select_employeeMDJefes').append($('<option>', {
						value: itemj.jefeId,
						text : itemj.jefe
					}));
				});
			}
		});
	}
	
	setTimeout(function(){ $("#select_employeeMDJefes").trigger('chosen:updated'); },100);
}
	
/* == VER DETALLE MD ===*/
function obtieneDetalleMd(nombreMd, mdId) {
	$("#nombreMd").val(nombreMd);
	$("#mdId").val(mdId);
	$("#tipoMd").val('5');
	$("#detalleMemoriaAsignadaAction").submit();
}
	
	

/* ============================  CONSULTA RADIOS POR ESTATUS =====================================*/
	var arrayRadios_4 = [];
	var arrayMds_4    = [];
	var ESTATUS_RADIO = {UNO : "Nuevo",DOS: "Asignado", TRES: "En proceso", CUATRO: "Concluido", CINCO:"Cancelado"  };
	
	
	
	function getObtenerRadiosXMDs(){
		cargaLoading();
		clearMapsMds(arrayMds_4);
		clearMapsRadiosMDsBuscar(arrayRadios_4);
		boundsMds = new google.maps.LatLngBounds();
		boundsRadiosEstatus = new google.maps.LatLngBounds();
		
		invocarJSONServiceAction("obtenerRadiosXEstatusMds",{},
				'responseRadiosMds',
				function() {
					//Funcion de error
					cargaMensajeModal("Localizador","Error en el servicio obtener Radios con MDs.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
					$('#select_employeeMDGere')
				    .empty()
				    .append('<option selected="selected" value="-2">Selecione un gerente </option>')
				;

				},
				function() {
					//Función al finalizar
					cierraLoading();
				});

		responseRadiosMds = function(data){

			if(data.codigo == 400){
				cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				return false;
			}

			/* ==== CREAR MDS === */  
			data.md.forEach(function(item,i){
				var objMd = new MdsPorRadio(item.categoria, item.direccion, item.jefeId, item.latitud, item.longitud, item.mdId, item.nombreJefe, item.nombreSitio, item.propietario);
				arrayMds_4[item.mdId] = objMd;
				addMarkerMDs(arrayMds_4[item.mdId], map, boundsMds, arrayMds_4);
			});
			
			/* ==== CREAR RADIOS ===*/
			data.radios.forEach(function(element,i){
				
				arrayRadios_4[element.radioId] = new RadiosClass(element.zona.trim(),
						new  CoordenadaClass(parseFloat(element.latitud),parseFloat(element.longitud)),
						element.radioId,
						null,
						null,
						element.estatusId,
						element.usuarioId,
						element.NombreUsr );
				
				if(element.datosRadio != undefined && element.datosRadio!= null){
					var infoRadios = element.datosRadio;
					arrayRadios_4[element.radioId].setInfoMarker(new InfoRadiosLocalizados(infoRadios.fcEstrategia, infoRadios.fcPoblacionTotal, infoRadios.fcPea, infoRadios.fcViviendas, infoRadios.fcNse,
																					  infoRadios.fcMercados, infoRadios.fcEscuelas, infoRadios.fcHospitales, infoRadios.fcTemplos, infoRadios.fcCallePrin,
																					  infoRadios.fcCalle1, infoRadios.fcCalle2, infoRadios.fcSitio, infoRadios.fcRadio,
																					  infoRadios.fcCedis, infoRadios.fcDistancia, infoRadios.fcTipot, infoRadios.fcTiempo));					
				}
			});
			
			verMdsAutorizadasMaps();
			pintarMarkersMaps(0,true);				
			
		}
	}
	
	/* == show Mds*/
	function verMdsAutorizadasMaps(){
		
		if($("#check_MdsRadios").is(":checked")){
			Object.keys(arrayMds_4).forEach(function(key){
				arrayMds_4[key].marker.setMap(map);
			});			
		}else{
			hiddenMdsAutorizadasMaps();			
		}
		map.fitBounds(boundsMds);
		
	}
	
	/* === hidden Mds ==*/
	function hiddenMdsAutorizadasMaps(){
		Object.keys(arrayMds_4).forEach(function(key){
			if(arrayMds_4[key].marker != undefined && arrayMds_4[key].marker != null ){
				arrayMds_4[key].marker.setMap(null);				
			}
		})
	}
	
	
	/* === limpiar array Radios ===*/
	function clearMapsRadiosMDsBuscar(array_){
		
		Object.keys(array_).forEach(function(key){
			if(array_[key].marker != undefined && array_[key].marker != null ){
				array_[key].marker.setMap(null);	
			}
			
			if(array_[key].circle != undefined && array_[key].circle != null ){
				array_[key].circle.setMap(null);					
			}
			
		});
		array_ = [];	
	}
	

	/* === show  Radios ===*/
	function pintarMarkersMaps(idEstatus, show){
		
		
		if(idEstatus == 0){
			clearMapsRadiosMDs( idEstatus);
			
			Object.keys(arrayRadios_4).forEach(function(key){
				addMarkerEstatus(arrayRadios_4[key], map);
			});
			
		}else{
			Object.keys(arrayRadios_4).forEach(function(key){
				if( arrayRadios_4[key].estatusId == idEstatus && show){
					arrayRadios_4[key].marker.setMap(map);			
					arrayRadios_4[key].circle.setMap(map);	
				}
			});
		}
		
		if(show)
		map.fitBounds(boundsRadiosEstatus);
		
	}


	/* === hidden array Radios ===*/
	function clearMapsRadiosMDs(idEstatus){
		
		Object.keys(arrayRadios_4).forEach(function(key){
			if(arrayRadios_4[key].marker != undefined && arrayRadios_4[key].marker != null && arrayRadios_4[key].estatusId == idEstatus){
				arrayRadios_4[key].marker.setMap(null);			
				arrayRadios_4[key].circle.setMap(null);	
			}
		});
		
		if(radioSeleccionado != undefined 
				&& radioSeleccionado != null 
				&& idEstatus == radioSeleccionado.estatusId){
				
			$(".contentPopUpInfo").hide();					
		}
	}
	

	/* ===== RADIOS CON ESTATUS =====*/
function addMarkerEstatus(obj, map) {
	
		var color;
		var iconoEstatus;
		var pintar = false;
		
		if( obj.estatusId == 1){
			color = colors.NUEVO;
			iconoEstatus = iconMarke.NUEVO;
			pintar = false;
		}else
		  if( obj.estatusId == 2){
			  color = colors.ASIGNADO;
			  iconoEstatus = iconMarke.ASIGNADO;
			  pintar = false;
			}else
				  if(obj.estatusId == 3 ){
					  color = colors.EN_PROCESO;
					  iconoEstatus = iconMarke.EN_PROCESO;
					  
					  if($("#check_proceso").is(":checked") == false)
						  pintar = true;
					  
					  
					}else
						  if(obj.estatusId == 4 ){
							  color = colors.CONCLUIDO;
							  iconoEstatus = iconMarke.CONCLUIDO;
							  
							  if($("#check_concluido").is(":checked")== false)
								  pintar = true;
							 
							}else
								  if(obj.estatusId == 5 ){
									  color = colors.CANCELADO;
									  iconoEstatus = iconMarke.CANCELADO;
									  
									  if($("#check_cancelado").is(":checked")== false)
										  pintar = true;
									  
									}
		
		colorCicle = color;
				
	var icono = {
			url: iconoEstatus,
			scaledSize: new google.maps.Size(35, 35)
		};
      
	  var marker = new google.maps.Marker({
		    position: obj.objCoordenadas,
		    draggable: false,
		    animation: google.maps.Animation.DROP,
		    map: map,
		    id : obj.id,
		    icon: icono,
			map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
		  }); 
	  
	  if(pintar)
	  marker.setMap(null);
	
	 marker.addListener("click",  function(){
		 if (marker.getAnimation() !== null) {
	          marker.setAnimation(null);
	          $(".contentPopUpInfo").hide();
	          $("#div-asignacion-anillo").hide();
	          map.fitBounds(boundsGeneral);
	          
	          pintarGeneradores(obj,null);
	          pintarMdsAnillos(obj, null);
	          pintarCompetencias(radioSeleccionado,null);
	          obj.circle.setMap(null);
	        } else {
	          if(radioSeleccionado != undefined && radioSeleccionado != null && radioSeleccionado.id != obj.id){
	        	  radioSeleccionado.marker.setAnimation(null);
	        	  radioSeleccionado.circle.setMap(null);
	        	  pintarGeneradores(radioSeleccionado,null);
	        	  pintarMdsAnillos(radioSeleccionado, null);
	        	  pintarCompetencias(radioSeleccionado,null);
	          }
	          
	          
	          radioSeleccionado = obj;
	          verInformacionRadio(radioSeleccionado,  PANT_OPCION.RADIOSXMD);	  
	          map.setCenter(new google.maps.LatLng(radioSeleccionado.lat , radioSeleccionado.lng));
	          map.setZoom(16);
	          
	          var estatusId = parseInt(obj.estatusId);
	          
	          if(estatusId == 2 || estatusId == 3 || estatusId == 5 ){
	        	  $("#div-asignacion-anillo").hide();	        	 	        	  
	          }else{
	        	  $("#div-asignacion-anillo").show();
	        	  $('#select_employee').val(0);
	        	  $('#select_employee').trigger("chosen:updated");
	        	  $("#btnAsignarRadio").hide();
	      		  $("#btnRemovelAsign").hide();
	          }
	          
	          
	          $("#btonRecalculaGeneradores").unbind();
	          $("#btonRecalculaGeneradores").bind();
	          $("#btonRecalculaGeneradores").click(function(){ 
	        	  recalcularGeneradoresComp(obj);
	          });
	          
	          
	          $(".contentPopUpInfo").show();
	          pintarGeneradores(obj,map);
	          pintarMdsAnillos(obj,map);
	          pintarCompetencias(obj,map);
	          
	          
	          marker.setAnimation(google.maps.Animation.BOUNCE);
	          obj.circle.setMap(map);
	          setTimeout(function(){marker.setAnimation(google.maps.Animation.BOUNCE);},1100);
	          
	        }
		 
	 });

	 
	 boundsRadiosEstatus.extend(marker.position);
		obj.marker   = marker;
		obj.circle   = crearCirculo(obj.objCoordenadas, colorCicle, obj.anillo);
		obj.circle.setMap(null);

		boundsGeneral = boundsRadiosEstatus;
}


function recalcularGeneradoresComp(obj){

	cargaLoading();
	invocarJSONServiceAction("recalcularGeneradoresComp",{radioId : obj.id},
			'response',
			function() {
				//Funcion de error
				cargaMensajeModal("Localizador","Error en el servicio para recalcular competenecias y genereadores.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	response = function(data){
		if(data.codigo == 400){
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}else{
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}
		
		getAnillosXConsulta();
	}
}


function closePopUpInfo(){	
	
	if(radioSeleccionado != undefined && radioSeleccionado != null && radioSeleccionado.marker.getAnimation() !== null){
   	  	radioSeleccionado.marker.setAnimation(null);
   		
   	  	if(radioSeleccionado.circle != undefined)
   			radioSeleccionado.circle.setMap(null);
   		
   		pintarGeneradores(radioSeleccionado, null);
   	    pintarMdsAnillos(radioSeleccionado,null);
   	    pintarCompetencias(radioSeleccionado,null);
   		
   	  	radioSeleccionado = null;
   	  	$(".contentPopUpInfo").hide();
   	  	$(".contentPopUpInfoMD").hide();
   	  	$("#div-asignacion-anillo").hide();
   	 
   	  	map.fitBounds(boundsGeneral);
   	  	//map.setZoom(12);
     }
	
}

function mostrarVistaSeccion(){
	$("#contenido-vista-a").hide();
	$("#contenido-vista-b").hide();
	
	if($("#option-vista-a").is(":checked"))
		$("#contenido-vista-a").show();

	if($("#option-vista-b").is(":checked"))
		$("#contenido-vista-b").show();	
}
	


function estatusRadios(estatus){
	var estatusRadio;
	
	if(estatus == 1){
		estatusRadio = ESTATUS_RADIO.UNO;
	}else if(estatus == 2){
		estatusRadio = ESTATUS_RADIO.DOS;
	}else if(estatus == 3){
		estatusRadio = ESTATUS_RADIO.TRES;
	}else if(estatus == 4){
		estatusRadio = ESTATUS_RADIO.CUATRO;
	}else if(estatus == 5){
		estatusRadio = ESTATUS_RADIO.CINCO;
	}
	
	return estatusRadio;
}

/* ---------- Adds a marker MDS--------*/
function addMarkerMDs(obj, map,bounds_, array_ ) {
	var icon = {
			url: iconMarke.MD, // url
			scaledSize: new google.maps.Size(35, 35)// scaled size
		};
	
  var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(obj.latitud, obj.longitud),
	    draggable: false,
	    animation: google.maps.Animation.DROP,
	    map: map,
	    id : obj.id,
	    icon : icon
	  }); 
  
  bounds_.extend(marker.position);
  marker.addListener("click", function() {
	  
	 if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
          $(".contentPopUpInfoMD").hide();
          //map.fitBounds(bounds_);
          map.setZoom(12);
          
        } else {
	          if(radioSeleccionado != undefined && radioSeleccionado != null && radioSeleccionado.id != obj.id)
	        	  radioSeleccionado.marker.setAnimation(null); 
	          
	          radioSeleccionado = array_[obj.id];
	          verInfoMd(radioSeleccionado);	  
	          
	          map.setCenter(new google.maps.LatLng(radioSeleccionado.latitud , radioSeleccionado.longitud));
	          map.setZoom(15);
	          $(".contentPopUpInfo").hide();
	          $(".contentPopUpInfoMD").show();

	          marker.setAnimation(google.maps.Animation.BOUNCE);
	          setTimeout(function(){marker.setAnimation(google.maps.Animation.BOUNCE);},1100);
       }
});

  	boundsGeneral = bounds_;
	obj.marker   = marker;
}

function verInfoMd(obj){
	if(obj == undefined){
		cargaMensajeModal("Localizador","La información de la MD no esta disponible.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		return false;
	}
	
	$("#infoMD").html(validaValorObj(obj.nombreSitio));
	$("#infoMDCoordenadas").html(obj.latitud+' , '+obj.longitud);
	$("#infoDireccion").html(validaValorObj(obj.direccion));	
	$("#infoPropietario").html(validaValorObj(obj.propietario));
	$("#infoNombreJefe").html(validaValorObj(obj.nombreJefe));
	$("#verDetalleMD").val(validaValorObj(obj.nombreSitio));
	
	setTimeout(function(){
		$("#verDetalleMD").unbind();
		$("#verDetalleMD").click(function(){obtieneDetalleMd(this.attributes.MdNombre_.value, this.attributes.MdId_.value); });    		
		$("#verDetalleMD").attr("MdNombre_", obj.nombreSitio);
		$("#verDetalleMD").attr("MdId_", obj.mdId);
		
	},250);
	
}



/* ===================== class Mds por radios ============*/
	function MdsPorRadio(categoria,direccion, jefeId, latitud, longitud, mdId, nombreJefe, nombreSitio, propietario, marker ){
		this.categoria = categoria;
		this.jefeId = jefeId;
		this.direccion = direccion;
		this.latitud = latitud
		this.longitud = longitud;
		this.mdId = mdId;
		this.nombreJefe = nombreJefe;
		this.nombreSitio = nombreSitio
		this.propietario = propietario;
		this.marker = marker;
	}	
	
	
	
/* === ACTUALIZACCION 2020 =======*/	
	
	function getObtenerEstados( ){
		cargaLoading();
		invocarJSONServiceAction("obtenerEstados",{},
				'llenarComboBox',
				function() {
					//Funcion de error
					cargaMensajeModal("Localizador","Error en el servicio obtener estados y ciudades.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				},
				function() {
					//Función al finalizar
					cierraLoading();
				});

		llenarComboBox = function(data){
			if(data.codigo == 400){
				cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			}else{
				ARRAYOBJESTADOS = data.salida;
			}
			
			
				llenarComboBoxEstados($("#comboBox_estado"),2);
				llenarComboBoxEstados($("#comboBox_estadoCons"),2);
			}
		}

/* ---------- Consume WS Estados ciudades --------*/
function getObtenerEstadosCiudades(tipoConsulta, elementId){
	cargaLoading();
	invocarJSONServiceAction("obtenerEstadosCidudades",{},
			'llenarComboBox',
			function() {
				//Funcion de error
				cargaMensajeModal("Localizador","Error en el servicio obtener estados y ciudades.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	llenarComboBox = function(data){
		if(data.codigo == 400){
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}else{
			ARRAYOBJESTADOS = data.datos;
		}
	}
	
	if(tipoConsulta == 2){
		llenarComboBoxEstados(elementId,2);
	}
}

/* ---------- Combo Box Estados --------*/	
function llenarComboBoxEstados(elementId,tipoConsulta){
	cargaLoading();

	elementId.html("");
	
	if(ARRAYOBJESTADOS == undefined || ARRAYOBJESTADOS == null || ARRAYOBJESTADOS.size >= 0){
		if(tipoConsulta == 1){
			getObtenerEstados();
		}else{
			elementId.empty().append('<option selected="selected" value="-1">Sin resultados</option>')
		}
		
	} else{
		elementId.empty().append('<option selected="selected" value="-1">Selecione un estado </option>')
		ARRAYOBJESTADOS.forEach(function(item, i){
			elementId.append($('<option>', {
			        value: item.id,
			        text : item.nombre
			    }));
		});
	}
	setTimeout(function(){ $(elementId).trigger('chosen:updated'); },100);
}

/* ---------- Combo Box Ciudades --------*/	
function llenarComboBoxCiudades(elementId, indexId){
	cargaLoading();

	elementId.html("");
	
	if(ARRAYOBJESTADOS == undefined || ARRAYOBJESTADOS == null || ARRAYOBJESTADOS.size >= 0){
		if(tipoConsulta == 1){
			getObtenerEstadosCiudades(2, elementId);
		}else{
			elementId.empty().append('<option selected="selected" value="-1">Sin resultados</option>')
		}
		
	} else{
		elementId.empty().append('<option selected="selected" value="-1">Selecione una ciudad </option>')
		ARRAYOBJESTADOS.forEach(function(item, i){
			if(item.id == indexId){
				
				item.ciudades.forEach(function(itemy, y){
					elementId.append($('<option>', {
				        value: itemy.FIMUNICIPIOID,
				        text : itemy.FCDESCRIPCION
				    }));
				    
			  });
				
			}
		});
	}
	setTimeout(function(){ $(elementId).trigger('chosen:updated'); },100);
	cierraLoading();
}


function getAnillosXConsulta(){

	var nombreAnillo 	= $("#anilloNombreCons").val();
	var fechaAnilloInit     = $("#datepicker1").val();
	var fechaAnilloFin     = $("#datepicker3").val();
	
	var idEstado     	= $("#comboBox_estadoCons").val();
	var estatusId       = 0;
	
	var nuevo 		= $("#check_nuevos").is(":checked");
	var asginado 	= $("#check_asignados").is(":checked");
	var proceso 	= $("#check_proceso").is(":checked");
	var concluido 	= $("#check_concluido").is(":checked");
	var cancelado 	= $("#check_cancelado").is(":checked");
	var mds 		= $("#check_MdsRadios").is(":checked");

	nuevo 		= nuevo? 1 : 0;
	asginado 	= asginado? 1 : 0;
	proceso 	= proceso? 1 : 0;
	concluido 	= concluido? 1 : 0;
	cancelado 	= cancelado? 1 : 0;
	mds 		= mds? 1 : 0;

	var ESTATUS_RADIO = [{Nuevo : nuevo, Asignado: asginado ,  Enproceso:proceso ,  Concluido : concluido,  Cancelado :  cancelado, mds : mds }];
	
	getAnillosXApi( nombreAnillo,fechaAnilloInit, fechaAnilloFin, idEstado, ESTATUS_RADIO);
	
	  $(".contentPopUpInfo").hide();
      $("#div-asignacion-anillo").hide();

}

function getAnillosXFiltros(){
	var nombreAnillo 	= $("#anilloNombreCons").val();
	var fechaAnillo     = $("#datepicker3").val();
	var idEstado     	= $("#comboBox_estado").val();
	var estatusId       = 0;
	
	var ESTATUS_RADIO = { nuevo: "1" };
	getAnillosXApi(nombreAnillo, fechaAnillo, idEstado, estatusId);
}


/* ---------- Consultar Anillos generados automaticamente --------*/	
function getAnillosXApi( nombreAnillo, fechaAnilloInit, fechaAnilloFin , idEstado, estatusId){
	cargaLoading();

	if( idEstado == -1 ){
		cierraLoading();
		cargaMensajeModal("Localizador","Seleccione un estado.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		return false;}
		
	invocarJSONServiceAction("obtieneAnillosxfiltros"
							,{ idEstado 	: idEstado,
							   nombreAnillo : nombreAnillo,
							   fechaIni  	: fechaAnilloInit,
							   fechaFin  	: fechaAnilloFin,
							   estatusId    :  JSON.stringify(estatusId) },
			'response',
			function() {

				cargaMensajeModal("Localizador","Error en el servicio consultar radios localizados.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				clearMarkers();
				pintarGeneradores(radioSeleccionado,null);
				pintarMdsAnillos(radioSeleccionado,null);
				 pintarCompetencias(radioSeleccionado,null);
				//cierraLoading();
			},
			function() {
				//Función al finalizar
			});

	response = function(data){
		pintarCompetencias(radioSeleccionado,null);
		pintarGeneradores(radioSeleccionado,null);
		pintarMdsAnillos(radioSeleccionado,null);
		clearMarkers();
		if( data.codigo == 205 || data.codigo == 400 || data.codigo == 403 || data.radios == undefined){
			cierraLoading();
			cargaMensajeModal("Localizador",data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
			return false;
		}
			
		radiosArray = [];
		boundsAsig = new google.maps.LatLngBounds();
		data.radios.forEach(function(element,index){

		coordenadas = new  CoordenadaClass(parseFloat(element.latitud),parseFloat(element.longitud));
		
		radio = new ClassRadios();
			radio.id 				= element.radioId;
			radio.sitio  			= element.nombre;
			radio.anillo 			= element.longRadio;
			radio.lat    			= element.latitud;
			radio.lng 				= element.longitud;
			radio.infoSitio 		= element.datosRadio;
			radio.estatusId         = element.estatusId;
			radio.estatus           = element.estatus;
			radio.UsrAsignado       = element.UsrAsignado;
			radio.usrAsignadoId     = element.usrAsignadoId;
			radio.visitasRadio      = element.visitasRadio;
			radio.fechaAsignado     = element.fechaAsignado;
			radio.rechazado         = element.rechazado;
			radio.totalUE           = element.totalUE;
			
			radio.objCoordenadas 	= coordenadas;

			/* Crear pines MDs */
			if(element.mds.length > 0){
				radio.mds     = element.mds;
				
				radio.mds.forEach(function(md,index){
					crearMarkerMdsAnillo(md);
				});				
			}
			
			/* Crear pines COMPETENCIA */
			if(element.competencia.length > 0){
				radio.competencia 	= element.competencia;
				radio.competencia.forEach(function(competencia,index){
					crearMarkerCompetencias(competencia);
				});				
			}
			
			objArray[element.radioId] = radio;
			addMarkerEstatus(objArray[element.radioId], map);		
			
			/* Crear pines GENERADORES */
			if(element.generadores.length > 0){
				radio.generadores 	= element.generadores;
				
				radio.generadores.forEach(function(generador,index){
					crearMarkerGenerador(generador);
				});
			}
		});

		map.fitBounds(boundsGeneral);
		setTimeout(function(){cierraLoading();},500);
	}
}

function crearMarkerCompetencias(obj){
	var iconCompetencia = {
		    url:  iconMarkeCompetencias[obj.competenciaId], // url
		    scaledSize: new google.maps.Size(40, 40), // scaled size
		    origin: new google.maps.Point(0,0), // origin
		    anchor: new google.maps.Point(0, 0) // anchor
		};
	
	 var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(obj.latitud, obj.longitud),
		    draggable: false,
		    map: null,
		    title:  obj.generador,
			icon : iconCompetencia,
		  });
	 
	 obj.marker = marker
}


function crearMarkerMdsAnillo(obj){
	
	
	var icon = {
		    url: "img/markers_MD.svg", // url
		    scaledSize: new google.maps.Size(45, 45), // scaled size
		    origin: new google.maps.Point(0,0), // origin
		    anchor: new google.maps.Point(0, 0) // anchor
		};
	
	 var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(obj.latitud, obj.longitud),
		    draggable: false,
		    map: null,
		    title:  obj.nombre,
			icon : icon,
		  }); 
	 
	 marker.addListener("click",  function(){
		 obtieneDetalleMd(obj.nombre,obj.MdId);
	 });
	 
	 
	 obj.marker = marker
}

function crearMarkerGenerador(obj){
	
	
	var icon = {
		    url:  iconMarkeGenerador[obj.generadorId], // url
		    scaledSize: new google.maps.Size(45, 45), // scaled size
		    origin: new google.maps.Point(0,0), // origin
		    anchor: new google.maps.Point(0, 0) // anchor
		};

	 var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(obj.latitud, obj.longitud),
		    draggable: false,
		    map: null,
		    title:  obj.generador,
			icon : icon
		  }); 
	 obj.marker = marker
}

function pintarCompetencias(obj,thisMap){
	if(obj == null || obj.competencia == null || obj.competencia.length <= 0){
		return false;
	}
	obj.competencia.forEach(function(competencia,index){
		competencia.marker.setMap(thisMap);
	});
}

	
function pintarGeneradores(obj,thisMap){
	
	
	if(obj == null || obj.generadores == null || obj.generadores.length <= 0){
		return false;
	}
	obj.generadores.forEach(function(generador,index){
		generador.marker.setMap(thisMap);
	});
}

function pintarMdsAnillos(obj,thisMap){
	if(obj == null || obj.mds == null || obj.mds.length <= 0){
		return false;
	}
	
	obj.mds.forEach(function(md,index){
		md.marker.setMap(thisMap);
	});
}



function pintarGeneradoresFiltro(arrayBbj,thisMap, generadorId){
	if(arrayBbj == null || arrayBbj <= 0){
		return false;
	}
	
	
	arrayBbj.forEach(function(obj,index){
		if(obj.generadorId == generadorId){
			obj.marker.setMap(thisMap);			
		}
	});
}








	