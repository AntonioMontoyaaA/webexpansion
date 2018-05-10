package com.tiendas.neto.vo;

import java.util.List;

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
	
	public class Areasxpuesto {

		private Integer areaId;
		private String areaNom;

		public Integer getAreaId() {
		return areaId;
		}

		public void setAreaId(Integer areaId) {
		this.areaId = areaId;
		}

		public String getAreaNom() {
		return areaNom;
		}

		public void setAreaNom(String areaNom) {
		this.areaNom = areaNom;
		}
		}
	
	public class Perfil {

		private List<Zonasxusuario> zonasxusuario = null;
		private Integer realMes;
		private Integer realSemana;
		private String correo;
		private Integer numAutorizar;
		private Integer planSemana;
		private List<Areasxpuesto> areasxpuesto = null;
		private Integer planMes;
		private String apellidoM;
		private String apellidoP;
		private List<Perfilesxusuario> perfilesxusuario = null;
		private String nombre;
		private String telefono;
		private int numeroEmpleado;

		public List<Zonasxusuario> getZonasxusuario() {
		return zonasxusuario;
		}

		public void setZonasxusuario(List<Zonasxusuario> zonasxusuario) {
		this.zonasxusuario = zonasxusuario;
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

		public List<Areasxpuesto> getAreasxpuesto() {
		return areasxpuesto;
		}

		public void setAreasxpuesto(List<Areasxpuesto> areasxpuesto) {
		this.areasxpuesto = areasxpuesto;
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

		public List<Perfilesxusuario> getPerfilesxusuario() {
		return perfilesxusuario;
		}

		public void setPerfilesxusuario(List<Perfilesxusuario> perfilesxusuario) {
		this.perfilesxusuario = perfilesxusuario;
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
		}
	
	public class Perfilesxusuario {

		private Integer perfilid;
		private List<Permiso> permisos = null;
		private String nombreperfil;

		public Integer getPerfilid() {
		return perfilid;
		}

		public void setPerfilid(Integer perfilid) {
		this.perfilid = perfilid;
		}

		public List<Permiso> getPermisos() {
		return permisos;
		}

		public void setPermisos(List<Permiso> permisos) {
		this.permisos = permisos;
		}

		public String getNombreperfil() {
		return nombreperfil;
		}

		public void setNombreperfil(String nombreperfil) {
		this.nombreperfil = nombreperfil;
		}

		}
	
	public class Zonasxusuario {

		private String fECHAREGISTRO;
		private Integer zONAID;
		private Integer eSTATUS;
		private Integer uSUARIOREGISTRAID;

		public String getFECHAREGISTRO() {
		return fECHAREGISTRO;
		}

		public void setFECHAREGISTRO(String fECHAREGISTRO) {
		this.fECHAREGISTRO = fECHAREGISTRO;
		}

		public Integer getZONAID() {
		return zONAID;
		}

		public void setZONAID(Integer zONAID) {
		this.zONAID = zONAID;
		}

		public Integer getESTATUS() {
		return eSTATUS;
		}

		public void setESTATUS(Integer eSTATUS) {
		this.eSTATUS = eSTATUS;
		}

		public Integer getUSUARIOREGISTRAID() {
		return uSUARIOREGISTRAID;
		}

		public void setUSUARIOREGISTRAID(Integer uSUARIOREGISTRAID) {
		this.uSUARIOREGISTRAID = uSUARIOREGISTRAID;
		}
		}
	public class Permiso {

		private Integer bLOQUEASEGUIMIENTO;
		private Integer fIESTATUS;
		private String fDFECHAREGISTRO;
		private Integer fIMODULOID;
		private Integer pERMITEEDITAR;
		private Integer fIUSUARIOREGISTRA;
		private String fISUBMODULO;
		private Integer pERMITECOMENTAR;
		private Integer pERMITERECHAZAR;
		private Integer pERMITEAUTORIZAR;

		public Integer getBLOQUEASEGUIMIENTO() {
		return bLOQUEASEGUIMIENTO;
		}

		public void setBLOQUEASEGUIMIENTO(Integer bLOQUEASEGUIMIENTO) {
		this.bLOQUEASEGUIMIENTO = bLOQUEASEGUIMIENTO;
		}

		public Integer getFIESTATUS() {
		return fIESTATUS;
		}

		public void setFIESTATUS(Integer fIESTATUS) {
		this.fIESTATUS = fIESTATUS;
		}

		public String getFDFECHAREGISTRO() {
		return fDFECHAREGISTRO;
		}

		public void setFDFECHAREGISTRO(String fDFECHAREGISTRO) {
		this.fDFECHAREGISTRO = fDFECHAREGISTRO;
		}

		public Integer getFIMODULOID() {
		return fIMODULOID;
		}

		public void setFIMODULOID(Integer fIMODULOID) {
		this.fIMODULOID = fIMODULOID;
		}

		public Integer getPERMITEEDITAR() {
		return pERMITEEDITAR;
		}

		public void setPERMITEEDITAR(Integer pERMITEEDITAR) {
		this.pERMITEEDITAR = pERMITEEDITAR;
		}

		public Integer getFIUSUARIOREGISTRA() {
		return fIUSUARIOREGISTRA;
		}

		public void setFIUSUARIOREGISTRA(Integer fIUSUARIOREGISTRA) {
		this.fIUSUARIOREGISTRA = fIUSUARIOREGISTRA;
		}

		public String getFISUBMODULO() {
		return fISUBMODULO;
		}

		public void setFISUBMODULO(String fISUBMODULO) {
		this.fISUBMODULO = fISUBMODULO;
		}

		public Integer getPERMITECOMENTAR() {
		return pERMITECOMENTAR;
		}

		public void setPERMITECOMENTAR(Integer pERMITECOMENTAR) {
		this.pERMITECOMENTAR = pERMITECOMENTAR;
		}

		public Integer getPERMITERECHAZAR() {
		return pERMITERECHAZAR;
		}

		public void setPERMITERECHAZAR(Integer pERMITERECHAZAR) {
		this.pERMITERECHAZAR = pERMITERECHAZAR;
		}

		public Integer getPERMITEAUTORIZAR() {
		return pERMITEAUTORIZAR;
		}

		public void setPERMITEAUTORIZAR(Integer pERMITEAUTORIZAR) {
		this.pERMITEAUTORIZAR = pERMITEAUTORIZAR;
		}

		}
	}


	
	

	
	


