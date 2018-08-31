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

public class DetalleMemoriaChatAction extends ActionSupport implements SessionAware, ParameterNameAware {
	
	protected Map<String, Object> session ;
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	
	private String mdIdChat;
	private String nombreMdChat;
	private String tipoMdChat;
	
	public String getTipoMdChat() {
		return tipoMdChat;
	}

	public void setTipoMdChat(String tipoMdChat) {
		this.tipoMdChat = tipoMdChat;
	}

	public String getNombreMdChat() {
		return nombreMdChat;
	}

	public void setNombreMdChat(String nombreMdChat) {
		this.nombreMdChat = nombreMdChat;
	}

	public String getMdIdChat() {
		return mdIdChat;
	}

	public void setMdIdChat(String mdIdChat) {
		this.mdIdChat = mdIdChat;
	}

	@Override
	public String execute() throws Exception{
		String mdIdChat = ServletActionContext.getRequest().getParameter("mdIdChat");
		this.mdIdChat = mdIdChat;
		String nombreMdChat = ServletActionContext.getRequest().getParameter("nombreMdChat");
		this.nombreMdChat = nombreMdChat;
		
		return "success";
	} 
	
	protected void sendJSONObjectToResponse(Object objToSend){
		Gson gson = new Gson();
		String jsonResult = gson.toJson(objToSend);	      
	      HttpServletResponse response = ServletActionContext.getResponse();
	      response.setContentType("application/json");
	      response.setCharacterEncoding("UTF-8");
	      try {
	    	  response.getWriter().write(jsonResult );
		} catch (IOException e) {
		}
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
