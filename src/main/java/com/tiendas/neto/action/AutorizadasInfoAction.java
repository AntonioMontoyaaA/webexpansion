package com.tiendas.neto.action;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class AutorizadasInfoAction extends ExpansionAction{

	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private String fechaConsulta;
	private String cadena;
	
	public String getCadena() {
		return cadena;
	}
	public void setCadena(String cadena) {
		this.cadena = cadena;
	}	
	public String getFechaConsulta() {
		return fechaConsulta;
	}
	public void setFechaConsulta(String fechaConsulta) {
		this.fechaConsulta = fechaConsulta;
	}
	@Override
	public String execute() throws Exception {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		int puestoId = 0;
		int areaId = 0;
		
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				puestoId = usuario.getPerfil().getPuestoId();
				if(usuario.getPerfil().getAreasxpuesto().size() > 0) {
					areaId = usuario.getPerfil().getAreasxpuesto().get(0).getAreaId();
				}
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}
			
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
			 .add("usuarioId", numeroEmpleado)
			 .add("puestoId", String.valueOf(puestoId))
	         .add("fechaConsulta", getFechaConsulta())
	         .add("areaId", String.valueOf(areaId));
			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("mdsAsignadas"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				//response2.getWriter().write(respuesta);
				response2.getWriter().write(getCadena());
			 }
			 catch (Exception e) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Fecha consulta: " + fechaConsulta); 
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
			 }
		
		return null;
	} 
}
