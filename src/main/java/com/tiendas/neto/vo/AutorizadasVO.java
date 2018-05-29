package com.tiendas.neto.vo;

import java.io.Serializable;

public class AutorizadasVO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int codigo;
	private String mensaje;
	private MemoriaAutorizadaVO[] listaAutorizadas;
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

	public MemoriaAutorizadaVO[] getListaAutorizadas() {
		return listaAutorizadas;
	}

	public void setListaAutorizadas(MemoriaAutorizadaVO[] listaAutorizadas) {
		this.listaAutorizadas = listaAutorizadas;
	}
	
	
	

}
