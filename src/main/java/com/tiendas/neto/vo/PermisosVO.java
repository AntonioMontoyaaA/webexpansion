package com.tiendas.neto.vo;

public class PermisosVO {


	private Integer BLOQUEASEGUIMIENTO;
	private Integer PERMITEAUTORIZAR;
	private String FDFECHAREGISTRO;
	private Integer FIMODULOID;
	private Integer FIUSUARIOREGISTRA;
	private String FISUBMODULO;
	private Integer PERMITEEDITAR;
	private Integer PERMITECOMENTAR;
	private Integer PERMITERECHAZAR;
	private Integer FIESTATUS;
	
	public Integer getBLOQUEASEGUIMIENTO() {
		return BLOQUEASEGUIMIENTO;
	}
	public void setBLOQUEASEGUIMIENTO(Integer bLOQUEASEGUIMIENTO) {
		BLOQUEASEGUIMIENTO = bLOQUEASEGUIMIENTO;
	}
	public Integer getPERMITEAUTORIZAR() {
		return PERMITEAUTORIZAR;
	}
	public void setPERMITEAUTORIZAR(Integer pERMITEAUTORIZAR) {
		PERMITEAUTORIZAR = pERMITEAUTORIZAR;
	}
	public String getFDFECHAREGISTRO() {
		return FDFECHAREGISTRO;
	}
	public void setFDFECHAREGISTRO(String fDFECHAREGISTRO) {
		FDFECHAREGISTRO = fDFECHAREGISTRO;
	}
	public Integer getFIMODULOID() {
		return FIMODULOID;
	}
	public void setFIMODULOID(Integer fIMODULOID) {
		FIMODULOID = fIMODULOID;
	}
	public Integer getFIUSUARIOREGISTRA() {
		return FIUSUARIOREGISTRA;
	}
	public void setFIUSUARIOREGISTRA(Integer fIUSUARIOREGISTRA) {
		FIUSUARIOREGISTRA = fIUSUARIOREGISTRA;
	}
	public String getFISUBMODULO() {
		return FISUBMODULO;
	}
	public void setFISUBMODULO(String fISUBMODULO) {
		FISUBMODULO = fISUBMODULO;
	}
	public Integer getPERMITEEDITAR() {
		return PERMITEEDITAR;
	}
	public void setPERMITEEDITAR(Integer pERMITEEDITAR) {
		PERMITEEDITAR = pERMITEEDITAR;
	}
	public Integer getPERMITECOMENTAR() {
		return PERMITECOMENTAR;
	}
	public void setPERMITECOMENTAR(Integer pERMITECOMENTAR) {
		PERMITECOMENTAR = pERMITECOMENTAR;
	}
	public Integer getPERMITERECHAZAR() {
		return PERMITERECHAZAR;
	}
	public void setPERMITERECHAZAR(Integer pERMITERECHAZAR) {
		PERMITERECHAZAR = pERMITERECHAZAR;
	}
	public Integer getFIESTATUS() {
		return FIESTATUS;
	}
	public void setFIESTATUS(Integer fIESTATUS) {
		FIESTATUS = fIESTATUS;
	}


	public String toJSON() {
	 return "{'BLOQUEASEGUIMIENTO': " + BLOQUEASEGUIMIENTO
	 		+ ",'FIESTATUS': " + FIESTATUS
	 		+ ",'FIMODULOID': " + FIMODULOID
	 		+ ",'PERMITEEDITAR': " + PERMITEEDITAR
	 		+ ",'FISUBMODULO': " + FISUBMODULO
	 		+ ",'PERMITECOMENTAR': " + PERMITECOMENTAR
	 		+ ",'PERMITERECHAZAR': " + PERMITERECHAZAR
	 		+ ",'PERMITEAUTORIZAR': " + PERMITEAUTORIZAR
	 		+ "}"; 
	}
}
