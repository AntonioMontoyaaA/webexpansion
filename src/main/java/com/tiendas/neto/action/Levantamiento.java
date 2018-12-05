package com.tiendas.neto.action;

import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;
import org.json.JSONObject;

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
import okhttp3.FormBody.Builder;

public class Levantamiento extends ExpansionAction implements  SessionAware, ParameterNameAware {
	private static final long serialVersionUID = -4284435835746364034L;
	protected Map<String, Object> session ;
	Expansionlog elog = new Expansionlog();
	SingletonProperties sp = SingletonProperties.getInstancia();
	HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
	UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
	String numeroEmpleado,areaId;
	
	private String idMd;
	int puestoId;
	String respuesta;
	
	public String getIdMd() {
		return idMd;
	}

	public void setIdMd(String idMd) {
		this.idMd = idMd;
	}
	
	public String execute()throws Exception{
		
		session();
		String idMd = ServletActionContext.getRequest().getParameter("mdIdlevantamiento");
		this.idMd = idMd;
		
		return "success";
		
	}
	
	public String consultaCabeceMD()throws Exception{
		session();
		
		try {
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{			
				String mdId = ServletActionContext.getRequest().getParameter("mdId");

				final OkHttpClient client = new OkHttpClient.Builder()
				        .connectTimeout(40, TimeUnit.SECONDS)
				        .readTimeout(40, TimeUnit.SECONDS)
				        .writeTimeout(40, TimeUnit.SECONDS)
				        .build();

				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("usuarioId", numeroEmpleado)
				 .add("mdId", mdId);

				 RequestBody formBody = formBuilder.build();
	
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("consultaCabeceroMd"))
		                 .post(formBody)
		                 .build();

				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 
				 HttpServletResponse response2 = ServletActionContext.getResponse();
					response2.setContentType("application/json");
					response2.setCharacterEncoding("UTF-8");
					response2.getWriter().write(respuesta);
				
					System.out.println(respuesta);
					
			}
		}catch(Exception ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}catch(Error ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}
		
		return null;
	}	
	
	
	
	
	public String evaluaLevantamiento()throws Exception{
		session();
		
		try {
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{			
				String mdId = ServletActionContext.getRequest().getParameter("mdId");
				String estatusValidacion = ServletActionContext.getRequest().getParameter("estatusValidacion");
				String comentarios = ServletActionContext.getRequest().getParameter("comentarios");
				

				final OkHttpClient client = new OkHttpClient.Builder()
				        .connectTimeout(40, TimeUnit.SECONDS)
				        .readTimeout(40, TimeUnit.SECONDS)
				        .writeTimeout(40, TimeUnit.SECONDS)
				        .build();

				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("mdId", mdId)
				 .add("factorId", "0")
				 .add("estatusValidacion", estatusValidacion)
				 .add("motivoRechazo", "0")
				 .add("comentarios", comentarios)
				 .add("finalizaValidacion", "1")
				 .add("puestoId", ""+puestoId)
				 .add("areaId", areaId)
				 .add("usuarioId", numeroEmpleado)
				 .add("nivel", "28");
				
				 RequestBody formBody = formBuilder.build();
	
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("autorizaMd"))
		                 .post(formBody)
		                 .build();

				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 
				 HttpServletResponse response2 = ServletActionContext.getResponse();
					response2.setContentType("application/json");
					response2.setCharacterEncoding("UTF-8");
					response2.getWriter().write(respuesta);
				
					System.out.println(respuesta);
					
			}
		}catch(Exception ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}catch(Error ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}
		
		return null;
	}	
	
	
	public String guardarDatosLevantamiento()throws Exception{
		session();
		
		try {
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{			
				String mdId = ServletActionContext.getRequest().getParameter("mdId");
				String areaRentar = ServletActionContext.getRequest().getParameter("areaRentar");
				String jefeConstruccion = ServletActionContext.getRequest().getParameter("jefeConstruccion");
				String fechalevantamiento = ServletActionContext.getRequest().getParameter("fechalevantamiento");
				String rutaarchivo = ServletActionContext.getRequest().getParameter("rutaarchivo");
				String cedulaAlcance = ServletActionContext.getRequest().getParameter("rutacedulaalcance");
				String poligonal = ServletActionContext.getRequest().getParameter("rutapoligonal");
				String fotoFachada = ServletActionContext.getRequest().getParameter("rutafachada");
				String fachadasyExt = ServletActionContext.getRequest().getParameter("fachadasyExt");
				String interioresYAreaP = ServletActionContext.getRequest().getParameter("interioresYAreaP");
				String losas = ServletActionContext.getRequest().getParameter("losas");
				String varios = ServletActionContext.getRequest().getParameter("varios");
				String resumenyVobo = ServletActionContext.getRequest().getParameter("resumenyVobo");
				String ReestriccionesProp = ServletActionContext.getRequest().getParameter("ReestriccionesProp");
				String VoboGral = ServletActionContext.getRequest().getParameter("VoboGral");
				String comentarios = ServletActionContext.getRequest().getParameter("comentarios");
				String tipofinaliza = ServletActionContext.getRequest().getParameter("tipofinaliza");
					
				final OkHttpClient client = new OkHttpClient.Builder()
				        .connectTimeout(40, TimeUnit.SECONDS)
				        .readTimeout(40, TimeUnit.SECONDS)
				        .writeTimeout(40, TimeUnit.SECONDS)
				        .build();

				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("mdId", mdId)
				 .add("usuarioId", numeroEmpleado)
				 .add("areaRentar", areaRentar)
				 .add("jefeConstruccion", jefeConstruccion)
				 .add("fechalevantamiento", fechalevantamiento)
				 .add("rutaarchivo", rutaarchivo)
				 .add("rutacedulaalcance", cedulaAlcance)
				 .add("rutapoligonal", poligonal)
				 .add("rutafachada", fotoFachada)
				 .add("fachadasyExt", fachadasyExt)
				 .add("interioresYAreaP", interioresYAreaP)
				 .add("losas", losas)
				 .add("varios", varios)
				 .add("resumenyVobo", resumenyVobo)
				 .add("ReestriccionesProp", ReestriccionesProp)
				 .add("VoboGral", VoboGral)
				 .add("comentarios", comentarios)
				 .add("tipofinaliza", tipofinaliza);
				

				 RequestBody formBody = formBuilder.build();
	
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("ws_levantamientoguardar"))
		                 .post(formBody)
		                 .build();

				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 
				 HttpServletResponse response2 = ServletActionContext.getResponse();
					response2.setContentType("application/json");
					response2.setCharacterEncoding("UTF-8");
					response2.getWriter().write(respuesta);
				
					System.out.println(respuesta);
					
			}
		}catch(Exception ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}catch(Error ex) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,ex + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " ); 			
		}
		
		return null;
	}	

	
	public void subeArchivo() throws Exception{
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		 
		String mdId = null, 
			nombreArchivo = null, 
			archivo = null, 
			formato = null, 
			tipoArchivo = null, 
			fecha = null;
		

			nombreArchivo = ServletActionContext.getRequest().getParameter("nombreArchivo");
			archivo = ServletActionContext.getRequest().getParameter("archivo");
			formato = ServletActionContext.getRequest().getParameter("formato");
			tipoArchivo = ServletActionContext.getRequest().getParameter("tipoArchivo");
			mdId = ServletActionContext.getRequest().getParameter("mdId");
			fecha = ServletActionContext.getRequest().getParameter("fecha");
		
		
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				
				final OkHttpClient client = new OkHttpClient();
				
				Builder builder;
				RequestBody body;
				Request request;
				Response response;

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
						}
				}
				
				HttpServletResponse re = ServletActionContext.getResponse();
				re.setContentType("application/json");
				re.setCharacterEncoding("UTF-8");
				re.getWriter().write(respuesta);
				
				
				 
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
	
	void session() {
		if(usuario != null) {
			numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			puestoId = usuario.getPerfil().getPuestoId();
					if(usuario.getPerfil().getAreasxpuesto().length > 0) {
						areaId = String.valueOf(usuario.getPerfil().getAreasxpuesto()[0].getAreaId());
					}
					else
						areaId="1";

			
		}
	}


}
