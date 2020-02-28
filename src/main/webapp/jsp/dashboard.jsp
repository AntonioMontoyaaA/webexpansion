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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashboard.css" />	
	
<title>Dashboard</title>
</head>
<body class="fazul">
<input type="hidden" id="perfil_usuario" value="${usr.perfil.perfilesxusuario[0].perfilid}">
<input type="hidden" id="area" value="${usr.perfil.areasxpuesto[0].areaNom}">
<input type="hidden" id="areaId" value="${usr.perfil.areasxpuesto[0].areaId}">

<%@ include file="/jsp/generic/header.jsp" %>
<div class="container-fluid fazul">
	<div class="row padding_p" style="padding-top:0px;">
	<div class="col-lg-12 titulo blanco t12 negrita" id="nombrePerfil">
	</div>
		<div class="col-lg-8">
<!-- PROGRESO GENERAL DE AREAS  -->	
		<div class="row divs_p">
		<div class="col-lg-4 menupr_estilos fazul">
			<div class="row cabecera">	
					<span class="blanco negrita t18">ACTIVAS</span>
			</div>
			<div id="container_activas" class="cursor"></div>
			
			<div class="col-12 info">
				<span class="t26"  style="color: #3FB961;" id="total_activas">0</span>
				<div class="float_right blanco"><img class="icono_medida" src="img/w_activas.svg"></div>
			</div>		 
		</div>
		<div class="col-lg-4 menupr_estilos fazul">
			<div class="row cabecera">	
					<span class="blanco negrita t18">ATRASADAS</span>
			</div>
			<div id="container_atrasadas"  class="cursor"></div>
			
			<div class="col-12 info">
				<span class="t26" style="color: #C93535;" id="total_atrasadas">0</span>
				<div class="float_right blanco"><img class="icono_medida" src="img/w_atrasadas.svg"></div>
			</div>		 
		</div>
		<div class="col-lg-4 menupr_estilos fazul">
			<div class="row cabecera">	
					<span class="blanco negrita t18">CANCELADAS</span>
			</div>
			<div id="container_canceladas" class="cursor"></div>
			
			<div class="col-12 info">
				<span class="t26" style="color: #657488;" id="total_canceladas">0</span>
				<div class="float_right blanco"><img class="icono_medida" src="img/w_canceladas.svg"></div>
			</div>		 
		</div>
	
		</div>
<!-- FIN PROGRESO GENERAL DE AREAS -->
		</div>	
		<div class="col-lg-4 ">
		<div class="row divs_p" style="padding-bottom:0">
<!-- PLAN APERTURA MENSUAL -->	
			<div class="col-lg-12 menupr_estilos fazul">
				<div class="row cabecera">
				<div class="col-lg-10">
					<span class="blanco negrita t18">PLAN APERTURA MENSUAL</span>
				</div>
				<div class="col-lg-2 text-right">
					<div class="combos">
					<form class="form-inline p_cabecera">
  						<button class="btn desp refresh" type="button" onclick="AperturaMensual();"></button>
  					</form>
  					</div>
				</div>
			<div class="col-lg-12 p_cabecera" style="display: none;">
				<span class="blanco negrita estilo_dato t22" id="suma">0</span><span class="blanco estilo_info t14"> TIENDAS</span>
			</div>
			</div>	
			
			<div id="container_apmensual"></div>
			
		</div>
<!--FIN PLAN APERTURA MENSUAL -->	
		</div>
		</div>
		
		<div class="col-lg-12 ">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fazul" style="overflow-x:auto; overflow-y:hidden; height:310;">
			<div class="row cabecera" style="padding-top:0">
				<div class="col-lg-12" style="height:15px;">
					<span class="blanco negrita t18">SEGUIMIENTO DE MD'S POR ÁREA</span>
				</div>
			</div>
			<div id="proceso"></div>
		</div>
		</div>
		</div>
		
		
	</div>
</div>
	
		<input type="hidden" id="fechaConsulta" name="fechaConsulta" value="" />
	
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

	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap-datepicker.min.js"></script>
	<script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap-datepicker.es.min.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/highcharts.js"></script>
	<script	src="${pageContext.request.contextPath}/js/nuevodashboard.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/data.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/exporting.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/export-data.js"></script>
	<%-- <script	src="${pageContext.request.contextPath}/js/dashboard.js"></script> --%>
	</body>
</html>