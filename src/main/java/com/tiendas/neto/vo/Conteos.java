package com.tiendas.neto.vo;

public class Conteos {

	
	public Conteos(String total, String fecha, String detalleId, String horaFinal, String horaInicio) {
		
		this.total = total;
		this.fecha = fecha;
		this.detalleId = detalleId;
		this.horaFinal = horaFinal;
		this.horaInicio = horaInicio;
	}
	
	private String total;
	private String fecha;
	private String detalleId;
	private String horaFinal;
	private String horaInicio;
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getDetalleId() {
		return detalleId;
	}
	public void setDetalleId(String detalleId) {
		this.detalleId = detalleId;
	}
	public String getHoraFinal() {
		return horaFinal;
	}
	public void setHoraFinal(String horaFinal) {
		this.horaFinal = horaFinal;
	}
	public String getHoraInicio() {
		return horaInicio;
	}
	public void setHoraInicio(String horaInicio) {
		this.horaInicio = horaInicio;
	}
	

}
