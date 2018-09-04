<div class="col-lg-4" id="voboMD">
				<div class="row divs_p">
					<div id="divCalificacionFinal" class="col-lg-12 menupr_estilos fazul altura1">
						<div class="col-12 titulo_seccion">
							<span class="negrita blanco t14">8) Autorización final</span>
							<%-- <div class="float_right">
								<span> <img id="autoriza8" title="Autoriza punto"
									class="sin_autorizar b_autorizar" onclick="finalizaMD(1);"
									style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
								</span> <span> <img id="rechaza8" title="Rechaza punto"
									class="sin_autorizar b_rechazar" onclick="finalizaMD(0);"
									style="cursor: pointer;" src="img/rechaza_mark.png">
								</span>
							</div> --%>
						</div>

						<%-- <div
							style="width: 100%; position: relative; float: left; text-align: left; padding-top: 20px;">
							<div id="containerProgreso"></div>
						</div>
						<div
							style="width: 100%; position: relative; float: left; text-align: center; padding-top: 20px;">
							<span class="subtituloIconos blanco"></span>
						</div> --%>
						
						<div class="row center" style="padding-top: 130px;">
							<span id="msjFinalizacion" class="subtituloIconos blanco">¿La MD cuenta con todos los puntos necesarios?</span>
						</div>
						<div class="row">
							<div class="col-6 right">
								<button id="rechaza8" class="btn desp" type="button" onclick="finalizaMD(0);">No</button>
							</div>
							<div class="col-6 left">
								<button id="autoriza8" class="btn desp" type="button" onclick="finalizaMD(1);">Si</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="col-lg-4" id="voboFinal" style="display: none;">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fazul altura1">
						<div class="col-12 titulo_seccion">
							<span class="negrita blanco t14">8) Autorización final</span>
							<div class="float_right">
								<span> <img id="autoriza9" title="Autoriza punto"
									class="sin_autorizar b_autorizar" onclick="finalizaMD(1);"
									style="cursor: pointer;" src="img/autoriza_mark.png">&nbsp;
								</span> 
								<span> <img id="rechaza9" title="Rechaza punto"
									class="sin_autorizar b_rechazar" onclick="finalizaMD(0);"
									style="cursor: pointer;" src="img/rechaza_mark.png">
								</span>
							</div>
							<div id="tiendaIdCECO" class="float_right" style="display: none;">
								<input placeholder="CECO" id="tiendaID" onkeypress="return isNumberKey(event,this)">
								<div id="subeTiendaId" class="btn btnBlanco">Aceptar</div>
							</div>
						</div>

						<div style="width: 100%; position: relative; float: left; text-align: left; padding-top: 20px;">
							<div id="containerFilesVoboFinal"></div>
							
							<div id="containerFechasObra" style="display: none; text-align: center;">
								<div class="datoObra">
									<div class="blanco t14">Inicio de obra:</div>
									<input id="inicioObra" readonly type="text" class="fechaInicialCalendario" placeholder="dd/MM/yyyy">
								</div>
								
								<div class="datoObra">
									<div class="blanco t14">Duración de la obra:</div>
									<select class="selectSemana" id="duracionObra">
										<option disabled selected value="0" >SEMANAS</option>
										<option value="4" >4</option>
										<option value="6" >6</option>
										<option value="8" >8</option>
										<option value="10" >10</option>
										<option value="12" >12</option>
									</select>
								</div>
								
								<div id="subeObra" class="btn btnBlanco">Aceptar</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-12" id="manejadorArchivos" style="display: none;">
				<div class="row divs_p">
					<div class="col-lg-12 menupr_estilos fazul altura1">
						<div class="col-12 titulo_seccion">
							<span class="negrita blanco t14">** Documentos **</span>
						</div>
						<div class="row div_header_sub">
							
							<div class="col-lg-4"><!-- DropZone -->
								<div style="display: none;" id="msjUploader"></div>
								<div id="contenedorUploader">
									<form action="/uploadLayout" class="dropzone" id="uploader"></form>
									<div id="divACC">
										<input type="checkbox" id="checkACC">
    									<label class="blanco" for="checkACC">ACC</label>
									</div>
									<span class="simbolo">$</span>
									<input id="montoPresupuesto" onkeypress="return isNumberKey(event,this)" style="display: none;">
									<div id="subeArchivo" class="btn btnBlanco" style="display:none;">Aceptar</div>
									
								</div>
							</div>
							
							
							<div class="col-lg-4"><!-- Files -->
								<div class="filesMD"></div>
							</div>
							<div class="col-lg-4"><!-- Comments -->
								<div class="commentsByFile"></div>
								<div class="commentFileContainer" style="display: none;">
									<div class="tituloComment"></div>
									<div id="motivoRechazoLayout"></div>
									<textarea rows="4" cols="50" id="commentFile"></textarea>
									<div id="submitComment" class="btn btnBlanco">Aceptar</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> 231231