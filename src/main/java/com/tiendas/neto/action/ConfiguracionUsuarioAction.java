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
}