package com.tiendas.neto.vo;

public class MarcadoresVO {

	
	public MarcadoresVO(String latitud, String competenciaId, String longitud, String nivelId, String nombre,
			String generadorId) {
		this.latitud = latitud;
		this.competenciaId = competenciaId;
		this.longitud = longitud;
		this.nivelId = nivelId;
		this.nombre = nombre;
		this.generadorId = generadorId;
	}
	private String latitud;
	private String competenciaId;
	private String longitud;
	private String nivelId;
	private String nombre;
	private String generadorId;
	
	public String getLatitud() {
		return latitud;
	}
	public void setLatitud(String latitud) {
		this.latitud = latitud;
	}
	public String getCompetenciaId() {
		return competenciaId;
	}
	public void setCompetenciaId(String competenciaId) {
		this.competenciaId = competenciaId;
	}
	public String getLongitud() {
		return longitud;
	}
	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}
	public String getNivelId() {
		return nivelId;
	}
	public void setNivelId(String nivelId) {
		this.nivelId = nivelId;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getGeneradorId() {
		return generadorId;
	}
	public void setGeneradorId(String generadorId) {
		this.generadorId = generadorId;
	}
	

}
