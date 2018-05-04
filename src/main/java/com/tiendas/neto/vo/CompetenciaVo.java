package com.tiendas.neto.vo;

import java.io.Serializable;

public class CompetenciaVo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int competenciaId;
	private String nombreCompetencia;
	private int nivelId;
	private double latitud;
	private double longitud;
	/**
	 * @return the competenciaId
	 */
	public int getCompetenciaId() {
		return competenciaId;
	}
	/**
	 * @param competenciaId the competenciaId to set
	 */
	public void setCompetenciaId(int competenciaId) {
		this.competenciaId = competenciaId;
	}
	/**
	 * @return the nombreCompetencia
	 */
	public String getNombreCompetencia() {
		return nombreCompetencia;
	}
	/**
	 * @param nombreCompetencia the nombreCompetencia to set
	 */
	public void setNombreCompetencia(String nombreCompetencia) {
		this.nombreCompetencia = nombreCompetencia;
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
