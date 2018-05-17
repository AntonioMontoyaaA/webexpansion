<!--  <div class="mensajes_modal" id="mensajes_modal">
	<div class="mensaje" id="mensaje">
		<div id="mensajeHeader" style="height: 20%; width: 100%; background: #55a4f3; text-align: center; display: table;"><div id="tituloMensaje">---</div></div>
		<div style="height: 60%; width: 100%; background: #FFFFFF; text-align: center; display: table;"><div id="descripcionMensaje">---</div></div>
		<div style="height: 20%; width: 100%; background: #FFFFFF; text-align: center; display: inline-grid;">
			<div id="botonesMensaje">
				<div id="botonMensajeSi" style="width: 70px; height: 30px; background: #2E7D32; padding-top: 4px; margin-right: 20px; cursor: pointer;">SI</div>
				<div id="botonMensajeNo" style="width: 70px; height: 30px; background: #B71C1C; padding-top: 4px; margin-right: 20px; cursor: pointer;">NO</div>
				<div id="botonMensajeAceptar" style="width: 100px; height: 30px; background: #01579B; padding-top: 4px; cursor: pointer;">ACEPTAR</div>
			</div>
		</div>
	</div>
</div>  -->

 <div class="modal" id="mensajes_modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header" id="mensajeHeader" >
        <div id="tituloMensaje">---</div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div id="descripcionMensaje">---</div>
      </div>
      <div class="modal-footer" style="background: #C9C9C9; justify-content: center; color: #FFFFFF;">
        <button type="button" class="btn" id="botonMensajeSi"  style="width: 70px; height: 30px; background: #2E7D32; padding-top: 4px; margin-right: 20px; cursor: pointer;color: #FFFFFF;">Si</button>
        <button type="button" class="btn" id="botonMensajeNo" style="width: 70px; height: 30px; background: #B71C1C; padding-top: 4px; margin-right: 20px; cursor: pointer;color: #FFFFFF;">No</button>
        <button type="button" class="btn" id="botonMensajeAceptar" style="width: 100px; height: 30px; background: #01579B; padding-top: 4px; cursor: pointer;color: #FFFFFF;">Aceptar</button>
      </div>
    </div>
  </div>
</div> 