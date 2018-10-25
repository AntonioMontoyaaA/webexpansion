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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/configuracion_perfiles.css" />
	
	
<title>Configuración</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>

	<div class="container-fluid">
		<div class="row padding_p" style="padding-top: 0px;">
			<div class="col-lg-12 titulo blanco t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > CONFIGURACION</div>
			<div class="contenedor_botones_superiores">
        		<div class="row">
        			<div class="col-4 boton_sup" id="boton_sup_usuario" onclick="activa(this)">Usuario</div>
        			<div class="col-4 boton_sup activo" id="boton_sup_perfiles" onclick="activa(this)">Perfiles</div>
        			<div class="col-4 boton_sup" id="boton_sup_opciones" onclick="activa(this)">Opciones</div>
        		</div>
        	</div>
						
			<div class="col-lg-12">
			<div class="row">
				
				<div class="col-lg-9">
					<button id="btnAtras" class="btn desp atras" style="float: left;position: relative; display: none;" type="button" onclick="atrasPerfiles()"></button>
					<div class="buscador float_left">
						<input type="text"  placeholder="Buscar" id="buscador" class="form-control buscadorInput t12" onkeyup="ejecutaBuscador()"/>
					</div>
				</div>
				<div class="col-lg-3">
					<form class="form-inline float-right">
						<button class="btn desp" type="button" id="crear" onclick="creaEditaPerfil()">Crear nuevo perfil</button>
						<button class="btn desp" type="button" id="asignar" onclick="" style="display: none;">Asignar opciones</button>
						<button class="btn desp" type="button" id="agregar" onclick="" style="display: none;">Agregar módulos</button>
						<button class="btn desp" id="edit" type="button"></button>
						<button class="btn desp" id="refuse" type="button"></button>
					</form>
				</div>
			</div>		
			</div>
			
			<div id="divPerfiles" class="col-lg-12">
				<div class="row">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<!--Tabla-->
						<div id="DivTablaPerfiles"></div>
					</div>
				</div>
			</div>
			
			<div id="divPerfilesDetalle" class="col-lg-12" style="display: none;">
				<div class="row padding_p">
					<div class="col-lg-3 fblanco">
						<div class="row" style="padding: 10px;"><span class="titulo_20">Detalles del perfil</span></div>
						<div class="row"><img style="margin: 0 auto;" src="img/neto.svg"/></div>
						<div class="row" style="text-align: center;"><span id="perfilNombre" class="subtitulo_20" style="margin: 0 auto; text-align: center;padding: 10px;">---</span></div>
						<div class="row" style="text-align: center;"><span id="perfilDescripcion" class="subtitulo_20" style="margin: 0 auto; text-align: center;padding: 10px;">---</span></div>
						<div class="row" style="padding: 10px;"><span class="titulo_20">Estatus</span></div>
						<div class="row" style="padding-left: 20px;"><span id="estatusPerfil" class="subtitulo_20">---</span></div>
					</div>
					<div class="col-lg-9 menupr_estilos fazul tabla_container">
						<!--Tabla-->
						<div id="DivTablaPerfilesDetalle" style="padding-left: 10px; padding-right: 10px;"></div>
					</div>
				</div>
			</div>
			
			
		</div>
	</div>

	<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />

<form style="display: hidden" action="./configuracionOpciones" method="POST" id="confOpciones">
</form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/tablas.js"></script>
	<script	src="${pageContext.request.contextPath}/js/configuracion_perfiles.js"></script>

	
	</body>
</html>