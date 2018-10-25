package com.tiendas.neto.action;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class CreaPerfilAction extends ExpansionAction {
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();
	
	@Override
	public String execute() throws Exception{
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		UsuarioLoginVO usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
		String nombrePerfil = ServletActionContext.getRequest().getParameter("nombre");
		String estatusPerfil = ServletActionContext.getRequest().getParameter("estatus");
		String descripcionPerfil = ServletActionContext.getRequest().getParameter("descripcion");
		String modulosPerfil = "[" + ServletActionContext.getRequest().getParameter("modulos") + "]";
			
		String respuesta="";
		HttpServletResponse response2 = ServletActionContext.getResponse();
		response2.setContentType("application/json");
		response2.setCharacterEncoding("UTF-8");
		
		try{
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
					.add("usuarioId", numeroEmpleado)
					.add("perfilId", "")
					.add("nombre", nombrePerfil)
					.add("estatus", estatusPerfil)
					.add("descripcion", descripcionPerfil)
					.add("modulos", modulosPerfil);
				
			RequestBody formBody = formBuilder.build();
			Request request = new Request.Builder()
				 .url(sp.getPropiedad("creaperfil"))
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
