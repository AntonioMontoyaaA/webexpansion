package com.tiendas.neto.action;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.view.JasperViewer;
import net.sf.jasperreports.engine.JasperExportManager;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;

public class PruebaPdf {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
 
		
//		HttpServletRequest request=ServletActionContext.getRequest();
//		HttpServletResponse response=ServletActionContext.getResponse();
		
		Map parameters = new HashMap();
		JasperPrint print = null;
		parameters.put("TITULO", "PAISES");
		
		try {
			JasperReport report = JasperCompileManager.compileReport("e:\\Users\\kcortes\\Documents\\reporte\\reporte.jrxml");
			print = JasperFillManager.fillReport(report, parameters);
			 JasperExportManager.exportReportToPdfFile(print, "e:\\Users\\kcortes\\Documents\\reporte\\reportepdf.pdf");
			
			 
//			 response.setContentType("application/x-download");
//				response.setHeader("Content-Disposition", "attachment; filename=" + "nombre.pdf");
//				response.setHeader("Pragma", "No-cache");
//				response.setDateHeader("Expires", 0);
//		        
//				OutputStream outStream = response.getOutputStream();
//				JasperExportManager.exportReportToPdfStream(print,outStream);
//				outStream.flush();
			 
		} catch (JRException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
