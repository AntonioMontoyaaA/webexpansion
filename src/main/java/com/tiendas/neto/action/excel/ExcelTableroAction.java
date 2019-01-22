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
	        	memoria.setConteoAuditor(array.getJSONObject(i).getInt("CONTEOAUDITOR"));
	        	memoria.setFechaConteoAuditor(array.getJSONObject(i).getJSONObject("PRE_AUDITORIA").getString("fechaValidacion"));
	        	memoria.setFechaConteoAuditorEstatus(array.getJSONObject(i).getJSONObject("PRE_AUDITORIA").getString("validacion"));
	        	memoria.setPregestoriaAutorizada(array.getJSONObject(i).getJSONObject("PRE_GESTORIA").getString("fechaValidacion"));
	        	memoria.setPregestoriaAutorizadaEstatus(array.getJSONObject(i).getJSONObject("PRE_GESTORIA").getString("validacion"));
	        	memoria.setLevantamientoRealizado(array.getJSONObject(i).getJSONObject("PRE_CONSTRUCCION").getString("fechaValidacion"));
	        	memoria.setLevantamientoRealizadoEstatus(array.getJSONObject(i).getJSONObject("PRE_CONSTRUCCION").getString("validacion"));
	        	memoria.setVoboLayoutOperaciones(array.getJSONObject(i).getJSONObject("VOBO_LAYOUT").getString("fechaValidacion"));
	        	memoria.setVoboLayoutOperacionesEstatus(array.getJSONObject(i).getJSONObject("VOBO_LAYOUT").getString("validacion"));
	        	memoria.setFechaPptoConstruccion(array.getJSONObject(i).getJSONObject("JSONPTOOBRA").getString("fechaValidacion"));
	        	memoria.setFechaPptoConstruccionEstatus(array.getJSONObject(i).getJSONObject("JSONPTOOBRA").getString("validacion"));
	        	memoria.setMontoConstruccion(array.getJSONObject(i).getDouble("PRESUPUESTO_OBRA"));
	        	memoria.setFechaPptoAuditoria(array.getJSONObject(i).getJSONObject("JSONPTOAUDITORIA").getString("fechaValidacion"));
	        	memoria.setFechaPptoAuditoriaEstatus(array.getJSONObject(i).getJSONObject("JSONPTOAUDITORIA").getString("validacion"));
	        	memoria.setMontoAuditoria(array.getJSONObject(i).getDouble("PRESUPUESTO_AUDITORIA"));
	        	memoria.setGestoria(array.getJSONObject(i).getJSONObject("TRAMITES").getString("fechaValidacion"));
	        	memoria.setGestoriaEstatus(array.getJSONObject(i).getJSONObject("TRAMITES").getString("validacion"));
	        	memoria.setVoboFinalOperaciones(array.getJSONObject(i).getJSONObject("VOBOFNL_OPERACIONES").getString("fechaValidacion"));
	        	memoria.setVoboFinalOperacionesEstatus(array.getJSONObject(i).getJSONObject("VOBOFNL_OPERACIONES").getString("validacion"));
	        	memoria.setVentaEstimada(array.getJSONObject(i).getDouble("MONTOVNT"));
	        	memoria.setContratoFirmado(array.getJSONObject(i).getJSONObject("FIRMA_CONTRATO").getString("fechaValidacion"));
	        	memoria.setContratoFirmadoEstatus(array.getJSONObject(i).getJSONObject("FIRMA_CONTRATO").getString("validacion"));
	        	memoria.setInicioObra(array.getJSONObject(i).getJSONObject("INICIO_OBRA").getString("fechaValidacion"));
	        	memoria.setInicioObraEstatus(array.getJSONObject(i).getJSONObject("INICIO_OBRA").getString("validacion"));
	        	memoria.setEn_obra(array.getJSONObject(i).getJSONObject("EN_OBRA").getString("fechaValidacion"));
	        	memoria.setEn_obraEstatus(array.getJSONObject(i).getJSONObject("EN_OBRA").getString("validacion"));
	        	memoria.setTienda_abierta(array.getJSONObject(i).getJSONObject("TIENDA_ABIERTA").getString("fechaValidacion"));
	        	memoria.setTienda_abiertaEstatus(array.getJSONObject(i).getJSONObject("TIENDA_ABIERTA").getString("validacion"));
	        	//memoria.setInauguracionObjetivo(array.getJSONObject(i).getString("INAUGURACIONINICIAL"));
	        	memoria.setJefeExpansion(array.getJSONObject(i).getString("JEFEEXP"));
	        	memoria.setGerenteExpansion(array.getJSONObject(i).getString("GERENTEEXP"));
	        	memoria.setRegional(array.getJSONObject(i).getString("REGIONAL"));
	        	memoria.setComite(array.getJSONObject(i).getJSONObject("COMITE").getString("fechaValidacion"));
	        	memoria.setComiteEstatus(array.getJSONObject(i).getJSONObject("COMITE").getString("validacion"));
	        	memoria.setDoctos(array.getJSONObject(i).getJSONObject("CARGADATOS").getString("fechaValidacion"));
	        	memoria.setDoctosEstatus(array.getJSONObject(i).getJSONObject("CARGADATOS").getString("validacion"));
	        	memoria.setCeco(array.getJSONObject(i).getJSONObject("CCO").getString("fechaValidacion"));
	        	memoria.setCecoEstatus(array.getJSONObject(i).getJSONObject("CCO").getString("validacion"));	    
	        	memoria.setLevantamiento(array.getJSONObject(i).getJSONObject("LEVANTAMIENTO").getString("fechaValidacion"));
	        	memoria.setLevantamientoEstatus(array.getJSONObject(i).getJSONObject("LEVANTAMIENTO").getString("validacion"));

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
