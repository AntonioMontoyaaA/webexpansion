package com.tiendas.neto.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
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
	
	public void subeArchivo() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		String tipoServicio = ServletActionContext.getRequest().getParameter("tipoServicio");
		
		String mdId = null, 
			nombreArchivo = null, 
			archivo = null, 
			formato = null, 
			tipoArchivo = null, 
			fecha = null, 
			monto = null, 
			acc = null, 
			tiendaId = null;
		
		if(tipoServicio.equals("10")){//CECO
			tiendaId = ServletActionContext.getRequest().getParameter("tiendaId");
		}else if(tipoServicio.equals("11")){//VENTA
			monto = ServletActionContext.getRequest().getParameter("monto");
		}else if(tipoServicio.equals("14")) {
			nombreArchivo = ServletActionContext.getRequest().getParameter("nombreArchivo");
			archivo = ServletActionContext.getRequest().getParameter("archivo");
			formato = ServletActionContext.getRequest().getParameter("formato");
			tipoArchivo = ServletActionContext.getRequest().getParameter("tipoArchivo");
			monto = "";
			acc = "";
		}else {
			nombreArchivo = ServletActionContext.getRequest().getParameter("nombreArchivo");
			archivo = ServletActionContext.getRequest().getParameter("archivo");
			formato = ServletActionContext.getRequest().getParameter("formato");
			tipoArchivo = ServletActionContext.getRequest().getParameter("tipoArchivo");
			monto = ServletActionContext.getRequest().getParameter("monto");
			acc = ServletActionContext.getRequest().getParameter("acc");

		}
		
		mdId = ServletActionContext.getRequest().getParameter("mdId");
		fecha = ServletActionContext.getRequest().getParameter("fecha");
		
		
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi�n");
				sendJSONObjectToResponse(respuestaVo);
				
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				
				final OkHttpClient client = new OkHttpClient();
				
				Builder builder;
				RequestBody body;
				Request request;
				Response response;
				
				if(tipoServicio.equals("10")){
					builder = new Builder()
							.add("usuarioId", numeroEmpleado)
							.add("mdId", mdId)
							.add("tipoServicio", tipoServicio)
							.add("fecha", fecha)
							.add("tiendaId", tiendaId);
					
					body = builder.build();
					request = new Request.Builder()
						.url(sp.getPropiedad("guardadocsmontos"))
						.post(body)
						.build();
					
					response = client.newCall(request).execute();
					respuesta = response.body().string();
					
				}else if(tipoServicio.equals("11")){
					builder = new Builder()
							.add("usuarioId", numeroEmpleado)
							.add("mdId", mdId)
							.add("tipoServicio", tipoServicio)
							.add("fecha", fecha)
							.add("monto", monto);
					
					body = builder.build();
					request = new Request.Builder()
						.url(sp.getPropiedad("guardadocsmontos"))
						.post(body)
						.build();
					
					response = client.newCall(request).execute();
					respuesta = response.body().string();
				}else {
					if(monto.isEmpty())
						monto = "''";
					
					builder = new Builder()
							.add("mdId", mdId)
							.add("nombreArc", nombreArchivo)
							.add("archivo", archivo)
							.add("formato", formato)
							.add("tipoArchivo", tipoArchivo)
							.add("fecha", fecha)
							.add("usuarioId", numeroEmpleado);
						
						body = builder.build();
						request = new Request.Builder()
							.url(sp.getPropiedad("cloudinarySet"))
							.post(body)
							.build();
						
						response = client.newCall(request).execute();
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
										.add("monto", monto)
										.add("tipoServicio", tipoServicio)
										.add("aireAcondicionado", acc)
										.add("fecha", fecha);
							
							body = builder.build();
							request = new Request.Builder()
								.url(sp.getPropiedad("guardadocsmontos"))
								.post(body)
								.build();
							
							response = client.newCall(request).execute();
							respuesta = response.body().string();
							respuesta = setURLToResponse(respuesta, url);
							
							
						}
				}
				
				HttpServletResponse re = ServletActionContext.getResponse();
				re.setContentType("application/json");
				re.setCharacterEncoding("UTF-8");
				re.getWriter().write(respuesta);
				
				
				
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
	
	public void guardaConteoAuditor() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		String mdId = ServletActionContext.getRequest().getParameter("mdId");
		String horaI = ServletActionContext.getRequest().getParameter("horaI");
		String horaF = ServletActionContext.getRequest().getParameter("horaF");
		String fecha = ServletActionContext.getRequest().getParameter("fecha");
		String total = ServletActionContext.getRequest().getParameter("total");
		
		String cero = "0";
		String dos = "2";
		
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi�n");
				sendJSONObjectToResponse(respuestaVo);
				
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				
				final OkHttpClient client = new OkHttpClient();
				
				Builder builder = new Builder()
					.add("usuarioId", numeroEmpleado)
					.add("mdId", mdId)
					.add("fecha", fecha)
					.add("horaInicio", horaI)
					.add("horaFinal", horaF)
					.add("total", total)
					.add("latitud", cero)
					.add("longitud", cero)
					.add("bajaConteos", cero)
					.add("numTelefono", cero)
					.add("versionApp", cero)
					.add("tipoServicio", dos);
				
				RequestBody body = builder.build();
				Request request = new Request.Builder()
					.url(sp.getPropiedad("conteoPeatonal"))
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
			elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado());
			
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(404);
			respuestaVo.setMensaje("Error al conectarse al servidor");
			sendJSONObjectToResponse(respuestaVo);
		}
	}
	
	public void subeArchivosGestoria() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		String mdId = ServletActionContext.getRequest().getParameter("mdId");
		String fecha = ServletActionContext.getRequest().getParameter("fecha");
		String tipoArchivo = ServletActionContext.getRequest().getParameter("tipoArchivo");
		String tipoServicio = ServletActionContext.getRequest().getParameter("tipoServicio");

		String archivos = ServletActionContext.getRequest().getParameter("archivos");
		String formatos = ServletActionContext.getRequest().getParameter("formatos");
		
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi�n");
				sendJSONObjectToResponse(respuestaVo);
				
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				
				final OkHttpClient client = new OkHttpClient();
				Builder builder;
				RequestBody body;
				Request request;
				Response response;
				
				
				List<String> archivosList = getElementsOfJson(archivos);
				List<String> formatosList = getElementsOfJson(formatos);
				
				String nombreFile;
				
				List<Archivo> archivosResp;
				
				if(!archivosList.isEmpty() && !formatos.isEmpty()) {
					
					archivosResp = new ArrayList<Archivo>();
					
					for (int i = 0; i < archivosList.size(); i++) {
						
						
						nombreFile = i + "GST" + mdId;
						builder = new Builder()
								.add("mdId", mdId)
								.add("nombreArc", nombreFile)
								.add("archivo", archivosList.get(i))
								.add("formato", formatosList.get(i))
								.add("tipoArchivo", tipoArchivo)
								.add("fecha", fecha)
								.add("usuarioId", numeroEmpleado);
						
						body = builder.build();
						request = new Request.Builder()
							.url(sp.getPropiedad("conteoPeatonal"))
							.post(body)
							.build();
						
						response = client.newCall(request).execute();
						respuesta = response.body().string();
						
						
						archivosResp.add(new Archivo(nombreFile, obtieneURL(respuesta)));
					}
					
					if(!archivosResp.isEmpty()) {
						builder = new Builder()
								.add("usuarioId", numeroEmpleado)
								.add("mdId", mdId)
								.add("tipoServicio", tipoServicio)
								.add("fecha", fecha)
								.add("urlArchivo", archivosResp.get(0).getNombre())
								.add("nombreArchivo", archivosResp.get(0).getUrl());
						
						body = builder.build();
						request = new Request.Builder()
							.url(sp.getPropiedad("guardadocsmontos"))
							.post(body)
							.build();
						
						response = client.newCall(request).execute();
						respuesta = response.body().string();
						
						respuesta = setArchivos(respuesta, archivosResp);
					}
				}
				
				HttpServletResponse re = ServletActionContext.getResponse();
				re.setContentType("application/json");
				re.setCharacterEncoding("UTF-8");
				re.getWriter().write(respuesta);
				
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
	
	private String setArchivos(String respuesta, List<Archivo> archivos) {
		try {
			JSONObject json = new JSONObject(respuesta);
			JSONArray array = new JSONArray();
			JsonObject obj;
			
			for (Archivo a : archivos) {
				obj = new JsonObject();
				obj.addProperty("nombre", a.getNombre());
				obj.addProperty("url", a.getUrl());
				
				
				array.put(obj);
			}
			
			json.put("archivos", array);
			
			return json.toString();
		}catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + "", "");
		}
		return null;
	}
	
	public class Archivo {
		private String nombre;
		private String url;
		
		public Archivo(String nombre, String url) {
			this.nombre = nombre;
			this.url = url;
		}
		
		public void setNombre(String nombre) {
			this.nombre = nombre;
		}
		
		public void setUrl(String url) {
			this.url = url;
		}
		
		public String getNombre() {
			return nombre;
		}
		
		public String getUrl() {
			return url;
		}
	}
	
	private List<String> getElementsOfJson(String element) {
		List<String> elementos = null;
		try {
			elementos = new ArrayList<String>();
			JSONArray array = new JSONArray(element);
			
			for (int i = 0; i < array.length(); i++) {
				elementos.add(array.getString(i));
			}
			
			return elementos;
		}catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + "", "");
			
			return null;
		}
	}
	
	public void subeObra() {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		String tipoServicio = ServletActionContext.getRequest().getParameter("tipoServicio");
		
		String mdId = null,
			inicio = null, 
			duracion = null;
		
		mdId = ServletActionContext.getRequest().getParameter("mdId");
		inicio = ServletActionContext.getRequest().getParameter("inicio");
		duracion = ServletActionContext.getRequest().getParameter("duracion");
		
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi�n");
				sendJSONObjectToResponse(respuestaVo);
				
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				
				final OkHttpClient client = new OkHttpClient();
				
				Builder builder;
				RequestBody body;
				Request request;
				Response response;
				
				
					builder = new Builder()
							.add("usuarioId", numeroEmpleado)
							.add("mdId", mdId)
							.add("tipoServicio", tipoServicio)
							.add("fecha", inicio + " 00:00:00")
							.add("duracionObra", duracion)
							.add("unidadMedicion", "3");
					
					body = builder.build();
					request = new Request.Builder()
						.url(sp.getPropiedad("guardadocsmontos"))
						.post(body)
						.build();
					
					response = client.newCall(request).execute();
					respuesta = response.body().string();
				
				
				HttpServletResponse re = ServletActionContext.getResponse();
				re.setContentType("application/json");
				re.setCharacterEncoding("UTF-8");
				re.getWriter().write(respuesta);
				
				
				
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
	
	public void subeFechaSimple() {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		String tipoServicio = ServletActionContext.getRequest().getParameter("tipoServicio");
		
		String mdId = null,
			fecha = null;
		
		mdId = ServletActionContext.getRequest().getParameter("mdId");
		fecha = ServletActionContext.getRequest().getParameter("fecha");
		
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi�n");
				sendJSONObjectToResponse(respuestaVo);
				
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				
				final OkHttpClient client = new OkHttpClient();
				
				Builder builder;
				RequestBody body;
				Request request;
				Response response;
				
				
					builder = new Builder()
							.add("usuarioId", numeroEmpleado)
							.add("mdId", mdId)
							.add("tipoServicio", tipoServicio)
							.add("fecha", fecha + " 00:00:00");
					
					body = builder.build();
					request = new Request.Builder()
						.url(sp.getPropiedad("guardadocsmontos"))
						.post(body)
						.build();
					
					response = client.newCall(request).execute();
					respuesta = response.body().string();
				
				
				HttpServletResponse re = ServletActionContext.getResponse();
				re.setContentType("application/json");
				re.setCharacterEncoding("UTF-8");
				re.getWriter().write(respuesta);
				
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
}
