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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/productividad.css" />
	
	
<title>Productividad</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>
 
<input type="hidden" id="esPermisoGuardar" value="${usr.perfil.areasxpuesto[0].areaId == 3 && usr.perfil.puestoId == 8}">
<input type="hidden" id="esAutorizaEvalua" value="${usr.perfil.areasxpuesto[0].areaId == 5 && usr.perfil.puestoId == 11}">
 <input type="hidden" id="perfil_usuario" value="${usr.perfil.perfilesxusuario[0].perfilid}">
    <input type="hidden" id="areaUsuario" value="${usr.perfil.areasxpuesto[0].areaId}">
    <input type="hidden" id="puestoUsuario" value="${usr.perfil.puestoId}">
    <input type="hidden" id="usuarioId" value="${usr.perfil.numeroEmpleado}">
    <input type="hidden" id="nombreAreaUsuario" value="${usr.perfil.areasxpuesto[0].areaNom}">
    <input type="hidden" id="nombreCompletoUsuario" value="${usr.perfil.nombre} ${usr.perfil.apellidoP} ${usr.perfil.apellidoM}">

<div class="container-fluid fazul">
	<div class="row padding_p">
	<div class="col-lg-12 titulo blanco t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > INDICADORES DE PRODUCTIVIDAD</div>




	<!-- COLUMNA 1 -->
	<div class="col-lg-12 col-12">
	  
	  <div class="row">
		<!-- DATOS GENERALES -->
		<div class="col-lg-12 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span style="color:red;" class="titulo_detalle_md_20" id="var_msjMdObra"></span>
			</div>
			
			<div class="col-9 col-lg-10">
			<span class="titulo_detalle_md_20" id="labelNombre"> - </span>
			<br>
			<span id="vlaRegion" class="contenido_cajas_20 "> - </span>
			</div>
			<div class="col-5 col-lg-2">
				<div style="float: right;" class="row">

				</div>
			</div>
			
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelJefe_e">Nombre jefe de Expansión</span>
			<br>
			<span id="valJefe_e" class="contenido_cajas_20 "> - </span>
			</div>
			<div class="col-lg-12 pt-2">
			<span class="titulo_detalle_md_20" id="labelJefe_e">Nombre del propietario</span>
			<br>
			<span id="valPropietario" class="contenido_cajas_20 "> - </span>
			</div>
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelUbicacion">Ubicación</span>
			<br>
			<span id="valUbicacion" class="contenido_cajas_20 "> - </span>
			</div>
			<div class="col-lg-12 pt-2">
			<span class="titulo_detalle_md_20" id="labelNombre">Área a rentar en m2</span>
			<br>
			<input type="text" style="width:100%;" id="var_areaRentam2"  maxlength="5" onkeyup="onlynumber(this);" >
			</div>
			<div class="col-lg-12 pt-2">
			<span class="titulo_detalle_md_20" id="labelNombre">Nombre de jefe de contrución</span>
			<br>
			<input type="text" style="width:100%;" maxlength="100" id="var_nombJefeConst">
			</div>
			<div class="col-lg-12 pt-2 pb-4">
			<span class="titulo_detalle_md_20" id="labelNombre">Fecha</span>
			<br>
			<input type="text" id="var_fdFecha" style="width:100%" class="fechaInicialCalendario" readonly />
			</div>
			</div>
			</div>
			</div>
		</div>
		</div>
	</div>
		

		
	</div>



	
	





		<form style="display:none;" action='mensajes_historial'  id="chatPorMd" method="post">
			<s:textfield id="idMd" name="idMd" label="" cssStyle="display: none"></s:textfield>
			<input type="hidden" id="usuarioLogin" value="${usr.perfil.numeroEmpleado}" />
		</form>

		</div>
</div>

<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />
<jsp:include page="/jsp/generic/modalAutorizacion.jsp" />



<form action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="post">
	<input type="hidden" name="mdId" id="mdId" value=""/>
	<input type="hidden" name="mdId" id="mdIdAutorizacion" value=""/>
	<input type="hidden" name="nombreMd" id="nombreMd" value=""/>
	<input type="hidden" name="tipoMd" id="tipoMd" value=""/>
</form>

<form action='mensajes_historial'  id="chatPorMd" method="post">
	<input type="hidden" name="mdIdChat" id="mdIdChat" value=""/>
	<input type="hidden" name="nombreMdChat" id="nombreMdChat" value=""/>
</form>


<form style="display: hidden" action="./excelAsignadasAction" method="POST" id="form">
	<input type="hidden" id="datos" name="datos" value=""/>
	<input type="submit" id="submitBotonAsignadas" style="display:none" />
</form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/productividad.js"></script>

	
	</body>
</html>