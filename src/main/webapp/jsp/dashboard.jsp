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
<title>Dashboard</title>
</head>
<body>
<%--  <c:forEach var="permisos" items="${permisos}">
     	  			 <c:out value="${permisos.codigo}"/> </c:forEach>  --%>
<%-- <p>Student First Name: <c:out value="${login.contra}"/></p> --%>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid menupr_fondo">

	<div class="row padding_p">
	<div class="col-lg-12 titulo">Dashboard Expansión</div>
	
		<div class="col-lg-8">
		<div class="row divs_p">
		<div class="col-lg-12 menupr_estilos" style="height:300px;"></div>
		</div>
		<div class="row divs_p">	
			<div class="col-lg-12 menupr_estilos" style="height:300px;"></div>
		</div>
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
	


		

	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/dashboard.js"></script>
	
	
	</body>
</html>