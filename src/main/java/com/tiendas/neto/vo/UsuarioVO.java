package com.tiendas.neto.vo;

public class UsuarioVO {
	
	private String usuario;
	private String contra;
	private String codigo;
	private String mensaje;
	private String esUsuarioValido;
	
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public String getEsUsuarioValido() {
		return esUsuarioValido;
	}
	public void setEsUsuarioValido(String esUsuarioValido) {
		this.esUsuarioValido = esUsuarioValido;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getContra() {
		return contra;
	}
	public void setContra(String contra) {
		this.contra = contra;
	}
	

}
