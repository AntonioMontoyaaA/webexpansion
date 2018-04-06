package com.tiendas.neto.dao;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;

import org.apache.log4j.Logger;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.tiendas.neto.vo.Usuario;


public class LoginDAO {
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(LoginDAO.class);
	
	@SuppressWarnings("unused")
	public String loginDao(String user, String pass) {
		 String result="";
       try {
           Gson gson = new Gson();
           String jsonInString = "{\"usuario\":\""+user+"\",\"contra\":\""+pass+"\"}";
           result="success";  
       } catch (Exception e){}
       return result;
   }
	
	public List<Usuario> permisosDao(String user) {
		List<Usuario> lista=new ArrayList();
		String json="";
		try { 
			URL url = new URL("http://167.99.109.141:8080/JavaRestMovil/rest/TestLogin/validaUsuario2WS");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader(
				(conn.getInputStream()), "UTF-8"));

			String output;
			while ((output = br.readLine()) != null) {
				json="["+output+"]";
			}
			conn.disconnect();
    	   
    	   Gson gson = new Gson();
			Type listType = new TypeToken<List<Usuario>>(){}.getType();
			 lista = (List<Usuario>) gson.fromJson(json, listType);
  
       } catch (Exception e) {
    	   e.printStackTrace();
       }
	return lista;
   }
	 
	  
}
