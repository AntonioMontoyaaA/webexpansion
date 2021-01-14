package com.tiendas.neto.action;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.tiendas.neto.action.ExpansionAction;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class SubeFotosMDAction extends ExpansionAction {
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	
	public String obtieneMDS() throws Exception{
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
		String usuarioGerenteId = ServletActionContext.getRequest().getParameter("usuarioGerenteId");
		String usuarioJefeId = ServletActionContext.getRequest().getParameter("usuarioJefeId");
		
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try{
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
					.add("usuarioId", numeroEmpleado)
					.add("usuarioGerenteId", usuarioGerenteId)
					.add("usuarioJefeId",usuarioJefeId);
				
			RequestBody formBody = formBuilder.build();
			Request request = new Request.Builder()
				 .url(sp.getPropiedad("obtieneMdsDeJefeoGerente"))
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
			response2.getWriter().write("error");
		 }
		
		return null;
	}
	
	public String consultaSuperficie() throws Exception{
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
		String mdId = ServletActionContext.getRequest().getParameter("mdId");
		
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try{
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
					.add("usuarioId", numeroEmpleado)
					.add("mdId", mdId);
				
			RequestBody formBody = formBuilder.build();
			Request request = new Request.Builder()
				 .url(sp.getPropiedad("consultasuperficie"))
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
			response2.getWriter().write("error");
		 }
		
		return null;
	}
	
	public String guardaSuperficie() throws Exception{
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
		String mdId = null, frente = null, fondo = null, latitud = null, longitud = null, imgPredial = null, fechaPredial = null,
			   imgFrenteId = null, imgEntorno1Id = null, imgEntorno2Id = null, imgEnt1 = null, imgEnt2 = null, imgEnt3 = null,
			   fechaFrente = null, fechaEntorno1 = null, fechaEntorno2 = null, fechaEnt1 = null, fechaEnt2 = null, fechaEnt3 = null, numTelefono = null,
			   versionApp = null, esquina = null, drenaje = null ; 
		
		mdId = ServletActionContext.getRequest().getParameter("mdId");
		frente = ServletActionContext.getRequest().getParameter("frente");
		fondo = ServletActionContext.getRequest().getParameter("fondo");
		latitud = ServletActionContext.getRequest().getParameter("latitud");
		longitud = ServletActionContext.getRequest().getParameter("longitud");
		imgPredial = ServletActionContext.getRequest().getParameter("imgPredial");
		fechaPredial = ServletActionContext.getRequest().getParameter("fechaPredial");
		imgFrenteId = ServletActionContext.getRequest().getParameter("imgFrenteId");
		imgEntorno1Id = ServletActionContext.getRequest().getParameter("imgEntorno1Id");
		imgEntorno2Id = ServletActionContext.getRequest().getParameter("imgEntorno2Id");
		imgEnt1 = ServletActionContext.getRequest().getParameter("imgEnt1");
		imgEnt2 = ServletActionContext.getRequest().getParameter("imgEnt2");
		imgEnt3 = ServletActionContext.getRequest().getParameter("imgEnt3");
		fechaFrente = ServletActionContext.getRequest().getParameter("fechaFrente");
		fechaEntorno1 = ServletActionContext.getRequest().getParameter("fechaEntorno1");
		fechaEntorno2 = ServletActionContext.getRequest().getParameter("fechaEntorno2");
		fechaEnt1 = ServletActionContext.getRequest().getParameter("fechaEnt1");
		fechaEnt2 = ServletActionContext.getRequest().getParameter("fechaEnt2");
		fechaEnt3 = ServletActionContext.getRequest().getParameter("fechaEnt3");
		numTelefono = ServletActionContext.getRequest().getParameter("numTelefono");
		versionApp = ServletActionContext.getRequest().getParameter("versionApp");
		esquina = ServletActionContext.getRequest().getParameter("esquina");
		drenaje = ServletActionContext.getRequest().getParameter("drenaje");
		
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try{
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
					.add("usuarioId", numeroEmpleado)
					.add("mdId", mdId)
					.add("frente",frente)
					.add("fondo", fondo)
					.add("latitud", latitud)
					.add("longitud",longitud)
					.add("imgPredial", imgPredial)
					.add("fechaPredial", fechaPredial)
					.add("imgFrenteId",imgFrenteId)
					.add("imgEntorno1Id", imgEntorno1Id)
					.add("imgEntorno2Id", imgEntorno2Id)
					.add("imgEnt1",imgEnt1)
					.add("imgEnt2", imgEnt2)
					.add("imgEnt3", imgEnt3)
					.add("fechaFrente",fechaFrente)
					.add("fechaEntorno1", fechaEntorno1)
					.add("fechaEntorno2", fechaEntorno2)
					.add("fechaEnt1",fechaEnt1)
					.add("fechaEnt2", fechaEnt2)
					.add("fechaEnt3", fechaEnt3)
					.add("numTelefono",numTelefono)
					.add("versionApp", versionApp)
					.add("esquina", esquina)
					.add("drenaje",drenaje);
				
			RequestBody formBody = formBuilder.build();
			Request request = new Request.Builder()
				 .url(sp.getPropiedad("superficie"))
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
			response2.getWriter().write("error");
		 }
		
		return null;
	}

	public String superficiePreconsulta() throws Exception{
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
		String mdId = ServletActionContext.getRequest().getParameter("mdId");
		
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try{
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
					.add("usuarioId", numeroEmpleado)
					.add("mdId", mdId);
				
			RequestBody formBody = formBuilder.build();
			Request request = new Request.Builder()
				 .url(sp.getPropiedad("superficiePreconsulta"))
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
			response2.getWriter().write("error");
		 }
		
		return null;
	}
}