package com.tiendas.neto.vo;

import java.io.Serializable;

public class ZonificacionVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private CompetenciaVo[] listaCompetencias;
	private GeneradorVo[] listaGeneradores;
	private String puntos;
	private String tip;
	/**
	 * @return the listaCompetencias
	 */
	public CompetenciaVo[] getListaCompetencias() {
		return listaCompetencias;
	}
	/**
	 * @param listaCompetencias the listaCompetencias to set
	 */
	public void setListaCompetencias(CompetenciaVo[] listaCompetencias) {
		this.listaCompetencias = listaCompetencias;
	}
	/**
	 * @return the listaGeneradores
	 */
	public GeneradorVo[] getListaGeneradores() {
		return listaGeneradores;
	}
	/**
	 * @param listaGeneradores the listaGeneradores to set
	 */
	public void setListaGeneradores(GeneradorVo[] listaGeneradores) {
		this.listaGeneradores = listaGeneradores;
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
