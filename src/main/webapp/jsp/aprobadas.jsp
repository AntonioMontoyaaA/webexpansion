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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablas.css" />

	
<title>Autorizadas</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p" style="padding-top:0px;">
		<div class="col-lg-12 titulo blanco t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > APROBADAS </div>
		<div class="col-lg-10">
			<div class="buscador">
					<input type="text" placeholder="Buscar" id="buscador"  class="form-control buscadorInput t12" onkeyup="ejecutaBusquedaAprobadas();"/>
			</div>
		</div>
		<div class="col-lg-2">
			<form class="form-inline float-right">
				<button class="btn desp refresh" type="button" onclick="creatabla();"></button>
				<div class="desp descarga" id="descargaExcel" style="cursor: pointer;"></div>
			<input type="text" class="fechaInicialCalendario" readonly id="datepicker1" onchange="creatabla();" value="${fecha_busqueda}"/>
			
				<button class="btn desp" id="time" type="button" onclick=""></button>
  				<button class="btn desp" id="edit" type="button" onclick=""></button>
  				<button class="btn desp" id="pause" type="button" onclick=""></button>
  				<button class="btn desp" id="refuse" type="button" onclick=""></button>
  				<button class="btn desp" id="change" type="button" onclick=""></button>
		</form>
	</div>
	
		<div class="col-lg-12">
			<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos fblanco tabla_container">
					<!--Tabla-->
    				<div id="DivTablaAprobadas">
    				</div>
				</div>
			</div>
		</div>
	</div>
</div>

<form action='lineaTiempo'  id="lineaTiempoAction" method="post">
	<input type="hidden" name="mdId" id="mdId_tiempo" value=""/>
	<input type="hidden" name="nombreMd" id="nombreMd_tiempo" value=""/>
	<input type="hidden" name="tipoMd" id="tipoMd_tiempo" value=""/>
</form>

<form action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="post">
	<input type="hidden" name="mdId" id="mdId" value=""/>
	<input type="hidden" name="nombreMd" id="nombreMd" value=""/>
	<input type="hidden" name="tipoMd" id="tipoMd" value=""/>
</form>

<form action='mensajes_historial'  id="chatPorMd" method="post">
	<input type="hidden" name="mdIdChat" id="mdIdChat" value=""/>
</form>

<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />

<form style="display: hidden" action="excelAprobadasAction" method="POST" id="form">
	<input type="hidden" id="datos" name="datos" value=""/>
	<input type="hidden" name="perfil_usuario" id="perfil_usuario" value="${usr.perfil.perfilesxusuario[0].perfilid}">
	<input type="submit" id="submitBotonAprobadas" style="display:none" />
</form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/tablas.js"></script>
	<script	src="${pageContext.request.contextPath}/js/aprobadas.js"></script>
	
	
	</body>
</html>