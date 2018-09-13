package com.tiendas.neto.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ReestablecePassAction extends ExpansionAction {
	private static final long serialVersionUID = 1L;
	private static final String REESTABLECE_PASS = "2";
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	@Override
	public String execute() throws Exception{
		
		String respuesta = "";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		String usuario = ServletActionContext.getRequest().getParameter("usuario");
		String token = ServletActionContext.getRequest().getParameter("token");
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try {
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
					.add("usuarioId", usuario)
					.add("token", token)
					.add("tipollamado", REESTABLECE_PASS);
				
			RequestBody formBody = formBuilder.build();
			Request request = new Request.Builder()
				 .url(sp.getPropiedad("reestablecercontrasenia"))
                 .post(formBody)
                 .build();
		
			Response response = client.newCall(request).execute();
			respuesta = response.body().string();
			response2.getWriter().write(respuesta);
		} catch (Exception e){
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", "");
			response2.getWriter().write("error");
		 }
		return null;
	}

}
