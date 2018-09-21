package com.tiendas.neto.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import okhttp3.FormBody.Builder;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.UsuarioLoginVO;

public class MotivosRechazoAction extends ActionSupport implements SessionAware, ParameterNameAware {
	
	private static final long serialVersionUID = 1L;
	protected Map<String, Object> session ;
	Expansionlog elog = new Expansionlog();
	SingletonProperties sp = SingletonProperties.getInstancia();
	
	@Override
	public String execute() throws Exception {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		String modulo = ServletActionContext.getRequest().getParameter("modulo");
		String tipoModulo = ServletActionContext.getRequest().getParameter("tipoModulo");
		String estatus = ServletActionContext.getRequest().getParameter("estatus");
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				final OkHttpClient client = new OkHttpClient();
				
				Builder builder = new Builder()
					.add("usuarioId", numeroEmpleado)
					.add("modulo", modulo)
					.add("tipomodulo", tipoModulo)
					.add("nivelEvaluacion", estatus);
				
				RequestBody body = builder.build();
				Request request = new Request.Builder()
					.url(sp.getPropiedad("motivosRechazoXId"))
					.post(body)
					.build();
				
				Response response = client.newCall(request).execute();
				respuesta = response.body().string();
				
				HttpServletResponse re = ServletActionContext.getResponse();
				re.setContentType("application/json");
				re.setCharacterEncoding("UTF-8");
				re.getWriter().write(respuesta);
			}
			
		}catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Modulo ID: " + modulo);
			
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(404);
			respuestaVo.setMensaje("Error al conectarse al servidor");
			sendJSONObjectToResponse(respuestaVo);
		}
		return null;
	}
	
	protected void sendJSONObjectToResponse(Object objToSend) {
		Gson gson = new Gson();
		String jsonResult = gson.toJson(objToSend);	      
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		try {
			response.getWriter().write(jsonResult );
		} catch (IOException e) {
		}
	}
	
	@Override
	public boolean acceptableParameterName(String parameterName) {
		boolean allowedParameterName = true ;	     
		if (parameterName.contains("session")  || 
				parameterName.contains("request") ) {	     
			allowedParameterName = false ;	         
		} 	     
		return allowedParameterName;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}

}
