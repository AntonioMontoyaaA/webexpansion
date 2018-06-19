package com.tiendas.neto.vo;

public class PerfilesxusuarioVO {
	private Integer perfilid;
	private String nombreperfil;
	private PermisosVO[] permisos = null;

	public PermisosVO[] getPermisos() {
		return permisos;
	}

	public void setPermisos(PermisosVO[] permisos) {
		this.permisos = permisos;
	}

	public Integer getPerfilid() {
		return perfilid;
	}

	public void setPerfilid(Integer perfilid) {
		this.perfilid = perfilid;
	}

	public String getNombreperfil() {
		return nombreperfil;
	}

	public void setNombreperfil(String nombreperfil) {
		this.nombreperfil = nombreperfil;
	}



	
}
