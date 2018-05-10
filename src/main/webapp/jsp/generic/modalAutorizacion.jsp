<div class="modal" id="modal_autorizacion" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div id="tituloModalAutorizacion">---</div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div id="comboMotivos" style="padding-bottom: 15px;">
      	<select id="motivoRechazo" class="motivoRechazo">
      		<option value="0">:: Elegir motivo de rechazo ::</option>
      	</select>
      </div>
       <div id="detalleMensajeModal">
       		<textarea class="textAreaModal" placeholder="Escribir un comentario"></textarea>
       </div>
      </div>
      <div class="modal-footer" style="background: #C9C9C9; justify-content: center">
        <button type="button" class="btn" id="btnModalAutorizacion" style="width: 100px; height: 30px; background: #01579B; padding-top: 4px; cursor: pointer;color: #FFFFFF;">Aceptar</button>
        <input type="hidden" id="tipoAutorizacion" />
        <input type="hidden" id="moduloId" />
        <input type="hidden" id="mdIdAutorizacion" />
      </div>
    </div>
  </div>
</div> 