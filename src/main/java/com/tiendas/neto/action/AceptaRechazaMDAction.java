package com.tiendas.neto.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.FormBody.Builder;

public class AceptaRechazaMDAction extends ActionSupport implements SessionAware, ParameterNameAware {

	private static final long serialVersionUID = 1L;
	protected Map<String, Object> session ;
	Expansionlog elog = new Expansionlog();
	SingletonProperties sp = SingletonProperties.getInstancia();
	
	public String execute() throws Exception {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		String modulo = ServletActionContext.getRequest().getParameter("modulo");
		String md = ServletActionContext.getRequest().getParameter("md");
		String validacion = ServletActionContext.getRequest().getParameter("validacion");
		String motivo = ServletActionContext.getRequest().getParameter("motivo");
		String finaliza = ServletActionContext.getRequest().getParameter("finaliza");
		String comentario = ServletActionContext.getRequest().getParameter("comentario");
		
		try{
			
			if(usuario == null){
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesi�n");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}else{
				String numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
				String puestoId = String.valueOf(usuario.getPerfil().getPuestoId());
				String areaId = "";
				if(comentario.isEmpty() || comentario.equals(" "))
					comentario = "''";
				if(usuario.getPerfil().getAreasxpuesto().length > 0) {
					areaId = String.valueOf(usuario.getPerfil().getAreasxpuesto()[0].getAreaId());
				}
				else
					areaId="1";

				final OkHttpClient client = new OkHttpClient();
				
				Builder builder = new Builder()
					.add("usuarioId", numeroEmpleado)
					.add("mdId", md)
					.add("factorId", modulo)
					.add("estatusValidacion", validacion)
					.add("motivoRechazo", motivo)
					.add("comentarios", comentario.trim())
					.add("finalizaValidacion", finaliza)
					.add("puestoId", puestoId)
					.add("areaId", areaId)
				;
				
				RequestBody body = builder.build();
				Request request = new Request.Builder()
					.url(sp.getPropiedad("autorizaMd"))
					.post(body)
					.build();
				
				Response response = client.newCall(request).execute();
				respuesta = response.body().string();
				
				HttpServletResponse re = ServletActionContext.getResponse();
				re.setContentType("application/json");
				re.setCharacterEncoding("UTF-8");
				re.getWriter().write(respuesta);
			}
			
		}catch (Exception e) {
			String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
			String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
			elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "Modulo ID: " + modulo);
			
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(404);
			respuestaVo.setMensaje("Error al conectarse al servidor");
			sendJSONObjectToResponse(respuestaVo);
		}
		return null;
	}
	
	protected void sendJSONObjectToResponse(Object objToSend) {
		Gson gson = new Gson();
		String jsonResult = gson.toJson(objToSend);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		try {
			response.getWriter().write(jsonResult);
		} catch (IOException e) {}
	}

	@Override
	public boolean acceptableParameterName(String parameterName) {
		boolean allowedParameterName = true ;	     
		if (parameterName.contains("session")  || 
				parameterName.contains("request") ) {	     
			allowedParameterName = false ;	         
		} 	     
		return allowedParameterName;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
	
	public static void main(String[] args) {
		String [] arrMD = {"180803193951","180802191032","180802181727",
				"180805135005","180804191708","180723190643","180803122025",
				"180803173654","180803015222","180803151717","180803182725",
				"180723180153","180802194636","180803011343","180803013401",
				"180805141533","180805125342","180803135120","180803225701",
				"180803094624","180803163852","180803221700","180802205108",
				"180803150059","180805074035","180803152602","180803202121",
				"180805140916","180803131318","180803160333"};
		
		String respuesta = "";
		
		try {
			final OkHttpClient client = new OkHttpClient();
			Builder builder;
			RequestBody body;
			Request request;
			Response response;
			
			for(String md : arrMD) {
				builder = new Builder()
						.add("usuarioId", "703021")
						.add("mdId", md)
						.add("factorId", "7")
						.add("estatusValidacion", "1")
						.add("motivoRechazo", "0")
						.add("comentarios", "Ok")
						.add("finalizaValidacion", "1")
						.add("puestoId", "6")
						.add("areaId", "2");
				
				body = builder.build();
				request = new Request.Builder()
					.url("http://206.189.223.154/vokseapi/evaluamd")
					.post(body)
					.build();
				
				response = client.newCall(request).execute();
				respuesta = response.body().string();
				
				System.out.println(md + "    " + respuesta);
			}
			
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
	}
}
