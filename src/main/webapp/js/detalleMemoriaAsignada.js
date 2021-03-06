var PRIMER_HORARIO_CONTEO = 1;
var SEGUNDO_HORARIO_CONTEO = 2;
var TERCER_HORARIO_CONTEO = 3;

var ESTATUS_DOCTO_AUTORIZADO = 1;

var TIPOMD = -1;

var DETALLE_MD_ASIGNADAS = 1;
var DETALLE_MD_AUTORIZADAS = 2;
var DETALLE_MD_RECHAZADAS = 3;
var DETALLE_MD_EDITAR = 4;
var mdId = "";

var predialImg;
var fechaPredial;
var arrEstatusPermiso;

var SCORE_ANTERIOR = 1;
var SCORE_NUEVO = 2
var perfil;
var area;

var radioAsignado;


/**
 * MOD 2021
 * 
 * 
 */
var MAPZONIFICACION_RADIOS;

var circule = new google.maps.Circle({
	strokeColor: "white",
	strokeOpacity: 0.5,
    strokeWeight: .5,
    fillColor: "#FFC300",
    fillOpacity: 0.4,
	map: null,
	center: null,
	radius: 500 / 6378100 * 6378100
});

function formatMiles(numberf) {
	var number = 0;
	number = parseInt(numberf.replace(",", ""))
	return number
}

function numberWithCommas(x) {
	x = x.toString();
	var pattern = /(-?\d+)(\d{3})/;
	while (pattern.test(x))
		x = x.replace(pattern, "$1,$2");
	return x;
}

function pintarGeneradoresFiltro(arrayBbj, thisMap, generadorId) {
	if (arrayBbj == null || arrayBbj <= 0) {
		return false;
	}

	arrayBbj.forEach(function (obj, index) {
		if (obj.generadorId == generadorId) {
			obj.marker.setMap(thisMap);
			obj.shown = thisMap != null ? true : false;
		}
	});
	var showCircle = false;

	for (index in arrayBbj) {
		showCircle = arrayBbj[index].shown;
		if (showCircle)
			break;
	}

	if (showCircle && thisMap != null) {
		circule.setRadius(arrayBbj[0].rad / 6378100 * 6378100);
		circule.setMap(thisMap);
		circule.setCenter(arrayBbj[0].mark);
	} else {
		circule.setMap(null);
	}

		pintaRadio(thisMap);		

}


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

var iconSizeNew = 35;
var iconSizeNewOthers = 30;
var iconMarkeGenerador = {
	100001: {
		url: "img/localizador/pin/pin_templo.png", // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// IGLESIA
	100002: {
		url: "img/localizador/pin/pin_hospital.png", // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// HOSPITAL		
	100003: {
		url: "img/localizador/pin/pin_escuela.png", // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// ESCUELA
	100004: {
		url: "img/localizador/pin/pin_mercado.png", // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// MERCADO
	100005: {
		url: "img/localizador/pin/pin_ofgobierno.png", // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// OFICINA DE GOBIERNO
	100006: {
		url: "img/localizador/pin/pin_panaderia.png", // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// PANADERIA
	100007: {
		url: 'img/localizador/pin/pin_tortilleria.png', // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// TORTILLERIA
	100008: {
		url: 'img/localizador/pin/pin_abarrotes.png', // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// ABARROTES
	100009: {
		url: 'img/localizador/pin/pin_carniceria.png', // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// CARNICERIA
	100010: {
		url: "img/localizador/pin/pin_polleria.png", // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},	    // POLLERIA
	100011: {
		url: "img/localizador/pin/pin_recauderia.png", // url
		scaledSize: new google.maps.Size(iconSizeNew, iconSizeNew), // scaled size
	},// RECAUDERIA
	"mds": {
		url: "img/localizador/icon_md.png", // url
		 scaledSize: new google.maps.Size(33, 32), // scaled size
	},// RECAUDERIA
	"tdas": {
		url: "img/localizador/tiendaNeto.png", // url
		scaledSize: new google.maps.Size(30, 30), // scaled size
	}// RECAUDERIA
};

var iconMarkeCompetencias = {
	100001: "img/localizador/pin/pin_3b.png", 		// 3b
	100002: "img/localizador/pin/pin_aurrera_express.png", 	 	    // Bodega express
	100011: "img/localizador/pin/pin_aurrera.png"
};			// mi bodega

var chart = null;
var ctx = "";
/**FIN MOD 2021 */

$(function () {
	TIPOMD = $("#tipoMd").val();
	mdId = $("#mdId").val();
	perfil = $("#perfil_usuario").val();
	area = $("#nombreAreaUsuario").val();

	if ($(window).width() < 400) {
		escondeGeneradores();
	}
	// ------------------- SE ARMA LA LEYENDA ------------------
	if (perfil == 3) {
		$('#leyenda').text('DASHBOARD DIRECTOR GENERAL');
	}
	else {
		$('#leyenda').text('DASHBOARD ' + area);
	}
	// ------------------- Se define que parte del header se resalta ------------------

	if (TIPOMD == 0) {
		$('#idasignadas').addClass('resaltado');
		$('#titulo_tipo').text('EN PROCESO');
	} else if (TIPOMD == 1) {
		$('#idautorizadas').addClass('resaltado');
		$('#titulo_tipo').text('AUTORIZADAS');
	} else if (TIPOMD == 2) {
		$('#idrechazadas').addClass('resaltado');
		$('#titulo_tipo').text('RECHAZADAS');
	} else if (TIPOMD == 3) {
		$('#idaprobadas').addClass('resaltado');
		$('#titulo_tipo').text('APROBADAS');
	} else if (TIPOMD == 4 || TIPOMD == 5) {
		$('#idtablero').addClass('resaltado');
		$('#titulo_tipo').text('TABLERO');
	}
	else {
		$('#idasignadas').addClass('resaltado');
		$('#titulo_tipo').text('EN PROCESO');
	}

	buscaDetalleMD($("#mdId").val());

	$('.popover-dismiss').popover({
		trigger: 'focus'
	});

	/*$('.galeria_main').slick({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	});*/


	$("#btnRadios").click(function () {
		imprimeInfoRadio();
	});

	permisos_perfil();

	$("#btnLevantamiento").click(function () {
		$("#mdIdlevantamiento").val(mdId);
		$("#cabeceroMd").submit();
	});
});

function imprimeInfoRadio() {
	if (radioAsignado.radioId != undefined) {
		var cadena = "";
		var fechaAsignado = "";
		var infoSE = "";
		var generadores = "";
		var ubicacion = "";

		if (radioAsignado.fechaAsignado == undefined || radioAsignado.fechaAsignado == undefined || radioAsignado.fechaAsignado == "null") {
			fechaAsignado = "sin fecha asignada";
		}

		if (radioAsignado.poblacion != undefined) {
			if (radioAsignado.poblacion.poblacion != undefined) {
				infoSE += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Poblaci??n: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + formato(radioAsignado.poblacion.poblacion, true) + "</span></div>";
			}
			if (radioAsignado.poblacion.viviendas != undefined) {
				infoSE += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Viviendas: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + formato(radioAsignado.poblacion.viviendas, true) + "</span></div>";
			}
			if (radioAsignado.poblacion.pea != undefined) {
				infoSE += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>PEA: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + formato(radioAsignado.poblacion.pea, true) + "</span></div>";
			}
			if (radioAsignado.poblacion.nse != undefined) {
				infoSE += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>NSE: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + radioAsignado.poblacion.nse + "</span></div>";
			}
		}

		if (radioAsignado.generadores != undefined) {
			if (radioAsignado.generadores.hospitales != undefined) {
				generadores += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Hospitales: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + formato(radioAsignado.generadores.hospitales, true) + "</span></div>";
			}
			if (radioAsignado.generadores.escuelas != undefined) {
				generadores += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Escuelas: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + formato(radioAsignado.generadores.escuelas, true) + "</span></div>";
			}
			if (radioAsignado.generadores.mercados != undefined) {
				generadores += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Mercados: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + formato(radioAsignado.generadores.mercados, true) + "</span></div>";
			}
			if (radioAsignado.generadores.templos != undefined) {
				generadores += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Templos: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + formato(radioAsignado.generadores.templos, true) + "</span></div>";
			}
		}

		if (radioAsignado.ubicacion != undefined) {
			if (radioAsignado.ubicacion.callePrincipal != undefined) {
				ubicacion += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Calle principal: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + radioAsignado.ubicacion.callePrincipal + "</span></div>";
			}
			if (radioAsignado.ubicacion.entreCalle1 != undefined) {
				ubicacion += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Entre calle 1: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + radioAsignado.ubicacion.entreCalle1 + "</span></div>";
			}
			if (radioAsignado.ubicacion.entreCalle2 != undefined) {
				ubicacion += "<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Entre calle 2: </span></div><div class='col-lg-6 col-6'><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + radioAsignado.ubicacion.entreCalle2 + "</span></div>";
			}
		}

		cadena += "<div class='row'><div class='col-lg-12 col-12'><span class='titulo_detalle_md_20'>" + radioAsignado.nombreRadio + "</span></div></div>" +
			"<div class='row'><div class='col-lg-12 col-12'><span class='contenido_cajas_20'>Asignado el: " + radioAsignado.fechaAsignado + "</span></div></div>" +

			"<div class='col-lg-6 col-6'><span class='contenido_cajas_20'>Estatus: </span><span class='titulo_detalle_md_20' style='font-size: 0.7em;'>" + radioAsignado.estatusRadio + "</span></div>" +
			"</div>" +
			"<div class='row' style='border-bottom: 1px solid #071B36; margin-bottom: 10px;height: 10px;'>&nbsp;</div>" +
			"<div class='row'><div class='col-lg-12 col-12'><span class='titulo_detalle_md_20' style='font-size: 0.8em;'>Informaci??n socio demogr??fica</span></div></div>" +
			"<div class='row'>" + infoSE + "</div>" +
			"<div class='row' style='border-bottom: 1px solid #071B36; margin-bottom: 10px;height: 10px;'>&nbsp;</div>" +
			"<div class='row'><div class='col-lg-12 col-12'><span class='titulo_detalle_md_20' style='font-size: 0.8em;'>Generadores</span></div></div>" +
			"<div class='row'>" + generadores + "</div>" +
			"<div class='row' style='border-bottom: 1px solid #071B36; margin-bottom: 10px;height: 10px;'>&nbsp;</div>" +
			"<div class='row'><div class='col-lg-12 col-12'><span class='titulo_detalle_md_20' style='font-size: 0.8em;'>Ubicaci??n</span></div></div>" +
			"<div class='row'>" + ubicacion + "</div>";


		cargaMensajeModal('RADIOS ASIGNADOS', cadena, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);

	} else {
		cargaMensajeModal('RADIOS ASIGNADOS', "<span style=\"color: #FF0000;\">Esta MD no est?? asignada a alg??n radio</span>", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
	}
}

function inicializaModulosEdicion(modulos, datosSitio, datosPropietario, generalidades, superficie, data) {
	$("#modulo1Creacion").hide();
	$("#modulo2Creacion").hide();
	$("#modulo3Creacion").hide();
	$("#modulo4Creacion").hide();
	$("#modulo5Creacion").hide();
	$("#modulo6Creacion").hide();
	$("#modulo7Creacion").hide();

	for (var i = 0; i < modulos.length; i++) {
		switch (modulos[i].moduloId) {
			case 1:
				if (modulos[i].editable == 1) {
					var datos = "";
					var responsable = "";

					responsable = '<span class="azul t12" style="font-size: .7em;">Creado por' +
						' <select style="width:70%;" id="listaCreadores"></select></span>';

					$('#responsable').html(responsable);

					obtieneListaCreadores(data.generales.creador);

					$('#labelNombre').text("Nombre ");
					$('#nombreMd').removeAttr("readonly");
					$("#modulo1Edita").show();

					/*datos += '<span class="negrita azul t14 sangria_cuerpo">Direccion</span><br/>' +
					'<input id="direccionText" type="text" class="text_edita" style="width:98%;"/><br/>';*/

					/*'<span class="negrita azul t14 sangria_cuerpo">Calle</span><br/>' +
					'<input id="calleMdText" type="text" class="text_edita"/><br/>' +
					'<span class="negrita azul t14 sangria_cuerpo">Colonia</span><br/>' +
					'<input id="coloniaMdText" type="text" class="text_edita"><br/>' +
					'<span class="negrita azul t14 sangria_cuerpo">Municipio</span><br/>' +
					'<input id="municipioMdText" type="text" class="text_edita"><br/>' +
					'<span class="negrita azul t14 sangria_cuerpo">Ciudad</span><br/>' +
					'<input id="ciudadMdText" type="text" class="text_edita"><br/>' +
					'<span class="negrita azul t14 sangria_cuerpo">Estado</span><br/>' +
					'<input id="estadoMdText" type="text" class="text_edita"><br/>' +
					'<span class="negrita azul t14 sangria_cuerpo">C??digo postal</span><br/>' +
					'<input id="codigoPostalMdText" type="number" class="text_edita"><br/>';*/
					// $("#modulo1Datos").html(datos);

					if (datosSitio != undefined) {
						/*	$("#calleMdText").val(datosSitio.calle);
							$("#coloniaMdText").val(datosSitio.colonia);
							$("#municipioMdText").val(datosSitio.municipio);
							$("#ciudadMdText").val(datosSitio.ciudad);
							$("#estadoMdText").val(datosSitio.estado);
							$("#codigoPostalMdText").val(datosSitio.codigoPostal);*/
					}

				}
				break;
			case 2:
				if (modulos[i].editable == 1) {
					var datos = "";
					$("#modulo2Edita").show();

					datos += '<div class=" col-12 negrita azul t14 sangria_cuerpo">Direcci??n</div>' +
						'<div class="col-12"><input id="direccionText" type="text" class="text_edita"/></div>';
					datos += '<span class="col-12 negrita azul t14 sangria_cuerpo">Nombre</span>' +
						'<div class="col-12"><input id="nombrePropietarioText" type="text" class="text_edita"/></div>';
					datos += '<span class="col-12 negrita azul t14 sangria_cuerpo">Apellido Paterno</span>' +
						'<div class="col-12"><input id="apaternoPropietarioText" type="text" class="text_edita"/></div>';
					datos += '<span class="col-12 negrita azul t14 sangria_cuerpo">Apellido Materno</span>' +
						'<div class="col-12"><input id="amaternoPropietarioText" type="text" class="text_edita"/></div>';
					datos += '<span class="col-12 negrita azul t14 sangria_cuerpo">Tel??fono</span>' +
						'<div class="col-12"><input id="telefonoPropietarioText" type="text" class="text_edita"/></div>';
					datos += '<span class="col-12 negrita azul t14 sangria_cuerpo">Email</span>' +
						'<div class="col-12"><input id="emailPropietarioText" type="text" class="text_edita"/></div>';

					$("#modulo2Datos").html(datos);

					if (datosPropietario != undefined) {
						$("#nombrePropietarioText").val(datosPropietario.nombreP);
						$("#apaternoPropietarioText").val(datosPropietario.aPaterno);
						$("#amaternoPropietarioText").val(datosPropietario.aMaterno);
						$("#telefonoPropietarioText").val(datosPropietario.telefono);
						$("#emailPropietarioText").val(datosPropietario.email);
						$("#direccionText").val(datosSitio.direccion);
					}
					if (datosSitio != undefined) {
						$("#direccionText").val(datosSitio.direccion);
					}
				}
				break;
			case 3:
				if (modulos[i].editable == 0) {
					var datos = "";
					$("#modulo3Edita").show();
					$(".esquina").hide();

					datos += '<div class="col-12" style="margin-bottom:10px; margin-left:20px;">';
					datos += '<input type="checkbox" class="form-check-input" id="esquina_edit">';
					datos += '<label class="azul t12" for="esquina">Local en esquina</label>';
					datos += '</div>';

					datos += '<div class="col-lg-4">';
					datos += '<span class="azul t12">FRENTE&nbsp;&nbsp;&nbsp;';
					datos += '<input id="frenteMd" type="text" class="text_edita"/> mts</span><br/>';
					datos += '</div>';
					datos += '<div class="col-lg-4">';
					datos += '<span class="azul t12">PROFUNDIDAD&nbsp;&nbsp;&nbsp;';
					datos += '<input id="profundidadMd" type="text" class="text_edita"/> mts</span><br/>'
					datos += '</div>';
					datos += '<div class="col-lg-4">';
					datos += '<span class="azul t12">SUPERFICIE TOTAL&nbsp;&nbsp;&nbsp;';
					datos += '<span id="tamanioTotalMd">' + formatear(superficie.total, true) + ' mts</span></span><br/>';
					datos += '</div>';
					$("#modulo3Datos").html(datos);

					if (superficie.esquina == true) {
						$("#esquina_edit").prop('checked', true);
					}

					if (superficie.drenaje != undefined && superficie.drenaje) {
						$("#drenaje").html("SITIO CON DRENAJE");
					} else {
						$("#drenaje").html("SITIO SIN DRENAJE");
					}

					$("#puntosSuperficie").text(superficie.puntos);
					$("#frenteMd").val(formatear(superficie.frente, true));
					$("#profundidadMd").val(formatear(superficie.profundidad, true));
					$("#vistaFrontalMd").attr("src", superficie.vistaFrontal);
					$("#fechaVistaFrontal").text(superficie.fechaFrontal);
					$("#horaVistaFrontal").text(superficie.horaFrontal);
					$("#vistaLateral1Md").attr("src", superficie.lateral1);
					$("#fechaVistaLateral1").text(superficie.fechaLateral1);
					$("#horaVistaLateral1").text(superficie.horaLateral1);
					$("#vistaLateral2Md").attr("src", superficie.lateral2);
					$("#fechaVistaLateral2").text(superficie.fechaLateral2);
					$("#horaVistaLateral2").text(superficie.horaLateral2);

					if (superficie.entorno1 != undefined) {
						$("#vistaEntorno1Md").attr("src", superficie.entorno1);
						$("#fechaVistaEntorno1").text(superficie.fechaEntorno1);
						$("#horaVistaEntorno1").text(superficie.horaEntorno1);
					}

				}
				break;
			case 4:
				if (modulos[i].editable == 1) {
					$("#modulo4Edita").show();
				}
				break;
			case 5:
				if (modulos[i].editable == 1) {
					$("#modulo5Edita").show();
				}
				break;
			case 6:
				if (modulos[i].editable == 1) {
					var datos = "";
					var visibilidad = "none";
					$("#modulo6Edita").show();

					datos += '<div class="col-12 negrita azul t14 sangria_cuerpo">Renta</div>' +
						'<div class="col-12"><input id="montoRentaText" type="text" class="text_edita"/></div>' +
						'<div class="col-12 negrita azul t14 sangria_cuerpo">Disponibilidad</div>' +
						'<div class="col-12"><select id="disponibilidadText" class="t12" onchange="cambiaDisponibilidad()">';
					if (generalidades.disponibilidad == "DISPONIBLE INMEDIATO") {
						datos += '<option value="1" selected>DISPONIBLE INMEDIATO</option>';
					} else {
						datos += '<option value="1">DISPONIBLE INMEDIATO</option>';
					}
					if (generalidades.disponibilidad == "OCUPADO") {
						datos += '<option value="2" selected>OCUPADO</option>';
					} else {
						datos += '<option value="2">OCUPADO</option>';
					}
					if (generalidades.disponibilidad.indexOf("DISPONIBLE A PARTIR DE") != -1) {
						datos += '<option value="3" selected>DISPONIBLE A PARTIR DE</option>';
						visibilidad = "block";
					} else {
						datos += '<option value="3">DISPONIBLE A PARTIR DE</option>';
					}
					datos += '</select></div>' +
						'<div class="col-12"><input id="disponibilidadFechaText" readonly style="display: ' + visibilidad + ';margin-top: 5px;margin-bottom: 10px;" type="text" class="text_edita" placeholder="yy-mm-dd"></div>' +
						'<div class="col-12 negrita azul t14 sangria_cuerpo">Amortizaci??n (MXN)</div>' +
						'<div class="col-12"><input id="amortizacionText" type="text" class="text_edita"></div>' +
						'<div class="col-12 negrita azul t14 sangria_cuerpo">Tiempo de amortizaci??n (meses)</div>' +
						'<div class="col-12"><input id="tiempoAmortizacionText" type="text" class="text_edita"></div>' +
						'<div class="col-12 negrita azul t14 sangria_cuerpo">Periodo de gracia (meses)</div>' +
						'<div class="col-12"><input id="periodoGraciaText" type="text" class="text_edita"></div>';
					$("#modulo6Datos").html(datos);


					if (generalidades != undefined) {
						$("#montoRentaText").val(generalidades.renta);
						$("#amortizacionText").val(generalidades.porcentajeAmortizacion.replace("%", ""));
						$("#tiempoAmortizacionText").val(generalidades.periodoAmortizacion.replace("MESES", ""));
						$("#periodoGraciaText").val(generalidades.periodoGracia.replace("MESES", ""));
						inicializaCalendarioDisponibilidad();
						if (generalidades.fechaDisponibilidad != "") {
							$("#disponibilidadFechaText").val(generalidades.fechaDisponibilidad);
						}
					}
				}
				break;
			case 7:
				if (modulos[i].editable == 1) {
					$("#modulo7Edita").show();
				}
				break;
		};
	}
}
function obtieneListaCreadores(creador) {
	invocarJSONServiceAction("listaCreadoresAction",
		{ 'mdId': mdId },
		'obtieneListaResponse',
		function () {
			//Funcion de error

			cierraLoading();
		},
		function () {
			//Funci??n al finalizar

			cierraLoading();
		});

	obtieneListaResponse = function (data) {

		if (data.codigo != 200) {
			cargaMensajeModal('EDITA MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		} else {
			var arreglo = data.jefes;
			var cadena = "";

			for (var i = 0; i < arreglo.length; i++) {
				if (arreglo[i].nombre == creador) {
					cadena = cadena + '<option selected value="' + arreglo[i].jefeId + '">' + arreglo[i].nombre + '</option>';
				}
				else {
					cadena = cadena + '<option value="' + arreglo[i].jefeId + '">' + arreglo[i].nombre + '</option>';
				}
			}
			$('#listaCreadores').append(cadena);
		}
	}
}

function inicializaCalendarioDisponibilidad() {
	$(".ui-datepicker-trigger").hide();

	var dateHoy = new Date();
	var FECHA_HOY = $.datepicker.formatDate('yy-mm-dd', dateHoy);

	$("#disponibilidadFechaText").datepicker({
		dateFormat: 'yy-mm-dd',
		minDate: 0,
		autoSize: true,
		showOn: 'both',
		showAnim: 'slideDown',
		buttonImageOnly: true,
		onClose: function (selectedDate) {
			var date = $(this).datepicker('getDate');
			var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		}
	});

	$("#disponibilidadFechaText").datepicker.dateFormat = 'yy-mm-dd';
	$("#disponibilidadFechaText").val(FECHA_HOY);
}

function muestraChatXMd() {
	mdId = $("#mdIdAutorizacion").val();
	$("#mdIdChat").val(mdId);
	$("#nombreMdChat").val($("#nombreMd").val());
	$("#chatPorMd").submit();
}

function generaPopAutorizacion(titulo, datos) {
	texto = '';
	dias = parseInt(datos.diasVencidos);
	if (dias < 0)
		texto = 'A ' + (dias * -1) + ' d??as de vencer';
	else if (dias == 0)
		texto = 'En tiempo';
	else if (dias > 0)
		texto = ' ' + dias + ' d??as despu??s';
	var popAutorizacion = '<div class="col-12 center"><span class="negrita blanco t14">' + titulo + '<br/></span></div>' +
		'<div class="row">' +
		'<div class="col-6">' +
		'<div><span class="t12 blanco negrita float_left padd">Autoriz??</span></div>' +
		'<span class="t12 blanco float_left">' + datos.nombre + '</span>' +
		'</div>' +
		'<div class="col-6">' +
		'<div><span class="t12 blanco negrita float_left padd">Fecha autorizaci??n</span></div>' +
		'<span class="t12 blanco float_left">' + datos.fechaAutorizacion + '</span>' +
		'</div>' +
		'<div class="col-6">' +
		'<div><span class="t12 blanco negrita float_left padd">Fecha l??mite</span></div>' +
		'<span class="t12 blanco float_left">' + datos.fechaLimite + '</span>' +
		'</div>' +
		'<div class="col-6">' +
		'<div><span class="t12 blanco negrita float_left padd">D??as vencidos</span></div>' +
		'<span class="t12 blanco float_left">' + texto + '</span>' +
		'</div>' +
		'</div>';

	return popAutorizacion;
}

function dibujaAreasCompletadas(AREAS) {
	for (var i = 0; i < AREAS.length; i++) {
		if (AREAS[i].EXPANSION != undefined &&
			AREAS[i].EXPANSION.length > 0 &&
			AREAS[i].EXPANSION[0].puestosValida != undefined &&
			AREAS[i].EXPANSION[0].puestosValida.length > 0) {

			if (AREAS[i].EXPANSION[0].puestosValida[0] == 'GERENTE DE EXPANSION') {

				$("#gerenteExpansionDiv").css("cursor", "pointer");
				$("#circuloAutorizaGerenteExpansion").addClass("circuloSeguimientoAprobado");

				var contentPopGerente = generaPopAutorizacion('Autorizaci??n Gerente de Expansi??n', AREAS[i].EXPANSION[0]);

				$("#gerenteExpansionSegPop").popover({
					html: true,
					content: contentPopGerente
				});

				if (AREAS[i].EXPANSION[0].diasVencidos > 0) {
					$("#gerenteExpansionImg").css("display", "inline");
				}
			} else if (AREAS[i].EXPANSION[0].puestosValida[0] == 'ANALISTA DE EXPANSION') {

				$("#expansionDiv").css("cursor", "pointer");
				$("#circuloAutorizaExpansion").addClass("circuloSeguimientoAprobado");

				var contentPopExpansion = generaPopAutorizacion('Autorizaci??n de Expansi??n', AREAS[i].EXPANSION[0]);

				$("#expansionSegPop").popover({
					html: true,
					content: contentPopExpansion
				});

				if (AREAS[i].EXPANSION[0].diasVencidos > 0) {
					$("#expansionImg").css("display", "inline");
				}
			}
		} else if (AREAS[i].GESTORIA != undefined &&
			AREAS[i].GESTORIA.length > 0) {


			$("#gestoriaDiv").css("cursor", "pointer");
			$("#circuloAutorizaGestoria").addClass("circuloSeguimientoAprobado");

			var contentPopGestoria = generaPopAutorizacion('Autorizaci??n Gestor??a', AREAS[i].GESTORIA[0]);

			$("#gestoriaSegPop").popover({
				html: true,
				content: contentPopGestoria
			});

			if (AREAS[i].GESTORIA[0].diasVencidos > 0) {
				$("#gestoriaImg").css("display", "inline");
			}

		} else if (AREAS[i].CONSTRUCCION != undefined &&
			AREAS[i].CONSTRUCCION.length > 0) {


			$("#construccionDiv").css("cursor", "pointer");
			$("#circuloAutorizaConstruccion").addClass("circuloSeguimientoAprobado");

			var contentPopConstruccion = generaPopAutorizacion('Autorizaci??n Construcci??n', AREAS[i].CONSTRUCCION[0]);

			$("#construccionSegPop").popover({
				html: true,
				content: contentPopConstruccion
			});

			if (AREAS[i].CONSTRUCCION[0].diasVencidos > 0) {
				$("#construccionImg").css("display", "inline");
			}

		} else if (AREAS[i].OPERACIONES != undefined &&
			AREAS[i].OPERACIONES.length > 0) {


			$("#operacionesDiv").css("cursor", "pointer");
			$("#circuloAutorizaOperaciones").addClass("circuloSeguimientoAprobado");

			var contentPopOperaciones = generaPopAutorizacion('Autorizaci??n Operaciones', AREAS[i].OPERACIONES[0]);

			$("#operacionesSegPop").popover({
				html: true,
				content: contentPopOperaciones
			});

			if (AREAS[i].OPERACIONES[0].diasVencidos > 0) {
				$("#operacionesImg").css("display", "inline");
			}

		} else if (AREAS[i].AUDITORIA != undefined &&
			AREAS[i].AUDITORIA.length > 0) {
			$("#auditoriaDiv").css("cursor", "pointer");
			$("#circuloAutorizaAuditoria").addClass("circuloSeguimientoAprobado");

			var contentPopAuditoria = generaPopAutorizacion('Autorizaci??n Auditoria', AREAS[i].AUDITORIA[0]);

			$("#auditoriaSegPop").popover({
				html: true,
				content: contentPopAuditoria
			});

			if (AREAS[i].AUDITORIA[0].diasVencidos > 0) {
				$("#auditoriaImg").css("display", "inline");
			}
		}

	}
}

function consultaGenMDNuevo(mdId, mapZona, markSitio) {
	cargaLoading();

	invocarJSONServiceAction("consulta_gen_md_nuevo",
		{ 'mdId': mdId },
		'obtieneGenMDNuevo',
		function () {
			//Funcion de error
			console.log("ERROR");
			cierraLoading();
		},
		function () {
			//Funci??n al finalizar
			cierraLoading();
		});
	obtieneGenMDNuevo = function (data) {

		$("#check-tdos-gen").prop("checked", false);
		$("#check-mercados").prop("checked", false);
		$("#check-escuela").prop("checked", false);
		$("#check-hospital").prop("checked", false);
		$("#check-templo").prop("checked", false);
		$("#check-ofGob").prop("checked", false);
		$("#check-tdos-ue").prop("checked", false);
		$("#check-panaderia").prop("checked", false);
		$("#check-tortilleria").prop("checked", false);
		$("#check-abarrotes").prop("checked", false);
		$("#check-carniceria").prop("checked", false);
		$("#check-recauderia").prop("checked", false);
		$("#check-polleria").prop("checked", false);
		$('#option-vista-a').prop("checked", true);

		$('#option-vista-a').unbind();
		$('#option-vista-b').unbind();
		$('#option-vista-c').unbind();
		$('#option-vista-a').click(function () { mostrarVistaSeccion(); });
		$('#option-vista-b').click(function () { mostrarVistaSeccion(); });
		$('#option-vista-c').click(function () { mostrarVistaSeccion(); });


		$("#contenido-vista-a").show();
		$("#contenido-vista-b").hide();
		$("#contenido-vista-c").hide();

		if (data.codigo != 200){
			$("#contenido-vista-b").append("<span class='negrita t14 subTitleInfo'>Sin informaci??n de Radio.</span>");
			$("#contenido-vista-c").append("<span class='negrita t14 subTitleInfo'>Sin informaci??n de Radio.</span>");
			$("#contenido-vista-b div").hide();
			$("#contenido-vista-c div").hide();
			return;
		}
			
		/**APPEND DIV TO FULL SCREEN MAP
		 * */

		$(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function () {
			var isFullScreen = document.fullScreen ||
				document.mozFullScreen ||
				document.webkitIsFullScreen;
			if (isFullScreen) {
				//console.log('fullscreen mode!');
				mapZona.controls[google.maps.ControlPosition.TOP_RIGHT].push($("#generadoresDivNew").get(0));
			} else {
				//console.log('not fullscreen mode!');
				var elem = mapZona.controls[google.maps.ControlPosition.TOP_RIGHT].pop();
				//console.log(elem);
				$(elem).removeAttr("style").prependTo("#generadoresMDContainerNew");
			}
		});


		/** Pintar otros MD y Tiendas */
		var otrosMdYTiendas = new Array();

		/**MDS */
		if (data.mds != undefined) {
			for (var i = 0; i < data.mds.length; i++) {
				otrosMdYTiendas.push(
					{
						position: new google.maps.LatLng(data.mds[i].latitud, data.mds[i].longitud),
						type: "mds",
						name: "MD "+data.mds[i].nombre,
						id: data.mds[i].mdId
					});
			}
		}
		/**Tiendas */
		if (data.tiendas != undefined) {
			for (var i = 0; i < data.tiendas.length; i++) {
				otrosMdYTiendas.push(
					{
						position: new google.maps.LatLng(data.tiendas[i].latitud, data.tiendas[i].longitud),
						type: "tdas",
						name: "Neto "+data.tiendas[i].nombre,
						id: data.tiendas[i].tiendaId
					});
			}
		}
		otrosMdYTiendas.forEach(function (obj, index) {
			var marker = new google.maps.Marker({
				position: obj.position,
				icon: iconMarkeGenerador[obj.type],
				title:  obj.name,
				map: mapZona
			});
			
			if(obj.type == "mds" &&  mdId != obj.id ){
				 marker.addListener("click",  function(){
					 obtieneDetalleMd(obj.name,obj.id);
				 });
			}
		});

		/* ==== GENERADORES ====*/

		$(".infoRadio").html(data.anillo + ' mts.');
		//$(".infoEstatus").html(data.anillo + ' mts.');
		//	$("#infoNoVisitas").html(data.visitasRadio);


		/* ==== GENERADORES ====*/


		for (dato in data.Totalgen) {
			if (data.Totalgen[dato].generadorId == "100001") { //iglesias
				$("#templos").html(data.Totalgen[dato].total);
			}
			if (data.Totalgen[dato].generadorId == "100002") {//Hospitales
				$("#hopitales").html(data.Totalgen[dato].total);
			}
			if (data.Totalgen[dato].generadorId == "100003") {//Escuelas
				$("#escuelas").html(data.Totalgen[dato].total);
			}
			if (data.Totalgen[dato].generadorId == "100004") {//Mercados
				$("#mercados").html(data.Totalgen[dato].total);
			}
			if (data.Totalgen[dato].generadorId == "100005") {//Of Gobierno
				$("#ofiGob").html(data.Totalgen[dato].total);
			}
			
			if (data.Totalgen[dato].generadorId == "100006") {//Of Gobierno
				$("#t-PANADERIA").html(data.Totalgen[dato].total);
			}
			
			if (data.Totalgen[dato].generadorId == "100007") {//Of Gobierno
				$("#t-TORTILLERIA").html(data.Totalgen[dato].total);
			}
			
			if (data.Totalgen[dato].generadorId == "100008") {//Of Gobierno
				$("#t-ABARROTES").html(data.Totalgen[dato].total);
			}
			
			if (data.Totalgen[dato].generadorId == "100009") {//Of Gobierno
				$("#t-CARNICERIA").html(data.Totalgen[dato].total);
			}
			
			if (data.Totalgen[dato].generadorId == "100010") {//Of Gobierno
				$("#t-POLLERIA").html(data.Totalgen[dato].total);
			}
			

			if (data.Totalgen[dato].generadorId == "100011") {//Of Gobierno
				$("#t-RECAUDERIAS").html(data.Totalgen[dato].total);
			}
			
		}
		var puntosGenNuevos = new Array();

		for (dto in data.generadores) {
			
			puntosGenNuevos.push(
				{
					generadorId: data.generadores[dto].generadorId,
					marker: new google.maps.Marker({
						position: new google.maps.LatLng(data.generadores[dto].latitud, data.generadores[dto].longitud),
						icon: iconMarkeGenerador[data.generadores[dto].generadorId],
					}),
					shown: false,
					rad: data.anillo,
					mark: markSitio
				});
		}
		
		
		/**
				puntosGenNuevos.forEach(function (feature) {
					var marker = new google.maps.Marker({
						position: feature.position,
						icon: iconMarkeGenerador[feature.type],
					});
				});
		 */
		/**
		 * Modificadores de marcadores en mapa
		 */
		setTimeout(function () {
			$("#check-mercados").unbind();
			$("#check-mercados").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100004);
			});

			$("#check-escuela").unbind();
			$("#check-escuela").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100003);
			});

			$("#check-hospital").unbind();
			$("#check-hospital").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;

				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100002);
			});

			$("#check-templo").unbind();
			$("#check-templo").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100001);
			});

			$("#check-ofGob").unbind();
			$("#check-ofGob").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100005);
			});


			$("#check-panaderia").unbind();
			$("#check-panaderia").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100006);
			});

			$("#check-tortilleria").unbind();
			$("#check-tortilleria").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100007);
			});

			$("#check-abarrotes").unbind();
			$("#check-abarrotes").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100008);
			});

			$("#check-carniceria").unbind();
			$("#check-carniceria").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100009);
			});


			$("#check-recauderia").unbind();
			$("#check-recauderia").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100011);
			});

			$("#check-polleria").unbind();
			$("#check-polleria").change(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100010);

			});

			$("#check-tdos-gen").unbind();
			$("#check-tdos-gen").click(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;

				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100004);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100003);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100002);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100001);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100005);


				$("#check-mercados").prop("checked", $(this).is(":checked"));
				$("#check-escuela").prop("checked", $(this).is(":checked"));
				$("#check-hospital").prop("checked", $(this).is(":checked"));
				$("#check-templo").prop("checked", $(this).is(":checked"));
				$("#check-ofGob").prop("checked", $(this).is(":checked"));


				pintaRadio(mapZona);
			});


			pintarGeneradoresFiltro(puntosGenNuevos, null, 100006);
			pintarGeneradoresFiltro(puntosGenNuevos, null, 100007);
			pintarGeneradoresFiltro(puntosGenNuevos, null, 100008);
			pintarGeneradoresFiltro(puntosGenNuevos, null, 100009);
			pintarGeneradoresFiltro(puntosGenNuevos, null, 100011);
			pintarGeneradoresFiltro(puntosGenNuevos, null, 100010);

			$("#check-tdos-ue").unbind();
			$("#check-tdos-ue").click(function () {
				var mapChecked = null;
				if ($(this).is(":checked"))
					mapChecked = mapZona;

				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100006);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100007);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100008);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100009);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100011);
				pintarGeneradoresFiltro(puntosGenNuevos, mapChecked, 100010);

				$("#check-panaderia").prop("checked", $(this).is(":checked"));
				$("#check-tortilleria").prop("checked", $(this).is(":checked"));
				$("#check-abarrotes").prop("checked", $(this).is(":checked"));
				$("#check-carniceria").prop("checked", $(this).is(":checked"));
				$("#check-recauderia").prop("checked", $(this).is(":checked"));
				$("#check-polleria").prop("checked", $(this).is(":checked"));
				
				
				pintaRadio(mapZona);
			});

		}, 250);

		/** Fin modificadores */

		var datosRadio = data.datosRadio[0];

		if (datosRadio != undefined) {

			/**
			 * Hoja 1 Zonificacion
			 */
			$("#edadMenor1").html(datosRadio.fcMenos26);
			$("#edadMenor2").html(datosRadio.fcDe26a30);
			$("#edadMenor3").html(datosRadio.fcDe31a40);
			$("#edadMenor4").html(datosRadio.fcDe41a50);
			$("#edadMenor5").html(datosRadio.fcDe51a60);
			$("#edadMenor6").html(datosRadio.fcMas60);


			$("#poblacion").html(datosRadio.fcPobTotal);
			$("#poblacionFlot").html(datosRadio.fcPobFlotante);
			$("#pea").html(datosRadio.fcPea);
			$("#hogares").html(datosRadio.fcTotalHogares);

			$("#bbb").html(datosRadio.fcBBB);
			$("#bae").html(datosRadio.fcBAE);
			$("#miba").html(datosRadio.fcMIBA);
			
			/**
			 * Hoja 2 Zonificacion
			 */
			$("#infoUrl").html("");
			$("#infoUrl").append("<a href='" + datosRadio.fcUrl + "' target='_blank'> " + datosRadio.fcUrl + "  </a>");
			//$("#infoCoordenadas").html(obj.lat+' , '+obj.lng);
			$("#infoCalle").html(datosRadio.fcCallePrincipal);
			$("#infoCalle1").html(datosRadio.fcCalle1);
			$("#infoCalle2").html(datosRadio.fcCalle2);

			$("#infoColonia").html(datosRadio.fcColonia);
			$("#infoMunicipio").html(datosRadio.fcMunicipio);

			ctx = document.getElementById('radar_ocupaciones').getContext('2d');

			if (chart != null) {
				chart.destroy();
			}

			setTimeout(function () {
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
							'Servidor p??blico',// 6
							'Empleado',   		// 7
							'Emprendedor', 	// 8
							'Estudiante', 		// 9
							'Jornalero',  		// 10  
							'Obrero',     		// 11
							'Jubilado',   		// 12
							'Otra',       		// 13
						],

						datasets: [{
							label: 'Ocupaci??n',
							backgroundColor: '#ffeb3b5c',
							borderColor: '#be8f00',
							borderWidth: 1,
							radius: 4,
							pointRadius: 3,
							pointBorderWidth: 2,
							pointBackgroundColor: "#FFC107",
							pointBorderColor: "rgba(200, 74, 0, 0.6)",
							pointHoverRadius: 10,
							data: [parseFloat(datosRadio.fcAmaDeCasa.replace(/,/g, '')), 		// 1
							parseFloat(datosRadio.fcEmpresario.replace(/,/g, '')), 		// 2
							parseFloat(datosRadio.fcDesempleado.replace(/,/g, '')), 		// 3
							parseFloat(datosRadio.fcProfesionista.replace(/,/g, '')),   	// 4
							parseFloat(datosRadio.fcEjidatario.replace(/,/g, '')), 		// 5
							parseFloat(datosRadio.fcServidorPublico.replace(/,/g, '')), 	// 6
							parseFloat(datosRadio.fcEmpleado.replace(/,/g, '')), 	// 7 
							parseFloat(datosRadio.fcTrabajoPorCuenta.replace(/,/g, '')),	// 8
							parseFloat(datosRadio.fcEstudiante.replace(/,/g, '')), 		// 9
							parseFloat(datosRadio.fcJornalero.replace(/,/g, '')),		// 10
							parseFloat(datosRadio.fcObrero.replace(/,/g, '')), 			// 11 
							parseFloat(datosRadio.fcJubilado.replace(/,/g, '')), 		// 12
							parseFloat(datosRadio.fcOtraOcupacion.replace(/,/g, '')), 	// 13
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
								fontSize: 11,
								fontColor: "white",
								backdropColor: "#000000",
							},
							pointLabels: {
								fontSize: 11,
								fontColor: "#FF5722"
							}
						},
						tooltips: {
							callbacks: {
								label: function (tooltipItem, data) {
									return " " + tooltipItem.yLabel;
								}
							}
						},
						legend: {
							display: false,
						}
					}
				});
			}, 200);

			/* ==== UNIDADES ECONOMICAS ====*/
			$("#alimentos").html(datosRadio.fcVentaAlimentos);
			$("#servicios").html(datosRadio.fcServicios);
			$("#artlsPersoHogar").html(datosRadio.fcVentaArticulos);




			/* ==== OCUPACIONES ====*/
			var array = new Array();
			array[0] = new Array();
			array[0][0] = formatMiles(datosRadio.fcAmaDeCasa);
			array[0][1] = "Ama de casa";

			array[1] = new Array();
			array[1][0] = formatMiles(datosRadio.fcDesempleado);
			array[1][1] = "Desempleado";

			array[2] = new Array();
			array[2][0] = formatMiles(datosRadio.fcEjidatario);
			array[2][1] = "Ejidatario";

			array[3] = new Array();
			array[3][0] = formatMiles(datosRadio.fcEmpleado);
			array[3][1] = "Empleado";

			array[4] = new Array();
			array[4][0] = formatMiles(datosRadio.fcEstudiante);
			array[4][1] = "Estudiante";

			array[5] = new Array();
			array[5][0] = formatMiles(datosRadio.fcJornalero);
			array[5][1] = "Jornalero";

			array[6] = new Array();
			array[6][0] = formatMiles(datosRadio.fcJubilado);
			array[6][1] = "Jubilado";

			array[7] = new Array();
			array[7][0] = formatMiles(datosRadio.fcObrero);
			array[7][1] = "Obrero";

			array[8] = new Array();
			array[8][0] = formatMiles(datosRadio.fcProfesionista);
			array[8][1] = "Profesionista";

			array[9] = new Array();
			array[9][0] = formatMiles(datosRadio.fcServidorPublico);
			array[9][1] = "Servidor p??blico";

			array[10] = new Array();
			array[10][0] = formatMiles(datosRadio.fcOtraOcupacion);
			array[10][1] = "Otra";

			array[11] = new Array();
			array[11][0] = formatMiles(datosRadio.fcTrabajoPorCuenta);
			array[11][1] = "Emprendedor";

			array[12] = new Array();
			array[12][0] = formatMiles(datosRadio.fcEmpresario);
			array[12][1] = "Empresario";
			array.sort(function (a, b) {
				return b[0] - a[0]
			});

			$("#list-empleos").html("");
			array.forEach(function (obj, i) {
				$("#list-empleos").append('<div class="col-6">' + obj[1] + ': 	<span> ' + numberWithCommas(obj[0]) + ' </span> </div>');
			});

		}
	};
}

function buscaDetalleMD(mdId) {
	cargaLoading();

	invocarJSONServiceAction("memoria_detalle_x_id",
		{ 'mdId': mdId },
		'obtieneDetalleMdResponse',
		function () {
			//Funcion de error

			cierraLoading();
		},
		function () {
			//Funci??n al finalizar

			cierraLoading();
		});

	obtieneDetalleMdResponse = function (data) {
		if (data.codigo != 200) {
			cargaMensajeModal('DETALLE MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, redireccionaAsignadas);
		} else {
			pintaFlujo(data);

			/* == VER BOTON LEVANTAMIENTO ==*/
			if (data.muestralevantamiento == 1) {
				$("#btnLevantamiento").show();
			}

			$("#botondescarga").click(function () {
				descargaExcel(data);
			});

			MOTIVOS_RECHAZO = {};
			ARCHIVOS_MD = new Array();

			parseaEstatus(data.estatusActuales);
			if (eval(data)["seguimiento"]["CARGA DOCUMENTOS EXPANSION"] != undefined) {
				//Obtiene el objeto con estatus = 1
				var doctoModifica = '';
				var array = eval(data)["seguimiento"]["CARGA DOCUMENTOS EXPANSION"];
				/*for(var i = 0; i < array.length; i++) {
					if(array[i].estatus == ESTATUS_DOCTO_AUTORIZADO) {
						doctoModifica = array[i];
						break;
					}
				}*/
				//Solo se enviara el objeto m??s actual
				if (array.length > 0) {
					agregaDoctos(array[0]);
				}
			}

			arrEstatusPermiso = new Array();

			$.each(data.estatusActuales, function () {
				arrEstatusPermiso[this.nivelEstatusId] = this.nivelEstatusId;
			});


			$("#mdIdAutorizacion").val(mdId);
			ESTATUS_FINALIZA_MD = -1;

			if (TIPOMD == DETALLE_MD_EDITAR && data.modulos != undefined) {
				inicializaModulosEdicion(data.modulos, data.datosSitio, data.datosPropietario, data.generalidades, data.superficie, data);
			}
			/* Datos de ??reas que ya han autorizado */
			if (data.areasAutorizadas != undefined && data.areasAutorizadas.length > 0) {
				dibujaAreasCompletadas(data.areasAutorizadas)
			}

			/* Datos generales de la MD */
			if (data.generales != undefined) {

				$("#nombreMd").val(data.generales.nombreMd);
				$("#nombreMdTxt").text(data.generales.nombreMd);
				$("#creadorMd").text(data.generales.creador);
				$("#categoriaMd").text(data.generales.categoria);
				estrella = "<img class='estrellaPuntuacionDetalle' src='img/estrella.svg'>";
				estrellag = "<img class='estrellaPuntuacionDetalle' style='width:30px;' src='img/estrella.svg'>";
				if (data.generales.categoria == 'A') {
					$("#estrellasMd").html(estrella + estrellag + estrella);
				} else if (data.generales.categoria == 'B') {
					$("#estrellasMd").html(estrella + estrella);
				} else {
					$("#estrellasMd").html(estrella);
				}
				var imagen_tipo;
				var simbolo = " puntos";
				if (data.generales.tipoUbicacion == "RURAL") {
					imagen_tipo = "<img src='img/generadores/w_rural.png'>";
					$("#tipoMdImagen").html(imagen_tipo);
					$("#tipoMdtexto").text(data.generales.tipoUbicacion);
					$('#tipoMdTitulo').show();
					simbolo = "%";
				}
				else if (data.generales.tipoUbicacion == "CIUDAD") {
					imagen_tipo = "<img src='img/generadores/w_ciudad.png'>";
					$("#tipoMdImagen").html(imagen_tipo);
					$("#tipoMdtexto").text(data.generales.tipoUbicacion);
					$('#tipoMdTitulo').show();
					simbolo = "%";
				}

				$("#fechaCreacion").text(data.generales.fechaCreacion);
				$("#puntuacionMd").text(data.generales.totalPuntos + simbolo);
			}
			/* Datos del sitio  linea 663*/
			if (data.datosSitio != undefined) {
				$("#direccion").text(data.datosSitio.direccion);
				/*$("#calleMd").text(data.datosSitio.calle);
				$("#coloniaMd").text(data.datosSitio.colonia);
				$("#municipioMd").text(data.datosSitio.municipio);
				$("#ciudadMd").text(data.datosSitio.ciudad);
				$("#estadoMd").text(data.datosSitio.estado);
				$("#codiPostalMd").text(data.datosSitio.codigoPostal);*/


				/* Datos del propietario */
				$("#propietarioId").text(data.datosPropietario.propietarioId);
				$("#nombrePropietario").text(data.datosPropietario.nombre);
				$("#telefonoPropietario").text(data.datosPropietario.telefono);
				$("#emailPropietario").text(data.datosPropietario.email);
				if (data.datosPropietario.rentaNeto) {
					$("#rentaANeto").text("YA RENTA A NETO");
				} else {
					$("#rentaANeto").text("NO RENTA A NETO A??N");
				}
			}

			/* Datos del scorecard*/
			if (data.score != undefined) {
				if (data.score.tipoScore != undefined && data.score.tipoScore == SCORE_ANTERIOR) {
					$("#scoreSpan1").hide();
					$("#div_score2").hide();
					var nombres = new Array();
					var valoresObjetivo = new Array();
					var valoresReales = new Array();

					if (data.score.factores != undefined && data.score.factores.length > 0) {
						for (var i = 0; i < data.score.factores.length; i++) {
							nombres.push(data.score.factores[i].nombrenivel);
							valoresObjetivo.push(data.score.factores[i].totalxfactor);
							valoresReales.push(data.score.factores[i].puntuacion);
						}
						cargaPuntuacion(nombres, valoresObjetivo, valoresReales);
					}
				} else if (data.score.tipoScore != undefined && data.score.tipoScore == SCORE_NUEVO) {
					$("#scoreSpan1").text("Macro ubicaci??n");
					$("#scoreSpan2").text("Micro ubicaci??n");
					$('.slick_main').slick({
						dots: true,
						infinite: true,
						speed: 500,
						slidesToShow: 1,
						slidesToScroll: 1
					});

					var nombresMicro = new Array();
					var valoresObjetivoMicro = new Array();
					var valoresRealesMicro = new Array();
					var nombresMacro = ['', '', '', '', '', '', '', ''];
					var valoresObjetivoMacro = [0, 0, 0, 0, 0, 0, 0, 0];
					var valoresRealesMacro = [0, 0, 0, 0, 0, 0, 0, 0];

					if (data.score.factores != undefined && data.score.factores.length > 0) {
						var posicion = 0;
						for (var i = 0; i < data.score.factores.length; i++) {
							if (data.score.factores[i].rangoubica != undefined && data.score.factores[i].rangoubica.indexOf("MICRO") != -1) {
								var nombre = "";
								if (data.score.factores[i].nombrenivel.length > 20) {
									nombre = data.score.factores[i].nombrenivel.substring(0, 20) + "...";
								} else {
									nombre = data.score.factores[i].nombrenivel;
								}
								nombresMicro.push(data.score.factores[i].nombrenivel);
								valoresObjetivoMicro.push(data.score.factores[i].totalxfactor);
								valoresRealesMicro.push(data.score.factores[i].puntuacion);
							} else if (data.score.factores[i].rangoubica != undefined && data.score.factores[i].rangoubica.indexOf("MACRO") != -1) {
								nombresMacro[posicion] = data.score.factores[i].nombrenivel;
								valoresObjetivoMacro[posicion] = data.score.factores[i].totalxfactor;
								valoresRealesMacro[posicion] = data.score.factores[i].puntuacion;
								posicion++;
							}
						}
					}
					cargaMicroUbicacion(nombresMicro, valoresObjetivoMicro, valoresRealesMicro);
					cargaMacroUbicacion(nombresMacro, valoresObjetivoMacro, valoresRealesMacro);
				}
			}

			/* Datos del radio asignado */
			if (data.radioAsignado != undefined) {
				radioAsignado = data.radioAsignado;
			}


			/* Datos de la superficie */
			if (data.superficie != undefined) {
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

				if (data.superficie.entorno1 != undefined && data.superficie.entorno1 != "") {
					$("#vistaEntorno1Md").attr("src", data.superficie.entorno1);
					$("#fechaVistaEntorno1").text(data.superficie.fechaEnt1);
					$("#horaVistaEntorno1").text(data.superficie.horaEnt1);
				} else {
					$("#vistaEntorno1Md").attr("src", "img/no_imagen.png");
					$("#fechaVistaEntorno1").text("---");
					$("#horaVistaEntorno1").text("---");
				}

				if (data.superficie.entorno2 != undefined && data.superficie.entorno2 != "") {
					$("#vistaEntorno2Md").attr("src", data.superficie.entorno2);
					$("#fechaVistaEntorno2").text(data.superficie.fechaEnt2);
					$("#horaVistaEntorno2").text(data.superficie.horaEnt2);
				} else {
					$("#vistaEntorno2Md").attr("src", "img/no_imagen.png");
					$("#fechaVistaEntorno2").text("---");
					$("#horaVistaEntorno2").text("---");
				}

				if (data.superficie.entorno3 != undefined && data.superficie.entorno3 != "") {
					$("#vistaEntorno3Md").attr("src", data.superficie.entorno3);
					$("#fechaVistaEntorno3").text(data.superficie.fechaEnt3);
					$("#horaVistaEntorno3").text(data.superficie.horaEnt3);
				} else {
					$("#vistaEntorno3Md").attr("src", "img/no_imagen.png");
					$("#fechaVistaEntorno3").text("---");
					$("#horaVistaEntorno3").text("---");
				}

				//predial
				//				if(data.superficie.predial != undefined && data.superficie.predial.trim() != "") {
				//					$("#muestraPredial").show();
				//					predialImg = data.superficie.predial;
				//					fechaPredial = data.superficie.fechaPredial + " " + data.superficie.horaPredial;
				//				} else {
				$("#muestraPredial").hide();
				//				}

				//nuevos valores
				if (data.superficie.esquina == true) {
					$('#esquina').prop('checked', true);
				}
				if (data.superficie.drenaje != undefined && data.superficie.drenaje) {
					$("#drenaje").html("SITIO CON DRENAJE");
				} else {
					$("#drenaje").html("SITIO SIN DRENAJE");
				}
				var contentPopSuperficie = '<div class="row" style="padding-top:3px;">' +
					'<div class="col-6"><span class="t14 blanco">Frente m??nimo:</span></div>' +
					'<div class="col-6"><span class="t14 blanco negrita">' + data.superficie.frente + ' mts</span></div>' +
					'<div class="col-6 padd"><span class="t14 blanco">Profundidad m??nima:</span></div>' +
					'<div class="col-6 padd"><span class="t14 blanco negrita">' + data.superficie.profundidad + ' mts</span></div>' +
					'<div class="col-6 padd"><span class="t14 blanco">Total m??nimo:</span></div>' +
					'<div class="col-6 padd"><span class="t14 blanco negrita">' + data.superficie.total + 'mts<sup>2</sup></span></div>' +
					'</div>';

				$("#superficieTip").popover({
					html: true,
					content: contentPopSuperficie
				});
			}
			/* Datos de la zonificaci??n */
			if (data.zonificacion != undefined) {
				$("#puntosZonificacion").text(data.zonificacion.puntos);
				var listaCompetencias = data.zonificacion.competencias;
				var listaGeneradores = data.zonificacion.generadores;

				var netoTotal = 0;
				var tresBTotal = 0;
				var oxxoTotal = 0;
				var expressTotal = 0;
				var otrosCTotal = 0;
				var iglesiaTotal = 0;
				var mercadoTotal = 0;
				var escuelaTotal = 0;
				var paradaTotal = 0;
				var metroTotal = 0;
				var otrosGTotal = 0;
				var recauderiaTotal = 0;
				var comidaTotal = 0;
				var tianguisTotal = 0;
				var tortilleriaTotal = 0;
				var carniceriaTotal = 0;

				for (var i = 0; i < listaCompetencias.length; i++) {
					switch (listaCompetencias[i].competenciaId) {
						case 1:
							tresBTotal++;
							break;
						case 2:
							oxxoTotal++;
							break;
						case 3:
							expressTotal++;
							break;
						case 4:
							otrosCTotal++;
							break;
						case 10:
							netoTotal++;
							break;
					};
				}

				for (var i = 0; i < listaGeneradores.length; i++) {
					switch (listaGeneradores[i].generadorId) {
						case 5:
							iglesiaTotal++;
							break;
						case 6:
							mercadoTotal++;
							break;
						case 7:
							escuelaTotal++;
							break;
						case 8:
							paradaTotal++;
							break;
						case 9:
							otrosGTotal++;
							break;
						case 11:
							recauderiaTotal++;
							break;
						case 12:
							comidaTotal++;
							break;
						case 14:
							tianguisTotal++;
							break;
						case 15:
							tortilleriaTotal++;
							break;
						case 16:
							carniceriaTotal++;
							break;
						case 17:
							metroTotal++;
							break;
					}
				}

				$("#netoTotal").text(formato(netoTotal, true));
				$("#tresBTotal").text(formato(tresBTotal, true));
				$("#oxxoTotal").text(formato(oxxoTotal, true));
				$("#expressTotal").text(formato(expressTotal, true));
				$("#otrosCTotal").text(formato(otrosCTotal, true));
				$("#iglesiaTotal").text(formato(iglesiaTotal, true));
				$("#mercadoTotal").text(formato(mercadoTotal, true));
				$("#escuelaTotal").text(formato(escuelaTotal, true));
				$("#paradaTotal").text(formato(paradaTotal, true));
				$("#metroTotal").text(formato(metroTotal, true));
				$("#otrosGTotal").text(formato(otrosGTotal, true));
				$("#recauderiaTotal").text(formato(recauderiaTotal, true));
				$("#comidaTotal").text(formato(comidaTotal, true));
				$("#tianguisTotal").text(formato(tianguisTotal, true));
				$("#tortilleriaTotal").text(formato(tortilleriaTotal, true));
				$("#carniceriaTotal").text(formato(carniceriaTotal, true));


				var contentPopZonificacion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 14px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
				if (data.zonificacion.tips != undefined && data.zonificacion.tips.length > 0) {
					contentPopZonificacion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 14px;">' + data.zonificacion.tips[0] + '</span></div></div>';
				}
				$("#zonificacionTip").popover({
					html: true,
					content: contentPopZonificacion
				});

			}
			/* Datos de la construcci??n */
			if (data.construccion != undefined && data.construccion.factores.EXPANSION != undefined) {
				var htmlFactores = "";
				var condicionesGeneralesLocal = "";
				var htmlChecklist = "";
				var generalidades_checkList = "";
				if (data.construccion.factores.EXPANSION.length > 0) {
					for (var i = 0; i < data.construccion.factores.EXPANSION.length; i++) {
						if (data.construccion.factores.EXPANSION[i].nivelId > 2
							&& data.construccion.factores.EXPANSION[i].nivelId < 6) {
							condicionesGeneralesLocal = data.construccion.factores.EXPANSION[i].nombreFactor
						} else {
							if (data.construccion.factores.EXPANSION[i].nivelId < 6) {
								htmlFactores += '<img style="padding-left: 10px;" src="img/icono_factor.png"/><span class="contenido_cajas_20 sangria_cuerpo">' +
									data.construccion.factores.EXPANSION[i].nombreFactor + '</span><br/><div style="overflow-y: auto;">';

								if (data.construccion.factores.EXPANSION[i].subfactores != undefined)
									for (var j = 0; j < data.construccion.factores.EXPANSION[i].subfactores.length; j++) {
										var imgSubfactor = "";

										switch (data.construccion.factores.EXPANSION[i].subfactores[j].subFactorId) {
											case 1:
												imgSubfactor = '<img class="sangria_cuerpo" src="img/subfactores/local_bodega.svg" style="width: 40px;"/>';
												break;
											case 2:
												imgSubfactor = '<img class="sangria_cuerpo" src="img/subfactores/acceso_cd.svg" style="width: 40px;"/>';
												break;
											case 3:
												imgSubfactor = '<img class="sangria_cuerpo" src="img/subfactores/sin_goteras.svg" style="width: 40px;"/>';
												break;
											case 4:
												imgSubfactor = '<img class="sangria_cuerpo" src="img/subfactores/sin_grietas.svg" style="width: 40px;"/>';
												break;
										};
										htmlFactores += '<div class="subfactores_20">' + imgSubfactor + '<br/><span class="contenido_subfactores_20 sangria_cuerpo">' + data.construccion.factores.EXPANSION[i].subfactores[j].nombre + '</span></div>';
									}
								htmlFactores += "</div>";
							}
							if (data.construccion.factores.EXPANSION[i].nivelId >= 6 && data.construccion.factores.EXPANSION[i].nivelId <= 13) {
								var check = "";
								var descCheck = "";
								var conflicto = "";
								if (data.construccion.factores.EXPANSION[i].valor == '1') {
									check = '???';
									descCheck = 'si';
								} else {
									check = '???';
									descCheck = 'no';
								}
								if (data.construccion.factores.EXPANSION[i].nivelId == 13 && data.construccion.factores.EXPANSION[i].subfactores != undefined
									&& data.construccion.factores.EXPANSION[i].subfactores.length > 0) {
									conflicto = "(" + data.construccion.factores.EXPANSION[i].subfactores[0].comentario + ")";
								} else {
									conflicto = "";
								}
								htmlChecklist += '<div class="row">' +
									'<span class="contenido_cajas_20 ">' + check + " " + data.construccion.factores.EXPANSION[i].nombreFactor + " " + conflicto + '</span>' +
									'</div>';
								generalidades_checkList += descCheck + " " + data.construccion.factores.EXPANSION[i].nombreFactor + " " + conflicto + ",";
							}
						}
					}
					$("#factoresConstruccion").html(htmlFactores);
					$("#checklistSitio").html(htmlChecklist);
					$("#generalidades_checkList").val(generalidades_checkList);
					$("#condicionesGeneralesEstatus").html('<img style="padding-right: 10px;" src="img/icono_factor.png"/>' + condicionesGeneralesLocal);
					$("#puntosConstruccion").text(data.construccion.puntos);
				} else {
					$("#factoresConstruccion").html('<span class="subtituloDetalleMd sangria_doble_cuerpo" style="color: #FF0000;">Sin resultados</span>');
					$("#condicionesGeneralesEstatus").text('---');
					$("#puntosConstruccion").text("---");
				}

				var contentPopConstruccion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 14px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
				if (data.construccion.tips != undefined && data.construccion.tips.length > 0) {
					contentPopConstruccion = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 14px;">' + data.construccion.tips[0] + '</span></div></div>';
				}
				$("#construccionTip").popover({
					html: true,
					content: contentPopConstruccion
				});

			}
			/* Datos de las generalidades del sitio */
			if (data.generalidades != undefined) {
				$("#montoRenta").text('$' + formatear(data.generalidades.renta, true) + " al mes");
				$("#disponibilidad").html(data.generalidades.disponibilidad + "<br>" + data.generalidades.fechaDisponibilidad);
				$("#amortizacion").text('$' + formatear(data.generalidades.porcentajeAmortizacion, true) + " MXN");
				$("#tiempoAmortizacion").text(data.generalidades.periodoAmortizacion);
				$("#periodoGracia").text(data.generalidades.periodoGracia);
				$("#puntosGeneralidades").text(data.generalidades.puntos);

				var contentPopGeneralidades = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 14px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
				if (data.generalidades.tips != undefined && data.generalidades.tips.length > 0) {
					contentPopGeneralidades = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 14px;">' + data.generalidades.tips[0] + '</span></div></div>';
				}
				$("#generalidadesTip").popover({
					html: true,
					content: contentPopGeneralidades
				});

			}
			/* Datos de los conteos */
			if (data.flujoPeatonal != undefined) {
				datosFlujoPeatonal(data.flujoPeatonal);
			}

			setTimeout(function () {
				initMap(Number(data.generales.latitud), Number(data.generales.longitud), listaCompetencias, listaGeneradores);
			}, 500);

			/* DATOS Seguimiento */

			if (data.seguimiento != undefined) {
				documentacion(data);
			}

			validaAutorizacion();
			autorizaDuplica();
		}
	}
}

function datosFlujoPeatonal(flujoPeatonal) {
	var rows = [[null]];
	var colores = [];
	var coloresPredeterminados = ['#40bcd8', '#a8ddd1', '#a3daff', '#a3ffcc'];
	var colorPromedio = '#d8b4e0';
	var horarios = {};
	var sumatoriaConteos = 0;
	var totalconteos = 0;
	var promedio;

	var sumatoriaConteosAud = 0;
	var totalconteosAud = 0;
	var promedioAud;

	if (flujoPeatonal.EXPANSION != undefined) {

		$("#puntosConteos").text(flujoPeatonal.EXPANSION.puntos);

		var contentPopConteos = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 14px;">Agrega tips para que tus buscadores encuentren sitios mejores</span></div></div>';
		if (flujoPeatonal.EXPANSION.tips != undefined && flujoPeatonal.EXPANSION.tips.length > 0) {
			contentPopConteos = '<div><div style="width: 100%; position: relative: float: left;text-align: center;"><span style="color: #FFF;font-size: 14px;">' + flujoPeatonal.EXPANSION.tips[0] + '</span></div></div>';
		}
		$("#conteosTip").popover({
			html: true,
			content: contentPopConteos
		});

		for (var i = 0; i < flujoPeatonal.EXPANSION.conteos.length; i++) {
			id = flujoPeatonal.EXPANSION.conteos[i].detalleId;

			if (horarios[id] == undefined) {
				horarios[id] = new Array();
				horarios[id].push(flujoPeatonal.EXPANSION.conteos[i].horaInicio
					+ "-" + flujoPeatonal.EXPANSION.conteos[i].horaFinal);

				HORAI = flujoPeatonal.EXPANSION.conteos[i].horaInicio;
				HORAF = flujoPeatonal.EXPANSION.conteos[i].horaFinal;
			}
			horarios[id].push(flujoPeatonal.EXPANSION.conteos[i].total);
			sumatoriaConteos += flujoPeatonal.EXPANSION.conteos[i].total;
			totalconteos++;
		}
	}

	if (Object.size(horarios) > 0) {
		i = 0;
		for (h in horarios) {
			rows.push(horarios[h])
			colores.push(coloresPredeterminados[i])
			i++;
		}

		promedio = Math.trunc(sumatoriaConteos / totalconteos);
		rows.push(['Promedio', promedio]);
		colores.push(colorPromedio);
		$("#promedioConteos").text(promedio);

		cargaFlujoPeatonal(colores, rows);
	}

	if (flujoPeatonal.AUDITORIA != undefined) {
		for (var i = 0; i < flujoPeatonal.AUDITORIA.conteos.length; i++) {
			sumatoriaConteosAud += flujoPeatonal.AUDITORIA.conteos[i].total;
			totalconteosAud++;
		}

		promedioAud = Math.trunc(sumatoriaConteosAud / totalconteosAud);
		$("#promedioConteosAuditoria").text(promedioAud);
	}

	if (AREA_USUARIO != areaAuditoria)
		$('#posConteos').show();

}

function muestraGeneradores() {
	$("#btonEsconderGeneradores").show();
	$("#divNegociosHeader").hide();
	$("#divNegocios").slideToggle();
	
}

function escondeGeneradores() {
	$("#divNegocios").slideToggle();
	$("#divNegociosHeader").show();
	$("#btonEsconderGeneradores").hide();
}

function muestraPopAutorizacion() {
	$("#modal_autorizacion").modal("show");
}

function cargaMacroUbicacion(nombres, objetivo, reales) {
	Highcharts.chart('macroUbicacionChart', {

		chart: {
			polar: true,
			type: 'area',
			spacingTop: -60,
			spacingBottom: -70,
		},

		title: {
			text: null
		},

		pane: {
			size: '80%'
		},

		xAxis: {
			categories: nombres,
			tickmarkPlacement: 'on',
			lineWidth: 0
		},

		yAxis: {
			gridLineInterpolation: 'polygon',
			lineWidth: 0,
			min: 0
		},

		tooltip: {
			shared: true,
			pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.1f} %</b><br/>'
		},

		legend: {
			align: 'top',
			verticalAlign: 'top',
			y: 55,
			x: 150,
			layout: 'horizontal',
			itemStyle: {
				fontSize: '10px',
				color: '#717171'
			}
		},

		series: [{
			name: 'Objetivo',
			data: objetivo,
			pointPlacement: 'on',
			color: '#40BCD8'
		}, {
			name: 'Real',
			data: reales,
			pointPlacement: 'on',
			color: '#536379'
		}]

	});
}

function cargaMicroUbicacion(nombres, objetivo, reales) {
	Highcharts.chart('microUbicacionChart', {

		chart: {
			polar: true,
			type: 'area',
			spacingTop: -60,
			spacingBottom: -60
		},

		title: {
			text: null
		},

		pane: {
			size: '75%'
		},

		xAxis: {
			categories: nombres,
			tickmarkPlacement: 'on',
			lineWidth: 0
		},

		yAxis: {
			gridLineInterpolation: 'polygon',
			lineWidth: 0,
			min: 0
		},

		tooltip: {
			shared: true,
			pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.1f} %</b><br/>'
		},

		legend: {
			align: 'top',
			verticalAlign: 'top',
			y: 55,
			x: 150,
			layout: 'horizontal',
			itemStyle: {
				fontSize: '10px',
				color: '#717171'
			}
		},

		series: [{
			name: 'Objetivo',
			data: objetivo,
			pointPlacement: 'on',
			color: '#40BCD8'
		}, {
			name: 'Real',
			data: reales,
			pointPlacement: 'on',
			color: '#536379'
		}]

	});
}

function cargaPuntuacion(nombres, objetivo, reales) {
	Highcharts.chart('macroUbicacionChart', {

		chart: {
			polar: true,
			type: 'area',
			spacingTop: 20,
			spacingBottom: 0,
			height: 300
		},

		title: {
			text: null
		},

		pane: {
			size: '80%'
		},

		xAxis: {
			categories: nombres,
			tickmarkPlacement: 'on',
			lineWidth: 0
		},

		yAxis: {
			gridLineInterpolation: 'polygon',
			lineWidth: 0,
			min: 0
		},

		tooltip: {
			shared: true,
			pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f} puntos</b><br/>'
		},

		legend: {
			align: 'top',
			verticalAlign: 'top',
			y: -20,
			x: 150,
			layout: 'horizontal',
			itemStyle: {
				fontSize: '10px',
				color: '#717171'
			}
		},

		series: [{
			name: 'Objetivo',
			data: objetivo,
			pointPlacement: 'on',
			color: '#40BCD8'
		}, {
			name: 'Real',
			data: reales,
			pointPlacement: 'on',
			color: '#536379'
		}]

	});
}

function cargaFlujoPeatonal(colores, rows) {
	Highcharts.chart('contenedorFlujoPeatonal', {
		chart: {
			type: 'column',
			backgroundColor: '#FFF',
			height: 280
		},
		legend: false,
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
			}, series: {
				colorByPoint: true
			}
		},
		data: {
			rows: rows
		}
	});
}

function initMap(latitudSitio, longitudSitio, listaCompetencias, listaGeneradores) {
	var myLatLng = { lat: latitudSitio, lng: longitudSitio };

	var iconos = {
		"sitio": {
			icon: 'img/localizador/icon_md.png'
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
			icon: 'img/competencia/icono_otros_2_c.png'
		},
		"5": {
			icon: 'img/generadores/iglesia_c.png'
		},
		"6": {
			icon: 'img/generadores/mercado_c.png'
		},
		"7": {
			icon: 'img/generadores/escuela_c.png'
		},
		"8": {
			icon: 'img/generadores/parada_c.png'
		},
		"9": {
			icon: 'img/generadores/icono_otros_generadores_c.png'
		},
		"10": {
			//icon: 'img/localizador/tiendaNeto.png' //competencia tienda neto icon: 'img/MD.png'
				icon: "img/competencia/w_neto.png", // url
		},
		"11": {
			icon: 'img/generadores/recauderia_c.png'
		},
		"12": {
			icon: 'img/generadores/negociocomida_c.png'
		},
		"14": {
			icon: 'img/generadores/tianguis_c.png'
		},
		"15": {
			icon: 'img/generadores/tortilleria_c.png'
		},
		"16": {
			icon: 'img/generadores/carniceria_c.png'
		},
		"17": {
			icon: 'img/generadores/w_metro_c.png'
		}


	};



	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: myLatLng
	});

	var marker = new google.maps.Marker({
		position: myLatLng,
		icon: 'img/MD.png',
		map: map,
		title: ''
	});

	var puntosZonificacion = new Array();

	if (listaCompetencias != undefined) {
		for (var i = 0; i < listaCompetencias.length; i++) {
			puntosZonificacion.push(
				{
					position: new google.maps.LatLng(listaCompetencias[i].latitud, listaCompetencias[i].longitud),
					type: listaCompetencias[i].competenciaId
				});
		}
	}

	if (listaGeneradores != undefined) {
		var negocios = 0;
		var negocios_comida = 0;

		for (var i = 0; i < listaGeneradores.length; i++) {
			puntosZonificacion.push(
				{
					position: new google.maps.LatLng(listaGeneradores[i].latitud, listaGeneradores[i].longitud),
					type: listaGeneradores[i].generadorId
				});

			if (listaGeneradores[i].nombre == "NEGOCIO") {
				negocios++;
			}
			else if (listaGeneradores[i].nombre == "NEGOCIO COMIDA") {
				negocios_comida++;
			}
		}

		$("#negocios").text(negocios);
		$("#negocios_comida").text(negocios_comida);
	}
	var markSitio = new google.maps.LatLng(latitudSitio, longitudSitio);
	puntosZonificacion.push(
		{
			position: markSitio,
			type: 'sitio'
		});

	var mapZonificacion = new google.maps.Map(document.getElementById('mapaZonificacion'), {
		zoom: 16,
		center: myLatLng
	});

	MAPZONIFICACION_RADIOS = mapZonificacion;
	
	puntosZonificacion.forEach(function (feature) {
		if(feature.type == "sitio")
			var icon_ = {
			    url:  iconos[feature.type].icon, // url
			    //scaledSize: new google.maps.Size(25, 35), // scaled size
			    scaledSize: new google.maps.Size(33, 32), // scaled size
			};
		else	
			var icon_ = {
				    url:  iconos[feature.type].icon, // url
				    scaledSize: new google.maps.Size(25, 25), // scaled size
				};
		
		
		
		var marker = new google.maps.Marker({
			position: feature.position,
			icon: icon_,
			map: mapZonificacion
		});
	});

	consultaGenMDNuevo($("#mdId").val(), mapZonificacion, markSitio);

}


/********************************** Funciones para editar ********************************/
function cambiaDisponibilidad() {
	if ($("#disponibilidadText").val() == 3) {
		$("#disponibilidadFechaText").show();
	} else {
		$("#disponibilidadFechaText").hide();
	}
}

function editaPantalla(pantalla, o) {
	switch (pantalla) {
		case 1:
			cargaMensajeModal('EDITA MD', "??Est??s seguro de modificar los datos del Sitio?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_EXITO, editaDatosSitioAction);
			break;
		case 2:
			cargaMensajeModal('EDITA MD', "??Est??s seguro de modificar los datos del propietario?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_EXITO, editaPropietarioAction);
			break;
		case 3:
			cargaMensajeModal('EDITA MD', "??Est??s seguro de modificar los datos de superficie?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_EXITO, editaSuperficieAction);
			break;
		case 6:
			cargaMensajeModal('EDITA MD', "??Est??s seguro de modificar las generalidades del sitio?", TIPO_MENSAJE_SI_NO, TIPO_ESTATUS_EXITO, editaGeneralidadesAction);
			break;
	}
}

function editaDatosSitioAction() {
	guardaNuevoCreador();
	/*var municipio="";
	if($("#municipioMdText").val()!=null){
		municipio=$("#municipioMdText").val();
	}*/
	var mdId = $("#mdId").val();
	invocarJSONServiceAction("edita_md_datos_sitio",
		{
			'creador': $("#listaCreadores").val(),
			'nombreSitio': $("#nombreMd").val(),
			'mdId': mdId,
			'latitud': "",
			'longitud': "",
			'direccion': $("#direccionText").val()
			/*
			'calle': $("#calleMdText").val(),
			'colonia': $("#coloniaMdText").val(),
			'ciudad': $("#ciudadMdText").val(),
			'estado': $("#estadoMdText").val(),
			'codigoPostal': $("#codigoPostalMdText").val(),
			'municipio': municipio*/
		},
		'editaMdResponse',
		function () {
			//Funcion de error

			cierraLoading();
		},
		function () {
			//Funci??n al finalizar

			cierraLoading();
		});

	editaMdResponse = function (data) {
		if (data.codigo != 200) {
			cargaMensajeModal('EDITA MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		} else {
			cargaMensajeModal('EDITA MD', "Datos modificados con ??xito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
		}
	}
}
function guardaNuevoCreador() {
	/*var municipio="";
	if($("#municipioMdText").val()!=null){
		municipio=$("#municipioMdText").val();
	}*/
	var mdId = $("#mdId").val();
	invocarJSONServiceAction("guardaCreador",
		{
			'creador': $("#listaCreadores").val(),
			'mdId': mdId
		},
		'guardaCreadorResponse',
		function () {
			//Funcion de error

			cierraLoading();
		},
		function () {
			//Funci??n al finalizar

			cierraLoading();
		});

	guardaCreadorResponse = function (data) {
		if (data.codigo != 200) {
			cargaMensajeModal('EDITA MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		} else {
			cargaMensajeModal('EDITA MD', "Datos modificados con ??xito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
		}
	}
}

function editaPropietarioAction() {
	var mdId = $("#mdId").val();
	invocarJSONServiceAction("edita_md_datos_propietario",
		{
			'mdId': mdId,
			'nombrePropietario': $("#nombrePropietarioText").val(),
			'apaternoPropietario': $("#apaternoPropietarioText").val(),
			'amaternoPropietario': $("#amaternoPropietarioText").val(),
			'telefono': $("#telefonoPropietarioText").val(),
			'email': $("#emailPropietarioText").val()
		},
		'editaPropietarioResponse',
		function () {
			//Funcion de error

			cierraLoading();
		},
		function () {
			//Funci??n al finalizar

			cierraLoading();
		});

	editaPropietarioResponse = function (data) {
		if (data.codigo != 200) {
			cargaMensajeModal('EDITA MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		} else {
			editaDatosSitioAction();
		}
	}
}

function editaSuperficieAction() {
	var esquina;

	if ($("#esquina_edit").prop('checked') == true) {
		esquina = "1";
	} else {
		esquina = "0";
	}

	var mdId = $("#mdId").val();
	invocarJSONServiceAction("edita_md_superficie",
		{
			'mdId': mdId,
			'esquina': esquina,
			'frenteMd': $("#frenteMd").val(),
			'profundidadMd': $("#profundidadMd").val()
		},
		'editaPropietarioResponse',
		function () {
			//Funcion de error

			cierraLoading();
		},
		function () {
			//Funci??n al finalizar

			cierraLoading();
		});

	editaPropietarioResponse = function (data) {
		if (data.codigo != 200) {
			cargaMensajeModal('EDITA MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		} else {
			cargaMensajeModal('EDITA MD', "Datos modificados con ??xito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
		}
	}
}

function editaGeneralidadesAction() {
	var mdId = $("#mdId").val();

	if ($("#disponibilidadText").val() == 2 && $("#disponibilidadFechaText").val() == "") {
		cargaMensajeModal('EDITA MD', "Debes capturar una fecha para la disponibilidad", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	} else {
		invocarJSONServiceAction("edita_md_generalidades",
			{
				'mdId': mdId,
				'renta': $("#montoRentaText").val(),
				'disponibilidad': $("#disponibilidadText").val(),
				'fechadisponible': $("#disponibilidadFechaText").val(),
				'montoamortiza': $("#amortizacionText").val(),
				'periodoamortizacion': $("#tiempoAmortizacionText").val(),
				'periodogracia': $("#periodoGraciaText").val()
			},
			'editaGeneralidadesResponse',
			function () {
				//Funcion de error

				cierraLoading();
			},
			function () {
				//Funci??n al finalizar

				cierraLoading();
			});

		editaGeneralidadesResponse = function (data) {
			if (data.codigo != 200) {
				cargaMensajeModal('EDITA MD', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			} else {
				cargaMensajeModal('EDITA MD', "Datos modificados con ??xito", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
			}
		}
	}
}

var tama??o = 60;
var grados = 0;
function rotar(valor) {
	if (valor == 0) {
		grados = grados - 90;
		$('#imageModal').css('-webkit-transform', 'rotate(' + grados + 'deg)');
	}
	if (valor == 1) {
		grados = grados + 90;
		$('#imageModal').css('-webkit-transform', 'rotate(' + grados + 'deg)');
	}
	if (valor == 2) { //imagen en posicion inicial
		grados = 0;
		$('#imageModal').css('-webkit-transform', 'rotate(' + grados + 'deg)');
	}
	if (valor == 3) {
		if (tama??o < 140) {
			tama??o = tama??o + 20;
		}
		$('#imageModal').css('width', tama??o + '%');
	}
	if (valor == 4) {
		if (tama??o > 60) {
			tama??o = tama??o - 20;
		}
		$('#imageModal').css('width', tama??o + '%');
	}
}

/* == VER DETALLE MD ===*/
function obtieneDetalleMd(nombreMd, mdId) {
	$("#nombreMd2").val(nombreMd);
	$("#mdId2").val(mdId);
	$("#tipoMd2").val('5');
	$("#detalleMemoriaAsignadaActionMD").submit();
}
	

function consultaScore() {

	invocarJSONServiceAction("consultaScoreAction",
		{
			'mdId': $("#mdIdAutorizacion").val()
		},
		'scoreRespuesta',
		function () {
			cierraLoading();
		},
		function () {
			cierraLoading();
		});

	scoreRespuesta = function (data) {
		if (data.codigo != 200) {
		} else {
			var macro = "";
			var micro = "";
			var total = "";
			var signo = "";
			if (data.ubicacionMD != "GENERAL") {
				signo = "%";


				cab_elementos = "";
				cab_elementos += "<div class='col-6 t14 negrita'> Tipo de MD: " + data.ubicacionMD + "</div>";
				cab_elementos += "<div class='col-6 t14 negrita'> Categor??a: " + data.nomcategoria + "</div>";

				macro = "<tr><td class='t14 negrita' style='border:0;'>Macro Ubicaci??n</td><td style='border:0;' class='t14 negrita'>Real</td><td class='t14 negrita' style='border:0;'>Objetivo</td></tr>";
				micro = "<tr><td class='t14 negrita' style='border:0;'>Micro Ubicaci??n</td><td style='border:0;' class='t14 negrita'>Real</td><td class='t14 negrita' style='border:0;'>Objetivo</td></tr>";

				for (var i = 0; i < data.factores.length - 1; i++) {
					if (data.factores[i].rangoubicaid == 0) {
						macro += "<tr><td class='t14'>" + data.factores[i].nombrenivel + "</td>" +
							"<td class='t14 negrita'>" + data.factores[i].puntuacion + signo + "</td>" +
							"<td class='t14 negrita'>" + data.factores[i].totalxfactor + signo + "</td>" +
							"</tr>";
					}
					else {
						micro += "<tr><td class='t14'>" + data.factores[i].nombrenivel + "</td>" +
							"<td class='t14 negrita'>" + data.factores[i].puntuacion + signo + "</td>" +
							"<td class='t14 negrita'>" + data.factores[i].totalxfactor + signo + "</td>" +
							"</tr>";
					}
				}
				total = "<span class='t18 negrita'> Total " + data.factores[i].puntuacion + signo + "</span>"
				$('#cabecera_score').html(cab_elementos);
				$('#score_info').html(macro + micro);
				$('#total_score').html(total);
			}
			else {
				signo = " puntos";

				cab_elementos = "";
				cab_elementos += "<div class='col-6 t14 negrita'> Tipo de MD: " + data.ubicacionMD + "</div>";
				cab_elementos += "<div class='col-6 t14 negrita'> Categor??a: " + data.nomcategoria + "</div>";

				elementos = "";
				elementos += "<tr><th class='t14'>Condici??n</th><th class='t14'>Peso</th></tr>";

				for (var i = 0; i < data.factores.length; i++) {
					elementos += "<tr><td class='t14'>" + data.factores[i].nombrenivel + "</td><td class='t14 negrita'>" + data.factores[i].puntuacion + signo + "</td></tr>";
				}
				$('#cabecera_score').html(cab_elementos);
				$('#score_info').html(elementos);
			}




			$('#score_card').modal('show');
		}
	}
}

function autorizaDuplica() {
	if (arrEstatusPermiso[28] == 28) {
		$("#divAutorizacion").hide();
	}
}

function muestraPredial() {
	modalImage(undefined, predialImg, "Tomada el d??a: " + fechaPredial);
}

function redireccionaAsignadas() {
	window.history.back();
}


/*== MOD 2021*/

function crearCirculo(location, color, radius) {

	if (radius == undefined || radius == null || radius == "") {
		radius = 500;
	} else
		if (radius < 500) {
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

function mostrarVistaSeccion() {
	$("#contenido-vista-a").hide();
	$("#contenido-vista-b").hide();
	$("#contenido-vista-c").hide();

	if ($("#option-vista-a").is(":checked")) {
		$("#contenido-vista-a").show();
	}

	if ($("#option-vista-b").is(":checked")) {
		$("#contenido-vista-b").show();
	}

	if ($("#option-vista-c").is(":checked")) {
		$("#contenido-vista-c").show();
	}

}

function pintaRadio(thisMap){
	if ($("#check-tdos-gen").is(":checked") ||
	$("#check-mercados").is(":checked") || 
	$("#check-escuela").is(":checked") ||
	$("#check-hospital").is(":checked") ||
	$("#check-templo").is(":checked") ||
	$("#check-ofGob").is(":checked") ||
	$("#check-tdos-ue").is(":checked") ||
	$("#check-panaderia").is(":checked") ||
	$("#check-tortilleria").is(":checked") ||
	$("#check-abarrotes").is(":checked") ||
	$("#check-carniceria").is(":checked") ||
	$("#check-recauderia").is(":checked") ||
	$("#check-polleria").is(":checked")){
		
		circule.setMap(MAPZONIFICACION_RADIOS);
		
	}else{
		circule.setMap(null);
		
	}
	
	

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
		id: obj.id,
		icon: icon
	});


	google.maps.event.addListener(marker, 'dragend', function (evt) {
		var center = new CoordenadaClass(evt.latLng.lat(), evt.latLng.lng());
		objArray[obj.id].circle = crearCirculo(center, colors.NUEVO);

	});

	marker.addListener("dblclick", function () {
		deleteObjMarkerMap(obj.id);
	});

	marker.addListener("click", function () {

		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
			radioSeleccionado.circle.setMap(null);
			$(".contentPopUpInfo").hide();
			map.setZoom(12);

		} else {
			if (radioSeleccionado != undefined && radioSeleccionado != null) {
				radioSeleccionado.marker.setAnimation(null);
				radioSeleccionado.circle.setMap(null);
			}


			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function () { marker.setAnimation(google.maps.Animation.BOUNCE); }, 1100);
			radioSeleccionado = objArray[obj.id];

			radioSeleccionado.circle.setMap(map);
			verInformacionRadio(radioSeleccionado, PANT_OPCION.ALTARADIOS);
			map.setCenter(new google.maps.LatLng(radioSeleccionado.lat, radioSeleccionado.lng));
			map.setZoom(15);
			$(".contentPopUpInfo").show();
		}


	});

	//	google.maps.event.addListener(marker, 'dragstart', function (evt) {
	//		objArray[obj.id].circle.setMap(null);
	//	});

	bounds.extend(marker.position);
	obj.marker = marker;
	obj.circle = crearCirculo(obj.objCoordenadas, colors.NUEVO, obj.anillo);
	boundsGeneral = bounds;
}