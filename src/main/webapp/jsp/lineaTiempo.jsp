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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/utiles/frappe-gantt.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/lineaTiempo.css" />
	

	
<title>Linea de Tiempo</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p" style="padding-top:0px;">
		<div class="col-lg-12 titulo azul t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > APROBADAS > TIEMPOS </div>
	
	<div class="col-lg-12">
		<div class="row">
				<button class="btn desp rechargue" type="button">
  								<img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
  				</button>
		</div>
		
		<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos fblanco">
					<!--   aquí va la grafica       -->
					<svg id="gantt"></svg>
				
				</div>
		</div>
		
		<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos fblanco" style="height:200px;">x</div>
		</div>
		
	</div>
	</div>
	</div>


<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
<%-- 	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script> --%>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/frappe-gantt.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/lineaTiempo.js"></script>
	
	
	
	</body>
</html>