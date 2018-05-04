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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablas.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/asignadas.css" />

	
<title>Asignadas</title>
</head>
<body>
<%--  <c:forEach var="permisos" items="${permisos}">
     	  			 <c:out value="${permisos.codigo}"/> </c:forEach>  --%>
<%-- <p>Student First Name: <c:out value="${login.contra}"/></p> --%>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p">
		<div class="col-lg-12 titulo">Dashboard Expansión > Asignadas </div>
	
		<div class="col-lg-12 titulogrande">
			<div style="width: 80%; position: relative; float: left;">MD ASIGNADAS</div>
			<div style="width: 20%; position: relative; float: left; padding-top: 5px;">
				<div style="position: relative; float: left;margin-right: 10px;cursor: pointer"><img src="${pageContext.request.contextPath}/img/iconos_DOWNLOAD.png"></div>
				<div style="position: relative; float: left;margin-right: 10px;"><input type="text" class="fechaInicialCalendario" readonly id="datepicker1"/></div>
				<div class="buscadorAsignadas"><input placeholder="Buscar MD" id="buscadorAsignadas" class="buscadorAsignadasInput" onkeyup="ejecutaBusquedaAsignadas()" type="text" /></div>
			</div>
		</div>
		<div class="col-lg-12">
			<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos tabla_container">
			
					<!--Tabla-->
    				<div id="DivTablaAsignadas" style="padding-top: 3px;position: relative;float: left;width: 99%; left: 5px;">
    				</div>
			
			<!--  
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
                <td class="left"><a href="asignadas_detalle">MD Oaxaca Centro</a></td>
                <td>A</td>
               <td class="left">27 puntos . . .</td>
                <td>Juan de la Cruz</td>
                <td>10/03/2018</td>
                <td>06/04/2018</td>
                <td>*</td>
            </tr>
            <tr>
                <td class="left"><a href="asignadas_detalle">MD Chilpancingo</a></td>
               <td>A</td>
                <td class="left">27 puntos . . .</td>
                <td>Antonio Montoya</td>
                <td>25/02/2018</td>
                <td>08/04/2018</td>
                <td>*</td>
            </tr>
            <tr>
               <td class="left"><a href="asignadas_detalle">MD Morelos Sur</a></td>
                <td>A</td>
                <td class="left">27 puntos . . .</td>
                <td>Omar Perez</td>
                <td>03/01/2018</td>
                <td>08/04/2018</td>
                <td>*</td>
            </tr>
        </tbody>
    </table>
     -->
			
				</div>
			</div>
		</div>
	</div>
</div>

<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />
<form action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="get">
	<input type="hidden" name="mdId" id="mdId" value=""/>
	<input type="hidden" name="nombreMd" id="nombreMd" value=""/>
</form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>		
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/asignadas.js"></script>
	<script	src="${pageContext.request.contextPath}/js/tablas.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	
	</body>
</html>