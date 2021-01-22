<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
 <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dropzone/dropzone.css" />
 <link rel="stylesheet" href="${pageContext.request.contextPath}/css/utiles/modalImages.css" />
</head>

<nav class="navbar justify-content-between navbar-expand-lg navbar_fondo navbar_borde">
	<span class="navbar-brand"> <img
		src="img/logoBlanco.png" style="width:80px;">
	</span>
				<button class="navbar-toggler custom-toggler" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="navbar-collapse collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto ml-auto mt-2 mt-lg-0" >
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.7']}">
							<li id="dashboardMenu" class="nav-item"><a id="iddashboard" class="nav-link blanco t12" href="dashboard">Dashboard</a></li>					
						</c:if>
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.14']}">
							<li id="tableroMenu" class="nav-item"><a id="idtablero" class="nav-link blanco t12" href="tablero">Tablero</a></li>					
						</c:if>
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.8']}">
							<li id="enProcesoMenu" class="nav-item"><a id="idasignadas" class="nav-link blanco t12" href="asignadas">En Proceso</a></li>					
						</c:if>
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.9']}">
							<li id="autorizadasMenu" class="nav-item"><a id="idautorizadas" class="nav-link blanco t12" href="autorizadas">Autorizadas</a></li>					
						</c:if>
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.10']}">
							<li id="rechazadasMenu" class="nav-item"><a id="idrechazadas" class="nav-link blanco t12" href="rechazadas">Rechazadas</a></li>					
						</c:if>
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.11']}">
							<li id="agendaMenu" class="nav-item"><a id="idagenda" class="nav-link blanco t12" href="agenda">Agenda</a></li>						
						</c:if>
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.12']}">
							<li id="localizadorMenu" class="nav-item"><a id="idlocalizador" class="nav-link blanco t12" href="localizador"> Localizador</a></li>						
						</c:if> 
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.18']}">
							<li id="configuracionMenu" class="nav-item"><a id="idconfiguracion" class="nav-link blanco t12" href="configuracion"> Configuración</a></li>						
						</c:if> 
						
<%-- 						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.18']}"> --%>
<!-- 							<li id="productividadMenu" class="nav-item"><a id="idproductividad" class="nav-link blanco t12" href="productividad">Productividad</a>  -->
<%-- 						</c:if> --%>
						
							<!--  <li id="aprobadasMenu" class="nav-item" style="display: none;"><a id="idaprobadas" class="nav-link blanco t12" href="aprobadas">Aprobadas</a></li>	-->									
					</ul>
					
					<input id="perfilLogin" type="hidden" value="${usr.perfil.puestoId}"/>
					
		<form class="form-inline my-2 my-lg-0">
		<div class="text-right" style="padding-bottom:5px;">
			<span class="mr-sm-2 blanco t12"><span id="apPa_UsuarioHeader">${usr.perfil.apellidoP}</span><span id="nombre_UsuarioHeader"> ${usr.perfil.nombre}</span></span><br>
			<span class="mr-sm-2 blanco t12" id="fecha_header"></span>
		</div>
			
			
		<span class="mr-sm-2" onclick="showNotificaciones(1)">
			<img  class= "cursor" id= "bell_verde"  style="margin-bottom:12px;">
			<div id="alerta_circulo_verde"></div>
		</span>
<!-- 		&nbsp; -->
		<span class="mr-sm-2" onclick="showNotificaciones(2)">
			<img class= "cursor" id= "bell_rojo"  style="margin-bottom:12px;">
			<div id="alerta_circulo_rojo"></div>
		</span>
<!-- 		&nbsp; -->
		
		<span class="my-2 my-sm-0"><a id="perfil" tabindex="0" role="tooltip" data-toggle="popover" data-trigger="focus" data-placement="bottom"
		 data-template='<div class="popover1">
		 	<div class="arrow"></div>
		 	<h3 class="popover-header"></h3>
		 	<div class="popover-body"></div>
		 </div>' 
                     
		data-content="<div>
		 <div class='t12 negrita azul titulo_avisos'>Opciones</div>
		 <div id='editaPerfil' class='cursor t12 negrita azul opcionPerfil' style='padding:5px 10px;' onclick='editaPerfil()'>Edita perfil </div>
		 <c:if test= "${editaImei}"> <div id='editaIMEI' class='cursor t12 negrita azul opcionPerfil' style='padding:5px 10px;' onclick='modalID()'>Cambiar IMEI</div></c:if>
		 <c:if test= "${subeFotosMD}"> <div id='subirFotos' class='cursor t12 negrita azul opcionPerfil' style='padding:5px 10px;' onclick='subirFotosMD()'>Subir Fotos MD</div></c:if>
		 <form id='logout' action='Logout'>
		 <div id='salir' class='cursor t12 negrita azul opcionPerfil' style='padding:5px 10px; margin-bottom:3px;' onclick='salir()'>Cerrar Sesión </div></form>
		 </div>">
		 
		 
		 <c:choose> 
		  <c:when test="${empty  usr.perfil.imagenusuario}">
		  	<div class="circulo_imagen_inicio" >
	      		<img src="img/user.png" style="margin-bottom: 15px; border-radius: 50%; width: 23px; height: 23px;">
	      	</div>
		  </c:when>
		  <c:otherwise>
		  	<div class="circulo_imagen_inicio" >
		    	<img src="${usr.perfil.imagenusuario}" style="margin-bottom: 15px; background: WHITE; border-radius: 50%; width: 30px; height: 30px;">
		    </div>
		  </c:otherwise>
		</c:choose>
		 
		 </a></span>
		</form>
		</div>	
</nav>
				
				
<!-- Modal perfil -->
<div class="modal fade" id="modal_perfil" >
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="background:transparent;">
      <div  class="modal-body" id="cuerpo_modal">
     
<form action="editaPerfilAction" method="POST">
 		
	<div class="col-12 center" style="height: 50;">
		<c:choose> 
		  <c:when test="${empty  usr.perfil.imagenusuario}">
	      		<div class="circulo_imagen" >
				     <img class="circulo_imagen" style="display: none; position: initial;" src="${usr.perfil.imagenusuario}" relInit="${usr.perfil.imagenusuario}" >
	      		</div>
		  </c:when>
		  <c:otherwise>
		  <div class="circulo_imagen" style="background : white;">
		     <img class="circulo_imagen" style="position: initial; background : white;" src="${usr.perfil.imagenusuario}" relInit="${usr.perfil.imagenusuario}">
		     </div>
		  </c:otherwise> 
		</c:choose>

      	<input type="file" id="img_usuario" name="imagen_usuario" accept="image/x-png" style="display: none;">
     </div>
    <div class="espacio">      
    <div class="col-12"><span class="etiqueta negrita">Nombre</span></div>
      <div class="col-12"><input type="text" class="a_total" maxlength="50" onkeyup="validaNombre(this);"  id="nombre_usuario" name="nombre_usuario" placeholder='${usr.perfil.nombre}' readonly></div>
    <div class="col-12"><span class="etiqueta negrita">Apellido paterno</span></div>
      <div class="col-12"><input type="text" class="a_total" maxlength="50" onkeyup="validaApellido(this);" id="apellidoP_usuario" name="apellidoP_usuario" placeholder='${usr.perfil.apellidoP}' readonly></div>
    <div class="col-12"><span class="etiqueta negrita">Apellido materno</span></div>
      <div class="col-12"><input type="text" class="a_total" maxlength="50" onkeyup="validaApellido(this);" id="apellidoM_usuario" name="apellidoM_usuario" placeholder='${usr.perfil.apellidoM}' readonly></div>
    <div class="col-12 center"><span class="etiqueta" id="puesto_usuario" name="puesto_usuario">${usr.perfil.perfilesxusuario[0].nombreperfil}</span></div></div>
    
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">CONTACTO</span></div></div>
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">Celular</span></div>
      <div class="col-12"><input type="text" class="a_total" maxlength="15" onkeyup="validaCelular(this);"  id="celular_usuario" name="celular_usuario" placeholder='${usr.perfil.telefono}'></div></div>
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">Email</span></div>
      <div class="col-12"><input type="text" class="a_total" maxlength="50" onkeyup="validaEmail(this);"  id="email_usuario" name="email_usuario" placeholder='${usr.perfil.correo}'></div></div>

    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">CAMBIO CONTRASEÑA</span></div></div>
    <div class="espacio" style="margin-bottom:15;">
    
      <div class="col-12"><span class="etiqueta negrita" >Contraseña</span></div>
      <div class="col-12"><input type="text" class="a_total" maxlength="50" id="contraseña_usuario" name="contraseña_usuario" placeholder='**********'></div></div>
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">Contraseña nueva</span></div>
      <div class="col-12"><input type="text" class="a_total" maxlength="50" id="contraseñanueva_usuario" name="contraseñanueva_usuario" placeholder='**********'></div></div>
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">Repetir contraseña nueva</span></div>
      <div class="col-12"><input type="text" class="a_total" maxlength="50" id="rcontraseñanueva_usuario" name="rcontraseñanueva_usuario" placeholder='**********'></div></div>
        <div class="row">
        	<div class="col-6 center"><button type="button" id="GuardarDatosPerfil" class="btn boton_datosPerfil t14" data-dismiss="modal">Guardar</button></div>   
     		<div class="col-6 center"><button type="button" id="CloseDatosPerfil" class="btn boton_datosPerfil t14" data-dismiss="modal">Cerrar</button></div>
    	</div>
</form>

      </div>
    </div>
  </div>
</div>

<!-- NOTIFICACIONES -->
	<div class="modal fade" id="modal_notificaciones" >
		<div class="modal-dialog" role="document">
   			<div class="modal-content" style="background:transparent;">
      			<div  class="modal-body" id="cuerpo_modal" style="background-color: #FFF">
      				<div class="segmentoNotificaciones">
      					<div class="tituloNotificaciones azul negrita t18">Notificaciones</div>
      						<!-- <div class="tituloNotificaciones grisNot t12 leidos">Marcar todos como leídos</div>-->
      				</div>
      				<div class="segmentoNotificaciones1" style="text-align: center; display: none;">
      					<label id="not01" class="opcionNotificacion grisNot t14">Autorizadas</label>
      					<label id="not02" class="opcionNotificacion grisNot t14">Pausadas</label>
      				</div>
      				<div class="segmentoNotificaciones2" style="text-align: center; display: none;">
      					<label id="not03" class="opcionNotificacion grisNot t14">Canceladas</label>
      					<label id="not04" class="opcionNotificacion grisNot t14">Rechazadas</label>
      					<div class="drop">
						  <select name="slct" id="select" class= "s_drop" onchange="ShowSelectedItem()">
						    <option class= "drop_option" value="2">Semana</option>
						    <option class= "drop_option" value="3">Mes</option>
						    <option class= "drop_option" value="4">Año</option>
						  </select>
						</div>
      				</div>
      				<div class="contenedorNotificaciones">
      				</div>
     			</div>
    		</div>
  		</div>
	</div>

<!-- MODAL EDITAR IMEI -->
<div class="modal fade" id="modal_id" >
  <div class="modal-dialog" role="document" style= "top: 25%;">
    <div class="modal-content" style="background:transparent;">
      <div  class="modal-body px-0 py-0" id="cuerpo_modal">
     

 		<div class="col-12 justify-content-center d-flex" style="background-color: #071b36; color: #FFFFFF"><span class="my-3 negrita ">CAMBIAR IMEI</span></div>
	
  		<div class="espacio"></div>
	 	<div class="contentImei px-3 py-3" >
					
					<div  style="padding-bottom: 15px;" class="row mx-0">
					<span class="etiqueta negrita px-0 col-2">GERENTE:</span>
				      	<select style="width: 251px; background: transparent;" id="select_employeeMDGereModal" class="chosen-select s_drop col-10">
				      		<option class="drop_option" value="0">Seleccionar gerente</option>
				      	</select>
				     </div>
				     
				     <div  style="padding-bottom: 15px;" class="row mx-0">
				     	<span class="etiqueta negrita px-0 col-2">JEFE:</span>
				      	<select style="width: 251px; background: transparent;" id="select_employeeMDJefesModal"  class="chosen-select s_drop col-10 ">
				      		<option class="drop_option" value="0">Sin jefes</option>
				      	</select>
				     </div>
				     <div class="col-12 mx-0 row px-0">
				     <span class="etiqueta negrita col-2 px-0">IMEI:</span>
					     <div class="col-10 px-0">
	   		   				<input type="text" class="w-100" maxlength="100" id="imei_Id" autocomplete = "off">
	   		   			</div>
				     </div>
   		   
		  <div class="row mt-4">
		        	<div class="col-6 center"><button type="button" id="guardarImei" class="btn boton_datosPerfil t14 btn_modal" data-dismiss="modal">Guardar</button></div>   
		     		<div class="col-6 center"><button type="button" class="btn boton_datosPerfil t14 btn_modal" data-dismiss="modal">Cerrar</button></div>
		   </div>
		</div>
				


      </div>
    </div>
  </div>
</div>


<!-- SUBIR FOTOS MD-->
<div class="modal fade" id="modal_fotos" data-backdrop="static" >
  <div class="modal-dialog-centered modal-dialog" style = "min-width: 1000px !important; margin: 1.75rem auto;">
    <div class="modal-content" style="background:transparent;">
      <div  class="modal-body px-0 py-0" id="cuerpo_modal" >
     

 		<div class="col-12 justify-content-center d-flex" style="background-color: #071b36; color: #FFFFFF;">
 		<span class="my-3 negrita ">SUBIR FOTOS MD</span></div>
	
	 	<div class="content px-3 py-4" >		
		 	<div class="row mx-0 px-0 col-12">
		 		<div  style="padding-bottom: 15px;" class="row mx-0 col">
					<span class="etiqueta negrita t16 px-0 col-3 ">GERENTE:</span>
			      	<select style="background: transparent; font-size: 16px;" id="select_gerenteMD" class="chosen-select s_drop col-9" onchange="cargaMDXUsuario()" onclick="verificaCambiosModal(1)">
			      		<option class="drop_option" value="0">Seleccionar gerente</option>
			      	</select>
			     </div>
			     
			     <div style="padding-bottom: 15px;" class="row mx-0 col">
			     	<span class="etiqueta negrita t16 px-0 col-2">JEFE:</span>
			      	<select style="background: transparent; font-size: 16px;" id="select_jefes_fotos"  class="chosen-select s_drop col-10 " onclick="verificaCambiosModal(1)">
			      		<option class="drop_option" value="0">Sin jefes</option>
			      	</select>
			     </div>
			     
			      <div style="padding-bottom: 15px; max-width: 300px;" class="row mx-0 col px-0">
			     	<span class="etiqueta negrita  t16 px-0 mr-2">MD:</span>
			      	<select style="background: transparent; font-size: 16px;" id="select_MD"  class="chosen-select s_drop col-9 px-0" onclick="verificaCambiosModal(1)">
			      		<option class="drop_option" value="0">Sin MD's</option>
			      	</select>
			     </div>
		 	</div>
		
			
   		   <div class="col-lg-12 col-12 " id= "contenidoMd" style="display:none" >
				<div class="row divs_p galeria_main">
					<div class="div_galeria col-lg-12 menupr_estilos fblanco">
						<div class="row titulo_seccion justify-content-end ">
<!-- 							<div class="col-lg-8 col-6"> -->
<!-- 								<span class="titulo_detalle_md_20">SUPERFICIE</span> -->
<!-- 							</div> -->
							<div class="mr-4 mt-2">
								<input type="checkbox" class="form-check-input esquina" id="esquinaModal" >
    							<label class="contenido_cajas_20 esquina" for="esquina" style = "color: #585555">Local en esquina</label>
							</div>
<!-- 							<div class="col-lg-2 col-2 text-right"> -->
<!-- 								<a id="superficieTip" tabindex="0" class="question_mark b_tip" -->
<!-- 										role="" data-toggle="popover" data-trigger="focus" -->
<!-- 										data-placement="bottom" data-content=""> <img -->
<!-- 										style="cursor: pointer;" src="img/question.png"> -->
<!-- 									</a> -->
<!-- 							</div> -->
						</div>
						<div class="row div_header_sub mb-3" id="modulo3Datos">
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20 etiqueta negrita t16 ">FRENTE</span>&nbsp;&nbsp;&nbsp;
								<input id="frenteMdModal" type="text" class="text_edita" style ="width: 100px" onkeyup = "recalculaTotal(this, 1)"/> mts</span>
							</div>
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20 etiqueta negrita t16 ">PROFUNDIDAD</span>&nbsp;&nbsp;&nbsp;
								<input id="profundidadMdModal" type="text" class="text_edita" style ="width: 56px" onkeyup = "recalculaTotal(this, 2)"/> mts</span>
							</div>
							<div class="col-lg-4">
								<span class="titulo_detalle_md_20 etiqueta negrita t16 ">SUPERFICIE TOTAL</span>&nbsp;&nbsp;&nbsp;
								<span id="tamanioTotalMdModal" class="contenido_cajas_20 sangria_cuerpo">---</span>
							</div>
						</div>
						<div  style= "overflow-y: auto; overflow-x: hidden; max-height: 480px" >
						<div class="row div_header_subs">
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="contenido_cajas_20">LATERAL 1</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
										<img class="imagenModal" id="vistaLateral1MdModal" alt="LATERAL 1"
										style="width: 100%; max-height: 170px; display: none;" src="img/cargando_imagen.gif"
										onclick="modalImage(this); " />
										<img class = "img_edit" alt="" src="img/rechaza_mark.png" onclick="" id="0">
										<div class="pb-1 pt-1"  style="height: 170px;" id="subidaLateral1">
											<div  file="fileLateral1"  class="drop_file w-100" id= "_lateral1-0" ></div>
											<input type="file" class="var_pdfUpload" file="fileLateral1" name="del formato de validación"  accept="image/*" style="display: none;">
										</div>
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaLateral1Modal" class="footerDetalleMd t11">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaLateral1Modal" class="footerDetalleMd t11">---</span>
									</div>
								</div>
							</div>
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="contenido_cajas_20">VISTA FRONTAL</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="vistaFrontalMdModal"
										alt="VISTA FRONTAL" style="width: 100%; max-height: 170px; display: none;"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
									<img class = "img_edit" alt="" src="img/rechaza_mark.png" onclick="" id="1">
									<div class="pb-1 pt-1"  style="height: 170px;" id = "subidaFrontal" >
											<div file="fileFrontal" class="drop_file w-100" id= "_frontal-1" ></div>
											<input type="file" class="var_pdfUpload" file="fileFrontal" name="del formato de validación"  accept="image/*" style="display: none;">
										</div>
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaFrontalModal" class="footerDetalleMd t11">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaFrontalModal" class="footerDetalleMd t11">---</span>
									</div>
								</div>
							</div>
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="contenido_cajas_20">LATERAL 2</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="vistaLateral2MdModal" alt="LATERAL 2"
										style="width: 100%; max-height: 170px; display: none;" src="img/cargando_imagen.gif"
										onclick="modalImage(this)" />
									<img class = "img_edit" alt="" src="img/rechaza_mark.png" onclick="" id="2" style ="display: none">
									<div class="pb-1 pt-1"  style="height: 170px;" id="subidaLateral2">
											<div file="fileLateral2" class="drop_file w-100" id= "_lateral2-2" ></div>
											<input type="file" class="var_pdfUpload" file="fileLateral2" name="del formato de validación"  accept="image/*" style="display: none;">
										</div>
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaLateral2Modal" class="footerDetalleMd t11">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaLateral2Modal" class="footerDetalleMd t11">---</span>
									</div>
								</div>
							</div>
						</div>
						<div class="row div_header_sub my-3">
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="contenido_cajas_20">ENTORNO 1</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="vistaEntorno1MdModal" alt="ENTORNO 1"
										style="width: 100%; max-height: 170px; display:none;" src="img/cargando_imagen.gif"
										onclick="modalImage(this)" />
									<img class = "img_edit" alt="" src="img/rechaza_mark.png" onclick="" id="3" style ="display: none">
									<div class="pb-1 pt-1"  style="height: 170px;" id= "subidaEnt1" >
											<div file="entorno1" class="drop_file w-100" id= "_entorno1-3" ></div>
											<input type="file" class="var_pdfUpload" file="entorno1" name="del formato de validación"  accept="image/*" style="display: none;">
										</div>
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaEntorno1Modal" class="footerDetalleMd t11">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaEntorno1Modal" class="footerDetalleMd t11">---</span>
									</div>
								</div>
							</div>
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="contenido_cajas_20">ENTORNO 2</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="vistaEntorno2MdModal"
										alt="ENTORNO 2" style="width: 100%; max-height: 170px; display: none"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
									<img class = "img_edit" alt="" src="img/rechaza_mark.png" onclick="" id="4" style ="display: none">
									<div class="pb-1 pt-1"  style="height: 170px;" id= "subidaEnt2"  >
											<div file="entorno2" class="drop_file w-100" id= "_entorno2-4" ></div>
											<input type="file" class="var_pdfUpload" file="entorno2" name="del formato de validación"  accept="image/*" style="display: none;">
										</div>
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaEntorno2Modal" class="footerDetalleMd t11">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaEntorno2Modal" class="footerDetalleMd t11">---</span>
									</div>
								</div>
							</div>
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="contenido_cajas_20">ENTORNO 3</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="vistaEntorno3MdModal" alt="ENTORNO 3"
										style="width: 100%; max-height: 170px; display: none;" src="img/cargando_imagen.gif"
										onclick="modalImage(this)" />
									<img class = "img_edit" alt="" src="img/rechaza_mark.png" onclick="" id="5" style ="display: none">
									<div class="pb-1 pt-1"  style="height: 170px;" id= "subidaEnt3" >
											<div file="entorno3" class="drop_file w-100" id= "_entorno3-5" ></div>
											<input type="file" class="var_pdfUpload" file="entorno3" name="del formato de validación"  accept="image/*" style="display: none;">
										</div>
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaEntorno3Modal" class="footerDetalleMd t11">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaEntorno3Modal" class="footerDetalleMd t11">---</span>
									</div>
								</div>
							</div>
						</div>
						<div class="row div_header_sub" id="div_predial" style = "display: none">
							
							<div class="col-lg-4">
								
							</div>
							
							<div class="col-lg-4">
								<div class="col-lg-12" style="padding:0;">
									<span class="contenido_cajas_20">PREDIAL</span>
								</div>
								<div class="col-lg-12" style="padding:0;">
									<img class="imagenModal" id="img_predialModal"
										alt="" style="width: 100%; max-height: 170px; display: none"
										src="img/cargando_imagen.gif" onclick="modalImage(this)" />
									<img class = "img_edit" alt="" src="img/rechaza_mark.png" onclick="" id="6" style ="display: none">
									<div class="pb-1 pt-1"  style="height: 170px;" id= "subidaPredial"  >
											<div file="entorno2" class="drop_file w-100" id= "_predial-6" ></div>
											<input type="file" class="var_pdfUpload" file="entorno2" name="del formato de validación"  accept="image/*" style="display: none;">
										</div>
								</div>
								<div class="row div_bottom">
									<div class="col-lg-6" style="text-align: right;">
										<span id="fechaVistaPredialModal" class="footerDetalleMd t11">---</span>
									</div>
									<div class="col-lg-6" style="text-align: left;">
										<span id="horaVistaPredialModal" class="footerDetalleMd t1">---</span>
									</div>
								</div>
							</div>
							
							<div class="col-lg-4">
							
							</div>
						</div>
					
						</div>
						
					</div>
					<!-- <div class="div_galeria_dos">Nuevas fotos</div> -->
				</div>
			</div>

		
		  <div class="row" id= "botonesMd" style="display:none" >
		        	<div class="col-6 center"><button type="button" id="guardarFotosMD" class="btn boton_datosPerfil t14 btn_modal" >Guardar</button></div>   
		     		<div class="col-6 center"><button type="button" id="close_btn" class="btn boton_datosPerfil t14 btn_modal" onclick="verificaCambiosModal(0)" >Cerrar</button></div>
		     		<div class="col-6 center"><button type="button" id="close_fotos" data-dismiss="modal" class="btn boton_datosPerfil t14 btn_modal" style="display: none" >Cerrar</button></div>
		     		
		   </div>
		 	<div class="row" id= "botonMd" >
		        	
		     		<div class="col-12 center"><button type="button" id="close_fotos" data-dismiss="modal" class="btn boton_datosPerfil t14 btn_modal" >Cerrar</button></div>
		     		
		   </div>
		   
		</div>
				


      </div>
    </div>
  </div>
</div>

<div id="modalImages" class="modalImagen" style= "z-index: 9999" >
 <span class="closeModal">&times;</span>
	<div class="row" style="width:100%;">
		<div class="col-6">
			<div class="t18 blanco negrita" id="captionModal"></div>
		</div>
		<div class="col-5 right" style="padding-right:30px;">
			<input type="button" class="btn desp" id="derecha" onclick="rotar(0);">
			<input type="button" class="btn desp" id="izquierda" onclick="rotar(1);">
			<input type="button" class="btn desp" id="aumentar" onclick="rotar(3);">
			<input type="button" class="btn desp" id="disminuir" onclick="rotar(4);">
		</div>
	</div>
	<div id="contenedor-imagen">
	<div style="width:100%; height: -webkit-fill-available;"><img class="modal-content rotate_left" id="imageModal" ></div>
	</div>
	
</div>
<c:forEach var="permiso" items="${permisos}">
	<input type="hidden" class="permisos_sub" value="${permiso}">
</c:forEach>	
<script src="${pageContext.request.contextPath}/js/dropzone/dropzone.js"></script>
<script	src="${pageContext.request.contextPath}/js/dropzone/dateFormat.js"></script>
<script	src="${pageContext.request.contextPath}/js/utiles/modalImages.js"></script>
   
