package com.tiendas.neto.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody.Builder;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ManejadorArchivosAction 
	extends ActionSupport 
	implements SessionAware, ParameterNameAware{

	private static final long serialVersionUID = 1L;
	protected Map<String, Object> session ;
	Expansionlog elog = new Expansionlog();
	SingletonProperties sp = SingletonProperties.getInstancia();
	
	public void subeLayout() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		String mdId = ServletActionContext.getRequest().getParameter("mdId");
		String nombreArchivo = ServletActionContext.getRequest().getParameter("nombreArchivo");
		String archivo = ServletActionContext.getRequest().getParameter("archivo");
		String formato = ServletActionContext.getRequest().getParameter("formato");
		String tipoArchivo = ServletActionContext.getRequest().getParameter("tipoArchivo");
		String fecha = ServletActionContext.getRequest().getParameter("fecha");
		
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				
				final OkHttpClient client = new OkHttpClient();
				
				Builder builder = new Builder()
					.add("mdId", mdId)
					.add("nombreArc", nombreArchivo)
					.add("archivo", archivo)
					.add("formato", formato)
					.add("tipoArchivo", tipoArchivo)
					.add("fecha", fecha)
					.add("usuarioId", numeroEmpleado);
				
				RequestBody body = builder.build();
				Request request = new Request.Builder()
					.url(sp.getPropiedad("cloudinarySet"))
					.post(body)
					.build();
				
				Response response = client.newCall(request).execute();
				respuesta = response.body().string();
				
				String url = obtieneURL(respuesta);
				
				if(url == null) {
					elog.info("subeLayout", "ManejadorArchivosAction", "No se subio la imagen", respuesta);
					sendJSONObjectToResponse(respuesta);
				}else {
					
					String[] urlsplit = url.split("/");
					String nombreFinal = urlsplit[urlsplit.length - 1];
					
					builder = new Builder()
							.add("usuarioId", numeroEmpleado)
							.add("mdId", mdId)
							.add("urlArchivo", url)
							.add("nombreArchivo", nombreFinal)
							.add("formato", formato)
							.add("tipoServicio", "2")
							.add("fecha", fecha);
					
					body = builder.build();
					request = new Request.Builder()
						.url(sp.getPropiedad("layoutConstruccion"))
						.post(body)
						.build();
					
					response = client.newCall(request).execute();
					respuesta = response.body().string();
					respuesta = setURLToResponse(respuesta, url);
					
					HttpServletResponse re = ServletActionContext.getResponse();
					re.setContentType("application/json");
					re.setCharacterEncoding("UTF-8");
					re.getWriter().write(respuesta);
				}
			}
		}catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado());
			
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(404);
			respuestaVo.setMensaje("Error al conectarse al servidor");
			sendJSONObjectToResponse(respuestaVo);
		}
	}
	
	private String obtieneURL(String responseLayout) {
		try {
			JSONObject json = new JSONObject(responseLayout);
			int codigo = Integer.parseInt(json.get("codigo").toString());
			
			if(codigo == 200) {
				
				JSONObject datosArchivo = json.getJSONObject("resultado");
				
				return datosArchivo.getString("secure_url");
			}else {
				return null;
			}
		}catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + "", "");
		}
		return null;
	}
	
	private String setURLToResponse(String respuesta, String url) {
		try {
			JSONObject json = new JSONObject(respuesta);
			json.put("url", url);
			
			return json.toString();
		}catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + "", "");
		}
		return null;
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
}
