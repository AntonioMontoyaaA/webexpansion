package com.tiendas.neto.vo;

import java.io.Serializable;

public class FactorVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int factorId;
	private String factor;
	private Subfactor[] listaSubfactores;
	private Subfactor[] subfactores;
	private String nivelId;
	private String nombreFactor;
	private String valor;
	
	
	/**
	 * @return the factorId
	 */
	public int getFactorId() {
		return factorId;
	}
	/**
	 * @param factorId the factorId to set
	 */
	public void setFactorId(int factorId) {
		this.factorId = factorId;
	}
	/**
	 * @return the factor
	 */
	public String getFactor() {
		return factor;
	}
	/**
	 * @param factor the factor to set
	 */
	public void setFactor(String factor) {
		this.factor = factor;
	}
	/**
	 * @return the listaSubfactores
	 */
	public Subfactor[] getListaSubfactores() {
		return listaSubfactores;
	}
	/**
	 * @param listaSubfactores the listaSubfactores to set
	 */
	public void setListaSubfactores(Subfactor[] listaSubfactores) {
		this.listaSubfactores = listaSubfactores;
	}
	public String getNivelId() {
		return nivelId;
	}
	public void setNivelId(String nivelId) {
		this.nivelId = nivelId;
	}
	public String getNombreFactor() {
		return nombreFactor;
	}
	public void setNombreFactor(String nombreFactor) {
		this.nombreFactor = nombreFactor;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public Subfactor[] getSubfactores() {
		return subfactores;
	}
	public void setSubfactores(Subfactor[] subfactores) {
		this.subfactores = subfactores;
	}
	
	
	
}
