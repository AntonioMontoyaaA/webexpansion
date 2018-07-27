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
	
<title>Asignadas</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
<div class="row">
	<div class="col-lg-12 titulo">Dashboard Expansión > Asignadas > Nombre MD</div>
	<div class="col-12" id="map"></div>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuFdkYUDivTv_TrR4RZMWP1NYCA0MK2YM&callback=initMap">
    </script>
    
    <div class="text-center">
		<!-- <button type="button" class="btn btn-demo" data-toggle="modal" data-target="#myModal">
			Left Sidebar Modal
		</button> -->
	</div>
	
	<!-- Modal -->
	<div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">Left Sidebar</h4>
				</div>

				<div class="modal-body">
				</div>

			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->
	
</div>
</div>
	

<form action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="post">
	<input type="hidden" name="mdId" id="mdId" value=""/>
	<input type="hidden" name="nombreMd" id="nombreMd" value=""/>
	<input type="hidden" name="tipoMd" id="tipoMd" value=""/>
</form>

<form action='mensajes_historial'  id="chatPorMd" method="post">
	<input type="hidden" name="mdIdChat" id="mdIdChat" value=""/>
</form>
		


	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/localizador.js" type="text/javascript"></script>
	
	</body>
</html>