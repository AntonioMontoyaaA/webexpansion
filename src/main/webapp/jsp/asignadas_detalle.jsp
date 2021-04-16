<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- &emsp;  &nbsp;-->
<html>
<head>
<link rel="shortcut icon" href="img/favicon.png" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 -->
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/jquery-ui.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/generic.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/dropzone/dropzone.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/asignadas.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/detalle.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/utiles/modalImages.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/slick/slick.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/slick/slick-theme.css" />
<title>Detalle MD</title>
</head>
<body>

	<c:forEach var="perfil" items="${usr.perfil.perfilesxusuario}">
		<input type="hidden" class="perfiles_usuario"
			value="${perfil.perfilid}">
	</c:forEach>

	<input type="hidden" id="perfil_usuario"
		value="${usr.perfil.perfilesxusuario[0].perfilid}">
	<input type="hidden" id="areaUsuario"
		value="${usr.perfil.areasxpuesto[0].areaId}">
	<input type="hidden" id="puestoUsuario" value="${usr.perfil.puestoId}">
	<input type="hidden" id="usuarioId"
		value="${usr.perfil.numeroEmpleado}">
	<input type="hidden" id="nombreAreaUsuario"
		value="${usr.perfil.areasxpuesto[0].areaNom}">
	<input type="hidden" id="nombreCompletoUsuario"
		value="${usr.perfil.nombre} ${usr.perfil.apellidoP} ${usr.perfil.apellidoM}">
	<%@ include file="/jsp/generic/header.jsp"%>

	<div class="container-fluid fazul">
		<div class="row padding_p">
			<div class="col-lg-12 titulo blanco t12 negrita">
				<span id="leyenda"></span> > <span id="titulo_tipo"></span> > <span
					id="nombreMdTxt"></span>>
			</div>
			<!--  ******************************** HEXAGONOS- FLUJO *************************************** -->
			<div class="col-12" style="margin: 10 0; padding: 0;">
				<div class="col-12 divs_p right">
					<div class="float_left">
						<button class="btn desp atras" type="button"
							onclick="history.back()"></button>
					</div>

					<div class="col-lg-10 col-10" id="flujo"></div>

					<div class="botones">

						<button id="btnLevantamiento" class="btn desp tienda"
							style="display: none" type="button"></button>

						<button id="btnRadios" class="btn desp radio" type="button"></button>
						<button id="mensajesMD" onclick="muestraChatXMd();"
							class="btn desp mensajes" type="button"></button>
						<button id="botondescarga" class="btn desp descarga sin_permiso"
							type="button"></button>
					</div>
				</div>
			</div>
			<!--  *********************************************************************** -->

			<div class="col-lg-4 col-12">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco altura1">
						<div class="col-12 titulo_seccion">
							<div class="row">
								<div class="col-lg-12">
									<span class="titulo_detalle_md_20" id="labelNombre"></span><input
										class="titulo_detalle_md_20 text_edita"
										style="text-transform: uppercase;" value="---" type="text"
										id="nombreMd" readonly />
									<div id="modulo1Edita" class="float_right"
										style="display: none;">
										<span><img id="historial1" title="Historial"
											onclick="historialPantalla(1, this);"
											style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
										<span><img id="edita1" title="Guarda cambios"
											onclick="editaPantalla(1, this);" style="cursor: pointer;"
											src="img/edita_mark.png"></span>
									</div>
								</div>
								<div class="col-lg-7" id="responsable">
									<span class="contenido_cajas_20">Creado por <span
										id="creadorMd">---</span></span>
								</div>

								<div class="col-lg-5 right">
									<span class="contenido_cajas_20">Creada el <span
										id="fechaCreacion">---</span></span>
								</div>
								<div class="col-4 center">
									<span class="titulo_detalle_md_20 center">CATEGORÍA</span><br>
									<span id="categoriaMd" class="circulo negrita">---</span>
								</div>
								<div class="col-4 center">
									<span class="titulo_detalle_md_20 center">PUNTUACIÓN</span><br>
									<span id="estrellasMd" class="azul t12"></span><br> <span
										class="contenido_cajas_20"><span id="puntuacionMd">---</span></span><br />
								</div>
								<div class="col-4 center">
									<span class="titulo_detalle_md_20 center" id="tipoMdTitulo"
										style="display: none;">TIPO </span><br> <span
										id="tipoMdImagen" class="azul t12"></span><br> <span
										class="contenido_cajas_20"><span id="tipoMdtexto"></span></span>
									<!-- <span class="azul t12 cursor" style="text-decoration:underline;" onclick="consultaScore()"><span>Ver detalle</span></span>-->
								</div>
							</div>
							<div class="row" style="padding-top: 5px;">
								<div class="col-lg-12">
									<span class="negrita azul t14">UBICACIÓN</span>
								</div>
							</div>
						</div>
						<div class="col-12" id="map" style="height: 173px !important;"></div>
						<script async defer
							src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaefWW3pvU6WKZKiVFD6OwyGoWIgZLyS0">
							
						</script>
						
					</div>
				</div>
			</div>

			<div class="col-lg-4 altura1">
				<div class="row divs_p">
					<div class="slick_main col-lg-12 menupr_estilos fblanco altura1">
						<div id="div_score1" class="col-12 titulo_seccion">
							<span class="titulo_detalle_md_20">SCORE CARD</span><br /> <span
								id="scoreSpan1" class="titulo_detalle_md_20 sangria_cuerpo">---</span><br />
							<div id="macroUbicacionChart"></div>
						</div>
						<div id="div_score2" class="col-12 titulo_seccion">
							<span class="titulo_detalle_md_20">SCORE CARD</span><br /> <span
								id="scoreSpan2" class="titulo_detalle_md_20 sangria_cuerpo">---</span><br />
							<div id="microUbicacionChart"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-4 altura1 padding_movil_10">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco altura1">
						<div class="col-12 titulo_seccion">
							<span class="titulo_detalle_md_20">DATOS DEL SITIO Y
								PROPIETARIO</span>
							<div id="modulo2Edita" class="float_right" style="display: none;">
								<span><img id="historial2" title="Historial"
									onclick="historialPantalla(2, this);" style="cursor: pointer;"
									src="img/historial_mark.png">&nbsp;</span> <span><img
									id="edita2" title="Guarda cambios"
									onclick="editaPantalla(2, this);" style="cursor: pointer;"
									src="img/edita_mark.png"></span>
							</div>
							<div id="modulo2Creacion" class="float_right">
								<span> <img id="autoriza2" title="Autoriza punto"
									class="sin_autorizar b_autorizar"
									onclick="autorizaPantalla(2, this);" style="cursor: pointer;"
									src="img/autoriza_mark.png">&nbsp;
								</span> <span> <img id="rechaza2" title="Rechaza punto"
									class="sin_autorizar b_rechazar"
									onclick="rechazaPantalla(2, this);" style="cursor: pointer;"
									src="img/rechaza_mark.png">
								</span>
							</div>
						</div>
						<div class="row" id="modulo2Datos"
							style="width: 100%; position: relative; float: left; text-align: left">
							<div class="col-lg-12 padding_top_botom_5">
								<span class="titulo_detalle_md_20 sangria_cuerpo">Direcci&oacute;n</span><br />
								<span id="direccion"
									class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
							</div>
							<div class="col-lg-12 padding_top_botom_5">
								<span class="titulo_detalle_md_20 sangria_cuerpo">Nombre
									propietario</span><br /> <span id="nombrePropietario"
									class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
							</div>
							<div class="col-lg-12 padding_top_botom_5">
								<span class="titulo_detalle_md_20 sangria_cuerpo">Teléfono</span><br />
								<span id="telefonoPropietario"
									class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
							</div>
							<div class="col-lg-12 padding_top_botom_5">
								<span class="titulo_detalle_md_20 sangria_cuerpo">Email</span><br />
								<span id="emailPropietario"
									class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
							</div>
							<div class="col-lg-12 padding_top_botom_5">
								<span id="rentaANeto"
									class="titulo_detalle_md_20 sangria_doble_cuerpo">---</span><br />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-12 col-12 padding_movil_10">
				<div class="row divs_p galeria_main">
					<div class="div_galeria col-lg-12 menupr_estilos fblanco">
						<div class="row titulo_seccion">
							<div class="col-lg-8 col-6">
								<span class="titulo_detalle_md_20">SUPERFICIE</span>
							</div>
							<div class="col-lg-2 col-2">
								<input type="checkbox" class="form-check-input esquina"
									id="esquina" onclick="return false;"> <label
									class="contenido_cajas_20 esquina" for="esquina">Local
									en esquina</label>
							</div>
							<div class="col-lg-2 col-4">
								<div id="modulo3Edita" class="float_right"
									style="display: none;">
									<span><img id="historial3" title="Historial"
										onclick="historialPantalla(3, this);" style="cursor: pointer;"
										src="img/historial_mark.png">&nbsp;</span> <span><img
										id="edita3" title="Guarda cambios"
										onclick="editaPantalla(3, this);" style="cursor: pointer;"
										src="img/edita_mark.png"></span>
								</div>
								<div id="modulo3Creacion" class="float_right">
									<%-- <span class="negrita blanco t14">Puntos: </span> <spanid="puntosSuperficie" class="negrita blanco t14">---</span>  --%>
									<span> <img id="autoriza3" title="Autoriza punto"
										class="sin_autorizar b_autorizar"
										onclick="autorizaPantalla(3, this);" style="cursor: pointer;"
										src="img/autoriza_mark.png">&nbsp;
									</span> <span> <img id="rechaza3" title="Rechaza punto"
										class="sin_autorizar b_rechazar"
										onclick="rechazaPantalla(3, this);" style="cursor: pointer;"
										src="img/rechaza_mark.png">
									</span> <a id="superficieTip" tabindex="0" class="question_mark b_tip"
										role="" data-toggle="popover" data-trigger="focus"
										data-placement="bottom" data-content=""> <img
										style="cursor: pointer;" src="img/question.png">
									</a>
								</div>
							</div>
						</div>
						<div class="row div_header_sub" style="display: none;">
							<div class="col-lg-6 col-6"></div>
							<div class="col-lg-5 col-5" onclick="muestraPredial()">
								<span id="muestraPredial"
									style="color: #FFF; text-decoration: underline; cursor: pointer; font-size: 14px; display: none;">Ver
									predial</span>
							</div>
						</div>
						<div class="row div_header_sub" id="modulo3Datos">
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20">FRENTE</span>&nbsp;&nbsp;&nbsp;
								<span id="frenteMd" class="contenido_cajas_20">---</span>
							</div>
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20">PROFUNDIDAD</span>&nbsp;&nbsp;&nbsp;
								<span id="profundidadMd"
									class="contenido_cajas_20 sangria_cuerpo">---</span>
							</div>
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20">SUPERFICIE TOTAL</span>&nbsp;&nbsp;&nbsp;
								<span id="tamanioTotalMd"
									class="contenido_cajas_20 sangria_cuerpo">---</span>
							</div>
						</div>
						<div class="row div_header_sub">

							<div class="col-lg-4">
								<div class="col-lg-12" style="padding: 0;">
									<span class="contenido_cajas_20">LATERAL 1</span>
								</div>
								<div class="col-lg-12" style="padding: 0;">
									<img class="imagenModal" id="vistaLateral1Md" alt="LATERAL 1"
										style="width: 100%; max-height: 300"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaLateral1" class="footerDetalleMd">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaLateral1" class="footerDetalleMd">---</span>
									</div>
								</div>
							</div>

							<div class="col-lg-4">
								<div class="col-lg-12" style="padding: 0;">
									<span class="contenido_cajas_20">VISTA FRONTAL</span>
								</div>
								<div class="col-lg-12" style="padding: 0;">
									<img class="imagenModal" id="vistaFrontalMd"
										alt="VISTA FRONTAL" style="width: 100%; max-height: 300"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaFrontal" class="footerDetalleMd">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaFrontal" class="footerDetalleMd">---</span>
									</div>
								</div>
							</div>

							<div class="col-lg-4">
								<div class="col-lg-12" style="padding: 0;">
									<span class="contenido_cajas_20">LATERAL 2</span>
								</div>
								<div class="col-lg-12" style="padding: 0;">
									<img class="imagenModal" id="vistaLateral2Md" alt="LATERAL 2"
										style="width: 100%; max-height: 300"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaLateral2" class="footerDetalleMd">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaLateral2" class="footerDetalleMd">---</span>
									</div>
								</div>
							</div>
						</div>
						<div class="row div_header_sub">

							<div class="col-lg-4">
								<div class="col-lg-12" style="padding: 0;">
									<span class="contenido_cajas_20">ENTORNO 1</span>
								</div>
								<div class="col-lg-12" style="padding: 0;">
									<img class="imagenModal" id="vistaEntorno1Md" alt="ENTORNO 1"
										style="width: 100%; max-height: 300"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaEntorno1" class="footerDetalleMd">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaEntorno1" class="footerDetalleMd">---</span>
									</div>
								</div>
							</div>

							<div class="col-lg-4">
								<div class="col-lg-12" style="padding: 0;">
									<span class="contenido_cajas_20">ENTORNO 2</span>
								</div>
								<div class="col-lg-12" style="padding: 0;">
									<img class="imagenModal" id="vistaEntorno2Md" alt="ENTORNO 2"
										style="width: 100%; max-height: 300"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaEntorno2" class="footerDetalleMd">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaEntorno2" class="footerDetalleMd">---</span>
									</div>
								</div>
							</div>

							<div class="col-lg-4">
								<div class="col-lg-12" style="padding: 0;">
									<span class="contenido_cajas_20">ENTORNO 3</span>
								</div>
								<div class="col-lg-12" style="padding: 0;">
									<img class="imagenModal" id="vistaEntorno3Md" alt="LATERAL 2"
										style="width: 100%; max-height: 300"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaEntorno3" class="footerDetalleMd">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaEntorno3" class="footerDetalleMd">---</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="div_galeria_dos">Nuevas fotos</div> -->
				</div>
			</div>

			<div class="col-lg-12 col-12">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco div_mapa">
						<div class="col-12 titulo_seccion">
							<span class="negrita azul t14">ZONIFICACI&Oacute;N</span>
							<div id="modulo4Edita" class="float_right" style="display: none;">
								<span><img id="historial4" title="Historial"
									onclick="historialPantalla(4, this);" style="cursor: pointer;"
									src="img/historial_mark.png">&nbsp;</span> <span><img
									id="edita4" title="Guarda cambios"
									onclick="editaPantalla(4, this);" style="cursor: pointer;"
									src="img/edita_mark.png"></span>
							</div>
							<div id="modulo4Creacion" class="float_right">
								<span> <img id="autoriza4" title="Autoriza punto"
									class="sin_autorizar b_autorizar"
									onclick="autorizaPantalla(4, this);" style="cursor: pointer;"
									src="img/autoriza_mark.png">&nbsp;
								</span> <span> <img id="rechaza4" title="Rechaza punto"
									class="sin_autorizar b_rechazar"
									onclick="rechazaPantalla(4, this);" style="cursor: pointer;"
									src="img/rechaza_mark.png">
								</span> <a id="zonificacionTip" tabindex="0"
									class="question_mark b_tip" role="" data-toggle="popover"
									data-trigger="focus" data-placement="bottom" data-content="">
									<img style="cursor: pointer;" src="img/question.png">
								</a>
							</div>
						</div>
						<div id="zonifNew" class="row div_header_sub">
							<div class="col-lg-12 col-md-12 altura2">
								<div id="mapaZonificacion" class="md-nuevo-map-properties">
								</div>
							</div>
							<div id="generadoresMDContainerNew">
									<div id="generadoresDivNew"  class="container md-nuevo-properties ">
											<div class="md-nuevo-transparent-background"></div>
											<div id="divNegocios" class="md-nuevo-sidebar-properties">
												<div class="row">
													<div class="col">
														<div class="row text-center">
															<!--//Pestañas-->
															<div class="col-5">
																<!--//Boton 1-->
																<input type="radio" id="option-vista-a" name="selector"
																	checked> <label for="option-vista-a"  class="t12 blanco">Jefe Expansi&oacute;n</label>
																<div class="check"></div>
															</div>
															<div class="col-3">
																<!--//Boton 2-->
																<input type="radio" id="option-vista-b" name="selector">
																<label for="option-vista-b"  class="t12 blanco">Radio</label>
																<div class="check">
																	<div class="inside"></div>
																</div>
															</div>
															<div class="col-4">
																<!--//Boton 3-->
																<input type="radio" id="option-vista-c" name="selector">
																<label for="option-vista-c"  class="t12 blanco">Ocupaciones</label>
																<div class="check">
																	<div class="inside"></div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="col" id="contenido-vista-a">
													<!--//Contenido A-->
													<div class="row">
														<div class="col">
															<!--//Tipo 1-->
															<div class="row">
																<!--//Titulo-->
																<span class="negrita t14 subTitleInfo">COMPETENCIAS</span>
															</div>
															<div class="row text-center">
															
																<div class="col">
																	<!--//Indicador 2-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="tresBTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/competencia/iconos_3b.png">
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Texto Descriptivo-->
																			<span class="t10 blanco">&nbsp;</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--//Indicador 3-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="expressTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/competencia/iconos_express.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto Descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">&nbsp;</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--//Indicador 4-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="oxxoTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/competencia/iconos_oxxo.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto Descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">&nbsp;</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--//Indicador 5-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="otrosCTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/competencia/icono_otros_2.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto Descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Tienda de abarrotes</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
									
													<div class="row" style="border-top: 1px solid #C9C9C9;">
														<!--//Separador-->
													</div>
									
													<div class="row">
														<div class="col">
															<!--//Tipo 2-->
															<div class="row">
																<!--//Titulo-->
																<span class="negrita t14 subTitleInfo">NEGOCIOS</span>
															</div>
															<div class="row text-center">
																<!--//Indicadores-->
																<div class="col">
																	<!--//Indicador 1-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="tortilleriaTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/tortilleria.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Tortiller&iacute;a</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--//Indicador 2-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="recauderiaTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
									
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/recauderia.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Frutas y verduras</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--//Indicador 3-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="carniceriaTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/carniceria.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Carnicer&iacute;a</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="row" style="border-top: 1px solid #C9C9C9;">
														<!--//Separador-->
													</div>
													<div class="row">
														<div class="col">
															<!--//Tipo 3-->
															<div class="row">
																<!--//Titulo-->
																<span class="negrita t14 subTitleInfo">NEGOCIOS DE
																	COMIDA</span>
															</div>
															<div class="row text-center">
																<!--//Indicadores-->
																<div class="col">
																	<!--//Indicador 1-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="comidaTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/negociocomida.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Negocio de comida</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
									
														<div class="col">
															<!--//Tipo 4-->
															<div class="row">
																<!--//Titulo-->
																<span class="negrita t14 subTitleInfo">TRANSPORTE
																	P&Uacute;BLICO</span>
															</div>
															<div class="row text-center">
																<!--//Indicadores-->
																<div class="col">
																	<!--//Indicador 1-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="paradaTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/parada.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Parada de autob&uacute;s</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--//Indicador 2-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="metroTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/w_metro.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Parada de Metro</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="row" style="border-top: 1px solid #C9C9C9;">
														<!--//Separador-->
													</div>
													<div class="row">
														<div class="col">
															<!--//Tipo 5-->
															<div class="row">
																<!--//Titulo-->
																<span class="negrita t14 subTitleInfo">MERCADO
																	P&Uacute;BLICO</span>
															</div>
															<div class="row text-center">
																<!--//Indicadores-->
																<div class="col">
																	<!--//Indicador 1-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="mercadoTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
									
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/mercado.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Mercado</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
									
														<div class="col">
															<!--//Tipo 6-->
															<div class="row">
																<!--//Titulo-->
																<span class="negrita t14 subTitleInfo">TIANGUIS</span>
															</div>
															<div class="row text-center">
																<!--//Indicadores-->
																<div class="col">
																	<!--//Indicador 1-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="tianguisTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/tianguis.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Tianguis</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="row" style="border-top: 1px solid #C9C9C9;">
														<!--//Separador-->
													</div>
													<div class="row">
														<div class="col">
															<!--//Tipo 7-->
															<div class="row">
																<!--//Titulo-->
																<span class="negrita t14 subTitleInfo">OTROS GENERADORES</span>
															</div>
															<div class="row text-center">
																<!--//Indicadores-->
																<div class="col">
																	<!--//Indicador 1-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="iglesiaTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/iglesia.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Iglesia</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--//Indicador 2-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="escuelaTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/escuela.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Escuela</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--//Indicador 3-->
																	<div class="row">
																		<div class="col">
																			<!--//Valor-->
																			<span id="otrosGTotal" class="titulo_detalle_md_20 blanco">0</span>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col">
																			<!--//Icono-->
																			<img class="icono_imagen"
																				src="img/generadores/icono_otros_generadores.png">
																		</div>
																	</div>
																	<div class="row">
																		<!--//Texto descriptivo-->
																		<div class="col">
																			<span class="t10 blanco">Otros Generadores</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div id="contenido-vista-b" class="col">
													<div class="row">
														<div class="col">
															<div class="row text-center" style="font-size: 13px;">
																<!--Radio-->
																<div class="col">
																	<!--Titulo-->
																	<div class="text-center blanco">Radio:</div>
																</div>
																<div class="col">
																	<!--Valor-->
																	<span class="infoRadio blanco"> 0 </span>
																</div>
															</div>
															<div class="row">
																<!--Información Socio Demografica titulo-->
																<div class="col pt-3 pl-0 pb-2"><span class="negrita t14 subTitleInfo">Información
																	Socio demográfica</span></div>
															</div>
															<div class="row" style="font-size: 13px;">
																<!--Edad Predominante titulo-->
																<div class="col"><div class="blanco">Edad predominante</div></div>
															</div>
															<div class="row text-center" >
																<!--Edades-->
																<div class="col p-0">
																	<div class="row">
																		<!--Valor-->
																		<div class="col blanco" style="font-size: 13px;">
																			<span id="edadMenor1"> 0 </span>
																		</div>
																	</div>
																	<div class="row">
																		<!--Icono-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-menor-18.png"></div>
																	</div>
																	<div class="row">
																		<!--Descripcion-->
																		<div class="col">
																			<span class="t10 blanco">&lt; - 20</span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<div class="row">
																		<!--Valor-->
																		<div class="col blanco" style="font-size: 13px;"><span id="edadMenor2"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-mayor-20.png"></div>
																	</div>
																	<div class="row">
																		<!--Descripcion-->
																		<div class="col">
																			<span class="t10 blanco">21 - 30</span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<div class="row">
																		<!--Valor-->
																		<div class="col blanco" style="font-size: 13px;"><span id="edadMenor3"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-31-40.png"></div>
																	</div>
																	<div class="row">
																		<!--Descripcion-->
																		<div class="col">
																			<span class="t10 blanco">31- 40</span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<div class="row">
																		<!--Valor-->
																		<div class="col blanco" style="font-size: 13px;"><span id="edadMenor4"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-41-50.png"></div>
																	</div>
																	<div class="row">
																		<!--Descripcion-->
																		<div class="col">
																			<span class="t10 blanco">41- 50</span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<div class="row">
																		<!--Valor-->
																		<div class="col blanco" style="font-size: 13px;"><span id="edadMenor5"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-51-60.png"></div>
																	</div>
																	<div class="row">
																		<!--Descripcion-->
																		<div class="col blanco">
																			<span class="t10 azul">51 - 60</span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<div class="row">
																		<!--Valor-->
																		<div class="col blanco" style="font-size: 13px;"><span id="edadMenor6"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-mayor-60.png"></div>
																	</div>
																	<div class="row">
																		<!--Descripcion-->
																		<div class="col">
																			<span class="t10 blanco">61 - &lt;</span>
																		</div>
																	</div>
																</div>
															</div>
															<div class="row text-center" style="font-size: 13px;">
																<div class="col">
																	<div class="row">
																		<div class="col blanco">
																			<!--Poblacion total Title-->
																			Poblaci&oacute;n total:
																			<span id="poblacion"> 0 </span>
																		</div>
																		
																	</div>
																	<div class="row">
																		<div class="col blanco">
																			<!--PEA total Title-->
																			PEA:
																			<span id="pea"> 0 </span>
																		</div>
																		
																	</div>
																</div>
																<div class="col">
																	<div class="row">
																		<div class="col blanco">
																			<!--Poblacion flotante Title-->
																			Poblaci&oacute;n flotante:
																			<span id="poblacionFlot"> 0 </span>
																		</div>
																		
																	</div>
																	<div class="row">
																		<div class="col blanco">
																			<!--Hogares total Title-->
																			Hogares:
																			<span id="hogares"> 0 </span>
																		</div>
																		
																	</div>
																</div>
															</div>
															<div class="row" style="border-top: 1px solid #C9C9C9;">
																<!--//Separador-->
															</div>
															<div class="row">
																<!--Generadores de base-->
																<div class="col-8 pt-3 pl-0 pb-2">
																	<!--Generadores Title-->
																	<span class="negrita t14 subTitleInfo"> Generadores</span>
																	<input id="check-tdos-gen" type="checkbox" checked="checked" style="margin-top: 4px;"/>
																</div>
																<div class="col-4">
																	<!--Check Todos los generadores-->
																	
																</div>
															</div>
															<div class="row text-center">
																<div class="col">
																	<!--Mercados-->
																	<div class="row">
																		<!--check Mercados-->
																		<div class="col"><input id="check-mercados" type="checkbox" checked="checked"></div>
																	</div>
																	<div class="row">
																		<!--Cant Mercados-->
																		<div class="col blanco" style="font-size: 13px;"><span id="mercados"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Mercados-->
																		<div class="col"><img class="img-tamanio-info-demografica" style="margin-bottom: 0px;"
																			src="img/localizador/icon-mercado.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Mercados-->
																		<div class="col">
																			<span class="t10 blanco">Mercados</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--Escuelas-->
																	<div class="row">
																		<!--check Escuelas-->
																		<div class="col"><input id="check-escuela" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Escuelas-->
																		<div class="col blanco" style="font-size: 13px;"><span id="escuelas"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Escuelas-->
																		<div class="col"><img class="img-tamanio-info-demografica" style="margin-bottom: 0px;"
																			src="img/localizador/icon-escuela.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Escuelas-->
																		<div class="col">
																			<span class="t10 blanco">Escuelas</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--Hospitales-->
																	<div class="row">
																		<!--check Hospitales-->
																		<div class="col"><input id="check-hospital" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Hospitales-->
																		<div class="col blanco" style="font-size: 13px;"><span id="hopitales"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Hospitales-->
																		<div class="col"><img class="img-tamanio-info-demografica" style="margin-bottom: 0px;"
																			src="img/localizador/icon-hospital.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Hospitales-->
																		<div class="col">
																			<span class="t10 blanco">Hospitales</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--Templos-->
																	<div class="row">
																		<!--check Templos-->
																		<div class="col"><input id="check-templo" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Templos-->
																		<div class="col blanco" style="font-size: 13px;"><span id="templos"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Templos-->
																		<div class="col"><img class="img-tamanio-info-demografica" style="margin-bottom: 0px;"
																			src="img/localizador/icon-templo.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Templos-->
																		<div class="col">
																			<span class="t10 blanco">Templos</span>
																		</div>
																	</div>
																</div>
																<div class="col">
																	<!--Oficinas Gob-->
																	<div class="row">
																		<!--check OGob-->
																		<div class="col"><input id="check-ofGob" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Ogob-->
																		<div class="col blanco" style="font-size: 13px;"><span id="ofiGob"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Ogob-->
																		<div class="col"><img class="img-tamanio-info-demografica" style="margin-bottom: 0px;"
																			src="img/localizador/icon-ofgobierno.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Ogob-->
																		<div class="col">
																			<span class="t10 blanco">O. Gobierno</span>
																		</div>
																	</div>
																</div>
															</div>
															<div class="row">
																<div class="col pt-3 pl-0 pb-2">
																	<!--Competencias-->
																	<span class="negrita t14 subTitleInfo">Competencias</span>
																</div>
															</div>
															<div class="row text-center">
																<div class="col">
																	<!--Bbb-->
																	<div class="row">
																		<!--Cant BBB-->
																		<div class="col blanco"><span id="bbb"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono BBB-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-compe-3b.png"></div>
																	</div>
																</div>
																<div class="col">
																	<!--BAE exp-->
																	<div class="row">
																		<!--Cant BAE Exp-->
																		<div class="col blanco"><span id="bae"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono BAE exp-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-compe-bod-expres.png"></div>
																	</div>
																</div>
																<div class="col">
																	<!--MIBA-->
																	<div class="row">
																		<!--Cant MIBA-->
																		<div class="col blanco"><span id="miba"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono MIBA-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-compe-bod.png"></div>
																	</div>
																</div>
															</div>
															<div class="row">
																<!--Unidades Economicas Titulo-->
																<div class="col-11 pt-3 pl-0 pb-2">
																	<span class="negrita t14 subTitleInfo"> Unidades
																		Econ&oacute;micas </span>
																		<input id="check-tdos-ue" type="checkbox" checked="checked" style="margin-top: 4px;">
																</div>
																<div class="col-1">
																	
																</div>
															</div>
															<div class="row text-center">
																<div class="col p-0">
																	<!--Panaderias-->
																	<div class="row">
																		<!--check Panaderias-->
																		<div class="col"><input id="check-panaderia" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Panaderias-->
																		<div class="col blanco"><span id="t-PANADERIA"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Panaderias-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-panaderia.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Panaderias-->
																		<div class="col blanco">
																			<span class="t10 blanco">Panader&iacute;as</span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<!--Tortillerias-->
																	<div class="row">
																		<!--check Tortillerias-->
																		<div class="col"><input id="check-tortilleria" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Tortillerias-->
																		<div class="col blanco"><span id="t-TORTILLERIA"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Tortillerias-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-tortilleria.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Tortillerias-->
																		<div class="col">
																			<span class="t10 blanco">Tortiller&iacute;as</span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<!--Abarrotes-->
																	<div class="row">
																		<!--check Abarrotes-->
																		<div class="col"><input id="check-abarrotes" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Abarrotes-->
																		<div class="col blanco"><span id="t-ABARROTES"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Abarrotes-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-abarrotes.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Abarrotes-->
																		<div class="col">
																			<span class="t10 blanco">Abarrotes</span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<!--Carnicerias-->
																	<div class="row">
																		<!--check Carnicerias-->
																		<div class="col"><input id="check-carniceria" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Carnicerias-->
																		<div class="col blanco"><span id="t-CARNICERIA"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Carnicerias-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-carniceria.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Carnicerias-->
																		<div class="col">
																			<span class="t10 blanco">Carnicer&iacute;as </span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<!--Recauderias-->
																	<div class="row">
																		<!--check Recauderias-->
																		<div class="col"><input id="check-recauderia" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Recauderias-->
																		<div class="col blanco"><span id="t-RECAUDERIAS"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Recauderias-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-recauderia.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Recauderias-->
																		<div class="col">
																			<span class="t10 blanco">Recauder&iacute;as  </span>
																		</div>
																	</div>
																</div>
																<div class="col p-0">
																	<!--Pollerias-->
																	<div class="row">
																		<!--check Pollerias-->
																		<div class="col"><input id="check-polleria" type="checkbox" checked="checked" style="padding-left: 0px;"></div>
																	</div>
																	<div class="row">
																		<!--Cant Pollerias-->
																		<div class="col blanco"><span id="t-POLLERIA"> 0 </span></div>
																	</div>
																	<div class="row">
																		<!--Icono Pollerias-->
																		<div class="col"><img class="img-tamanio-info-demografica" src="img/localizador/icon-polleria.png"></div>
																	</div>
																	<div class="row">
																		<!--Desc Pollerias-->
																		<div class="col">
																			<span class="t10 blanco">Poller&iacute;a  </span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
									
												<div id="contenido-vista-c" class="col"
													style="max-height: 584px;">
													<div class="row">
														<div class="col blanco" style="font-size: 13px;">
															<!--<div class="row">
																<div class="col">Coordenadas:</div>
																<div class="col"><span id="infoCoordenadas"> - </span></div>
															</div>
															<div class="row">
																<div class="col">Ubicaci&oacute;n:</div>
																<div class="col"><span id="infoUrl"> - </span></div>
															</div>
															<div class="row">
																<div class="col">Calle principal:</div>
																<div class="col"><span id="infoCalle"> - </span></div>
															</div>
															<div class="row">
																<div class="col">Entre calle 1:</div>
																<div class="col"><span id="infoCalle1"> - </span></div>
															</div>
															<div class="row">
																<div class="col">Entre calle 2:</div>
																<div class="col"><span id="infoCalle2"> - </span></div>
															</div>
															<div class="row">
																<div class="col">Colonia:</div>
																<div class="col"><span id="infoColonia"> - </span></div>
 															</div> -->
															<div class="row">
																<div class="col">Municipio:</div>
																<div class="col"><span id="infoMunicipio"> - </span></div>
															</div>
															<div class="row">
																<div class="col">
																	<div class="row">
																		<!--Titulo-->
																		<div class="col">
																			<span class="negrita t14 subTitleInfo">Ocupaciones</span>
																		</div>
																	</div>
																	<div class="row">
																		<!--Contenedor radar ocupaciones-->
																		<canvas id="radar_ocupaciones" class="md-nuevo-radar-ocupaciones-properties"></canvas>
																	</div>
																</div>
															</div>
															<div class="row">
																<div class="col">
																	<div id="list-empleos" class="row"></div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="row text-center justify-content-center" id="btonEsconderGeneradores" style="cursor: pointer; background: #795548; border: 1px solid #ffffff;">
												<!--//Ocultar Generadores-->
												<div class="row" onclick="escondeGeneradores()">
													<div class="col-10">
														<span class="titulo_modal-generadores">Ocultar
															Generadores</span>
													</div>
													<div class="col-2"
														style="padding-top: 10px; padding-bottom: 10px;">
														<img
															src="${pageContext.request.contextPath}/img/arrowUp.png"
															class="md-nuevo-img-pointer modal-arrow-filter" />
													</div>
												</div>
											</div>
											<div class="row text-center justify-content-center" id="divNegociosHeader" style="cursor: pointer; background: #795548; display: none; border: 1px solid #ffffff;
											box-shadow: 0px 3px 5px #aaaaaa">
												<!--Mostrar Generadores-->
												<div class="row" onclick="muestraGeneradores()" >
													<div class="col-10">
														<span class="titulo_modal-generadores">Mostrar
															Generadores</span>
													</div>
													<div class="col-2"
														style="padding-top: 10px; padding-bottom: 10px;">
														<img
															src="${pageContext.request.contextPath}/img/arrowDown.png"
															class="md-nuevo-img-pointer modal-arrow-filter" />
													</div>
												</div>
											</div>
									</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-4 col-12" style="display: none;">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco altura2">

						<div class="col-12 titulo_seccion">
							<span class="negrita azul t14">5) Construcción</span>
							<div id="modulo5Edita" class="float_right" style="display: none;">
								<span><img id="historial5" title="Historial"
									onclick="historialPantalla(5, this);" style="cursor: pointer;"
									src="img/historial_mark.png">&nbsp;</span> <span><img
									id="edita5" title="Guarda cambios"
									onclick="editaPantalla(5, this);" style="cursor: pointer;"
									src="img/edita_mark.png"></span>
							</div>
							<div id="modulo5Creacion" class="float_right">
								<%-- 						<span class="negrita azul t14">Puntos: </span> <span id="puntosConstruccion" class="negrita azul t14">---</span>
 --%>
								<span> <img id="autoriza5" title="Autoriza punto"
									class="sin_autorizar b_autorizar"
									onclick="autorizaPantalla(5, this);" style="cursor: pointer;"
									src="img/autoriza_mark.png">&nbsp;
								</span> <span> <img id="rechaza5" title="Rechaza punto"
									class="sin_autorizar b_rechazar"
									onclick="rechazaPantalla(5, this);" style="cursor: pointer;"
									src="img/rechaza_mark.png">
								</span> <a id="construccionTip" tabindex="0"
									class="question_mark b_tip" role="" data-toggle="popover"
									data-trigger="focus" data-placement="bottom" data-content="">
									<img style="cursor: pointer;" src="img/question.png">
								</a>
							</div>
						</div>

						<div id="factoresConstruccion1"
							style="width: 100%; height: 150px; overflow-y: auto; position: relative; float: left; text-align: left">
						</div>
						<div id="condicionesConstruccion"
							style="width: 100%; position: relative; float: left; text-align: left">
							<span class="azul t12 sangria_cuerpo">CONDICIONES
								GENERALES</span><br /> <span id="condicionesGeneralesEstatus2"
								class="azul t12 sangria_doble_cuerpo">---</span><br />
						</div>
					</div>
				</div>
			</div>


			<div class="col-lg-4">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco altura1">

						<div class="row" style="padding-top: 4px;">
							<div class="col-8 ">
								<span class="titulo_detalle_md_20">CONSTRUCCI&Oacute;N Y
									GENERALIDADES</span>
							</div>

							<div class="col-4  right">
								<div id="modulo6Edita" class="float_right"
									style="display: none;">
									<span><img id="historial6" title="Historial"
										onclick="historialPantalla(6, this);" style="cursor: pointer;"
										src="img/historial_mark.png">&nbsp;</span> <span><img
										id="edita6" title="Guarda cambios"
										onclick="editaPantalla(6, this);" style="cursor: pointer;"
										src="img/edita_mark.png"></span>
								</div>
								<div id="modulo6Creacion" class="">
									<%-- 						<span class="negrita blanco t14">Puntos: </span> <span id="puntosGeneralidades" class="negrita blanco t14">---</span>
 --%>
									<span> <img id="autoriza6" title="Autoriza punto"
										class="sin_autorizar b_autorizar"
										onclick="autorizaPantalla(6, this);" style="cursor: pointer;"
										src="img/autoriza_mark.png">&nbsp;
									</span> <span> <img id="rechaza6" title="Rechaza punto"
										class="sin_autorizar b_rechazar"
										onclick="rechazaPantalla(6, this);" style="cursor: pointer;"
										src="img/rechaza_mark.png">
									</span> <a id="generalidadesTip" tabindex="0"
										class="question_mark b_tip" role="" data-toggle="popover"
										data-trigger="focus" data-placement="bottom" data-content="">
										<img style="cursor: pointer;" src="img/question.png">
									</a>
								</div>
							</div>
						</div>
						<div id="modulo6Datos" class="div_header_sub">
							<div class="row">
								<div id="factoresConstruccion" class="col-lg-12 col-12" style=""></div>
							</div>
							<div class="row">
								<div class="col-lg-8 col-8">
									<div class="row padding_top_botom_10"
										style="padding-top: 30px;">
										<div class="col-lg-6 col-6">
											<span class="titulo_detalle_md_20 sangria_cuerpo">Condiciones</span><br />
											<span id="condicionesGeneralesEstatus"
												class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
										</div>
										<div class="col-lg-6 col-6">
											<span class="titulo_detalle_md_20 sangria_cuerpo">Amortizaci&oacute;n</span><br />
											<span id="amortizacion"
												class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
										</div>
									</div>
									<div class="row padding_top_botom_10">
										<div class="col-lg-6 col-6">
											<span class="titulo_detalle_md_20 sangria_cuerpo">Renta</span><br />
											<span id="montoRenta"
												class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
										</div>
										<div class="col-lg-6 col-6">
											<span class="titulo_detalle_md_20 sangria_cuerpo">Tiempo
												de amortizaci&oacute;n</span><br /> <span id="tiempoAmortizacion"
												class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
										</div>
									</div>
									<div class="row padding_top_botom_10">
										<div class="col-lg-6 col-6">
											<span class="titulo_detalle_md_20 sangria_cuerpo">Disponibilidad</span><br />
											<div id="disponibilidad"
												class="contenido_cajas_20 sangria_doble_cuerpo">---</div>
											<br />
										</div>
										<div class="col-lg-6 col-6">
											<span class="titulo_detalle_md_20 sangria_cuerpo">Periodo
												de gracia</span><br /> <span id="periodoGracia"
												class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br />
										</div>
									</div>
								</div>
								<div class="col-lg-4 col-4">
									<div class="row padding_top_botom_10">
										<span class="titulo_detalle_md_20 sangria_cuerpo">Checklist</span><br />
									</div>
									<div id="checklistSitio"></div>
								</div>
							</div>


						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-4">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco altura1">

						<div class="col-12 titulo_seccion">
							<span class="titulo_detalle_md_20">FLUJO PEATONAL</span>
							<div id="modulo7Edita" class="float_right" style="display: none;">
								<span><img id="historial7" title="Historial"
									onclick="historialPantalla(7, this);" style="cursor: pointer;"
									src="img/historial_mark.png">&nbsp;</span> <span><img
									id="edita7" title="Guarda cambios"
									onclick="editaPantalla(7, this);" style="cursor: pointer;"
									src="img/edita_mark.png"></span>
							</div>
							<div id="modulo7Creacion" class="float_right">
								<%-- 						<span class="negrita blanco t14">Puntos: </span> <span id="puntosConteos" class="negrita blanco t14">---</span>
 --%>
								<span> <img id="autoriza7" title="Autoriza punto"
									class="sin_autorizar b_autorizar"
									onclick="autorizaPantalla(7, this);" style="cursor: pointer;"
									src="img/autoriza_mark.png">&nbsp;
								</span> <span> <img id="rechaza7" title="Rechaza punto"
									class="sin_autorizar b_rechazar"
									onclick="rechazaPantalla(7, this);" style="cursor: pointer;"
									src="img/rechaza_mark.png">
								</span> <a id="conteosTip" tabindex="0" class="question_mark b_tip"
									role="" data-toggle="popover" data-trigger="focus"
									data-placement="bottom" data-content=""> <img
									style="cursor: pointer;" src="img/question.png">
								</a>
							</div>
						</div>

						<div class="row div_header_sub">
							<span class="contenido_cajas_20 sangria_doble_cuerpo">PROMEDIO:
							</span> <span id="promedioConteos"
								class="titulo_detalle_md_20 sangria_cuerpo">---</span><br />
							<div class="contenedorConteos" id="posConteos"
								style="display: block;">
								<span class="contenido_cajas_20 sangria_doble_cuerpo">PROMEDIO
									AUDITORIA: </span> <span id="promedioConteosAuditoria"
									class="titulo_detalle_md_20 sangria_cuerpo">---</span><br />
							</div>
							<div class="contenedorConteos" id="preConteos"
								style="display: none;">
								<input id="totalConteoAuditor"
									placeholder="Captura el promedio peatonal"
									onkeypress="return isNumberKey(event,this)" id="conteosAuditor"
									style="top: -6px; position: relative; left: 30px; width: 230px; height: 20px; font-size: 0.8em">
								<div id="subeConteo" class="btn btnConteo"
									style="position: relative; top: -13px; left: 40px; height: 20px; padding-top: 1px; font-size: 0.8em">Aceptar</div>
							</div>
						</div>
						<div class="row div_header_sub">
							<div class="col-lg-12">
								<div id="contenedorFlujoPeatonal"
									style="width: 100%; height: 100%; margin: 0 auto"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<jsp:include page="autorizaciones.jsp"></jsp:include>

		</div>
	</div>

	<div id="score_card" class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" style="padding: 10 1rem">
					<h5 class="modal-title">Score Card</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row" id="cabecera_score"></div>
					<table id="score_info"></table>
					<div class="col-12 right" style='margin-top: 20px;'
						id="total_score"></div>
				</div>
				<div class="modal-footer"></div>
			</div>
		</div>
	</div>

	<!-- MODAL INFO FLUJO-HEXAGONOS -->
	<div id="modal_flujo" class="modal fade">
		<div class="modal-dialog" role="document">
			<div class="modal-content">


				<div class="row center fazul div_contenido">
					<div class="col-12">
						<button id="modal_cerrar" type="button" class="close t18"
							data-dismiss="modal" aria-label="Close" style="height: 0;">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="col-12">
						<span><img class="relojito" src="img/reloj_atrasoB.svg"></span>
						<span id="titulo_proceso" class="blanco t14 negrita"></span>
					</div>
				</div>
				<div class="row fblanco" style="padding: 10 0;">
					<div class="col-12 negrita t12 left azul info1"
						style="margin-top: 5"></div>
					<div class="col-12 dato1 left gris"></div>
					<div class="col-12 negrita t12 left azul info2"
						style="margin-top: 5"></div>
					<div class="col-12 dato2 left gris"></div>
					<div class="col-12 negrita t12 left azul info3"
						style="margin-top: 5"></div>
					<div class="col-12 dato3 left gris"></div>
					<div class="col-12 negrita t12 left azul info4"
						style="margin-top: 5"></div>
					<div class="col-12 dato4 left gris"></div>
				</div>


			</div>
		</div>
	</div>
	<!-- FIN MODAL INFO FLUJO-HEXAGONOS -->


	<form style="display: none;" action='memoria_detalle'
		id="detalleMemoriaAsignadaAction" method="post">
		<s:textfield id="mdId" name="mdId" label="" cssStyle="display: none"></s:textfield>
		<s:textfield id="nombreMd" name="nombreMd" label=""
			cssStyle="display: none"></s:textfield>
		<s:textfield id="tipoMd" name="tipoMd" label=""
			cssStyle="display: none"></s:textfield>
	</form>

	<form action='mensajes_historial' id="chatPorMd" method="post">
		<input type="hidden" name="mdIdChat" id="mdIdChat" value="" /> <input
			type="hidden" name="nombreMdChat" id="nombreMdChat" value="" /> <input
			type="hidden" name="tipoMdChat" id="tipoMdChat" value="" />
	</form>

	<form action='sendLevantamiento' id="cabeceroMd" method="post">
		<input type="hidden" name="mdIdlevantamiento" id="mdIdlevantamiento"
			value="" />
	</form>

	<!-- --------------------------------------- -->

	<form style="display: hidden" action="descargaPdfAction" method="POST">
		<input type="hidden" name="pdfmdId" id="pdfmdId"> <input
			type="hidden" name="pdfnombreMd" id="pdfnombreMd"> <input
			type="hidden" name="pdfcategoriaMd" id="pdfcategoriaMd"> <input
			type="hidden" name="pdfpuntos" id="pdfpuntos"> <input
			type="hidden" name="pdfdireccion" id="pdfdireccion"> <input
			type="hidden" name="pdfnombrePropietario" id="pdfnombrePropietario">
		<input type="hidden" name="pdftelefonoPropietario"
			id="pdftelefonoPropietario"> <input type="hidden"
			name="pdfemailPropietario" id="pdfemailPropietario"> <input
			type="hidden" name="pdflat" id="pdflat"> <input type="hidden"
			name="pdflon" id="pdflon"> <input type="hidden"
			name="pdfurlmapa" id="pdfurlmapa"> <input type="hidden"
			name="pdfurlmapa_pag1" id="pdfurlmapa_pag1"> <input
			type="hidden" name="pdfurlmapa_pag3" id="pdfurlmapa_pag3"> <input
			type="hidden" name="pdfmarkers_comp" id="pdfmarkers_comp"> <input
			type="hidden" name="pdfmarkers_gen" id="pdfmarkers_gen"> <input
			type="hidden" name="pdffrenteMd" id="pdffrenteMd"> <input
			type="hidden" name="pdfprofundidadMd" id="pdfprofundidadMd">
		<input type="hidden" name="pdftamanioTotalMd" id="pdftamanioTotalMd">
		<input type="hidden" name="pdfvistaFrontalMd" id="pdfvistaFrontalMd">
		<input type="hidden" name="pdfvistaLateral1Md" id="pdfvistaLateral1Md">
		<input type="hidden" name="pdfvistaLateral2Md" id="pdfvistaLateral2Md">

		<input type="hidden" name="pdffactor" id="pdffactor"> <input
			type="hidden" name="pdftipo" id="pdftipo"> <input
			type="hidden" name="pdfsubfactores" id="pdfsubfactores"> <input
			type="hidden" name="pdfsubfactoresdesc" id="pdfsubfactoresdesc">
		<input type="hidden" name="pdfcomentarios" id="pdfcomentarios">

		<input type="hidden" name="pdfrenta" id="pdfrenta"> <input
			type="hidden" name="pdfamortizacion" id="pdfamortizacion"> <input
			type="hidden" name="pdfdisponibilidad" id="pdfdisponibilidad">
		<input type="hidden" name="pdftiempo_amortizacion"
			id="pdftiempo_amortizacion"> <input type="hidden"
			name="pdfgracia" id="pdfgracia"> <input type="hidden"
			name="pdfconteos" id="pdfconteos"> <input type="hidden"
			name="generalidades_checkList" id="generalidades_checkList">

		<input type="submit" id="submitBotonDescargaPdf" style="display: none" />
	</form>
	<!-- --------------------------------------- -->
	<div class="d-none">
		<form  target="_blank" action="memoria_detalle" id="detalleMemoriaAsignadaActionMD" method="post">
			<input type="hidden" name="mdId" id="mdId2" value="">
			<input type="hidden" name="nombreMd" id="nombreMd2" value="">
			<input type="hidden" name="tipoMd" id="tipoMd2" value="">
		</form>
	</div>

	<div id="modalImages" class="modalImagen">
		<span class="closeModal">&times;</span>
		<div class="row" style="width: 100%;">
			<div class="col-6">
				<div class="t18 blanco negrita" id="captionModal"></div>
			</div>
			<div class="col-5 right" style="padding-right: 30px;">
				<input type="button" class="btn desp" id="derecha"
					onclick="rotar(0);"> <input type="button" class="btn desp"
					id="izquierda" onclick="rotar(1);"> <input type="button"
					class="btn desp" id="aumentar" onclick="rotar(3);"> <input
					type="button" class="btn desp" id="disminuir" onclick="rotar(4);">
			</div>
		</div>
		<div id="contenedor-imagen">
			<div style="width: 100%; height: -webkit-fill-available;">
				<img class="modal-content rotate_left" id="imageModal">
			</div>
		</div>

	</div>

	<jsp:include page="/jsp/generic/loading.jsp" />
	<jsp:include page="/jsp/generic/mensajes.jsp" />
	<jsp:include page="/jsp/generic/modalAutorizacion.jsp" />



	<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
	<!-- Bootstrap core JavaScript -->
	<script
		src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script
		src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script
		src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js"
		type="text/javascript"></script>
	<script
		src="${pageContext.request.contextPath}/highcharts/highcharts.js"></script>
	<script
		src="${pageContext.request.contextPath}/highcharts/highcharts-more.js"></script>
	<script
		src="${pageContext.request.contextPath}/highcharts/js/modules/data.js"></script>
	<script
		src="${pageContext.request.contextPath}/highcharts/js/modules/exporting.js"></script>
	<script
		src="${pageContext.request.contextPath}/highcharts/js/modules/export-data.js"></script>
	<script
		src="${pageContext.request.contextPath}/js/progress/progressbar.js"></script>
	<script
		src="${pageContext.request.contextPath}/js/progress/progressbar.min.js"></script>
	<script src="${pageContext.request.contextPath}/css/slick/slick.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script
		src="${pageContext.request.contextPath}/js/dropzone/dropzone.js"></script>
	<script
		src="${pageContext.request.contextPath}/js/dropzone/dateFormat.js"></script>
	<script
		src="${pageContext.request.contextPath}/js/detalleMemoriaAsignada.js"></script>
	<script
		src="${pageContext.request.contextPath}/js/hexagonos_detalle.js"></script>
	<script src="${pageContext.request.contextPath}/js/autorizaciones.js"></script>
	<script
		src="${pageContext.request.contextPath}/js/utiles/modalImages.js"></script>
	<script src="${pageContext.request.contextPath}/js/descargaPdf.js"></script>
</body>
</html>