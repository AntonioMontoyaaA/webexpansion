<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

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
						<c:if test="${permisos['PRIVILEGIO.MENU.VOKSE.16']}">
							<li id="aprobadasMenu" class="nav-item" style="display: none;"><a id="idaprobadas" class="nav-link blanco t12" href="aprobadas">Aprobadas</a></li>													
						</c:if> 
						
						
<!-- 						<li id="dashboardMenu" class="nav-item"><a id="iddashboard" class="nav-link blanco t12" href="dashboard">Dashboard</a></li> -->
<!-- 						<li id="tableroMenu" class="nav-item"><a id="idtablero" class="nav-link blanco t12" href="tablero">Tablero</a></li> -->
<!-- 						<li id="enProcesoMenu" class="nav-item"><a id="idasignadas" class="nav-link blanco t12" href="asignadas">En Proceso</a></li> -->
<!-- 						<li id="autorizadasMenu" class="nav-item"><a id="idautorizadas" class="nav-link blanco t12" href="autorizadas">Autorizadas</a></li> -->
<!-- 						<li id="rechazadasMenu" class="nav-item"><a id="idrechazadas" class="nav-link blanco t12" href="rechazadas">Rechazadas</a></li> -->
<!-- 						<li id="agendaMenu" class="nav-item"><a id="idagenda" class="nav-link blanco t12" href="agenda">Agenda</a></li>	 -->
<!-- 						<li id="localizadorMenu" class="nav-item"><a id="idlocalizador" class="nav-link blanco t12" href="localizador"> Localizador</a></li>	 -->
<!-- 						<li id="aprobadasMenu" class="nav-item" style="display: none;"><a id="idaprobadas" class="nav-link blanco t12" href="aprobadas">Aprobadas</a></li>	 -->
					</ul>
					
					<input id="perfilLogin" type="hidden" value="${usr.perfil.puestoId}"/>
					
		<form class="form-inline my-2 my-lg-0">
		<div class="text-right" style="padding-bottom:5px;">
			<span class="mr-sm-2 blanco t12">${usr.perfil.apellidoP} ${usr.perfil.nombre}</span><br>
			<span class="mr-sm-2 blanco t12" id="fecha_header"></span>
		</div>
			
			
		<span class="mr-sm-2"><a id="notificaciones" tabindex="0" role="tooltip" data-toggle="popover" data-trigger="focus" data-placement="bottom"
		data-template='<div class="popover1">
		 	<div class="arrow"></div>
		 	<h3 class="popover-header"></h3>
		 	<div class="popover-body"></div>
		 </div>' 
		 
		 ><img src="img/web_AVISOS.png"  style="margin-bottom:12px;"><div id="alerta_circulo"></div></a></span>
		&nbsp;
		
		<span class="my-2 my-sm-0"><a id="perfil" tabindex="0" role="tooltip" data-toggle="popover" data-trigger="focus" data-placement="bottom"
		 data-template='<div class="popover1">
		 	<div class="arrow"></div>
		 	<h3 class="popover-header"></h3>
		 	<div class="popover-body"></div>
		 </div>' 
                     
		data-content="<div>
		 <div class='t12 negrita azul titulo_avisos'>Opciones</div>
		 <!-- <div id='editaPerfil' class='cursor t12 negrita azul opcionPerfil' style='padding:5px 10px;' onclick='editaPerfil()'>Edita perfil </div> -->
		 <form id='logout' action='Logout'>
		 <div id='salir' class='cursor t12 negrita azul opcionPerfil' style='padding:5px 10px; margin-bottom:3px;' onclick='salir()'>Cerrar Sesión </div></form>
		 </div>" >
		 <img src="img/user.png" style="padding-right:15px; margin-bottom:15px;"></a></span>
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
        		<div class="circulo_imagen">
        			<img class="circulo_imagen" src="${usr.perfil.imagenusuario}">
        		</div>
        		 <input type="file" name="imagen_usuario" accept="image/*">
      	</div>
    <div class="espacio">      
    <div class="col-12"><span class="etiqueta negrita">Nombre</span></div>
      <div class="col-12"><input type="text" class="a_total" id="nombre_usuario" name="nombre_usuario" placeholder='${usr.perfil.nombre}'></div>
    <div class="col-12"><span class="etiqueta negrita">Apellido paterno</span></div>
      <div class="col-12"><input type="text" class="a_total" id="apellidoP_usuario" name="apellidoP_usuario" placeholder='${usr.perfil.apellidoP}'></div>
    <div class="col-12"><span class="etiqueta negrita">Apellido materno</span></div>
      <div class="col-12"><input type="text" class="a_total" id="apellidoM_usuario" name="apellidoM_usuario" placeholder='${usr.perfil.apellidoM}'></div>
    <div class="col-12 center"><span class="etiqueta" id="puesto_usuario" name="puesto_usuario">${usr.perfil.perfilesxusuario[0].nombreperfil}</span></div></div>
    
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">CONTACTO</span></div></div>
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">Celular</span></div>
      <div class="col-12"><input type="text" class="a_total" id="celular_usuario" name="celular_usuario" placeholder='${usr.perfil.telefono}'></div></div>
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">Email</span></div>
      <div class="col-12"><input type="text" class="a_total" id="email_usuario" name="email_usuario" placeholder='${usr.perfil.correo}'></div></div>

    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">CAMBIO CONTRASEÑA</span></div></div>
    <div class="espacio" style="margin-bottom:15;">
    
      <div class="col-12"><span class="etiqueta negrita" >Contraseña</span></div>
      <div class="col-12"><input type="text" class="a_total" id="contraseña_usuario" name="contraseña_usuario" placeholder='**********'></div></div>
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">Contraseña nueva</span></div>
      <div class="col-12"><input type="text" class="a_total" id="contraseñanueva_usuario" name="contraseñanueva_usuario" placeholder='**********'></div></div>
    <div class="espacio">
      <div class="col-12"><span class="etiqueta negrita">Repetir contraseña nueva</span></div>
      <div class="col-12"><input type="text" class="a_total" id="rcontraseñanueva_usuario" name="rcontraseñanueva_usuario" placeholder='**********'></div></div>
</form>
     
        <div class="row">
        	<div class="col-6 center"><button type="button" class="btn boton_usuario t14">Guardar</button></div>   
     		<div class="col-6 center"><button type="button" class="btn boton_usuario t14" data-dismiss="modal">Close</button></div>
    	</div>
      </div>
    </div>
  </div>
</div>
