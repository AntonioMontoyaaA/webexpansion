<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!-- &emsp;  &nbsp;-->
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 -->  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashboard.css" />	
	
<title>Dashboard</title>
</head>
<body>
<input type="hidden" id="perfil_usuario" value="${usr.perfil.perfilesxusuario[0].perfilid}">
<input type="hidden" id="area" value="${usr.perfil.areasxpuesto[0].areaNom}">
<input type="hidden" id="areaId" value="${usr.perfil.areasxpuesto[0].areaId}">

<%@ include file="/jsp/generic/header.jsp" %>
<div class="container-fluid menupr_fondo">
	<div class="row padding_p" style="padding-top:0px;">
	<div class="col-lg-12 titulo azul t12 negrita" id="nombrePerfil">
	</div>
		<div class="col-lg-8">
<!-- PROGRESO GENERAL DE AREAS  -->	
		<div class="row divs_p">
		<div class="col-lg-12 menupr_estilos fazul">
			<div class="row cabecera">
				<div class="col-md-6">
					<span class="blanco negrita t14">Progreso General de áreas</span>
				</div>
					
				
				<div class="col-md-6 text-right">
				<div class="combos">
					<form class="form-inline p_cabecera">
					<select class="form-control form-inline desp filtro azul" onchange="selectGeneral();" id="opcion">
    					<option value="0">Día</option>
    					<option value="1">Semana</option>
    					<option value="2" selected>Mes</option>
    					<option value="3">Bimestre</option>
    					<option value="4">Trimestre</option>
    					<option value="5">Semestre</option>
    					<option value="6">Año</option>
  						</select>
							&nbsp;
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickerdia">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickersemana">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickermes">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickerbim">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickertrim">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickersem">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickeraño">
						&nbsp;
  						<button class="btn desp rechargue" type="button" onclick="progGeneral();">
  								<img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
  						</button>
  					</form></div>
				</div>
			
			<div class="col-lg-12 p_cabecera blanco">
				<span class="estilo_info t14">MD TOTALES</span><span class="negrita estilo_dato t14" id="sum_totales"></span>
				<span class="estilo_info t14">EN PROCESO</span><span class="negrita estilo_dato t14" id="sum_asignadas"></span>
				<span class="estilo_info t14">ATRASADAS</span><span class="negrita estilo_dato t14" id="sum_atrasadas"></span>
				<span class="estilo_info t14">AUTORIZADAS</span><span class="negrita estilo_dato t14" id="sum_autorizadas"></span>
				<span class="estilo_info t14">RECHAZADAS</span><span class="negrita estilo_dato t14" id="sum_rechazadas"></span>
			</div>
			
			<div class="col-lg-12">
				<span class="blanco estilo_info t14" id="pg_fecha"></span>
			</div>
			
			</div>
				<div id="container"></div>				
				<div id="container_sm1"></div>
				<div id="container_sm2"></div>
		</div>
		</div>
<!-- FIN PROGRESO GENERAL DE AREAS -->
<!-- PROGRESO SEMANAL -->
		<div class="row divs_p">	
					<div class="col-lg-12 menupr_estilos fblanco">
			<div class="row cabecera">
				<div class="col-lg-6">
					<span class="azul negrita t14" id="titulo_historial"></span>
				</div>
				<div class="col-lg-6 text-right">
				<div class="combos">
					<form class="form-inline p_cabecera">
  						<select class="form-control form-inline desp filtro azul" onchange="selectHistorico();" id="opcion_historial">
    					<option value="0">Día</option>
    					<option value="1" selected>Semana</option>
    					<option value="2" >Mes</option>
    					<option value="3">Bimestre</option>
    					<option value="4">Trimestre</option>
    					<option value="5">Semestre</option>
    					<option value="6">Año</option>
  						</select>&nbsp;
  						
  						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickerdiaH">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickersemanaH">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickermesH">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickerbimH">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickertrimH">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickersemH">
						<input type="text" style="display:none;" class="form-control desp filtro fecha_pick azul" id="datepickerañoH">
						&nbsp;
  						
  						<button class="btn desp rechargue" type="button" onclick="progSemanal();">
  								<img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
  						</button>
  					</form></div>
				</div>
			
			<div class="col-lg-12">
				<span class="azul estilo_info t14" id=sub_historial></span>
			</div>
			
			</div>
				<div id="container_psemanal"></div>
		</div>
			
		</div>
<!-- FIN PROGRESO SEMANAL -->
		</div>	
		<div class="col-lg-4 ">
		<div class="row divs_p">
<!-- PLAN APERTURA MENSUAL -->	
			<div class="col-lg-12 menupr_estilos fazul">
				<div class="row cabecera">
				<div class="col-lg-10 col-md-10">
					<span class="blanco negrita t14">Plan Apertura Mensual</span>
				</div>
				<div class="col-lg-2 col-md-2 text-right">
					<form class="form-inline p_cabecera">
  						<button class="btn desp rechargue" type="button" onclick="AperturaMensual();">
  								<img src="${pageContext.request.contextPath}/img/refresh_sf.png" />
  						</button>
  					</form>
				</div>
			<div class="col-lg-12 p_cabecera">
				<span class="blanco estilo_info t14">METAS</span><span class="blanco negrita estilo_dato" id="metas"></span>
				<span class="blanco estilo_info t14">TIENDAS ABIERTAS</span><span class="blanco negrita estilo_dato" id="t_abiertas"></span>
				<span class="blanco estilo_info t14" id="mes_actual"></span>
			</div>
			</div>	
			
			<div id="container_apmensual"></div>
			
		</div>
<!--FIN PLAN APERTURA MENSUAL -->	
		</div>
		
		<div class="row">
			<div class="col-lg-6 col-md-4 col-6 divs_p">
				<div class="col-lg-12 menupr_estilos fblanco">
				<div class="row cabecera">
					<div class="col-lg-10 col-md-10">
						<span class="azul negrita t14">En Proceso</span>
					</div>
				</div>	
				<div id="container_proceso"></div>
				<div class="row resumen_pie">
				
				<div class="col-xl-6 analista">
				<div class="div_left">
					<div class="circulo_punto" style="background:#00427F;" id="proceso_p"></div>
					<span  class="resumen_personales azul t14">Personales</span>
				</div>
				</div>
				<div class="col-xl-6 analista">
				<div  class="div_right">
					<div class="circulo_punto" style="background:#64DEF1;" id="proceso_a"></div>
					<span  class="resumen_personales azul t14">Area</span>
				</div>
				</div>
				</div>
				</div>
			</div>
			
			<div class="col-lg-6 col-md-4 col-6 divs_p">
				<div class="col-lg-12 menupr_estilos fblanco">
				<div class="row cabecera">
					<div class="col-lg-10 col-md-10">
						<span class="azul negrita t14">Atrasadas</span>
					</div>
				</div>	
				<div id="container_atrasadas"></div>
				<div class="row resumen_pie">
				
				<div class="col-xl-6 analista">
				<div class="div_left">
					<div class="circulo_punto" style="background:#00427F;" id="atrasadas_p"></div>
					<span  class="resumen_personales azul t14">Personales</span>
				</div>
				</div>
				<div class="col-xl-6 analista">
				<div class="div_right">
					<div class="circulo_punto" style="background:#64DEF1;" id="atrasadas_a"></div>
					<span  class="resumen_personales azul t14">Area</span>
				</div>
				</div>
				</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-4 col-6 divs_p">
				<div class="col-lg-12 menupr_estilos fazul">
				<div class="row cabecera">
					<div class="col-lg-10 col-md-10">
						<span class="blanco negrita t14">Autorizadas</span>
					</div>
				</div>	
				<div id="container_autorizadas"></div>
				<div class="row resumen_pie">
				
				<div class="col-xl-6 analista">
				<div class="div_left">
					<div class="circulo_punto" style="background:#00427F;" id="autorizadas_p"></div>
					<span  class="resumen_personales blanco t14">Personales</span>
				</div>
				</div>
				<div class="col-xl-6 analista">
				<div class="div_right">
					<div class="circulo_punto" style="background:#64DEF1;" id="autorizadas_a"></div>
					<span  class="resumen_personales blanco t14">Area</span>
				</div>
				</div>
				</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-4 col-6 divs_p">
				<div class="col-lg-12 menupr_estilos fazul">
				<div class="row cabecera">
					<div class="col-lg-10 col-md-10">
						<span class="blanco negrita t14">Rechazadas</span>
					</div>
				</div>	
				<div id="container_rechazadas"></div>
				<div class="row resumen_pie">
				
				<div class="col-xl-6 analista">
				<div class="div_left">
					<div class="circulo_punto" style="background:#00427F;" id="rechazadas_p"></div>
					<span  class="resumen_personales blanco t14">Personales</span>
				</div>
				</div>
				<div class="col-xl-6 analista">
				<div class="div_right">
					<div class="circulo_punto" style="background:#64DEF1;" id="rechazadas_a"></div>
					<span  class="resumen_personales blanco t14">Area</span>
				</div>
				</div>
				</div>
				
				</div>
			</div>	
			
			
			<div class="col-12 divs_p ">
				<div class="col-lg-12 menupr_estilos dir_general fblanco">	
					<div class="row resumen_pie">
					
					<div class="col-3">
					<div  style="min-width:110px;">
						<div class="circulo_puntop" style="background:#006dac;"></div>
						<span  class="resumen_personales t12 azul">Expansión</span>
					</div>
					</div>
					<div class="col-3">
					<div style="min-width:110px;">
						<div class="circulo_puntop"  style="background:#194377;"></div>
						<span  class="resumen_personales t12 azul">Gestoría</span>
					</div>
					</div>
					<div class="col-3">
					<div style="min-width:120px;">
						<div class="circulo_puntop"  style="background:#97dfcf;"></div>
						<span class="resumen_personales t12 azul">Construcción</span>
					</div>
					</div>
					<div class="col-3">
					<div style="min-width:120px;">
						<div class="circulo_puntop"  style="background:#07c0d7;"></div>
						<span  class="resumen_personales t12 azul">Operaciones</span>
					</div>
					</div>
					
				</div>
				</div>
			</div>	
			
		</div>
		</div>
	</div>
</div>
	
		<input type="hidden" id="fechaConsulta" name="fechaConsulta" value="" />
	
<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />


	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap-datepicker.min.js"></script>
	<script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap-datepicker.es.min.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/highcharts.js"></script>
	<script	src="${pageContext.request.contextPath}/js/dashboard.js"></script>
	<script	src="${pageContext.request.contextPath}/js/graficasDirGeneral.js"></script>
	<script	src="${pageContext.request.contextPath}/js/graficasAnalista.js"></script>
	<script	src="${pageContext.request.contextPath}/js/graficasDirArea.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/data.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/exporting.js"></script>
	<script	src="${pageContext.request.contextPath}/highcharts/js/modules/export-data.js"></script>
	
	</body>
</html>