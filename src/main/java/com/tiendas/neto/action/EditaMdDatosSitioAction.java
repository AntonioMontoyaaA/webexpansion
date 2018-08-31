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

public class EditaMdDatosSitioAction extends ExpansionAction implements SessionAware, ParameterNameAware {
	protected Map<String, Object> session ;
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	private static final String TIPO_APLICACION_WEB = "2";
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private final String PAIS_MX = "MX";
	
	@Override
	public String execute() throws Exception {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				String mdId = ServletActionContext.getRequest().getParameter("mdId");
				String calle = ServletActionContext.getRequest().getParameter("calle");
				String colonia = ServletActionContext.getRequest().getParameter("colonia");
				String ciudad = ServletActionContext.getRequest().getParameter("ciudad");
				String municipio = ServletActionContext.getRequest().getParameter("municipio");
				String estado = ServletActionContext.getRequest().getParameter("estado");
				String codigoPostal = ServletActionContext.getRequest().getParameter("codigoPostal");
				String nombreSitio = ServletActionContext.getRequest().getParameter("nombreSitio");
				String latitud = ServletActionContext.getRequest().getParameter("latitud");
				String longitud = ServletActionContext.getRequest().getParameter("longitud");
				
				StringBuffer direccion = new StringBuffer();
				direccion.append(calle);
				direccion.append(",");
				direccion.append(colonia);
				direccion.append(",");
				
				if(!ciudad.equals("")) {
					direccion.append(ciudad);
				} else {
					direccion.append("");
				}
				direccion.append(",");
				
				if(!codigoPostal.trim().equals("")) {
					direccion.append(" ");
					direccion.append(codigoPostal);
				} else {
					direccion.append(" ");
					direccion.append("0");
				}
				direccion.append(",");
				
				direccion.append(estado);
				direccion.append(",");
				direccion.append(PAIS_MX);
				
				
				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("mdId", mdId)
				 .add("usuarioId", String.valueOf(usuario.getPerfil().getNumeroEmpleado()))
				 .add("direccion", direccion.toString())
				 .add("nombreSitio", nombreSitio)
				 .add("latitud", latitud)
				 .add("longitud", longitud)
				 .add("municipio", municipio);
				
				
				 RequestBody formBody = formBuilder.build();
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("ediciondatossitio"))
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
