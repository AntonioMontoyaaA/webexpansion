<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!-- &emsp;  &nbsp;-->
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	
<title>Error de acceso</title>
<body>

<div class="container-fluid">
	<form action="Login" method="post">
	<div class="row">
		<div class="col-md-12" style="height:80px;"></div><!-- espacio -->
		
				<div class="col-lg-4 col-md-3"></div>
				<div class="col-lg-4 col-md-6">
					<div class="col-md-12 center">
						<img class="center"
							src="${pageContext.request.contextPath}/img/usuario.png">
					</div>
					
					<div class="col-md-12" style="height:50px;"></div><!-- espacio -->
					
					<div class="col-md-12 paddingtext">
						<input type="text" name="user" class="form-control input_login" placeholder="Usuario">
					</div>
					<div class="col-md-12 paddingtext">
						<br><br>
						<input type="password" name="pass" class="form-control input_login" placeholder="Contraseña">
					</div>
					Favor de llenar todos los campos
				</div>
				<div class="col-lg-4 col-md-3"></div>
				
				<div class="col-lg-3 col-md-1"></div>
				<div class="col-lg-6 col-md-10 col-sm-12">
						<br><br>
				<div class="row">
					<div class="col-sm-6 col-12 left" style="height:40px;">
					<a class="links" href="#">Olvidé&nbsp;mi&nbsp;usuario&nbsp;y/o&nbsp;contraseña</a>
					</div>
					
					<div class="col-sm-6 col-12 right" style="height:40px;">
					<a class="links" href="#">Modificar&nbsp;contraseña</a>
					</div>
				</div>
				
				</div>
			<br><br>
			<div class="col-md-12 center">
				<button type="submit" class="btn btn-primary">&emsp;Entrar&emsp;</button>
			</div>		
	</div>
	</form>
</div>
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
</html>