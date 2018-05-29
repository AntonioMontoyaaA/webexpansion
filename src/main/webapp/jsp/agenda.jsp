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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/calendar.css" />	
<title>Agenda</title>
</head>
<body>
<%--  <c:forEach var="permisos" items="${permisos}">
     	  			 <c:out value="${permisos.codigo}"/> </c:forEach>  --%>
<%-- <p>Student First Name: <c:out value="${login.contra}"/></p> --%>
<%@ include file="/jsp/generic/header.jsp" %>

<div class="container-fluid">
	<div class="row margen_cal_titulo">
		<div class="col-lg-12 titulo">Dashboard Expansión > Agenda </div>
	
		<div class="col-lg-12 titulogrande">AGENDA
		
		<button type="submit" class="btn evento">&emsp;Mes&emsp;</button>
		<button type="submit" class="btn evento">&emsp;+Evento&emsp;</button>
		
		
		</div>
		<div class="col-lg-12">
		<div class="row margen_cal">
		<div class="col-lg-12 menupr_estilos">
			
    <div class="row cabecera"><span class="negrita azul">Marzo 2018</span></div>
    
     <div class="row">
     <div class="col-xl-2 col-lg-3 col-md-12 calendario">
     <div class="row">
 	 <div class="col-lg-12 col-md-4 fazul">
 		<div class="form-group">
            <div id="embeddingDatePicker" onchange=""></div>
            <input type="hidden" id="selectedDate" name="selectedDate" />
    	</div>
    </div>
    
    <div class="col-lg-12 col-md-4 sel_evento">
    	<div class="form-group">
        <label class="texto_azulg">Selecciona algún evento</label>
        <div class="col-xs-5 date">
            <div id="embeddingDatePicker" onchange=""></div>
            <input type="hidden" id="selectedDate" name="selectedDate" />
        </div>
    	</div>
    </div>
     <div class="col-lg-12 col-md-4 sel_jefe">
    	<div class="form-group">
        <label class="texto_azulg">Selecciona algún jefe</label>
        <div class="col-xs-5 date">
            <div id="embeddingDatePicker" onchange=""></div>
            <input type="hidden" id="selectedDate" name="selectedDate" />
        </div>
    	</div>
    </div>
    </div>
    </div>
    
    <div class="col-xl-10 col-lg-9 d-none d-sm-block nopadd">
  	<table class="table calendario_grande">
  		<thead>
  			<tr>
  			<th class="texto_azulg">Lunes</th>
  			<th class="texto_azulg">Martes</th>
  			<th class="texto_azulg">Miércoles</th>
  			<th class="texto_azulg">Jueves</th>
  			<th class="texto_azulg">Viernes</th>
  			<th class="texto_azulg">Sábado</th>
  			<th class="texto_azulg">Domingo</th>
  			</tr>
  		</thead>
  		<tbody>
  			<tr>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  			</tr>
  			<tr>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  			</tr>
  			<tr>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  			</tr>
  			<tr>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  			</tr>
  			<tr>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  			</tr>
  			<tr>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  				<td></td>
  			</tr>
  		</tbody>
  	</table>
	</div>
	</div>
	<div class="row d-block d-sm-none nopadd">
  	<div class="col-xs-12 he h_1"><span class="num_dia">1</span><span class="nom_dia">Lunes</span></div>
  	<div class="col-xs-12 ev e_1">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_2"><span class="num_dia">2</span><span class="nom_dia">Martes</span></div>
  	<div class="col-xs-12 ev e_2">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_3"><span class="num_dia">3</span><span class="nom_dia">Miércoles</span></div>
  	<div class="col-xs-12 ev e_3">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_4"><span class="num_dia">4</span><span class="nom_dia">Jueves</span></div>
  	<div class="col-xs-12 ev e_4">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_5"><span class="num_dia">5</span><span class="nom_dia">Viernes</span></div>
  	<div class="col-xs-12 ev e_5">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_6"><span class="num_dia">6</span><span class="nom_dia">Sábado</span></div>
  	<div class="col-xs-12 ev e_6">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_7"><span class="num_dia">7</span><span class="nom_dia">Domingo</span></div>
  	<div class="col-xs-12 ev e_7">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_8"><span class="num_dia">8</span><span class="nom_dia">Lunes</span></div>
  	<div class="col-xs-12 ev e_8">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_9"><span class="num_dia">9</span><span class="nom_dia">Martes</span></div>
  	<div class="col-xs-12 ev e_9">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_10"><span class="num_dia">10</span><span class="nom_dia">Miércoles</span></div>
  	<div class="col-xs-12 ev e_10">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_11"><span class="num_dia">11</span><span class="nom_dia">Jueves</span></div>
  	<div class="col-xs-12 ev e_11">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_12"><span class="num_dia">12</span><span class="nom_dia">Viernes</span></div>
  	<div class="col-xs-12 ev e_12">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_13"><span class="num_dia">13</span><span class="nom_dia">Sábado</span></div>
  	<div class="col-xs-12 ev e_13">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_14"><span class="num_dia">14</span><span class="nom_dia">Domingo</span></div>
  	<div class="col-xs-12 ev e_14">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_15"><span class="num_dia">15</span><span class="nom_dia">Lunes</span></div>
  	<div class="col-xs-12 ev e_15">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_16"><span class="num_dia">16</span><span class="nom_dia">Martes</span></div>
  	<div class="col-xs-12 ev e_16">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_17"><span class="num_dia">17</span><span class="nom_dia">Miércoles</span></div>
  	<div class="col-xs-12 ev e_17">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_18"><span class="num_dia">18</span><span class="nom_dia">Jueves</span></div>
  	<div class="col-xs-12 ev e_18">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_19"><span class="num_dia">19</span><span class="nom_dia">Viernes</span></div>
  	<div class="col-xs-12 ev e_19">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_20"><span class="num_dia">20</span><span class="nom_dia">Sábado</span></div>
  	<div class="col-xs-12 ev e_20">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_21"><span class="num_dia">21</span><span class="nom_dia">Domingo</span></div>
  	<div class="col-xs-12 ev e_21">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_22"><span class="num_dia">22</span><span class="nom_dia">Lunes</span></div>
  	<div class="col-xs-12 ev e_22">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_23"><span class="num_dia">23</span><span class="nom_dia">Martes</span></div>
  	<div class="col-xs-12 ev e_23">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_24"><span class="num_dia">24</span><span class="nom_dia">Miércoles</span></div>
  	<div class="col-xs-12 ev e_24">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_25"><span class="num_dia">25</span><span class="nom_dia">Jueves</span></div>
  	<div class="col-xs-12 ev e_25">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_26"><span class="num_dia">26</span><span class="nom_dia">Viernes</span></div>
  	<div class="col-xs-12 ev e_26">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_27"><span class="num_dia">27</span><span class="nom_dia">Sábado</span></div>
  	<div class="col-xs-12 ev e_27">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_28"><span class="num_dia">28</span><span class="nom_dia">Domingo</span></div>
  	<div class="col-xs-12 ev e_28">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_29"><span class="num_dia">29</span><span class="nom_dia">Lunes</span></div>
  	<div class="col-xs-12 ev e_29">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_30"><span class="num_dia">30</span><span class="nom_dia">Martes</span></div>
  	<div class="col-xs-12 ev e_30">Sin Eventos</div>
  	
  	<div class="col-xs-12 he h_31"><span class="num_dia">31</span><span class="nom_dia">Miércoles</span></div>
  	<div class="col-xs-12 ev e_31">Sin Eventos</div>
  	
	</div>
	
			
			</div>
		</div>
		</div>
	</div>
</div>

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap-datepicker.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap-datepicker.es.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/js/agenda.js"></script>
	
	
	
	</body>
</html>