<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!-- &emsp;  &nbsp;-->
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/generic.css" />
	
<title>Login</title>
<body>

<div class="container-fluid">
	<div class="row center">
			<div class="col-lg-2 login">
				<br><br>
					<div class="col-md-12 center">
						<img src="${pageContext.request.contextPath}/img/icono_login.png">
					</div>
					<br>
					
					<form action="Login" method="post">					
					<div class="col-md-12">
						<input type="text" name="user" value="327320" class="form-control input_login" placeholder="User">
					</div>
						<div class="col-md-12 padding_pass">
							<input type="password" name="pass" value="327320" class="form-control input_login" placeholder="Password">
						</div>
					<br><br>
						<div class="center">
							<button type="submit" class="btn blogin">&emsp;Iniciar sesión&emsp;</button>
						</div>	
					</form>
					<div class="center">
					<a class="links" href="#">Olvidaste&nbsp;tu&nbsp;contraseña</a>
					</div>
				
			</div>
			</div>
				
	</div>
	
	<script	src="${pageContext.request.contextPath}/js/jquery/jquery.min.js"></script>	
	<script	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
</html>