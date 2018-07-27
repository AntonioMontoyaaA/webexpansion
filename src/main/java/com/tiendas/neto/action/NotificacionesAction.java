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

public class NotificacionesAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private String tipoNotificacion;
	private String mdId;
	private String fecha;
	private String nivelEstatusArea;
	
	public String getTipoNotificacion() {
		return tipoNotificacion;
	}

	public void setTipoNotificacion(String tipoNotificacion) {
		this.tipoNotificacion = tipoNotificacion;
	}

	public String getMdId() {
		return mdId;
	}

	public void setMdId(String mdId) {
		this.mdId = mdId;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getNivelEstatusArea() {
		return nivelEstatusArea;
	}

	public void setNivelEstatusArea(String nivelEstatusArea) {
		this.nivelEstatusArea = nivelEstatusArea;
	}

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
				 .url(sp.getPropiedad("notificaciones"))
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
	
	public String marcarLeido() throws Exception{
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
			
			System.out.println(numeroEmpleado+" "+getTipoNotificacion()+" "+getMdId()+" "+getFecha()+" "+getNivelEstatusArea());
			
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
         .add("usuarioId", numeroEmpleado)
         .add("tipoNotificacion", getTipoNotificacion())
         .add("mdId", getMdId())
         .add("fecha", getFecha())
         .add("nivelEstatusArea", getNivelEstatusArea());
				
		RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("validaNotificacion"))
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

}
