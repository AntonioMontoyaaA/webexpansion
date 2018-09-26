package com.tiendas.neto.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
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
//este es un comentario de prueba
public class AsignadasInfoAction extends ExpansionAction implements SessionAware, ParameterNameAware {
	protected Map<String, Object> session ;
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();

	
	@Override
	public String execute() throws Exception {
		String respuesta="";
		String fechaConsulta = ServletActionContext.getRequest().getParameter("fechaConsulta");
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		int puestoId = 0;
		String areaId = "";
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		String submodulos="";
		
		if(usuarioSesion.getAttribute("submodulos")!=null) {
			submodulos=(String) usuarioSesion.getAttribute("submodulos");
		}
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				puestoId = usuario.getPerfil().getPuestoId();
				if(usuario.getPerfil().getAreasxpuesto().length > 0) {
					areaId = String.valueOf(usuario.getPerfil().getAreasxpuesto()[0].getAreaId());
				}
				else
					areaId="1";
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
			 .add("nivelesEstatus", submodulos);
			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("mdsAsignadas"))
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
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " + fechaConsulta); 
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
				sendJSONObjectToResponse(respuestaVo);
			 }
		
		return null;
	} 
}