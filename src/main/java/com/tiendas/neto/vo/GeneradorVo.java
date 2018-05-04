package com.tiendas.neto.vo;

import java.io.Serializable;

public class GeneradorVo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int generadorId;
	private String nombreGenerador;
	private int nivelId;
	private double latitud;
	private double longitud;
	/**
	 * @return the generadorId
	 */
	public int getGeneradorId() {
		return generadorId;
	}
	/**
	 * @param generadorId the generadorId to set
	 */
	public void setGeneradorId(int generadorId) {
		this.generadorId = generadorId;
	}
	/**
	 * @return the nombreGenerador
	 */
	public String getNombreGenerador() {
		return nombreGenerador;
	}
	/**
	 * @param nombreGenerador the nombreGenerador to set
	 */
	public void setNombreGenerador(String nombreGenerador) {
		this.nombreGenerador = nombreGenerador;
	}
	/**
	 * @return the nivelId
	 */
	public int getNivelId() {
		return nivelId;
	}
	/**
	 * @param nivelId the nivelId to set
	 */
	public void setNivelId(int nivelId) {
		this.nivelId = nivelId;
	}
	/**
	 * @return the latitud
	 */
	public double getLatitud() {
		return latitud;
	}
	/**
	 * @param latitud the latitud to set
	 */
	public void setLatitud(double latitud) {
		this.latitud = latitud;
	}
	/**
	 * @return the longitud
	 */
	public double getLongitud() {
		return longitud;
	}
	/**
	 * @param longitud the longitud to set
	 */
	public void setLongitud(double longitud) {
		this.longitud = longitud;
	}
	
	

}
