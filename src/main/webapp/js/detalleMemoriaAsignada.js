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

var TIPOMD = -1;
Dropzone.autoDiscover = false;
var LAYOUT_B64 = '';
var LAYOUT_Type = '';
var uploader;
var dropzoneLayouts;
var dropzoneOptions;
var ARCHIVO_SUBIDO = false;
var ARCHIVOS_MD;

var areaConstruccion = 3;
var areaOperaciones = 5;
var areaAuditoria = 4;

var AREA_USUARIO;

var ESTATUS_MD;

var ESTATUS_VALIDACION_LAYOUT = 9;
var ESTATUS_PRESUPUESTO_CONSTRUCCION = 10;
var ESTATUS_PRESUPUESTO_AUDITORIA = 11;
var ESTATUS_VOBO_FINAL = 12;
var ESTATUS_CORRECCION_LAYOUT = 18;
var ESTATUS_CORRECCION_PRESUPUESTO_CONSTRUCCION = 19;
var ESTATUS_CORRECCION_PRESUPUESTO_AUDITORIA = 20;

$(function(){
	TIPOMD = parseInt($("#tipoMd").val());
	AREA_USUARIO = parseInt($('#areaUsuario').val());
	
	if(TIPOMD == 0){
		$('#idasignadas').addClass('resaltado');
		$('#titulo_tipo').text('EN PROCESO');
	}else if(TIPOMD == 1){
		$('#idautorizadas').addClass('resaltado');
		$('#titulo_tipo').text('AUTORIZADAS');
	}else if(TIPOMD == 2){
		$('#idrechazadas').addClass('resaltado');
		$('#titulo_tipo').text('RECHAZADAS');
	}else if(TIPOMD == 3){
		$('#idaprobadas').addClass('resaltado');
		$('#titulo_tipo').text('APROBADAS');
	}else if(TIPOMD == 5){
		$('#idtablero').addClass('resaltado');
		$('#titulo_tipo').text('TABLERO');
	}
	
	
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
	
	if(TIPOMD > 2){
		$('#autoriza' + idObjetos).hide();
		$('#rechaza' + idObjetos).hide();
		return;
	}
	
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
			FACTORES[idObjetos].motivo = 0;
		}else if(estatus == 1){ //autorizado
			$('#autoriza' + idObjetos).removeClass('sin_autorizar');
			$('#autoriza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
			FACTORES[idObjetos].motivo = -1;
		}else if(estatus == 0){//rechazado
			$('#rechaza' + idObjetos).removeClass('sin_autorizar');
			$('#rechaza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
			FACTORES[idObjetos].motivo = 1;
		}else if(estatus == 3){//rechazado con motivo definitivo
			$('#rechaza' + idObjetos).removeClass('sin_autorizar');
			$('#rechaza' + idObjetos).addClass('autorizado');
			FACTORES[idObjetos].atendido = true;
			FACTORES[idObjetos].motivoRechazoDefinitivo =  true;
			FACTORES[idObjetos].motivo = 1;
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
	
	if(TIPOMD != 3)
		progreso = atendidos/TOTAL_ATENCIONES;
	else
		progreso = 1;
	
	bar.set(progreso, {
	    from: {color: '#000000', width: 5},
	    to: {color: "#00FF00", width: 5} });
	
	if(atendidos == TOTAL_ATENCIONES && TOTAL_ATENCIONES > 0){
		
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
		
		if(TIPOMD == 1){
			$('#autoriza8').removeClass('sin_autorizar');
			$('#autoriza8').addClass('autorizado');
		}else if(TIPOMD == 2){
			$('#rechaza8').removeClass('sin_autorizar');
			$('#rechaza8').addClass('autorizado');
		}
	}else{
		$('#autoriza8').hide();
		$('#rechaza8').hide();
	}
}

function generaPopAutorizacion(titulo, datos){
	texto = '';
	dias = parseInt(datos.diasVencidos);
	if(dias < 0)
		texto = 'A ' + (dias * -1) + ' días de vencer';
	else if(dias == 0)
		texto = 'En tiempo';
	else if(dias > 0)
		texto = dias + ' días después';
	var popAutorizacion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">' + titulo + '<br/></span></div>' + 
	   '<div style="width: 60%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Autorizó</span></div>' +
	   '<div style="width: 40%; position: relative; float: left; margin-top: 10px;"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha autorización</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">' + datos.nombre + '</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">' + datos.fechaAutorizacion + '</span></div>' +
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Fecha límite</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 12px;font-weight: bold;">Días vencidos</span></div>' + 
	   '<div style="width: 60%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">' + datos.fechaLimite + '</span></div>' +
	   '<div style="width: 40%; position: relative; float: left"><span style="color: #FFF;font-size: 10px;">' + texto + '</span></div></div>';
	
	return popAutorizacion;
}

function dibujaAreasCompletadas(AREAS){
	for(var i = 0; i < AREAS.length; i++) {
		if(AREAS[i].EXPANSION != undefined && 
				AREAS[i].EXPANSION.length > 0 && 
				AREAS[i].EXPANSION[0].puestosValida != undefined && 
				AREAS[i].EXPANSION[0].puestosValida.length > 0) {
			
			if(AREAS[i].EXPANSION[0].puestosValida[0] == 'GERENTE DE EXPANSION') {
				
				$("#gerenteExpansionDiv").css("cursor", "pointer");
				$("#circuloAutorizaGerenteExpansion").addClass("circuloSeguimientoAprobado");
				
				var contentPopGerente = generaPopAutorizacion('Autorización Gerente de Expansión', AREAS[i].EXPANSION[0]);
				
				$("#gerenteExpansionSegPop").popover({
					html: true, 
					content : contentPopGerente
				});
				
				if(AREAS[i].EXPANSION[0].diasVencidos > 0) {
					$("#gerenteExpansionImg").css("display", "inline");
				}
			}else if(AREAS[i].EXPANSION[0].puestosValida[0] == 'ANALISTA DE EXPANSION') {
				
				$("#expansionDiv").css("cursor", "pointer");
				$("#circuloAutorizaExpansion").addClass("circuloSeguimientoAprobado");
				
				var contentPopExpansion = generaPopAutorizacion('Autorización de Expansión', AREAS[i].EXPANSION[0]);
				
				$("#expansionSegPop").popover({
					html: true, 
					content : contentPopExpansion
				});
				
				if(AREAS[i].EXPANSION[0].diasVencidos > 0) {
					$("#expansionImg").css("display", "inline");
				}
			}
		}else if(AREAS[i].GESTORIA != undefined && 
				AREAS[i].GESTORIA.length > 0) {
			
				
			$("#gestoriaDiv").css("cursor", "pointer");
			$("#circuloAutorizaGestoria").addClass("circuloSeguimientoAprobado");
				
			var contentPopGestoria = generaPopAutorizacion('Autorización Gestoría', AREAS[i].GESTORIA[0]);
				
			$("#gestoriaSegPop").popover({
				html: true, 
				content : contentPopGestoria
			});
				
			if(AREAS[i].GESTORIA[0].diasVencidos > 0) {
				$("#gestoriaImg").css("display", "inline");
			}
			
		}else if(AREAS[i].CONSTRUCCION != undefined && 
				AREAS[i].CONSTRUCCION.length > 0) {
			
				
			$("#construccionDiv").css("cursor", "pointer");
			$("#circuloAutorizaConstruccion").addClass("circuloSeguimientoAprobado");
				
			var contentPopConstruccion = generaPopAutorizacion('Autorización Construcción', AREAS[i].CONSTRUCCION[0]);
				
			$("#construccionSegPop").popover({
				html: true, 
				content : contentPopConstruccion
			});
				
			if(AREAS[i].CONSTRUCCION[0].diasVencidos > 0) {
				$("#construccionImg").css("display", "inline");
			}
			
		}else if(AREAS[i].OPERACIONES != undefined && 
				AREAS[i].OPERACIONES.length > 0) {
			
				
			$("#operacionesDiv").css("cursor", "pointer");
			$("#circuloAutorizaOperaciones").addClass("circuloSeguimientoAprobado");
				
			var contentPopOperaciones = generaPopAutorizacion('Autorización Operaciones', AREAS[i].OPERACIONES[0]);
				
			$("#operacionesSegPop").popover({
				html: true, 
				content : contentPopOperaciones
			});
				
			if(AREAS[i].OPERACIONES[0].diasVencidos > 0) {
				$("#operacionesImg").css("display", "inline");
			}
			
		}else if(AREAS[i].AUDITORIA != undefined && 
				AREAS[i].AUDITORIA.length > 0) {
			$("#auditoriaDiv").css("cursor", "pointer");
			$("#circuloAutorizaAuditoria").addClass("circuloSeguimientoAprobado");
				
			var contentPopAuditoria = generaPopAutorizacion('Autorización Auditoria', AREAS[i].AUDITORIA[0]);
				
			$("#auditoriaSegPop").popover({
				html: true, 
				content : contentPopAuditoria
			});
				
			if(AREAS[i].AUDITORIA[0].diasVencidos > 0) {
				$("#auditoriaImg").css("display", "inline");
			}
		}
		
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
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		} else {
			MOTIVOS_RECHAZO = {};
			ARCHIVOS_MD = new Array();
			
			$("#mdIdAutorizacion").val(mdId);
			ESTATUS_FINALIZA_MD = -1;
			
			/* Datos de áreas que ya han autorizado */
			if(data.areasAutorizadas != undefined && data.areasAutorizadas.length > 0) {
				dibujaAreasCompletadas(data.areasAutorizadas)
			}
			
			/* Datos generales de la MD */
			if(data.generales != undefined) {
				$("#nombreMd").text(data.generales.nombreMd);
				$("#creadorMd").text(data.generales.creador);
				$("#categoriaMd").text(data.generales.categoria);
				estrella = "<img class='estrellaPuntuacionDetalle' src='img/estrella.png'>";
				if(data.generales.categoria == 'A') {
					$("#estrellasMd").html(estrella + estrella + estrella);
				} else if(data.generales.categoria == 'B') {
					$("#estrellasMd").html(estrella + estrella);
				} else {
					$("#estrellasMd").html(estrella);
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
				$("#frenteMd").text(formatear(data.superficie.frente, true) + " mts");
				$("#profundidadMd").text(formatear(data.superficie.profundidad, true) + " mts");
				$("#tamanioTotalMd").html(formatear(data.superficie.total, true) + " mts<sup>2</sup>");
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
			if(data.construccion != undefined && data.construccion.factores.EXPANSION != undefined) {
				var htmlFactores = "";
				var condicionesGeneralesLocal = "";
				if(data.construccion.factores.EXPANSION.length > 0) {
					for(var i = 0; i < data.construccion.factores.EXPANSION.length; i++) {
						if(data.construccion.factores.EXPANSION[i].nivelId > 2 
								&& data.construccion.factores.EXPANSION[i].nivelId < 6) {
							condicionesGeneralesLocal = data.construccion.factores.EXPANSION[i].nombreFactor
						} else {
							htmlFactores += '<img style="padding-right: 10px;" src="img/icono_factor.png"/><span class="subtituloDetalleMd sangria_cuerpo">' + data.construccion.factores.EXPANSION[i].nombreFactor + '</span><br/>';
							
							if(data.construccion.factores.EXPANSION[i].subfactores!=undefined)
								for(var j = 0; j < data.construccion.factores.EXPANSION[i].subfactores.length; j++) {
									htmlFactores += '<img class="sangria_cuerpo" src="img/icono_subfactor.png"/><span class="subtituloDetalleMd sangria_cuerpo">' + data.construccion.factores.EXPANSION[i].subfactores[j].nombre + '</span><br/>';
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
				$("#montoRenta").text('$' + formatear(data.generalidades.renta, true) + " al mes");
				$("#disponibilidad").text(data.generalidades.disponibilidad);
				$("#amortizacion").text(data.generalidades.porcentajeAmortizacion);
				$("#tiempoAmortizacion").text(data.generalidades.periodoAmortizacion);
				$("#periodoGracia").text(data.generalidades.periodoGracia);
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
				datosFlujoPeatonal(data.flujoPeatonal);
			}
			
			setTimeout(function () {
				initMap(Number(data.generales.latitud), Number(data.generales.longitud), listaCompetencias, listaGeneradores);
			}, 500);
			
			
			
			dibujaGraficaAutorizaciones();
			
			/* DATOS Seguimiento */
			ESTATUS_MD = parseInt(data.nivelEstatusMdId);
			
			if(data.seguimiento != undefined) {
				if(data.seguimiento.PRECONSTRUCCION != undefined
						&& data.seguimiento.PRECONSTRUCCION != null){
					
					ARCHIVOS_MD =  new Array();
					$.each(data.seguimiento.PRECONSTRUCCION, function(i,item){
						
						
						ARCHIVOS_MD.push(new Archivo(
	        					item.nombreArchivo,
	        					item.urllayout,
	        					item.validacion,
	        					$('#nombreCompletoUsuario').val(),
	        					$('#nombreAreaUsuario').val(),
	        					null, null));
					});
				}
			}
			
			if((ESTATUS_MD == ESTATUS_PRESUPUESTO_CONSTRUCCION || ESTATUS_MD == ESTATUS_CORRECCION_PRESUPUESTO_CONSTRUCCION)
					&& TIPOMD == 3 && AREA_USUARIO == areaConstruccion){
				ARCHIVOS_MD =  new Array();
				if(data.seguimiento != undefined) {
					if(eval(data)["seguimiento"]["PRESUPUESTO OBRA"] != undefined
							&& eval(data)["seguimiento"]["PRESUPUESTO OBRA"] != null){
						
						$.each(eval(data)["seguimiento"]["PRESUPUESTO OBRA"], function(i,item){
							
							ARCHIVOS_MD.push(new Archivo(
		        					item.nombreArchivo,
		        					item.urldoctoc,
		        					item.validacion,
		        					$('#nombreCompletoUsuario').val(),
		        					$('#nombreAreaUsuario').val(),
		        					null,null,
		        					item.monto));
						});
					}
				}
			}else if((ESTATUS_MD == ESTATUS_PRESUPUESTO_AUDITORIA || ESTATUS_MD == ESTATUS_CORRECCION_PRESUPUESTO_AUDITORIA)
					&& TIPOMD == 3 && AREA_USUARIO == areaAuditoria){
				ARCHIVOS_MD =  new Array();
				if(data.seguimiento != undefined) {
					if(eval(data)["seguimiento"]["PRESUPUESTO OBRA"] != undefined
							&& eval(data)["seguimiento"]["PRESUPUESTO OBRA"] != null){
						
						$.each(eval(data)["seguimiento"]["PRESUPUESTO OBRA"], function(i,item){
							ARCHIVOS_MD.push(new Archivo(
		        					item.nombreArchivo,
		        					item.urldoctoc,
		        					item.validacion,
		        					$('#nombreCompletoUsuario').val(),
		        					$('#nombreAreaUsuario').val(),
		        					null,null,
		        					item.monto));
						});
					}
					
					if(eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"] != undefined
							&& eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"] != null){
						
						$.each(eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"], function(i,item){
							nombres = item.urllayout.split('/');
							name = nombres[nombres.length -1];
							
							ARCHIVOS_MD.push(new Archivo(
		        					name,
		        					item.urllayout,
		        					2,
		        					$('#nombreCompletoUsuario').val(),
		        					$('#nombreAreaUsuario').val(),
		        					null, null));
						});
						ARCHIVOS_MD[ARCHIVOS_MD.length -1].estatus = 0;
					}
				}
			}else if(ESTATUS_MD == ESTATUS_VOBO_FINAL
					&& TIPOMD == 3){
				ARCHIVOS_MD =  new Array();
				if(data.seguimiento != undefined) {
					if(data.seguimiento.PRECONSTRUCCION != undefined
							&& data.seguimiento.PRECONSTRUCCION != null){
						
						$.each(data.seguimiento.PRECONSTRUCCION, function(i,item){
							
							
							ARCHIVOS_MD.push(new Archivo(
		        					item.nombreArchivo,
		        					item.urllayout,
		        					item.validacion,
		        					$('#nombreCompletoUsuario').val(),
		        					$('#nombreAreaUsuario').val(),
		        					null, null));
						});
					}
					
					if(eval(data)["seguimiento"]["PRESUPUESTO OBRA"] != undefined
							&& eval(data)["seguimiento"]["PRESUPUESTO OBRA"] != null){
						
						$.each(eval(data)["seguimiento"]["PRESUPUESTO OBRA"], function(i,item){
							ARCHIVOS_MD.push(new Archivo(
		        					item.nombreArchivo,
		        					item.urldoctoc,
		        					item.validacion,
		        					$('#nombreCompletoUsuario').val(),
		        					$('#nombreAreaUsuario').val(),
		        					null,null,
		        					item.monto));
						});
					}
					
					if(eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"] != undefined
							&& eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"] != null){
						
						$.each(eval(data)["seguimiento"]["PRESUPUESTO AUDITORIA"], function(i,item){
							nombres = item.urllayout.split('/');
							name = nombres[nombres.length -1];
							
							ARCHIVOS_MD.push(new Archivo(
		        					name,
		        					item.urllayout,
		        					2,
		        					$('#nombreCompletoUsuario').val(),
		        					$('#nombreAreaUsuario').val(),
		        					null, null));
						});
						ARCHIVOS_MD[ARCHIVOS_MD.length -1].estatus = 0;
					}
				}
			}
			
			inicializaDropzone();
		}
	}
}

Object.size = function(obj) {
    var size = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function datosFlujoPeatonal(flujoPeatonal){
	var rows = [[null]];
	var colores = [];
	var coloresPredeterminados = ['#40bcd8','#a8ddd1','#a3daff','#a3ffcc'];
	var colorPromedio = '#d8b4e0';
	var horarios= {};
	var sumatoriaConteos = 0;
	var totalconteos = 0;
	var promedio;

	if(flujoPeatonal.EXPANSION != undefined){
	
		$("#puntosConteos").text(flujoPeatonal.EXPANSION.puntos);
	
		var contentPopConteos = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
		if(flujoPeatonal.EXPANSION.tips != undefined && flujoPeatonal.EXPANSION.tips.length > 0) {
			contentPopConteos = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 17px;">' + flujoPeatonal.EXPANSION.tips[0] + '</span></div></div>';
		}
		$("#conteosTip").popover({
			html: true, 
			content : contentPopConteos
		});
		
		validaEstatusAtencion(flujoPeatonal.EXPANSION.estatus, 7);
		
		
	
		for(var i = 0; i < flujoPeatonal.EXPANSION.conteos.length; i++) {
			id = flujoPeatonal.EXPANSION.conteos[i].detalleId;
			if(horarios[id] == undefined){
				horarios[id] = new Array();
				horarios[id].push(flujoPeatonal.EXPANSION.conteos[i].horaInicio 
						+ "-" + flujoPeatonal.EXPANSION.conteos[i].horaFinal);
			}
			horarios[id].push(flujoPeatonal.EXPANSION.conteos[i].total);
			sumatoriaConteos += flujoPeatonal.EXPANSION.conteos[i].total;
			totalconteos++;
		}
	}
	
	if(Object.size(horarios) > 0){
		i = 0;
		for(h in horarios){
			rows.push(horarios[h])
			colores.push(coloresPredeterminados[i])
			i++;
		}
		
		promedio = Math.trunc(sumatoriaConteos/totalconteos);
		rows.push(['Promedio', promedio]);
		colores.push(colorPromedio);
		$("#promedioConteos").text(promedio);
		
		cargaFlujoPeatonal(colores,rows);
	}
}

function redireccionaAsignadas() {
	window.history.back();
}

function muestraPopAutorizacion(){
	$("#modal_autorizacion").modal("show");
}

function cargaFlujoPeatonal(colores,rows) {
	Highcharts.chart('contenedorFlujoPeatonal', {
	    chart: {
	        type: 'column',
	        backgroundColor: '#071B36',
	    },
	    legend:false,
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Personas'
	        }
	    },
	    xAxis: {
	        title: {
	            text: 'Conteos'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:12px"></span><table>',
	        pointFormat: '<tr><td style="font-size:10px;color:{series.color};padding:0"></td>' +
	            '<td style="font-size:10px; padding:0"><b>{point.y}</b></td></tr>',
	        footerFormat: '</table>',
	        shared: false,
	        valueDecimals: 0,
	        useHTML: true
	    },
	    colors: colores,
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0.5
	        },series: {
	            colorByPoint: true
	        }
	    },
	    data: {
	    	rows: rows
	    }
	});
}

function autorizaPantalla(modulo, elemento) {
	if($(elemento).hasClass('sin_autorizar') && TIPOMD == 0){
		$("#tituloModalAutorizacion").text("¿Estás seguro de autorizar " + FACTORES[modulo].nombre + "?");
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
	if($(elemento).hasClass('sin_autorizar') && TIPOMD == 0){
		cargaLoading();
		buscaMotivosRechazo(modulo);
	}
}

function buscaMotivosRechazo(modulo){
	if(MOTIVOS_RECHAZO[modulo] == undefined){ //no se han consultado los motivos de rechazo
		consultaMotivosRechazo(modulo,2);
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
	if(modulo == 0)
		$("#tituloModalAutorizacion").text("¿Estás seguro de rechazar la MD?");
	else
		$("#tituloModalAutorizacion").text("¿Estás seguro de rechazar " + FACTORES[modulo].nombre + "?");
	$("#tipoAutorizacion").val(RECHAZA_MODULO);
	$("#finaliza").val(0);
	$("#moduloId").val(modulo);
	$("#mdIdAutorizacion").val($("#mdId").val());
	$("#comboMotivos").show();
	$('#detalleMensajeModal textarea').val('');
	$("#modal_autorizacion").modal("show");
}

function finalizaMD(estatus){
	if(TIPOMD == 0){
		ESTATUS_FINALIZA_MD = estatus;
		permiteAutorizacion = true;
		if(AREA_USUARIO == areaConstruccion && !ARCHIVO_SUBIDO){
			permiteAutorizacion = false;
			cargaMensajeModal('DETALLE MD', 
					'Debes adjuntar el archivo de layout antes de autorizar',
					TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA);
		}
		
		if(estatus == 1 && permiteAutorizacion){
			
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de autorizar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
		}else if(estatus == 0 && permiteAutorizacion){
			
			var conRechazo = false;
			for(i in FACTORES){
				if(FACTORES[i].motivo != -1){
					conRechazo = true;
					break;
				}
			}
			
			if(conRechazo){
				cargaMensajeModal('DETALLE MD', 
						'¿Est\u00e1s seguro de rechazar la MD?',
						TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, consultaMotivosRechazo);
			}else{
				consultaMotivosRechazo(0, 1);
			}
		}
	}else if(TIPOMD == 3 && AREA_USUARIO == areaOperaciones){
		ESTATUS_FINALIZA_MD = estatus;
		if(estatus == 1){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de autorizar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, actionfinalizaMD);
		}else if(estatus == 0){
			cargaMensajeModal('DETALLE MD', 
					'¿Est\u00e1s seguro de rechazar la MD?',
					TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_ALERTA, consultaMotivosRechazo);
		}
	}
}

function actionfinalizaMD(motivo, comment){
	cargaLoading();
	
	if(motivo == undefined)
		motivo = 0;
	if(comment == undefined)
		comment = '';
	
	invocarJSONServiceAction("autorizaMd", 
			{'modulo':0,
			 'md': $("#mdIdAutorizacion").val(),
			 'validacion': ESTATUS_FINALIZA_MD,
			 'motivo': motivo,
			 'finaliza' : 1,
			 'comentario': comment
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
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		}else{
			if(ESTATUS_FINALIZA_MD == 1)
				cargaMensajeModal('DETALLE MD', 'Autorizaci\u00f3n exitosa', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, redireccionaAsignadas);
			else if(ESTATUS_FINALIZA_MD == 0)
				cargaMensajeModal('DETALLE MD', 'Rechazo exitoso', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, redireccionaAsignadas);
		}
	}
}

function funcionesAutorizacion(){
	$("#btnModalAutorizacion").click(function() {
		var motivoSeleccionado = 0;
		if($("#tipoAutorizacion").val() == AUTORIZA_MODULO){
			if($('#detalleMensajeModal textarea').val() == '')
				$('#detalleMensajeModal textarea').val(' ');
			motivoSeleccionado = 0;
			autoriza(motivoSeleccionado);
		}else if($("#tipoAutorizacion").val() == RECHAZA_MODULO){
			mensaje = '';
			if($('#detalleMensajeModal textarea').val() == '')
				mensaje += 'Porfavor escriba el motivo de rechazo';
			if($('#motivoRechazo option:selected').val() == 0){
				if(mensaje == '')
					mensaje += 'Por favor selecciona el motivo de rechazo';
				else
					mensaje = 'Porfavor escriba y seleccione el motivo de rechazo';
			}else
				motivoSeleccionado = $('#motivoRechazo option:selected').val();
			
			if(mensaje == '')
				autoriza(motivoSeleccionado);
			else{
				$("#modal_autorizacion").modal("hide");
				cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, muestraPopAutorizacion);
			}
		}
		
	});	
}

function autoriza(motivoSeleccionado){
	$("#modal_autorizacion").modal("hide");
	
	modulo = $("#moduloId").val();
	cargaLoading();
	if(modulo != 0){
		invocarJSONServiceAction("autorizaMd", 
				{'modulo': modulo,
				 'md': $("#mdIdAutorizacion").val(),
				 'validacion':$("#tipoAutorizacion").val(),
				 'motivo': motivoSeleccionado,
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
	}else{
		actionfinalizaMD(motivoSeleccionado, $('#detalleMensajeModal textarea').val())
	}
}

function responseAutorizacion(data){
	if(data.codigo != 200){
		cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
	}else{
		
		moduloEjecutado = $("#moduloId").val();
		
		if($("#tipoAutorizacion").val() == AUTORIZA_MODULO){
			$('#autoriza' + moduloEjecutado).removeClass('sin_autorizar');
			$('#autoriza' + moduloEjecutado).addClass('autorizado');
			
			$('#rechaza' + moduloEjecutado).removeClass('autorizado');
			$('#rechaza' + moduloEjecutado).addClass('sin_autorizar');
			FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
			FACTORES[moduloEjecutado].motivo = -1;
		}else if($("#tipoAutorizacion").val() == RECHAZA_MODULO){
			$('#rechaza' + moduloEjecutado).removeClass('sin_autorizar');
			$('#rechaza' + moduloEjecutado).addClass('autorizado');
			
			$('#autoriza' + moduloEjecutado).removeClass('autorizado');
			$('#autoriza' + moduloEjecutado).addClass('sin_autorizar');
			
			if(MOTIVOS_RECHAZO[moduloEjecutado][$('#motivoRechazo').val()].isDefinitivo){
				FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  true;
				FACTORES[moduloEjecutado].motivo = $('#motivoRechazo').val();
			}else{
				FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
				FACTORES[moduloEjecutado].motivo = $('#motivoRechazo').val();
			}
		}else{
			$('#autoriza' + moduloEjecutado).removeClass('autorizado');
			$('#rechaza' + moduloEjecutado).removeClass('autorizado');
			$('#autoriza' + moduloEjecutado).addClass('sin_autorizar');
			$('#rechaza' + moduloEjecutado).addClass('sin_autorizar');
			FACTORES[moduloEjecutado].motivoRechazoDefinitivo =  false;
			FACTORES[moduloEjecutado].motivo = 1;
		}
		
		
		FACTORES[moduloEjecutado].atendido = true;
		dibujaGraficaAutorizaciones();
	}
}

function consultaMotivosRechazo(modulo, tipo){
	if(modulo == undefined)
		modulo = 0;
	if(tipo == undefined)
		tipo = 1;
	
	invocarJSONServiceAction("motivosRechazo", 
			{'modulo': modulo,
			'tipoModulo': tipo}, 
			'almacenaMotivosRechazo', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});

	almacenaMotivosRechazo = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
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
		
		rel = $(this).attr('rel');
		
		if(rel == 8){//Modulo para detalle de la MD
			a = JSON.parse($(this).val().replaceAll("'",'"'));
			
			if(PERMISOS[a.FISUBMODULO] == undefined){
				PERMISOS[a.FISUBMODULO] = new Permiso(
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
		}
		
	});
}

function inicializaDropzone(){

	if(TIPOMD == 0 && AREA_USUARIO == areaConstruccion && (ESTATUS_MD < 9 || ESTATUS_MD == ESTATUS_CORRECCION_LAYOUT)){
		$('#manejadorArchivos').show();
		$('#montoPresupuesto').hide();
		$('.simbolo').hide();
		dropzoneOptions = {
	            dictDefaultMessage: 'Arrastra aqui el layout o da clic para buscarlo en tu equipo',
	            dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
	            dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
	            dictInvalidFileType: 'Archivo no permitido',
	            dictRemoveFile: 'Eliminar archivo', 
	            dictRemoveFileConfirmation: 'Archivo eliminado',
	            dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
	            paramName: "file",
	            autoProcessQueue: false,
	            maxFilesize: 3, // MB
	            maxFiles: 1,
	            addRemoveLinks: true,
	            acceptedFiles: 'image/*,application/pdf,.psd',
	            accept: function(file, done){
	                reader = new FileReader();
	                reader.onload = handleReaderLoad;
	                reader.readAsDataURL(file);
	                
	                LAYOUT_B64 = '';
	                LAYOUT_Type = '';
	                
	                function handleReaderLoad(evt) {
	                	LAYOUT_B64 = evt.target.result;
	                	LAYOUT_Type = file.type;
	                	$('#subeArchivo').show();
	                }
	                done();
	            }
	        };
		
	        uploader = document.querySelector('#uploader');
	        dropzoneLayouts = new Dropzone(uploader, dropzoneOptions);
	        ARCHIVO_SUBIDO = false;
	        
	        dibujaArchivos();
	        $('#subeArchivo').unbind('click');
	        $('#subeArchivo').click(function(){
	        	
	        	cargaLoading();
	        	
	        	mdId = $("#mdId").val();
	        	nombreArchivo = 'LYT' + mdId; 
	        	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        	archivo = LAYOUT_B64;
	        	formato = LAYOUT_Type.split('/')[1];
	        	tipoArchivo = 2;
	        	tipoServicio = 1;
	        	
	        	invocarJSONServiceAction("subeArchivo", 
	        			{'mdId': mdId,
	        			'nombreArchivo': nombreArchivo,
	        			'archivo': archivo,
	        			'formato': formato,
	        			'tipoArchivo': tipoArchivo,
	        			'tipoServicio' : tipoServicio,
	        			'fecha': fecha,
	        			'monto': ''}, 
	        			'respSubeArchivo', 
	        			function() {
	        				cierraLoading();
	        			},
	        			function() {
	        				cierraLoading();
	        			});

	        	respSubeArchivo = function(data){
	        		if(data.codigo != 200){
	        			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        		}else{
	        			ARCHIVO_SUBIDO = true;
	        			dropzoneLayouts.destroy();
	        			$('#subeArchivo').hide();
	        			$('#contenedorUploader').hide();
	        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el layout sea validado por el area correspondiente.');
	        			$('#msjUploader').show();
	        			ARCHIVOS_MD.push(new Archivo(
	        					nombreArchivo,
	        					data.url,
	        					2,
	        					$('#nombreCompletoUsuario').val(),
	        					$('#nombreAreaUsuario').val(),
	        					null, null));
	        			dibujaArchivos();
	        			if(ESTATUS_MD == ESTATUS_CORRECCION_LAYOUT){
	        				ESTATUS_FINALIZA_MD = 1;
	        				actionfinalizaMD();
	        			}
	        		}
	        	}
	        });
	}else if(TIPOMD == 3 && AREA_USUARIO == areaOperaciones 
			&& ESTATUS_MD == ESTATUS_VALIDACION_LAYOUT){
		$('#manejadorArchivos').show();
		$('#subeArchivo').hide();
		$('#montoPresupuesto').hide();
		$('#contenedorUploader').hide();
		if (ARCHIVOS_MD.length > 0)
			$('#msjUploader').html('Deberás autorizar el layout.');
		else
			$('#msjUploader').html('Deberás esperar a que el layout sea cargado por el area correspondiente');
		
		$('#msjUploader').show();
		
		dibujaArchivos();
	}else if(TIPOMD == 3 
			&& AREA_USUARIO == areaConstruccion 
			&& (ESTATUS_MD == ESTATUS_PRESUPUESTO_CONSTRUCCION
					|| ESTATUS_MD == ESTATUS_CORRECCION_PRESUPUESTO_CONSTRUCCION)){
		$('#manejadorArchivos').show();
		$('#montoPresupuesto').show();
		$('#montoPresupuesto').attr('placeholder', 'Captura el monto total de presupuesto');
		$('#subeArchivo').show();
		
		dropzoneOptions = {
	            dictDefaultMessage: 'Arrastra aqui el detalle de presupuesto o da clic para buscarlo en tu equipo',
	            dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
	            dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
	            dictInvalidFileType: 'Archivo no permitido',
	            dictRemoveFile: 'Eliminar archivo', 
	            dictRemoveFileConfirmation: 'Archivo eliminado',
	            dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
	            paramName: "file",
	            autoProcessQueue: false,
	            maxFilesize: 3, // MB
	            maxFiles: 1,
	            addRemoveLinks: true,
	            acceptedFiles: 'image/*,application/pdf,.psd',
	            accept: function(file, done){
	                reader = new FileReader();
	                reader.onload = handleReaderLoad;
	                reader.readAsDataURL(file);
	                
	                LAYOUT_B64 = '';
	                LAYOUT_Type = '';
	                
	                function handleReaderLoad(evt) {
	                	LAYOUT_B64 = evt.target.result;
	                	LAYOUT_Type = file.type;
	                	$('#subeArchivo').show();
	                }
	                done();
	            }
	        };
		
	        uploader = document.querySelector('#uploader');
	        dropzoneLayouts = new Dropzone(uploader, dropzoneOptions);
	        ARCHIVO_SUBIDO = false;
	        
	        dibujaArchivos();
	        $('#subeArchivo').unbind('click');
	        $('#subeArchivo').click(function(){
	        	
	        	mdId = $("#mdId").val();
	        	nombreArchivo = 'PPTO-CO' + mdId; 
	        	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        	archivo = LAYOUT_B64;
	        	formato = LAYOUT_Type.split('/')[1];
	        	tipoArchivo = 2;
	        	tipoServicio = 2;
	        	monto = $('#montoPresupuesto').val();
	        	
	        	mensaje = '';
	        	
	        	if(monto == '')
	        		mensaje = 'Escribe el monto total presupuestado';
	        	if(LAYOUT_B64 == ''){
	        		if(mensaje == '')
	        			mensaje = 'Carga el archivo detalle del presupuesto';
	        		else
	        			mensaje = 'Carga el archivo detalle del presupuesto y escribe el monto total presupuestado';
	        	}
	        	
	        	if(mensaje == ''){
	        		cargaLoading();
		        	monto = parseFloat(monto).toFixed(2);
		        	$('#montoPresupuesto').val(monto);
		        	
		        	invocarJSONServiceAction("subeArchivo", 
		        			{'mdId': mdId,
		        			'nombreArchivo': nombreArchivo,
		        			'archivo': archivo,
		        			'formato': formato,
		        			'tipoArchivo': tipoArchivo,
		        			'tipoServicio' : tipoServicio,
		        			'fecha': fecha,
		        			'monto': monto}, 
		        			'respSubeArchivo', 
		        			function() {
		        				cierraLoading();
		        			},
		        			function() {
		        				cierraLoading();
		        			});

		        	respSubeArchivo = function(data){
		        		if(data.codigo != 200){
		        			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		        		}else{
		        			ARCHIVO_SUBIDO = true;
		        			dropzoneLayouts.destroy();
		        			$('#subeArchivo').hide();
		        			$('#contenedorUploader').hide();
		        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el presupuesto sea validado por el area correspondiente.');
		        			$('#msjUploader').show();
		        			ARCHIVOS_MD.push(new Archivo(
		        					nombreArchivo,
		        					data.url,
		        					0,
		        					$('#nombreCompletoUsuario').val(),
		        					$('#nombreAreaUsuario').val(),
		        					null, null));
		        			dibujaArchivos();
		        			ESTATUS_FINALIZA_MD = 1;
		        			actionfinalizaMD();
		        		}
		        	}
	        	}else
	        		cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        });
	}else if(TIPOMD == 3 
			&& AREA_USUARIO == areaAuditoria 
			&& (ESTATUS_MD == ESTATUS_PRESUPUESTO_AUDITORIA || ESTATUS_MD == ESTATUS_CORRECCION_PRESUPUESTO_AUDITORIA)){
		$('#manejadorArchivos').show();
		$('#montoPresupuesto').show();
		$('#montoPresupuesto').attr('placeholder', 'Captura el monto total de presupuesto');
		$('#subeArchivo').show();
		
		dropzoneOptions = {
	            dictDefaultMessage: 'Arrastra aqui el detalle de presupuesto o da clic para buscarlo en tu equipo',
	            dictFallbackMessage: 'Tu explorador no es compatible, actualizalo',
	            dictFileTooBig: 'El archivo es muy grande {{filesize}}, el limite es {{maxFilesize}} MB',
	            dictInvalidFileType: 'Archivo no permitido',
	            dictRemoveFile: 'Eliminar archivo', 
	            dictRemoveFileConfirmation: 'Archivo eliminado',
	            dictMaxFilesExceeded: 'Solo puedes agregar {{maxFiles}} archivo',
	            paramName: "file",
	            autoProcessQueue: false,
	            maxFilesize: 3, // MB
	            maxFiles: 1,
	            addRemoveLinks: true,
	            acceptedFiles: 'image/*,application/pdf,.psd',
	            accept: function(file, done){
	                reader = new FileReader();
	                reader.onload = handleReaderLoad;
	                reader.readAsDataURL(file);
	                
	                LAYOUT_B64 = '';
	                LAYOUT_Type = '';
	                
	                function handleReaderLoad(evt) {
	                	LAYOUT_B64 = evt.target.result;
	                	LAYOUT_Type = file.type;
	                	$('#subeArchivo').show();
	                }
	                done();
	            }
	        };
		
	        uploader = document.querySelector('#uploader');
	        dropzoneLayouts = new Dropzone(uploader, dropzoneOptions);
	        ARCHIVO_SUBIDO = false;
	        
	        dibujaArchivos();
	        $('#subeArchivo').unbind('click');
	        $('#subeArchivo').click(function(){
	        	
	        	mdId = $("#mdId").val();
	        	nombreArchivo = 'PPTOAU' + mdId; 
	        	fecha = new Date().format("dd/mm/yyyy H:MM:ss");
	        	archivo = LAYOUT_B64;
	        	formato = LAYOUT_Type.split('/')[1];
	        	tipoArchivo = 2;
	        	tipoServicio = 2;
	        	monto = $('#montoPresupuesto').val();
	        	
	        	mensaje = '';
	        	
	        	if(monto == '')
	        		mensaje = 'Escribe el monto total presupuestado';
	        	if(LAYOUT_B64 == ''){
	        		if(mensaje == '')
	        			mensaje = 'Carga el archivo detalle del presupuesto';
	        		else
	        			mensaje = 'Carga el archivo detalle del presupuesto y escribe el monto total presupuestado';
	        	}
	        	
	        	if(mensaje == ''){
	        		cargaLoading();
		        	monto = parseFloat(monto).toFixed(2);
		        	$('#montoPresupuesto').val(monto);
		        	
		        	invocarJSONServiceAction("subeArchivo", 
		        			{'mdId': mdId,
		        			'nombreArchivo': nombreArchivo,
		        			'archivo': archivo,
		        			'formato': formato,
		        			'tipoArchivo': tipoArchivo,
		        			'tipoServicio' : tipoServicio,
		        			'fecha': fecha,
		        			'monto': monto}, 
		        			'respSubeArchivo', 
		        			function() {
		        				cierraLoading();
		        			},
		        			function() {
		        				cierraLoading();
		        			});

		        	respSubeArchivo = function(data){
		        		if(data.codigo != 200){
		        			cargaMensajeModal('DETALLE MD', 'No se logro cargar el archivo, por favor reintenta', TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
		        		}else{
		        			ARCHIVO_SUBIDO = true;
		        			dropzoneLayouts.destroy();
		        			$('#subeArchivo').hide();
		        			$('#contenedorUploader').hide();
		        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el presupuesto sea validado por el area correspondiente.');
		        			$('#msjUploader').show();
		        			ARCHIVOS_MD.push(new Archivo(
		        					nombreArchivo,
		        					data.url,
		        					0,
		        					$('#nombreCompletoUsuario').val(),
		        					$('#nombreAreaUsuario').val(),
		        					null, null));
		        			dibujaArchivos();
		        			ESTATUS_FINALIZA_MD = 1;
		        			actionfinalizaMD();
		        		}
		        	}
	        	}else
	        		cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
	        });
	}else if(TIPOMD == 3 && ESTATUS_MD == ESTATUS_VOBO_FINAL){
		$('#autoriza9').hide();
		$('#rechaza9').hide();
		if(AREA_USUARIO == areaOperaciones){
			$('#autoriza9').show();
			$('#rechaza9').show();
		}
		$('#voboMD').hide();
		strArchivos = '';
		$.each(ARCHIVOS_MD, function(i, item){
			clase = 'filePendiente';
			
			strArchivos = '<div class="fileMD ' + clase + '">'
								+ '<div class="datosFile" rel="' + i + '">'
									+ '<div class="nombreFile">' + item.nombre + '</div>'
									+ '<div class="autorFile">' + item.autor + '/' + item.areaAutor + '</div>'
								+ '</div>'
								+ '<div class="actionsFile">'
										+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
								+ '</div>'
							+ '</div>' +strArchivos;
		});
		
		$('#containerFilesVoboFinal').html(strArchivos);
		$('#voboFinal').show();
	}
}

function dibujaArchivos(){
	$('.filesMD').html('');
	if(ARCHIVOS_MD.length == 0){
		$('.filesMD').html('<div class="msjFiles">La MD no cuenta con archivos</div>');
	}else{
		strArchivos = '';
		if(AREA_USUARIO == areaConstruccion){
			$.each(ARCHIVOS_MD, function(i, item){
				if(item.estatus == 2){
					clase = 'filePendiente';
					if(ESTATUS_MD != ESTATUS_CORRECCION_LAYOUT && ESTATUS_MD != ESTATUS_CORRECCION_PRESUPUESTO_CONSTRUCCION){
						ARCHIVO_SUBIDO = true;
						$('#subeArchivo').hide();
	        			$('#contenedorUploader').hide();
	        			$('#msjUploader').html('¡Felicidades! El archivo fue cargado con exito. Deberás esperar a que el presupuesto sea validado por el area correspondiente.');
	        			$('#msjUploader').show();
					}
				}else if(item.estatus == 1)
					clase = 'fileAutorizado';
				else if(item.estatus == 0)
					clase = 'fileRechazado';
				else
					clase = 'filePendiente';
				
				strArchivos = '<div class="fileMD ' + clase + '">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + item.nombre + '</div>'
										+ '<div class="autorFile">' + item.autor + '/' + item.areaAutor + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
									+ '</div>'
								+ '</div>' +strArchivos;
			});
		}else if(AREA_USUARIO == areaOperaciones){
			$.each(ARCHIVOS_MD, function(i, item){
				strAcciones = '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;';
				if(item.estatus == 2){
					clase = 'filePendiente';
					strAcciones = '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;'
						+ '<span> <img title="Autorizar layout" class="sin_autorizar" onclick="autorizaArchivo(1, ' + i + ', this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;'
						+ '<span> <img title="Rechazar layout" class="sin_autorizar" onclick="autorizaArchivo(0, ' + i + ', this);" style="cursor: pointer;" src="img/rechaza_mark.png">&nbsp;';
				}else if(item.estatus == 1)
					clase = 'fileAutorizado';
				else if(item.estatus == 0)
					clase = 'fileRechazado';
				else
					clase = 'filePendiente';
				
				strArchivos = '<div class="fileMD ' + clase + '">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + item.nombre + '</div>'
										+ '<div class="autorFile">' + item.autor + '/' + item.areaAutor + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ strAcciones
									+ '</div>'
								+ '</div>' +strArchivos;
			});
		}else if(AREA_USUARIO == areaAuditoria){
			$.each(ARCHIVOS_MD, function(i, item){
				strAcciones = '<span> <img title="Descargar archivo" onclick="descargaArchivo(' + i + ');" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;';
				clase = 'filePendiente';
				
				strArchivos = '<div class="fileMD ' + clase + '">'
									+ '<div class="datosFile" rel="' + i + '">'
										+ '<div class="nombreFile">' + item.nombre + '</div>'
										+ '<div class="autorFile">' + item.autor + '/' + item.areaAutor + '</div>'
									+ '</div>'
									+ '<div class="actionsFile">'
											+ strAcciones
									+ '</div>'
								+ '</div>' +strArchivos;
			});
		}
		
		
		$('.filesMD').html(strArchivos);
		
		$('.datosFile').unbind('click');
		$('.datosFile').click(function(){
			id = parseInt($(this).attr('rel'));
			
			if(ARCHIVOS_MD[id]  == undefined || ARCHIVOS_MD[id].comentario == null)
				$('.commentsByFile').html('<div class="msjFiles">El archivo no cuenta con comentarios</div>');
			else
				$('.commentsByFile').html('<div class="msjFiles">"' + ARCHIVOS_MD[id].comentario + '" - ' + ARCHIVOS_MD[id].autorCometario + '</div>');
		});
	}
} 

function isNumberKey(evt, obj) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function autorizaArchivo(autoriza, id, btn){
	if($(btn).hasClass('sin_autorizar')){
		$('.commentsByFile').hide();
		
		if(autoriza == 0){
			obtieneMotivosGenerales('motivoRechazoLayout');
			$('.tituloComment').html('Selecciona un motivo de rechazo y escribe un comentario');
			$('#commentFile').val('');
		}else{
			$('.tituloComment').html('¿Deseas comentar algo acerca del layout?');
			$('#motivoRechazoLayout').hide();
			$('#commentFile').val('');
		}
		
		NOMBRE_ARCHIVO = $(btn).parent().parent().parent().parent().parent().find('.nombrefile').html()
		
		$('.commentFileContainer').show();
		
		$('#submitComment').unbind('click');
		$('#submitComment').click(function(){
			comentario = $('#commentFile').val();
			ESTATUS_FINALIZA_MD = autoriza;
			if(autoriza == 0){
				motivo = $('#motivoRechazoLyt option:selected').val();
				mensaje = '';
				
				if(comentario == '')
					mensaje += 'Porfavor escriba el motivo de rechazo';
				if(motivo == 0){
					if(mensaje == '')
						mensaje += 'Por favor selecciona el motivo de rechazo';
					else
						mensaje = 'Porfavor escriba el mensaje y seleccione el motivo de rechazo';
				}
				
				if(mensaje == '')
					actionfinalizaMD(motivo, comentario + '|' + NOMBRE_ARCHIVO);
				else
					cargaMensajeModal('DETALLE MD', mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR);
			}else{
				motivo = 0;
				actionfinalizaMD(motivo, comentario);
			}
		});
	}
}

function obtieneMotivosGenerales(combo){
	
	invocarJSONServiceAction("motivosRechazo", 
			{'modulo': 0,
			'tipoModulo': 1}, 
			'setMotivosGenerales', 
			function() {
				cierraLoading();
			},
			function() {
				cierraLoading();
			});

	setMotivosGenerales = function(data){
		if(data.codigo != 200){
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		}else{
			if(data.motivos != undefined){
				strCombo = '<select id="motivoRechazoLyt" class="motivoRechazo" style="background-color: white;">' + 
				'<option value="0" disabled>SELECCIONA EL MOTIVO DE RECHAZO</option>';
				
				$.each(data.motivos, function(){
					strCombo += '<option value="' + this.motivoId + '">' + this.descripcion + '</option>' 
				});
	
				strCombo += '</select>';
	
				$("#" + combo).html(strCombo);
				$('#motivoRechazoLyt').val(0);
			}
		}
	}
}

function descargaArchivo(i){
	window.open(ARCHIVOS_MD[i].url);
}

Archivo = function(
		nombre,
		url,
		estatus,
		autor,
		areaAutor,
		comentario,
		autorCometario,
		monto){
	this.nombre = nombre;
	this.url = url;
	this.estatus = estatus;
	this.autor = autor;
	this.areaAutor = areaAutor;
	this.comentario = comentario;
	this.autorCometario = autorCometario;
	this.monto = monto;
};

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
	
	this.motivoRechazoDefinitivo = false;
	this.motivo = -1;
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
    
    if(listaCompetencias != undefined){
	    for(var i = 0; i < listaCompetencias.length; i++) {
	    	puntosZonificacion.push(
	    			{
	    				position: new google.maps.LatLng(listaCompetencias[i].latitud, listaCompetencias[i].longitud),
	    				type: listaCompetencias[i].competenciaId
	    			});
	    }
    }
    
    if(listaGeneradores != undefined){
	    for(var i = 0; i < listaGeneradores.length; i++) {
	    	puntosZonificacion.push(
	    			{
	    				position: new google.maps.LatLng(listaGeneradores[i].latitud, listaGeneradores[i].longitud),
	    				type: listaGeneradores[i].generadorId
	    			});
	    }
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

function formatear(cnt, cents) {
	cnt = cnt.toString().replace(/\$|\u20AC|\,/g,'');
	if (isNaN(cnt))
		return 0;	
	var sgn = (cnt == (cnt = Math.abs(cnt)));
	cnt = Math.floor(cnt * 100 + 0.5);
	cvs = cnt % 100;
	cnt = Math.floor(cnt / 100).toString();
	if (cvs < 10)
	cvs = '0' + cvs;
	for (var i = 0; i < Math.floor((cnt.length - (1 + i)) / 3); i++)
		cnt = cnt.substring(0, cnt.length - (4 * i + 3)) + ',' 
                        + cnt.substring(cnt.length - (4 * i + 3));

	return (((sgn) ? '' : '-') + cnt) + ( cents ?  '.' + cvs : '');
}