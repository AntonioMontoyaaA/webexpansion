package com.tiendas.neto.action.excel;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.tiendas.neto.action.ExpansionAction;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.reportes.excel.CreaExcelTablero;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.TableroVo;

public class ExcelTableroAction extends ExpansionAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();

	@Override
	public String execute() throws Exception {
		procesar(ServletActionContext.getRequest(), ServletActionContext.getResponse());
		return null;
	}
	
	public void procesar(HttpServletRequest request, HttpServletResponse response)  {
		try {
	        String datos = request.getParameter("datos");
	        JSONObject jsonObj = new JSONObject(datos);
	        
	  
	        List<TableroVo> listaMemorias = new ArrayList<TableroVo>();
	        JSONArray array = jsonObj.getJSONArray("detalleTablero");

	        for(int i = 0 ; i < array.length() ; i++) {
	        	TableroVo memoria = new TableroVo();

	        	memoria.setMdId(array.getJSONObject(i).getLong("MDID"));
	        	memoria.setFechaGerenteExpansion(array.getJSONObject(i).getJSONObject("GERENTE_EXP").getString("fechaValidacion"));
	        	memoria.setFechaRecepcionMd(array.getJSONObject(i).getJSONObject("FECHARECEPCION").getString("fechaValidacion"));
	        	memoria.setFuenteMd(array.getJSONObject(i).getString("FUENTEMD"));
	        	memoria.setNombreTda(array.getJSONObject(i).getString("NOMBRETDA"));
	        	memoria.setRegion(array.getJSONObject(i).getString("REGION"));
	        	memoria.setCategoria(array.getJSONObject(i).getString("CATEGORIA"));
	        	memoria.setPuntuacion(array.getJSONObject(i).getInt("PUNTOSTOTALES"));
	        	
	        	memoria.setVoboInicialOperaciones(array.getJSONObject(i).getJSONObject("PRE_OPERACIONES").getString("fechaValidacion"));
	        	memoria.setVoboInicialOperacionesEstatus(array.getJSONObject(i).getJSONObject("PRE_OPERACIONES").getString("validacion"));
	        	memoria.setVoboInicialDias(array.getJSONObject(i).getJSONObject("PRE_OPERACIONES").getInt("diasValidacion"));
	        	
	        	memoria.setConteoAuditor(array.getJSONObject(i).getInt("CONTEOAUDITOR"));
	        	memoria.setFechaConteoAuditor(array.getJSONObject(i).getJSONObject("PRE_AUDITORIA").getString("fechaValidacion"));
	        	memoria.setFechaConteoAuditorEstatus(array.getJSONObject(i).getJSONObject("PRE_AUDITORIA").getString("validacion"));
	        	memoria.setVoboPreauditoriaDias(array.getJSONObject(i).getJSONObject("PRE_AUDITORIA").getInt("diasValidacion"));
	        	
	        	memoria.setPregestoriaAutorizada(array.getJSONObject(i).getJSONObject("PRE_GESTORIA").getString("fechaValidacion"));
	        	memoria.setPregestoriaAutorizadaEstatus(array.getJSONObject(i).getJSONObject("PRE_GESTORIA").getString("validacion"));
	        	memoria.setVoboPregestoriaDias(array.getJSONObject(i).getJSONObject("PRE_GESTORIA").getInt("diasValidacion"));
	        	
	        	memoria.setLevantamientoRealizado(array.getJSONObject(i).getJSONObject("PRE_CONSTRUCCION").getString("fechaValidacion"));
	        	memoria.setLevantamientoRealizadoEstatus(array.getJSONObject(i).getJSONObject("PRE_CONSTRUCCION").getString("validacion"));
	        	memoria.setCargaLayoutDias(array.getJSONObject(i).getJSONObject("PRE_CONSTRUCCION").getInt("diasValidacion"));
	        	
	        	memoria.setVoboLayoutOperaciones(array.getJSONObject(i).getJSONObject("VOBO_LAYOUT").getString("fechaValidacion"));
	        	memoria.setVoboLayoutOperacionesEstatus(array.getJSONObject(i).getJSONObject("VOBO_LAYOUT").getString("validacion"));
	        	memoria.setVoboLayoutDias(array.getJSONObject(i).getJSONObject("VOBO_LAYOUT").getInt("diasValidacion"));
	        	
	        	memoria.setFechaPptoConstruccion(array.getJSONObject(i).getJSONObject("JSONPTOOBRA").getString("fechaValidacion"));
	        	memoria.setFechaPptoConstruccionEstatus(array.getJSONObject(i).getJSONObject("JSONPTOOBRA").getString("validacion"));
	        	memoria.setMontoConstruccion(array.getJSONObject(i).getDouble("PRESUPUESTO_OBRA"));
	        	memoria.setPptoConstrDias(array.getJSONObject(i).getJSONObject("JSONPTOOBRA").getInt("diasValidacion"));
	        	
	        	memoria.setFechaPptoAuditoria(array.getJSONObject(i).getJSONObject("JSONPTOAUDITORIA").getString("fechaValidacion"));
	        	memoria.setFechaPptoAuditoriaEstatus(array.getJSONObject(i).getJSONObject("JSONPTOAUDITORIA").getString("validacion"));
	        	memoria.setMontoAuditoria(array.getJSONObject(i).getDouble("PRESUPUESTO_AUDITORIA"));
	        	memoria.setPptoAuditDias(array.getJSONObject(i).getJSONObject("JSONPTOAUDITORIA").getInt("diasValidacion"));
	        	
	        	memoria.setGestoria(array.getJSONObject(i).getJSONObject("TRAMITES").getString("fechaValidacion"));
	        	memoria.setGestoriaEstatus(array.getJSONObject(i).getJSONObject("TRAMITES").getString("validacion"));
	        	memoria.setTramitesDias(array.getJSONObject(i).getJSONObject("TRAMITES").getInt("diasValidacion"));
	        	
	        	memoria.setVoboFinalOperaciones(array.getJSONObject(i).getJSONObject("VOBOFNL_OPERACIONES").getString("fechaValidacion"));
	        	memoria.setVoboFinalOperacionesEstatus(array.getJSONObject(i).getJSONObject("VOBOFNL_OPERACIONES").getString("validacion"));
	        	memoria.setVentaEstimada(array.getJSONObject(i).getDouble("MONTOVNT"));
	        	memoria.setVoboFinalDias(array.getJSONObject(i).getJSONObject("VOBOFNL_OPERACIONES").getInt("diasValidacion"));
	        	
	        	memoria.setContratoFirmado(array.getJSONObject(i).getJSONObject("FIRMA_CONTRATO").getString("fechaValidacion"));
	        	memoria.setContratoFirmadoEstatus(array.getJSONObject(i).getJSONObject("FIRMA_CONTRATO").getString("validacion"));
	        	memoria.setContratoFirmadoDias(array.getJSONObject(i).getJSONObject("FIRMA_CONTRATO").getInt("diasValidacion"));
	        	
	        	memoria.setInicioObra(array.getJSONObject(i).getJSONObject("INICIO_OBRA").getString("fechaValidacion"));
	        	memoria.setInicioObraEstatus(array.getJSONObject(i).getJSONObject("INICIO_OBRA").getString("validacion"));
	        	memoria.setInicioObraDias(array.getJSONObject(i).getJSONObject("INICIO_OBRA").getInt("diasValidacion"));
	        	
	        	memoria.setEn_obra(array.getJSONObject(i).getJSONObject("EN_OBRA").getString("fechaValidacion"));
	        	memoria.setEn_obraEstatus(array.getJSONObject(i).getJSONObject("EN_OBRA").getString("validacion"));
	        	memoria.setObraDias(array.getJSONObject(i).getJSONObject("EN_OBRA").getInt("diasValidacion"));
	        	
	        	memoria.setTienda_abierta(array.getJSONObject(i).getJSONObject("TIENDA_ABIERTA").getString("fechaValidacion"));
	        	memoria.setTienda_abiertaEstatus(array.getJSONObject(i).getJSONObject("TIENDA_ABIERTA").getString("validacion"));
	        	memoria.setTiendaAbiertaDias(array.getJSONObject(i).getJSONObject("TIENDA_ABIERTA").getInt("diasValidacion"));
	        	
	        	memoria.setJefeExpansion(array.getJSONObject(i).getString("JEFEEXP"));
	        	memoria.setGerenteExpansion(array.getJSONObject(i).getString("GERENTEEXP"));
	        	memoria.setRegional(array.getJSONObject(i).getString("REGIONAL"));
	        	
	        	memoria.setComite(array.getJSONObject(i).getJSONObject("COMITE").getString("fechaValidacion"));
	        	memoria.setComiteEstatus(array.getJSONObject(i).getJSONObject("COMITE").getString("validacion"));
	        	memoria.setComiteDias(array.getJSONObject(i).getJSONObject("COMITE").getInt("diasValidacion"));
	        	
	        	memoria.setDoctos(array.getJSONObject(i).getJSONObject("CARGADATOS").getString("fechaValidacion"));
	        	memoria.setDoctosEstatus(array.getJSONObject(i).getJSONObject("CARGADATOS").getString("validacion"));
	        	memoria.setCargaDoctosDias(array.getJSONObject(i).getJSONObject("CARGADATOS").getInt("diasValidacion"));
	        	
	        	memoria.setCeco(array.getJSONObject(i).getJSONObject("CCO").getString("fechaValidacion"));
	        	memoria.setCecoEstatus(array.getJSONObject(i).getJSONObject("CCO").getString("validacion"));
	        	memoria.setCecoDias(array.getJSONObject(i).getJSONObject("CCO").getInt("diasValidacion"));
	        	
	        	memoria.setLevantamiento(array.getJSONObject(i).getJSONObject("LEVANTAMIENTO").getString("fechaValidacion"));
	        	memoria.setLevantamientoEstatus(array.getJSONObject(i).getJSONObject("LEVANTAMIENTO").getString("validacion"));
	        	memoria.setLevantamientoDias(array.getJSONObject(i).getJSONObject("CCO").getInt("diasValidacion"));
	        	
	        	 if (array.getJSONObject(i).has("ASIGNACIONFECHACITA") && 
	        			 !array.getJSONObject(i).isNull("ASIGNACIONFECHACITA")) {
	        		 memoria.setCitaLevantamiento(array.getJSONObject(i).getJSONObject("ASIGNACIONFECHACITA").getString("fechaValidacion"));
				     memoria.setCitaLevantamientoEstatus(array.getJSONObject(i).getJSONObject("ASIGNACIONFECHACITA").getString("validacion"));
				     memoria.setVoboCitaLevantDias(array.getJSONObject(i).getJSONObject("ASIGNACIONFECHACITA").getInt("diasValidacion"));
	        	 } else {
	        		 memoria.setCitaLevantamiento("");
				     memoria.setCitaLevantamientoEstatus("");
	        	 }
	        	 
	        	 
	        	 if (array.getJSONObject(i).has("CORRECCIONCONSTRUCCION") && 
	        			 !array.getJSONObject(i).isNull("CORRECCIONCONSTRUCCION")) {
	        		 memoria.setCorreccionConstruccion(array.getJSONObject(i).getJSONObject("CORRECCIONCONSTRUCCION").getString("fechaValidacion"));
				     memoria.setCorreccionConstruccionEstatus(array.getJSONObject(i).getJSONObject("CORRECCIONCONSTRUCCION").getString("validacion"));
				     memoria.setCorreccionConstrDias(array.getJSONObject(i).getJSONObject("CORRECCIONCONSTRUCCION").getInt("diasValidacion"));
	        	 } else {
	        		 memoria.setCorreccionConstruccion("");
				     memoria.setCorreccionConstruccionEstatus("");
	        	 }
	        	 
	        	 
	        	 if (array.getJSONObject(i).has("CORRECCIONEXPANSION") && 
	        			 !array.getJSONObject(i).isNull("CORRECCIONEXPANSION")) {
	        		 memoria.setCorreccionExpansion(array.getJSONObject(i).getJSONObject("CORRECCIONEXPANSION").getString("fechaValidacion"));
				     memoria.setCorreccionExpansionEstatus(array.getJSONObject(i).getJSONObject("CORRECCIONEXPANSION").getString("validacion"));
				     memoria.setCorreccionExpansDias(array.getJSONObject(i).getJSONObject("CORRECCIONEXPANSION").getInt("diasValidacion"));
	        	 } else {
	        		 memoria.setCorreccionExpansion("");
				     memoria.setCorreccionExpansionEstatus("");
	        	 }
	        	listaMemorias.add(memoria);
	        }
	        
	        
	        CreaExcelTablero excelCreator = new CreaExcelTablero();	        
	        HSSFWorkbook workbook = excelCreator.createWorkbook(listaMemorias);
	        
	        response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment; filename=" + "TableroExpansion_"+ new SimpleDateFormat("yyMMddHHmmss").format(new Date())+ ".xls");
			response.setHeader("Pragma", "No-cache");
			response.setDateHeader("Expires", 0);
	        
			ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
			workbook.write(outByteStream);
			byte [] outArray = outByteStream.toByteArray();
			
			
			OutputStream outStream = response.getOutputStream();
			outStream.write(outArray);
			outStream.flush();
		} catch(Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
		}
	}

}
