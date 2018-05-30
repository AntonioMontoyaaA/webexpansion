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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablas.css" />

	
<title>Rechazadas</title>
</head>
<body>
<%--  <c:forEach var="permisos" items="${permisos}">
     	  			 <c:out value="${permisos.codigo}"/> </c:forEach>  --%>
<%-- <p>Student First Name: <c:out value="${login.contra}"/></p> --%>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p">
		<div class="col-lg-12 titulo">Dashboard Expansión > Rechazadas </div>
	
		<div class="col-lg-12 titulogrande">MD RECHAZADAS</div>
		<div class="col-lg-12">
		<div class="row padding_p">
			<div class="col-lg-12 menupr_estilos tabla_container">
			
			<table id="example" class="row-border">
        <thead>
            <tr>
                <th>Nombre MD</th>
                <th>Categoría</th>
                <th>Puntuación</th>
                <th>Creador</th>
                <th>Fecha de creación</th>
                <th>Fecha de vencimiento</th>
                <th>Mensajes</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="left">MD Oaxaca Centro</td>
                <td>A</td>
               <td class="left">27 puntos . . .</td>
                <td>Juan de la Cruz</td>
                <td>10/03/2018</td>
                <td>06/04/2018</td>
                <td>*</td>
            </tr>
            <tr>
                <td class="left">MD Chilpancingo</td>
               <td>A</td>
                <td class="left">27 puntos . . .</td>
                <td>Antonio Montoya</td>
                <td>25/02/2018</td>
                <td>08/04/2018</td>
                <td>*</td>
            </tr>
            <tr>
               <td class="left">MD Morelos Sur</td>
                <td>A</td>
                <td class="left">27 puntos . . .</td>
                <td>Omar Perez</td>
                <td>03/01/2018</td>
                <td>08/04/2018</td>
                <td>*</td>
            </tr>
        </tbody>
    </table>
			
			</div>
		</div>
		</div>
	</div>
</div>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/rechazadas.js"></script>
	
	
	</body>
</html>