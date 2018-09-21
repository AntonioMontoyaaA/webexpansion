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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/utiles/frappe-gantt.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/lineaTiempo.css" />
	


	
<title>Linea de Tiempo</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row padding_p" style="padding-top:0px;">
		<div class="col-lg-12 titulo blanco t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > TABLERO > TIEMPOS > <span id="nombre_md" ></span> </div>
	
	<div class="col-12"  style="padding-left:0;">
				<button class="btn desp atras" type="button" onclick="history.back()" style="margin-bottom:0px;"></button>
		</div>
	
	<div class="col-lg-12">
		<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos fblanco" id="contenedor_gantt"  style="padding:0;"></div>
		</div>
		
		<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos fblanco">
					<div class="col-12 cabecera">
					<span class="verde negrita t12" id="nombrepuesto">-</span>
					<input type="hidden" id="nivelEstatusAreaId" name="nivelEstatusAreaId" value="" />
					
					<div class="float_right cuadroeditar cursor"></div>
					<div class="float_right cuadrocancelar cursor"></div>
					<div class="float_right cuadroguardar cursor"></div>		
					</div>
					
					<div class="row">
						<div class="col-lg-6" style="padding-left:50px;">
								<div class="row">
									<div class="col-lg-4">
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Responsable</span> <input
												type="text" class="form-control campo t12 grupo" id="responsable" 
												value="-" readonly>
											<div><select style="display:none;" class="campo t12 grupo" id="combo_responsables"></select></div>
										</div>
										
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Estatus</span>
											<input type="text" class="form-control campo t12" id="estatus" value="-" readonly>
												
												<div><select style="display:none;" class="campo t12 grupo" id="combo_estatus"></select></div>
										</div>
										
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Duración (días)</span> <input type="text"
												class="form-control campo t12" id="duracion"
												value="-" readonly>
										</div>
									</div>
									<div class="col-lg-8">
										<span class="t12 negrita">Motivo</span>
										<textarea class="form-control campo t12 grupo" id="motivo" readonly>-</textarea>
										<div class="row">
											<div class="col-lg-6">
												<span class="t12 negrita">Completados (días)</span> <input
													type="text" class="form-control campo t12" id="completados"
													value="-" readonly>
											</div>
											<div class="col-lg-6">
												<span class="t12 negrita">Faltantes (días)</span> <input
													type="text" class="form-control campo t12" id="faltantes"
													value="-" readonly>
											</div>
										</div>
									</div>
								</div>
							</div>
						<div class="col-lg-6">
							<div class="row">
								<div class="col-lg-6">
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Fecha Inicial</span> 
											<input type="text" class="form-control campo t12" id="fechainicial"
												value="-" readonly>
										</div>
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Fecha Real Estimada</span> 
											<input type="text" class="form-control campo t12" id="fechareal"
												value="-" readonly>
										</div>
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Fecha Final</span> 
											<input type="text" class="form-control campo t12 " id="fechafinal"
												value="-" readonly>
										</div>
								</div>
								<div class="col-lg-6">
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Dependencia</span> 
											<input type="text" class="form-control campo t12" id="dependencia"
												value="-" readonly>
										</div>
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Progreso</span>
											<div class="row" style="padding-left:15px;">
												<div id="progres_ext" class="progress" style="width:80%;">
													<div id="progres_int" class="progress-bar" style="width: 0%"></div>
												</div>
												<div class="float_right t12" id="porcentaje" style="padding:3px 10px;">-</div>
											</div>
											
										</div>
								</div>
							</div>
						</div>
					</div>
					
								
				</div>
		</div>
		
	</div>
	</div>
	</div>
<div style="display: none;">
	<s:textfield name="mdId" label="" cssStyle="display: none"></s:textfield>
	<s:textfield name="nombreMd" label="" cssStyle="display: none"></s:textfield>	
	<s:textfield name="tipoMd" label="" cssStyle="display: none"></s:textfield>	
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
</form>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script> 
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/frappe-gantt.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/lineaTiempo.js"></script>
	
	
	
	</body>
</html>