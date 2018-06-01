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

public class DashboardPSemanalAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	private String tipoConsulta;
	private String fechaConsulta;
	private String num;
	
	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}
	public String getTipoConsulta() {
		return tipoConsulta;
	}

	public void setTipoConsulta(String tipoConsulta) {
		this.tipoConsulta = tipoConsulta;
	}

	public String getFechaConsulta() {
		return fechaConsulta;
	}

	public void setFechaConsulta(String fechaConsulta) {
		this.fechaConsulta = fechaConsulta;
	}
	
	@Override
	public String execute() throws Exception{
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		String numeroEmpleado = null;
		int puestoId = 0;
		int areaId = 0;
		
		
		if(usuario != null) {
			numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			puestoId = usuario.getPerfil().getPuestoId();
			if(usuario.getPerfil().getAreasxpuesto().size() > 0) {
				areaId = usuario.getPerfil().getAreasxpuesto().get(0).getAreaId();
			}
		} else {
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(501);
			respuestaVo.setMensaje("Error en la sesi�n");
			sendJSONObjectToResponse(respuestaVo);
			return null;
		}
		
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try{
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
		 .add("tipoConsulta", getTipoConsulta())
         .add("fechaConsulta", getFechaConsulta())
         .add("usuarioId", numeroEmpleado)
		 .add("puestoId", String.valueOf(puestoId))
         .add("areaId", String.valueOf(areaId))
		 .add("num", getNum());
				
		RequestBody formBody = formBuilder.build();
		 Request request = new Request.Builder()
				 .url(sp.getPropiedad("planAperturaSemanal"))
                 .post(formBody)
                 .build();
		
		 Response response = client.newCall(request).execute();
		 respuesta = response.body().string();
		 response2.getWriter().write(respuesta);
		 }
		 catch (Exception e){
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e+"","", ""); 
			e.printStackTrace();
			response2.getWriter().write("error");
		 }
		
		return null;
	}
}
