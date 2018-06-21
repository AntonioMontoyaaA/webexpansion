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

public class DetalleMemoriaAsignadaAction extends ActionSupport implements SessionAware, ParameterNameAware {
	protected Map<String, Object> session ;
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	
	private String mdId;
	private String nombreMd;
	private String tipoMd;
	
	public String getTipoMd() {
		return tipoMd;
	}
	
	public void setTipoMd(String tipoMd) {
		this.tipoMd = tipoMd;
	}
	
	public String getMdId() {
		return mdId;
	}

	public void setMdId(String mdId) {
		this.mdId = mdId;
	}

	public String getNombreMd() {
		return nombreMd;
	}

	public void setNombreMd(String nombreMd) {
		this.nombreMd = nombreMd;
	}

	@Override
	public String execute() throws Exception{
		
		String nombreMd = ServletActionContext.getRequest().getParameter("nombreMd");
		String mdId = ServletActionContext.getRequest().getParameter("mdId");
		String tipoMd = ServletActionContext.getRequest().getParameter("tipoMd");
		
		this.mdId = mdId;
		this.nombreMd = nombreMd;
		this.tipoMd = tipoMd;
		
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
