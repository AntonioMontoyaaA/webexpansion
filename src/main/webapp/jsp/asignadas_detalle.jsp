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
	
	<div class="col-lg-12">
	<div class="row divs_p">
		<div class="col-lg-12 menupr_estilos" style="height:30px;"></div>
	</div>
	</div>
	
		<div class="col-lg-4 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 50%;position: relative; float: left;text-align: center">
					<span id="nombreMd" class="tituloDetalleMd">---</span><br/>
					<span class="subtituloDetalleMd">Creado por <span id="creadorMd">---</span></span><br/>
					<span class="tituloDetalleMd">CATEGORÍA</span><br/>
					<span id="categoriaMd" class="circulo">---</span>
				</div>
				<div style="width: 50%;position: relative; float: left;text-align: center">
					<span class="subtituloDetalleMd">Creada el <span id="fechaCreacion">---</span></span><br/>
					<span class="tituloDetalleMd">PUNTUACIÓN</span><br/>
					<span class="subtituloDetalleMd"><span id="puntuacionMd">---</span> puntos</span><br/>
					<span id="estrellasMd" class="subtituloDetalleMd">★ ★ ★</span>
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
		
		<div class="col-lg-4 col-6">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<span class="tituloDetalleMd">1) Datos del sitio</span><br/>
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
		
		<div class="col-lg-4 col-6">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<span class="tituloDetalleMd">2) Datos del propietario</span><br/><br/>
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
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 80%; position: relative; float: left;"><span class="tituloDetalleMd">3) Superficie</span></div>
					<div style="width: 20%; position: relative; float: left;text-align: right; padding-right: 15px;"><span id="puntosSuperficie" class="tituloDetalleMd">---</span>?</div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 33%; height: 80%; position: relative; float: left;">
						<div style="width: 100%">
							<span class="subtituloDetalleMd sangria_cuerpo">FRENTE</span>&nbsp;&nbsp;&nbsp;<span id="frenteMd" class="tituloDetalleMd sangria_cuerpo">---</span><br/>
						</div>
						<div style="width: 100%">
							<span class="subtituloDetalleMd sangria_cuerpo">VISTA FRONTAL</span>
						</div>
						<div style="width: 100%; text-align: center;">
							<img id="vistaFrontalMd" style="width: 90%; height: 80%" src="" />
						</div>
						<div style="width: 100%">
							<div style="width: 50%; position: relative; float: left;text-align: left; padding-left: 15px;"><span id="fechaVistaFrontal" class="footerDetalleMd">---</span></div>
							<div style="width: 50%; position: relative; float: left;text-align: right; padding-right: 15px;"><span id="horaVistaFrontal" class="footerDetalleMd">---</span></div>
						</div>
					</div>
					<div style="width: 33%; height: 80%; position: relative; float: left;">
						<div style="width: 100%">
							<span class="subtituloDetalleMd sangria_cuerpo">PROFUNDIDAD</span>&nbsp;&nbsp;&nbsp;<span id="profundidadMd" class="tituloDetalleMd sangria_cuerpo">---</span><br/>
						</div>
						<div style="width: 100%">
							<span class="subtituloDetalleMd sangria_cuerpo">LATERAL 1</span>
						</div>
						<div style="width: 100%; text-align: center;">
							<img id="vistaLateral1Md" style="width: 90%; height: 80%" src="" />
						</div>
						<div style="width: 100%">
							<div style="width: 50%; position: relative; float: left;text-align: left; padding-left: 15px;"><span id="fechaVistaLateral1" class="footerDetalleMd">---</span></div>
							<div style="width: 50%; position: relative; float: left;text-align: right; padding-right: 15px;"><span id="horaVistaLateral1" class="footerDetalleMd">---</span></div>
						</div>
					</div>
					<div style="width: 33%; height: 80%; position: relative; float: left;">
						<div style="width: 100%">
							<span class="subtituloDetalleMd sangria_cuerpo">TOTAL</span>&nbsp;&nbsp;&nbsp;<span id="tamanioTotalMd" class="tituloDetalleMd sangria_cuerpo">---</span><br/>
						</div>
						<div style="width: 100%">
							<span class="subtituloDetalleMd sangria_cuerpo">LATERAL 2</span>
						</div>
						<div style="width: 100%; text-align: center;">
							<img id="vistaLateral2Md" style="width: 90%; height: 80%" src="" />
						</div>
						<div style="width: 100%">
							<div style="width: 50%; position: relative; float: left;text-align: left; padding-left: 15px;"><span id="fechaVistaLateral2" class="footerDetalleMd">---</span></div>
							<div style="width: 50%; position: relative; float: left;text-align: right; padding-right: 15px;"><span id="horaVistaLateral2" class="footerDetalleMd">---</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		
		<div class="col-lg-8 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 80%; position: relative; float: left;"><span class="tituloDetalleMd">4) Zonificación</span></div>
					<div style="width: 20%; position: relative; float: left;text-align: right; padding-right: 15px;"><span id="puntosZonificacion" class="tituloDetalleMd">---</span>?</div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div id="mapaZonificacion" style="width: 70%; height: 85%; position: relative; float: left;"></div>
					<div style="width: 30%; position: relative; float: left;padding: 3px;">
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
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 70%; position: relative; float: left;"><span class="tituloDetalleMd">5) Construcción</span></div>
					<div style="width: 30%; position: relative; float: left;text-align: right; padding-right: 15px;"><span id="puntosConstruccion" class="tituloDetalleMd">---</span>?</div>
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
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 70%; position: relative; float: left;"><span class="tituloDetalleMd">6) Generalidades del sitio</span></div>
					<div style="width: 30%; position: relative; float: left;text-align: right; padding-right: 15px;"><span id="puntuacionGeneralidadesSitio" class="tituloDetalleMd">---</span>?</div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<br/><span class="tituloDetalleMd sangria_cuerpo">Renta</span><br/>
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
		
		<div class="col-lg-4">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:300px;">
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div style="width: 70%; position: relative; float: left;"><span class="tituloDetalleMd">7)  Flujo peatonal</span></div>
					<div style="width: 30%; position: relative; float: left;text-align: right; padding-right: 15px;"><span id="puntuacionConteos" class="tituloDetalleMd">---</span>?</div>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<span class="subtituloDetalleMd sangria_doble_cuerpo">PROMEDIO: </span><span id="promedioConteos" class="tituloDetalleMd sangria_cuerpo">---</span><br/>
				</div>
				<div style="width: 100%;position: relative; float: left;text-align: left">
					<div id="contenedorFlujoPeatonal" style="min-width: 310px; height: 250px; margin: 0 auto"></div>
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

<s:textfield name="mdId" label="" cssStyle="display: none"></s:textfield>
<s:textfield name="nombreMd" label="" cssStyle="display: none"></s:textfield>
	


<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />

		


	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
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