package com.tiendas.neto.vo;

import java.io.Serializable;

public class MemoriaAsignadaVO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long mdId;
	private String nombreMd;
	private String categoria;
	private int puntuacion;
	private String creador;
	private String fechaCreacion;
	private String fechaVencimiento;
	public long getMdId() {
		return mdId;
	}
	public void setMdId(long mdId) {
		this.mdId = mdId;
	}
	public String getNombreMd() {
		return nombreMd;
	}
	public void setNombreMd(String nombreMd) {
		this.nombreMd = nombreMd;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public int getPuntuacion() {
		return puntuacion;
	}
	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}
	public String getCreador() {
		return creador;
	}
	public void setCreador(String creador) {
		this.creador = creador;
	}
	public String getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(String fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	public String getFechaVencimiento() {
		return fechaVencimiento;
	}
	public void setFechaVencimiento(String fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}
	
	

}
