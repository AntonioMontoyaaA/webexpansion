package com.tiendas.neto.vo;

import java.io.Serializable;

public class DatosPropietarioVo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int propietarioId;
	private String nombrePropietario;
	private String telefono;
	private String email;
	private boolean rentaANeto;
	/**
	 * @return the propietarioId
	 */
	public int getPropietarioId() {
		return propietarioId;
	}
	/**
	 * @param propietarioId the propietarioId to set
	 */
	public void setPropietarioId(int propietarioId) {
		this.propietarioId = propietarioId;
	}
	/**
	 * @return the nombrePropietario
	 */
	public String getNombrePropietario() {
		return nombrePropietario;
	}
	/**
	 * @param nombrePropietario the nombrePropietario to set
	 */
	public void setNombrePropietario(String nombrePropietario) {
		this.nombrePropietario = nombrePropietario;
	}
	/**
	 * @return the telefono
	 */
	public String getTelefono() {
		return telefono;
	}
	/**
	 * @param telefono the telefono to set
	 */
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the rentaANeto
	 */
	public boolean isRentaANeto() {
		return rentaANeto;
	}
	/**
	 * @param rentaANeto the rentaANeto to set
	 */
	public void setRentaANeto(boolean rentaANeto) {
		this.rentaANeto = rentaANeto;
	}
	
	

}
