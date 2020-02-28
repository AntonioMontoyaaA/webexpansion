package com.tiendas.neto.vo;

import java.io.Serializable;

public class Fcurl implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String url;
    private String fecha;
    private String nombreArchivo;

    public Fcurl(){}

    public Fcurl(String url, String fecha, String nombreArchivo) {
        this.url = url;
        this.fecha = fecha;
        this.nombreArchivo = nombreArchivo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
}
