package com.tiendas.neto.servlet;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;

import com.tiendas.neto.reportes.excel.CreaExcelMemoriasAsignadas;
import com.tiendas.neto.vo.MemoriaAsignadaVO;

/**
 * Servlet implementation class ServletExcelAsignadas
 */
@WebServlet("/ServletExcelAsignadas")
public class ServletExcelAsignadas extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletExcelAsignadas() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		procesar(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		procesar(request, response);
	}
	
	public void procesar(HttpServletRequest request, HttpServletResponse response)  {
		try {
	        
	        String datos = request.getParameter("datos");
	        JSONObject jsonObj = new JSONObject(datos);
	       
	        List<MemoriaAsignadaVO> listaMemorias = new ArrayList<MemoriaAsignadaVO>();
	        JSONArray array = jsonObj.getJSONArray("mds");
	        for(int i = 0 ; i < array.length() ; i++) {
	        	MemoriaAsignadaVO memoria = new MemoriaAsignadaVO();
	        	memoria.setMdId(array.getJSONObject(i).getLong("mdId"));
	        	memoria.setNombreMd(array.getJSONObject(i).getString("nombreMd"));
	        	memoria.setCategoria(array.getJSONObject(i).getString("categoria"));
	        	memoria.setPuntuacion(array.getJSONObject(i).getInt("puntuacion"));
	        	memoria.setCreador(array.getJSONObject(i).getString("creador"));
	        	memoria.setFechaCreacion(array.getJSONObject(i).getString("fechaCreacion"));
	        	memoria.setFechaVencimiento(array.getJSONObject(i).getString("fechaVencimiento"));
	        	memoria.setMdVencida(array.getJSONObject(i).getBoolean("mdVencida"));
	        }
	        
	        CreaExcelMemoriasAsignadas excelCreator = new CreaExcelMemoriasAsignadas();
	        HSSFWorkbook workbook = excelCreator.createWorkbook(listaMemorias);
	        
	        
	        response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment; filename=" + "MDsAsignadas_"+ new SimpleDateFormat("yyMMddHHmmss").format(new Date())+ ".xls");
			response.setHeader("Pragma", "No-cache");
			response.setDateHeader("Expires", 0);
	        
			ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
			workbook.write(outByteStream);
			byte [] outArray = outByteStream.toByteArray();
			
			
			OutputStream outStream = response.getOutputStream();
			outStream.write(outArray);
			outStream.flush();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}
