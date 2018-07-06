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

public class AgendaAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private String fecha;
	private String tipoEvento;
	private String apartirDe;
	private String tareaxAreaId;
	private String fechaAgenda;
	private String fechaFinProgramada;
	private String observaciones;
	private String direccion;
	private String latitud;
	private String longitud;
	private String tipoAsignacion;
	private String porAsignar;
	
	
	public String getApartirDe() {
		return apartirDe;
	}

	public void setApartirDe(String apartirDe) {
		this.apartirDe = apartirDe;
	}

	public String getTareaxAreaId() {
		return tareaxAreaId;
	}

	public void setTareaxAreaId(String tareaxAreaId) {
		this.tareaxAreaId = tareaxAreaId;
	}

	public String getFechaAgenda() {
		return fechaAgenda;
	}

	public void setFechaAgenda(String fechaAgenda) {
		this.fechaAgenda = fechaAgenda;
	}

	public String getFechaFinProgramada() {
		return fechaFinProgramada;
	}

	public void setFechaFinProgramada(String fechaFinProgramada) {
		this.fechaFinProgramada = fechaFinProgramada;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getLatitud() {
		return latitud;
	}

	public void setLatitud(String latitud) {
		this.latitud = latitud;
	}

	public String getLongitud() {
		return longitud;
	}

	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}

	public String getTipoAsignacion() {
		return tipoAsignacion;
	}

	public void setTipoAsignacion(String tipoAsignacion) {
		this.tipoAsignacion = tipoAsignacion;
	}

	public String getPorAsignar() {
		return porAsignar;
	}

	public void setPorAsignar(String porAsignar) {
		this.porAsignar = porAsignar;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getTipoEvento() {
		return tipoEvento;
	}

	public void setTipoEvento(String tipoEvento) {
		this.tipoEvento = tipoEvento;
	}

	public String obtieneEmpleados() throws Exception{
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
				 .url(sp.getPropiedad("obtieneEmpleados"))
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
	
	public String obtieneEventos() throws Exception{
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
				 .url(sp.getPropiedad("obtieneEventos"))
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
	
	public String obtieneAgenda() throws Exception{
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
         .add("usuarioId", numeroEmpleado)
         .add("tipoEvento", getTipoEvento())
         .add("apartirDe",getApartirDe() )
         .add("fecha", getFecha());
				
		RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("obtieneAgenda"))
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
	
	public String enviaDatos() throws Exception{
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
		
		System.out.println(getTareaxAreaId()+" textarea ");
		System.out.println(getFechaAgenda()+" fechaagenda ");
		System.out.println(getFechaFinProgramada()+" fechafin ");
		System.out.println(getObservaciones()+" observa ");
		System.out.println(getDireccion()+" direccion ");
		System.out.println(getLatitud()+" latitud ");
		System.out.println(getLongitud()+" longi ");
		System.out.println(getTipoAsignacion()+" tipoa ");
		System.out.println(getPorAsignar()+" proasignar ");
		
		
		try{
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
         .add("usuarioIdRegistra", numeroEmpleado)
         .add("tareaxAreaId",getTareaxAreaId())
         .add("fechaAgenda", getFechaAgenda())
         .add("fechaFinProgramada", getFechaFinProgramada())
         .add("observaciones", getObservaciones())
         .add("direccion", getDireccion())
         .add("latitud", getLatitud())
         .add("longitud", getLongitud())
         .add("tipoAsignacion", getTipoAsignacion())
         .add("porAsignar", getPorAsignar());
				
		RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("agendaGuardaEvento"))
                 .post(formBody)
                 .build();
		
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
		 response2.getWriter().write(respuesta);
		 }
		 catch (Exception e){
			 e.printStackTrace();
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			
			response2.getWriter().write("error");
		 }
		
		return null;
	}
}
