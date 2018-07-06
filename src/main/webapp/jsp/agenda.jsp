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
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/tempusdominus-bootstrap-4.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/agenda.css" />	
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<title>Agenda</title>
</head>
<body>
<%@ include file="/jsp/generic/header.jsp" %>
<input type="hidden" id="perfil_usuario" value="${usr.perfil.perfilesxusuario[0].perfilid}">

<div class="container-fluid">
	<div class="row padding_p"  style="padding-top:0px;">
		<div class="col-lg-12 titulo azul t12 negrita">Dashboard Expansión > Agenda </div>
		<div class="col-lg-12 titulogrande azul t18">AGENDA
		
		<button type="submit" class="btn evento">&emsp;Mes&emsp;</button>
		<button id="crear_evento" onclick="llenaAreas()" type="button" class="btn evento" 
			 data-toggle="modal" data-target="#exampleModal">&emsp;Crear Evento&emsp;</button>
		
		
		</div>
		<div class="col-lg-12">
			    
     <div class="row">
     <div class="col-xl-3 col-lg-3 col-md-12 calendario padding_p" style="min-width:210px;">
     <div class="col-12 fblanco menupr_estilos" style="height:98%; padding:0;">
     
    
 	 <div class="col-12 fazul" style="padding-right: 0; padding-left:0;">
 		<div class="form-group" style="margin:0;">
            <div id="embeddingDatePicker"></div>
            <input type="hidden" id="selectedDate" name="selectedDate"/>
    	</div>
    </div>
  
    
    <div class="col-12 borde_desp fblanco">
    	<div class="negrita gris t12 cursor menu_desp" data-toggle="collapse" data-target="#eventos">Eventos</div>
				<div class="collapse" id="eventos"></div>
	</div>
	<div class="col-12 borde_desp fblanco">
    	<div class="negrita t12 gris cursor menu_desp" data-toggle="collapse" data-target="#personal">Personal</div>
				<div class="collapse" id="personal"></div>		
	</div>
	
	<div class="col-12 borde_desp fblanco">
    	<div class="negrita t12 gris cursor menu_desp" data-target="#leyenda">Leyenda</div>
				<div id="leyenda">
						 <div class="row">
								<div class="col-12 azul t12">
									<div class="circulo float_left porRealizar"></div>
									<div class="texto_circulo"> Por realizar</div>
								</div>
								 
								<div class="col-12 azul t12">
									<div class="circulo float_left realizadas"></div>
									<div class="texto_circulo">Realizadas</div>
								</div>
								
								<div class="col-12 azul t12">
									<div class="circulo float_left atrasadas"></div>
									<div class="texto_circulo">Atrasadas</div>
								</div>
								<br>
						</div>
				</div>
	</div>
   </div>
    </div>
    
    <div class="col-xl-9 col-lg-9 padding_p">
  	<table class="table calendario_grande fblanco menupr_estilos">
  		<thead>
  		<tr class="" style="border-bottom: 1px solid #5d5d57;">
  			<th class="prev left" onclick="botonPrev()">«</th>
  			<th colspan="5" class="center gris negrita" id="mesCabecera"></th>
  			<th class="next right" onclick="botonNext()">»</th>
  		</tr>
  		
  			<tr>
  			<th class="azul center">Lunes</th>
  			<th class="azul center">Martes</th>
  			<th class="azul center">Miércoles</th>
  			<th class="azul center">Jueves</th>
  			<th class="azul center">Viernes</th>
  			<th class="azul center">Sábado</th>
  			<th class="azul center">Domingo</th>
  			</tr>
  		</thead>
  		<tbody id="cuerpoTabla"></tbody>
  	</table> 
  	
  	<!-- <div class="form-group">
            <div id="calendarioPrincipal" onchange=""></div>
            <input type="hidden" id="selectedDate2" name="selectedDate2" />
    	</div>
  	 -->
  	
  	
  	
	</div>
	</div>
<%-- 	<div class="row d-block d-sm-none nopadd">
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
  	
	</div> --%>
		</div>
	</div>
</div>

	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"  data-backdrop="static" data-keyboard="false"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header right">
					<h5 class="modal-title" id="exampleModalLabel">Nuevo Evento</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form>
						<div class="row">
							<div class="col-lg-6">
								<div class="form-group">
									 <select class="filtro" id="tipo_evento">
										<option value="" selected>Elegir tipo de evento</option>
									</select> 
									
								<div class="row">
										<div class="col-lg-6" style="padding-right:5px;">
										 <label class="etiqueta t12"><font class="azulc">*</font>Fecha inical</label>
										<div class="formulario_fecha">
											<input type="text" class="form-control datetimepicker-input formularioint" id="finicial" data-toggle="datetimepicker" data-target="#finicial"/>
										</div>
										</div>

										<div class="col-lg-6" style="padding-left:5px;">
										 <label class="etiqueta t12"><font class="azulc">*</font>Hora inicial</label>
										<div class="formulario_hora">
												 <input type="text" class="form-control datetimepicker-input formularioint" id="hinicial" data-toggle="datetimepicker" data-target="#hinicial"/>
										</div>
										</div>
										
										<div class="col-lg-6" style="padding-right:5px;">
										 <label class="etiqueta t12"><font class="azulc">*</font>Fecha final</label>
										<div class="formulario_fecha">
											<input type="text" class="form-control datetimepicker-input formularioint" id="ffinal" data-toggle="datetimepicker" data-target="#ffinal"/>
										</div>
										</div>

										<div class="col-lg-6" style="padding-left:5px;">
										<label class="etiqueta t12"><font class="azulc">*</font>Hora final</label>
										<div class="formulario_hora">
												 <input type="text" class="form-control datetimepicker-input formularioint" id="hfinal" data-toggle="datetimepicker" data-target="#hfinal"/>
										</div>
										</div>
									</div>
									
									<label class="etiqueta t12"><font class="azulc">*</font>Lugar</label>
									<input type="text" class=" filtro" id="lugar">
									
									<label for="descripcion" class="etiqueta t12"><font class="azulc">*</font>Descripción</label>
									<textarea class="form-control t12 letra" id="descripcion"></textarea>
									
									<label class="etiqueta t12"><font class="azulc">*</font>Asignado por</label>
									<input type="text" class="filtro" id="asignado">
								</div>
							</div>
							<div class="col-lg-6">
									<label class="etiqueta t12">Asignar a</label>

								<div class="contenedor">
									<div class="dropdown show">
										<div class="dropdown-toggle filtro_interno float_left" 
											role="button" id="dropdownAreas" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"><div class="cuadro float_left" id="letra_seleccionada">-</div>
										</div>

										<div class="dropdown-menu opciones"	aria-labelledby="dropdownAreas" id="areas">
										<!-- aqui van las opciones injectadas -->
										</div>
									</div>
									<div class="informacion t12 azul" id="info_seleccionada">Selecciona un Área</div>
									<input type="hidden" id="inputArea" value=""/>
									<input type="hidden" id="inputAreaId" value=""/>
								</div>


								<label class="etiqueta t12">Puesto</label>
								<div class="contenedor">
									<div class="dropdown show">
										<div class="dropdown-toggle filtro_interno float_left" 
											role="button" id="dropdownPuestos" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"><div class="cuadro float_left" id="letra_seleccionadaPuesto">-</div>
										</div>

										<div class="dropdown-menu opciones" aria-labelledby="dropdownPuestos" id="puestos">
										<div class="dropdown-item opcion_drop puestos">
												<div class="cuadro float_left">-</div>
												<div class="informacion t12 azul">Selecciona un puesto</div>
										</div>
										</div>
										
									</div>
									<div class="informacion t12 azul" id="info_seleccionadaPuesto">Selecciona un puesto</div>
									<input type="hidden" id="inputPuesto" value=""/>
									<input type="hidden" id="inputPuestoId" value=""/>
								</div>

									<label class="etiqueta t12">Participantes</label>
									<div class="cuadro_agregar float-right cursor" id="agregarParticipante" onclick="agregarParticipante();">+</div>
									<select class="filtro" id="participantes">
									<option value="" selected></option>
									</select> 
									
									
									<table id="tabla_participantes" class="hover">
									<thead style="display:none;">
									<tr>
										<th>entidadId</th>
										<th>nombre</th>
										<th>borrar</th>
									</tr>
									</thead>
									</table>
									
								
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer pie">
					<button type="button" class="t12 btn boton fblanco azul"
						data-dismiss="modal">Cancelar</button>
					<button type="button" class="t12 btn boton fazul blanco" onclick="enviaDatos()">Aceptar</button>
				
				</div>
			</div>
		</div>
	</div>
	

	<jsp:include page="/jsp/generic/loading.jsp" />
<jsp:include page="/jsp/generic/mensajes.jsp" />

	<!-- Bootstrap core JavaScript -->
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/js/utiles/utiles.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap-datepicker.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap-datepicker.es.min.js"></script>	
	<script src="${pageContext.request.contextPath}/DataTable/js/jquery.dataTables.min.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/moment.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/es.js"></script>
	<script	src="${pageContext.request.contextPath}/js/jquery/tempusdominus-bootstrap-4.min.js"></script>
	
	<script	src="${pageContext.request.contextPath}/js/agenda.js"></script>
	
	
	
	
	</body>
</html>