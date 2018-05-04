package com.tiendas.neto.vo;

import java.io.Serializable;

public class AsignadasVO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int codigo;
	private String mensaje;
	private MemoriaAsignadaVO[] listaAsignadas;
	public int getCodigo() {
		return codigo;
	}
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public MemoriaAsignadaVO[] getListaAsignadas() {
		return listaAsignadas;
	}
	public void setListaAsignadas(MemoriaAsignadaVO[] listaAsignadas) {
		this.listaAsignadas = listaAsignadas;
	}
	
	

}
