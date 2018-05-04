package com.tiendas.neto.vo;

import java.io.Serializable;

public class FotoVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String nombreFoto;
	private String fecha;
	private String hora;
	/**
	 * @return the nombreFoto
	 */
	public String getNombreFoto() {
		return nombreFoto;
	}
	/**
	 * @param nombreFoto the nombreFoto to set
	 */
	public void setNombreFoto(String nombreFoto) {
		this.nombreFoto = nombreFoto;
	}
	/**
	 * @return the fecha
	 */
	public String getFecha() {
		return fecha;
	}
	/**
	 * @param fecha the fecha to set
	 */
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	/**
	 * @return the hora
	 */
	public String getHora() {
		return hora;
	}
	/**
	 * @param hora the hora to set
	 */
	public void setHora(String hora) {
		this.hora = hora;
	}
	
	
}
