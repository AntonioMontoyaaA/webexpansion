<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!-- &emsp;  &nbsp;-->
<html>
<head>
<link rel="shortcut icon" href="img/favicon.png" />
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
		<div class="col-lg-12 titulo blanco t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > Historial de mensajes <span class="blanco negrita t12" id="titulo_chat"></span></div>
		<div class="col-12" style="padding-left:0; margin-bottom:10;">
				<button class="btn desp atras" type="button" onclick="history.back()"></button>
		</div>
<!-- lista -->	
		<div class="col-lg-2 col-md-3"  id="contenedor_lista"></div>	
		<div class="col-lg-10 col-md-9" id="cuadro_chat">
<!-- Jefe de expansión -->
			<div class="col-lg-12 menupr_estilos fondo_chat" style="height: 70%;">
			<div class="row cabecera" style="width:100%;">
				<div class="col-lg-9 col-md-8"  style="height:40px;">
					<span class="azul negrita t14" id="subtitulo_chat"></span>
				</div>
				<div class="col-lg-3 col-md-4 right" style="padding-right:25px; padding-top:2px;">
				<div class="buscador" style="width: 100%;">
               			<input type="text"  placeholder="Buscar" id="chat_buscador" class="form-control buscadorInput t12" onkeyup="buscador()"></div>
               	</div> 
			</div>
			<div class="col-md-12 div_alt" id="chat_principal"></div>
			<div class="col-12 cabecera">
				<div class="col-lg-12">
					<input id="chat_input" class="input_text" type="text" placeholder="Escribir mensaje"  onkeyup="enviaMensajeChat(event)"/><img id="chatSend" onclick="enviaMensajeChatSend()" src="img/send_chat.png" class="send sendDisable" />
				</div>
			</div>
			</div>
	</div>
	
</div>
</div>

<form action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="post">
	<input type="hidden" name="mdId" id="mdId" value=""/>
	<input type="hidden" name="nombreMd" id="nombreMd" value=""/>
	<input type="hidden" name="tipoMd" id="tipoMd" value=""/>
</form>

<form style="display:none;" action='mensajes_historial'  id="chatPorMd" method="post">
	<s:textfield id="mdIdChat" name="mdIdChat" label="" cssStyle="display: none"></s:textfield>
	<s:textfield id="nombreMdChat" name="nombreMdChat" label="" cssStyle="display: none"></s:textfield>
	<s:textfield id="tipoMdChat" name="tipoMdChat" label="" cssStyle="display: none"></s:textfield>
	<input type="hidden" id="usuarioLogin" value="${usr.perfil.numeroEmpleado}" />
</form>
	
<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />


	<script	src="js/jquery/jquery.min.js"></script>
	<script	src="js/jquery/popper.js"></script>
	<script	src="bootstrap/js/bootstrap.bundle.min.js" type="text/javascript"></script>
	<script	src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="js/utiles/utiles.js"></script>
	<script	src="js/mensajesHistorial.js"></script>
	
	</body>
</html>