package com.tiendas.neto.vo;

import java.io.Serializable;

public class ConstruccionVo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private FactorVo[] listaFactores;
	private int condicionesGeneralesId;
	private String condicionesGenerales;
	private String puntos;
	private String tip;
	/**
	 * @return the listaFactores
	 */
	public FactorVo[] getListaFactores() {
		return listaFactores;
	}
	/**
	 * @param listaFactores the listaFactores to set
	 */
	public void setListaFactores(FactorVo[] listaFactores) {
		this.listaFactores = listaFactores;
	}
	/**
	 * @return the condicionesGeneralesId
	 */
	public int getCondicionesGeneralesId() {
		return condicionesGeneralesId;
	}
	/**
	 * @param condicionesGeneralesId the condicionesGeneralesId to set
	 */
	public void setCondicionesGeneralesId(int condicionesGeneralesId) {
		this.condicionesGeneralesId = condicionesGeneralesId;
	}
	/**
	 * @return the condicionesGenerales
	 */
	public String getCondicionesGenerales() {
		return condicionesGenerales;
	}
	/**
	 * @param condicionesGenerales the condicionesGenerales to set
	 */
	public void setCondicionesGenerales(String condicionesGenerales) {
		this.condicionesGenerales = condicionesGenerales;
	}
	/**
	 * @return the puntos
	 */
	public String getPuntos() {
		return puntos;
	}
	/**
	 * @param puntos the puntos to set
	 */
	public void setPuntos(String puntos) {
		this.puntos = puntos;
	}
	/**
	 * @return the tip
	 */
	public String getTip() {
		return tip;
	}
	/**
	 * @param tip the tip to set
	 */
	public void setTip(String tip) {
		this.tip = tip;
	}
	
	

}
