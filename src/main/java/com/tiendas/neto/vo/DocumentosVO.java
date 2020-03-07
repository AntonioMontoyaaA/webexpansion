package com.tiendas.neto.vo;

import java.io.Serializable;
import java.util.List;

public class DocumentosVO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer documentoId;
    private List<DocumentoHoja> documentos;
    private String descripcion;
    private Integer opcional;
	/**
	 * @return the documentoId
	 */
	public Integer getDocumentoId() {
		return documentoId;
	}
	/**
	 * @param documentoId the documentoId to set
	 */
	public void setDocumentoId(Integer documentoId) {
		this.documentoId = documentoId;
	}
	/**
	 * @return the documentos
	 */
	public List<DocumentoHoja> getDocumentos() {
		return documentos;
	}
	/**
	 * @param documentos the documentos to set
	 */
	public void setDocumentos(List<DocumentoHoja> documentos) {
		this.documentos = documentos;
	}
	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}
	/**
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	/**
	 * @return the opcional
	 */
	public Integer getOpcional() {
		return opcional;
	}
	/**
	 * @param opcional the opcional to set
	 */
	public void setOpcional(Integer opcional) {
		this.opcional = opcional;
	}
}
