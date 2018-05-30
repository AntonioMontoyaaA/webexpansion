package com.tiendas.neto.vo;

import java.io.Serializable;

public class MemoriaAutorizadaVO implements Serializable {
	
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
	private String autorizador;
	private String fechaAutorizacion;
	private String tipoAutorizacion;
	
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
	public String getAutorizador() {
		return autorizador;
	}
	public void setAutorizador(String autorizador) {
		this.autorizador = autorizador;
	}
	public String getFechaAutorizacion() {
		return fechaAutorizacion;
	}
	public void setFechaAutorizacion(String fechaAutorizacion) {
		this.fechaAutorizacion = fechaAutorizacion;
	}
	public String getTipoAutorizacion() {
		return tipoAutorizacion;
	}
	public void setTipoAutorizacion(String tipoAutorizacion) {
		this.tipoAutorizacion = tipoAutorizacion;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
