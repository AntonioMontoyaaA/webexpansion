<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!-- &emsp;  &nbsp;-->
<html>
<head>
<link rel="shortcut icon" href="img/favicon.png" />
<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mapa.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/localizador.css" />
	
<title>Asignadas</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>
<div class="container-fluid">
	<div class="row">
		<div class="col-lg-12 titulo">Dashboard Expansión > Localizador</div>
	
		<div class="contentLocalizador" id="contentDivLocalizador">
			<!-- ALTA RADIO -->
			<div class="content" id="contentAlta">
				<span id="altaRadio" class="negrita t14 titleDivContent">Dar de alta radio</span><br>
				
				<div class="contentDetalle hidden">
					<span class="negrita t14 spanText">Descargar plantilla</span>
					<img id="download_plantillaRadios" src="img/iconos_DOWNLOAD.png" style="width: 29px;">
					<br>
					
						<span class="negrita t14 spanText">1) Carga el archivo excel con los radios</span><br>
						<span class="negrita t14 spanText">2) Un click para ver la información del radio</span><br>
						<span class="negrita t14 spanText">3) Doble click para eliminar un radio</span><br>
						<span class="negrita t14 spanText">4) Guarda</span>
						<br>
					     
					    <div id="drop">Arrastra el archivo</div>
		
						<input type="file" name="xlfile" id="xlf" /><br>
						<br> 
						
						 <button type="button" id="btonGuardarRadios" class="btn back_5 btn_aceptar"  data-target="#myModal">
							Guardar
					   </button>
					   <button type="button" id="btonCancelarRadios" class="btn btn-demo color_5 btn_cancelar"  data-target="#myModal">
							Limpiar
						</button>
				</div>
			</div>
			
			<!-- ASIGNAR RADIO -->
			<div class="bordeDiv" id=""> </div>
			<div class="content" id="contentAsignar">
			 	<span id="asignarRadio" class="negrita t14 titleDivContent">Asignar radio</span>
			 	<br>
			 	
			 	<div class="contentDetalle  hidden">
					<span class="negrita t14 spanText">1) Seleccionar jefe. </span><br>
					
					<div id="comboMotivos" style="padding-bottom: 3px; padding-top: 3px;">
				      	<select id="select_employee" class="motivoRechazo">
				      		<option value="0">Seleccionar jefe</option>
				      	</select>
				     </div>
					
					<span class="negrita t14 spanText">2) Click para seleccionar el radio</span><br>
					<span class="negrita t14 spanText">3) Guarda</span>
					<br>
					<br>
					
					 <button type="button" id="btnAsignarRadio" class="btn back_5 btn_aceptar"  data-target="#myModal">
						Asignar Radio
				   </button>
				   <button type="button" id="btnRemovelAsign" class="btn btn-demo color_5 btn_cancelar"  data-target="#myModal">
	 					Cancelar
	 				</button> 
				</div>
			</div>
			
			
			<!-- LOCALIZACION EN TIMEPO REAL -->
			<div class="bordeDiv" id=""> </div>
			<div class="content" id="contentAsignar">
			 	<span id="localizaTime" class="negrita t14 titleDivContent">Localización en tiempo real</span>
			 	
			 	<div class="contentDetalle  hidden">
					
					<input type="text" style="margin-bottom: 10px;" class="fechaInicialCalendario" readonly id="datepicker1"/>
					<br>
					<div id="comboMotivos" style="padding-bottom: 15px;">
				      	<select style="width: 251px;" id="select_employeeLocalizar" class="motivoRechazo">
				      		<option value="0">Seleccionar jefe</option>
				      	</select>
				     </div>
					
					<input id="checkTodaRuta" type="checkbox" style="margin-bottom: 10px;" class="spanText" name="ruta" value="1"> 
					<span class="negrita t14 spanText"> Ver toda la ruta</span>
					<br>					

					<button type="button" style=" margin-left: 93px;" id="btnUbicacionTR" class="btn back_5 btn_aceptar"  data-target="#myModal">
						Consultar
				   </button>
					

				</div>
			</div>
			
			<!-- VER  MIS MD -->
			<div class="bordeDiv" id=""> </div>
			<div class="content" id="contentAsignar">
			 	<span id="verMds" class="negrita t14 titleDivContent">Ver mis MD´s</span>
			 	
			 	<div class="contentDetalle  hidden">
					
					<div id="comboMotivos" style="padding-bottom: 15px;">
				      	<select style="width: 251px;" id="select_employeeMDGere" class="motivoRechazo">
				      		<option value="0">Seleccionar gerente</option>
				      	</select>
				     </div>
				     
				     <div id="comboMotivos" style="padding-bottom: 15px;">
				      	<select style="width: 251px;" id="select_employeeMDJefes" class="motivoRechazo">
				      		<option value="0">Sin jefes</option>
				      	</select>
				     </div>
				  
					 <button type="button" style="margin-left: 93px;" id="btnVerMds" class="btn back_5 btn_aceptar"  data-target="#myModal">
						Consultar
				   </button>

				</div>
			</div>
			
			
			<!-- VER  RADIOS POR ESTATUS -->
			<div class="bordeDiv" id=""> </div>
			<div class="content" id="contentAsignar">
			 	<span id="verRadiosEstatus" class="negrita t14 titleDivContent">Consulta radios</span>
			 	<br>
			 	
			 	<div class="contentDetalle  hidden">
					<span class="negrita t14">Ver radios :</span><br>
					
					<div class="contentDetalle" style="float: left; padding-right: 2%;">
						<input id="check_nuevos" type="checkbox" style="margin-bottom: 10px;" name="nuevo"    class="spanText" value="1" checked> 
						<span id="spand_nuevo" class="negrita t14 spanText_" >Nuevos</span>  <br>
						<input id="check_proceso" type="checkbox" style="margin-bottom: 10px;" name="enproceso"   class="spanText" value="3" checked>
						<span id="spand_proceso" class="negrita t14 spanText_ " >En proceso</span> <br>
						<input id="check_cancelado" type="checkbox" style="margin-bottom: 10px;" name="cancelado" class="spanText" value="5" checked> 
						<span id="spand_cancelado" class=" negrita t14 spanText_" >Cancelado</span>  <br>
					</div>
					<div class="contentDetalle" style="padding-left: 2%;">
						<input id="check_asignados" type="checkbox" style="margin-bottom: 10px;" name="asignado" class="spanText" value="2" checked> 
						<span id="spand_asignado" class="negrita t14 spanText_" >Asignados</span> <br>						  
						<input id="check_concluido" type="checkbox" style="margin-bottom: 10px;" name="concluido" class="spanText" value="4" checked> 
						<span id="spand_concluido" class="negrita t14 spanText_ " >Concluido</span><br> 
						<input id="check_MdsRadios" type="checkbox" style="margin-bottom: 10px;" name="conmds" class="spanText" value="1">  		 
						<span id="spand_mds" class=" negrita t14 spanText_" >Con MD's</span> <br>
					</div>
					
				</div>
			</div>
		</div>
	</div> 


	<!-- POP UPS INFO RADIO  --->
	<div class="contentPopUpInfo hidden" id="contentDivLocalizador" >
			<!-- TITULO INFO -->
			<div class="content divTituloFixed" id="contentAlta">
				<span id="infoTituloPopUp" class="t14 titulo_info left_float"></span><h6 id="bton_infoClose" class="subtitleInfo infoValue btn_infoClose" >x</h6>
			</div>	
				<br>
				<br>
				<div id="divContentInfoRadio" class="contentDetalle">
					<h6 class="subtitleInfo left_float" >Coordenadas:</h6>  <h6 id="infoCoordenadas" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Estrategia: </h6>  <h6 id="infoEstrategias" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Estatus:    </h6> 	<h6 id="infoEstatus" class="subtitleInfo infoValue" >0</h6>
				</div>
			
			<!-- INFO SOCIO DEMOGRAFICA -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Informacón Socio demográfica</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	  <div class="contentDetalle">
				 	<h6 class="subtitleInfo left_float" >Población total</h6> <h6 id="infoTotalPoblacion" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >PEA</h6>             <h6 id="infoPEA" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Viviendas</h6>       <h6 id="infoViviendas" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >NSE</h6>             <h6 id="infoNSE" class="subtitleInfo infoValue" >0</h6>
			  	</div>
			</div>
			
			
			
			<!-- GENERADORES -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Generadores</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
				 	<h6 class="subtitleInfo left_float" >Mercados</h6>   <h6 id="infoMercados" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Escuelas</h6>   <h6 id="infoEscuelas" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Hospitales</h6> <h6 id="infoHospitales" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Templos</h6>    <h6 id="infoTemplos" class="subtitleInfo infoValue" >0</h6>
				</div>
			</div>
			
			<!-- UBICACION -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Ubicación</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
				 	<h6 class="subtitleInfo left_float" >Calle        </h6>  <h6 id="infoCalle_p" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Entre calle 1</h6>  <h6 id="infoCalle_1" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Entre calle 2</h6>  <h6 id="infoCalle_2" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Colonia      </h6>  <h6 id="infoColonia" class="subtitleInfo infoValue" >0</h6>
			 	</div>
			</div>
			
			<!-- CEDIS -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">CEDIS</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
				 	<h6 class="subtitleInfo left_float" >Distancia</h6>  <h6 id="infoDistancia" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Tipo</h6>       <h6 id="infoTipo" class="subtitleInfo infoValue" >0</h6>
					<h6 class="subtitleInfo left_float" >Tiempo</h6>     <h6 id="infoTiempo" class="subtitleInfo infoValue" >0</h6>
			 	</div>
			</div>			
			
	</div>
		
		
	<!-- POP UPS INFO MD'S  --->
	<div class="contentPopUpInfoMD hidden" id="contentDivLocalizador" >
			<!-- TITULO MD -->
			<div class="content divTituloFixed" id="contentAlta">
				<span id="infoMD" class="t14 titulo_info left_float"></span><h6 id="bton_infoClose" class="subtitleInfo infoValue btn_infoClose" >x</h6>
			</div>		
		<br><br>
		<br>
		<!-- CEDIS -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Coordenadas</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
					<h6 id="infoMDCoordenadas" class="subtitleInfo " >0</h6>
			 	</div>
			</div>	
			
			<!-- DIRECCION -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Dirección</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
					<h6 id="infoDireccion" class="subtitleInfo " >0</h6>
			 	</div>
			</div>	
			
			<!-- PROPIETARIO -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Propietario</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
					<h6 id="infoPropietario" class="subtitleInfo " >0</h6>
			 	</div>
			</div>	
			
			<!-- JEFE -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Jefe de expansión</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
					<h6 id="infoNombreJefe" class="subtitleInfo " >0</h6>
					<br>
					
					<button type="button" id="verDetalleMD"  class="btonCenterPosition btn back_btonOrange btn_aceptar">Ver detalle MD </button>
			 	</div>
			</div>	
	</div>

	
</div>

<div class="col-12" id="map"></div>

	<form target="_blank" action="memoria_detalle" id="detalleMemoriaAsignadaAction" method="post">
		<input type="hidden" name="mdId" id="mdId" value="">
		<input type="hidden" name="nombreMd" id="nombreMd" value="">
		<input type="hidden" name="tipoMd" id="tipoMd" value="">
	</form>
	
	<jsp:include page="/jsp/generic/loading.jsp" />
	<jsp:include page="/jsp/generic/mensajes.jsp" />

	<!-- load xslx -->

	
	
	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>	
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script type="text/javascript">cargaLoading();</script>

	<script	src="${pageContext.request.contextPath}/js/xslx/shim.js"></script>
	<script	src="${pageContext.request.contextPath}/js/xslx/jszip.js"></script>
	<script	src="${pageContext.request.contextPath}/js/xslx/xlsx.js"></script>
	<script	src="${pageContext.request.contextPath}/js/localizador.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.fileDownload.js" type="text/javascript"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuFdkYUDivTv_TrR4RZMWP1NYCA0MK2YM&callback=initMap">
	    </script>
	
	</body>
</html>