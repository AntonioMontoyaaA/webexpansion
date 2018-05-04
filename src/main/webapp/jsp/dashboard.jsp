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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashboard.css" />	
<title>Dashboard</title>
</head>
<body>
<%--  <c:forEach var="permisos" items="${permisos}">
     	  			 <c:out value="${permisos.codigo}"/> </c:forEach>  --%>
<%-- <p>Student First Name: <c:out value="${login.contra}"/></p> --%>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid menupr_fondo">
	<div class="row padding_p">
	<div class="col-lg-12 titulo">Dashboard Expansión 
	</div>
		<div class="col-lg-8">
<!-- PROGRESO GENERAL DE AREAS  -->	
		<div class="row divs_p">
		<div class="col-lg-12 menupr_estilos">
			<div class="row cabecera">
				<div class="col-lg-5">
					<span class="azul negrita">Progreso General de áreas</span>
				</div>
				<div class="col-lg-7 text-right">
					<form class="form-inline p_cabecera">
					<span class="fecha">Hoy 04 de Mayo del 2018 12:22PM</span>
  					
  						<select class="form-control form-inline desp filtro">
  						<option selected>Mes</option>
    					<option>Día</option>
    					<option>Semana</option>
    					<option>Año</option>
  						</select>
							&nbsp;
  						<button class="btn desp rechargue" type="button">
  								<img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
  						</button>
  					</form>
				</div>
			
			<div class="col-lg-12 p_cabecera">
				<span class="azul estilo_info">MD TOTALES</span><span class="azul negrita estilo_dato">17</span>
				<span class="azul estilo_info">ASIGNADAS</span><span class="azul negrita estilo_dato">10</span>
				<span class="azul estilo_info">ATRASADAS</span><span class="azul negrita estilo_dato">2</span>
				<span class="azul estilo_info">AUTORIZADAS</span><span class="azul negrita estilo_dato">2</span>
				<span class="azul estilo_info">RECHAZADAS</span><span class="azul negrita estilo_dato">5</span>
			</div>
			
			<div class="col-lg-12">
				<span class="azul estilo_info">MARZO 2018</span>
			</div>
			
			</div>
				<div id="container"></div>
				<table id="datatable"></table>
				
				<div id="container_sm1"></div>
				<table id="datatable_sm1"></table>
				<div id="container_sm2"></div>
				<table id="datatable_sm2"></table>
		</div>
		</div>
<!-- FIN PROGRESO GENERAL DE AREAS -->
<!-- PROGRESO SEMANAL -->
		<div class="row divs_p">	
					<div class="col-lg-12 menupr_estilos">
			<div class="row cabecera">
				<div class="col-lg-5">
					<span class="azul negrita">Progreso Semanal</span>
				</div>
				<div class="col-lg-7 text-right">
					<form class="form-inline p_cabecera">
					<span class="fecha">Hoy 04 de Mayo del 2018 12:22PM</span>
  					
  						<select class="form-control form-inline desp filtro">
  						<option selected>Semana</option>
    					<option></option>
    					<option></option>
    					<option></option>
  						</select>
							&nbsp;
  						<button class="btn desp rechargue" type="button">
  								<img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
  						</button>
  					</form>
				</div>
			
			<div class="col-lg-12">
				<span class="azul estilo_info">MARZO - ABRIL 2018</span>
			</div>
			
			</div>
				<div id="container"></div>
				<table id="datatable"></table>
				
				<div id="container_sm1"></div>
				<table id="datatable_sm1"></table>
				<div id="container_sm2"></div>
				<table id="datatable_sm2"></table>
		</div>
			
		</div>
<!-- FIN PROGRESO SEMANAL -->
		</div>
		
		<div class="col-lg-4 ">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos" style="height:150px;"></div>
		</div>
		
		<div class="row">
			<div class="col-lg-6 col-md-4 col-6 divs_p">
				<div class="col-lg-12 menupr_estilos" style="height:150px;"></div>
			</div>
			<div class="col-lg-6 col-md-4 col-6 divs_p">
				<div class="col-lg-12 menupr_estilos" style="height:150px;"></div>
			</div>
			<div class="col-lg-6 col-md-4 col-6 divs_p">
				<div class="col-lg-12 menupr_estilos" style="height:150px;"></div>
			</div>
			<div class="col-lg-6 col-md-4 col-6 divs_p">
				<div class="col-lg-12 menupr_estilos" style="height:150px;"></div>
			</div>	
		</div>
		</div>
	
	</div>
</div>
	

<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />
		

	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.bundle.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/highcharts.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/dashboard.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/data.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/exporting.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/export-data.js"></script>
	
	</body>
</html>