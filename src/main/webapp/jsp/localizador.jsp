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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/utiles/chosen.min.css" />
	
<title>Localizador</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>
<div class="container-fluid">
	<div class="row">
		<div class="col-lg-12 blanco  titulo">Dashboard Expansión > Localizador</div>
	
		<div class="contentLocalizador" id="contentDivLocalizador">
			<!-- ALTA RADIO -->
			<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.12,1']}">
				<div class="content" id="contentAlta">
					<span id="altaRadio" class="negrita t14 titleDivContent">Carga de radios</span><br>
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
			
							<input type="file" style="color: aliceblue;" name="xlfile" id="xlf" /><br>
							<br> 
							
							 <button type="button" id="btonGuardarRadios" class="btn back_5 btn_aceptar"  data-target="#myModal">
								Guardar
						   </button>
						   <button type="button" id="btonCancelarRadios" class="btn btn-demo color_5 btn_cancelar"  data-target="#myModal">
								Limpiar
							</button>
					</div>
				</div>
			</c:if>
			
			
			
			<!-- LOCALIZACION EN TIMEPO REAL -->
			<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.12,3']}">

			 </c:if>
			
			<!-- VER  MIS MD -->
			<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.12,4']}">
			<div class="bordeDiv" id=""> </div>
			<div class="content" id="contentAsignar">
			 	<span id="verMds" class="negrita t14 titleDivContent">Ver mis MD´s</span>
			 	
			 	<div class="contentDetalle  hidden">
					
					<div id="comboMotivos" style="padding-bottom: 15px;">
				      	<select style="width: 251px;" id="select_employeeMDGere" class="chosen-select">
				      		<option value="0">Seleccionar gerente</option>
				      	</select>
				     </div>
				     
				     <div id="comboMotivos" style="padding-bottom: 15px;">
				      	<select style="width: 251px;" id="select_employeeMDJefes"  class="chosen-select">
				      		<option value="0">Sin jefes</option>
				      	</select>
				     </div>
				  
					 <button type="button" style="margin-left: 93px;" id="btnVerMds" class="btn back_5 btn_aceptar"  data-target="#myModal">
						Consultar
				   </button>

				</div>
			</div>
			 </c:if>
			
			
			<!-- VER  RADIOS POR ESTATUS -->
			<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.12,5']}">
			<div class="bordeDiv" id=""> </div>
			<div class="content" id="contentAsignar">
			 	<span id="verRadiosEstatus" class="negrita t14 titleDivContent">Consulta radios</span>
			 	
			 	<div class="contentDetalle  hidden">

					<input type="search" style="margin-bottom: 5px;" class="input-transparent"  id="anilloNombreCons"  list="listaSitios" placeholder="Nombre del radio"  required/>
					<datalist id="listaSitios">
					</datalist>
					
					
					
					
				   <div id="comboMotivos" style="padding-bottom: 3px; padding-top: 3px;">
				     <select id="comboBox_estadoCons" data-placeholder="Seleccionar estado" class="chosen-select"  style="width: 100%;"  tabindex="2">
				     </select>
				   </div>
				   
				   <div class="row p-0">
					   <div class="col-4 pr-0 ">
					    	<span class="text-etiqueta"> Fecha inicio :</span>
					   </div>
					   <div class="col-8 p-0">
					   		<input type="text" style="margin-bottom: 2px; width:90%;" class="fechaInicialCalendario" readonly id="datepicker1"/>
					   </div>
					   <div class="col-4 pr-0">
					   		<span class="text-etiqueta">Fecha fin :</span>
					   </div>
					   <div class="col-8 p-0">
					   		<input type="text" style="margin-bottom: 2px;  margin-top: 2px; width:90%;" class="fechaInicialCalendario" readonly id="datepicker3"/>
					   </div>
				    </div>
				  
				   
					
				    
				   
					<div class="contentDetalle" style=" padding: 0px;">
						<input id="check_nuevos" type="checkbox" style="margin-bottom: 2px;" name="nuevo"    class="spanText" value="1" checked> 
						<span id="spand_nuevo" class="negrita t14 spanText_" >Nuevos <span id="estatusN"></span></span>  <br>
						<input id="check_proceso" type="checkbox" style="margin-bottom: 2px;" name="enproceso"   class="spanText" value="3" checked>
						<span id="spand_proceso" class="negrita t14 spanText_ " >En proceso <span id="estatusP"></span></span> <br>
						<input id="check_cancelado" type="checkbox" style="margin-bottom: 2px;" name="cancelado" class="spanText" value="5" checked> 
						<span id="spand_cancelado" class=" negrita t14 spanText_" >Cancelado <span id="estatusC"></span></span>  <br>
<!-- 					</div> -->
<!-- 					<div class="contentDetalle" style="padding-left: 2%;"> -->
						<input id="check_asignados" type="checkbox" style="margin-bottom: 2px;" name="asignado" class="spanText" value="2" checked> 
						<span id="spand_asignado" class="negrita t14 spanText_" >Asignados <span id="estatusA"></span></span> <br>						  
						<input id="check_concluido" type="checkbox" style="margin-bottom: 2px;" name="concluido" class="spanText" value="4" checked> 
						<span id="spand_concluido" class="negrita t14 spanText_ " >Sin sitios <span id="estatusS"></span></span><br> 
						<input id="check_MdsRadios" type="checkbox" style="margin-bottom: 2px;" name="conmds" class="spanText" value="1">  		 
						<span id="spand_mds" class=" negrita t14 spanText_" >Con MD's <span id="estatusM"></span></span> <br>
					</div>
					
					
					<button type="button" id="btnConsultaAnillosConsulta" style="margin-left: 25%; margin-top: 5px;" class="btn back_5 btn_aceptar"  data-target="#myModal">
						Consultar radios
				   </button>

				   
				<!-- ASIGNAR RADIO -->
				<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.12,2']}">
						<div  class="hidden pt-2" id="div-asignacion-anillo">
					   	<span id="div-asignar-anillo-expande" class="negrita t14 pl-0 titleDivContent">Asignar radios </span>  <br>
	
					  	   
						   <span class="negrita t14 spanText">1) Seleccionar jefe. </span><br>
							
							<div id="comboMotivos" style="padding-bottom: 3px; padding-top: 3px;">
						      	<select id="select_employee"  data-placeholder="Seleccionar un jefe" class="chosen-select"  tabindex="2">
						      		<option value="0">Seleccionar jefe</option>
						      	</select>
						    </div>
						    
<!-- 							<span class="negrita t14 spanText">3) Click para seleccionar el radio</span><br> -->
							<span class="negrita t14 spanText">2) Click en  Asignar radio</span>
							<br>
							<br>
							
							 <button type="button" id="btnAsignarRadio" class="btn back_5 btn_aceptar hidden"  data-target="#myModal">
								Asignar radio
						   </button>
						   <button type="button" id="btnRemovelAsign" class="btn btn-demo color_5 btn_cancelar hidden"  data-target="#myModal">
			 					Cancelar
			 				</button>  
					   </div>
				 </c:if>
				  
				</div>
			</div>
		  </c:if>
		</div>
	</div> 


	<!-- MODAL VISUALIZAR INFORMACION DEL SITIO  --->
	<div class=" col-lg-4 offset-sm-8 tamanioContenedormodal" id="contentDivLocalizador" >
		<div class="hidden contentPopUpInfo col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-11 offset-lg-1 col-xl-11 offset-xl-1" id="" >
		
			<!-- titulo sitio -->	
			<div class="row m-0" style="border-bottom: 1px solid #686868;" >
				<div class="col-11 pt-1 pb-1 text-center">
					<span id="infoTituloPopUp" class="t14 titulo_info"></span>
				</div>
				<div class="col-1">
				<img id="bton_infoClose" class="infoValue btn_infoClose" class="img-tamanio-info-demografica" id=""   src="img/localizador/close-icon.png"> 
					
				</div>
			</div>
			
			<!-- INFORMACION DEL SITIO -->	
			<div class="row pb-1">
				<div class="col-12 pl-3 pr-0 etiqueta-white-l">
					<div class="row pr-0 container"  >
					<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.12,6']}">
						<div id="tipo-solicitud-autorizacion" class="col-4 pb-1 pt-2  pl-0 pr-0  etiqueta-white-l solicitud-rechazo-anillo">
							-
						</div>
						<div class="col-4 pb-1 etiqueta-white-l solicitud-rechazo-anillo">
							<button type="button" id="btonRechazarAnillo"  class=" btn bton-quitar-asignacion btn_aceptar float-right">Rechazar </button>	
						</div>
						<div class="col-4 etiqueta-white-l solicitud-rechazo-anillo">	
							<button type="button" id="btonDenegarRechazo"  class=" btn bton-color-azul btn_aceptar float-right">Denegar rechazo </button>
						</div>
					</c:if>
					
					<div class="col-2 etiqueta-white-l"></div>
									   <!-- ASIGNAR RADIO -->
					<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.12,2']}">
							<div class="col-12 pl-0 pt-2" id="divContentInfoRadio"></div>
					 </c:if>
					
					<div class="col-5 etiqueta-white-l">	
					</div>
					<div class="col-3 etiqueta-white-l">	
						<ul>
						  <li>
						    <input type="radio" id="option-vista-a" name="selector" checked>
						    <label for="option-vista-a"></label>
						    <div class="check"></div>
						  </li>
					      <li>
						    <input type="radio" id="option-vista-b" name="selector">
						    <label for="option-vista-b"></label>
						    <div class="check"><div class="inside"></div></div>
						  </li>
						</ul>
					</div>
					<div class="col-4 etiqueta-white-l">
					</div>
				</div>
			</div>
				
				<!-- DATOS DE SITIO 1 -->
				<div id="seccionDatos1" class="row col-12">

					<div class="col-4 etiqueta-white-l text-center"> Radio: <span class="infoRadio"  > - </span></div>
					<div class="col-5 p-0 etiqueta-white-l text-center"> Estatus: <span class="infoEstatus"  > - </span></div>
					<div class="col-3 p-0 etiqueta-white-l"> No. visitas: <span id="infoNoVisitas"  > 0 </span></div>
					
				</div>
				<!-- FIN datos sitio  -->

				
				<!-- DATOS DE SITIO 2 -->
				<div id="seccionDatos2" class="row col-12 p-0 pl-3">
					<div class="etiqueta-size-colum etiqueta-white-l"> Coordenadas: </div>
					<div class="col-9 etiqueta-white-l">
						<span id="infoCoordenadas"  > - </span>
					</div>
					
<!-- 					<div class="etiqueta-size-colum etiqueta-white-l"> Radio: </div> -->
<!-- 					<div class="col-9 etiqueta-white-l"> -->
<!-- 						<span class="infoRadio"  > - </span> -->
<!-- 					</div> -->
					
					<div class="etiqueta-size-colum etiqueta-white-l"> URL: </div>
					<div id="infoUrl"  class="col-9 etiqueta-white-l">
						
					</div>
					
<!-- 					<div class="etiqueta-size-colum etiqueta-white-l"> Estatus: </div> -->
<!-- 					<div class="col-9 etiqueta-white-l"> -->
<!-- 							<span class="infoEstatus"  > - </span> -->
<!-- 					</div> -->
					
					<div class="etiqueta-size-colum etiqueta-white-l"> Calle principal: </div>
					<div class="col-9 etiqueta-white-l">
							<span id="infoCalle"  > - </span>
					</div>
					
					<div class="etiqueta-size-colum etiqueta-white-l"> Entre calle 1: </div>
					<div class="col-9 etiqueta-white-l">
						<span id="infoCalle1"  > - </span>
					</div>
					
					<div class="etiqueta-size-colum etiqueta-white-l"> Entre calle 2: </div>
					<div class="col-9 etiqueta-white-l">
						<span id="infoCalle2"  > - </span>
					</div>
					
					<div class="etiqueta-size-colum etiqueta-white-l"> Colonia: </div>
					<div class="col-9 etiqueta-white-l">
						<span id="infoColonia"  > - </span>
					</div>
					
					<div class="etiqueta-size-colum etiqueta-white-l"> Municipio: </div>
					<div class="col-9 etiqueta-white-l">
						<span id="infoMunicipio"  > - </span>
					</div>
					
<!-- 					<div class="etiqueta-size-colum etiqueta-white-l"> No. visitas: </div> -->
<!-- 					<div class="col-9 etiqueta-white-l"> -->
<!-- 						<span id="infoNoVisitas"  > - </span> -->
<!-- 					</div> -->
				</div>
				<!-- FIN datos sitio  -->
					
			</div>
			
			
			<!-- Contenedor Scroll  -->
<!-- 			<div class="content-section-overflow pt-0 pb-0 pr-0 pl-0 row"> -->
			<div id="contenido-vista-a" class="row seccionScrollContent ">
				<div class="content-section-overflow pt-0 pb-0 pr-0 pl-0 row">
					<!-- INFORMACION SOCIO DEMOGRAFICA-->	
					<div class="col-12" style="height: 12px;"><span class="negrita t14 subTitleInfo">Información Socio demográfica</span></div>
				
					<div class="col-12 etiqueta-white-l"> Edad predominante </div>
					<div class="col-2 etiqueta-white-l text-center"> <span id="edadMenor1"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center"> <span id="edadMenor2"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center"> <span id="edadMenor3"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center"> <span id="edadMenor4"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center"> <span id="edadMenor5"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center"> <span id="edadMenor6"  > - </span> </div>
					
					<div class="col-2 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id=""   src="img/localizador/icon-menor-18.png"> </div>
					<div class="col-2 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id=""   src="img/localizador/icon-mayor-20.png"> </div>
					<div class="col-2 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id=""   src="img/localizador/icon-31-40.png"> </div>
					<div class="col-2 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id=""   src="img/localizador/icon-41-50.png"> </div>
					<div class="col-2 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id=""   src="img/localizador/icon-51-60.png"> </div>
					<div class="col-2 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id=""   src="img/localizador/icon-mayor-60.png"> </div>
					
					<div class="col-2 etiqueta-white-l text-center">  < - 20 </div>
					<div class="col-2 etiqueta-white-l text-center"> 21 - 30 </div>
					<div class="col-2 etiqueta-white-l text-center"> 31 - 40  </div>
					<div class="col-2 etiqueta-white-l text-center"> 41 - 50 </div>
					<div class="col-2 etiqueta-white-l text-center"> 51 - 60 </div>
					<div class="col-2 etiqueta-white-l text-center"> 61 - <  </div>

					<div class="col-6 etiqueta-white-l"> Población total: <span id="poblacion"  > - </span></div>
<!-- 					<div class="col-8 etiqueta-white-l"> -->
							
<!-- 					</div> -->
					
					<div class="col-6 etiqueta-white-l"> Población flotante: <span id="poblacionFlot"  > - </span></div>
<!-- 					<div class="col-8 etiqueta-white-l"> -->
						
<!-- 					</div> -->
					
					<div class="col-6 etiqueta-white-l"> PEA: <span id="pea"  > - </span></div>
<!-- 					<div class="col-8 etiqueta-white-l"> -->
						
<!-- 					</div> -->
					
					<div class="col-6 etiqueta-white-l"> Hogares: <span id="hogares"  > - </span></div>
<!-- 					<div class="col-8 etiqueta-white-l"> -->
						
<!-- 					</div>				 -->
	
				
					<!-- GENERADORES -->	
					<div class="col-12 pt-1"><span class="negrita t14 subTitleInfo">Generadores <input id="check-tdos-gen" type="checkbox" style="margin-bottom: 5px;" name="nuevo"    class="spanText" value="1" checked></span> 
<%-- 						<c:if test="${permisos['PRIVILEGIO.SUBMENU.VOKSE.12,7']}"> --%>
							<button type="button" id="btonRecalculaGeneradores"  class=" btn bton-color-azul btn_aceptar float-right">Recalcular </button>
<%-- 					 	</c:if> --%>
					</div>
				
					<div class="col-20-generadores p-0 etiqueta-white-l text-center"> Mercados <input id="check-mercados" type="checkbox" style="margin-bottom: 5px;" name="nuevo"    class="spanText" value="1" checked> </div>
					<div class="col-20-generadores p-0 etiqueta-white-l text-center"> Escuelas <input id="check-escuela" type="checkbox" style="margin-bottom: 5px;" name="nuevo"    class="spanText" value="1" checked> </div>
					<div class="col-20-generadores p-0 etiqueta-white-l text-center"> Hospitales <input id="check-hospital" type="checkbox" style="margin-bottom: 5px;" name="nuevo"    class="spanText" value="1" checked> </div>
					<div class="col-20-generadores p-0 etiqueta-white-l text-center"> Templos <input id="check-templo" type="checkbox" style="margin-bottom: 5px;" name="nuevo"    class="spanText" value="1" checked> </div>
					<div class="col-20-generadores p-0 etiqueta-white-l text-center"> O. gobierno <input id="check-ofGob" type="checkbox" style="margin-bottom: 5px;" name="nuevo"    class="spanText" value="1" checked> </div>
					
					
					<div class="col-20-generadores etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id="bell_rojo" style="margin-bottom:0px;" src="img/localizador/icon-mercado.png"> </div>
					<div class="col-20-generadores etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id="bell_rojo" style="margin-bottom:0px;" src="img/localizador/icon-escuela.png"> </div>
					<div class="col-20-generadores etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id="bell_rojo" style="margin-bottom:0px;" src="img/localizador/icon-hospital.png"> </div>
					<div class="col-20-generadores etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id="bell_rojo" style="margin-bottom:0px;" src="img/localizador/icon-templo.png"> </div>
					<div class="col-20-generadores etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id="bell_rojo" style="margin-bottom:0px;" src="img/localizador/icon-ofgobierno.png"> </div>
					
					<div class="col-20-generadores etiqueta-white-l text-center"> <span id="mercados"  > - </span></div> 
					<div class="col-20-generadores etiqueta-white-l text-center"> <span id="escuelas"  > - </span> </div>
					<div class="col-20-generadores etiqueta-white-l text-center"> <span id="hopitales"  > - </span> </div>
					<div class="col-20-generadores etiqueta-white-l text-center"> <span id="templos"  > - </span> </div>
					<div class="col-20-generadores etiqueta-white-l text-center"> <span id="ofiGob"  > - </span> </div>
						
					<!-- COMPETENCIAS -->	
					<div class="col-12 pt-0 pb-0" style="height: 18px;"><span class="negrita t14 subTitleInfo">Competencias</span></div>
					<div class="col-4 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id="bell_rojo"   src="img/localizador/icon-compe-3b.png"> </div>
					<div class="col-4 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id="bell_rojo"  src="img/localizador/icon-compe-bod-expres.png"> </div>
					<div class="col-4 etiqueta-white-l text-center"> <img class="img-tamanio-info-demografica" id="bell_rojo"   src="img/localizador/icon-compe-bod.png"> </div>
					<div class="col-4 etiqueta-white-l text-center"> <span id="bbb"  > - </span> </div>
					<div class="col-4 etiqueta-white-l text-center"> <span id="bae"  > - </span> </div>
					<div class="col-4 etiqueta-white-l text-center"> <span id="miba"  > - </span> </div>
	
					<!-- UNIDADES -->	
					<div class="col-12 pt-0 pb-0 div-unidades-economicas" style="height: 12px;"><span class="negrita t14 subTitleInfo">Unidades Económicas <input id="check-tdos-ue" type="checkbox" style="margin-bottom: 5px;" name="nuevo"    class="spanText" value="1" checked></span></div>
					
					<div class="col-2 p-0 etiqueta-white-l text-center div-unidades-economicas">Panadería <br><input id="check-panaderia" type="checkbox"   name="nuevo"    class="spanText" value="1" > </div>
					<div class="col-2 p-0 etiqueta-white-l text-center div-unidades-economicas">Tortillería <br><input id="check-tortilleria" type="checkbox"   name="nuevo"    class="spanText" value="1" > </div>
					<div class="col-2 p-0 etiqueta-white-l text-center div-unidades-economicas">Abarrotes <br><input id="check-abarrotes" type="checkbox"  name="nuevo"    class="spanText" value="1" > </div>
					<div class="col-2 p-0 etiqueta-white-l text-center div-unidades-economicas">Carnicería <br><input id="check-carniceria" type="checkbox"  name="nuevo"    class="spanText" value="1" > </div>
					<div class="col-2 p-0 etiqueta-white-l text-center div-unidades-economicas">Recaudería <br><input id="check-recauderia" type="checkbox"   name="nuevo"    class="spanText" value="1" > </div>
					<div class="col-2 p-0 etiqueta-white-l text-center div-unidades-economicas">Pollería <br><input id="check-polleria" type="checkbox"   name="nuevo"    class="spanText" value="1" > </div>
					
					
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <img class="img-tamanio-info-demografica" id="bell_rojo" src="img/localizador/icon-panaderia.png"> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <img class="img-tamanio-info-demografica" id="bell_rojo"  src="img/localizador/icon-tortilleria.png"> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <img class="img-tamanio-info-demografica" id="bell_rojo" src="img/localizador/icon-abarrotes.png"> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <img class="img-tamanio-info-demografica" id="bell_rojo" src="img/localizador/icon-carniceria.png"> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <img class="img-tamanio-info-demografica" id="bell_rojo" src="img/localizador/icon-recauderia.png"> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <img class="img-tamanio-info-demografica" id="bell_rojo" src="img/localizador/icon-polleria.png"> </div>
					
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <span id="t-PANADERIA"  > - </span></div> 
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <span id="t-TORTILLERIA"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <span id="t-ABARROTES"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <span id="t-CARNICERIA"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <span id="t-RECAUDERIAS"  > - </span> </div>
					<div class="col-2 etiqueta-white-l text-center div-unidades-economicas"> <span id="t-POLLERIA"  > - </span> </div>
					

				</div>
				</div>
				
				<div id="contenido-vista-b" class="row  seccionScrollContent">
					<div class="content-section-overflow2 pt-0 pb-0 pr-0 pl-0 row">
					<div class="col-12 pt-2" style="height: "><span class="negrita t14 subTitleInfo">Ocupaciones</span></div>
				
					<!-- OCUPACIONES -->	
					<div class=" pt-0 pb-0 contenedor">
						<canvas id="radar_ocupaciones"></canvas>
					</div>
					
					<div  id="list-empleos" class="col-12 row"></div>

					<div class="col-12 pb-1"> </div>
					</div>
				</div>

<!-- 			</div> Fin contenedor Scroll			 -->
		</div>	<!-- Fin contenedor principal -->	
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
					<h6 id="infoMDCoordenadas" class="subtitleInfo text-white" >0</h6>
			 	</div>
			</div>	
			
			<!-- DIRECCION -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Dirección</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
					<h6 id="infoDireccion" class="subtitleInfo text-white" >0</h6>
			 	</div>
			</div>	
			
			<!-- PROPIETARIO -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Propietario</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
					<h6 id="infoPropietario" class="subtitleInfo text-white" >0</h6>
			 	</div>
			</div>	
			
			<!-- JEFE -->
			<div class="" id="contentAsignar">
			 	<span id="" class="negrita t14 subTitleInfo">Jefe de expansión</span>
			 	<div class="bordeDivInfo" id=""> </div>
			 	 <div class="contentDetalle">
					<h6 id="infoNombreJefe" class="subtitleInfo text-white" >0</h6>
					<br>
					
					<button type="button" id="verDetalleMD"  class="btonCenterPosition btn back_btonOrange btn_aceptar">Ver detalle MD </button>
			 	</div>
			</div>	
	</div>

	
<!-- </div> -->

<div class="col-12" id="map"></div>

<div class="d-none">
	<form  target="_blank" action="memoria_detalle" id="detalleMemoriaAsignadaAction" method="post">
		<input type="hidden" name="mdId" id="mdId" value="">
		<input type="hidden" name="nombreMd" id="nombreMd" value="">
		<input type="hidden" name="tipoMd" id="tipoMd" value="">
	</form>
	
	
	<form action='mensajes_historial'  id="chatPorMd" method="post">
		<input type="hidden" name="mdIdChat" id="mdIdChat" value=""/>
		<input type="hidden" name="nombreMdChat" id="nombreMdChat" value=""/>
	</form>
	
	
	<form style="display: hidden" action="./excelAsignadasAction" method="POST" id="form">
		<input type="hidden" id="datos" name="datos" value=""/>
		<input type="submit" id="submitBotonAsignadas" style="display:none" />
	</form>
</div>
	<jsp:include page="/jsp/generic/loading.jsp" />
	<jsp:include page="/jsp/generic/mensajes.jsp" />

	<!-- load xslx -->

	
	<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/chosen.jquery.js"></script>	
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>	
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script type="text/javascript">cargaLoading();</script>

	<script	src="${pageContext.request.contextPath}/js/xslx/shim.js"></script>
	<script	src="${pageContext.request.contextPath}/js/xslx/jszip.js"></script>
	<script	src="${pageContext.request.contextPath}/js/xslx/xlsx.js"></script>
	<script	src="${pageContext.request.contextPath}/js/localizador/localizador.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/js/localizador/carga-radios-2.0.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.fileDownload.js" type="text/javascript"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaefWW3pvU6WKZKiVFD6OwyGoWIgZLyS0&callback=initMap">
	    </script>
	
	</body>
</html>