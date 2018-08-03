package com.tiendas.neto.action;

import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
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



public class LocalizadorRadiosAction extends ExpansionAction implements  SessionAware, ParameterNameAware {
	private static final long serialVersionUID = -4284435835746364034L;
	protected Map<String, Object> session ;
	Expansionlog elog = new Expansionlog();
	SingletonProperties sp = SingletonProperties.getInstancia();
	HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
	UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
	String numeroEmpleado;
	int puestoId;
	String respuesta;
	
	public String altaRadiosLocalizador()throws Exception{
		
		session();
		
		try {
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{			
				String jsonRadiosLocalizados = ServletActionContext.getRequest().getParameter("radiosLocalizados");

				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("usuarioId", numeroEmpleado)
				 .add("arregloRadio", jsonRadiosLocalizados);
				
				 RequestBody formBody = formBuilder.build();
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("obtieneRadiosGuardaRadios"))
		                 .post(formBody)
		                 .build();
				
				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 HttpServletResponse response2 = ServletActionContext.getResponse();
					response2.setContentType("application/json");
					response2.setCharacterEncoding("UTF-8");
					response2.getWriter().write(respuesta);
				
					//elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " );
			}
		}catch(Exception ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}

		return null;
	}
	
	
	public String getEmpleadosZona()throws Exception{
		
		session();
		
		try {
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{

				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("usuarioId", numeroEmpleado);
				
				 RequestBody formBody = formBuilder.build();
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("obtieneempleadosZona"))
		                 .post(formBody)
		                 .build();
				
				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 

				 HttpServletResponse response2 = ServletActionContext.getResponse();
					response2.setContentType("application/json");
					response2.setCharacterEncoding("UTF-8");
					response2.getWriter().write(respuesta);
			 }	
					//elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " );
			}catch(Exception ex) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
			}
	
			return null;
		
	}
	
	public String setAsignaRadio()throws Exception{	
		String idJefeExpansion = ServletActionContext.getRequest().getParameter("idJefeExpansion");
		String idRadio = ServletActionContext.getRequest().getParameter("idRadioAginar");
		session();

		try {
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{
				
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
			 .add("usuarioId", numeroEmpleado)
			 .add("usuarioAsignaId", idJefeExpansion)
			 .add("radioId", idRadio);
			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("asignarRadio"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				response2.getWriter().write(respuesta);
			}
				//elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " );
		}catch(Exception ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}

		return null;
	}
	
	
	public String getRadiosLocalizados()throws Exception{		
		session();

		try {
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{
				
				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("usuarioId", numeroEmpleado);
				
				 RequestBody formBody = formBuilder.build();
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("obtieneRadiosLocalizados"))
		                 .post(formBody)
		                 .build();
				
				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 HttpServletResponse response2 = ServletActionContext.getResponse();
					response2.setContentType("application/json");
					response2.setCharacterEncoding("UTF-8");
					response2.getWriter().write(respuesta);
			}
				//elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " );
		}catch(Exception ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}

		return null;
	}
	
	public void session() {
		if(usuario != null) {
			numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			puestoId = usuario.getPerfil().getPuestoId();
		}
	}
}
