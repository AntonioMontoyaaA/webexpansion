package com.tiendas.neto.action.excel;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLConnection;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.tiendas.neto.action.ExpansionAction;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;

public class ExcelPlantillaRadios extends ExpansionAction {
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
	    	final String INTERNAL_FILE =  System.getProperty("jboss.server.config.dir")+"/expansion/config/Carga_Radios.xlsx";
	        File file = null;
	            file = new File(INTERNAL_FILE);
	        
	         
	        if(!file.exists()){
	            String errorMessage = "Sorry. The file you are looking for does not exist";
	            System.out.println(errorMessage);
	            OutputStream outputStream = response.getOutputStream();
	            outputStream.write(errorMessage.getBytes(Charset.forName("UTF-8")));
	            outputStream.close();
	            return;
	        }
	         
	        String mimeType= URLConnection.guessContentTypeFromName(file.getName());
	        if(mimeType==null){
	           // System.out.println("mimetype is not detectable, will take default");
	            mimeType = "application/octet-stream";
	        }
	
	        response.setContentType(mimeType);
			response.setDateHeader("Expires", 0);
	        response.setHeader("Content-Disposition", String.format("attachment; filename=\"" + file.getName() +"\""));
	        response.setHeader("Pragma", "No-cache");
	 
	        response.setContentLength((int)file.length());
	 
	        InputStream inStream = new BufferedInputStream(new FileInputStream(file));
	        OutputStream outStream = response.getOutputStream();
	        
	        byte[] buffer = new byte[4096];
	        int bytesRead = -1;
	         
	        while ((bytesRead = inStream.read(buffer)) != -1) {
	            outStream.write(buffer, 0, bytesRead);
	        }
	         
	        inStream.close();
	        outStream.close();   
			
		} catch(Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
		}
	}
}
