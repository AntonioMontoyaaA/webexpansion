<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!-- &emsp;  &nbsp;-->
<html>
<head>
<link rel="shortcut icon" href="img/favicon.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/login.css" />

<title>Login</title>
</head>

<body>
	<div class="bg-image">
	<div class="vertical-center center">
		<div class="contenedor">
			<div class="row center margenVEntreExagonos">
				<div class="center margenHEntreExagonos altoExagono">
					<div class="hexagonB">
						<div class="hexagon-in1B">
							<div class="hexagon-in2B font-weight-bold">
								<div class="hexagon">
									<div class="hexagon-in1" href="#">
										<div class="hexagon-in2 font-weight-bold">
											<div class="vertical-center-exagono center">
												<div class="row">
													<label class="tamFuenteTituloExagono">VOKSE</label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<form action='Login' method="POST" onsubmit="return validacion();" id="login_submit">	
			<div class="row center margenVEntreExagonos">
				<div class="center margenHEntreExagonos altoExagono">
					<div class="hexagonB">
						<div class="hexagon-in1B">
							<span class="hexagon-in2B">
								<div class="hexagon" onclick="ocultauser();"  style="cursor:pointer;">
									<div class="hexagon-in1">
										<div class="hexagon-in2">
											<div class="vertical-center-exagono center cursor" id="hexa_user">
												<div class="row inicio_user">
														<img src="img/neto-user.png">
												</div>
												<div class="row inicio_user2 center">
														<div class="imagen"><img src="img/neto-user.png" class="img-exagono-max"></div>
															<div class="mensajeerror">Usuario incorrecto! </div>															
															<input type="text" value="" id="user" placeholder="Escribe tu usuario" class="form-control input_login" name="user">
												</div>
											</div>
										</div>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
				
				<div class="center altoExagono">
					<div class="hexagonB" style="margin: 0 4px;">
						<div class="hexagon-in1B">
							<span class="hexagon-in2B" >
								<div class="hexagon" onclick="ocultapass();" style="cursor:pointer;">
									<div class="hexagon-in1">
										<div class="hexagon-in2">
											<div class="vertical-center-exagono center cursor" id="hexa_pass">
												<div class="row inicio_pass">
														<img src="img/contra.png">
												</div>
												<div class="row inicio_pass2 center">
													<div class="imagen">
														<img src="img/contra.png" class="img-exagono-max" alt="Tiendas Neto">
													</div>
														<div class="mensajeerror">Contrase??a incorrecta!</div>	
														<input id="pass" type="password" value="" placeholder="Escribe tu contrase??a" class="form-control input_login" name="pass">
													<div class="col col-12">
														<a class="btn btnOlvidoContrasena" onclick="olvidaPass()">Olvidaste&nbsp;tu&nbsp;contrase??a?</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>
			
			<input id="btnLogin" type="submit" value="&emsp;Iniciar sesi??n&emsp;" class="btn blogin" style="display:none;">
			</form>
			
			<div class="row center" style="margin: -1.8em 0;">
				<div class="center margenHEntreExagonos altoExagono">
					<div class="hexagonB">
						<div class="hexagon-in1B">
							<span class="hexagon-in2B font-weight-bold">
								<div class="hexagon">
									<div class="hexagon-in1" href="#">
										<div class="hexagon-in2 font-weight-bold ">
											<div class="vertical-center-exagono center">
												<div class="row">
													<div class="col col-12">
														<img src="img/logoBlanco.png" class="logoNetoExagono">
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
				
				
			</div>
		</div>
	</div>
	<div class="text-center"><button class="btn entrar" onclick='entrar_boton()'>Entrar</button></div>
	</div>

	<div class="modal" tabindex="-1" role="dialog" id="modalPass">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Recuperaci??n de contrase??a</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row" id="cajas">
						<div class="col-lg-6">No. de empleado</div>
						<div class="col-lg-6"><input type="text" id="idusuario" style="padding-left: 5px;"></div>
						
						<div id="tokenLabel" class="col-lg-6" style="padding-top: 15px; display: none;">Introduce la clave enviada a tu celular</div>
						<div id="tokenText" class="col-lg-6" style="padding-top: 15px; display: none"><input type="text" id="idclave" style="padding-left: 5px;"></div>
						
						<div class="col-12" style="text-align:center; margin-top:20px">
							<button id="tokenBoton" type="button" style="padding:0px 10px;"" onclick="recuperaPass()">Buscar</button>
						</div>	
					</div>
					<div class="row" id="informacion" style="display:none;">
						<div class="col-lg-12" style="text-align:center;"><span id="mensaje"></span></div>
					</div>				
				</div>
			</div>
		</div>
	</div>


	<input type="hidden" value='${respuesta}' id="respuesta"/>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
		<script src="${pageContext.request.contextPath}/js/jquery/popper.js"></script>
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/login.js"></script>
	
	
	</body>
</html>