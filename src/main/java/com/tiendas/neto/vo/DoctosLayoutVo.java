package com.tiendas.neto.vo;

import java.io.Serializable;

public class DoctosLayoutVo implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String mdId;
	private String nombreArchivo;
	private String archivo;
	private String formato;
	private String tipoArchivo;
	private String tipoServicio;
	private String fecha;
	private String monto;
	private String acc;
	
	
	public String getMdId() {
		return mdId;
	}
	public void setMdId(String mdId) {
		this.mdId = mdId;
	}
	public String getNombreArchivo() {
		return nombreArchivo;
	}
	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}
	public String getArchivo() {
		return archivo;
	}
	public void setArchivo(String archivo) {
		this.archivo = archivo;
	}
	public String getFormato() {
		return formato;
	}
	public void setFormato(String formato) {
		this.formato = formato;
	}
	public String getTipoArchivo() {
		return tipoArchivo;
	}
	public void setTipoArchivo(String tipoArchivo) {
		this.tipoArchivo = tipoArchivo;
	}
	public String getTipoServicio() {
		return tipoServicio;
	}
	public void setTipoServicio(String tipoServicio) {
		this.tipoServicio = tipoServicio;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getMonto() {
		return monto;
	}
	public void setMonto(String monto) {
		this.monto = monto;
	}
	public String getAcc() {
		return acc;
	}
	public void setAcc(String acc) {
		this.acc = acc;
	}
	
	
}
