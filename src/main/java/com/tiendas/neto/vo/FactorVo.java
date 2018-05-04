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
	
	
	
}
