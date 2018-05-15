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

public class MensajeHistorialAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private String mdId;

	public String getMdId() {
		return mdId;
	}

	public void setMdId(String mdId) {
		this.mdId = mdId;
	}

	@Override
	public String execute() throws Exception{
		String respuesta="{'codigo': 200, 'mensaje': 'Datos guardados con exito','chat':{'mensajeId': 1, 'areaId': 1,"
				+ " 'area': 'auditoria', 'autor': 'Oscar Melo', 'texto': 'El Sian no está separado', "
				+ "'fecha': '23/04/2018', 'modulo': 0}}";
		/*
		try{
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
		 .add("mdId", getMdId());

		
		 RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad(""))
                 .post(formBody)
                 .build();
		
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
		 */
		try {
		 HttpServletResponse response2 = ServletActionContext.getResponse();
			response2.setContentType("application/json");
			response2.setCharacterEncoding("UTF-8");
			response2.getWriter().write(respuesta);
		 }
		 catch (Exception e){
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			e.printStackTrace();
		 }
		
		return null;
	}
}

