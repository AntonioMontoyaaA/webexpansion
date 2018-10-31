package com.tiendas.neto.action;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ConfiguracionUsuarioAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	

	public String execute() throws Exception{
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		String numeroEmpleado = null;
		
		
		if(usuario != null) {
			numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
		} else {
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(501);
			respuestaVo.setMensaje("Error en la sesion");
			sendJSONObjectToResponse(respuestaVo);
			return null;
		}
		
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try{
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
         .add("usuarioId", numeroEmpleado);
				
		RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("filtrosperfiles"))
                 .post(formBody)
                 .build();
		
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
		 response2.getWriter().write(respuesta);
		 }
		 catch (Exception e){
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			e.printStackTrace();
			response2.getWriter().write("error");
		 }
		
		return null;
	}
	
	
	public String buscaUsuariosPerfiles() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		String puestoId = ServletActionContext.getRequest().getParameter("puestoId");
		String areaId = ServletActionContext.getRequest().getParameter("areaId");
		String usrBuscaId= ServletActionContext.getRequest().getParameter("usrBuscaId");
		String estatus= ServletActionContext.getRequest().getParameter("estatus");
		
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}
			
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
			 .add("usuarioId", numeroEmpleado)
			 .add("puestoId", puestoId)
	         .add("areaId", areaId)
	         .add("usrBuscaId", usrBuscaId)
	         .add("estatus", estatus);
			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("buscaUsuariosPerfiles"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				response2.getWriter().write(respuesta);
			 }
			 catch (Exception e) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado()); 
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
				sendJSONObjectToResponse(respuestaVo);
			 }
		
		return null;
	}
	
	public String validaPuestoJefeAction() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		String puestoId = ServletActionContext.getRequest().getParameter("puestoId");
		
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}
			
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
			 .add("usuarioId", numeroEmpleado)
			 .add("puestoId", puestoId);
			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("obtienePuestosJefes"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				response2.getWriter().write(respuesta);
			 }
			 catch (Exception e) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado()); 
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
				sendJSONObjectToResponse(respuestaVo);
			 }
		
		return null;
	}
	
	public String nuevoUsuarioAction() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		String usrCrearId = ServletActionContext.getRequest().getParameter("usrCrearId");
		String puestoId = ServletActionContext.getRequest().getParameter("puestoId");
		String nombre = ServletActionContext.getRequest().getParameter("nombre");
		String apellidoPaterno = ServletActionContext.getRequest().getParameter("apellidoPaterno");
		String apellidoMaterno = ServletActionContext.getRequest().getParameter("apellidoMaterno");
		String correo = ServletActionContext.getRequest().getParameter("correo");
		String numTelefono = ServletActionContext.getRequest().getParameter("numTelefono");
		String tipoEmpleado = ServletActionContext.getRequest().getParameter("tipoEmpleado");
		String usuariosJefe = ServletActionContext.getRequest().getParameter("usuariosJefe");
		String imei = ServletActionContext.getRequest().getParameter("imei");
		String fotoFueraRadio = ServletActionContext.getRequest().getParameter("fotoFueraRadio");
		String conteoFueraRadio = ServletActionContext.getRequest().getParameter("conteoFueraRadio");
		
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}
			
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = null;
			
			if(puestoId.equals("2") || puestoId.equals("3") ) {
				/*System.out.println("entro al 1");
				System.out.println(usrCrearId+" 1 "+puestoId+" 2 "+nombre+" 3 ");
				System.out.println(apellidoPaterno+" 4 "+apellidoMaterno+" 5 "+correo+" 6 ");
				System.out.println(numTelefono+" 7 "+tipoEmpleado+" 8 "+usuariosJefe+" 9 ");
				System.out.println(imei+" 10 "+fotoFueraRadio+" 11 "+conteoFueraRadio+" 12 ");
				*/
				formBuilder = new FormBody.Builder()
						 .add("usuarioId", numeroEmpleado)
						 .add("usrCrearId", usrCrearId)
						 .add("puestoId", puestoId)
						 .add("nombre", nombre)
						 .add("apellidoPaterno", apellidoPaterno)
						 .add("apellidoMaterno", apellidoMaterno)
						 .add("correo", correo)
						 .add("numTelefono", numTelefono)
						 .add("tipoEmpleado", tipoEmpleado)
						 .add("usuariosJefe", usuariosJefe)
						 .add("imei", imei)
						 .add("fotoFueraRadio", fotoFueraRadio)
						 .add("conteoFueraRadio", conteoFueraRadio);
			}
			else if(puestoId.equals("11")) {
				/*System.out.println("entro al 11");
				System.out.println(usrCrearId+" 1 "+puestoId+" 2 "+nombre+" 3 ");
				System.out.println(apellidoPaterno+" 4 "+apellidoMaterno+" 5 "+correo+" 6 ");
				System.out.println(numTelefono+" 7 "+tipoEmpleado+" 8 "+usuariosJefe+" 9 ");
				System.out.println(imei+" 10 "+fotoFueraRadio+" 11 "+conteoFueraRadio+" 12 ");*/
				
				
				formBuilder = new FormBody.Builder()
						 .add("usuarioId", numeroEmpleado)
						 .add("usrCrearId", usrCrearId)
						 .add("puestoId", puestoId)
						 .add("nombre", nombre)
						 .add("apellidoPaterno", apellidoPaterno)
						 .add("apellidoMaterno", apellidoMaterno)
						 .add("correo", correo)
						 .add("numTelefono", numTelefono)
						 .add("tipoEmpleado", tipoEmpleado)
						 .add("imei", imei);
			}
			else {
				/*System.out.println("entro al else");
				System.out.println(usrCrearId+" 1 "+puestoId+" 2 "+nombre+" 3 ");
				System.out.println(apellidoPaterno+" 4 "+apellidoMaterno+" 5 "+correo+" 6 ");
				System.out.println(numTelefono+" 7 "+tipoEmpleado+" 8 "+usuariosJefe+" 9 ");
				System.out.println(imei+" 10 "+fotoFueraRadio+" 11 "+conteoFueraRadio+" 12 ");*/
				
				formBuilder = new FormBody.Builder()
						 .add("usuarioId", numeroEmpleado)
						 .add("usrCrearId", usrCrearId)
						 .add("puestoId", puestoId)
						 .add("nombre", nombre)
						 .add("apellidoPaterno", apellidoPaterno)
						 .add("apellidoMaterno", apellidoMaterno)
						 .add("correo", correo)
						 .add("numTelefono", numTelefono)
						 .add("tipoEmpleado", tipoEmpleado);
			}

			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("crearusuario"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				response2.getWriter().write(respuesta);
			 }
			 catch (Exception e) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado()); 
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
				sendJSONObjectToResponse(respuestaVo);
			 }
		
		return null;
	}
	
	public String listaPerfilesAction() throws Exception{
		
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}
			
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
			 .add("usuarioId", numeroEmpleado);
			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("obtienePerfiles"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				response2.getWriter().write(respuesta);
			 }
			 catch (Exception e) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado()); 
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
				sendJSONObjectToResponse(respuestaVo);
			 }
		
		return null;
	}
	
	public String asignarUsuarioPerfilAction() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		String perfilIds = ServletActionContext.getRequest().getParameter("perfilIds");
		String usrsActualizaPerfil = ServletActionContext.getRequest().getParameter("usrsActualizaPerfil");
		
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}	
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = null;
				
				formBuilder = new FormBody.Builder()
						 .add("usuarioId", numeroEmpleado)
						 .add("perfilIds", perfilIds)
						 .add("usrsActualizaPerfil", usrsActualizaPerfil);
			

			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("asignaperfiles"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				response2.getWriter().write(respuesta);
			 }
			 catch (Exception e) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado()); 
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
				sendJSONObjectToResponse(respuestaVo);
			 }
		
		return null;
	}
	
	public String editarPerfilesUsuarioAction() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		String perfiles = ServletActionContext.getRequest().getParameter("perfiles");
		String usrActualizarId = ServletActionContext.getRequest().getParameter("usrActualizarId");
		
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}	
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = null;
				
				formBuilder = new FormBody.Builder()
						 .add("usuarioId", numeroEmpleado)
						 .add("perfiles", perfiles)
						 .add("usrActualizarId", usrActualizarId);
			

			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("editarPerfilesUsuario"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				response2.getWriter().write(respuesta);
			 }
			 catch (Exception e) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado()); 
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
				sendJSONObjectToResponse(respuestaVo);
			 }
		
		return null;
	}
}