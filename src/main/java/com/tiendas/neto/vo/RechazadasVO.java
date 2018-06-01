package com.tiendas.neto.vo;

import java.io.Serializable;

public class RechazadasVO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int codigo;
	private String mensaje;
	private MemoriaVO[] listaRechazadas;
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

	public MemoriaVO[] getListaRechazadas() {
		return listaRechazadas;
	}

	public void setListaRechazadas(MemoriaVO[] listaRechazadas) {
		this.listaRechazadas = listaRechazadas;
	}

	
	
	

}
