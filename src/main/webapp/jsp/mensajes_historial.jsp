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
	<div class="col-lg-12 titulo">Historial de mensajes </div>
		<div class="col-12" style="padding-left:0;">
				<button class="btn atras" type="button" onclick="history.back()"></button>
		</div>
<!-- CHAT -->	
		<div class="col-lg-4">
		<div class="row divs_p">
		<div class="col-lg-12 menupr_estilos fazul">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="blanco negrita">Historial Chat</span>
				</div>
			</div>
			<div class="col-md-12 chat frame">
					<ul id="chat"></ul>
			</div>
			<div class="row cabecera">
				<div class="col-lg-12">
					<input id="chatGral" class="input_text" type="text" placeholder="Escribir mensaje a general" onkeyup="enviaMensajeGral(event)" /><img id="chatGralSend" onclick="enviaMensajeGralSend()" src="img/send_chat.png" class="send sendDisable" />
				</div>
			</div>
		</div>
		</div>
		</div>	
		<div class="col-lg-8">
		<div class="row">
<!-- Jefe de expansión -->
			<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos fblanco">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Jefe de expansi&oacute;n</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="jefe_expansion">
				
			</div>
			<div class="row cabecera">
				<div class="col-lg-12">
					<input id="chatJefe" class="input_text" type="text" placeholder="Escribir mensaje a jefe"  onkeyup="enviaMensajeJefe(event)"/><img id="chatJefeSend" onclick="enviaMensajeJefeSend()" src="img/send_chat.png" class="send sendDisable" />
				</div>
			</div>
			</div>
			</div>
<!-- Gerente de expansión -->
			<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos fblanco">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Gerente de expansi&oacute;n</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="gerente_expansion">
			</div>
			<div class="row cabecera">
				<div class="col-lg-12">
					<input id="chatGerente" class="input_text" type="text" placeholder="Escribir mensaje a gerente" onkeyup="enviaMensajeGerente(event)"  /><img id="chatGerenteSend" onclick="enviaMensajeGerenteSend()" src="img/send_chat.png" class="send sendDisable" />
				</div>
			</div>
			</div>
			</div>
<!-- Expansión -->		
		<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos fblanco">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Expansi&oacute;n</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="expansion"></div>
			<div class="row cabecera">
				<div class="col-sm-12">
					<input id="chatExpansion" class="input_text" type="text" placeholder="Escribir mensaje a expansi&oacute;n" onkeyup="enviaMensajeExpansion(event)" /><img id="chatExpansionSend" onclick="enviaMensajeExpansionSend()" src="img/send_chat.png" class="send sendDisable" />
				</div>
			</div>
			</div>
			</div>
<!-- Gestoría -->		
			<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos fblanco">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Gestor&iacute;a</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="gestoria"></div>
			<div class="row cabecera">
				<div class="col-lg-12">
					<input id="chatGestoria" class="input_text" type="text" placeholder="Escribir mensaje a gestor&iacute;a" onkeyup="enviaMensajeGestoria(event)" /><img id="chatGestoriaSend" onclick="enviaMensajeGestoriaSend()" src="img/send_chat.png" class="send sendDisable" />
				</div>
			</div>
			</div>
			</div>
<!-- Construcción -->		
			<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos fblanco">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Construcci&oacute;n</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="construccion"></div>
			<div class="row cabecera">
				<div class="col-lg-12">
					<input id="chatConstruccion" class="input_text" type="text" placeholder="Escribir mensaje a construcci&oacute;n" onkeyup="enviaMensajeConstruccion(event)" /><img id="chatConstruccionSend" onclick="enviaMensajeConstruccionSend()" src="img/send_chat.png" class="send sendDisable" />
				</div>
			</div>
			</div>
			</div>
<!-- Operaciones -->		
			<div class="col-lg-6 divs_p">
			<div class="col-lg-12 menupr_estilos fblanco">
			<div class="row cabecera">
				<div class="col-lg-12">
					<span class="azul negrita">Operaciones</span>
				</div>
			</div>
			<div class="col-md-12 div_alt" id="operaciones"></div>
			<div class="row cabecera">
				<div class="col-sm-12">
					<input id="chatOperaciones" class="input_text" type="text" placeholder="Escribir mensaje a operaciones" onkeyup="enviaMensajeOperaciones(event)" /><img id="chatOperacionesSend" onclick="enviaMensajeOperacionesSend()" src="img/send_chat.png" class="send sendDisable" />
				</div>
			</div>
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
	<input type="hidden" id="usuarioLogin" value="${usr.perfil.numeroEmpleado}" />
</form>
	
<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />


	<script	src="js/jquery/jquery.min.js"></script>
	<script	src="js/jquery/popper.js"></script>
	<script	src="js/utiles/utiles.js"></script>
	<script	src="bootstrap/js/bootstrap.bundle.min.js" type="text/javascript"></script>
	<script	src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="js/utiles/utiles.js"></script>
	<script	src="js/mensajesHistorial.js"></script>
	
	</body>
</html>