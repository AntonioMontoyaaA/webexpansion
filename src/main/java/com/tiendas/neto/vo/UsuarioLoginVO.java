package com.tiendas.neto.vo;

import java.util.List;

//CLASE PRINCIPAL
public class UsuarioLoginVO {
	private String mensaje;
	private Integer codigo;
	private Perfil perfil;
	
	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

// -----------------------------------PERFIL
	public class Perfil {

		private Integer realMes;
		private Integer realSemana;
		private String correo;
		private Integer numAutorizar;
		private Integer planSemana;
		private Integer planMes;
		private String apellidoM;
		private String apellidoP;
		private String nombre;
		private String telefono;
		private int numeroEmpleado;
		private int puestoId;
		private String imagenusuario;
		
		private AppPermitidas[] appPermitidas;
		private AreasxpuestoVO[] areasxpuesto;
		private ZonasxusuarioVO[] zonasxusuario;
		private PerfilesxusuarioVO[] perfilesxusuario;

		public String getImagenusuario() {
			return imagenusuario;
		}

		public void setImagenusuario(String imagenusuario) {
			this.imagenusuario = imagenusuario;
		}

		public AreasxpuestoVO[] getAreasxpuesto() {
			return areasxpuesto;
		}

		public void setAreasxpuesto(AreasxpuestoVO[] areasxpuesto) {
			this.areasxpuesto = areasxpuesto;
		}

		public ZonasxusuarioVO[] getZonasxusuario() {
			return zonasxusuario;
		}

		public void setZonasxusuario(ZonasxusuarioVO[] zonasxusuario) {
			this.zonasxusuario = zonasxusuario;
		}

		public PerfilesxusuarioVO[] getPerfilesxusuario() {
			return perfilesxusuario;
		}

		public void setPerfilesxusuario(PerfilesxusuarioVO[] perfilesxusuario) {
			this.perfilesxusuario = perfilesxusuario;
		}

		public Integer getRealMes() {
			return realMes;
		}

		public void setRealMes(Integer realMes) {
			this.realMes = realMes;
		}

		public Integer getRealSemana() {
			return realSemana;
		}

		public void setRealSemana(Integer realSemana) {
			this.realSemana = realSemana;
		}

		public String getCorreo() {
			return correo;
		}

		public void setCorreo(String correo) {
			this.correo = correo;
		}

		public Integer getNumAutorizar() {
			return numAutorizar;
		}

		public void setNumAutorizar(Integer numAutorizar) {
			this.numAutorizar = numAutorizar;
		}

		public Integer getPlanSemana() {
			return planSemana;
		}

		public void setPlanSemana(Integer planSemana) {
			this.planSemana = planSemana;
		}

		public Integer getPlanMes() {
			return planMes;
		}

		public void setPlanMes(Integer planMes) {
			this.planMes = planMes;
		}

		public String getApellidoM() {
			return apellidoM;
		}

		public void setApellidoM(String apellidoM) {
			this.apellidoM = apellidoM;
		}

		public String getApellidoP() {
			return apellidoP;
		}

		public void setApellidoP(String apellidoP) {
			this.apellidoP = apellidoP;
		}

		public String getNombre() {
			return nombre;
		}

		public void setNombre(String nombre) {
			this.nombre = nombre;
		}

		public String getTelefono() {
			return telefono;
		}

		public void setTelefono(String telefono) {
			this.telefono = telefono;
		}

		public int getNumeroEmpleado() {
			return numeroEmpleado;
		}

		public void setNumeroEmpleado(int numeroEmpleado) {
			this.numeroEmpleado = numeroEmpleado;
		}

		public int getPuestoId() {
			return puestoId;
		}

		public void setPuestoId(int puestoId) {
			this.puestoId = puestoId;
		}

		public AppPermitidas[] getAppPermitidas() {
			return appPermitidas;
		}

		public void setAppPermitidas(AppPermitidas[] appPermitidas) {
			this.appPermitidas = appPermitidas;
		}

		public class AppPermitidas {
			private int aplicacion;

			public int getAplicacion() {
				return aplicacion;
			}

			public void setAplicacion(int aplicacion) {
				this.aplicacion = aplicacion;
			}
			
		} 
	}
}


