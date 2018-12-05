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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/levantamiento.css" />
	
	
<title>Levantamiento</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>
 
<input type="hidden" id="esPermisoGuardar" value="${usr.perfil.areasxpuesto[0].areaId == 3 && usr.perfil.puestoId == 8}">
<input type="hidden" id="esAutorizaEvalua" value="${usr.perfil.areasxpuesto[0].areaId == 5 && usr.perfil.puestoId == 11}">
 <input type="hidden" id="perfil_usuario" value="${usr.perfil.perfilesxusuario[0].perfilid}">
    <input type="hidden" id="areaUsuario" value="${usr.perfil.areasxpuesto[0].areaId}">
    <input type="hidden" id="puestoUsuario" value="${usr.perfil.puestoId}">
    <input type="hidden" id="usuarioId" value="${usr.perfil.numeroEmpleado}">
    <input type="hidden" id="nombreAreaUsuario" value="${usr.perfil.areasxpuesto[0].areaNom}">
    <input type="hidden" id="nombreCompletoUsuario" value="${usr.perfil.nombre} ${usr.perfil.apellidoP} ${usr.perfil.apellidoM}">

<div class="container-fluid fazul">
	<div class="row padding_p">
	<div class="col-lg-12 titulo blanco t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > VALIDACIÓN Y VoBo A INMUEBLES</div>


			<div class="col-12" style="margin:10 0; padding:0;">
				<div class="col-12 divs_p right">
				<div class="float_left"><button class="btn desp atras" type="button" onclick="history.back()"></button></div>
					
					<div class="col-lg-10 col-10" id="flujo"></div>
					
					<div class="botones">
					<c:if test="${usr.perfil.areasxpuesto[0].areaId == 3 && usr.perfil.puestoId == 8}">
						<button id="btn_guardarLevanta" class="btn desp guardar" type="button" style="display: none;"></button>
					</c:if>
					</div>
				</div>
			</div>


	<!-- COLUMNA 1 -->
	<div class="col-lg-4 col-12">
	  
	  <div class="row">
		<!-- DATOS GENERALES -->
		<div class="col-lg-12 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span style="color:red;" class="titulo_detalle_md_20" id="var_msjMdObra"></span>
			</div>
			
			<div class="col-9 col-lg-10">
			<span class="titulo_detalle_md_20" id="labelNombre"> - </span>
			<br>
			<span id="vlaRegion" class="contenido_cajas_20 "> - </span>
			</div>

			
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelJefe_e">Nombre jefe de Expansión</span>
			<br>
			<span id="valJefe_e" class="contenido_cajas_20 "> - </span>
			</div>
			<div class="col-lg-12 pt-2">
			<span class="titulo_detalle_md_20" id="labelJefe_e">Nombre del propietario</span>
			<br>
			<span id="valPropietario" class="contenido_cajas_20 "> - </span>
			</div>
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelUbicacion">Ubicación</span>
			<br>
			<span id="valUbicacion" class="contenido_cajas_20 "> - </span>
			</div>
			<div class="col-lg-12 pt-2">
			<span class="titulo_detalle_md_20" id="labelNombre">Área a rentar en m2</span>
			<br>
			<input type="text" style="width:100%;" id="var_areaRentam2"  maxlength="5" onkeyup="onlynumber(this);" >
			</div>
			<div class="col-lg-12 pt-2">
			<span class="titulo_detalle_md_20" id="labelNombre">Nombre de jefe de construcción</span>
			<br>
			<input type="text" style="width:100%;" maxlength="100" id="var_nombJefeConst">
			</div>
			<div class="col-lg-12 pt-2 pb-4">
			<span class="titulo_detalle_md_20" id="labelNombre">Fecha</span>
			<br>
			<input type="text" id="var_fdFecha" style="width:100%" class="fechaInicialCalendario" readonly />
			</div>
			</div>
			</div>
			</div>
		</div>
		</div>
	</div>
	
	<div id="div_datosLosas" class="row">
		<!-- LOSAS Y/O TECHUMBRES -->
		<div class="col-lg-12 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelNombre">LOSAS Y/O TECHUMBRES</span>
			</div>
			<div class="col-lg-12 pt-1 pb-1">
			<span class="contenido_cajas_20_azul" id="labelPropietatio">Selecciona los puntos con los que cumpla la MD</span>
			</div>
			
			<div class="col-lg-12 pt-1 pb-2">
			<span id="" class="contenido_cajas_20 ">Tipo de losa/techumbre:</span>
			</div>
			<div id="div_tipolosa" class="col-12 pl-5  pt-1  row">
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoEstructurap" id="tipolosa1" name="tipolosa">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipolosa1">Lámina</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoEstructurap" id="tipolosa2" name="tipolosa">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipolosa2">Concreto</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoEstructurap" id="tipolosa3" name="tipolosa">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipolosa3">Vigueta bovedilla</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoEstructurap" id="tipolosa4" name="tipolosa">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipolosa4">Losa acero</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoEstructurap" id="tipolosa5" name="tipolosa">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipolosa5">Otro</label>
				</div>
				
				<div class="col-4 col-lg-4">
				 
				</div>
			</div>
			
			<div class="col-10 col-lg-11 pt-2 pb-1">
			<span id="" class="contenido_cajas_20 ">¿La losa y/o techumbre del inmueble se encuentra en buen estado?</span><br>
			<span id="" class="contenido_cajas_20 ">(Que no presenten salitre, desprendimientos, fracturas o grietas; en caso de existir indicar cuales presenta)</span>
			</div>
			<div class="col-2 col-lg-1 pt-2 pb-1" id="val_eLosaTech"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			<div class="col-10 col-lg-11 pt-2 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Existe construcción en la parte superior del inmueble?</span>
			</div>
			<div class="col-2 col-lg-1 pt-2 pb-1" id="val_nilSuperior"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>


			<div class="col-10 col-lg-11 pt-2 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Cuenta con columnas centrales?</span>
			</div>
			<div class="col-2 col-lg-1 pt-2 pb-1" id="val_columCentrales"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			
			<div class="col-10 col-lg-11 pt-2 pb-1">
			<span id="" class="contenido_cajas_20 ">¿La estructura que soporta las láminas sirve para cargar plafón ciego de tablaroca?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_soporCarga"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			<div class="col-10 col-lg-11 pt-3 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Se necesita reforzar la estructura que soporta las láminas y/o losa?</span>
			</div>
			<div class="col-2 col-lg-1 pt-3 pb-1" id="var_reforzarEstruc"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
		
			<div class="col-lg-12 pt-1 pb-3">
				<span id="" class="contenido_cajas_20_azul ">Comentarios:</span>  
			  <textarea class="form-control contenido_cajas_20" rows="5" id="var_comentLT"></textarea>
			</div>
			
			</div>
			</div>
			</div>
		</div>
		</div>
	</div>
		

		
	</div>


	<!-- COLUMNA 2 -->
	<div class="col-lg-4 col-12">
	
	  <div id="div_datosFachada" class="row">	
		<!-- DATOS FACHADAS -->
		<div class="col-lg-12 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelNombre">FACHADAS Y EXTERIORES</span>
			</div>
			<div class="col-lg-12 pt-1 pb-1">
			<span class="contenido_cajas_20_azul" id="labelPropietatio">Selecciona los puntos con los que cumpla la MD</span>
			</div>
			
			<div class="col-10 col-lg-11  pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Está en una avenida principal?</span>
			</div>
			<div class="col-2 col-lg-1 pb-1" id="val_avPrincipal"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>

			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Cuenta con cortina de acceso y postigos?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_cortinasyPostigos"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Hay espacio suficiente para la instalación del bastidor con panel de aluminio y el faldón azul?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_espacioBastidor" onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: block;">
				</div>
			</div>
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Se encuentran en buen estado las banquetas perimetrales y de acceso principal?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="var_buenEdoBanquetas"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Están en buenas condiciones los muros de la fachada?</span><br>
			<span id="" class="contenido_cajas_20 ">(Que no presenten salitre, desprendimientos, fracturas o gritas; en caso de existir indicar cuales presenta)</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="var_buenEdoMuros"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>


			<div class="col-lg-12 pt-1 pb-3">
				<span id="" class="contenido_cajas_20_azul ">Comentarios:</span>  
			  <textarea class="form-control contenido_cajas_20" rows="5" id="var_commentFachadas"></textarea>
			</div>
			
			</div>
			</div>
			</div>
		</div>
		</div>
	</div>
	
	<div id="div_datosVarios" class="row">	
		<!-- VARIOS -->
		<div class="col-lg-12 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelNombre">VARIOS</span>
			</div>
			<div class="col-lg-12 pt-1 pb-1">
			<span class="contenido_cajas_20_azul" id="labelPropietatio">Selecciona los puntos con los que cumpla la MD</span>
			</div>
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Cuenta con drenaje el inmueble?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_drenaje"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>

			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Cuenta con registros?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_registros"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Tiene toma de agua independiente y medidor?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_aguaInde"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Tiene contrato y acometida de luz independiente?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_contLuInd"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			

			<div id="div_contLuzIndepe" class="col-12 pl-5 row">
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="1" type="radio"  class="custom-control-input" id="tipoluzInde1" name="tipoluzInde">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoluzInde1">Trifásica</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input" id="tipoluzInde2" name="tipoluzInde">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoluzInde2">Bifásica</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="3" type="radio" class="custom-control-input" id="tipoluzInde3" name="tipoluzInde">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoluzInde3">Monofásica</label>
				</div>
			   </div>
			
			
			<div class="col-12 col-lg-12 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">En caso de hacer demoliciones ¿De qué tipo de materiales se trata?</span>
			</div>
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Tablaroca</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_tablaroca"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			

			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Muros de Block</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_muroBlock"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			

			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Muros de concreto</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_muroConcreto"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			

			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Losas de concreto armado</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_losaConcre"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
		
						
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Laminación</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_lamina"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>

			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Otras</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_vOtras"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>

		

			<div class="col-lg-12 pt-1 pb-3">
				<span id="" class="contenido_cajas_20_azul ">Comentarios:</span>  
			  <textarea class="form-control contenido_cajas_20" rows="5" id="var_VComent"></textarea>
			</div>
			
			</div>
			</div>
			</div>
		</div>
		</div>
	</div>

	</div>	
	
	
	<!-- COLUMNA 3 -->
	<div class="col-lg-4 col-12">
	
	<div  id="div_datosInteriores" class="row">
		<!-- DATOS INTERIORES -->
		<div class="col-lg-12 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelNombre">INTERIORES Y ÁREA PRINCIPAL</span>
			</div>
			<div class="col-lg-12 pt-1 pb-1">
			<span class="contenido_cajas_20_azul" id="labelPropietatio">Selecciona los puntos con los que cumpla la MD</span>
			</div>
			
			<div class="col-lg-12 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Tipo de estructura principal:</span>
			</div>
			<div id="div_tipoEstructura" class="col-12 pl-5 row">
				<div class="col-6 col-lg-6  custom-control custom-radio">
				  <input value="0" type="radio" class="custom-control-input tipoEstructurap" id="tipoEstructurap1" name="tipoEstructurap">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoEstructurap1">Muros de carga</label>
				</div>
				
				<div class="col-6 col-lg-6  custom-control custom-radio">
				  <input value="1" type="radio" class="custom-control-input tipoEstructurap" id="tipoEstructurap2" name="tipoEstructurap">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoEstructurap2">Estructura libre</label>
				</div>
			</div>
			
			<div class="col-lg-12 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">En caso de estructura libre:</span>
			</div>
			<div id="div_enCasoEstructura" class="col-12 pl-5 row">
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="1" type="radio"  class="custom-control-input tipoEstructura" id="tipoEstructura1" name="tipoEstructura">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoEstructura1">Concreto</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoEstructura" id="tipoEstructura2" name="tipoEstructura">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoEstructura2">Acero</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="3" type="radio" class="custom-control-input tipoEstructura" id="tipoEstructura3" name="tipoEstructura">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoEstructura3">Mixta</label>
				</div>
			</div>

			
			<div class="col-lg-12 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Tipo de piso/firme:</span>	
			</div>
			<div id="div_tipoPiso" class="col-12 pl-5 row">
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="1" type="radio"  class="custom-control-input tipoPiso" id="tipoPiso1" name="tipoPiso">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoPiso1">Loseta</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoPiso" id="tipoPiso2" name="tipoPiso">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoPiso2">Terrazo</label>
				</div>
				
				<div class="col-4 col-lg-4  custom-control custom-radio">
				  <input value="3" type="radio" class="custom-control-input tipoPiso" id="tipoPiso3" name="tipoPiso">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoPiso3">Concreto</label>
				</div>
				</div>
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Los pisos del inmueble se encuentran en buen estado?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="val_EstadoPisos"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Las columnas o castillos se encuentran en buen estado ?</span>
			<span id="" class="contenido_cajas_20 ">(Que no presenten salitre, desprendimientos, fracturas o grietas; en caso de existir indicar cuales presenta)</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="var_eColumCast"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			<div class="col-lg-12 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Tipo de muro perimetral:</span>	
			</div>
			<div id="div_tipoMuro" class="col-12 pl-5 row">
			   <div class="col-3 col-lg-3  custom-control custom-radio">
				  <input value="1" type="radio"  class="custom-control-input tipoMuro" id="tipoMuro1" name="tipoMuro">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoMuro1">Block</label>
				</div>
				
				<div class="col-3 col-lg-3  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoMuro" id="tipoMuro2" name="tipoMuro">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoMuro2">Tabique</label>
				</div>
				
				<div class="col-3 col-lg-3  custom-control custom-radio">
				  <input value="3" type="radio" class="custom-control-input tipoMuro" id="tipoMuro3" name="tipoMuro">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoMuro3">Concreto</label>
				</div>
				
				<div class="col-3 col-lg-3  custom-control custom-radio">
				  <input value="3" type="radio" class="custom-control-input tipoMuro" id="tipoMuro4" name="tipoMuro">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoMuro4">No existe</label>
				</div>
			</div>

			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Los muros perimetrales se encuentran en buen estado?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="var_eMuroP"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>

			<div class="col-lg-12 pt-1 pb-3">
				<span id="" class="contenido_cajas_20_azul ">Comentarios:</span>  
			  <textarea class="form-control contenido_cajas_20" rows="5" id="var_IAcomment"></textarea>
			</div>
			
			</div>
			</div>
			</div>
		</div>
		</div>
	</div>

	<div id="div_datosRestricciones" class="row">
		<!-- DATOS RESTRICCIONES -->
		<div class="col-lg-12 col-12">
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelNombre">RESTRICCIONES DEL ARRENDADOR PARA ADECUACIÓN</span>
			</div>
			<div class="col-lg-12 pt-1 pb-1">
			<span class="contenido_cajas_20_azul" id="labelPropietatio">Selecciona los puntos con los que cumpla la MD</span>
			</div>
			
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿El arrendador pone alguna restricción para la adecuación ?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="var_restriccion"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			
			<div class="col-lg-12 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Especifica elementos de recuperación(Descripción detallada)</span>
			</div>
			<div class="col-lg-12 pt-1 pb-1" id="seleccion" onclick="seleccionEvento(this)">
				<textarea class="form-control contenido_cajas_20" rows="5" id="var_elemntRecu"></textarea>
			</div>
			
			
			
 			<div id="div_factible" class="col-12 pl-5 row">
				<div class="col-4  custom-control custom-radio">
				  <input value="1" type="radio" class="custom-control-input factible" id="factible1" name="factible">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="factible1">Factible</label>
				</div>
				
				<div class="col-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input factible" id="factible2" name="factible">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="factible2">Factible con restricciones</label>
				</div>
				
				<div class="col-4  custom-control custom-radio">
				  <input value="3" type="radio" class="custom-control-input factible" id="factible3" name="factible">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="factible3">Rechazo</label>
				</div>
				</div> 

			<div class="col-lg-12 pt-1 pb-3">
				<span id="" class="contenido_cajas_20_azul ">Comentarios:</span>  
			  <textarea class="form-control contenido_cajas_20" rows="5" id="var_restComment"></textarea>
			</div>
			
			</div>
			</div>
			</div>
		</div>
		</div>
	 </div>	

	</div>		



	
	<div class="col-lg-12 col-12"  id ="datosResumenVobo" >  
	
	  <div class="row">
	  
	  				<!-- DATOS CARGA DOCUMENTOS -->
		<div class="col-lg-4 col-12">
		<div class="row divs_p" >
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelNombre">CARGA DE DOCUMENTOS</span>
			</div>
			<div class="col-lg-12 pt-1 pb-1">
			<span class="contenido_cajas_20_azul" id="labelPropietatio">Selecciona los puntos con los que cumpla la MD</span>
			</div>

			<div class="col-3 pt-1 pb-1">
			<div id="dropzone" ondrop="drop(event,this)" nameArc="LEVT" file="div_fileLVANT" fileExt="PDF" name="del formato de validación"  ondragover="allowDrop(event)" class="drop_file">Arrastra formato de validación</div>
			<div id="div_fileLVANT" class="file_unfound fileUpload"></div>
			<input type="file" class="var_pdfUpload"  nameArc="LEVT" file="div_fileLVANT" fileExt="PDF" name="del formato de validación"  accept="application/pdf" style="display: none;">
			</div>
			
			<div class="col-3 pt-1 pb-1">
			<div ondrop="drop(event,this)" nameArc="POLG" file="div_filePOLG" fileExt="PDF" name="del archivo poligonal" ondragover="allowDrop(event)"  class="drop_file">Arrastra archivo poligonal</div>
			<div id="div_filePOLG" class="file_unfound fileUpload"></div>
			<input type="file" class="var_pdfUpload"  nameArc="POLG" file="div_filePOLG" fileExt="PDF" name="del archivo poligonal" accept="application/pdf" style="display: none;">
			</div>
			
			<div class="col-3 pt-1 pb-1">
			<div ondrop="drop(event,this)"  nameArc="ALCN" file="div_fileCEALC" fileExt="PDF" name="de la cédula de alcances" ondragover="allowDrop(event)"  class="drop_file">Arrastra cédula de alcances</div>
			<div id="div_fileCEALC" class="file_unfound fileUpload"></div>
			<input type="file" class="var_pdfUpload" nameArc="ALCN" file="div_fileCEALC" fileExt="PDF" name="de la cédula de alcances" accept="application/pdf" style="display: none;">
			</div>

			<div class="col-3 pt-1 pb-1">
			<div ondrop="drop(event,this)" nameArc="FACHADA" file="div_fileFACHA" fileExt="JPG" name="de la foto de fachada" ondragover="allowDrop(event)"  class="drop_file">Arrastra foto de fachada</div>
			<div id="div_fileFACHA" class="file_unfound fileUpload"></div>
			<input type="file" class="var_pdfUpload" nameArc="FACHADA" file="div_fileFACHA" fileExt="JPG" name="de la foto de fachada"  accept="image/x-png,image/jpg,image/jpeg" style="display: none;">
			</div>
			
			</div>
			</div>
			</div>
		</div>
		</div>
	  
	  
		<!-- DATOS RESUMEN VOBO -->
		<div class="col-lg-4 col-12">
		<div class="row divs_p" >
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelNombre">RESUMEN Y VoBo. DEL INMUEBLE</span>
			</div>
			<div class="col-lg-12 pt-1 pb-1">
			<span class="contenido_cajas_20_azul" id="labelPropietatio">Selecciona los puntos con los que cumpla la MD</span>
			</div>
			
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Se requiere instalación de aire acondicionado?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="var_aairAcon"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			
			<div class="col-lg-12 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿Consideras que el inmueble cuenta con la seguridad suficiente para su adecuación?</span>	
			</div>
			<div id="div_segAdecuac" class="col-12 pl-5 row">
				<div class="col-4  custom-control custom-radio">
				  <input value="1" type="radio" class="custom-control-input segAdecua" id="segAdecua1" name="segAdecua">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="segAdecua1">Alto</label>
				</div>
				
				<div class="col-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoMuro" id="segAdecua2" name="segAdecua">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="segAdecua2">Medio</label>
				</div>
				
				<div class="col-4  custom-control custom-radio">
				  <input value="3" type="radio" class="custom-control-input tipoMuro" id="segAdecua3" name="segAdecua">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="segAdecua3">Bajo</label>
				</div>
			</div>
			
			<div class="col-lg-12 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">Tipo de adecuación:</span>	
			</div>
			<div id="di_tipoAdecua" class="col-12 pl-5 row">
				<div class="col-4  custom-control custom-radio">
				  <input value="1" type="radio" class="custom-control-input tipoAdecua" id="tipoAdecua1" name="tipoAdecua">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoAdecua1">Menor</label>
				</div>
				
				<div class="col-4  custom-control custom-radio">
				  <input value="2" type="radio" class="custom-control-input tipoAdecua" id="tipoAdecua2" name="tipoAdecua">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoAdecua2">Mayor</label>
				</div>
				
				<div class="col-4  custom-control custom-radio">
				  <input value="3" type="radio" class="custom-control-input tipoAdecua" id="tipoAdecua3" name="tipoAdecua">
				  <label class="custom-control-label pt-1 contenido_cajas_20" for="tipoAdecua3">Obra nueva</label>
				</div>
				</div>
			
			
			<div class="col-10 col-lg-11 pt-1 pb-1">
			<span id="" class="contenido_cajas_20 ">¿El arrendador amortiza parte de los costos de la adecuación del inmueble?</span>
			</div>
			<div class="col-2 col-lg-1 pt-1 pb-1" id="var_amort"  onclick="seleccionEvento(this)">
				<div class="caja float_left" style="background:white">
					<img id="" src="img/check.png" style="display: none;">
				</div>
			</div>
			
			<div class="col-lg-12 pt-1 pb-3">
				<span id="" class="contenido_cajas_20_azul ">Comentarios:</span>  
			  <textarea class="form-control contenido_cajas_20" rows="5" id="var_resumComment"></textarea>
			</div>
			
			<div  class="col-12 center pl-5 row">
				<div class="row center" id="botonesAutorizacion">
					<c:if test="${usr.perfil.areasxpuesto[0].areaId == 3 && usr.perfil.puestoId == 8}">
						<div style="width: 118px; display:none;" id="bton_enviarRevision" class="btnAzul">Enviar a revisión</div>
					</c:if>
							
				</div>
			</div>
			
			</div>
			</div>
			</div>
		</div>
		</div>
	
	
	
	 <c:if test="${usr.perfil.areasxpuesto[0].areaId == 5 && usr.perfil.puestoId == 11}">

	  <div id="div_autoriLevant" style="display:none;" class="col-lg-4 col-12">
		<!-- AUTORIZACION -->
		<div class="row divs_p">
			<div class="col-lg-12 menupr_estilos fblanco altura1">
			<div class="col-12 titulo_seccion">	
			<div class="row pt-3">
			<div class="col-lg-12">
			<span class="titulo_detalle_md_20" id="labelNombre">AUTORIZACIÓN</span>
			</div>
			<div class="col-lg-12 center pt-4 pb-1">
			<span class="titulo_detalle_md_20" id="labelPropietatio">¿Deseas autorizar esta MD?</span>
			</div>
			

			<div  class="col-12 center pl-5 row">
				<div class="row center" id="botonesAutorizacion">
							<div id="rechazaMD" class="btnGris">No</div>
							<div id="autorizaMD" class="btnAzul">Si</div>
						</div>
			</div>
			
			

			
			</div>
			</div>
		</div>
		</div>
	  </div>	
		
	   </c:if>
		  </div>
		
	  </div>		
		
		<form style="display:none;" action='mensajes_historial'  id="chatPorMd" method="post">
			<s:textfield id="idMd" name="idMd" label="" cssStyle="display: none"></s:textfield>
			<input type="hidden" id="usuarioLogin" value="${usr.perfil.numeroEmpleado}" />
		</form>

		</div>
</div>

<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />
<jsp:include page="/jsp/generic/modalAutorizacion.jsp" />



<form action='memoria_detalle'  id="detalleMemoriaAsignadaAction" method="post">
	<input type="hidden" name="mdId" id="mdId" value=""/>
	<input type="hidden" name="mdId" id="mdIdAutorizacion" value=""/>
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

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
		<script	src="${pageContext.request.contextPath}/js/dropzone/dropzone.js"></script>
	<script	src="${pageContext.request.contextPath}/js/dropzone/dateFormat.js"></script>
	<script	src="${pageContext.request.contextPath}/js/autorizaciones.js"></script>
	<script	src="${pageContext.request.contextPath}/js/levantamiento.js"></script>

	
	</body>
</html>