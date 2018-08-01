<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!-- &emsp;  &nbsp;-->
<html>
<head>
<link rel="shortcut icon" href="img/favicon.png" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 -->  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/dropzone/dropzone.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/asignadas.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/utiles/modalImages.css" />
<title>Detalle MD</title>
</head>
<body>
	<c:forEach var="permiso" items="${usr.perfil.perfilesxusuario[0].permisos}">
    	<input type="hidden" class="permisos_detalleMd" rel="${permiso.getFIMODULOID()}" value="${permiso.toJSON()}">
    </c:forEach>
    <input type="hidden" id="areaUsuario" value="${usr.perfil.areasxpuesto[0].areaId}">
    <input type="hidden" id="nombreAreaUsuario" value="${usr.perfil.areasxpuesto[0].areaNom}">
    <input type="hidden" id="nombreCompletoUsuario" value="${usr.perfil.nombre} ${usr.perfil.apellidoP} ${usr.perfil.apellidoM}">
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p">
	<div class="col-lg-12 titulo azul t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > <span id="titulo_tipo"></span> > <span id="nombreMdTxt"></span>></div>

			<div class="col-lg-12"
				style="padding-left: 20px; padding-right: 20px;">
				<div class="row div_header menupr_estilos fazul"
					style="margin-bottom: 10px;">

					<div class="col-lg-3" style="padding-top: 8px;">
						<span class="negrita t14 blanco">Seguimiento de Autorización</span>
					</div>
					<div class="col-lg-9" style="padding-top: 8px">
						<div class="row div_header menupr_estilos fazul">
						
							<div id="gerenteExpansionDiv" class="col-lg-3" style="min-width: 210px; max-width: 215px;">
								<div id="circuloAutorizaGerenteExpansion"
									class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
								<div style="position: relative; float: left;">
									<span class="azul t12">&nbsp;&nbsp; <a
										id="gerenteExpansionSegPop" tabindex="0" class="blanco t14" role=""
										data-toggle="popover" data-trigger="focus"
										data-placement="bottom" data-content="">Gerente de
											expansión</a>
									</span> <img id="gerenteExpansionImg"
										src="img/b_ATRASADAS.png"
										style="width: 17px; display: none;">
								</div>
							</div>
							<div id="expansionDiv" class="col-lg-2 min_width">
								<div id="circuloAutorizaExpansion" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
								<div style="position: relative; float: left;">
									<span class="azul t12">&nbsp;&nbsp; <a
										id="expansionSegPop" tabindex="0" class="blanco t14" role=""
										data-toggle="popover" data-trigger="focus"
										data-placement="bottom" data-content="">Expansión</a>
									</span> <img id="expansionImg" src="img/b_ATRASADAS.png"
										style="width: 17px; display: none;">
								</div>
							</div>
							
							<div id="auditoriaDiv" class="col-lg-2 min_width">
								<div id="circuloAutorizaAuditoria" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
								<div style="position: relative; float: left;">
									<span class="azul t12">&nbsp;&nbsp; <a
										id="auditoriaSegPop" tabindex="0" class="blanco t14" role=""
										data-toggle="popover" data-trigger="focus"
										data-placement="bottom" data-content="">Auditoria</a>
									</span> <img id="auditoriaImg" src="img/b_ATRASADAS.png"
										style="width: 17px; display: none;">
								</div>
							</div>
							
							<div id="gestoriaDiv" class="col-lg-2 min_width">
								<div id="circuloAutorizaGestoria" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
								<div style="position: relative; float: left;">
									<span class="azul t12">&nbsp;&nbsp; <a
										id="gestoriaSegPop" tabindex="0" class="blanco t14" role=""
										data-toggle="popover" data-trigger="focus"
										data-placement="bottom" data-content="">Gestoría</a>
									</span> <img id="gestoriaImg" src="img/b_ATRASADAS.png"
										style="width: 17px; display: none;">
								</div>
							</div>
							<div id="construccionDiv" class="col-lg-2 min_width">
								<div id="circuloAutorizaConstruccion" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
								<div style="position: relative; float: left;">
									<span class="azul t12">&nbsp;&nbsp; <a
										id="construccionSegPop" tabindex="0" class="blanco t14" role=""
										data-toggle="popover" data-trigger="focus"
										data-placement="bottom" data-content="">Construcción</a>
									</span> <img id="construccionImg" src="img/b_ATRASADAS.png"
										style="width: 17px; display: none;">
								</div>
							</div>
							<div id="operacionesDiv" class="col-lg-3 min_width">
								<div id="circuloAutorizaOperaciones" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
								<div style="position: relative; float: left;">
									<span class="azul t12">&nbsp;&nbsp; <a
										id="operacionesSegPop" tabindex="0" class="blanco t14" role=""
										data-toggle="popover" data-trigger="focus"
										data-placement="bottom" data-content="">Operaciones</a>
									</span> <img id="operacionesImg" src="img/b_ATRASADAS.png"
										style="width: 17px; display: none;">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-4 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">
				<span id="nombreMd" class="negrita azul t14">---</span><br/>
				<div class="float_right" style="top: -17px;">
					<span><img id="mensajesMD" title="Ver mensajes" class="autorizado" onclick="muestraChatXMd();" style="cursor: pointer;" src="img/iconos_COMENTARIOS.png">&nbsp;</span>
				</div>
			</div>
				<div style="width: 50%;position: relative; float: left;text-align: center">
					<span class="azul t12" style="font-size: .7em;">Creado por <span id="creadorMd">---</span></span><br/>
					<span class="negrita azul t14">CATEGORÍA</span><br/>
					<span id="categoriaMd" class="circulo negrita">---</span>
				</div>
				<div style="width: 50%;position: relative; float: left;text-align: center;">
					<span class="azul t12">Creada el <span id="fechaCreacion">---</span></span><br/>
					<span class="negrita azul t14">PUNTUACIÓN</span><br/>
					<span class="azul t12"><span id="puntuacionMd">---</span> puntos</span><br/>
					<span id="estrellasMd" class="azul t12"></span>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: center">
					<span class="negrita azul t14">UBICACIÓN</span>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: center">
				<div class="col-12" id="map"></div>
					<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuFdkYUDivTv_TrR4RZMWP1NYCA0MK2YM">
					</script>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4 altura1">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">
				<span class="negrita azul t14">1) Datos del sitio</span>
				<div id="modulo1Edita" class="float_right" style="display: none;">
                    <span><img id="historial1" title="Historial" onclick="historialPantalla(1, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita1" title="Guarda cambios" onclick="editaPantalla(1, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo1Creacion" class="float_right">
					<span><img id="autoriza1" title="Autoriza punto" class="sin_autorizar b_autorizar" onclick="autorizaPantalla(1, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
						<span><img id="rechaza1" title="Rechaza punto" class="sin_autorizar b_rechazar" onclick="rechazaPantalla(1, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
						</span>
				</div>
			</div>
			<div id="modulo1Datos" style="width: 100%;position: relative; float: left;text-align: left">
					<span class="negrita azul t14 sangria_cuerpo">Calle</span><br/>
					<span id="calleMd" class="azul t12 sangria_doble_cuerpo">---</span><br/>
					<span class="negrita azul t14 sangria_cuerpo">Colonia</span><br/>
					<span id="coloniaMd" class="azul t12 sangria_doble_cuerpo">---</span><br/>
					<span class="negrita azul t14 sangria_cuerpo">Municipio</span><br/>
					<span id="municipioMd" class="azul t12 sangria_doble_cuerpo">---</span><br/>
					<span class="negrita azul t14 sangria_cuerpo">Ciudad</span><br/>
					<span id="ciudadMd" class="azul t12 sangria_doble_cuerpo">---</span><br/>
					<span class="negrita azul t14 sangria_cuerpo">Estado</span><br/>
					<span id="estadoMd" class="azul t12 sangria_doble_cuerpo">---</span><br/>
					<span class="negrita azul t14 sangria_cuerpo">Código postal</span><br/>
					<span id="codiPostalMd" class="azul t12 sangria_doble_cuerpo">---</span><br/>
			</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4 altura1">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">
				<span class="negrita azul t14">2) Datos del propietario</span>
				<div id="modulo2Edita" class="float_right" style="display: none;">
                    <span><img id="historial2" title="Historial" onclick="historialPantalla(2, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita2" title="Guarda cambios" onclick="editaPantalla(2, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo2Creacion" class="float_right">
					<span>
						<img id="autoriza2" title="Autoriza punto" class="sin_autorizar b_autorizar" onclick="autorizaPantalla(2, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza2" title="Rechaza punto" class="sin_autorizar b_rechazar" onclick="rechazaPantalla(2, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
				</div>
			</div>
			<div id="modulo2Datos" style="width: 100%;position: relative; float: left;text-align: left">
				<span class="negrita azul t14 sangria_cuerpo">Número propietario</span><br/>
				<span id="propietarioId" class="azul t12 sangria_doble_cuerpo">---</span><br/>
				<span class="negrita azul t14 sangria_cuerpo">Nombre</span><br/>
				<span id="nombrePropietario" class="azul t12 sangria_doble_cuerpo">---</span><br/>
				<span class="negrita azul t14 sangria_cuerpo">Teléfono</span><br/>
				<span id="telefonoPropietario" class="azul t12 sangria_doble_cuerpo">---</span><br/>
				<span class="negrita azul t14 sangria_cuerpo">Email</span><br/>
				<span id="emailPropietario" class="azul t12 sangria_doble_cuerpo">---</span><br/>
				<span id="rentaANeto" class="negrita azul t14 sangria_doble_cuerpo">---</span><br/>
			</div>
			</div>
		</div>
		</div>

			<div class="col-lg-12">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fazul">
						<div class="col-12 titulo_seccion">
							<span class="negrita blanco t14">3) Superficie</span>
							<div id="modulo3Edita" class="float_right" style="display: none;">
                                <span><img id="historial3" title="Historial" onclick="historialPantalla(3, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                                <span><img id="edita3" title="Guarda cambios" onclick="editaPantalla(3, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                            </div>
							<div id="modulo3Creacion" class="float_right">
								<span class="negrita blanco t14">Puntos: </span> <span
									id="puntosSuperficie" class="negrita blanco t14">---</span> <span>
									<img id="autoriza3" title="Autoriza punto"
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
						
						<%-- <div class="col-12"style="padding-left:0px;">
						<span class="blanco t12">LOCAL EN ESQUINA</span>&nbsp;&nbsp;&nbsp;<span
									 id="esquina" class="negrita blanco t14">---</span>
						</div>
						
						<div class="col-12" style="padding-left:0px;">
									<span class="blanco t12">NEGOCIOS</span>&nbsp;&nbsp;&nbsp;<span
									id="negocios" class="negrita blanco t14">---</span>
						</div>
						<div class="col-12"style="padding-left:0px;">
						<span class="blanco t12">NEGOCIOS DE COMIDA</span>&nbsp;&nbsp;&nbsp;<span
									 id="negocios_comida" class="negrita blanco t14">---</span>
						</div> --%>
						
						<div class="row div_header_sub">
							<div class="col-lg-4">
								<span class="blanco t12">FRENTE</span>&nbsp;&nbsp;&nbsp;<span
									id="frenteMd" class="negrita blanco t14">---</span>
							</div>
							<div class="col-lg-4">
								<span class="blanco t12">PROFUNDIDAD</span>&nbsp;&nbsp;&nbsp;<span
									id="profundidadMd" class="negrita blanco t14 sangria_cuerpo">---</span>
							</div>
							<div class="col-lg-4">
								<span class="blanco t12">SUPERFICIE TOTAL</span>&nbsp;&nbsp;&nbsp;<span
									id="tamanioTotalMd" class="negrita blanco t14 sangria_cuerpo">---</span>
							</div>
						</div>
						<div class="row div_header_sub">
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="blanco t12">LATERAL 1</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="vistaLateral1Md" alt="LATERAL 1"
										style="width: 100%; max-height: 300" src="img/no_imagen.png"
										onclick="modalImage(this)" />
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
								<div class="col-lg-12" style="padding:0;">
									<span class="blanco t12">VISTA FRONTAL</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="vistaFrontalMd"
										alt="VISTA FRONTAL" style="width: 100%; max-height: 300"
										src="img/no_imagen.png" onclick="modalImage(this)" />
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
								<div class="col-lg-12" style="padding:0;">
									<span class="blanco t12 ">LATERAL 2</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="vistaLateral2Md" alt="LATERAL 2"
										style="width: 100%; max-height: 300" src="img/no_imagen.png"
										onclick="modalImage(this)" />
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
					</div>
				</div>
			</div>

			<div class="col-lg-8 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			
			<div class="col-12 titulo_seccion">
				<span class="negrita azul t14">4) Zonificación</span>
				<div id="modulo4Edita" class="float_right" style="display: none;">
                    <span><img id="historial4" title="Historial" onclick="historialPantalla(4, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita4" title="Guarda cambios" onclick="editaPantalla(4, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo4Creacion" class="float_right">
					<span class="negrita azul t14">Puntos: </span> <span id="puntosZonificacion" class="negrita azul t14">---</span>
					<span>
						<img id="autoriza4" title="Autoriza punto" class="sin_autorizar b_autorizar" onclick="autorizaPantalla(4, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza4" title="Rechaza punto" class="sin_autorizar b_rechazar" onclick="rechazaPantalla(4, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
					<a id="zonificacionTip" tabindex="0" class="question_mark b_tip" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png"></a>		
				</div>
			</div>
			
				<div class="row div_header_sub">
					<div class="col-lg-9 col-6"><div id="mapaZonificacion" style="width: 100%; height: 85%; position: relative; float: left;"></div></div>
					<div class="col-lg-3 col-6">
						<div class="row">
							<div style="width: 100%;text-align: center;">
								<span class="azul t12">COMPETENCIA</span><br/>
								<div>
									<img width="30px" src="img/competencia/iconos_3b.png">&nbsp;
									<img width="30px" src="img/competencia/iconos_express.png">&nbsp;
									<img width="30px" src="img/competencia/iconos_oxxo.png">&nbsp;
									<!--  <img width="30px" src="img/competencia/iconos_seven.png">&nbsp;-->
									<!--  <img width="30px" src="img/competencia/iconos_k.png">&nbsp;-->
									<img width="30px" src="img/competencia/icono_otros_2.png">&nbsp;
								</div>
							</div>
						</div>
						<div class="row" style="padding-top: 30px;">
							<div class="col-lg-12 col-12"><span class="azul t12">GENERADORES DE TRÁFICO</span></div>
							<div class="col-lg-12 col-12" style="padding-top: 10px;">
								<div class="row">
									<div class="col-lg-4 col-4"><img width="30px" src="img/generadores/iglesia.png"><br/><span class="subtituloIconos">Iglesia</span></div>
									<div class="col-lg-4 col-4"><img width="30px" src="img/generadores/tortilleria.png"><br/><span class="subtituloIconos">Tortillería</span></div>
									<div class="col-lg-4 col-4"><img width="30px" src="img/generadores/escuela.png"><br/><span class="subtituloIconos">Escuela</span></div>
								</div>
							</div>
							<div class="col-lg-12 col-12">
								<div class="row">
									<div class="col-lg-4 col-4"><img width="30px" src="img/generadores/recauderia.png"><br/><span class="subtituloIconos">Recaudería</span></div>
									<div class="col-lg-4 col-4"><img width="30px" src="img/generadores/mercado.png"><br/><span class="subtituloIconos">Mercado</span></div>
									<div class="col-lg-4 col-4"><img width="30px" src="img/generadores/carniceria.png"><br/><span class="subtituloIconos">Carnicería</span></div>
								</div>
							</div>
							<div class="col-lg-12 col-12">
								<div class="row">
									<div class="col-lg-4 col-4"><img width="30px" src="img/generadores/icono_otros_generadores.png"><br/><span class="subtituloIconos">Otros</span></div>
									<div class="col-lg-4 col-4">&nbsp;</div>
									<div class="col-lg-4 col-4">&nbsp;</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			
			<div class="col-12 titulo_seccion">
				<span class="negrita azul t14">5) Construcción</span>
				<div id="modulo5Edita" class="float_right" style="display: none;">
                    <span><img id="historial5" title="Historial" onclick="historialPantalla(5, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita5" title="Guarda cambios" onclick="editaPantalla(5, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo5Creacion" class="float_right">
						<span class="negrita azul t14">Puntos: </span> <span id="puntosConstruccion" class="negrita azul t14">---</span>
					<span>
						<img id="autoriza5" title="Autoriza punto" class="sin_autorizar b_autorizar" onclick="autorizaPantalla(5, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza5" title="Rechaza punto" class="sin_autorizar b_rechazar" onclick="rechazaPantalla(5, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
						<a id="construccionTip" tabindex="0" class="question_mark b_tip" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png"></a>
				</div>
			</div>
			
				<div id="factoresConstruccion" style="width: 100%; height: 150px;  overflow-y: scroll; position: relative; float: left;text-align: left">
				</div>
				<div id="condicionesConstruccion" style="width: 100%;position: relative; float: left;text-align: left">
					<span class="azul t12 sangria_cuerpo">CONDICIONES GENERALES</span><br/>
					<span id="condicionesGeneralesEstatus" class="azul t12 sangria_doble_cuerpo">---</span><br/>
				</div>
			</div>
		</div>
		</div>

	
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fazul altura1">
			
			<div class="row" style="padding-top:4px;">
			<div class="col-6 ">
				<span class="negrita blanco t14">6) Generalidades del sitio</span></div>
				
			<div class="col-6  right">
				<div id="modulo6Edita" class="float_right" style="display: none;">
                    <span><img id="historial6" title="Historial" onclick="historialPantalla(6, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita6" title="Guarda cambios" onclick="editaPantalla(6, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo6Creacion" class="">
						<span class="negrita blanco t14">Puntos: </span> <span id="puntosGeneralidades" class="negrita blanco t14">---</span>
					<span>
						<img id="autoriza6" title="Autoriza punto" class="sin_autorizar b_autorizar" onclick="autorizaPantalla(6, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza6" title="Rechaza punto" class="sin_autorizar b_rechazar" onclick="rechazaPantalla(6, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
						<a id="generalidadesTip" tabindex="0" class="question_mark b_tip" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png"></a>
				</div>
			</div>
			</div>
			<div id="modulo6Datos" class="row div_header_sub">
				<div class="col-12">
					<span class="negrita blanco t14 sangria_cuerpo">Renta</span><br/>
					<span id="montoRenta" class="blanco t12 sangria_cuerpo">---</span><br/>
					<span class="negrita blanco t14 sangria_cuerpo">Disponibilidad</span><br/>
					<span id="disponibilidad" class="blanco t12 sangria_cuerpo">---</span><br/>
					<span class="negrita blanco t14 sangria_cuerpo">Amortización</span><br/>
					<span id="amortizacion" class="blanco t12 sangria_cuerpo">---</span><br/>
					<span class="negrita blanco t14 sangria_cuerpo">Tiempo de amortización</span><br/>
					<span id="tiempoAmortizacion" class="blanco t12 sangria_cuerpo">---</span><br/>
					<span class="negrita blanco t14 sangria_cuerpo">Periodo de gracia</span><br/>
					<span id="periodoGracia" class="blanco t12 sangria_cuerpo">---</span><br/>
				</div>
			</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fazul altura1">
			
			<div class="col-12 titulo_seccion">
				<span class="negrita blanco t14">7)  Flujo peatonal</span>
				<div id="modulo7Edita" class="float_right" style="display: none;">
                    <span><img id="historial7" title="Historial" onclick="historialPantalla(7, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita7" title="Guarda cambios" onclick="editaPantalla(7, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo7Creacion" class="float_right">
						<span class="negrita blanco t14">Puntos: </span> <span id="puntosConteos" class="negrita blanco t14">---</span>
					<span>
						<img id="autoriza7" title="Autoriza punto" class="sin_autorizar b_autorizar" onclick="autorizaPantalla(7, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza7" title="Rechaza punto" class="sin_autorizar b_rechazar" onclick="rechazaPantalla(7, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
					<a id="conteosTip" tabindex="0" class="question_mark b_tip" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png">
					</a>
				</div>
			</div>
			
				<div class="row div_header_sub">
					<span class="blanco t12 sangria_doble_cuerpo">PROMEDIO: </span>
					<span id="promedioConteos" class="negrita blanco t14 sangria_cuerpo">---</span><br/>
					<div class="contenedorConteos" id="posConteos" style="display: block;">
						<span class="blanco t12 sangria_doble_cuerpo">PROMEDIO AUDITORIA: </span>
						<span id="promedioConteosAuditoria" class="negrita blanco t14 sangria_cuerpo">---</span><br/>
					</div>
					<div class="contenedorConteos" id="preConteos" style="display: none;">
						<input id="totalConteoAuditor" placeholder="Captura el promedio peatonal" onkeypress="return isNumberKey(event,this)" id="conteosAuditor" style="top: -6px; position: relative;left: 30px; width: 230px;height: 20px; font-size: 0.8em">
						<div id="subeConteo" class="btn btnBlanco" style="position: relative;top: -13px;left: 40px;height: 20px; padding-top: 1px; font-size: 0.8em">Aceptar</div>
					</div>
				</div>
				<div class="row div_header_sub">
					<div class="col-lg-12"><div id="contenedorFlujoPeatonal" style="width: 100%; height: 68%; margin: 0 auto"></div></div>
				</div>
			</div>
		</div>
		</div>

			<div class="col-lg-4" id="voboMD">
				<div class="row divs_p">
					<div id="divCalificacionFinal" class="col-lg-12 menupr_estilos fazul altura1">
						<div class="col-12 titulo_seccion">
							<span class="negrita blanco t14">8) Autorización final</span>
							<div class="float_right">
								<span> <img id="autoriza8" title="Autoriza punto"
									class="sin_autorizar b_autorizar" onclick="finalizaMD(1);"
									style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
								</span> <span> <img id="rechaza8" title="Rechaza punto"
									class="sin_autorizar b_rechazar" onclick="finalizaMD(0);"
									style="cursor: pointer;" src="img/rechaza_mark.png">
								</span>
							</div>
						</div>

						<div
							style="width: 100%; position: relative; float: left; text-align: left; padding-top: 20px;">
							<div id="containerProgreso"></div>
						</div>
						<div
							style="width: 100%; position: relative; float: left; text-align: center; padding-top: 20px;">
							<span class="subtituloIconos blanco">Progreso autorización
								puntos</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="col-lg-4" id="voboFinal" style="display: none;">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fazul altura1">
						<div class="col-12 titulo_seccion">
							<span class="negrita blanco t14">8) Autorización final</span>
							<div class="float_right">
								<span> <img id="autoriza9" title="Autoriza punto"
									class="sin_autorizar b_autorizar" onclick="finalizaMD(1);"
									style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
								</span> <span> <img id="rechaza9" title="Rechaza punto"
									class="sin_autorizar b_rechazar" onclick="finalizaMD(0);"
									style="cursor: pointer;" src="img/rechaza_mark.png">
								</span>
							</div>
						</div>

						<div style="width: 100%; position: relative; float: left; text-align: left; padding-top: 20px;">
							<div id="containerFilesVoboFinal"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-12" " id="manejadorArchivos" style="display: none;">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fazul altura1">
						<div class="col-12 titulo_seccion">
							<span class="negrita blanco t14">** Documentos **</span>
						</div>
						<div class="row div_header_sub">
							
							<div class="col-lg-4"><!-- DropZone -->
								<div style="display: none;" id="msjUploader"></div>
								<div id="contenedorUploader">
									<form action="/uploadLayout" class="dropzone" id="uploader"></form>
									<span class="simbolo">$</span>
									<input id="montoPresupuesto" onkeypress="return isNumberKey(event,this)" style="display: none;">
									<div id="subeArchivo" class="btn btnBlanco" style="display:none;">Aceptar</div>
								</div>
							</div>
							
							
							<div class="col-lg-4"><!-- Files -->
								<div class="filesMD"></div>
							</div>
							<div class="col-lg-4"><!-- Comments -->
								<div class="commentsByFile"></div>
								<div class="commentFileContainer" style="display: none;">
									<div class="tituloComment"></div>
									<div id="motivoRechazoLayout"></div>
									<textarea rows="4" cols="50" id="commentFile"></textarea>
									<div id="submitComment" class="btn btnBlanco">Aceptar</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
</div>

<form style="display: none;" action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="post">
	<s:textfield id="mdId" name="mdId" label="" cssStyle="display: none"></s:textfield>
	<s:textfield id="nombreMd" name="nombreMd" label="" cssStyle="display: none"></s:textfield>	
	<s:textfield id="tipoMd" name="tipoMd" label="" cssStyle="display: none"></s:textfield>	
</form>

<form action='mensajes_historial'  id="chatPorMd" method="post">
	<input type="hidden" name="mdIdChat" id="mdIdChat" value=""/>
</form>

<div id="modalImages" class="modalImagen">
  <span class="closeModal">&times;</span>
  <img class="modal-content" id="imageModal">
  <div id="captionModal"></div>
</div>

<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />
<jsp:include page="/jsp/generic/modalAutorizacion.jsp" />

		


	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/highcharts.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/data.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/exporting.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/export-data.js"></script>
	<script src="${pageContext.request.contextPath}/js/progress/progressbar.js"></script>
	<script src="${pageContext.request.contextPath}/js/progress/progressbar.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/dropzone/dropzone.js"></script>
	<script	src="${pageContext.request.contextPath}/js/dropzone/dateFormat.js"></script>
	<script	src="${pageContext.request.contextPath}/js/detalleMemoriaAsignada.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/modalImages.js"></script>
	</body>
</html>