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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/configuracion_usuario.css" />
	
	
<title>Configuración</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>

	<div class="container-fluid">
		<div class="row padding_p" style="padding-top: 0px;">
			<div class="col-lg-12 titulo blanco t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > CONFIGURACION</div>
			<div class="contenedor_botones_superiores">
        		<div class="row">
        			<div class="col-4 boton_sup activo" id="boton_sup_usuario" onclick="activa(this)">Usuario</div>
        			<div class="col-4 boton_sup" id="boton_sup_perfiles" onclick="activa(this)">Perfiles</div>
        			<div class="col-4 boton_sup" id="boton_sup_opciones" onclick="activa(this)">Opciones</div>
        		</div>
        	</div>
						
			<div class="col-lg-12">
			<div class="buscador float_left">
						<input type="text"  placeholder="Buscar" id="buscador" class="form-control buscadorInput t12" onkeyup="ejecutaBuscador()"/>
			</div>
			<form class="form-inline float-right">
					<button class="btn desp" type="button" id="asignar" onclick="">Asignar perfil a usuario</button>
					<button class="btn desp" type="button" id="filtros" onclick="">Filtros</button>
			</form>		
			</div>
			
			<div class="col-lg-12">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<!--Tabla-->
						<div id="DivTablaAsignadas"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />

<form action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="post">
	<input type="hidden" name="mdId" id="mdId" value=""/>
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

<form style="display: hidden" action="./configuracionPerfiles" method="POST" id="confPerfiles">
</form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/configuracion_usuario.js"></script>

	
	</body>
</html>