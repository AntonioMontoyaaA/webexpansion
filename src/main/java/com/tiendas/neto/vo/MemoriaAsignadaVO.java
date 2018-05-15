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
	private boolean mdVencida;
	/**
	 * @return the mdId
	 */
	public long getMdId() {
		return mdId;
	}
	/**
	 * @param mdId the mdId to set
	 */
	public void setMdId(long mdId) {
		this.mdId = mdId;
	}
	/**
	 * @return the nombreMd
	 */
	public String getNombreMd() {
		return nombreMd;
	}
	/**
	 * @param nombreMd the nombreMd to set
	 */
	public void setNombreMd(String nombreMd) {
		this.nombreMd = nombreMd;
	}
	/**
	 * @return the categoria
	 */
	public String getCategoria() {
		return categoria;
	}
	/**
	 * @param categoria the categoria to set
	 */
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	/**
	 * @return the puntuacion
	 */
	public int getPuntuacion() {
		return puntuacion;
	}
	/**
	 * @param puntuacion the puntuacion to set
	 */
	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}
	/**
	 * @return the creador
	 */
	public String getCreador() {
		return creador;
	}
	/**
	 * @param creador the creador to set
	 */
	public void setCreador(String creador) {
		this.creador = creador;
	}
	/**
	 * @return the fechaCreacion
	 */
	public String getFechaCreacion() {
		return fechaCreacion;
	}
	/**
	 * @param fechaCreacion the fechaCreacion to set
	 */
	public void setFechaCreacion(String fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	/**
	 * @return the fechaVencimiento
	 */
	public String getFechaVencimiento() {
		return fechaVencimiento;
	}
	/**
	 * @param fechaVencimiento the fechaVencimiento to set
	 */
	public void setFechaVencimiento(String fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}
	/**
	 * @return the mdVencida
	 */
	public boolean isMdVencida() {
		return mdVencida;
	}
	/**
	 * @param mdVencida the mdVencida to set
	 */
	public void setMdVencida(boolean mdVencida) {
		this.mdVencida = mdVencida;
	}

}
