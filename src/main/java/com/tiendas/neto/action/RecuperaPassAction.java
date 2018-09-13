package com.tiendas.neto.action;

import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.MensajeVo;
import com.tiendas.neto.vo.RespuestaPassVo;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.SmsVo;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class RecuperaPassAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
	private static final String BUSCA_NUM_CELULAR = "1";
	
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private String usuarioId;
	
	public String getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(String usuarioId) {
		this.usuarioId = usuarioId;
	}

	@Override
	public String execute() throws Exception{
		
		String respuesta = "";
		String aleatorio = "";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		String usuario = ServletActionContext.getRequest().getParameter("usuario");
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try {
			aleatorio = obtieneAleatorio();
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
					.add("usuarioId", usuario)
					.add("token", aleatorio)
					.add("tipollamado", BUSCA_NUM_CELULAR);
				
			RequestBody formBody = formBuilder.build();
			Request request = new Request.Builder()
				 .url(sp.getPropiedad("reestablecercontrasenia"))
                 .post(formBody)
                 .build();
		
			Response response = client.newCall(request).execute();
			respuesta = response.body().string();
		 
			Gson g = new Gson(); 
			RespuestaPassVo p = g.fromJson(respuesta, RespuestaPassVo.class);
		 
			if(p.getCodigo() == 200 && !p.getNumero().equals("NA")) {
				enviaSMS(p.getNumero(), aleatorio);
			} else if(p.getNumero().equals("NA")) {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(403);
				respuestaVo.setMensaje("Usuario sin número registrado");
				sendJSONObjectToResponse(respuestaVo);
			} else {
				response2.getWriter().write(respuesta);
			}
		} catch (Exception e){
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			e.printStackTrace();
			response2.getWriter().write("error");
		 }
		return null;
	}
	
	public String obtieneAleatorio() {
		int min = 20000;
        int max = 80000;
        Random randomSem = new Random();
        int random = randomSem.nextInt((max - min) + 1) + min;
        return String.valueOf(random);
	}
	
	public void enviaSMS(String telefono, String clave) {
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try {
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
	         .add("text", clave);
					
			RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getUrl("smsService") + "?api_key=e9924988&api_secret=3d58be62b85751bc&to=52" + telefono + "&from=\"NETO\"")
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 
			 Gson g = new Gson(); 
			 SmsVo p = g.fromJson(respuesta, SmsVo.class);
			 
			 if(p.getMessages() != null && p.getMessages().length > 0) {
				 for(MensajeVo mensaje : p.getMessages()) {
					 RespuestaVo respuestaVo = new RespuestaVo();
					 if(mensaje.getStatus() == 0) {
						 respuestaVo.setCodigo(200);
						 respuestaVo.setMensaje("Token enviado exitosamente");
						 sendJSONObjectToResponse(respuestaVo);
					 } else {
						 respuestaVo.setCodigo(403);
						 respuestaVo.setMensaje("Error al enviar el código");
						 sendJSONObjectToResponse(respuestaVo);
					 }
				 }
			 }
		} catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(200);
			respuestaVo.setMensaje("Error: " + e.getMessage());
			sendJSONObjectToResponse(respuestaVo);
		}
	}
}
