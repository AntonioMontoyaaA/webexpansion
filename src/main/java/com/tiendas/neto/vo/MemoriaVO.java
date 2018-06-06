package com.tiendas.neto.vo;

import java.io.Serializable;

public class MemoriaVO implements Serializable {
	
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
	private String mdVencida;
	private String nombreRechazo;
	private String tipoRechazo;
	private String motivoRechazo;
	private String fechaRechazo;
	private AreasVo[] listaAreas;
	
	
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getMdVencida() {
		return mdVencida;
	}
	public void setMdVencida(String mdVencida) {
		this.mdVencida = mdVencida;
	}
	public String getNombreRechazo() {
		return nombreRechazo;
	}
	public void setNombreRechazo(String nombreRechazo) {
		this.nombreRechazo = nombreRechazo;
	}
	public String getTipoRechazo() {
		return tipoRechazo;
	}
	public void setTipoRechazo(String tipoRechazo) {
		this.tipoRechazo = tipoRechazo;
	}
	public String getMotivoRechazo() {
		return motivoRechazo;
	}
	public void setMotivoRechazo(String motivoRechazo) {
		this.motivoRechazo = motivoRechazo;
	}
	public String getFechaRechazo() {
		return fechaRechazo;
	}
	public void setFechaRechazo(String fechaRechazo) {
		this.fechaRechazo = fechaRechazo;
	}
	public AreasVo[] getListaAreas() {
		return listaAreas;
	}
	public void setListaAreas(AreasVo[] listaAreas) {
		this.listaAreas = listaAreas;
	}
	
}
