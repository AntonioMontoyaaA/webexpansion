package com.tiendas.neto.vo;

import java.io.Serializable;

public class Subfactor implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int subfactorId;
	private int subFactorId;
	private String subfactor;
	private String nombre;
	private String comentario;
	/**
	 * @return the subfactorId
	 */
	public int getSubfactorId() {
		return subfactorId;
	}
	/**
	 * @param subfactorId the subfactorId to set
	 */
	public void setSubfactorId(int subfactorId) {
		this.subfactorId = subfactorId;
	}
	/**
	 * @return the subfactor
	 */
	public String getSubfactor() {
		return subfactor;
	}
	/**
	 * @param subfactor the subfactor to set
	 */
	public void setSubfactor(String subfactor) {
		this.subfactor = subfactor;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getSubFactorId() {
		return subFactorId;
	}
	public void setSubFactorId(int subFactorId) {
		this.subFactorId = subFactorId;
	}
	public String getComentario() {
		return comentario;
	}
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	
	
}
