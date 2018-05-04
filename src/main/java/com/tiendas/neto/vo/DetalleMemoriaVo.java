package com.tiendas.neto.vo;

import java.io.Serializable;

public class DetalleMemoriaVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long mdId;
	private String nombreMd;
	private String creador;
	private String fechaCreacion;
	private String categoria;
	private int puntuacion;
	private double latitud;
	private double longitud;
	private DatosSitioVo datosSitio;
	private DatosPropietarioVo datosPropietario;
	private SuperficieVo superficie;
	private ZonificacionVo zonificacion;
	private ConstruccionVo construccion;
	private GeneralidadesSitioVo generalidadesSitio;
	private FlujoPeatonalVo flujoPeatonal;
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
	 * @return the nombreMd
	 */
	public String getNombreMd() {
		return nombreMd;
	}
	/**
	 * @param nombreMd the nombreMd to set
	 */
	public void setNombreMd(String nombreMd) {
		this.nombreMd = nombreMd;
	}
	/**
	 * @return the creador
	 */
	public String getCreador() {
		return creador;
	}
	/**
	 * @param creador the creador to set
	 */
	public void setCreador(String creador) {
		this.creador = creador;
	}
	/**
	 * @return the fechaCreacion
	 */
	public String getFechaCreacion() {
		return fechaCreacion;
	}
	/**
	 * @param fechaCreacion the fechaCreacion to set
	 */
	public void setFechaCreacion(String fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
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
	 * @return the latitud
	 */
	public double getLatitud() {
		return latitud;
	}
	/**
	 * @param latitud the latitud to set
	 */
	public void setLatitud(double latitud) {
		this.latitud = latitud;
	}
	/**
	 * @return the longitud
	 */
	public double getLongitud() {
		return longitud;
	}
	/**
	 * @param longitud the longitud to set
	 */
	public void setLongitud(double longitud) {
		this.longitud = longitud;
	}
	/**
	 * @return the datosSitio
	 */
	public DatosSitioVo getDatosSitio() {
		return datosSitio;
	}
	/**
	 * @param datosSitio the datosSitio to set
	 */
	public void setDatosSitio(DatosSitioVo datosSitio) {
		this.datosSitio = datosSitio;
	}
	/**
	 * @return the datosPropietario
	 */
	public DatosPropietarioVo getDatosPropietario() {
		return datosPropietario;
	}
	/**
	 * @param datosPropietario the datosPropietario to set
	 */
	public void setDatosPropietario(DatosPropietarioVo datosPropietario) {
		this.datosPropietario = datosPropietario;
	}
	/**
	 * @return the superficie
	 */
	public SuperficieVo getSuperficie() {
		return superficie;
	}
	/**
	 * @param superficie the superficie to set
	 */
	public void setSuperficie(SuperficieVo superficie) {
		this.superficie = superficie;
	}
	/**
	 * @return the zonificacion
	 */
	public ZonificacionVo getZonificacion() {
		return zonificacion;
	}
	/**
	 * @param zonificacion the zonificacion to set
	 */
	public void setZonificacion(ZonificacionVo zonificacion) {
		this.zonificacion = zonificacion;
	}
	/**
	 * @return the construccion
	 */
	public ConstruccionVo getConstruccion() {
		return construccion;
	}
	/**
	 * @param construccion the construccion to set
	 */
	public void setConstruccion(ConstruccionVo construccion) {
		this.construccion = construccion;
	}
	/**
	 * @return the generalidadesSitio
	 */
	public GeneralidadesSitioVo getGeneralidadesSitio() {
		return generalidadesSitio;
	}
	/**
	 * @param generalidadesSitio the generalidadesSitio to set
	 */
	public void setGeneralidadesSitio(GeneralidadesSitioVo generalidadesSitio) {
		this.generalidadesSitio = generalidadesSitio;
	}
	/**
	 * @return the flujoPeatonal
	 */
	public FlujoPeatonalVo getFlujoPeatonal() {
		return flujoPeatonal;
	}
	/**
	 * @param flujoPeatonal the flujoPeatonal to set
	 */
	public void setFlujoPeatonal(FlujoPeatonalVo flujoPeatonal) {
		this.flujoPeatonal = flujoPeatonal;
	}
	
	
}
