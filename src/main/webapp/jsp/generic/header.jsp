

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
						<li class="nav-item"><a id="iddashboard" class="nav-link blanco t12" href="dashboard">Dashboard</a></li>
						<li class="nav-item"><a id="idtablero" class="nav-link blanco t12" href="tablero">Tablero</a></li>
						<li class="nav-item"><a id="idasignadas" class="nav-link blanco t12" href="asignadas">En Proceso</a></li>
						<li class="nav-item"><a id="idautorizadas" class="nav-link blanco t12" href="autorizadas">Autorizadas</a></li>
						<li class="nav-item"><a id="idrechazadas" class="nav-link blanco t12" href="rechazadas">Rechazadas</a></li>
						<li class="nav-item"><a id="idagenda" class="nav-link blanco t12" href="agenda">Agenda</a></li>	
						<li class="nav-item"><a id="idlocalizador" class="nav-link blanco t12" href="localizador">Localizador</a></li>	
						<li class="nav-item"><a id="idaprobadas" class="nav-link blanco t12" href="aprobadas">Aprobadas</a></li>	
					</ul>
					
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
		 
		 ><img src="img/web_AVISOS.png"  style="margin-bottom:13px;"></a></span>
		&nbsp;
		
		<span class="my-2 my-sm-0"><a id="salir" tabindex="0" role="tooltip" data-toggle="popover" data-trigger="focus" data-placement="bottom"
		 data-template='<div class="popover1">
		 	<div class="arrow"></div>
		 	<h3 class="popover-header"></h3>
		 	<div class="popover-body"></div>
		 </div>' 
                     
		data-content="<form id='logout' action='Logout'>
		 <div id='salir' class='cursor t14 negrita azul' onclick='salir()'>Cerrar Sesión </div>
		</form>" >
		<img src="img/user.png" style="padding-right:15px; margin-bottom:15px;"></a></span>
		</form>
		</div>	
</nav>

