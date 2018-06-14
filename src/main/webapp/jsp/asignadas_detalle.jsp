<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!-- &emsp;  &nbsp;-->
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 -->  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/asignadas.css" />
<title>Asignadas</title>
</head>
<body>
	<!--<c:forEach var="permiso" items="${usr.perfil.perfilesxusuario[0].permisos}">
    	<input type="hidden" class="permisos_detalleMd" rel="${permiso.getFIMODULOID()}" value="${permiso.toJSON()}">
    </c:forEach> -->
    
    <c:forTokens items = "{'BLOQUEASEGUIMIENTO': 0,'FIESTATUS': 1,'FIMODULOID': 1,'PERMITEEDITAR': 0,'FISUBMODULO': -1,'PERMITECOMENTAR': 0,'PERMITERECHAZAR': 0,'PERMITEAUTORIZAR': 1}#
{'BLOQUEASEGUIMIENTO': 0,'FIESTATUS': 1,'FIMODULOID': 2,'PERMITEEDITAR': 0,'FISUBMODULO': -1,'PERMITECOMENTAR': 1,'PERMITERECHAZAR': 1,'PERMITEAUTORIZAR': 0}#
{'BLOQUEASEGUIMIENTO': 0,'FIESTATUS': 1,'FIMODULOID': 3,'PERMITEEDITAR': 0,'FISUBMODULO': -1,'PERMITECOMENTAR': 1,'PERMITERECHAZAR': 0,'PERMITEAUTORIZAR': 1}#
{'BLOQUEASEGUIMIENTO': 0,'FIESTATUS': 1,'FIMODULOID': 4,'PERMITEEDITAR': 0,'FISUBMODULO': -1,'PERMITECOMENTAR': 1,'PERMITERECHAZAR': 1,'PERMITEAUTORIZAR': 1}#
{'BLOQUEASEGUIMIENTO': 0,'FIESTATUS': 1,'FIMODULOID': 5,'PERMITEEDITAR': 1,'FISUBMODULO': 1,'PERMITECOMENTAR': 1,'PERMITERECHAZAR': 1,'PERMITEAUTORIZAR': 1}#
{'BLOQUEASEGUIMIENTO': 0,'FIESTATUS': 1,'FIMODULOID': 6,'PERMITEEDITAR': 1,'FISUBMODULO': 2,'PERMITECOMENTAR': 1,'PERMITERECHAZAR': 1,'PERMITEAUTORIZAR': 1}#
{'BLOQUEASEGUIMIENTO': 0,'FIESTATUS': 1,'FIMODULOID': 7,'PERMITEEDITAR': 0,'FISUBMODULO': -1,'PERMITECOMENTAR': 1,'PERMITERECHAZAR': 1,'PERMITEAUTORIZAR': 1}" delims = "#" var = "json">
    	<input type="hidden" class="permisos_detalleMd" value="${json}">
    </c:forTokens>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p">
	<div class="col-lg-12 titulo azul t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > EN PROCESO ><span id="nombreMdTxt"></span></div>

			<div class="col-lg-12"
				style="padding-left: 20px; padding-right: 20px;">
				<div class="row div_header menupr_estilos fazul"
					style="margin-bottom: 10px;">

					<div class="col-lg-3" style="padding-top: 8px;">
						<span class="negrita t14 blanco">Seguimiento de Autorización</span>
					</div>
					<div class="col-lg-9" style="padding-top: 8px">
						<div class="row div_header menupr_estilos fazul">
						
							<div id="gerenteExpansionDiv" class="col-lg-3" style="min-width:200;">
								<div id="circuloAutorizaGerenteExpansion"
									class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
								<div style="position: relative; float: left;">
									<span class="azul t12">&nbsp;&nbsp; <a
										id="gerenteExpansionSegPop" tabindex="0" class="blanco t14" role=""
										data-toggle="popover" data-trigger="focus"
										data-placement="bottom" data-content="">Gerente de
											expansión</a>
									</span> <img id="gerenteExpansionImg"
										src="img/iconos_reloj_atraso.png"
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
									</span> <img id="expansionImg" src="img/iconos_reloj_atraso.png"
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
									</span> <img id="gestoriaImg" src="img/iconos_reloj_atraso.png"
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
									</span> <img id="construccionImg" src="img/iconos_reloj_atraso.png"
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
									</span> <img id="operacionesImg" src="img/iconos_reloj_atraso.png"
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
				<div class="float_right">
					<span><img id="autoriza1" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(1, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
						<span><img id="rechaza1" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(1, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
						</span>
				</div>
			</div>
				
				<div style="width: 100%;position: relative; float: left;text-align: left">
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
				<div class="float_right">
					<span>
						<img id="autoriza2" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(2, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza2" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(2, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
				</div>
			</div>
			
				<div style="width: 100%;position: relative; float: left;text-align: left">
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
				<div class="float_right">
					<span class="negrita blanco t14">Puntos: </span> 
					<span id="puntosSuperficie" class="negrita blanco t14">---</span>
					<span>
						<img id="autoriza3" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(3, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza3" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(3, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
					<a id="superficieTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png">
					</a>
					
				</div>
			</div>
			
				<div class="row div_header_sub">
					<div class="col-lg-4"><span class="blanco t12 sangria_cuerpo">FRENTE</span>&nbsp;&nbsp;&nbsp;<span id="frenteMd" class="negrita blanco t14 sangria_cuerpo">---</span></div>
					<div class="col-lg-4"><span class="blanco t12 sangria_cuerpo">PROFUNDIDAD</span>&nbsp;&nbsp;&nbsp;<span id="profundidadMd" class="negrita blanco t14 sangria_cuerpo">---</span></div>
					<div class="col-lg-4"><span class="blanco t12 sangria_cuerpo">TOTAL</span>&nbsp;&nbsp;&nbsp;<span id="tamanioTotalMd" class="negrita blanco t14 sangria_cuerpo">---</span></div>
				</div>
				<div class="row div_header_sub">
					<div class="col-lg-4">
						<div class="col-lg-12"><span class="blanco t12 sangria_cuerpo">VISTA FRONTAL</span></div>
						<div class="col-lg-12" style="text-align: center;"><img id="vistaFrontalMd" style="width: 87%; height: 28%" src="img/no_imagen.png" /></div>
						<div class="row div_bottom">
							<div class="col-lg-6" style="text-align: right;"><span id="fechaVistaFrontal" class="footerDetalleMd">---</span></div>
							<div class="col-lg-6" style="text-align: left;"><span id="horaVistaFrontal" class="footerDetalleMd">---</span></div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="col-lg-12"><span class="blanco t12 sangria_cuerpo">LATERAL 1</span></div>
						<div class="col-lg-12" style="text-align: center;"><img id="vistaLateral1Md" style="width: 87%; height: 28%" src="img/no_imagen.png" /></div>
						<div class="row div_bottom">
							<div class="col-lg-6" style="text-align: right;"><span id="fechaVistaLateral1" class="footerDetalleMd">---</span></div>
							<div class="col-lg-6" style="text-align: left;"><span id="horaVistaLateral1" class="footerDetalleMd">---</span></div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="col-lg-12"><span class="blanco t12 sangria_cuerpo">LATERAL 2</span></div>
						<div class="col-lg-12" style="text-align: center;"><img id="vistaLateral2Md" style="width: 87%; height: 28%" src="img/no_imagen.png" /></div>
						<div class="row div_bottom">
							<div class="col-lg-6" style="text-align: right;"><span id="fechaVistaLateral2" class="footerDetalleMd">---</span></div>
							<div class="col-lg-6" style="text-align: left;"><span id="horaVistaLateral2" class="footerDetalleMd">---</span></div>
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
				<div class="float_right">
					<span class="negrita azul t14">Puntos: </span> <span id="puntosZonificacion" class="negrita azul t14">---</span>
					<span>
						<img id="autoriza4" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(4, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza4" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(4, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
					<a id="zonificacionTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png"></a>		
				</div>
			</div>
			
				<div class="row div_header_sub">
					<div class="col-lg-9 col-6"><div id="mapaZonificacion" style="width: 100%; height: 85%; position: relative; float: left;"></div></div>
					<div class="col-lg-3 col-6">
						<div style="width: 100%;text-align: center;">
							<span class="azul t12">COMPETENCIA</span><br/>
							<div>
								<img width="30px" src="img/competencia/iconos_3b.png">&nbsp;
								<img width="30px" src="img/competencia/iconos_express.png">&nbsp;
								<img width="30px" src="img/competencia/iconos_oxxo.png">&nbsp;
								<img width="30px" src="img/competencia/iconos_seven.png">&nbsp;
								<img width="30px" src="img/competencia/iconos_k.png">&nbsp;
								<img width="30px" src="img/competencia/iconos_otros.png">&nbsp;
							</div>
						</div>
						<div style="width: 100%; text-align: center;margin-top: 35px;">
							<div style="width: 100%"><span class="azul t12">GENERADORES DE TRÁFICO</span></div>
							<div style="width: 100%">
								<div style="width: 33%; position: relative; float: left;"><div style="width: 100%"><img width="30px" src="img/generadores/iconos_iglesia.png"></div><div style="width: 100%; text-align: center"><span class="subtituloIconos">Iglesia</span></div></div>
								<div style="width: 33%; position: relative; float: left;"><div style="width: 100%"><img width="30px" src="img/generadores/iconos_tortilleria.png"></div><div style="width: 100%; text-align: center"><span class="subtituloIconos">Tortillería</span></div></div>
								<div style="width: 33%; position: relative; float: left;"><div style="width: 100%"><img width="30px" src="img/generadores/iconos_escuela.png"></div><div style="width: 100%; text-align: center"><span class="subtituloIconos">Escuela</span></div></div>
							</div>
							<div style="width: 100%">
								<div style="width: 33%; position: relative; float: left;"><div style="width: 100%"><img width="30px" src="img/generadores/iconos_recauderia.png"></div><div style="width: 100%; text-align: center"><span class="subtituloIconos">Recaudería</span></div></div>
								<div style="width: 33%; position: relative; float: left;"><div style="width: 100%"><img width="30px" src="img/generadores/iconos_mercado.png"></div><div style="width: 100%; text-align: center"><span class="subtituloIconos">Mercado</span></div></div>
								<div style="width: 33%; position: relative; float: left;"><div style="width: 100%"><img width="30px" src="img/generadores/iconos_carniceria.png"></div><div style="width: 100%; text-align: center"><span class="subtituloIconos">Carnicería</span></div></div>
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
				<div class="float_right">
						<span class="negrita azul t14">Puntos: </span> <span id="puntosConstruccion" class="negrita azul t14">---</span>
					<span>
						<img id="autoriza5" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(5, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza5" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(5, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
						<a id="construccionTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
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
				<div class="">
						<span class="negrita blanco t14">Puntos: </span> <span id="puntosGeneralidades" class="negrita blanco t14">---</span>
					<span>
						<img id="autoriza6" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(6, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza6" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(6, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
						<a id="generalidadesTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png"></a>
				</div>
			</div>
			</div>
			
				<div class="row div_header_sub">
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
				<div class="float_right">
						<span class="negrita blanco t14">Puntos: </span> <span id="puntosConteos" class="negrita blanco t14">---</span>
					<span>
						<img id="autoriza7" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(7, this);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza7" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(7, this);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
					<a id="conteosTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">
						<img style="cursor: pointer;" src="img/question.png">
					</a>
				</div>
			</div>
			
				<div class="row div_header_sub">
					<span class="blanco t12 sangria_doble_cuerpo">PROMEDIO: </span><span id="promedioConteos" class="negrita blanco t14 sangria_cuerpo">---</span><br/>
				</div>
				<div class="row div_header_sub">
					<div class="col-lg-12"><div id="contenedorFlujoPeatonal" style="width: 100%; height: 70%; margin: 0 auto"></div></div>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fazul altura1">
			<div class="col-12 titulo_seccion">
				<span class="negrita blanco t14">8) Autorizacón final</span>
				<div class="float_right">
					<span>
						<img id="autoriza8" title="Autoriza punto" class="sin_autorizar" onclick="finalizaMD(1);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
					</span>
					<span>
						<img id="rechaza8" title="Rechaza punto" class="sin_autorizar" onclick="finalizaMD(0);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</span>
				</div>
			</div>
			
				<div style="width: 100%;position: relative; float: left;text-align: left; padding-top: 20px;">
					<div id="containerProgreso"></div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: center; padding-top: 20px;">
					<span class="subtituloIconos blanco">Progreso autorización puntos</span>
				</div>
			</div>
		</div>
		</div>
		
	
	</div>
</div>

<div style="display: none;">
	<s:textfield name="mdId" label="" cssStyle="display: none"></s:textfield>
	<s:textfield name="nombreMd" label="" cssStyle="display: none"></s:textfield>
</div>

<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />
<jsp:include page="/jsp/generic/modalAutorizacion.jsp" />

		


	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/highcharts.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/data.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/exporting.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/export-data.js"></script>
	<script src="${pageContext.request.contextPath}/js/progress/progressbar.js"></script>
	<script src="${pageContext.request.contextPath}/js/progress/progressbar.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/detalleMemoriaAsignada.js"></script>
	
	</body>
</html>