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
		<div class="col-lg-12 titulo azul t12 negrita">DASHBOARD ${usr.perfil.areasxpuesto[0].areaNom} > APROBADAS > TIEMPOS </div>
	
	<div class="col-lg-12">
		<div class="row">
				<button class="btn desp rechargue" type="button">
  								<img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
  				</button>
		</div>
		
		<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos fblanco"  style="padding:0;">
					<!--   aquí va la grafica       -->
					<svg id="gantt"></svg>
				
				</div>
		</div>
		
		<div class="row padding_p">
				<div class="col-lg-12 menupr_estilos fblanco">
					<div class="col-12 cabecera">
					<span class="verde negrita t12" id="nombrepuesto">Gerente de Expansión</span>
					<div class="float_right"></div>
					</div>
					
					<div class="row">
						<div class="col-lg-6" style="padding-left:50px;">
								<div class="row">
									<div class="col-lg-4">
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Responsable</span> <input
												type="text" class="form-control campo t12" id="responsable"
												value="El responsable" readonly>
										</div>
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Estatus</span> <input type="text"
												class="form-control campo t12" id="responsable"
												value="El estatus" readonly>
										</div>
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Duración</span> <input type="text"
												class="form-control campo t12" id="responsable"
												value="La duracion" readonly>
										</div>
									</div>
									<div class="col-lg-8">
										<span class="t12 negrita">Motivo</span>
										<textarea class="form-control campo t12" id="motivo" readonly>blablablaaa</textarea>
										<div class="row">
											<div class="col-lg-6">
												<span class="t12 negrita">Completados</span> <input
													type="text" class="form-control campo t12" id="completados"
													value="Completados" readonly>
											</div>
											<div class="col-lg-6">
												<span class="t12 negrita">Faltantes</span> <input
													type="text" class="form-control campo t12" id="faltantes"
													value="Faltantes" readonly>
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
												value="17/07/2018 09:48:00am" readonly>
										</div>
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Fecha Real Estimada</span> 
											<input type="text" class="form-control campo t12" id="fechareal"
												value="17/07/2018 09:48:00am" readonly>
										</div>
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Fecha Final</span> 
											<input type="text" class="form-control campo t12" id="fechafinal"
												value="17/07/2018 09:48:00am" readonly>
										</div>
								</div>
								<div class="col-lg-6">
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Dependencia</span> 
											<input type="text" class="form-control campo t12" id="dependencia"
												value="Ninguno" readonly>
										</div>
										<div class="col-lg-12" style="padding-left:0;">
											<span class="t12 negrita">Progreso</span>
											<div class="row" style="padding-left:15px;">
												<div id="progres_ext" class="progress" style="width:80%;">
													<div id="progres_int" class="progress-bar" style="width: 90%"></div>
												</div>
												<div class="float_right t12" id="porcentaje" style="padding:3px 10px;">90%</div>
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


<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
<%-- 	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script> --%>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/jquery/frappe-gantt.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/lineaTiempo.js"></script>
	
	
	
	</body>
</html>