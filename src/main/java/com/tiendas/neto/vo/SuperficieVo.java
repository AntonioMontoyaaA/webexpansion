package com.tiendas.neto.vo;

import java.io.Serializable;

public class SuperficieVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int frente;
	private int profundidad;
	private int total;
	private FotoVo fotoLateral1;
	private FotoVo fotoLateral2;
	private FotoVo vistaFrontal;
	private String puntos;
	private String tip;
	/**
	 * @return the frente
	 */
	public int getFrente() {
		return frente;
	}
	/**
	 * @param frente the frente to set
	 */
	public void setFrente(int frente) {
		this.frente = frente;
	}
	/**
	 * @return the profundidad
	 */
	public int getProfundidad() {
		return profundidad;
	}
	/**
	 * @param profundidad the profundidad to set
	 */
	public void setProfundidad(int profundidad) {
		this.profundidad = profundidad;
	}
	/**
	 * @return the total
	 */
	public int getTotal() {
		return total;
	}
	/**
	 * @param total the total to set
	 */
	public void setTotal(int total) {
		this.total = total;
	}
	/**
	 * @return the fotoLateral1
	 */
	public FotoVo getFotoLateral1() {
		return fotoLateral1;
	}
	/**
	 * @param fotoLateral1 the fotoLateral1 to set
	 */
	public void setFotoLateral1(FotoVo fotoLateral1) {
		this.fotoLateral1 = fotoLateral1;
	}
	/**
	 * @return the fotoLateral2
	 */
	public FotoVo getFotoLateral2() {
		return fotoLateral2;
	}
	/**
	 * @param fotoLateral2 the fotoLateral2 to set
	 */
	public void setFotoLateral2(FotoVo fotoLateral2) {
		this.fotoLateral2 = fotoLateral2;
	}
	/**
	 * @return the vistaFrontal
	 */
	public FotoVo getVistaFrontal() {
		return vistaFrontal;
	}
	/**
	 * @param vistaFrontal the vistaFrontal to set
	 */
	public void setVistaFrontal(FotoVo vistaFrontal) {
		this.vistaFrontal = vistaFrontal;
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
