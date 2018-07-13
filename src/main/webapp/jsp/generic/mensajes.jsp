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
      <div class="modal-header blanco" id="mensajeHeader" style="padding-top:7px; padding-bottom:7px;">
        <div id="tituloMensaje">---</div>
        <button type="button" class="close blanco" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div id="descripcionMensaje">---</div>
      </div>
      <div class="modal-footer" style="justify-content: center; border:0;">
        <button type="button" class="btn fazul blanco" id="botonMensajeSi"  style="width: 70px; height: 30px; padding-top: 2px; margin-right: 20px; cursor: pointer;">Si</button>
        <button type="button" class="btn fazul blanco" id="botonMensajeNo" style="width: 70px; height: 30px; padding-top: 2px; margin-right: 20px; cursor: pointer;">No</button>
        <button type="button" class="btn fazul blanco" id="botonMensajeAceptar" style="width: 100px; height: 30px; padding-top: 2px; cursor: pointer;">Aceptar</button>
      </div>
    </div>
  </div>
</div> 