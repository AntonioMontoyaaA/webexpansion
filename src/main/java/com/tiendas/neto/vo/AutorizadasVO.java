package com.tiendas.neto.vo;

import java.io.Serializable;

public class AutorizadasVO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int codigo;
	private String mensaje;
	private MemoriaVO[] listaAutorizadas;
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

	public MemoriaVO[] getListaAutorizadas() {
		return listaAutorizadas;
	}

	public void setListaAutorizadas(MemoriaVO[] listaAutorizadas) {
		this.listaAutorizadas = listaAutorizadas;
	}
	
	
	

}
