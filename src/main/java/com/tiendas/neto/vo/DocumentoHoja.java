package com.tiendas.neto.vo;

import java.io.Serializable;

public class DocumentoHoja implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String url;
    private String fecha;
    private String nombreArchivo;

    public DocumentoHoja(){}

    public DocumentoHoja(String url, String fecha, String nombreArchivo) {
        this.url = url;
        this.fecha = fecha;
        this.nombreArchivo = nombreArchivo;
    }

	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
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
	 * @return the nombreArchivo
	 */
	public String getNombreArchivo() {
		return nombreArchivo;
	}

	/**
	 * @param nombreArchivo the nombreArchivo to set
	 */
	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}
    
    

}
