package com.tiendas.neto.action;

import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

public class DetalleMemoriaAction extends ExpansionAction{
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
		System.out.println("tipoMd: " + this.tipoMd);
		return "success";
	} 
	
}
