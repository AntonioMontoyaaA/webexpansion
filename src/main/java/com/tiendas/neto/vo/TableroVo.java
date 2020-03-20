package com.tiendas.neto.vo;

import java.io.Serializable;

public class TableroVo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long mdId;
	private String fechaGerenteExpansion;
	private String fechaRecepcionMd;
	private String fuenteMd;
	private String nombreTda;
	private String region;
	private String categoria;
	private int puntuacion;
	private String voboInicialOperaciones;
	private String voboInicialOperacionesEstatus;
	private String fechaConteoAuditor;
	private String fechaConteoAuditorEstatus;
	private int conteoAuditor;
	private String pregestoriaAutorizada;
	private String pregestoriaAutorizadaEstatus;
	private String citaLevantamiento;
	private String citaLevantamientoEstatus;
	private String levantamientoRealizado;
	private String levantamientoRealizadoEstatus;
	private String voboLayoutOperaciones;
	private String voboLayoutOperacionesEstatus;
	private String fechaPptoConstruccion;
	private String fechaPptoConstruccionEstatus;
	private double montoConstruccion;
	private String fechaPptoAuditoria;
	private String fechaPptoAuditoriaEstatus;
	private double montoAuditoria;
	private String gestoria;
	private String gestoriaEstatus;
	private String correccionConstruccion;
	private String correccionConstruccionEstatus;
	private String correccionExpansion;
	private String correccionExpansionEstatus;
	private String voboFinalOperaciones;
	private String voboFinalOperacionesEstatus;
	private double ventaEstimada;
	private String contratoFirmado;
	private String contratoFirmadoEstatus;
	private String en_obra;
	private String en_obraEstatus;
	private String tienda_abierta;
	private String tienda_abiertaEstatus;
	private String inicioObra;
	private String inicioObraEstatus;
	private String finObra;
	private String finObraEstatus;
	private String inauguracion;
	private String inauguracionEstatus;
	private String inauguracionObjetivo;
	private String jefeExpansion;
	private String gerenteExpansion;
	private String regional;
	private String doctos;
	private String doctosEstatus;
	private String comite;
	private String comiteEstatus;
	private String ceco;
	private String cecoEstatus;
	
	private String levantamiento;
	private String levantamientoEstatus;
	private String levantamientoVobo;
	private String levantamientoVoboEstatus;
	
	private String preContrato;
	private String preContratoEstatus;
	private String entregaContrato;
	private String entregaContratoEstatus;
	
	
	private int voboAnalistaDias;
	private int voboInicialDias;
	private int voboPregestoriaDias;
	private int voboPreauditoriaDias;
	private int voboCitaLevantDias;
	private int levantamientoDias;
	private int cargaLayoutDias;
	private int voboLayoutDias;
	private int pptoConstrDias;
	private int pptoAuditDias;
	private int voboFinalDias;
	private int comiteDias;
	private int cargaDoctosDias;
	private int contratoFirmadoDias;
	private int cecoDias;
	private int tramitesDias;
	private int correccionConstrDias;
	private int correccionExpansDias;
	private int inicioObraDias;
	private int obraDias;
	private int tiendaAbiertaDias;
	private int preContratoDias;
	private int entregaContratoDias;
	
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
	 * @return the fechaGerenteExpansion
	 */
	public String getFechaGerenteExpansion() {
		return fechaGerenteExpansion;
	}
	/**
	 * @param fechaGerenteExpansion the fechaGerenteExpansion to set
	 */
	public void setFechaGerenteExpansion(String fechaGerenteExpansion) {
		this.fechaGerenteExpansion = fechaGerenteExpansion;
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
	 * @return the region
	 */
	public String getRegion() {
		return region;
	}
	/**
	 * @param region the region to set
	 */
	public void setRegion(String region) {
		this.region = region;
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
	 * @return the voboInicialOperacionesEstatus
	 */
	public String getVoboInicialOperacionesEstatus() {
		return voboInicialOperacionesEstatus;
	}
	/**
	 * @param voboInicialOperacionesEstatus the voboInicialOperacionesEstatus to set
	 */
	public void setVoboInicialOperacionesEstatus(String voboInicialOperacionesEstatus) {
		this.voboInicialOperacionesEstatus = voboInicialOperacionesEstatus;
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
	 * @return the fechaConteoAuditorEstatus
	 */
	public String getFechaConteoAuditorEstatus() {
		return fechaConteoAuditorEstatus;
	}
	/**
	 * @param fechaConteoAuditorEstatus the fechaConteoAuditorEstatus to set
	 */
	public void setFechaConteoAuditorEstatus(String fechaConteoAuditorEstatus) {
		this.fechaConteoAuditorEstatus = fechaConteoAuditorEstatus;
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
	 * @return the pregestoriaAutorizadaEstatus
	 */
	public String getPregestoriaAutorizadaEstatus() {
		return pregestoriaAutorizadaEstatus;
	}
	/**
	 * @param pregestoriaAutorizadaEstatus the pregestoriaAutorizadaEstatus to set
	 */
	public void setPregestoriaAutorizadaEstatus(String pregestoriaAutorizadaEstatus) {
		this.pregestoriaAutorizadaEstatus = pregestoriaAutorizadaEstatus;
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
	 * @return the levantamientoRealizadoEstatus
	 */
	public String getLevantamientoRealizadoEstatus() {
		return levantamientoRealizadoEstatus;
	}
	/**
	 * @param levantamientoRealizadoEstatus the levantamientoRealizadoEstatus to set
	 */
	public void setLevantamientoRealizadoEstatus(String levantamientoRealizadoEstatus) {
		this.levantamientoRealizadoEstatus = levantamientoRealizadoEstatus;
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
	 * @return the voboLayoutOperacionesEstatus
	 */
	public String getVoboLayoutOperacionesEstatus() {
		return voboLayoutOperacionesEstatus;
	}
	/**
	 * @param voboLayoutOperacionesEstatus the voboLayoutOperacionesEstatus to set
	 */
	public void setVoboLayoutOperacionesEstatus(String voboLayoutOperacionesEstatus) {
		this.voboLayoutOperacionesEstatus = voboLayoutOperacionesEstatus;
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
	 * @return the fechaPptoConstruccionEstatus
	 */
	public String getFechaPptoConstruccionEstatus() {
		return fechaPptoConstruccionEstatus;
	}
	/**
	 * @param fechaPptoConstruccionEstatus the fechaPptoConstruccionEstatus to set
	 */
	public void setFechaPptoConstruccionEstatus(String fechaPptoConstruccionEstatus) {
		this.fechaPptoConstruccionEstatus = fechaPptoConstruccionEstatus;
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
	 * @return the fechaPptoAuditoriaEstatus
	 */
	public String getFechaPptoAuditoriaEstatus() {
		return fechaPptoAuditoriaEstatus;
	}
	/**
	 * @param fechaPptoAuditoriaEstatus the fechaPptoAuditoriaEstatus to set
	 */
	public void setFechaPptoAuditoriaEstatus(String fechaPptoAuditoriaEstatus) {
		this.fechaPptoAuditoriaEstatus = fechaPptoAuditoriaEstatus;
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
	 * @return the gestoriaEstatus
	 */
	public String getGestoriaEstatus() {
		return gestoriaEstatus;
	}
	/**
	 * @param gestoriaEstatus the gestoriaEstatus to set
	 */
	public void setGestoriaEstatus(String gestoriaEstatus) {
		this.gestoriaEstatus = gestoriaEstatus;
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
	 * @return the voboFinalOperacionesEstatus
	 */
	public String getVoboFinalOperacionesEstatus() {
		return voboFinalOperacionesEstatus;
	}
	/**
	 * @param voboFinalOperacionesEstatus the voboFinalOperacionesEstatus to set
	 */
	public void setVoboFinalOperacionesEstatus(String voboFinalOperacionesEstatus) {
		this.voboFinalOperacionesEstatus = voboFinalOperacionesEstatus;
	}
	/**
	 * @return the ventaEstimada
	 */
	public double getVentaEstimada() {
		return ventaEstimada;
	}
	/**
	 * @param ventaEstimada the ventaEstimada to set
	 */
	public void setVentaEstimada(double ventaEstimada) {
		this.ventaEstimada = ventaEstimada;
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
	 * @return the contratoFirmadoEstatus
	 */
	public String getContratoFirmadoEstatus() {
		return contratoFirmadoEstatus;
	}
	/**
	 * @param contratoFirmadoEstatus the contratoFirmadoEstatus to set
	 */
	public void setContratoFirmadoEstatus(String contratoFirmadoEstatus) {
		this.contratoFirmadoEstatus = contratoFirmadoEstatus;
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
	 * @return the inicioObraEstatus
	 */
	public String getInicioObraEstatus() {
		return inicioObraEstatus;
	}
	/**
	 * @param inicioObraEstatus the inicioObraEstatus to set
	 */
	public void setInicioObraEstatus(String inicioObraEstatus) {
		this.inicioObraEstatus = inicioObraEstatus;
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
	 * @return the doctosEstatus
	 */
	public String getDoctosEstatus() {
		return doctosEstatus;
	}
	/**
	 * @param doctosEstatus the doctosEstatus to set
	 */
	public void setDoctosEstatus(String doctosEstatus) {
		this.doctosEstatus = doctosEstatus;
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
	 * @return the comiteEstatus
	 */
	public String getComiteEstatus() {
		return comiteEstatus;
	}
	/**
	 * @param comiteEstatus the comiteEstatus to set
	 */
	public void setComiteEstatus(String comiteEstatus) {
		this.comiteEstatus = comiteEstatus;
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
	/**
	 * @return the cecoEstatus
	 */
	public String getCecoEstatus() {
		return cecoEstatus;
	}
	/**
	 * @param cecoEstatus the cecoEstatus to set
	 */
	public void setCecoEstatus(String cecoEstatus) {
		this.cecoEstatus = cecoEstatus;
	}
	public String getLevantamiento() {
		return levantamiento;
	}
	public void setLevantamiento(String levantamiento) {
		this.levantamiento = levantamiento;
	}
	public String getLevantamientoVobo() {
		return levantamientoVobo;
	}
	public void setLevantamientoVobo(String levantamientoVobo) {
		this.levantamientoVobo = levantamientoVobo;
	}
	public String getLevantamientoEstatus() {
		return levantamientoEstatus;
	}
	public void setLevantamientoEstatus(String levantamientoEstatus) {
		this.levantamientoEstatus = levantamientoEstatus;
	}
	public String getLevantamientoVoboEstatus() {
		return levantamientoVoboEstatus;
	}
	public void setLevantamientoVoboEstatus(String levantamientoVoboEstatus) {
		this.levantamientoVoboEstatus = levantamientoVoboEstatus;
	}
	public String getFinObraEstatus() {
		return finObraEstatus;
	}
	public void setFinObraEstatus(String finObraEstatus) {
		this.finObraEstatus = finObraEstatus;
	}
	public String getInauguracionEstatus() {
		return inauguracionEstatus;
	}
	public void setInauguracionEstatus(String inauguracionEstatus) {
		this.inauguracionEstatus = inauguracionEstatus;
	}
	public String getEn_obra() {
		return en_obra;
	}
	public void setEn_obra(String en_obra) {
		this.en_obra = en_obra;
	}
	public String getEn_obraEstatus() {
		return en_obraEstatus;
	}
	public void setEn_obraEstatus(String en_obraEstatus) {
		this.en_obraEstatus = en_obraEstatus;
	}
	public String getTienda_abierta() {
		return tienda_abierta;
	}
	public void setTienda_abierta(String tienda_abierta) {
		this.tienda_abierta = tienda_abierta;
	}
	public String getTienda_abiertaEstatus() {
		return tienda_abiertaEstatus;
	}
	public void setTienda_abiertaEstatus(String tienda_abiertaEstatus) {
		this.tienda_abiertaEstatus = tienda_abiertaEstatus;
	}
	public String getCitaLevantamiento() {
		return citaLevantamiento;
	}
	public void setCitaLevantamiento(String citaLevantamiento) {
		this.citaLevantamiento = citaLevantamiento;
	}
	public String getCitaLevantamientoEstatus() {
		return citaLevantamientoEstatus;
	}
	public void setCitaLevantamientoEstatus(String citaLevantamientoEstatus) {
		this.citaLevantamientoEstatus = citaLevantamientoEstatus;
	}
	public String getCorreccionConstruccion() {
		return correccionConstruccion;
	}
	public void setCorreccionConstruccion(String correccionConstruccion) {
		this.correccionConstruccion = correccionConstruccion;
	}
	public String getCorreccionConstruccionEstatus() {
		return correccionConstruccionEstatus;
	}
	public void setCorreccionConstruccionEstatus(String correccionConstruccionEstatus) {
		this.correccionConstruccionEstatus = correccionConstruccionEstatus;
	}
	public String getCorreccionExpansion() {
		return correccionExpansion;
	}
	public void setCorreccionExpansion(String correccionExpansion) {
		this.correccionExpansion = correccionExpansion;
	}
	public String getCorreccionExpansionEstatus() {
		return correccionExpansionEstatus;
	}
	public void setCorreccionExpansionEstatus(String correccionExpansionEstatus) {
		this.correccionExpansionEstatus = correccionExpansionEstatus;
	}
	public int getVoboAnalistaDias() {
		return voboAnalistaDias;
	}
	public void setVoboAnalistaDias(int voboAnalistaDias) {
		this.voboAnalistaDias = voboAnalistaDias;
	}
	public int getVoboInicialDias() {
		return voboInicialDias;
	}
	public void setVoboInicialDias(int voboInicialDias) {
		this.voboInicialDias = voboInicialDias;
	}
	public int getVoboPregestoriaDias() {
		return voboPregestoriaDias;
	}
	public void setVoboPregestoriaDias(int voboPregestoriaDias) {
		this.voboPregestoriaDias = voboPregestoriaDias;
	}
	public int getVoboPreauditoriaDias() {
		return voboPreauditoriaDias;
	}
	public void setVoboPreauditoriaDias(int voboPreauditoriaDias) {
		this.voboPreauditoriaDias = voboPreauditoriaDias;
	}
	public int getVoboCitaLevantDias() {
		return voboCitaLevantDias;
	}
	public void setVoboCitaLevantDias(int voboCitaLevantDias) {
		this.voboCitaLevantDias = voboCitaLevantDias;
	}
	public int getLevantamientoDias() {
		return levantamientoDias;
	}
	public void setLevantamientoDias(int levantamientoDias) {
		this.levantamientoDias = levantamientoDias;
	}
	public int getCargaLayoutDias() {
		return cargaLayoutDias;
	}
	public void setCargaLayoutDias(int cargaLayoutDias) {
		this.cargaLayoutDias = cargaLayoutDias;
	}
	public int getVoboLayoutDias() {
		return voboLayoutDias;
	}
	public void setVoboLayoutDias(int voboLayoutDias) {
		this.voboLayoutDias = voboLayoutDias;
	}
	public int getPptoConstrDias() {
		return pptoConstrDias;
	}
	public void setPptoConstrDias(int pptoConstrDias) {
		this.pptoConstrDias = pptoConstrDias;
	}
	public int getPptoAuditDias() {
		return pptoAuditDias;
	}
	public void setPptoAuditDias(int pptoAuditDias) {
		this.pptoAuditDias = pptoAuditDias;
	}
	public int getVoboFinalDias() {
		return voboFinalDias;
	}
	public void setVoboFinalDias(int voboFinalDias) {
		this.voboFinalDias = voboFinalDias;
	}
	public int getComiteDias() {
		return comiteDias;
	}
	public void setComiteDias(int comiteDias) {
		this.comiteDias = comiteDias;
	}
	public int getCargaDoctosDias() {
		return cargaDoctosDias;
	}
	public void setCargaDoctosDias(int cargaDoctosDias) {
		this.cargaDoctosDias = cargaDoctosDias;
	}
	public int getContratoFirmadoDias() {
		return contratoFirmadoDias;
	}
	public void setContratoFirmadoDias(int contratoFirmadoDias) {
		this.contratoFirmadoDias = contratoFirmadoDias;
	}
	public int getCecoDias() {
		return cecoDias;
	}
	public void setCecoDias(int cecoDias) {
		this.cecoDias = cecoDias;
	}
	public int getTramitesDias() {
		return tramitesDias;
	}
	public void setTramitesDias(int tramitesDias) {
		this.tramitesDias = tramitesDias;
	}
	public int getCorreccionConstrDias() {
		return correccionConstrDias;
	}
	public void setCorreccionConstrDias(int correccionConstrDias) {
		this.correccionConstrDias = correccionConstrDias;
	}
	public int getCorreccionExpansDias() {
		return correccionExpansDias;
	}
	public void setCorreccionExpansDias(int correccionExpansDias) {
		this.correccionExpansDias = correccionExpansDias;
	}
	public int getInicioObraDias() {
		return inicioObraDias;
	}
	public void setInicioObraDias(int inicioObraDias) {
		this.inicioObraDias = inicioObraDias;
	}
	public int getObraDias() {
		return obraDias;
	}
	public void setObraDias(int obraDias) {
		this.obraDias = obraDias;
	}
	public int getTiendaAbiertaDias() {
		return tiendaAbiertaDias;
	}
	public void setTiendaAbiertaDias(int tiendaAbiertaDias) {
		this.tiendaAbiertaDias = tiendaAbiertaDias;
	}
	/**
	 * @return the preContrato
	 */
	public String getPreContrato() {
		return preContrato;
	}
	/**
	 * @param preContrato the preContrato to set
	 */
	public void setPreContrato(String preContrato) {
		this.preContrato = preContrato;
	}
	/**
	 * @return the preContratoEstatus
	 */
	public String getPreContratoEstatus() {
		return preContratoEstatus;
	}
	/**
	 * @param preContratoEstatus the preContratoEstatus to set
	 */
	public void setPreContratoEstatus(String preContratoEstatus) {
		this.preContratoEstatus = preContratoEstatus;
	}
	/**
	 * @return the entregaContrato
	 */
	public String getEntregaContrato() {
		return entregaContrato;
	}
	/**
	 * @param entregaContrato the entregaContrato to set
	 */
	public void setEntregaContrato(String entregaContrato) {
		this.entregaContrato = entregaContrato;
	}
	/**
	 * @return the entregaContratoEstatus
	 */
	public String getEntregaContratoEstatus() {
		return entregaContratoEstatus;
	}
	/**
	 * @param entregaContratoEstatus the entregaContratoEstatus to set
	 */
	public void setEntregaContratoEstatus(String entregaContratoEstatus) {
		this.entregaContratoEstatus = entregaContratoEstatus;
	}
	/**
	 * @return the preContratoDias
	 */
	public int getPreContratoDias() {
		return preContratoDias;
	}
	/**
	 * @param preContratoDias the preContratoDias to set
	 */
	public void setPreContratoDias(int preContratoDias) {
		this.preContratoDias = preContratoDias;
	}
	/**
	 * @return the entregaContratoDias
	 */
	public int getEntregaContratoDias() {
		return entregaContratoDias;
	}
	/**
	 * @param entregaContratoDias the entregaContratoDias to set
	 */
	public void setEntregaContratoDias(int entregaContratoDias) {
		this.entregaContratoDias = entregaContratoDias;
	}
	
	

}
