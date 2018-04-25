package com.tiendas.neto.dao;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.xml.bind.JAXBContext;

import org.apache.log4j.Logger;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.tiendas.neto.vo.UsuarioLoginVO;
import com.tiendas.neto.vo.UsuarioVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class LoginDAO {
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(LoginDAO.class);
	Properties prop = new Properties();
	InputStream is = null;
	
	
	@SuppressWarnings("unused")
	public UsuarioLoginVO comprueba_login(String user, String pass) {
		try {
			is = new FileInputStream("../expansionweb/src/main/java/com/tiendas/neto/dao/configuracion.properties");
			prop.load(is);
			System.out.println("ok");
			
		} catch(IOException e) {
			System.out.println(e.toString());
		}
		
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
				 .url("http://206.189.68.177/voksedesapi/login")
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
