package com.tiendas.neto.vo;

import java.io.Serializable;

public class GeneralidadesSitioVo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private double renta;
	private int disponibilidadId;
	private String disponibilidad;
	private double amortizacion;
	private int tiempoAmortizacion;
	private String periodoGracia;
	private String puntos;
	private String tip;
	/**
	 * @return the renta
	 */
	public double getRenta() {
		return renta;
	}
	/**
	 * @param renta the renta to set
	 */
	public void setRenta(double renta) {
		this.renta = renta;
	}
	/**
	 * @return the disponibilidadId
	 */
	public int getDisponibilidadId() {
		return disponibilidadId;
	}
	/**
	 * @param disponibilidadId the disponibilidadId to set
	 */
	public void setDisponibilidadId(int disponibilidadId) {
		this.disponibilidadId = disponibilidadId;
	}
	/**
	 * @return the disponibilidad
	 */
	public String getDisponibilidad() {
		return disponibilidad;
	}
	/**
	 * @param disponibilidad the disponibilidad to set
	 */
	public void setDisponibilidad(String disponibilidad) {
		this.disponibilidad = disponibilidad;
	}
	/**
	 * @return the amortizacion
	 */
	public double getAmortizacion() {
		return amortizacion;
	}
	/**
	 * @param amortizacion the amortizacion to set
	 */
	public void setAmortizacion(double amortizacion) {
		this.amortizacion = amortizacion;
	}
	/**
	 * @return the tiempoAmortizacion
	 */
	public int getTiempoAmortizacion() {
		return tiempoAmortizacion;
	}
	/**
	 * @param tiempoAmortizacion the tiempoAmortizacion to set
	 */
	public void setTiempoAmortizacion(int tiempoAmortizacion) {
		this.tiempoAmortizacion = tiempoAmortizacion;
	}
	/**
	 * @return the periodoGracia
	 */
	public String getPeriodoGracia() {
		return periodoGracia;
	}
	/**
	 * @param periodoGracia the periodoGracia to set
	 */
	public void setPeriodoGracia(String periodoGracia) {
		this.periodoGracia = periodoGracia;
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
