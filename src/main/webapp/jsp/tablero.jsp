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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/pretty-checkbox.min.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dropzone/dropzone.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablas.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablero.css" />
    
    
<title>Tablero</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>
    <div class="container-fluid">
        <div class="row padding_p" style="padding-top: 0px;">
            <div class="col-lg-12 titulo blanco t12 negrita">TABLERO ${usr.perfil.areasxpuesto[0].areaNom} > Tablero</div>
        </div>
        
            <%-- <div class="col-lg-2 titulo"
                style="background: #FFFFFF; color: #1f3d7a; text-align: center; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                <span class="punto"></span> <span style="padding-left: 5px;">A
                    tiempo</span><span style="padding-left: 20px;">&nbsp;</span> <span
                    class="punto" style="background-color: #FF5B16"></span> <span
                    style="padding-left: 5px;">Vencidas</span>
            </div> 
            <div class="col-lg-2"></div>
            <div class="col-lg-5"></div>--%>
		<div class="row padding_p" style="padding-top: 0px;">
            <div class="col-lg-4 col-sm-6" style="padding-right: 0px;padding-left: 8px;">
            	<form class="form-inline">
                	<div class="buscador" style="width: 100%; margin-top: 6px;">
                        <input type="text"  placeholder="Buscar" id="buscador" class="form-control buscadorInput t12" onkeyup="ejecutaBusquedaTablero()"/>
               		</div> 
                </form>
            </div>
            <div class="col-lg-4 col-sm-6" style="padding-right: 0px;padding-left: 0px;">
            	<div class="slide-toggle" style="margin-top: 6px;width: 100%;height: 25;">
            		<div class="row">
            			<div class="header_boton" style="border-right: 1px solid #ccc;width: 64%;font-size: 11px;"><img id="imgTableroPend" src="${pageContext.request.contextPath}/img/arrowDown.png" />&nbsp;&nbsp;&nbsp;<span id="areaTextTablero">Área</span></div>
            			<div class="header_boton" style="border-right: 1px solid #ccc;width: 17%;font-size: 11px;padding-left: 5px;"><span id="areaPendientesTablero">Pendientes</span></div>
            			<div class="header_boton" style="width: 17%;font-size: 11px;padding-left: 5px;"><span id="areaAtrasadasTablero">Atrasadas</span></div>
            		</div>
            		
            	</div>
            	<div class="box" style="display: none;">
            		<div id="box-inner" class="box-inner">
            			
            		</div>
            	</div>
            </div>
            <div class="col-lg-4">
            		
    				
    				<form class="form-inline float-right">
    				<div>
    					<select id="selectEstatus" name="selectEstatus" class="combo_tablero">	
  							<option value="1">Activas</option>
  							<option value="0">Canceladas</option>
  							<option value="2">Aperturadas</option>
  							<option value="3">Pausadas</option>
						</select>
    				</div>  
    				<!-- <div class="pretty p-default p-round" style="margin-top: 6px;">
        				<input id="checkTipoTablero" type="checkbox" />
        				<div class="state p-primary-o">
            			<label class="blanco" style="font-size: 12px;">Ver canceladas</label>
        				</div>
    				</div> -->
                <button class="btn desp refresh" type="button" onclick="creatabla();"></button>
                <div class="desp descarga sin_permiso" id="descargaExcelTablero" style="cursor: pointer;"></div>
                    <input type="text" class="fechaInicialCalendario" readonly id="datepicker1" style="display: none;" />
                    
                	<button class="btn desp sin_permiso" id="time" type="button"></button>
  					<button class="btn desp sin_permiso" id="edit" type="button"></button>
  					<button class="btn desp sin_permiso" id="despausar" type="button"></button>
  					<button class="btn desp sin_permiso" id="reactivar" type="button"></button>
  					<button class="btn desp sin_permiso" id="pause" type="button"></button>
  					<button class="btn desp sin_permiso" id="refuse" type="button"></button>
  					<button class="btn desp sin_permiso" id="change" type="button"></button>
  					<button class="btn desp sin_permiso" id="layoutUp" type="button"></button>
                </form>
            	
            </div> 
           </div>
           <div class="row padding_p" style="padding-top: 0px;">
            <div class="col-lg-12 col-12" style="margin-top: -12px;">
                <div class="row padding_p">
                    <div class="col-lg-12 menupr_estilos fblanco tabla_container">
                        <!--Tabla-->
                        <div id="DivTablaTablero"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal" class="modal_">
    
        <div id="contenedor-modal">
             <span class="closeModal">&times;</span>
            
            <div class= "modal-header">
                <div class="t18 blanco negrita" id="captionModal" style= "display: flex; align-items: center;"></div>
            
            </div>
            
            <div class= "modal-body">
                <div class="col-lg-12 menupr_estilos fblanco tabla_container">
                    <!--Tabla-->
                    <div id="divContenidoModal">
                    
                    	<div class="col-lg-12" id="subida" style="height: 300px;  display: none;">
							<form action="/uploadLayout" class="dropzone" id="uploader" style="overflow: auto; display: flex; align-items: center; padding: 0;"></form>
						</div>
                    
                    </div>
                </div>
                <div class="col-lg-12 menupr_estilos fblanco tabla_container" style="text-align: center">
                	<span id="mensajeErrorLayoutUp" style="display: none; color: #FF0000;">---</span>
                	<span id="mensajeLoadingLayoutUp" style="display: none; color: rgb(7, 27, 54)">Cargando... No cierres esta ventana hasta que responda el sitio ;)</span>
                </div>     
            </div>
            <div class="modal-footer" style="justify-content: center; border:0;">
            	<button type="button" class="btn fazul blanco" id="botonModalAceptar" style="width: 100px; height: 30px; padding-top: 2px; cursor: pointer;">ACEPTAR</button>
            </div>
        </div>
    	</div>
    	<div class="modal" id="modal_drop" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" style= "padding-right: 0;">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header blanco" id="mensajeHeader" style="padding-top:7px; padding-bottom:7px;">
	        <div id="tituloMensajeEstatus">---</div>
	        <button type="button" class="close blanco" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	       <div id="descripcionMensajeEstatus">---</div>
       			<div class="drop">
				  <div class="drop" style = "height: 80px; align-items: flex-start; justify-content: center;">
				  	<select name="slct" id="select_modal" class= "s_drop" style = "width: auto; background-position: 100% center;"></select>
				  </div>
	      </div>
	      <div class="modal-footer" style="justify-content: center; border:0;">
	        <button type="button" onclick= "ShowSelectedItem()" class="btn fazul blanco" id="botonMensajeAceptarEstatus" style="width: 100px; height: 30px; padding-top: 2px; cursor: pointer;">Guardar</button>
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
	<input type="hidden" name="tipoMd" id="tipoMd" value=""/>
</form>

<form style="display: hidden" action="./excelTableroAction" method="POST" id="form">
    <input type="hidden" id="datos" name="datos" value=""/>
    <input type="submit" id="submitBotonTablero" style="display:none" />
</form>

<form action='lineaTiempo'  id="lineaTiempoAction" method="post">
	<input type="hidden" name="mdId" id="mdId_tiempo" value=""/>
	<input type="hidden" name="nombreMd" id="nombreMd_tiempo" value=""/>
	<input type="hidden" name="tipoMd" id="tipoMd_tiempo" value=""/>
</form>

<form action='mensajes_historial'  id="chatPorMd" method="post">
	<input type="hidden" name="mdIdChat" id="mdIdChat" value=""/>
</form>

    <!-- Bootstrap core JavaScript -->
    <script  src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
    <script  src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
    <script	src="${pageContext.request.contextPath}/js/dropzone/dropzone.js"></script>
    <script	src="${pageContext.request.contextPath}/js/dropzone/dateFormat.js"></script>
    <script  src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
    <script src="${pageContext.request.contextPath}/DataTable/js/dataTables.fixedColumns.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
    <script  src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script  src="${pageContext.request.contextPath}/js/tablero.js"></script>
    <script  src="${pageContext.request.contextPath}/js/tablas.js"></script>
    
    </body>
</html>