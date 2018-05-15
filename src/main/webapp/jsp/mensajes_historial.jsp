<%@ page contentType="text/html; charset=UTF-8" %>

<!-- &emsp;  &nbsp;-->
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 --><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
	<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/generic.css" />
	<link rel="stylesheet" href="css/mensajes_historial.css" />
	
<title>Mensajes</title>
</head>
<body>
<%--  <c:forEach var="permisos" items="${permisos}">
     	  			 <c:out value="${permisos.codigo}"/> </c:forEach>  --%>
<%-- <p>Student First Name: <c:out value="${login.contra}"/></p> --%>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid menupr_fondo">
<div class="row padding_p">
	<div class="col-lg-12 titulo">Dashboard Expansión </div>

<!-- CHAT -->	
		<div class="col-lg-4">
		<div class="row divs_p">
		<div class="col-lg-12 menupr_estilos">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Historial Chat</span>
				</div>
			</div>
			<div class="col-md-12 chat frame">
					<ul id="chat"></ul>
			</div>
		</div>
		</div>
		</div>	
		<div class="col-lg-8">
		<div class="row">
<!-- DATOS DEL SITIO -->
			<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos ">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">1) Datos del sitio</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="datos_sitio">
					<div class="row msj_bloque">
					<div class="msj_icono"></div>
					<div class="msj_texto azul"></div>
					</div>
			</div>
			</div>
			</div>
<!-- DATOS DEL PROPIETARIO -->
			<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos ">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">2) Datos del propietario</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="datos_prop"></div>
			
			</div>
			</div>
<!-- SUPERFICIE -->		
		<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos ">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">3) Superficie</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="superficie"></div>
			</div>
			</div>
<!-- ZONIFICACION -->		
			<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos ">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">4) Zonificación</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="zonificacion"></div>
			</div>
			</div>
		</div>
	</div>
<!-- CONSTRUCCION -->	
	<div class="col-lg-4 divs_p">
			<div class="col-lg-12 menupr_estilos ">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">5) Construcción</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="construccion"></div>
			</div>
		</div>
<!-- GENERALIDADES DEL SITIO -->		
		<div class="col-lg-4 divs_p">
			<div class="col-lg-12 menupr_estilos ">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Generalidades del sitio</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="generalidades_sitio"></div>
			</div>
		</div>
<!-- FLUJO PEATONAL -->		
		<div class="col-lg-4 divs_p">
			<div class="col-lg-12 menupr_estilos ">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Flujo peatonal</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="flujo_peatonal"></div>
			</div>
		</div>
	
</div>
</div>
	
<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />


	<script	src="js/jquery/jquery.min.js"></script>
	<script	src="bootstrap/js/bootstrap.bundle.min.js" type="text/javascript"></script>
	<script	src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="js/utiles/utiles.js"></script>
	<script	src="js/mensajesHistorial.js"></script>
	
	</body>
</html>