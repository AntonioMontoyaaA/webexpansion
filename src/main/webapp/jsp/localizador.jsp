<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!-- &emsp;  &nbsp;-->
<html>
<head>
<link rel="shortcut icon" href="img/favicon.png" />
<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mapa.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/localizador.css" />
	
<title>Asignadas</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>
<div class="container-fluid">
	<div class="row">
		<div class="col-lg-12 titulo">Dashboard Expansión > Localizador</div>
	
		<div class="contentLocalizador" id="contentDivLocalizador">
			<!-- ALTA RADIO -->
			<div class="content" id="contentAlta">
				<span id="altaRadio" class="negrita t14 titleDivContent">Dar de alta radio</span><br>
				<div class="contentDetalle hidden">
					<span class="negrita t14">1) Carga el archivo excel con los radios</span><br>
					<span class="negrita t14">2) Un click para ver la información del radio</span><br>
					<span class="negrita t14">3) Doble click para eliminar un radio</span><br>
					<span class="negrita t14">4) Guarda</span>
					<br>
				     <br>
				    <div id="drop">Arrastrar archivo de radios</div>
	
					<input type="file" name="xlfile" id="xlf" /><br>
					<br> 
					
					 <button type="button" id="btonGuardarRadios" class="btn back_5 btn_aceptar"  data-target="#myModal">
						Guardar
				   </button>
				   <button type="button" id="btonCancelarRadios" class="btn btn-demo color_5 btn_cancelar"  data-target="#myModal">
						Limpiar
					</button>
				</div>
			</div>
			
			<div class="bordeDiv" id=""> </div>
			<!-- ASIGNAR RADIO -->
			<div class="content" id="contentAsignar">
			 	<span id="asignarRadio" class="negrita t14 titleDivContent">Asignar radio</span>
			 	<br>
			 	
			 	<div class="contentDetalle  hidden">
					<span class="negrita t14">1) Seleccionar jefe. </span><br>
					<span class="negrita t14">2) Click para seleccionar el radio</span><br>
					<span class="negrita t14">3) Guarda</span><br>
					
					<div id="comboMotivos" style="padding-bottom: 15px;">
				      	<select id="select_employee" class="motivoRechazo">
				      		<option value="0">Seleccionar jefe</option>
				      	</select>
				     </div>
					
					 <button type="button" id="btnAsignarRadio" class="btn back_5 btn_aceptar"  data-target="#myModal">
						Asignar Radio
				   </button>
				   <button type="button" id="btnRemovelAsign" class="btn btn-demo color_5 btn_cancelar"  data-target="#myModal">
	 					Cancelar
	 				</button> 
				</div>
			</div>
		</div>
		
	</div>
</div>
<div class="col-12" id="map"></div>

	<jsp:include page="/jsp/generic/loading.jsp" />
	<jsp:include page="/jsp/generic/mensajes.jsp" />

	<!-- load xslx -->

	
	
	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>	
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script type="text/javascript">cargaLoading();</script>

	<script	src="${pageContext.request.contextPath}/js/xslx/shim.js"></script>
	<script	src="${pageContext.request.contextPath}/js/xslx/jszip.js"></script>
	<script	src="${pageContext.request.contextPath}/js/xslx/xlsx.js"></script>
	<script	src="${pageContext.request.contextPath}/js/localizador.js" type="text/javascript"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuFdkYUDivTv_TrR4RZMWP1NYCA0MK2YM&callback=initMap">
	    </script>
	
	</body>
</html>