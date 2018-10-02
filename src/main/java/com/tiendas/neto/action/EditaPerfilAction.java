package com.tiendas.neto.action;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

//este es un comentario de prueba
public class EditaPerfilAction extends ExpansionAction implements SessionAware , ParameterNameAware, ServletRequestAware {
	protected Map<String, Object> session ;
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();


	
	public String guardarDatosPerfil() throws Exception {
		HttpSession session = ServletActionContext.getRequest().getSession();
		String pass=(String) session.getAttribute("pass");
		String nombre = ServletActionContext.getRequest().getParameter("nombre");
		String apellidop = ServletActionContext.getRequest().getParameter("apellidop");
		String apellidom = ServletActionContext.getRequest().getParameter("apellidom");
		String cel = ServletActionContext.getRequest().getParameter("cel");
		String email = ServletActionContext.getRequest().getParameter("email");
		String passAct = ServletActionContext.getRequest().getParameter("passAct");
		String passnew = ServletActionContext.getRequest().getParameter("passnew");
		String passconf = ServletActionContext.getRequest().getParameter("passconf");
		String imgUser = ServletActionContext.getRequest().getParameter("imgUser");
		
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		String areaId = "";
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		RespuestaVo respuestaVo = new RespuestaVo();
		
			try {
				if(usuario != null) {
					numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
					
					if(usuario.getPerfil().getAreasxpuesto().length > 0) {
						areaId = String.valueOf(usuario.getPerfil().getAreasxpuesto()[0].getAreaId());
					}
					if(areaId==null)
						areaId="1";
				} else {
					respuestaVo.setCodigo(501);
					respuestaVo.setMensaje("Error en la sesión");
					sendJSONObjectToResponse(respuestaVo);
					
					return null;
				}
				
				if(!passAct.isEmpty() && !passnew.isEmpty() && !passconf.isEmpty()) {
					
					if(pass.equals(encripta(passAct))){
						if(encripta(passnew).equals(encripta(passconf))) {
							// code
							passconf = encripta(passconf);
							session.setAttribute("pass",passconf);
						}else {
							respuestaVo.setCodigo(445);
							respuestaVo.setMensaje("Contrase�as no corresponden.");
							sendJSONObjectToResponse(respuestaVo);
							return null;
						}
					}else {
						respuestaVo.setCodigo(445);
						respuestaVo.setMensaje("Contrase�a incorrecta.");
						sendJSONObjectToResponse(respuestaVo);
						return null;
					}
				}else if(!passAct.isEmpty() || !passnew.isEmpty() || !passconf.isEmpty()) {
					respuestaVo.setCodigo(445);
					respuestaVo.setMensaje("Completar los campos de contrase�a para cambiarla.");
					sendJSONObjectToResponse(respuestaVo);
					return null;
				}else {
					passconf = "";					
				}

				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("nombre", nombre)
				 .add("apellidoPaterno",apellidop)
		         .add("apellidoMaterno", apellidom)
		         .add("numTelefono", cel)
		         .add("correo", email)
		         .add("contrasena", passconf)
		         .add("imagen", imgUser)
		         .add("usuarioId", numeroEmpleado);
				
				String passUserRefresh ="";
				if(passconf.equals("")) {
					passUserRefresh = pass;
				}else {
					passUserRefresh = passconf;
				}

				HashMap<?, ?> MENUVOKSE =  (HashMap<?, ?>) session.getAttribute("permisos");

				 RequestBody formBody = formBuilder.build();
				 Request request = new Request.Builder()
						 .url(sp.getPropiedad("editaPerfil"))
		                 .post(formBody)
		                 .build();
				
				 Response response = client.newCall(request).execute();
				 respuesta = response.body().string();
				 HttpServletResponse response2 = ServletActionContext.getResponse();
					response2.setContentType("application/json");
					response2.setCharacterEncoding("UTF-8");
					response2.getWriter().write(respuesta);


					HttpSession nsession = ServletActionContext.getRequest().getSession();
					
					UsuarioLoginVO usuarioSession = new UsuarioLoginVO();					
					usuarioSession=comprueba_login(numeroEmpleado,passUserRefresh);
					nsession.setAttribute("usr", usuarioSession);
					nsession.setAttribute("permisos", MENUVOKSE);
				 }
				 catch (Exception e) {

					String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
					String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
					elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado()); 
					
					respuestaVo.setCodigo(404);
					respuestaVo.setMensaje("Error al conectarse al servidor"+e.getMessage());
					sendJSONObjectToResponse(respuestaVo);
				 }

		return null;
	} 
	
	public String encripta(String cadena) throws NoSuchAlgorithmException {
        try {
            // Create MessageDigest instance for MD5
            MessageDigest md = MessageDigest.getInstance("MD5");
            //Add password bytes to digest
            md.update(cadena.getBytes());
            //Get the hash's bytes
            byte[] bytes = md.digest();
            //This bytes[] has bytes in decimal format;
            //Convert it to hexadecimal format
            StringBuilder sb = new StringBuilder();
            for(int i=0; i< bytes.length ;i++)
            {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            //Get complete hashed password in hex format
            System.out.println(sb.toString());
            return sb.toString();
        }
        catch (NoSuchAlgorithmException e)
        {
            e.printStackTrace();
            throw new NoSuchAlgorithmException(e);
        }
    }
	
	//------------------------------ CONEXION AL SERVICIO ------------------------------
		public UsuarioLoginVO comprueba_login(String user, String pass_encriptado) {    		
			String respuesta="";
			UsuarioLoginVO userLogin=null;
		try{

			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
			 .add("usuarioId", user)
	         .add("contrasena", pass_encriptado)
	         .add("numTelefono", "")
	         .add("tipoLog", "2");
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("login"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 
			 Gson gson = new Gson();
			 String jsonInString = respuesta;
			 userLogin = gson.fromJson(jsonInString, UsuarioLoginVO.class);
			 userLogin.getPerfil().setNumeroEmpleado(Integer.parseInt(user));		 
			 }
			 catch (Exception e){
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e+"",user, pass_encriptado);  
			 }
		return userLogin;
		
	   }

		 @Override
		    public void setServletRequest(HttpServletRequest request) {
		        HttpSession session = request.getSession();
		        session.setAttribute("userName", "Tom");
		    }
}