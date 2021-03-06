package com.tiendas.neto.action;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class AccionMdAction extends ExpansionAction implements SessionAware, ParameterNameAware  {
	protected Map<String, Object> session ;
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	@Override
	public String execute() throws Exception {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				String mdId = ServletActionContext.getRequest().getParameter("mdId");
				String estatusvalidacion = ServletActionContext.getRequest().getParameter("estatusvalidacion");
				
				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("mdId", mdId)
				 .add("usuarioId", String.valueOf(usuario.getPerfil().getNumeroEmpleado()))
				 .add("estatusvalidacion", estatusvalidacion);
				
				
				 RequestBody formBody = formBuilder.build();
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("accionMdEstatus"))
		                 .post(formBody)
		                 .build();
				
				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 HttpServletResponse response2 = ServletActionContext.getResponse();
					response2.setContentType("application/json");
					response2.setCharacterEncoding("UTF-8");
					response2.getWriter().write(respuesta);
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi??n");
				sendJSONObjectToResponse(respuestaVo);
				return null;
			}
		} catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + ""); 
			
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(404);
			respuestaVo.setMensaje("Error al conectarse al servidor");
			sendJSONObjectToResponse(respuestaVo);
		 }
		return null;
	}
	
	public String obtieneNivelEstatusCambiarMd() throws Exception {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				String mdId = ServletActionContext.getRequest().getParameter("mdId");
				
				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("mdId", mdId)
				 .add("usuarioId", String.valueOf(usuario.getPerfil().getNumeroEmpleado()));
				
				
				 RequestBody formBody = formBuilder.build();
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("obtieneNivelEstatusCambiarMd"))
		                 .post(formBody)
		                 .build();
				
				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 HttpServletResponse responseHttp = ServletActionContext.getResponse();
				 responseHttp.setContentType("application/json");
				 responseHttp.setCharacterEncoding("UTF-8");
				 responseHttp.getWriter().write(respuesta); 
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi??n");
				sendJSONObjectToResponse(respuestaVo);
				return null;
			}
		} catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + ""); 
			
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(404);
			respuestaVo.setMensaje("Error al conectarse al servidor");
			sendJSONObjectToResponse(respuestaVo);
		 }
		return null;
	}
	
	public String cambiaEstatusMDtodos() throws Exception {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
	
		try {
			if(usuario != null) {
				String mdId = ServletActionContext.getRequest().getParameter("mdId");
				String nivelEstatusAreaId = ServletActionContext.getRequest().getParameter("nivelEstatusAreaId");
			
				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
						.add("mdId", mdId)
						.add("usuarioId", String.valueOf(usuario.getPerfil().getNumeroEmpleado()))
						.add("nivelEstatusAreaId", nivelEstatusAreaId);
			
			
				RequestBody formBody = formBuilder.build();
				Request request = new Request.Builder()
					 .url(sp.getPropiedad("cambiaestatusmdtodos"))
	                 .post(formBody)
	                 .build();
			
				Response response = client.newCall(request).execute();
				respuesta = response.body().string();
				HttpServletResponse responseHttp = ServletActionContext.getResponse();
				responseHttp.setContentType("application/json");
				responseHttp.setCharacterEncoding("UTF-8");
				responseHttp.getWriter().write(respuesta); 
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi??n");
				sendJSONObjectToResponse(respuestaVo);
				return null;
			}
		} catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + ""); 
		
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(404);
			respuestaVo.setMensaje("Error al conectarse al servidor");
			sendJSONObjectToResponse(respuestaVo);
		}
		return null;
	}
}
