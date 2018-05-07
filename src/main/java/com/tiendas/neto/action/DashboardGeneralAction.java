package com.tiendas.neto.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class DashboardGeneralAction extends ActionSupport implements SessionAware, ParameterNameAware {
	protected Map<String, Object> session ;
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private String tipoConsulta;
	private String fechaConsulta;
	
	public String getTipoConsulta() {
		return tipoConsulta;
	}

	public void setTipoConsulta(String tipoConsulta) {
		this.tipoConsulta = tipoConsulta;
	}

	public String getFechaConsulta() {
		return fechaConsulta;
	}

	public void setFechaConsulta(String fechaConsulta) {
		this.fechaConsulta = fechaConsulta;
	}
	
	@Override
	public String execute() throws Exception{
		String respuesta="";
		UsuarioLoginVO userLogin=null;
	
		try{
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
		 .add("tipoConsulta", getTipoConsulta())
         .add("fechaConsulta", getFechaConsulta());
		
		 RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("dashboard"))
                 .post(formBody)
                 .build();
		
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
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
	
	@Override
	public void setSession(Map<String, Object> session) {					 
		this.session = session ;	
	}

	@Override
	public boolean acceptableParameterName(String parameterName) {	     
		boolean allowedParameterName = true ;	     
		if ( parameterName.contains("session")  || parameterName.contains("request") ) {	     
			allowedParameterName = false ;	         
		} 	     
		return allowedParameterName;
	}
}
