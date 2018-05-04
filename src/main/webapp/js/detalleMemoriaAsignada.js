var PRIMER_HORARIO_CONTEO	=	1;
var SEGUNDO_HORARIO_CONTEO	=	2;
var TERCER_HORARIO_CONTEO	=	3;

$(function(){
	$('#idasignadas').addClass('resaltado');
	
	$("#nombreMdTxt").text($("#nombreMd").val());
	buscaDetalleMD($("#mdId").val());
	
	var bar = new ProgressBar.Circle(containerProgreso, {
		  strokeWidth: 2,
		  easing: 'easeInOut',
		  duration: 1400,
		  color: '#FF0000',
		  trailColor: '#eee',
		  trailWidth: 1,
		  svgStyle: null
		});
	
	bar.animate(0.375);
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
			$("#puntuacionGeneralidadesSitio").text(data.generalidadesSitio.puntos);
			/* Datos de los conteos */
			$("#puntuacionConteos").text(data.flujoPeatonal.puntos);
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
			
			initMap(data.latitud, data.longitud, listaCompetencias, listaGeneradores);
			
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