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
            
            
            <div class="col-lg-2 titulogrande azul t18">TABLERO ${usr.perfil.areasxpuesto[0].areaNom}</div>
            <div class="col-lg-4">
            	<div class="slide-toggle">
            		<div class="row">
            			<div class="col-lg-6 header_boton" style="border-right: 1px solid #ccc;width: 65%;"><img id="imgTableroPend" src="${pageContext.request.contextPath}/img/arrowDown.png" />&nbsp;&nbsp;&nbsp;Área</div>
            			<div class="col-lg-6 header_boton" style="width: 35%;">Pendientes</div>
            		</div>
            		
            	</div>
            	<div class="box" style="display: none;">
            		<div id="box-inner" class="box-inner">
            			
            		</div>
            	</div>
            </div>
            <div class="col-lg-6">
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
                </form>
                
            </div>
            <div class="col-lg-12">
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


<form style="display: hidden" action="./excelTableroAction" method="POST" id="form">
    <input type="hidden" id="datos" name="datos" value=""/>
    <input type="submit" id="submitBotonTablero" style="display:none" />
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