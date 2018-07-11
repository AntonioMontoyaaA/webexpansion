
<nav class="navbar justify-content-between navbar-expand-lg navbar_fondo navbar_borde">
	<span class="navbar-brand"> <img
		src="img/logoBlanco.png">
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
						<li class="nav-item"><a id="idlocalizador" class="nav-link blanco t12" href="aprobadas">Aprobadas</a></li>	
					</ul>
					
		<form class="form-inline my-2 my-lg-0">
		<div class="text-right" style="padding-bottom:5px;">
			<span class="mr-sm-2 blanco t12">${usr.perfil.apellidoP} ${usr.perfil.nombre}</span><br>
			<span class="mr-sm-2 blanco t12" id="fecha_header"></span>
		</div>
			
			
		<span class="mr-sm-2"><a id="avisos" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom"
			data-content="
				<div class='popover_titulo azul'>Avisos</div>
				<div class='popover_opcion azul'><a href='asignadas'> Tienes 1 nueva MD</a></div>
				<div class='popover_opcion azul'><a href='agenda'>Reunión con Juan de la Cruz</a></div>
				<div class='popover_opcion azul'><a href='asignadas'>Tienes 4 MDs proximas a vencer</a></div>
			"><img src="img/web_AVISOS.png"  style="margin-bottom:13px;"></a></span>
		&nbsp;
		
		<span class="my-2 my-sm-0"><a id="perfil" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom"
		data-content="
		<div class='popover_logout azul'><a href='Logout'> Cerrar Sesión</a></div>" >
		<img src="img/user.png" style="padding-right:15px; margin-bottom:15px;"></a></span>
		</form>
		</div>	
</nav>

