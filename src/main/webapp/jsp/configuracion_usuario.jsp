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
        		<div class="row center">
        		<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.18,1']}">
        			<div class="col-6 boton_sup cursor activo" id="boton_sup_usuario" onclick="activa(this)">Usuario</div>
        		</c:if> 
        		<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.18,2']}">
        			<div class="col-6 boton_sup cursor" id="boton_sup_perfiles" onclick="activa(this)">Perfiles</div>
        		</c:if> 
        		<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.18,3']}">
<!--         			<div class="col-4 boton_sup cursor" id="boton_sup_opciones" onclick="activa(this)">Opciones</div> -->
				</c:if> 
        		</div>
        		
        	</div>
        	</div>
			
			<div class="bloque1" style="width:100%;"><!-- ***************************** BLOQUE 1 ************************************ -->		
			<div class="contenedor_buscador padding_p">
			<div class="buscador float_left">
						<input type="text"  placeholder="Buscar" id="buscador" class="form-control buscadorInput t12" onkeyup="ejecutaBuscador()"/>
			</div>	
									
			
					<button class="btn desp" type="button" id="agrega" onclick="mostrarNuevoUsuario()"></button>
					<button class="btn desp" type="button" id="asignar" style="display:none;" onclick="mostrarAsignar()">Asignar perfil a usuario</button>
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
							<div class="caja float_left" style="background-color:#40BCD8;">
								<img id="campo_estatus" src="img/check.png" style="display:block;">
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
					<div class="col-lg-12 menupr_estilos fblanco tabla_container" style="overflow-x:hidden;">
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
						<div class="col-12 azul"><select class="campo t12" id="nuevo_puesto" onchange="validaCamposOcultos()"></select></div>
						
						<div class="col-12 azul t14 negrita nuevo_jefe" style="display:none;">Jefe</div>
						<div class="col-12 azul"><select class="campo t12 nuevo_jefe" id="nuevo_jefe" style="display:none;"></select></div>
						
						<div class="row" style="padding-left:15px;">
						<div class="col-6 azul center">
							<div class="form-check nuevo_fotoFueraRadio" style="display:none;  margin-top:15px; margin-bottom:15px;">
								<input type="checkbox" class="form-check-input"	id="nuevo_fotoFueraRadio"> 
								<label class="form-check-label t12 cursor" for="nuevo_fotoFueraRadio" style="margin-top:2px;">Foto fuera de radio</label>
							</div>
						</div>
						<div class="col-6 azul center">
							<div class="form-check nuevo_conteoFueraRadio" style="display:none;  margin-top:15px; margin-bottom:15px;">
								<input type="checkbox" class="form-check-input"	id="nuevo_conteoFueraRadio"> 
								<label class="form-check-label t12 cursor" for="nuevo_conteoFueraRadio" style="margin-top:2px;">Conteo fuera de radio</label>
							</div>
						</div>
						</div>
						<div class="col-12 azul t14 negrita nuevo_imei" style="display:none;">IMEI</div>
						<div class="col-12 azul"><input type="text" class="campo nuevo_imei" id="nuevo_imei" style="display:none;"></div>
						
						
						<div class="col-12 azul t14 negrita">Telefono</div>
						<div class="col-12 azul"><input type="text" class="campo" id="nuevo_telefono"></div>
						<div class="col-12 azul t14 negrita">Email</div>
						<div class="col-12 azul"><input type="text" class="campo" id="nuevo_email"></div>
						
						<div class="col-6 azul center">
							<div class="form-check nuevo_tipoUsuario" style="margin-top:15px; margin-bottom:15px;">
								<input type="checkbox" class="form-check-input"	id="nuevo_tipoUsuario"> 
								<label class="form-check-label t12 cursor" for="nuevo_tipoUsuario" style="margin-top:2px;">Interno</label>
							</div>
						</div>
						
						<div class="col-12 center"><button class="btn fazul t14 blanco" type="button" id="boton_crear" onclick="nuevoUsuario()">Crear Usuario</button></div>
					</div>
				</div>
				</div>
				
			</div>
			
			<div class="bloque2" style="display:none; width:100%;"> <!-- ***************************** BLOQUE 2 ************************************ -->
			<div class="contenedor_buscador right">
			<button class="btn desp atras float_left" type="button" onclick="atras();" style="margin-right:10px;"></button>
			<div class="buscador float_left">
						<input type="text"  placeholder="Buscar" id="buscadorDetalle" class="form-control buscadorInput t12" onkeyup="ejecutaBuscadorDetalle()"/>
			</div>
						<button class="btn desp guardar" type="button" onclick="guardaActualizacionPerfiles();"></button>
			</div>
			<div class="col-lg-12">
			<div class="row">
			<div class="col-lg-3" id="detalle1">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<div class="col-12 azul t14 left titulo_contenedor">Detalles del usuario</div><br>
						<input type="hidden" id="UsuarioId" value="">
						<div class="col-12 center">
										<div class="circulo_imagen" style="background: white; bottom:0px;" id="imagenusuario"></div>
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
		
			<!-- ************************** SECCION DE ASIGNACION DE PERFILES ************************ -->	
			<!-- ***************************** BLOQUE 3 ************************************ -->
			<div class="padding_p bloque3" style=" width:100%; display:none;"> 
			<div class="row"><button class="btn desp atras" type="button" onclick="atras();"></button></div>
			<div class="row">
			<div class="col-lg-6" style="padding:0;">	
			<div class="row t14 negrita blanco" style="margin:7px 7px;">Perfiles disponibles</div>
			<div class="contenedor_buscador padding_p" style="min-height: 40px;">
			<div class="buscador float_left">
						<input type="text"  placeholder="Buscar" id="buscadorPerfiles" class="form-control buscadorInput t12" onkeyup="ejecutaBuscadorPerfiles()"/>
			</div>
					
			</div>
			
			<div class="contenedor float_left" id="usuarios_cont">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<div id="DivTablaAsignarPerfiles"></div>
					</div>
				</div>
			</div>
			</div>
			
			<div class="col-lg-6" style="padding:0;">	
			<div class="row t14 negrita blanco" style="margin:7px 7px;">Usuarios disponibles</div>
			<div class="contenedor_buscador padding_p" >
			<div class="buscador float_left">
						<input type="text"  placeholder="Buscar" id="buscadorUsuarios" class="form-control buscadorInput t12" onkeyup="ejecutaBuscadorUsuarios()"/>
			</div>
<!-- 					<button class="btn desp" type="button" id="filtrar_por" onclick="">Filtrar por puesto</button> -->
					<button class="btn desp" type="button" id="asignar_2" onclick="actualizaAsignacion()">Asignar</button>
			</div>
			
			<div class="contenedor float_left" id="usuarios_cont">
				<div class="row padding_p">
					<div class="col-lg-12 menupr_estilos fblanco tabla_container">
						<div id="DivTablaAsignarUsuarios"></div>
					</div>
				</div>
			</div>
			</div></div>
			</div>
	</div>

	<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />


<form action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="post">
	<input type="hidden" name="mdId" id="mdId" value=""/>
	<input type="hidden" name="nombreMd" id="nombreMd" value=""/>
	<input type="hidden" name="tipoMd" id="tipoMd" value=""/>
</form>

<form action='mensajes_historial'  id="chatPorMd" method="post">
	<input type="hidden" name="mdIdChat" id="mdIdChat" value=""/>
	<input type="hidden" name="nombreMdChat" id="nombreMdChat" value=""/>
</form>


<form style="display: hidden" action="./excelAsignadasAction" method="POST" id="form">
	<input type="hidden" id="datos" name="datos" value=""/>
	<input type="submit" id="submitBotonAsignadas" style="display:none" />
</form>


<form style="display: hidden" action="./configuracionPerfiles" method="POST" id="confPerfiles"></form>
<form style="display: hidden" action="configuracion" method="POST" id="confUsuario"></form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/tablas.js"></script>
	<script	src="${pageContext.request.contextPath}/js/configuracion_usuario.js"></script>

	
	</body>
</html>