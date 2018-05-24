
<nav class="navbar justify-content-between navbar-expand-lg navbar_fondo navbar_borde">
	<span class="navbar-brand"> <img
		src="img/fondoBlanco.png">
	</span>
				<button class="navbar-toggler custom-toggler" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="navbar-collapse collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto ml-auto mt-2 mt-lg-0" >
						<li class="nav-item"><a id="iddashboard" class="nav-link" href="dashboard">Dashboard</a></li>
						<li class="nav-item"><a id="idasignadas" class="nav-link" href="asignadas">En Proceso</a></li>
						<li class="nav-item"><a id="idautorizadas" class="nav-link" href="autorizadas">Autorizadas</a></li>
						<li class="nav-item"><a id="idrechazadas" class="nav-link" href="rechazadas">Rechazadas</a></li>
						<li class="nav-item"><a id="idagenda" class="nav-link" href="agenda">Agenda</a></li>	
						<li class="nav-item"><a id="idlocalizador" class="nav-link" href="localizador">Localizador</a></li>	
					</ul>
					
		<form class="form-inline my-2 my-lg-0" style="padding-bottom:20px;">
			<span class="mr-sm-2 azul" style="font-size:11px;" id="fecha_header"></span>
			<span class="mr-sm-2"><a id="avisos" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom"
			data-content="
				<div class='popover_titulo azul'>Avisos</div>
				<div class='popover_opcion azul'><a href='asignadas'> Tienes 1 nueva MD</a></div>
				<div class='popover_opcion azul'><a href='agenda'>Reunión con Juan de la Cruz</a></div>
				<div class='popover_opcion azul'><a href='asignadas'>Tienes 4 MDs proximas a vencer</a></div>
			"><img src="img/web_AVISOS.png"></a></span>
		&nbsp;
		<span class="my-2 my-sm-0"><a id="perfil" tabindex="0" class="" role="" data-toggle="popover" data-trigger="focus" data-placement="bottom"
		data-content="
		<div class='popover_logout azul'><a href='Logout'> Cerrar Sesión</a></div>
		
		" ><img src="img/usuario.png" style="padding-right:15px;"></a></span>
		</form>
		</div>	
</nav>

