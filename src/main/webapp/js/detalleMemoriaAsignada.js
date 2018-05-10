var PRIMER_HORARIO_CONTEO	=	1;
var SEGUNDO_HORARIO_CONTEO	=	2;
var TERCER_HORARIO_CONTEO	=	3;

var AUTORIZA_MODULO			= 1;
var RECHAZA_MODULO			= 0;

$(function(){
	$('#idasignadas').addClass('resaltado');
	
	$("#nombreMdTxt").text($("#nombreMd").val());
	buscaDetalleMD($("#mdId").val());
	
	var bar = new ProgressBar.Circle(containerProgreso, {
		  strokeWidth: 2,
		  easing: 'easeInOut',
		  duration: 1400,
		  trailColor: '#eee',
		  color: '#FF0000',
		  trailWidth: 1,
		  svgStyle: null
		});
	
	bar.animate(0.9, {
	    from: {color: '#000000', width: 5},
	    to: {color: "#00FF00", width: 5} });
	
	
	//$('#example').popover();
	
	//$('[data-toggle="popover"]').popover()
	
	
	
	//$("#mensaje1").attr("data-content", "<div style='width: 200px; height; 100px; background: #FF0000;'>Test del 1</div>");
	//$("#mensaje2").attr("data-content", "<div style='width: 200px; height; 100px; background: #FF0000;'>Test del 2</div>");
	var contentPopGerente = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Autorización Gerente de Expansión<br/></span></div>' + 
				   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Autorizó</span></div>' +
				   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha autorización</span></div>' +
				   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">Mariana Guadalupe Ramirez Rodriguez</span></div>' +
				   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
				   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha límite</span></div>' +
				   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Días vencidos</span></div>' + 
				   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
				   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">+2</span></div></div>';
	
	var contentPopExpansion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Autorización Expansión<br/></span></div>' + 
	   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Autorizó</span></div>' +
	   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha autorización</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">Mariana Guadalupe Ramirez Rodriguez</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha límite</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Días vencidos</span></div>' + 
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">+2</span></div></div>';
	
	var contentPopGestoria = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Autorización Gestoría<br/></span></div>' + 
	   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Autorizó</span></div>' +
	   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha autorización</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">Mariana Guadalupe Ramirez Rodriguez</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha límite</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Días vencidos</span></div>' + 
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">+2</span></div></div>';
	
	var contentPopConstruccion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Autorización Construcción<br/></span></div>' + 
	   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Autorizó</span></div>' +
	   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha autorización</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">Mariana Guadalupe Ramirez Rodriguez</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha límite</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Días vencidos</span></div>' + 
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">+2</span></div></div>';
	
	var contentPopOperaciones = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Autorización Operaciones<br/></span></div>' + 
	   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Autorizó</span></div>' +
	   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha autorización</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">Mariana Guadalupe Ramirez Rodriguez</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha límite</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Días vencidos</span></div>' + 
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">02/04/2018</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">+2</span></div></div>';
	
	var contentPopSuperficie = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Ponderación<br/></span></div>' + 
	   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: normal;">Frente mts MIN:</span></div>' +
	   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">15 mts</span></div>' +
	   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: normal;">Profundidad mts MIN:</span></div>' +
	   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">15 mts</span></div>' +
	   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: normal;">Total MIN:</span></div>' +
	   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">300 mts<super>2</super></span></div></div>';
	
	$("#gerenteExpansionSegPop").popover({
		html: true, 
		content : contentPopGerente
	});
	$("#expansionSegPop").popover({
		html: true, 
		content : contentPopExpansion
	});
	$("#gestoriaSegPop").popover({
		html: true, 
		content : contentPopGestoria
	});
	$("#construccionSegPop").popover({
		html: true, 
		content : contentPopConstruccion
	});
	$("#operacionesSegPop").popover({
		html: true, 
		content : contentPopOperaciones
	});
	
	
	
	$("#superficieTip").popover({
		html: true, 
		content : contentPopSuperficie
	});
	$("#zonificacionTip").popover({
		html: true, 
		content : contentPopSuperficie
	});
	$("#construccionTip").popover({
		html: true, 
		content : contentPopSuperficie
	});
	$("#generalidadesTip").popover({
		html: true, 
		content : contentPopSuperficie
	});
	$("#conteosTip").popover({
		html: true, 
		content : contentPopSuperficie
	});
	
	$('.popover-dismiss').popover({
		  trigger: 'focus'
		});
		
	
	$("#btnModalAutorizacion").click(function() {
		$("#modal_autorizacion").modal("hide");
	});
});

function buscaDetalleMD(mdId) {
	cargaLoading();
	
	invocarJSONServiceAction("memoria_detalle_x_id", 
			{'mdId': mdId}, 
			'obtieneDetalleMdResponse', 
			function() {
				//Funcion de error
				
				cierraLoading();
			},
			function() {
				//Función al finalizar
				
				cierraLoading();
			});

	obtieneDetalleMdResponse = function( data ) {
	
		if(data == null || data.error == true || data.vacia == true) {
			console.log("*** ENTRA A ERROR DEL DETALLE ***");
		}
	
		if(!data.vacia) {
			/* Datos generales de la MD */
			$("#nombreMd").text(data.nombreMd);
			$("#creadorMd").text(data.creador);
			$("#categoriaMd").text(data.categoria);
			$("#fechaCreacion").text(data.fechaCreacion);
			$("#puntuacionMd").text(data.puntuacion);
			/* Datos del sitio */
			$("#calleMd").text(data.datosSitio.calle);
			$("#coloniaMd").text(data.datosSitio.colonia);
			$("#municipioMd").text(data.datosSitio.municipio);
			$("#ciudadMd").text(data.datosSitio.ciudad);
			$("#estadoMd").text(data.datosSitio.estado);
			$("#codiPostalMd").text(data.datosSitio.codigoPostal);
			/* Datos del propietario */
			$("#propietarioId").text(data.datosPropietario.propietarioId);
			$("#nombrePropietario").text(data.datosPropietario.nombrePropietario);
			$("#telefonoPropietario").text(data.datosPropietario.telefono);
			$("#emailPropietario").text(data.datosPropietario.email);
			if(data.datosPropietario.rentaANeto) {
				$("#rentaANeto").text("YA RENTA A NETO");
			} else {
				$("#rentaANeto").text("NO RENTA A NETO AÚN");
			}
			/* Datos de la superficie */
			$("#puntosSuperficie").text(data.superficie.puntos);
			$("#frenteMd").text(data.superficie.frente + " mts");
			$("#profundidadMd").text(data.superficie.profundidad + " mts");
			$("#tamanioTotalMd").text(data.superficie.total + " mts");
			$("#vistaFrontalMd").attr("src", data.superficie.vistaFrontal.nombreFoto);
			$("#fechaVistaFrontal").text(data.superficie.vistaFrontal.fecha);
			$("#horaVistaFrontal").text(data.superficie.vistaFrontal.hora);
			$("#vistaLateral1Md").attr("src", data.superficie.vistaFrontal.nombreFoto);
			$("#fechaVistaLateral1").text(data.superficie.vistaFrontal.fecha);
			$("#horaVistaLateral1").text(data.superficie.vistaFrontal.hora);
			$("#vistaLateral2Md").attr("src", data.superficie.vistaFrontal.nombreFoto);
			$("#fechaVistaLateral2").text(data.superficie.vistaFrontal.fecha);
			$("#horaVistaLateral2").text(data.superficie.vistaFrontal.hora);
			/* Datos de la zonificación */
			$("#puntosZonificacion").text(data.zonificacion.puntos);
			var listaCompetencias = data.zonificacion.listaCompetencias;
			var listaGeneradores = data.zonificacion.listaGeneradores;
			/* Datos de la construcción */
			var htmlFactores = "";
			for(var i = 0; i < data.construccion.listaFactores.length; i++) {
				htmlFactores += '<span class="subtituloDetalleMd sangria_cuerpo">' + data.construccion.listaFactores[i].factor + '</span><br/>';
				
				for(var j = 0; j < data.construccion.listaFactores[i].listaSubfactores.length; j++) {
					htmlFactores += '<span class="subtituloDetalleMd sangria_doble_cuerpo">' + data.construccion.listaFactores[i].listaSubfactores[j].subfactor + '</span><br/>';
				}
			}
			$("#factoresConstruccion").html(htmlFactores);
			$("#condicionesGeneralesEstatus").text(data.construccion.condicionesGenerales);
			$("#puntosConstruccion").text(data.construccion.puntos);
			/* Datos de las generalidades del sitio */
			$("#montoRenta").text('$' + formato(data.generalidadesSitio.renta, true) + " al mes");
			$("#disponibilidad").text(data.generalidadesSitio.disponibilidad);
			$("#amortizacion").text('$' + formato(data.generalidadesSitio.amortizacion, true) + " al mes");
			$("#tiempoAmortizacion").text(data.generalidadesSitio.tiempoAmortizacion + " meses");
			$("#periodoGracia").text(data.generalidadesSitio.periodoGracia);
			$("#puntosGeneralidades").text(data.generalidadesSitio.puntos);
			/* Datos de los conteos */
			$("#puntosConteos").text(data.flujoPeatonal.puntos);
			$("#promedioConteos").text(data.flujoPeatonal.promedio);
			var conteo1 = new Array();
			var conteo2 = new Array();
			var conteo3 = new Array();
			var promedio = new Array();
			var fecha1 = "";
			var fecha2 = "";
			var fecha3 = "";
			var suma1 = 0;
			var suma2 = 0;
			var suma3 = 0;
			var categorias = new Array();
			
			for(var i = 0; i < data.flujoPeatonal.listaConteos.length; i++) {
				categorias.indexOf(data.flujoPeatonal.listaConteos[i].horario) === -1 ? categorias.push(data.flujoPeatonal.listaConteos[i].horario) : console.log;
				
				if(data.flujoPeatonal.listaConteos[i].horarioId == PRIMER_HORARIO_CONTEO) {
					conteo1.push(data.flujoPeatonal.listaConteos[i].totalPersonas);
					fecha1 = data.flujoPeatonal.listaConteos[i].fecha;
					suma1 += data.flujoPeatonal.listaConteos[i].totalPersonas;
				} else if(data.flujoPeatonal.listaConteos[i].horarioId == SEGUNDO_HORARIO_CONTEO) {
					conteo2.push(data.flujoPeatonal.listaConteos[i].totalPersonas);
					fecha2 = data.flujoPeatonal.listaConteos[i].fecha
					suma2 += data.flujoPeatonal.listaConteos[i].totalPersonas;
				} else {
					conteo3.push(data.flujoPeatonal.listaConteos[i].totalPersonas);
					fecha3 = data.flujoPeatonal.listaConteos[i].fecha;
					suma3 += data.flujoPeatonal.listaConteos[i].totalPersonas;
				}
			}
			promedio.push(suma1 / conteo1.length);
			promedio.push(suma2 / conteo2.length);
			promedio.push(suma3 / conteo3.length);
			
			setTimeout(function () {
				initMap(data.latitud, data.longitud, listaCompetencias, listaGeneradores);
			}, 500);
			
			
			cargaFlujoPeatonal(categorias, fecha1, conteo1, fecha2, conteo2, fecha3, conteo3, promedio);
		
		}
	}
}

function cargaFlujoPeatonal(categorias, fecha1, conteo1, fecha2, conteo2, fecha3, conteo3, promedio) {
	Highcharts.chart('contenedorFlujoPeatonal', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	        categories: categorias,
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Personas'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="font-size:10px;color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="font-size:10px; padding:0"><b>{point.y:.1f}</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [{
	        name: fecha1,
	        data: conteo1,
	        color: '#FF0000'

	    }, {
	        name: fecha2,
	        data: conteo2

	    }, {
	        name: fecha3,
	        data: conteo3

	    }, {
	        name: 'Promedio',
	        data: promedio

	    }]
	});
}

function autorizaPantalla(modulo) {
	$("#tituloModalAutorizacion").text("¿Estás seguro de autorizar este punto?");
	$("#tipoAutorizacion").val(AUTORIZA_MODULO);
	$("#moduloId").val(modulo);
	$("#mdIdAutorizacion").val($("#mdId").val());
	$("#comboMotivos").hide();
	$("#modal_autorizacion").modal("show");
}

function rechazaPantalla(modulo) {
	$("#tituloModalAutorizacion").text("¿Estás seguro de rechazar este punto?");
	$("#tipoAutorizacion").val(RECHAZA_MODULO);
	$("#moduloId").val(modulo);
	$("#mdIdAutorizacion").val($("#mdId").val());
	$("#comboMotivos").show();
	$("#modal_autorizacion").modal("show");
}

function initMap(latitudSitio, longitudSitio, listaCompetencias, listaGeneradores) {
	var myLatLng = {lat: latitudSitio, lng: longitudSitio};
	
	var iconos = {
			  "sitio": {
				  icon: 'img/iconos_tiendita.png'
			  },
	          "1": {
	            icon: 'img/competencia/iconos_3b.png'
	          },
	          "2": {
	            icon: 'img/competencia/iconos_oxxo.png'
	          },
	          "3": {
	            icon: 'img/competencia/iconos_express.png'
	          },
	          "4": {
		            icon: 'img/competencia/iconos_otros.png'
		      },
		      "9": {
		            icon: 'img/competencia/iconos_k.png'
		      },
	          "10": {
		        icon: 'img/competencia/iconos_seven.png'
		      },
		      "5": {
		            icon: 'img/generadores/iconos_iglesia.png'
		       },
		       "6": {
		            icon: 'img/generadores/iconos_mercado.png'
		       },
		       "7": {
		            icon: 'img/generadores/iconos_escuela.png'
		       },
		       "8": {
			        icon: 'img/generadores/iconos_parada.png'
			   }
	        };
	
	

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      icon: 'img/iconos_tiendita.png',
      map: map,
      title: ''
    });
    
    var puntosZonificacion = new Array();
    
    for(var i = 0; i < listaCompetencias.length; i++) {
    	puntosZonificacion.push(
    			{
    				position: new google.maps.LatLng(listaCompetencias[i].latitud, listaCompetencias[i].longitud),
    				type: listaCompetencias[i].competenciaId
    			});
    }
    
    for(var i = 0; i < listaGeneradores.length; i++) {
    	puntosZonificacion.push(
    			{
    				position: new google.maps.LatLng(listaGeneradores[i].latitud, listaGeneradores[i].longitud),
    				type: listaGeneradores[i].generadorId
    			});
    }
    puntosZonificacion.push(
			{
				position: new google.maps.LatLng(latitudSitio, longitudSitio),
				type: 'sitio'
			});
    
    var mapZonificacion = new google.maps.Map(document.getElementById('mapaZonificacion'), {
        zoom: 10,
        center: myLatLng
      });

    puntosZonificacion.forEach(function(feature) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: iconos[feature.type].icon,
        map: mapZonificacion
      });
    });
   
  }