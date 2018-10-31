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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablas.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/configuracion_usuario.css" />
	
	
<title>Configuración</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
		<div class="row padding_p" style="padding-top: 0px;">
			<div class="col-lg-12 titulo blanco t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > CONFIGURACION</div>
			<div style="width:100%">
			<div class="contenedor_botones_superiores">
        		<div class="row">
        			<div class="col-4 boton_sup cursor activo" id="boton_sup_usuario" onclick="activa(this)">Usuario</div>
        			<div class="col-4 boton_sup cursor" id="boton_sup_perfiles" onclick="activa(this)">Perfiles</div>
        			<div class="col-4 boton_sup cursor" id="boton_sup_opciones" onclick="activa(this)">Opciones</div>
        		</div>
        		
        	</div>
        	</div>
			
			<div class="bloque1" style="width:100%;"><!-- ***************************** BLOQUE 1 ************************************ -->		
			<div class="contenedor_buscador padding_p">
			<div class="buscador float_left">
						<input type="text"  placeholder="Buscar" id="buscador" class="form-control buscadorInput t12" onkeyup="ejecutaBuscador()"/>
			</div>	
					<button class="btn desp" type="button" id="agrega" onclick="mostrarNuevoUsuario()"></button>
					<a  href="configuracion_usuario_perfil"><button class="btn desp" type="button" id="asignar">Asignar perfil a usuario</button></a>
					<button class="btn desp fondo_puntos" type="button" id="filtros" onclick="mostrarfiltros()">Filtros</button>
			</div>
			
			<div class="contenedor float_left" id="usuarios_cont">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<div id="DivTabla"></div><!--Tabla-->
					</div>
				</div>
			</div>
			
			<div class="contenedor float_right" id="filtros_cont">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<div class="col-12 azul t14 center titulo_contenedor fondo_puntos">FILTROS</div><br>
						<div class="col-12 azul t14 negrita">Área</div>
						<div class="col-12 azul"><select class="campo t12" id="campo_area"></select></div>
						<br>
						<div class="col-12 azul t14 negrita">Puesto</div>
						<div class="col-12 azul"><select class="campo t12" id="campo_puesto"></select></div>
						<br>
						<div class="col-12 azul t14 negrita">Estatus</div>
						<div class="col-12 cursor" id="seleccion" onclick="seleccionEvento()" style="margin-top:5px;">
							<div class="caja float_left" style="background:#40BCD8">
								<img id="campo_estatus" src="img/check.png" style="display:none;">
							</div>
							<span class="t10 azul">ACTIVO</span>
						</div>
						<br>
						<div class="col-12 t14 negrita">ID de Usuario</div>
						<div class="col-12"><input type="text" class="campo" id="campo_idUsuario"></div>
						
						<div class="col-12 center"><button class="btn fazul t14 blanco" type="button" id="boton_consultar">Consultar</button></div>
						
					</div>
				</div>
				</div>
				
				<div class="contenedor float_right" id="nuevo_usuario">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<div class="col-12 azul t14 center titulo_contenedor">NUEVO USUARIO</div><br>
						<div class="col-12 azul t14 negrita">No. Empleado</div>
						<div class="col-12"><input type="text" class="campo" id="nuevo_noempleado"></div>
						<div class="col-12 azul t14 negrita">Nombre</div>
						<div class="col-12 azul"><input type="text" class="campo" id="nuevo_nombre"></div>
						<div class="col-12 azul t14 negrita">Apellido Paterno</div>
						<div class="col-12 azul"><input type="text" class="campo" id="nuevo_appat"></div>
						<div class="col-12 azul t14 negrita">Apellido Materno</div>
						<div class="col-12 azul"><input type="text" class="campo" id="nuevo_apmat"></div>
						<div class="col-12 azul t14 negrita">Area</div>
						<div class="col-12 azul"><select class="campo t12" id="nuevo_area"></select></div>
						<div class="col-12 azul t14 negrita">Puesto</div>
						<div class="col-12 azul"><select class="campo t12" id="nuevo_puesto"></select></div>
						<div class="col-12 azul t14 negrita">Telefono</div>
						<div class="col-12 azul"><input type="text" class="campo" id="nuevo_telefono"></div>
						<div class="col-12 azul t14 negrita">IMEI</div>
						<div class="col-12 azul"><input type="text" class="campo" id="nuevo_imei"></div>
						<div class="col-12 azul t14 negrita">Email</div>
						<div class="col-12 azul"><input type="text" class="campo" id="nuevo_email"></div>
						
						<div class="col-12 center"><button class="btn fazul t14 blanco" type="button" id="boton_crear">Crear Usuario</button></div>
					</div>
				</div>
				</div>
				
			</div>
			
			<div class="bloque2" style="display:none; width:100%;"> <!-- ***************************** BLOQUE 2 ************************************ -->
			
			<div class="contenedor_buscador">
			<div class="buscador float_left">
						<input type="text"  placeholder="Buscar" id="buscador" class="form-control buscadorInput t12" onkeyup="ejecutaBuscador()"/>
			</div>
			</div>
			
			<div class="row">
			<div class="col-lg-3" id="detalle1">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<div class="col-12 azul t14 left titulo_contenedor">Detalles del usuario</div><br>
						
						<div class="col-12 center">
										<div class="circulo_imagen" style="background: white;" id="imagenusuario"></div>
							</div><br>
							<div class="col-12 t14 center gris" style="margin-bottom:10px;" id="nombreusuario"></div>
							<div class="col-12 t14 center gris" style="margin-bottom:10px;" id="areausuario"></div><br>
					<div class="col-12 azul t14 left titulo_contenedor">Perfiles</div>
					<div class="col-12 t14 gris" style="padding-left:20px;" id="no_perfiles"></div><br>
					<div class="col-12 azul t14 left titulo_contenedor">Última modificación</div>
					<div class="col-12 t14 gris" style="padding-left:20px;" id="ultima_mod"></div><br>
					</div>
				</div>
			</div>
				
				<div class="col-lg-9 " id="detalle2">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<div id="DivTablaPerfiles"></div><!--Tabla-->
					</div>
				</div>
			</div>
			</div>
			
			</div>
		</div>
	</div>

	<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />


<form style="display: hidden" action="./configuracionPerfiles" method="POST" id="confPerfiles">
</form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/configuracion_usuario.js"></script>

	
	</body>
</html>