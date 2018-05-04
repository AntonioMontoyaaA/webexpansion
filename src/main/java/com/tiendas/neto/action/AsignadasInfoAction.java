package com.tiendas.neto.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.tiendas.neto.vo.AsignadasVO;
import com.tiendas.neto.vo.MemoriaAsignadaVO;
//este es un comentario de prueba
public class AsignadasInfoAction extends ActionSupport implements SessionAware, ParameterNameAware {
	protected Map<String, Object> session ;
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;

	
	@Override
	public String execute() throws Exception{
		
		String parametro = ServletActionContext.getRequest().getParameter("variable1");
		
		AsignadasVO asignadas = new AsignadasVO();
		asignadas.setCodigo(200);
		asignadas.setMensaje("Consulta realizada con éxito");
		
		MemoriaAsignadaVO[] listaMemorias = new MemoriaAsignadaVO[10];
		
		MemoriaAsignadaVO mem1 = new MemoriaAsignadaVO();
		mem1.setMdId(12345);
		mem1.setNombreMd("MD Oaxaca centro");
		mem1.setCategoria("A");
		mem1.setPuntuacion(27);
		mem1.setCreador("Juan de la Cruz");
		mem1.setFechaCreacion("10/03/2018");
		mem1.setFechaVencimiento("06/04/2018");
		listaMemorias[0] = mem1;
		
		MemoriaAsignadaVO mem2 = new MemoriaAsignadaVO();
		mem2.setMdId(12346);
		mem2.setNombreMd("MD Chilpancingo");
		mem2.setCategoria("A");
		mem2.setPuntuacion(27);
		mem2.setCreador("Antonio Montoya");
		mem2.setFechaCreacion("25/02/2018");
		mem2.setFechaVencimiento("08/04/2018");
		listaMemorias[1] = mem2;
		
		MemoriaAsignadaVO mem3 = new MemoriaAsignadaVO();
		mem3.setMdId(12347);
		mem3.setNombreMd("MD Oaxaca sur centro");
		mem3.setCategoria("A");
		mem3.setPuntuacion(27);
		mem3.setCreador("Juan de la Cruz");
		mem3.setFechaCreacion("01/03/2018");
		mem3.setFechaVencimiento("10/03/2018");
		listaMemorias[2] = mem3;
		
		MemoriaAsignadaVO mem4 = new MemoriaAsignadaVO();
		mem4.setMdId(12348);
		mem4.setNombreMd("MD Morelos Sur");
		mem4.setCategoria("A");
		mem4.setPuntuacion(27);
		mem4.setCreador("Omar Perez");
		mem4.setFechaCreacion("03/01/2018");
		mem4.setFechaVencimiento("08/04/2018");
		listaMemorias[3] = mem4;
		
		MemoriaAsignadaVO mem5 = new MemoriaAsignadaVO();
		mem5.setMdId(12349);
		mem5.setNombreMd("MD Acatitlán");
		mem5.setCategoria("A");
		mem5.setPuntuacion(24);
		mem5.setCreador("Miguel Ramírez");
		mem5.setFechaCreacion("07/02/2018");
		mem5.setFechaVencimiento("01/04/2018");
		listaMemorias[4] = mem5;
		
		MemoriaAsignadaVO mem6 = new MemoriaAsignadaVO();
		mem6.setMdId(12350);
		mem6.setNombreMd("MD Guerrero poniente");
		mem6.setCategoria("B");
		mem6.setPuntuacion(24);
		mem6.setCreador("Antonio Montoya");
		mem6.setFechaCreacion("25/02/2018");
		mem6.setFechaVencimiento("31/03/2018");
		listaMemorias[5] = mem6;
		
		MemoriaAsignadaVO mem7 = new MemoriaAsignadaVO();
		mem7.setMdId(12351);
		mem7.setNombreMd("MD Chiapas este");
		mem7.setCategoria("B");
		mem7.setPuntuacion(24);
		mem7.setCreador("Omar Pérez");
		mem7.setFechaCreacion("01/03/2018");
		mem7.setFechaVencimiento("10/03/2018");
		listaMemorias[6] = mem7;
		
		MemoriaAsignadaVO mem8 = new MemoriaAsignadaVO();
		mem8.setMdId(12352);
		mem8.setNombreMd("MD Tabasco centro");
		mem8.setCategoria("B");
		mem8.setPuntuacion(24);
		mem8.setCreador("Miguel Ramírez");
		mem8.setFechaCreacion("07/02/2018");
		mem8.setFechaVencimiento("04/03/2018");
		listaMemorias[7] = mem8;
		
		MemoriaAsignadaVO mem9 = new MemoriaAsignadaVO();
		mem9.setMdId(12353);
		mem9.setNombreMd("MD Acapulco Diamante");
		mem9.setCategoria("B");
		mem9.setPuntuacion(24);
		mem9.setCreador("Antonio Montoya");
		mem9.setFechaCreacion("25/02/2018");
		mem9.setFechaVencimiento("09/04/2018");
		listaMemorias[8] = mem9;
		
		MemoriaAsignadaVO mem10 = new MemoriaAsignadaVO();
		mem10.setMdId(12354);
		mem10.setNombreMd("MD Cuernavaca centro");
		mem10.setCategoria("C");
		mem10.setPuntuacion(19);
		mem10.setCreador("Antonio Montoya");
		mem10.setFechaCreacion("25/02/2018");
		mem10.setFechaVencimiento("30/03/2018");
		listaMemorias[9] = mem10;
		asignadas.setListaAsignadas(listaMemorias);
		
		sendJSONObjectToResponse(asignadas);
		
		return null;
	} 
	
	protected void sendJSONObjectToResponse(Object objToSend){
		Gson gson = new Gson();
		String jsonResult = gson.toJson(objToSend);	      
	      HttpServletResponse response = ServletActionContext.getResponse();
	      response.setContentType("application/json");
	      response.setCharacterEncoding("UTF-8");
	      try {
	    	  response.getWriter().write(jsonResult );
		} catch (IOException e) {
		}
	}
	
	@Override
	public void setSession(Map<String, Object> session) {					 
		this.session = session ;	
	}
	@Override
	public boolean acceptableParameterName(String parameterName) {	     
	    boolean allowedParameterName = true ;	     
	    if ( parameterName.contains("session")  || parameterName.contains("request") ) {	     
	        allowedParameterName = false ;	         
	    } 	     
	    return allowedParameterName;
	}	
}
