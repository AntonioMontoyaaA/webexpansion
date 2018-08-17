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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablas.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablero.css" />
    
    
<title>Tablero</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>
    <div class="container-fluid">
        <div class="row padding_p" style="padding-top: 0px;">
            <div class="col-lg-12 titulo azul t12 negrita">TABLERO ${usr.perfil.areasxpuesto[0].areaNom} > Tablero</div>
            <%-- <div class="col-lg-2 titulo"
                style="background: #FFFFFF; color: #1f3d7a; text-align: center; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                <span class="punto"></span> <span style="padding-left: 5px;">A
                    tiempo</span><span style="padding-left: 20px;">&nbsp;</span> <span
                    class="punto" style="background-color: #FF5B16"></span> <span
                    style="padding-left: 5px;">Vencidas</span>
            </div> 
            <div class="col-lg-2"></div>
            <div class="col-lg-5"></div>--%>
            
            
            <div class="col-lg-2 col-2 titulogrande azul t18">TABLERO ${usr.perfil.areasxpuesto[0].areaNom}</div>
            <div class="col-lg-4 col-4">
            	<div class="slide-toggle">
            		<div class="row">
            			<div class="header_boton" style="border-right: 1px solid #ccc;width: 64%;"><img id="imgTableroPend" src="${pageContext.request.contextPath}/img/arrowDown.png" />&nbsp;&nbsp;&nbsp;Área</div>
            			<div class="header_boton" style="border-right: 1px solid #ccc;width: 17%;padding-left: 10px;">Pendientes</div>
            			<div class="header_boton" style="width: 17%;padding-left: 10px;">Atrasadas</div>
            		</div>
            		
            	</div>
            	<div class="box" style="display: none;">
            		<div id="box-inner" class="box-inner">
            			
            		</div>
            	</div>
            </div>
            <div class="col-lg-1 col-1">
            	<div class="row" style="margin-top: 5px;">
            		<div class="pretty p-default p-round">
        				<input id="checkTipoTablero" type="checkbox" />
        				<div class="state p-primary-o">
            			<label style="font-size: 12px;">Ver canceladas</label>
        				</div>
    				</div>
            	</div>
            </div>
            <div class="col-lg-5 col-5">
                <form class="form-inline float-right">
                <div class="buscador">
                        <input type="text"  placeholder="Buscar" id="buscador" class="form-control buscadorInput t12" onkeyup="ejecutaBusquedaTablero()"/>
                </div>    
                <button class="btn desp rechargue" type="button" onclick="creatabla();">
                    <img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
                </button>
                <div class="desp" id="descargaExcelTablero" style="cursor: pointer;">
                    <img src="${pageContext.request.contextPath}/img/iconos_DOWNLOAD.png">
                </div>
                    <input type="text" class="fechaInicialCalendario" readonly id="datepicker1" />
                    
                	<button class="btn desp rechargue" id="time" type="button"></button>
  					<button class="btn desp rechargue" id="edit" type="button"></button>
  					<button class="btn desp rechargue" id="pause" type="button"></button>
  					<button class="btn desp rechargue" id="refuse" type="button"></button>
  					<button class="btn desp rechargue" id="change" type="button"></button>
                </form>
            </div>
            
            <div class="col-lg-12 col-12">
                <div class="row padding_p">
                    <div class="col-lg-12 menupr_estilos fblanco tabla_container">
                        <!--Tabla-->
                        <div id="DivTablaTablero"></div>
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
    <script  src="${pageContext.request.contextPath}/js/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
    <script src="${pageContext.request.contextPath}/DataTable/js/dataTables.fixedColumns.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/jquery/jquery.ui.datepicker-es.js"></script>
    <script  src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script  src="${pageContext.request.contextPath}/js/tablero.js"></script>
    <script  src="${pageContext.request.contextPath}/js/tablas.js"></script>
    
    </body>
</html>