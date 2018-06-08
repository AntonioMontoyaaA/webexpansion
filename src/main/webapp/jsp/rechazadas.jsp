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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablas.css" />

	
<title>Rechazadas</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p" style="padding-top:0px;">
		<div class="col-lg-3 titulo">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > RECHAZADAS </div>
		<div class="col-lg-5 ocultable" style="font-size:12px; background: #FFFFFF; color: #1f3d7a;text-align: center; border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;">
		
			<span class="seccion" style="width:80px;"><span><img src="img/web_gerenteExpansionc.png">&nbsp;</span>
			<span>Gerente</span></span>
			
			<span class="seccion"><span><img src="img/web_expansionc.png">&nbsp;</span>
			<span>Expansión</span></span>
			
			<span class="seccion"><span><img src="img/web_gestoriac.png">&nbsp;</span>
			<span>Gestoría</span></span>
			
			<span class="seccion"><span><img src="img/web_construccionc.png">&nbsp;</span>
			<span>Construcción</span></span>
			
			<span class="seccion"><span><img src="img/web_operacionesc.png">&nbsp;</span>
			<span>Operaciones</span></span>
		</div>
		
		<div class="col-lg-4 titulo">&nbsp;</div>
		
		<div class="col-lg-8 titulogrande">MD RECHAZADAS</div>
		<div class="col-lg-4" style="padding-top: 5px;">
			<div id="recargaAutorizadas" style="position: relative; float: left;margin-right: 10px;cursor: pointer">
				<button class="btn desp rechargue" type="button" onclick="creatabla();">
  								<img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
  			</button>
			</div>
			<div id="descargaExcel" style="position: relative; float: left;margin-right: 10px;cursor: pointer"><img src="${pageContext.request.contextPath}/img/iconos_DOWNLOAD.png"></div>
			<div style="position: relative; float: left;margin-right: 10px;"><input type="text" class="fechaInicialCalendario" readonly id="datepicker1" onchange="creatabla();" value="${fecha_busqueda}"/></div>
			<div class="buscador"><input placeholder="Buscar MD" id="buscador" class="buscadorInput" onkeyup="ejecutaBusquedaRechazadas()" type="text" /></div>
		</div>
		<div class="col-lg-12">
			<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos tabla_container">
					<!--Tabla-->
    				<div id="DivTablaRechazadas" style="padding-top: 3px;position: relative;float: left;width: 99%; left: 5px;">
    				</div>
				</div>
			</div>
		</div>
	</div>
</div>

<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />

<form style="display: hidden" action="excelRechazadasAction" method="POST" id="form">
	<input type="hidden" id="datos" name="datos" value=""/>
	<input type="hidden" name="perfil_usuario" id="perfil_usuario" value="${usr.perfil.perfilesxusuario[0].perfilid}">
	<input type="submit" id="submitBotonRechazadas" style="display:none" />
</form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/rechazadas.js"></script>
	<script	src="${pageContext.request.contextPath}/js/tablas.js"></script>
	
	
	</body>
</html>