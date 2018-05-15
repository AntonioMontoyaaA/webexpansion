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
		<div class="col-lg-5 titulo">Dashboard Expansión > Asignadas </div>
		<div class="col-lg-2 titulo" style="background: #FFFFFF; color: #1f3d7a;text-align: center; border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;">
			<span class="punto"></span>
			<span style="padding-left: 5px;">A tiempo</span><span style="padding-left: 20px;">&nbsp;</span>
			<span class="punto" style="background-color: #FF5B16"></span>
			<span style="padding-left: 5px;">Vencidas</span></div>
		<div class="col-lg-5 titulo">&nbsp;</div>
		<div class="col-lg-9 titulogrande">MD ASIGNADAS</div>
		<div class="col-lg-3" style="padding-top: 5px;">
			<div id="descargaExcelAsignadas" style="position: relative; float: left;margin-right: 10px;cursor: pointer"><img src="${pageContext.request.contextPath}/img/iconos_DOWNLOAD.png"></div>
			<div style="position: relative; float: left;margin-right: 10px;"><input type="text" class="fechaInicialCalendario" readonly id="datepicker1"/></div>
			<div class="buscadorAsignadas"><input placeholder="Buscar MD" id="buscadorAsignadas" class="buscadorAsignadasInput" onkeyup="ejecutaBusquedaAsignadas()" type="text" /></div>
		</div>
		<div class="col-lg-12">
			<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos tabla_container">
					<!--Tabla-->
    				<div id="DivTablaAsignadas" style="padding-top: 3px;position: relative;float: left;width: 99%; left: 5px;">
    				</div>
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
</form>

<form style="display: hidden" action="./excelAsignadasAction" method="POST" id="form">
	<input type="hidden" id="datos" name="datos" value=""/>
	<input type="submit" id="submitBotonAsignadas" style="display:none" />
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