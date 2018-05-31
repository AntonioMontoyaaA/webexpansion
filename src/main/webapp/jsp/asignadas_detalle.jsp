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
<%--  <c:forEach var="permisos" items="${permisos}">
     	  			 <c:out value="${permisos.codigo}"/> </c:forEach>  --%>
<%-- <p>Student First Name: <c:out value="${login.contra}"/></p> --%>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p">
	<div class="col-lg-12 titulo">Dashboard Expansión > Asignadas > <span id="nombreMdTxt"></span></div>
	
	<div class="col-lg-12" style="padding-left: 20px;padding-right: 20px;">
	<div class="row div_header menupr_estilos" style="margin-bottom: 10px;">
		
			<div class="col-lg-3" style="padding-top: 8px;"><span class="tituloDetalleMd">Seguimiento de autorización</span></div>
			<div class="col-lg-9" style="padding-top: 8px">
			<div class="row div_header menupr_estilos">
			<div id="gerenteExpansionDiv" class="col-lg-3" >
				<div id="circuloAutorizaGerenteExpansion" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
				<div style="position: relative; float: left;">
					<span class="subtituloDetalleMd">&nbsp;&nbsp;
						<a id="gerenteExpansionSegPop" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">Gerente de expansión</a>
					</span>
					<img id="gerenteExpansionImg" src="img/iconos_reloj_atraso.png" style="width: 17px;display: none;">
				</div>
			</div>
			<div id="expansionDiv" class="col-lg-2">
				<div id="circuloAutorizaExpansion" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
				<div style="position: relative; float: left;">
					<span class="subtituloDetalleMd">&nbsp;&nbsp;
						<a id="expansionSegPop" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">Expansión</a>
					</span>
					<img id="expansionImg" src="img/iconos_reloj_atraso.png" style="width: 17px;display: none;">
				</div>
			</div>
			<div id="gestoriaDiv" class="col-lg-2">
				<div id="circuloAutorizaGestoria" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
				<div style="position: relative; float: left;">
					<span class="subtituloDetalleMd">&nbsp;&nbsp;
						<a id="gestoriaSegPop" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">Gestoría</a>
					</span>
					<img id="gestoriaImg" src="img/iconos_reloj_atraso.png" style="width: 17px;display: none;">
				</div>
			</div>
			<div id="construccionDiv" class="col-lg-2">
				<div id="circuloAutorizaConstruccion" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
				<div style="position: relative; float: left;">
					<span class="subtituloDetalleMd">&nbsp;&nbsp;
						<a id="construccionSegPop" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">Construcción</a>
					</span>
					<img id="construccionImg" src="img/iconos_reloj_atraso.png" style="width: 17px;display: none;">
				</div>
			</div>
			<div id="operacionesDiv" class="col-lg-3">
				<div id="circuloAutorizaOperaciones" class="circuloSeguimiento">&nbsp;&nbsp;&nbsp;</div>
				<div style="position: relative; float: left;">
					<span class="subtituloDetalleMd">&nbsp;&nbsp;
						<a id="operacionesSegPop" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">Operaciones</a>
					</span>
					<img id="operacionesImg" src="img/iconos_reloj_atraso.png" style="width: 17px;display: none;">
				</div>
			</div>
			</div>
			</div>
	</div>
	</div>
	
		<div class="col-lg-4 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 50%;position: relative; float: left;text-align: center">
					<span id="nombreMd" class="tituloDetalleMd">---</span><br/>
					<span class="subtituloDetalleMd" style="font-size: .7em;">Creado por <span id="creadorMd">---</span></span><br/>
					<span class="tituloDetalleMd">CATEGORÍA</span><br/>
					<span id="categoriaMd" class="circulo">---</span>
				</div>
				<div style="width: 50%;position: relative; float: left;text-align: center">
					<span class="subtituloDetalleMd">Creada el <span id="fechaCreacion">---</span></span><br/>
					<span class="tituloDetalleMd">PUNTUACIÓN</span><br/>
					<span class="subtituloDetalleMd"><span id="puntuacionMd">---</span> puntos</span><br/>
					<span id="estrellasMd" class="subtituloDetalleMd"></span>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: center">
					<span class="tituloDetalleMd">UBICACIÓN</span>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: center">
				<div class="col-12" id="map"></div>
					<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuFdkYUDivTv_TrR4RZMWP1NYCA0MK2YM">
					</script>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 80%; position: relative; float: left;"><span class="tituloDetalleMd">1) Datos del sitio</span></div>
					<div style="width: 20%; position: relative; float: left;text-align: right; padding-right: 15px;">
						<img id="autoriza1" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(1);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
						<img id="rechaza1" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(1);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: left">
						<span class="tituloDetalleMd sangria_cuerpo">Calle</span><br/>
						<span id="calleMd" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Colonia</span><br/>
						<span id="coloniaMd" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Municipio</span><br/>
						<span id="municipioMd" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Ciudad</span><br/>
						<span id="ciudadMd" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Estado</span><br/>
						<span id="estadoMd" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Código postal</span><br/>
						<span id="codiPostalMd" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 80%; position: relative; float: left;"><span class="tituloDetalleMd">2) Datos del propietario</span></div>
					<div style="width: 20%; position: relative; float: left;text-align: right; padding-right: 15px;">
						<img id="autoriza2" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(2);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
						<img id="rechaza2" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(2);" style="cursor: pointer;" src="img/rechaza_mark.png">
					</div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<span class="tituloDetalleMd sangria_cuerpo">Número propietario</span><br/>
					<span id="propietarioId" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
					<span class="tituloDetalleMd sangria_cuerpo">Nombre</span><br/>
					<span id="nombrePropietario" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
					<span class="tituloDetalleMd sangria_cuerpo">Teléfono</span><br/>
					<span id="telefonoPropietario" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
					<span class="tituloDetalleMd sangria_cuerpo">Email</span><br/>
					<span id="emailPropietario" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
					<span id="rentaANeto" class="tituloDetalleMd sangria_doble_cuerpo">---</span><br/>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos">
				<div class="row div_header_sub">
					<div class="col-lg-10 col-5">
						<span class="tituloDetalleMd">3) Superficie</span>
					</div>
					<div class="col-lg-2 col-7" style="text-align: right;">
						<span class="tituloDetalleMd">Puntos: </span> <span id="puntosSuperficie" class="tituloDetalleMd">---</span>
						<img id="autoriza3" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(3);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
						<img id="rechaza3" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(3);" style="cursor: pointer;" src="img/rechaza_mark.png">
						<a id="superficieTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">&nbsp;&nbsp;&nbsp;&nbsp;</a>
					</div>
				</div>
				<div class="row div_header_sub">
					<div class="col-lg-4"><span class="subtituloDetalleMd sangria_cuerpo">FRENTE</span>&nbsp;&nbsp;&nbsp;<span id="frenteMd" class="tituloDetalleMd sangria_cuerpo">---</span></div>
					<div class="col-lg-4"><span class="subtituloDetalleMd sangria_cuerpo">PROFUNDIDAD</span>&nbsp;&nbsp;&nbsp;<span id="profundidadMd" class="tituloDetalleMd sangria_cuerpo">---</span></div>
					<div class="col-lg-4"><span class="subtituloDetalleMd sangria_cuerpo">TOTAL</span>&nbsp;&nbsp;&nbsp;<span id="tamanioTotalMd" class="tituloDetalleMd sangria_cuerpo">---</span></div>
				</div>
				<div class="row div_header_sub">
					<div class="col-lg-4">
						<div class="col-lg-12"><span class="subtituloDetalleMd sangria_cuerpo">VISTA FRONTAL</span></div>
						<div class="col-lg-12" style="text-align: center;"><img id="vistaFrontalMd" style="width: 87%; height: 28%" src="img/no_imagen.png" /></div>
						<div class="row div_bottom">
							<div class="col-lg-6" style="text-align: left;"><span id="fechaVistaFrontal" class="footerDetalleMd">---</span></div>
							<div class="col-lg-6" style="text-align: right;"><span id="horaVistaFrontal" class="footerDetalleMd">---</span></div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="col-lg-12"><span class="subtituloDetalleMd sangria_cuerpo">LATERAL 1</span></div>
						<div class="col-lg-12" style="text-align: center;"><img id="vistaLateral1Md" style="width: 87%; height: 28%" src="img/no_imagen.png" /></div>
						<div class="row div_bottom">
							<div class="col-lg-6" style="text-align: left;"><span id="fechaVistaLateral1" class="footerDetalleMd">---</span></div>
							<div class="col-lg-6" style="text-align: right;"><span id="horaVistaLateral1" class="footerDetalleMd">---</span></div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="col-lg-12"><span class="subtituloDetalleMd sangria_cuerpo">LATERAL 2</span></div>
						<div class="col-lg-12" style="text-align: center;"><img id="vistaLateral2Md" style="width: 87%; height: 28%" src="img/no_imagen.png" /></div>
						<div class="row div_bottom">
							<div class="col-lg-6" style="text-align: left;"><span id="fechaVistaLateral2" class="footerDetalleMd">---</span></div>
							<div class="col-lg-6" style="text-align: right;"><span id="horaVistaLateral2" class="footerDetalleMd">---</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-8 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div class="row div_header_sub">
					<div class="col-lg-8 col-5">
						<span class="tituloDetalleMd">4) Zonificación</span>
					</div>
					<div class="col-lg-4 col-7" style="text-align: right;">
						<span class="tituloDetalleMd">Puntos: </span> <span id="puntosZonificacion" class="tituloDetalleMd">---</span>
						<img id="autoriza4" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(4);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
						<img id="rechaza4" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(4);" style="cursor: pointer;" src="img/rechaza_mark.png">
						<a id="zonificacionTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">&nbsp;&nbsp;&nbsp;&nbsp;</a>
					</div>
				</div>
				<div class="row div_header_sub">
					<div class="col-lg-9 col-6"><div id="mapaZonificacion" style="width: 100%; height: 85%; position: relative; float: left;"></div></div>
					<div class="col-lg-3 col-6">
						<div style="width: 100%;text-align: center;">
							<span class="subtituloDetalleMd">COMPETENCIA</span><br/>
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
							<div style="width: 100%"><span class="subtituloDetalleMd">GENERADORES DE TRÁFICO</span></div>
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
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div class="row div_header_sub">
					<div class="col-lg-6 col-5">
						<span class="tituloDetalleMd">5) Construcción</span>
					</div>
					<div class="col-lg-6 col-7" style="text-align: right;">
						<span class="tituloDetalleMd">Puntos: </span> <span id="puntosConstruccion" class="tituloDetalleMd">---</span>
						<img id="autoriza5" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(5);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
						<img id="rechaza5" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(5);" style="cursor: pointer;" src="img/rechaza_mark.png">
						<a id="construccionTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">&nbsp;&nbsp;&nbsp;&nbsp;</a>
					</div>
				</div>
				<div id="factoresConstruccion" style="width: 100%; height: 150px;  overflow-y: scroll; position: relative; float: left;text-align: left">
				</div>
				<div id="condicionesConstruccion" style="width: 100%;position: relative; float: left;text-align: left">
					<span class="subtituloDetalleMd sangria_cuerpo">CONDICIONES GENERALES</span><br/>
					<span id="condicionesGeneralesEstatus" class="subtituloDetalleMd sangria_doble_cuerpo">---</span><br/>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div class="row div_header_sub">
					<div class="col-lg-6 col-5">
						<span class="tituloDetalleMd">6) Generalidades del sitio</span>
					</div>
					<div class="col-lg-6 col-7" style="text-align: right;">
						<span class="tituloDetalleMd">Puntos: </span> <span id="puntosGeneralidades" class="tituloDetalleMd">---</span>
						<img id="autoriza6" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(6);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
						<img id="rechaza6" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(6);" style="cursor: pointer;" src="img/rechaza_mark.png">
						<a id="generalidadesTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">&nbsp;&nbsp;&nbsp;&nbsp;</a>
					</div>
				</div>
				<div class="row div_header_sub">
					<div class="col-lg-12">
						<span class="tituloDetalleMd sangria_cuerpo">Renta</span><br/>
						<span id="montoRenta" class="subtituloDetalleMd sangria_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Disponibilidad</span><br/>
						<span id="disponibilidad" class="subtituloDetalleMd sangria_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Amortización</span><br/>
						<span id="amortizacion" class="subtituloDetalleMd sangria_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Tiempo de amortización</span><br/>
						<span id="tiempoAmortizacion" class="subtituloDetalleMd sangria_cuerpo">---</span><br/>
						<span class="tituloDetalleMd sangria_cuerpo">Periodo de gracia</span><br/>
						<span id="periodoGracia" class="subtituloDetalleMd sangria_cuerpo">---</span><br/>
					</div>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div class="row div_header_sub">
					<div class="col-lg-6 col-5">
						<span class="tituloDetalleMd">7)  Flujo peatonal</span>
					</div>
					<div class="col-lg-6 col-7" style="text-align: right;">
						<span class="tituloDetalleMd">Puntos: </span> <span id="puntosConteos" class="tituloDetalleMd">---</span>
						<img id="autoriza7" title="Autoriza punto" class="sin_autorizar" onclick="autorizaPantalla(7);" style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
						<img id="rechaza7" title="Rechaza punto" class="sin_autorizar" onclick="rechazaPantalla(7);" style="cursor: pointer;" src="img/rechaza_mark.png">
						<a id="conteosTip" tabindex="0" class="question_mark" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="">&nbsp;&nbsp;&nbsp;&nbsp;</a>
					</div>
				</div>
				<div class="row div_header_sub">
					<span class="subtituloDetalleMd sangria_doble_cuerpo">PROMEDIO: </span><span id="promedioConteos" class="tituloDetalleMd sangria_cuerpo">---</span><br/>
				</div>
				<div class="row div_header_sub">
					<div class="col-lg-12"><div id="contenedorFlujoPeatonal" style="width: 100%; height: 70%; margin: 0 auto"></div></div>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 70%; position: relative; float: left;"><span class="tituloDetalleMd">9)  Autorización final</span></div>
					<div style="width: 30%; position: relative; float: left;text-align: right; padding-right: 15px;"></div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: left; padding-top: 20px;">
					<div id="containerProgreso"></div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: center; padding-top: 20px;">
					<span class="subtituloIconos">Progreso autorización puntos</span>
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