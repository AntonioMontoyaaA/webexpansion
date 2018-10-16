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

public class MensajeHistorialAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private String mdId;
	private String nivelesEstatus;

	public String getNivelesEstatus() {
		return nivelesEstatus;
	}

	public void setNivelesEstatus(String nivelesEstatus) {
		this.nivelesEstatus = nivelesEstatus;
	}

	public String getMdId() {
		return mdId;
	}

	public void setMdId(String mdId) {
		this.mdId = mdId;
	}

	/*@Override
	public String execute() throws Exception {
		String respuesta="";
		String numeroEmpleado = null;
		UsuarioLoginVO usuario = null;
		
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
					.add("mdId", getMdId())
					.add("usuarioId", numeroEmpleado);

		
		 RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("obtieneChat"))
                 .post(formBody)
                 .build();
		
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
		 
		 HttpServletResponse response2 = ServletActionContext.getResponse();
			response2.setContentType("application/json");
			response2.setCharacterEncoding("UTF-8");
			response2.getWriter().write(respuesta);
		 }
		 catch (Exception e){
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			e.printStackTrace();
		 }
		
		return null;
	}*/
	
	@Override
	public String execute() throws Exception {
		String respuesta="";
		String numeroEmpleado = null;
		UsuarioLoginVO usuario = null;
		
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
					.add("mdId", getMdId())
					.add("usuarioId", numeroEmpleado);

		
		 RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("obtienenummensajes"))
                 .post(formBody)
                 .build();
		
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
		 
		 HttpServletResponse response2 = ServletActionContext.getResponse();
			response2.setContentType("application/json");
			response2.setCharacterEncoding("UTF-8");
			response2.getWriter().write(respuesta);
		 }
		 catch (Exception e){
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			e.printStackTrace();
		 }
		
		return null;
	}
	
	public String obtieneMensajes() throws Exception {
		String respuesta="";
		String numeroEmpleado = null;
		UsuarioLoginVO usuario = null;
		
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
					.add("mdId", getMdId())
					.add("nivelesEstatus", getNivelesEstatus())
					.add("usuarioId", numeroEmpleado);

		
		 RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("obtieneChat"))
                 .post(formBody)
                 .build();
		
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
		 
		 HttpServletResponse response2 = ServletActionContext.getResponse();
			response2.setContentType("application/json");
			response2.setCharacterEncoding("UTF-8");
			response2.getWriter().write(respuesta);
		 }
		 catch (Exception e){
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			e.printStackTrace();
		 }
		
		return null;
	}
	
}

