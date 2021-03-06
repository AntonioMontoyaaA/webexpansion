			<div class="col-lg-4" id="divAutorizacion" style="display: none;">
				<div class="row divs_p">
					<div id="divCalificacionFinal" class="col-lg-12 menupr_estilos fblanco altura1">
						<div class="col-12 titulo_seccion">
							<span class="negrita azul t14">AUTORIZACIÓN</span>
						</div>
						
						<div id="presupuesto" class="row subtituloIconos azul" style="display: none;">
							
							<span class="negrita azul tituloAutorizacion">Aire acondicionado</span>
							<input type="radio" name="acc" class="acc" value="1">Si
    						<input style="margin-left: 50px;" type="radio" name="acc" class="acc" value="0">No
							
							<span class="negrita azul tituloAutorizacion">Monto presupuestado</span>
							<label class="simbolo">$</label>
							<input class="inputNoPegar"  maxlength="9" id="montoPresupuesto" placeholder="Captura el monto del presupuesto" onkeypress="return isNumberKey(event,this)">
						</div>
						
						<div id="venta" class="row subtituloIconos azul" style="display: none;">
							<span class="negrita azul tituloAutorizacion">Venta semanal presupuestada</span>
							<label class="simbolo">$</label>
							<input class="inputNoPegar" maxlength="9" id="montoVenta" placeholder="Captura el monto de la venta presupuestada" onkeypress="return isNumberKey(event,this)">
						</div>
						
						<div id="ceco" class="row subtituloIconos azul" style="display: none;">
							<span class="negrita azul tituloAutorizacion">Centro de costos</span>
							<label class="simbolo">$</label>
							<input class="inputNoPegar" id="idCeco" maxlength="6" placeholder="Captura el numero de centro de costos" onkeypress="return isNumberKey(event,this)">
						</div>
						
						<div id="obra" class="row subtituloIconos azul" style="display: none;">
							<span class="negrita azul tituloAutorizacion">Inicio de la obra</span>
							<input style="border: 1px solid #071B36" id="inicioObra" readonly type="text" class="fechaInicialCalendario" placeholder="dd/MM/yyyy">
							
							<span class="negrita azul tituloAutorizacion">Duración de la obra</span>
							<select class="selectSemana" id="duracionObra">
								<option disabled selected value="0" >SEMANAS</option>
								<option value="4" >4</option>
								<option value="6" >6</option>
								<option value="8" >8</option>
								<option value="10" >10</option>
								<option value="12" >12</option>
							</select>
						</div>
						
						<div id="cargaDoctos" class="row subtituloIconos azul" style="display: none;">
							<span class="negrita azul tituloAutorizacion" style="padding-left: 10px;">Debes volver a subir el documento resaltado en rojo de la siguiente lista:</span>
							<div id="listaDoctos" style="padding-left: 10px;max-height: 100px; overflow-y: auto;">
								<span class="negrita azul">Predial</span><br>
								<span class="negrita azul">Carga de docto 1</span><br>
								<span class="negrita azul">Carga de docto 2</span><br>
								<span class="negrita azul">Carga de docto 3</span><br>
								<span class="negrita azul">Carga de docto 4</span><br>
								<span class="negrita azul">Carga de docto 4</span><br>
								<span class="negrita azul">Carga de docto 4</span><br>
								<span class="negrita azul">Carga de docto 4</span><br>
							</div>
						</div>
						
						<div id="fechaSimple" class="row subtituloIconos azul" style="display: none;">
							<span class="negrita azul tituloAutorizacion">Confirma la fecha de finalización de obra</span>
							<input style="border: 1px solid #071B36" id="simpleDate" readonly type="text" class="fechaInicialCalendario" placeholder="dd/MM/yyyy">
						</div>
						
						<div class="row center" style="padding-top: 110px;">
							<span id="msjFinalizacion" class="subtituloIconos azul">żDeseas autorizar esta MD?</span>
						</div>
						<div class="row center" id="botonesAutorizacion">
							<div id="rechazaMD" class="btnGris">No</div>
							<div id="autorizaMD" class="btnAzul">Si</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-12" id="manejadorArchivos" style="display: none;">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fblanco altura1">
						<div class="col-12 titulo_seccion">
							<span class="negrita azul t14">SEGUIMIENTO</span>
						</div>
						<div class="row div_header_sub">
							
							<div class="col-lg-2" id="tipoArchivos" style="background-color: #fafafa; height: 300px; overflow: auto;">
							
							</div>
							
							<div class="col-lg-10" id="archivos" style="height: 300px; overflow: auto;">
							
							</div>
							
							<div class="col-lg-3" id="subida" style="height: 300px;  display: none;">
								<form action="/uploadLayout" class="dropzone" id="uploader" style="overflow: auto; display: flex; align-items: center; padding: 0;"></form>
							</div>
						</div>
					</div>
				</div>
			</div>