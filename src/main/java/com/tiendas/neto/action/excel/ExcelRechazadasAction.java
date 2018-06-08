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
import com.tiendas.neto.reportes.excel.CreaExcelMemoriasAsignadas;
import com.tiendas.neto.reportes.excel.CreaExcelMemoriasAutorizadas;
import com.tiendas.neto.reportes.excel.CreaExcelMemoriasRechazadas;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.MemoriaAsignadaVO;
import com.tiendas.neto.vo.MemoriaVO;

public class ExcelRechazadasAction extends ExpansionAction {
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
	       
	        List<MemoriaVO> listaMemorias = new ArrayList<MemoriaVO>();
	        JSONArray array = jsonObj.getJSONArray("mds");
	        for(int i = 0 ; i < array.length() ; i++) {
	        	MemoriaVO memoria = new MemoriaVO();
	        	memoria.setMdId(array.getJSONObject(i).getLong("mdId"));
	        	memoria.setNombreMd(array.getJSONObject(i).getString("nombreMd"));
	        	memoria.setCategoria(array.getJSONObject(i).getString("categoria"));
	        	memoria.setPuntuacion(array.getJSONObject(i).getInt("puntuacion"));
	        	memoria.setCreador(array.getJSONObject(i).getString("creador"));
	        	memoria.setFechaCreacion(array.getJSONObject(i).getString("fechaCreacion"));
	        	memoria.setNombreRechazo(array.getJSONObject(i).getString("nombreRechazo"));
	        	memoria.setFechaRechazo(array.getJSONObject(i).getString("fechaRechazo"));
	        	memoria.setMotivoRechazo(array.getJSONObject(i).getString("motivoRechazo"));
	        	memoria.setTipoRechazo(array.getJSONObject(i).getString("tipoRechazo"));
	        	listaMemorias.add(memoria);
	        }
	        
	        CreaExcelMemoriasRechazadas excelCreator = new CreaExcelMemoriasRechazadas();
	        HSSFWorkbook workbook = excelCreator.createWorkbook(listaMemorias);
	        
	        response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment; filename=" + "MDsRechazadas_"+ new SimpleDateFormat("yyMMddHHmmss").format(new Date())+ ".xls");
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
