package com.tiendas.neto.vo;

import java.io.Serializable;

public class ConteoVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int conteoId;
	private int totalPersonas;
	private String fecha;
	private String horario;
	private int horarioId;
	/**
	 * @return the conteoId
	 */
	public int getConteoId() {
		return conteoId;
	}
	/**
	 * @param conteoId the conteoId to set
	 */
	public void setConteoId(int conteoId) {
		this.conteoId = conteoId;
	}
	/**
	 * @return the totalPersonas
	 */
	public int getTotalPersonas() {
		return totalPersonas;
	}
	/**
	 * @param totalPersonas the totalPersonas to set
	 */
	public void setTotalPersonas(int totalPersonas) {
		this.totalPersonas = totalPersonas;
	}
	/**
	 * @return the fecha
	 */
	public String getFecha() {
		return fecha;
	}
	/**
	 * @param fecha the fecha to set
	 */
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	/**
	 * @return the horario
	 */
	public String getHorario() {
		return horario;
	}
	/**
	 * @param horario the horario to set
	 */
	public void setHorario(String horario) {
		this.horario = horario;
	}
	/**
	 * @return the horarioId
	 */
	public int getHorarioId() {
		return horarioId;
	}
	/**
	 * @param horarioId the horarioId to set
	 */
	public void setHorarioId(int horarioId) {
		this.horarioId = horarioId;
	}
	
}
