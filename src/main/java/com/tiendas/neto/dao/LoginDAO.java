package com.tiendas.neto.dao;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;
import com.google.gson.Gson;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.UsuarioLoginVO;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class LoginDAO {
	private static final Logger logger = Logger.getLogger(LoginDAO.class);
	SingletonProperties sp=SingletonProperties.getInstancia();
	
	public UsuarioLoginVO comprueba_login(String user, String pass) {
		String respuesta="";
		UsuarioLoginVO userLogin=null;
		
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
		 .add("usuarioId", user)
         .add("contrasena", pass)
         .add("numTelefono", "")
         .add("tipoLog", "2");
		
		 RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("login"))
                 .post(formBody)
                 .build();
		
		 try{
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
		 
		 Gson gson = new Gson();
		 String jsonInString = respuesta;
		 userLogin = gson.fromJson(jsonInString, UsuarioLoginVO.class);
		 }
		 catch (Exception e){	 
			 logger.error(e);
		 }
	return userLogin;
   }  
}
