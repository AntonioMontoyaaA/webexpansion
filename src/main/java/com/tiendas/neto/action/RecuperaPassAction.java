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

public class RecuperaPassAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
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
		
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try{
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
         .add("usuarioId", getUsuarioId());
				
		RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("recuperaPass"))
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
}
