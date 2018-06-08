package com.tiendas.neto.vo;

public class AreasVo {
	String areaId;
	String area;
	String puestosRechazo[];
	
	public String getAreaId() {
		return areaId;
	}
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	
	public String[] getPuestosRechazo() {
		return puestosRechazo;
	}
	public void setPuestosRechazo(String[] puestosRechazo) {
		this.puestosRechazo = puestosRechazo;
	}
	
}
