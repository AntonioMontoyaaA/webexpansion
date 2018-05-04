package com.tiendas.neto.vo;

import java.io.Serializable;

public class FlujoPeatonalVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int promedio;
	private ConteoVo[] listaConteos;
	private String puntos;
	private String tip;
	/**
	 * @return the promedio
	 */
	public int getPromedio() {
		return promedio;
	}
	/**
	 * @param promedio the promedio to set
	 */
	public void setPromedio(int promedio) {
		this.promedio = promedio;
	}
	/**
	 * @return the listaConteos
	 */
	public ConteoVo[] getListaConteos() {
		return listaConteos;
	}
	/**
	 * @param listaConteos the listaConteos to set
	 */
	public void setListaConteos(ConteoVo[] listaConteos) {
		this.listaConteos = listaConteos;
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
