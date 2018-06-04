var PRIMER_HORARIO_CONTEO	=	1;
var SEGUNDO_HORARIO_CONTEO	=	2;
var TERCER_HORARIO_CONTEO	=	3;

var AUTORIZA_MODULO			= 1;
var RECHAZA_MODULO			= 0;

var TOTAL_ATENCIONES = 0;
var MOTIVOS_RECHAZO = {};
var FACTORES = {};
var PERMISOS = {};
var ESTATUS_FINALIZA_MD = -1;

$(function(){
	$('#idasignadas').addClass('resaltado');
	
	$("#nombreMdTxt").text($("#nombreMd").val());
	inicializaFactores();
	parseaPermisos();
	buscaDetalleMD($("#mdId").val());
	MOTIVOS_RECHAZO = {};
	
	$('.popover-dismiss').popover({
		  trigger: 'focus'
		});
		
	funcionesAutorizacion();
});

function inicializaFactores(){
	FACTORES[1] = new FactorAutorizacion(1,'Datos del sitio',false);
	FACTORES[2] = new FactorAutorizacion(2,'Datos del propietario',false);
	FACTORES[3] = new FactorAutorizacion(3,'Superficie',false);
	FACTORES[4] = new FactorAutorizacion(4,'Zonificacion',false);
	FACTORES[5] = new FactorAutorizacion(5,'Construccion',false);
	FACTORES[6] = new FactorAutorizacion(6,'Generalidades',false);
	FACTORES[7] = new FactorAutorizacion(7,'Flujo peatonal',false);
}

function validaEstatusAtencion(estatus, idObjetos){
	
	$('#autoriza8').hide();
	$('#rechaza8').hide();
	
	if(PERMISOS[idObjetos] != undefined && PERMISOS[idObjetos].permiteAutorizar == 1){
		
		$('#autoriza' + idObjetos).show();
		$('#rechaza' + idObjetos).show();
		
		$('#autoriza' + idObjetos).removeClass('autorizado');
		$('#rechaza' + idObjetos).removeClass('autorizado');
		$('#autoriza' + idObjetos).addClass('sin_autorizar');
		$('#rechaza' + idObjetos).addClass('sin_autorizar');
		
		if(estatus == 2){// pendiente atencion
			$('#autoriza'  + idObjetos).addClass('sin_autorizar');
			$('#rechaza'  + idObjetos).addClass('sin_autorizar');
		}else if(estatus == 1){ //autorizado
			$('#autoriza' + idObjetos).removeClass('sin_autorizar');
			$('#autoriza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
		}else if(estatus == 0){//rechazado
			$('#rechaza' + idObjetos).removeClass('sin_autorizar');
			$('#rechaza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
		}else if(estatus == 3){//rechazado con motivo definitivo
			$('#rechaza' + idObjetos).removeClass('sin_autorizar');
			$('#rechaza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
			FACTORES[idObjetos].motivoRechazoDefinitivo =  true;
		}else{//desconocido
			$('#autoriza' + idObjetos).addClass('sin_autorizar');
			$('#rechaza' + idObjetos).addClass('sin_autorizar');
		}
	}else{
		$('#autoriza' + idObjetos).hide();
		$('#rechaza' + idObjetos).hide();
	}
}

function dibujaGraficaAutorizaciones(){
	$('#containerProgreso').html('');
	$('#autoriza8').hide();
	$('#rechaza8').hide();
	atendidos = 0;
	
	for(i in FACTORES){
		if(FACTORES[i].atendido)
			atendidos++;
	}
	
	var bar = new ProgressBar.Circle(containerProgreso, {
		  strokeWidth: 4,
		  easing: 'easeInOut',
		  duration: 1400,
		  trailColor: '#eee',
		  color: '#A3D9FF',
		  trailWidth: 2,
		  svgStyle: null
		});
	
	progreso = atendidos/TOTAL_ATENCIONES;
	bar.animate(progreso, {
	    from: {color: '#000000', width: 5},
	    to: {color: "#00FF00", width: 5} });
	
	if(atendidos == TOTAL_ATENCIONES){
		
		motivoDefinitivo = false;
		
		for(i in FACTORES){
			if(FACTORES[i].motivoRechazoDefinitivo){
				motivoDefinitivo = true;
				break;
			}
		}
		
		$('#rechaza8').show();
		if(!motivoDefinitivo)
			$('#autoriza8').show();
		
	}else{

		$('#autoriza8').hide();
		$('#rechaza8').hide();
	}
}

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
	 
		if(data.codigo != 200) {
			cargaMensajeModal('MD ASIGNADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		} else {
			MOTIVOS_RECHAZO = {};
			$("#mdIdAutorizacion").val(mdId);
			ESTATUS_FINALIZA_MD = -1;
			
			/* Datos de áreas que ya han autorizado */
			if(data.areasAutorizadas != undefined && data.areasAutorizadas.length > 0) {
				for(var i = 0; i < data.areasAutorizadas.length; i++) {
					if(data.areasAutorizadas[i].EXPANSION != undefined && data.areasAutorizadas[i].EXPANSION.length > 0 
							&& data.areasAutorizadas[i].EXPANSION[0].puestosValida != undefined && data.areasAutorizadas[i].EXPANSION[0].puestosValida.length > 0) {
						if(data.areasAutorizadas[i].EXPANSION[0].puestosValida[0] == 'GERENTE DE EXPANSION') {
							
							$("#gerenteExpansionDiv").css("cursor", "pointer");
							$("#circuloAutorizaGerenteExpansion").addClass("circuloSeguimientoAprobado");
							var contentPopGerente = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Autorización Gerente de Expansión<br/></span></div>' + 
							   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Autorizó</span></div>' +
							   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha autorización</span></div>' +
							   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">' + data.areasAutorizadas[i].EXPANSION[0].nombre + '</span></div>' +
							   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">' + data.areasAutorizadas[i].EXPANSION[0].fechaAutorizacion + '</span></div>' +
							   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha límite</span></div>' +
							   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Días vencidos</span></div>' + 
							   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">' + data.areasAutorizadas[i].EXPANSION[0].fechaLimite + '</span></div>' +
							   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">' + data.areasAutorizadas[i].EXPANSION[0].diasVencidos + '</span></div></div>';
							
							$("#gerenteExpansionSegPop").popover({
								html: true, 
								content : contentPopGerente
							});
							
							if(data.areasAutorizadas[i].EXPANSION[0].diasVencidos > 0) {
								$("#gerenteExpansionImg").css("display", "inline");
							}
						}
					}
				}
				
			}
			/* Datos generales de la MD */
			if(data.generales != undefined) {
				$("#nombreMd").text(data.generales.nombreMd);
				$("#creadorMd").text(data.generales.creador);
				$("#categoriaMd").text(data.generales.categoria);
				if(data.generales.categoria == 'A') {
					$("#estrellasMd").html("<img class='estrellaPuntuacionDetalle' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacionDetalle' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacionDetalle' src='img/icono_estrella_azul.png'>");
				} else if(data.generales.categoria == 'B') {
					$("#estrellasMd").html("<img class='estrellaPuntuacionDetalle' src='img/icono_estrella_azul.png'><img class='estrellaPuntuacionDetalle' src='img/icono_estrella_azul.png'>");
				} else {
					$("#estrellasMd").html("<img class='estrellaPuntuacionDetalle' src='img/icono_estrella_azul.png'>");
				}
				$("#fechaCreacion").text(data.generales.fechaCreacion);
				$("#puntuacionMd").text(data.generales.puntuacion);
			}
			/* Datos del sitio */
			if(data.datosSitio != undefined) {
				$("#calleMd").text(data.datosSitio.calle);
				$("#coloniaMd").text(data.datosSitio.colonia);
				$("#municipioMd").text(data.datosSitio.municipio);
				$("#ciudadMd").text(data.datosSitio.ciudad);
				$("#estadoMd").text(data.datosSitio.estado);
				$("#codiPostalMd").text(data.datosSitio.codigoPostal);
				/* Datos del propietario */
				$("#propietarioId").text(data.datosPropietario.propietarioId);
				$("#nombrePropietario").text(data.datosPropietario.nombre);
				$("#telefonoPropietario").text(data.datosPropietario.telefono);
				$("#emailPropietario").text(data.datosPropietario.email);
				if(data.datosPropietario.rentaNeto) {
					$("#rentaANeto").text("YA RENTA A NETO");
				} else {
					$("#rentaANeto").text("NO RENTA A NETO AÚN");
				}
				
				validaEstatusAtencion(data.datosSitio.estatus, 1);
				validaEstatusAtencion(data.datosPropietario.estatus, 2);
			}
			/* Datos de la superficie */
			if(data.superficie != undefined) {
				$("#puntosSuperficie").text(data.superficie.puntos);
				$("#frenteMd").text(data.superficie.frente + " mts");
				$("#profundidadMd").text(data.superficie.profundidad + " mts");
				$("#tamanioTotalMd").html(data.superficie.total + " mts<sup>2</sup>");
				$("#vistaFrontalMd").attr("src", data.superficie.vistaFrontal);
				$("#fechaVistaFrontal").text(data.superficie.fechaFrontal);
				$("#horaVistaFrontal").text(data.superficie.horaFrontal);
				$("#vistaLateral1Md").attr("src", data.superficie.lateral1);
				$("#fechaVistaLateral1").text(data.superficie.fechaLateral1);
				$("#horaVistaLateral1").text(data.superficie.horaLateral1);
				$("#vistaLateral2Md").attr("src", data.superficie.lateral2);
				$("#fechaVistaLateral2").text(data.superficie.fechaLateral2);
				$("#horaVistaLateral2").text(data.superficie.horaLateral2);
				
				var contentPopSuperficie = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Ponderación<br/></span></div>' + 
				   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: normal;">Frente mts MIN:</span></div>' +
				   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">' + data.superficie.frente + '</span></div>' +
				   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: normal;">Profundidad mts MIN:</span></div>' +
				   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">' + data.superficie.profundidad + '</span></div>' +
				   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: normal;">Total MIN:</span></div>' +
				   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">' + data.superficie.total + 'mts<sup>2</sup></span></div></div>';
				
				$("#superficieTip").popover({
					html: true, 
					content : contentPopSuperficie
				});
				
				validaEstatusAtencion(data.superficie.estatus, 3);
			}
			/* Datos de la zonificación */
			if(data.zonificacion != undefined) {
				$("#puntosZonificacion").text(data.zonificacion.puntos);
				var listaCompetencias = data.zonificacion.competencias;
				var listaGeneradores = data.zonificacion.generadores;
				
				var contentPopZonificacion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
				if(data.zonificacion.tips != undefined && data.zonificacion.tips.length > 0) {
					contentPopZonificacion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">' + data.zonificacion.tips[0] + '</span></div></div>';
				}
				$("#zonificacionTip").popover({
					html: true, 
					content : contentPopZonificacion
				});
				
				validaEstatusAtencion(data.zonificacion.estatus, 4);

			}
			/* Datos de la construcción */
			if(data.construccion != undefined) {
				var htmlFactores = "";
				var condicionesGeneralesLocal = "";
				if(data.construccion.factores.length > 0) {
					for(var i = 0; i < data.construccion.factores.length; i++) {
						if(data.construccion.factores[i].nivelId == 3) {
							condicionesGeneralesLocal = data.construccion.factores[i].nombreFactor
						} else {
							htmlFactores += '<img style="padding-right: 10px;" src="img/icono_factor.png"/><span class="subtituloDetalleMd sangria_cuerpo">' + data.construccion.factores[i].nombreFactor + '</span><br/>';
							
							if(data.construccion.factores[i].subfactores!=undefined)
								for(var j = 0; j < data.construccion.factores[i].subfactores.length; j++) {
									htmlFactores += '<img class="sangria_cuerpo" src="img/icono_subfactor.png"/><span class="subtituloDetalleMd sangria_cuerpo">' + data.construccion.factores[i].subfactores[j].nombre + '</span><br/>';
								}
						}
					}
					$("#factoresConstruccion").html(htmlFactores);
					$("#condicionesGeneralesEstatus").html('<img style="padding-right: 10px;" src="img/icono_factor.png"/>' + condicionesGeneralesLocal);
					$("#puntosConstruccion").text(data.construccion.puntos);
				} else {
					$("#factoresConstruccion").html('<span class="subtituloDetalleMd sangria_doble_cuerpo" style="color: #FF0000;">Sin resultados</span>');
					$("#condicionesGeneralesEstatus").text('---');
					$("#puntosConstruccion").text("---");
				}
				
				var contentPopConstruccion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
				if(data.construccion.tips != undefined && data.construccion.tips.length > 0) {
					contentPopConstruccion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">' + data.construccion.tips[0] + '</span></div></div>';
				}
				$("#construccionTip").popover({
					html: true, 
					content : contentPopConstruccion
				});
				
				validaEstatusAtencion(data.construccion.estatus, 5);
			}
			/* Datos de las generalidades del sitio */
			if(data.generalidades != undefined) {
				$("#montoRenta").text('$' + formato(data.generalidades.renta, true) + " al mes");
				$("#disponibilidad").text(data.generalidades.disponibilidad);
				$("#amortizacion").text(data.generalidades.periodoAmortizacion);
				$("#tiempoAmortizacion").text(data.generalidades.periodoAmortizacion);
				$("#periodoGracia").text('$' + formato(data.generalidades.periodoGracia, true));
				$("#puntosGeneralidades").text(data.generalidades.puntos);
				
				var contentPopGeneralidades = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
				if(data.generalidades.tips != undefined && data.generalidades.tips.length > 0) {
					contentPopGeneralidades = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">' + data.generalidades.tips[0] + '</span></div></div>';
				}
				$("#generalidadesTip").popover({
					html: true, 
					content : contentPopGeneralidades
				});
				
				validaEstatusAtencion(data.generalidades.estatus, 6);
			}
			/* Datos de los conteos */
			if(data.flujoPeatonal != undefined) {
				$("#puntosConteos").text(data.flujoPeatonal.puntos);
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
				var listaDetalleId = new Array();
				
				for(var i = 0; i < data.flujoPeatonal.conteos.length; i++) {
					
					if(listaDetalleId.length == 0) {
						listaDetalleId.push(data.flujoPeatonal.conteos[i].detalleId);
						categorias.push(data.flujoPeatonal.conteos[i].horaInicio + "-" + data.flujoPeatonal.conteos[i].horaFinal);
					} else if(!listaDetalleId.includes(data.flujoPeatonal.conteos[i].detalleId)) {
						listaDetalleId.push(data.flujoPeatonal.conteos[i].detalleId);
						categorias.push(data.flujoPeatonal.conteos[i].horaInicio + "-" + data.flujoPeatonal.conteos[i].horaFinal);
					}
					
					if(data.flujoPeatonal.conteos[i].detalleId == PRIMER_HORARIO_CONTEO) {
						conteo1.push(data.flujoPeatonal.conteos[i].total);
						fecha1 = data.flujoPeatonal.conteos[i].fecha;
						suma1 += data.flujoPeatonal.conteos[i].total;
					} else if(data.flujoPeatonal.conteos[i].detalleId  == SEGUNDO_HORARIO_CONTEO) {
						conteo2.push(data.flujoPeatonal.conteos[i].total);
						fecha2 = data.flujoPeatonal.conteos[i].fecha
						suma2 += data.flujoPeatonal.conteos[i].total;
					} else {
						conteo3.push(data.flujoPeatonal.conteos[i].total);
						fecha3 = data.flujoPeatonal.conteos[i].fecha;
						suma3 += data.flujoPeatonal.conteos[i].total;
					}
				}
				promedio.push(suma1 / conteo1.length);
				promedio.push(suma2 / conteo2.length);
				promedio.push(suma3 / conteo3.length);
				$("#promedioConteos").text(Math.trunc((suma1 + suma2 + suma3)/(conteo1.length + conteo2.length + conteo3.length)));
				
				var contentPopConteos = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
				if(data.flujoPeatonal.tips != undefined && data.flujoPeatonal.tips.length > 0) {
					contentPopConteos = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">' + data.flujoPeatonal.tips[0] + '</span></div></div>';
				}
				$("#conteosTip").popover({
					html: true, 
					content : contentPopConteos
				});
				
				validaEstatusAtencion(data.flujoPeatonal.estatus, 7);
			}
			
			setTimeout(function () {
				initMap(Number(data.generales.latitud), Number(data.generales.longitud), listaCompetencias, listaGeneradores);
			}, 500);
			
			
			cargaFlujoPeatonal(categorias, fecha1, conteo1, fecha2, conteo2, fecha3, conteo3, promedio);
			dibujaGraficaAutorizaciones();
		}
	}
}

function redireccionaAsignadas() {
	window.history.back();
}

function muestraPopAutorizacion(){
	$("#modal_autorizacion").modal("show");
}

function cargaFlujoPeatonal(categorias, fecha1, conteo1, fecha2, conteo2, fecha3, conteo3, promedio) {
	Highcharts.chart('contenedorFlujoPeatonal', {
	    chart: {
	        type: 'column'
	    },
	    legend: {
            itemStyle: {
               fontSize:'7px',
               font: '7pt Helvetica, sans-serif',
               color: '#00427F'
            },
            itemHoverStyle: {
               color: '#000'
            },
            itemHiddenStyle: {
               color: '#444'
            }
         
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
	        color: '#A8DCD1'
	    }, {
	        name: fecha2,
	        data: conteo2,
	        color: '#40BCD8'
	    }, {
	        name: fecha3,
	        data: conteo3,
	        color: '#A3D9FF'
	    }, {
	        name: 'Promedio',
	        data: promedio,
	        color: '#F1E3F3'
	    }]
	});
}

function autorizaPantalla(modulo, elemento) {
	if($(elemento).hasClass('sin_autorizar')){
		$("#tituloModalAutorizacion").text("¿Estás seguro de autorizar este punto?");
		$("#tipoAutorizacion").val(AUTORIZA_MODULO);
		$("#finaliza").val(0);
		$("#moduloId").val(modulo);
		$("#mdIdAutorizacion").val($("#mdId").val());
		$("#comboMotivos").hide();
		$('#detalleMensajeModal textarea').val('');
		$("#modal_autorizacion").modal("show");
	}
}

function rechazaPantalla(modulo, elemento) {
	if($(elemento).hasClass('sin_autorizar')){
		cargaLoading();
		buscaMotivosRechazo(modulo);
	}
}

function buscaMotivosRechazo(modulo){
	if(MOTIVOS_RECHAZO[modulo] == undefined){ //no se han consultado los motivos de rechazo
		consultaMotivosRechazo(modulo);
	}else{//ya se consultaron los motivos
		cargaComboMotivos(modulo);
	}

}

function cargaComboMotivos(modulo){
	strCombo = '<select id="motivoRechazo" class="motivoRechazo">' + 
				'<option value="0" disabled>SELECCIONA EL MOTIVO DE RECHAZO</option>';
	$.each(MOTIVOS_RECHAZO[modulo], function(){
		strCombo += '<option value="' + this.id + '">' + this.nombre + '</option>' 
	});
	
	strCombo += '</select>';
	
	$("#comboMotivos").html(strCombo);
	$('#motivoRechazo').val(0);
	
	$("#tituloModalAutorizacion").text("¿Estás seguro de rechazar este punto?");
	$("#tipoAutorizacion").val(RECHAZA_MODULO);
	$("#finaliza").val(0);
	$("#moduloId").val(modulo);
	$("#mdIdAutorizacion").val($("#mdId").val());
	$("#comboMotivos").show();
	$('#detalleMensajeModal textarea').val('');
	$("#modal_autorizacion").modal("show");
}

function finalizaMD(estatus){
	ESTATUS_FINALIZA_MD = estatus;
	if(estatus == 1){
		cargaMensajeModal('MD ASIGNADAS', 
				'¿Est\u00e1s seguro de autorizar la MD?',
				TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
	}else if(estatus == 0){
		cargaMensajeModal('MD ASIGNADAS', 
				'¿Est\u00e1s seguro de rechazar la MD?',
				TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
	}
}

function actionfinalizaMD(){
	cargaLoading();
	
	invocarJSONServiceAction("autorizaMd", 
			{'modulo':0,
			 'md': $("#mdIdAutorizacion").val(),
			 'validacion': ESTATUS_FINALIZA_MD,
			 'motivo': 0,
			 'finaliza' : 1,
			 'comentario': ' '
			 }, 
			'responseFinalizacion', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});
	
	responseFinalizacion = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('MD ASIGNADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		}else{
			if(ESTATUS_FINALIZA_MD == 1)
				cargaMensajeModal('MD ASIGNADAS', 'Autorizaci\u00f3n exitosa', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, redireccionaAsignadas);
			else if(ESTATUS_FINALIZA_MD == 0)
				cargaMensajeModal('MD ASIGNADAS', 'Rechazo exitoso', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, redireccionaAsignadas);
		}
	}
}

function funcionesAutorizacion(){
	$("#btnModalAutorizacion").click(function() {
		
		if($("#tipoAutorizacion").val() == AUTORIZA_MODULO){
			if($('#detalleMensajeModal textarea').val() == '')
				$('#detalleMensajeModal textarea').val(' ');
				
			autoriza();
		}else if($("#tipoAutorizacion").val() == RECHAZA_MODULO){
			mensaje = '';
			if($('#detalleMensajeModal textarea').val() == '')
				mensaje += 'Porfavor escriba el motivo de rechazo';
			if($('#motivoRechazo option:selected').val() == 0){
				if(mensaje == '')
					mensaje += 'Por favor selecciona el motivo de rechazo';
				else
					mensaje = 'Porfavor escriba y seleccione el motivo de rechazo';
			}
			
			if(mensaje == '')
				autoriza();
			else{
				$("#modal_autorizacion").modal("hide");
				cargaMensajeModal('MD ASIGNADAS', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, muestraPopAutorizacion);
			}
		}
		
	});	
}

function autoriza(){
	$("#modal_autorizacion").modal("hide");
	
	cargaLoading();
	
	invocarJSONServiceAction("autorizaMd", 
			{'modulo': $("#moduloId").val(),
			 'md': $("#mdIdAutorizacion").val(),
			 'validacion':$("#tipoAutorizacion").val(),
			 'motivo': $('#motivoRechazo').val(),
			 'finaliza' : $("#finaliza").val(),
			 'comentario': $('#detalleMensajeModal textarea').val()
			 }, 
			'responseAutorizacion', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});
}

function responseAutorizacion(data){
	if(data.codigo != 200){
		cargaMensajeModal('MD ASIGNADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
	}else{
		
		moduloEjecutado = $("#moduloId").val();
		
		if($("#tipoAutorizacion").val() == AUTORIZA_MODULO){
			$('#autoriza' + moduloEjecutado).removeClass('sin_autorizar');
			$('#autoriza' + moduloEjecutado).addClass('autorizado');
			
			$('#rechaza' + moduloEjecutado).removeClass('autorizado');
			$('#rechaza' + moduloEjecutado).addClass('sin_autorizar');
			FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
		}else if($("#tipoAutorizacion").val() == RECHAZA_MODULO){
			$('#rechaza' + moduloEjecutado).removeClass('sin_autorizar');
			$('#rechaza' + moduloEjecutado).addClass('autorizado');
			
			$('#autoriza' + moduloEjecutado).removeClass('autorizado');
			$('#autoriza' + moduloEjecutado).addClass('sin_autorizar');
			
			if(MOTIVOS_RECHAZO[moduloEjecutado][$('#motivoRechazo').val()].isDefinitivo)
				FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  true;
			else
				FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
		}else{
			$('#autoriza' + moduloEjecutado).removeClass('autorizado');
			$('#rechaza' + moduloEjecutado).removeClass('autorizado');
			$('#autoriza' + moduloEjecutado).addClass('sin_autorizar');
			$('#rechaza' + moduloEjecutado).addClass('sin_autorizar');
			FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
		}
		
		
		FACTORES[moduloEjecutado].atendido = true;
		dibujaGraficaAutorizaciones();
	}
}

function consultaMotivosRechazo(modulo){
	invocarJSONServiceAction("motivosRechazo", 
			{'modulo': modulo,
			'tipoModulo': 2}, 
			'almacenaMotivosRechazo', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});

	almacenaMotivosRechazo = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('MD ASIGNADAS', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		}else{
			if(data.motivos != undefined){
				motivos = {};
				$.each(data.motivos, function(){
					if(motivos[this.motivoId] == undefined){
						motivos[this.motivoId] = new MotivoRechazo(this.motivoId, this.descripcion, this.rechazoDefinitvo == 1)
					}
				});
				
				MOTIVOS_RECHAZO[modulo] = motivos;
				
				cargaComboMotivos(modulo);
			}
		}
	}
}

function parseaPermisos(){
	PERMISOS = {};
	$('.permisos_detalleMd').each(function(){
		a = JSON.parse($(this).val().replaceAll("'",'"'));
		
		if(PERMISOS[a.FIMODULOID] == undefined){
			PERMISOS[a.FIMODULOID] = new Permiso(
					a.BLOQUEASEGUIMIENTO,
					a.FIESTATUS,
					a.FIMODULOID,
					a.FISUBMODULO,
					a.PERMITEEDITAR,
					a.PERMITECOMENTAR,
					a.PERMITERECHAZAR,
					a.PERMITEAUTORIZAR
			);
			
			if(a.PERMITEAUTORIZAR == 1)
				TOTAL_ATENCIONES++;
		}
	});
}

Permiso = function(
		bloqueaSeguimiento,
		estatus,
		modulo,
		submodulo,
		permiteEditar,
		permiteComentar,
		permiteRechazar,
		permiteAutorizar){
	
	this.bloqueaSeguimiento = bloqueaSeguimiento;
	this.estatu = estatus;
	this.modulo = modulo;
	this.submodulo = submodulo;
	this.permiteEditar = permiteEditar;
	this.permiteComentar = permiteComentar;
	this.permiteRechazar = permiteRechazar;
	this.permiteAutorizar = permiteAutorizar;
}

FactorAutorizacion = function(id, nombre, atendido){
	this.id = id;
	this.nombre = nombre;
	this.atendido = atendido;
	this.motivoRechazoDefinitivo;
};

MotivoRechazo = function(id, nombre, isDefinitivo){
	this.id = id;
	this.nombre = nombre;
	this.isDefinitivo = isDefinitivo;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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