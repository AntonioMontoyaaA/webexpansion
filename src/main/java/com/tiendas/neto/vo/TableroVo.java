package com.tiendas.neto.vo;

import java.io.Serializable;

public class TableroVo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long mdId;
	private String fechaRecepcionMd;
	private String fuenteMd;
	private String nombreTda;
	private String categoria;
	private int puntuacion;
	private String voboInicialOperaciones;
	private String fechaConteoAuditor;
	private int conteoAuditor;
	private String pregestoriaAutorizada;
	private String levantamientoRealizado;
	private String voboLayoutOperaciones;
	private String fechaPptoConstruccion;
	private double montoConstruccion;
	private String fechaPptoAuditoria;
	private double montoAuditoria;
	private String gestoria;
	private String voboFinalOperaciones;
	private String contratoFirmado;
	private String inicioObra;
	private String finObra;
	private String inauguracion;
	private String inauguracionObjetivo;
	private String jefeExpansion;
	private String gerenteExpansion;
	private String regional;
	private String doctos;
	private String comite;
	private String ceco;
	/**
	 * @return the mdId
	 */
	public long getMdId() {
		return mdId;
	}
	/**
	 * @param mdId the mdId to set
	 */
	public void setMdId(long mdId) {
		this.mdId = mdId;
	}
	/**
	 * @return the fechaRecepcionMd
	 */
	public String getFechaRecepcionMd() {
		return fechaRecepcionMd;
	}
	/**
	 * @param fechaRecepcionMd the fechaRecepcionMd to set
	 */
	public void setFechaRecepcionMd(String fechaRecepcionMd) {
		this.fechaRecepcionMd = fechaRecepcionMd;
	}
	/**
	 * @return the fuenteMd
	 */
	public String getFuenteMd() {
		return fuenteMd;
	}
	/**
	 * @param fuenteMd the fuenteMd to set
	 */
	public void setFuenteMd(String fuenteMd) {
		this.fuenteMd = fuenteMd;
	}
	/**
	 * @return the nombreTda
	 */
	public String getNombreTda() {
		return nombreTda;
	}
	/**
	 * @param nombreTda the nombreTda to set
	 */
	public void setNombreTda(String nombreTda) {
		this.nombreTda = nombreTda;
	}
	/**
	 * @return the categoria
	 */
	public String getCategoria() {
		return categoria;
	}
	/**
	 * @param categoria the categoria to set
	 */
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	/**
	 * @return the puntuacion
	 */
	public int getPuntuacion() {
		return puntuacion;
	}
	/**
	 * @param puntuacion the puntuacion to set
	 */
	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}
	/**
	 * @return the voboInicialOperaciones
	 */
	public String getVoboInicialOperaciones() {
		return voboInicialOperaciones;
	}
	/**
	 * @param voboInicialOperaciones the voboInicialOperaciones to set
	 */
	public void setVoboInicialOperaciones(String voboInicialOperaciones) {
		this.voboInicialOperaciones = voboInicialOperaciones;
	}
	/**
	 * @return the fechaConteoAuditor
	 */
	public String getFechaConteoAuditor() {
		return fechaConteoAuditor;
	}
	/**
	 * @param fechaConteoAuditor the fechaConteoAuditor to set
	 */
	public void setFechaConteoAuditor(String fechaConteoAuditor) {
		this.fechaConteoAuditor = fechaConteoAuditor;
	}
	/**
	 * @return the conteoAuditor
	 */
	public int getConteoAuditor() {
		return conteoAuditor;
	}
	/**
	 * @param conteoAuditor the conteoAuditor to set
	 */
	public void setConteoAuditor(int conteoAuditor) {
		this.conteoAuditor = conteoAuditor;
	}
	/**
	 * @return the pregestoriaAutorizada
	 */
	public String getPregestoriaAutorizada() {
		return pregestoriaAutorizada;
	}
	/**
	 * @param pregestoriaAutorizada the pregestoriaAutorizada to set
	 */
	public void setPregestoriaAutorizada(String pregestoriaAutorizada) {
		this.pregestoriaAutorizada = pregestoriaAutorizada;
	}
	/**
	 * @return the levantamientoRealizado
	 */
	public String getLevantamientoRealizado() {
		return levantamientoRealizado;
	}
	/**
	 * @param levantamientoRealizado the levantamientoRealizado to set
	 */
	public void setLevantamientoRealizado(String levantamientoRealizado) {
		this.levantamientoRealizado = levantamientoRealizado;
	}
	/**
	 * @return the voboLayoutOperaciones
	 */
	public String getVoboLayoutOperaciones() {
		return voboLayoutOperaciones;
	}
	/**
	 * @param voboLayoutOperaciones the voboLayoutOperaciones to set
	 */
	public void setVoboLayoutOperaciones(String voboLayoutOperaciones) {
		this.voboLayoutOperaciones = voboLayoutOperaciones;
	}
	/**
	 * @return the fechaPptoConstruccion
	 */
	public String getFechaPptoConstruccion() {
		return fechaPptoConstruccion;
	}
	/**
	 * @param fechaPptoConstruccion the fechaPptoConstruccion to set
	 */
	public void setFechaPptoConstruccion(String fechaPptoConstruccion) {
		this.fechaPptoConstruccion = fechaPptoConstruccion;
	}
	/**
	 * @return the montoConstruccion
	 */
	public double getMontoConstruccion() {
		return montoConstruccion;
	}
	/**
	 * @param montoConstruccion the montoConstruccion to set
	 */
	public void setMontoConstruccion(double montoConstruccion) {
		this.montoConstruccion = montoConstruccion;
	}
	/**
	 * @return the fechaPptoAuditoria
	 */
	public String getFechaPptoAuditoria() {
		return fechaPptoAuditoria;
	}
	/**
	 * @param fechaPptoAuditoria the fechaPptoAuditoria to set
	 */
	public void setFechaPptoAuditoria(String fechaPptoAuditoria) {
		this.fechaPptoAuditoria = fechaPptoAuditoria;
	}
	/**
	 * @return the montoAuditoria
	 */
	public double getMontoAuditoria() {
		return montoAuditoria;
	}
	/**
	 * @param montoAuditoria the montoAuditoria to set
	 */
	public void setMontoAuditoria(double montoAuditoria) {
		this.montoAuditoria = montoAuditoria;
	}
	/**
	 * @return the gestoria
	 */
	public String getGestoria() {
		return gestoria;
	}
	/**
	 * @param gestoria the gestoria to set
	 */
	public void setGestoria(String gestoria) {
		this.gestoria = gestoria;
	}
	/**
	 * @return the voboFinalOperaciones
	 */
	public String getVoboFinalOperaciones() {
		return voboFinalOperaciones;
	}
	/**
	 * @param voboFinalOperaciones the voboFinalOperaciones to set
	 */
	public void setVoboFinalOperaciones(String voboFinalOperaciones) {
		this.voboFinalOperaciones = voboFinalOperaciones;
	}
	/**
	 * @return the contratoFirmado
	 */
	public String getContratoFirmado() {
		return contratoFirmado;
	}
	/**
	 * @param contratoFirmado the contratoFirmado to set
	 */
	public void setContratoFirmado(String contratoFirmado) {
		this.contratoFirmado = contratoFirmado;
	}
	/**
	 * @return the inicioObra
	 */
	public String getInicioObra() {
		return inicioObra;
	}
	/**
	 * @param inicioObra the inicioObra to set
	 */
	public void setInicioObra(String inicioObra) {
		this.inicioObra = inicioObra;
	}
	/**
	 * @return the finObra
	 */
	public String getFinObra() {
		return finObra;
	}
	/**
	 * @param finObra the finObra to set
	 */
	public void setFinObra(String finObra) {
		this.finObra = finObra;
	}
	/**
	 * @return the inauguracion
	 */
	public String getInauguracion() {
		return inauguracion;
	}
	/**
	 * @param inauguracion the inauguracion to set
	 */
	public void setInauguracion(String inauguracion) {
		this.inauguracion = inauguracion;
	}
	/**
	 * @return the inauguracionObjetivo
	 */
	public String getInauguracionObjetivo() {
		return inauguracionObjetivo;
	}
	/**
	 * @param inauguracionObjetivo the inauguracionObjetivo to set
	 */
	public void setInauguracionObjetivo(String inauguracionObjetivo) {
		this.inauguracionObjetivo = inauguracionObjetivo;
	}
	/**
	 * @return the jefeExpansion
	 */
	public String getJefeExpansion() {
		return jefeExpansion;
	}
	/**
	 * @param jefeExpansion the jefeExpansion to set
	 */
	public void setJefeExpansion(String jefeExpansion) {
		this.jefeExpansion = jefeExpansion;
	}
	/**
	 * @return the gerenteExpansion
	 */
	public String getGerenteExpansion() {
		return gerenteExpansion;
	}
	/**
	 * @param gerenteExpansion the gerenteExpansion to set
	 */
	public void setGerenteExpansion(String gerenteExpansion) {
		this.gerenteExpansion = gerenteExpansion;
	}
	/**
	 * @return the regional
	 */
	public String getRegional() {
		return regional;
	}
	/**
	 * @param regional the regional to set
	 */
	public void setRegional(String regional) {
		this.regional = regional;
	}
	/**
	 * @return the doctos
	 */
	public String getDoctos() {
		return doctos;
	}
	/**
	 * @param doctos the doctos to set
	 */
	public void setDoctos(String doctos) {
		this.doctos = doctos;
	}
	/**
	 * @return the comite
	 */
	public String getComite() {
		return comite;
	}
	/**
	 * @param comite the comite to set
	 */
	public void setComite(String comite) {
		this.comite = comite;
	}
	/**
	 * @return the ceco
	 */
	public String getCeco() {
		return ceco;
	}
	/**
	 * @param ceco the ceco to set
	 */
	public void setCeco(String ceco) {
		this.ceco = ceco;
	}

}
