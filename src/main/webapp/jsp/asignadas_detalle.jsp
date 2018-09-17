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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/slick/slick.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/slick/slick-theme.css" />
<title>Detalle MD</title>
</head>
<body>
	<c:forEach var="permiso" items="${usr.perfil.perfilesxusuario[0].permisos}">
    	<input type="hidden" class="permisos_detalleMd" rel="${permiso.getFIMODULOID()}" value="${permiso.toJSON()}">
    </c:forEach>
    <input type="hidden" id="areaUsuario" value="${usr.perfil.areasxpuesto[0].areaId}">
    <input type="hidden" id="puestoUsuario" value="${usr.perfil.puestoId}">
    <input type="hidden" id="usuarioId" value="${usr.perfil.numeroEmpleado}">
    <input type="hidden" id="nombreAreaUsuario" value="${usr.perfil.areasxpuesto[0].areaNom}">
    <input type="hidden" id="nombreCompletoUsuario" value="${usr.perfil.nombre} ${usr.perfil.apellidoP} ${usr.perfil.apellidoM}">
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p">
	<div class="col-lg-12 titulo azul t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > <span id="titulo_tipo"></span> > <span id="nombreMdTxt"></span>></div>
			<div class="col-12"  style="padding-left:0;">
				<button class="btn atras" type="button" onclick="history.back()"></button>
			</div>
			<div class="col-lg-12" style="padding-left: 20px; padding-right: 20px;">
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
			<div class="row">
			<div class="col-lg-6">
			<span class="titulo_detalle_md_20" id="labelNombre"></span><input class="titulo_detalle_md_20 text_edita" style="text-transform: uppercase;" value="---" type="text" id="nombreMd" readonly />
			</div>
			<div class="col-lg-6 right">
			<span>
				<img id="botondescarga" title="Descarga PDF" class="autorizado" style="cursor: pointer;" src="img/iconos_DOWNLOAD.png">&nbsp;
			</span>
			<span>
				<img id="mensajesMD" title="Ver mensajes" class="autorizado" onclick="muestraChatXMd();" style="cursor: pointer;" src="img/iconos_COMENTARIOS.png">&nbsp;
			</span>
			</div>
			
			<div class="col-lg-7" id="responsable">
			<span class="contenido_cajas_20">Creado por <span id="creadorMd">---</span></span>
			</div>			
			
			<div class="col-lg-5 right">
				<span class="contenido_cajas_20">Creada el <span id="fechaCreacion">---</span></span>
			</div>
			<div class="col-4 center"><span class="titulo_detalle_md_20 center">CATEGORÍA</span><br>
				<span id="categoriaMd" class="circulo negrita">---</span></div>
			<div class="col-4 center"><span class="titulo_detalle_md_20 center">PUNTUACIÓN</span><br>
				<span id="estrellasMd" class="azul t12"></span><br>
				<span class="contenido_cajas_20"><span id="puntuacionMd">---</span></span><br/>
			</div>
			<div class="col-4 center">
				<span class="titulo_detalle_md_20 center" id="tipoMdTitulo" style="display:none;">TIPO </span><br>
				<span id="tipoMdImagen" class="azul t12"></span><br>
				<span class="contenido_cajas_20"><span id="tipoMdtexto"></span></span>
				<!-- <span class="azul t12 cursor" style="text-decoration:underline;" onclick="consultaScore()"><span>Ver detalle</span></span>-->
			</div>	
			</div>
			<div class="row" style="padding-top: 5px;">
				<div class="col-lg-12"><span class="negrita azul t14">UBICACIÓN</span></div>
			</div>
			</div>
			<div class="col-12" id="map"></div>
				<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuFdkYUDivTv_TrR4RZMWP1NYCA0MK2YM">
				</script>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4 altura1">
		<div class="row divs_p">
			<div class="slick_main col-lg-12 menupr_estilos fblanco altura1">
				<div class="col-12 titulo_seccion">
					<span class="titulo_detalle_md_20">SCORE CARD</span><br/>
					<span class="titulo_detalle_md_20 sangria_cuerpo">Macro ubicaci&oacute;n</span><br/>
					<div id="macroUbicacionChart"></div>
				</div>
				<div class="col-12 titulo_seccion">
					<span class="titulo_detalle_md_20">SCORE CARD</span><br/>
					<span class="titulo_detalle_md_20 sangria_cuerpo">Micro ubicaci&oacute;n</span><br/>
					<div id="microUbicacionChart"></div>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4 altura1 padding_movil_10">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">
				<span class="titulo_detalle_md_20">DATOS DEL SITIO Y PROPIETARIO</span>
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
			<div class="row" id="modulo2Datos" style="width: 100%;position: relative; float: left;text-align: left">
				<div class="col-lg-12 padding_top_botom_5">
					<span class="titulo_detalle_md_20 sangria_cuerpo">Direcci&oacute;n</span><br/>
					<span id="direccion" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
				</div>
				<div class="col-lg-12 padding_top_botom_5">
					<span class="titulo_detalle_md_20 sangria_cuerpo">Nombre propietario</span><br/>
					<span id="nombrePropietario" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
				</div>
				<div class="col-lg-12 padding_top_botom_5">
					<span class="titulo_detalle_md_20 sangria_cuerpo">Teléfono</span><br/>
					<span id="telefonoPropietario" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
				</div>
				<div class="col-lg-12 padding_top_botom_5">
					<span class="titulo_detalle_md_20 sangria_cuerpo">Email</span><br/>
					<span id="emailPropietario" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
				</div>
				<div class="col-lg-12 padding_top_botom_5">
					<span id="rentaANeto" class="titulo_detalle_md_20 sangria_doble_cuerpo">---</span><br/>
				</div>
			</div>
			</div>
		</div>
		</div>

			<div class="col-lg-12 col-12 padding_movil_10">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco">
						<div class="row titulo_seccion">
							<div class="col-lg-8 col-6">
								<span class="titulo_detalle_md_20">SUPERFICIE</span>
							</div>
							<div class="col-lg-2 col-2">
								<input type="checkbox" class="form-check-input" id="esquina"  onclick="return false;">
    							<label class="contenido_cajas_20" for="esquina">Local en esquina</label>
							</div>
							<div class="col-lg-2 col-4">
								<div id="modulo3Edita" class="float_right" style="display: none;">
                                	<span><img id="historial3" title="Historial" onclick="historialPantalla(3, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                                	<span><img id="edita3" title="Guarda cambios" onclick="editaPantalla(3, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                            	</div>
								<div id="modulo3Creacion" class="float_right">
									<%-- <span class="negrita blanco t14">Puntos: </span> <spanid="puntosSuperficie" class="negrita blanco t14">---</span>  --%>
										<span>
											<img id="autoriza3" title="Autoriza punto" class="sin_autorizar b_autorizar" onclick="autorizaPantalla(3, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
										</span> 
										<span> <img id="rechaza3" title="Rechaza punto" class="sin_autorizar b_rechazar"
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
								<span id="muestraPredial" style="color: #FFF; text-decoration: underline; cursor: pointer;font-size: 14px;display: none;">Ver predial</span>
							</div>
						</div>
						<div class="row div_header_sub" id="modulo3Datos">
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20">FRENTE</span>&nbsp;&nbsp;&nbsp;
								<span id="frenteMd" class="contenido_cajas_20">---</span>
							</div>
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20">PROFUNDIDAD</span>&nbsp;&nbsp;&nbsp;
								<span id="profundidadMd" class="contenido_cajas_20 sangria_cuerpo">---</span>
							</div>
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20">SUPERFICIE TOTAL</span>&nbsp;&nbsp;&nbsp;
								<span id="tamanioTotalMd" class="contenido_cajas_20 sangria_cuerpo">---</span>
							</div>
						</div>
						<div class="row div_header_sub">
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="contenido_cajas_20">LATERAL 1</span>
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
									<span class="contenido_cajas_20">VISTA FRONTAL</span>
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
									<span class="contenido_cajas_20">LATERAL 2</span>
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

			<div class="col-lg-12 col-12">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco div_mapa">
						<div class="col-12 titulo_seccion">
							<span class="negrita azul t14">ZONIFICACI&Oacute;N</span>
							<div id="modulo4Edita" class="float_right" style="display: none;">
                    			<span><img id="historial4" title="Historial" onclick="historialPantalla(4, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    			<span><img id="edita4" title="Guarda cambios" onclick="editaPantalla(4, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                			</div>
							<div id="modulo4Creacion" class="float_right">
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
					<div class="col-lg-12 col-md-12 altura2">
						<div id="mapaZonificacion" style="width: 100%; height: 85%; position: relative; float: left;"></div>
					</div>
					<div id="divNegociosHeader" style="position: absolute;left: 68%;display: none;">
						<div class="row" style="float: right; overflow-y: scroll;margin-right: 0px;">
							<div style="max-height:50px; overflow:auto;background: #e6e6e6;">
								<span class="titulo_detalle_md_20" style="padding-left: 30px;">VER DETALLE</span>&nbsp;&nbsp;&nbsp;<img onclick="muestraGeneradores()" src="${pageContext.request.contextPath}/img/arrowDown.png" style="padding-top: 0px; cursor: pointer;padding-right: 30px;"/>
							</div>
						</div>
					</div>
					<div id="divNegocios" style="position: absolute;left: 68%;display:block">
						<div class="row" style="float: right; overflow-y: scroll;margin-right: 0px;">
							<div class="back_generadores altura2" style="max-height:404px; overflow:auto;background: #FFF;">
					
						<div class="row" style="margin-right: 10px;margin-left: 10px;">
							<div class="col-lg-10 col-10 titulo_mapa"><span class="titulo_detalle_md_20">COMPETENCIAS</span></div>
							<div class="col-lg-2 col-2"><img onclick="escondeGeneradores()" src="${pageContext.request.contextPath}/img/arrowUp.png" style="padding-top: 10px; cursor: pointer;"/></div>
							<div class="icono_mapa"><span id="netoTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/competencia/w_neto.png"></div>
							<div class="icono_mapa"><span id="tresBTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/competencia/iconos_3b.png"></div>
							<div class="icono_mapa"><span id="expressTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/competencia/iconos_express.png"></div>
							<div class="icono_mapa"><span id="oxxoTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/competencia/iconos_oxxo.png"></div>
							<!-- <div class="icono_mapa"><img class="icono_imagen" src="img/competencia/iconos_seven.png"></div>
							<div class="icono_mapa"><img class="icono_imagen" src="img/competencia/iconos_k.png"></div> -->
							<div class="icono_mapa"><span id="otrosCTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/competencia/icono_otros_2.png"><br>
							<span class="t10 azul">Tienda de abarrotes</span></div>
						</div>
						
						<div class="row" style="margin-right: 10px;margin-left: 10px;">
							<div class="col-lg-12 titulo_mapa" style="border-top:1px solid #C9C9C9;">
							<span class="titulo_detalle_md_20">NEGOCIOS</span></div>		
							<div class="icono_mapa"><span id="tortilleriaTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/tortilleria.png"><br>
							<span class="t10 azul">Tortillería</span></div>
							<div class="icono_mapa"><span id="recauderiaTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/recauderia.png"><br>
							<span class="t10 azul">Frutas y<br> verduras</span></div>
							<div class="icono_mapa"><span id="carniceriaTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/carniceria.png"><br>
							<span class="t10 azul">Carnicería</span></div>
						</div>
						
						<div class="row" style="margin-right: 10px;margin-left: 10px;">
							<div class="col-lg-12 titulo_mapa" style="border-top:1px solid #C9C9C9;">
							<span class="titulo_detalle_md_20">NEGOCIOS DE COMIDA</span></div>
							<div class="icono_mapa"><span id="comidaTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/negociocomida.png"><br>
							<span class="t10 azul">Negocio de<br>comida</span></div>					
						</div>
						
						<div class="row" style="margin-right: 10px;margin-left: 10px;">
							<div class="col-lg-12 titulo_mapa" style="border-top:1px solid #C9C9C9;">
							<span class="titulo_detalle_md_20">TRANSPORTE PUBLICO</span></div>
							<div class="icono_mapa"><span id="paradaTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/parada.png"><br>
							<span class="t10 azul">Parada de<br>autobús</span></div>
							<div class="icono_mapa"><span id="metroTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/w_metro.png"><br>
							<span class="t10 azul">Parada de<br>metro</span></div>
												
						</div>
						
						<div class="row" style="margin-right: 10px;margin-left: 10px;">
							<div class="col-lg-12 titulo_mapa" style="border-top:1px solid #C9C9C9;">
							<span class="titulo_detalle_md_20">MERCADO PUBLICO</span></div>
							<div class="icono_mapa"><span id="mercadoTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/mercado.png"><br>
							<span class="t10 azul">Mercado</span></div>				
						</div>
						
						<div class="row" style="margin-right: 10px;margin-left: 10px;">
							<div class="col-lg-12 titulo_mapa" style="border-top:1px solid #C9C9C9;">
							<span class="titulo_detalle_md_20">TIANGUIS</span></div>
							<div class="icono_mapa"><span id="tianguisTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/tianguis.png"><br>
							<span class="t10 azul">Tianguis</span></div>	
												
						</div>
						
						<div class="row" style="margin-right: 10px;margin-left: 10px;">
							<div class="col-lg-12 titulo_mapa" style="border-top:1px solid #C9C9C9;">
							<span class="titulo_detalle_md_20">OTROS GENERADORES</span></div>
							<div class="icono_mapa"><span id="iglesiaTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/iglesia.png"><br>
							<span class="t10 azul">Iglesia</span></div>
							<div class="icono_mapa"><span id="escuelaTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/escuela.png"><br>
							<span class="t10 azul">Escuela</span></div>
							<div class="icono_mapa"><span id="otrosGTotal" class="titulo_detalle_md_20" style="padding-right: 5px">0</span><img class="icono_imagen" src="img/generadores/icono_otros_generadores.png"><br>
							<span class="t10 azul">Otros<br>generadores</span></div>						
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
                    <span><img id="historial5" title="Historial" onclick="historialPantalla(5, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita5" title="Guarda cambios" onclick="editaPantalla(5, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo5Creacion" class="float_right">
<%-- 						<span class="negrita azul t14">Puntos: </span> <span id="puntosConstruccion" class="negrita azul t14">---</span>
 --%>					<span>
						<img id="autoriza5" title="Autoriza punto" class="sin_autorizar b_autorizar" onclick="autorizaPantalla(5, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza5" title="Rechaza punto" class="sin_autorizar b_rechazar" onclick="rechazaPantalla(5, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
						<a id="construccionTip" tabindex="0" class="question_mark b_tip" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png"></a>
				</div>
			</div>
			
				<div id="factoresConstruccion1" style="width: 100%; height: 150px;  overflow-y: auto; position: relative; float: left;text-align: left">
				</div>
				<div id="condicionesConstruccion" style="width: 100%;position: relative; float: left;text-align: left">
					<span class="azul t12 sangria_cuerpo">CONDICIONES GENERALES</span><br/>
					<span id="condicionesGeneralesEstatus2" class="azul t12 sangria_doble_cuerpo">---</span><br/>
				</div>
			</div>
		</div>
		</div>

	
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			
			<div class="row" style="padding-top:4px;">
			<div class="col-8 ">
				<span class="titulo_detalle_md_20">CONSTRUCCI&Oacute;N Y GENERALIDADES</span></div>
				
			<div class="col-4  right">
				<div id="modulo6Edita" class="float_right" style="display: none;">
                    <span><img id="historial6" title="Historial" onclick="historialPantalla(6, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita6" title="Guarda cambios" onclick="editaPantalla(6, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo6Creacion" class="">
<%-- 						<span class="negrita blanco t14">Puntos: </span> <span id="puntosGeneralidades" class="negrita blanco t14">---</span>
 --%>					<span>
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
			<div id="modulo6Datos" class="div_header_sub">
				<div class="row">
					<div id="factoresConstruccion" class="col-lg-12 col-12" style=""></div>
				</div>
				<div class="row padding_top_botom_10" style="padding-top: 30px;">
					<div class="col-lg-6 col-6">
						<span class="titulo_detalle_md_20 sangria_cuerpo">Condiciones</span><br/>
						<span id="condicionesGeneralesEstatus" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
					</div>
					<div class="col-lg-6 col-6">
						<span class="titulo_detalle_md_20 sangria_cuerpo">Amortizaci&oacute;n</span><br/>
						<span id="amortizacion" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
					</div>
				</div>
				<div class="row padding_top_botom_10">
					<div class="col-lg-6 col-6">
						<span class="titulo_detalle_md_20 sangria_cuerpo">Renta</span><br/>
						<span id="montoRenta" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
					</div>
					<div class="col-lg-6 col-6">
						<span class="titulo_detalle_md_20 sangria_cuerpo">Tiempo de amortizaci&oacute;n</span><br/>
						<span id="tiempoAmortizacion" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
					</div>
				</div>
				<div class="row padding_top_botom_10">
					<div class="col-lg-6 col-6">
						<span class="titulo_detalle_md_20 sangria_cuerpo">Disponibilidad</span><br/>
						<span id="disponibilidad" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
					</div>
					<div class="col-lg-6 col-6">
						<span class="titulo_detalle_md_20 sangria_cuerpo">Periodo de gracia</span><br/>
						<span id="periodoGracia" class="contenido_cajas_20 sangria_doble_cuerpo">---</span><br/>
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
                    <span><img id="historial7" title="Historial" onclick="historialPantalla(7, this);" style="cursor: pointer;" src="img/historial_mark.png">&nbsp;</span>
                    <span><img id="edita7" title="Guarda cambios" onclick="editaPantalla(7, this);" style="cursor: pointer;" src="img/edita_mark.png"></span>
                </div>
				<div id="modulo7Creacion" class="float_right">
<%-- 						<span class="negrita blanco t14">Puntos: </span> <span id="puntosConteos" class="negrita blanco t14">---</span>
 --%>					<span>
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
					<span class="contenido_cajas_20 sangria_doble_cuerpo">PROMEDIO: </span>
					<span id="promedioConteos" class="titulo_detalle_md_20 sangria_cuerpo">---</span><br/>
					<div class="contenedorConteos" id="posConteos" style="display: block;">
						<span class="contenido_cajas_20 sangria_doble_cuerpo">PROMEDIO AUDITORIA: </span>
						<span id="promedioConteosAuditoria" class="titulo_detalle_md_20 sangria_cuerpo">---</span><br/>
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
					<div class="col-12 right" style='margin-top:20px;' id="total_score"></div>
					</div>
					<div class="modal-footer">
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
	<input type="hidden" name="nombreMdChat" id="nombreMdChat" value=""/>
	<input type="hidden" name="tipoMdChat" id="tipoMdChat" value=""/>
</form>

<!-- --------------------------------------- -->

<form style="display: hidden" action="descargaPdfAction" method="POST">
	<input type="hidden" name="pdfmdId" id="pdfmdId">
	<input type="hidden" name="pdfnombreMd" id="pdfnombreMd">
	<input type="hidden" name="pdfcategoriaMd" id="pdfcategoriaMd">
	<input type="hidden" name="pdfpuntos" id="pdfpuntos">
	<input type="hidden" name="pdfdireccion" id="pdfdireccion">
	<input type="hidden" name="pdfnombrePropietario" id="pdfnombrePropietario">
	<input type="hidden" name="pdftelefonoPropietario" id="pdftelefonoPropietario">
	<input type="hidden" name="pdfemailPropietario" id="pdfemailPropietario">
	<input type="hidden" name="pdflat" id="pdflat">
	<input type="hidden" name="pdflon" id="pdflon">
	<input type="hidden" name="pdfurlmapa" id="pdfurlmapa">
	<input type="hidden" name="pdfmarkers_comp" id="pdfmarkers_comp">
	<input type="hidden" name="pdfmarkers_gen" id="pdfmarkers_gen">
	
	<input type="hidden" name="pdffrenteMd" id="pdffrenteMd">
	<input type="hidden" name="pdfprofundidadMd" id="pdfprofundidadMd">
	<input type="hidden" name="pdftamanioTotalMd" id="pdftamanioTotalMd">
	<input type="hidden" name="pdfvistaFrontalMd" id="pdfvistaFrontalMd">
	<input type="hidden" name="pdfvistaLateral1Md" id="pdfvistaLateral1Md">
	<input type="hidden" name="pdfvistaLateral2Md" id="pdfvistaLateral2Md">
	
	<input type="hidden" name="pdffactor" id="pdffactor">
	<input type="hidden" name="pdftipo" id="pdftipo">
	<input type="hidden" name="pdfsubfactores" id="pdfsubfactores">
	<input type="hidden" name="pdfsubfactoresdesc" id="pdfsubfactoresdesc">
	<input type="hidden" name="pdfcomentarios" id="pdfcomentarios">
	
	<input type="hidden" name="pdfrenta" id="pdfrenta">
	<input type="hidden" name="pdfamortizacion" id="pdfamortizacion">
	<input type="hidden" name="pdfdisponibilidad" id="pdfdisponibilidad">
	<input type="hidden" name="pdftiempo_amortizacion" id="pdftiempo_amortizacion">
	<input type="hidden" name="pdfgracia" id="pdfgracia">
	
	<input type="hidden" name="pdfconteos" id="pdfconteos">

	<input type="submit" id="submitBotonDescargaPdf" style="display:none" />
</form>
<!-- --------------------------------------- -->


<div id="modalImages" class="modalImagen">
 <span class="closeModal">&times;</span>
	
	<div class="row">
		<div class="col-6">
			<div class="t12 blanco negrita" id="captionModal"></div>
		</div>
		<div class="col-5 right">
			<input type="button" class="btn t12" value="Rotar izquierda" onclick="rotar(0);">
			<input type="button" class="btn t12" value="Rotar derecha" onclick="rotar(1);">
		</div>
	</div>
	
	
	<div style="position:relative"><img class="modal-content rotate_left" id="imageModal"></div>

		





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
	<script	src="${pageContext.request.contextPath}/highcharts/highcharts-more.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/data.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/exporting.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/export-data.js"></script>
	<script src="${pageContext.request.contextPath}/js/progress/progressbar.js"></script>
	<script src="${pageContext.request.contextPath}/js/progress/progressbar.min.js"></script>
	<script src="${pageContext.request.contextPath}/css/slick/slick.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/dropzone/dropzone.js"></script>
	<script	src="${pageContext.request.contextPath}/js/dropzone/dateFormat.js"></script>
	<script	src="${pageContext.request.contextPath}/js/detalleMemoriaAsignada.js"></script>
	<script	src="${pageContext.request.contextPath}/js/autorizaciones.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/modalImages.js"></script>
	<script	src="${pageContext.request.contextPath}/js/descargaPdf.js"></script>
	</body>
</html>