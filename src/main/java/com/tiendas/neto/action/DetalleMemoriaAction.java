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

public class DetalleMemoriaAction extends ExpansionAction{
	protected Map<String, Object> session ;
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	
	private String mdId;
	private String nombreMd;
	private String tipo_md;
	
	public String getTipo_md() {
		return tipo_md;
	}

	public void setTipo_md(String tipo_md) {
		this.tipo_md = tipo_md;
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
		
		this.mdId = mdId;
		this.nombreMd = nombreMd;
		return "success";
	} 
	
}
