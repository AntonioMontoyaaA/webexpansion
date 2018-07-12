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
	        	memoria.setFechaRecepcionMd(array.getJSONObject(i).getJSONObject("FECHARECEPCION").getString("fechaValidacion"));
	        	memoria.setFuenteMd(array.getJSONObject(i).getString("FUENTEMD"));
	        	memoria.setNombreTda(array.getJSONObject(i).getString("NOMBRETDA"));
	        	memoria.setConteoAuditor(array.getJSONObject(i).getInt("CONTEOAUDITOR"));
	        	memoria.setPregestoriaAutorizada(array.getJSONObject(i).getJSONObject("PRE_GESTORIA").getString("fechaValidacion"));
	        	memoria.setLevantamientoRealizado(array.getJSONObject(i).getJSONObject("PRE_CONSTRUCCION").getString("fechaValidacion"));
	        	memoria.setVoboLayoutOperaciones(array.getJSONObject(i).getJSONObject("VOBO_LAYOUT").getString("fechaValidacion"));
	        	memoria.setMontoConstruccion(array.getJSONObject(i).getDouble("PRESUPUESTO_OBRA"));
	        	memoria.setMontoAuditoria(array.getJSONObject(i).getDouble("PRESUPUESTO_AUDITORIA"));
	        	memoria.setGestoria(array.getJSONObject(i).getJSONObject("TRAMITES").getString("fechaValidacion"));
	        	memoria.setVoboFinalOperaciones(array.getJSONObject(i).getJSONObject("VOBOFNL_OPERACIONES").getString("fechaValidacion"));
	        	memoria.setContratoFirmado(array.getJSONObject(i).getJSONObject("FIRMA_CONTRATO").getString("fechaValidacion"));
	        	memoria.setInicioObra(array.getJSONObject(i).getJSONObject("INICIO_OBRA").getString("fechaValidacion"));
	        	memoria.setFinObra(array.getJSONObject(i).getString("ESTIMADO_FINOBRA"));
	        	memoria.setInauguracion(array.getJSONObject(i).getString("ESTIMADO_APERTURA"));
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
