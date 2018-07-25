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

public class EditaMdDatosPropietarioAction extends ExpansionAction implements SessionAware, ParameterNameAware {
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
				String nombrePropietario = ServletActionContext.getRequest().getParameter("nombrePropietario");
				String apaternoPropietario = ServletActionContext.getRequest().getParameter("apaternoPropietario");
				String amaternoPropietario = ServletActionContext.getRequest().getParameter("amaternoPropietario");
				String telefono = ServletActionContext.getRequest().getParameter("telefono");
				String email = ServletActionContext.getRequest().getParameter("email");
				
				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("mdId", mdId)
				 .add("nombrePropietario", nombrePropietario)
				 .add("apaternoPropietario", apaternoPropietario)
				 .add("amaternoPropietario", amaternoPropietario)
				 .add("telefono", telefono)
				 .add("email", email)
				 .add("usuarioId", String.valueOf(usuario.getPerfil().getNumeroEmpleado()));
				
				
				 RequestBody formBody = formBuilder.build();
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("editaDatosPropietario"))
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
				respuestaVo.setMensaje("Error en la sesión");
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
