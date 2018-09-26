package com.tiendas.neto.action;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
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
public class editaPerfilAction extends ExpansionAction implements SessionAware, ParameterNameAware {
	protected Map<String, Object> session ;
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();

	private String nombre_usuario;
	private String apellidoM_usuario;
	private String apellidoP_usuario;
	
	private String puesto_usuario;
	private String celular_usuario;
	private String email_usuario;
	private String contrase�a_usuario;
	private String contrase�anueva_usuario;
	private String rcontrase�anueva_usuario;
	private String imagen_usuario;
	
	
	public String getImagen_usuario() {
		return imagen_usuario;
	}

	public void setImagen_usuario(String imagen_usuario) {
		this.imagen_usuario = imagen_usuario;
	}

	public String getNombre_usuario() {
		return nombre_usuario;
	}

	public void setNombre_usuario(String nombre_usuario) {
		this.nombre_usuario = nombre_usuario;
	}

	public String getApellidoM_usuario() {
		return apellidoM_usuario;
	}

	public void setApellidoM_usuario(String apellidoM_usuario) {
		this.apellidoM_usuario = apellidoM_usuario;
	}

	public String getApellidoP_usuario() {
		return apellidoP_usuario;
	}

	public void setApellidoP_usuario(String apellidoP_usuario) {
		this.apellidoP_usuario = apellidoP_usuario;
	}

	public String getPuesto_usuario() {
		return puesto_usuario;
	}

	public void setPuesto_usuario(String puesto_usuario) {
		this.puesto_usuario = puesto_usuario;
	}

	public String getCelular_usuario() {
		return celular_usuario;
	}

	public void setCelular_usuario(String celular_usuario) {
		this.celular_usuario = celular_usuario;
	}

	public String getEmail_usuario() {
		return email_usuario;
	}

	public void setEmail_usuario(String email_usuario) {
		this.email_usuario = email_usuario;
	}

	public String getContrase�a_usuario() {
		return contrase�a_usuario;
	}

	public void setContrase�a_usuario(String contrase�a_usuario) {
		this.contrase�a_usuario = contrase�a_usuario;
	}

	public String getContrase�anueva_usuario() {
		return contrase�anueva_usuario;
	}

	public void setContrase�anueva_usuario(String contrase�anueva_usuario) {
		this.contrase�anueva_usuario = contrase�anueva_usuario;
	}

	public String getRcontrase�anueva_usuario() {
		return rcontrase�anueva_usuario;
	}

	public void setRcontrase�anueva_usuario(String rcontrase�anueva_usuario) {
		this.rcontrase�anueva_usuario = rcontrase�anueva_usuario;
	}

	@Override
	public String execute() throws Exception {
		HttpSession session = ServletActionContext.getRequest().getSession();
		String pass=(String) session.getAttribute("pass");
		
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		int puestoId = 0;
		String areaId = "";
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		if(pass.equals(encripta(contrase�a_usuario))){
			if(encripta(contrase�anueva_usuario)==encripta(rcontrase�anueva_usuario)) {
			
			try {
				if(usuario != null) {
					numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
					
					if(usuario.getPerfil().getAreasxpuesto().length > 0) {
						areaId = String.valueOf(usuario.getPerfil().getAreasxpuesto()[0].getAreaId());
					}
					if(areaId==null)
						areaId="1";
				} else {
					RespuestaVo respuestaVo = new RespuestaVo();
					respuestaVo.setCodigo(501);
					respuestaVo.setMensaje("Error en la sesión");
					sendJSONObjectToResponse(respuestaVo);
					
					return null;
				}
				
				final OkHttpClient client = new OkHttpClient();
				FormBody.Builder formBuilder = new FormBody.Builder()
				 .add("nombre", getNombre_usuario())
				 .add("apellidoPaterno",getApellidoM_usuario())
		         .add("apellidoMaterno", getApellidoP_usuario())
		         .add("numTelefono", getCelular_usuario())
		         .add("correo", getEmail_usuario())
		         .add("contrasena", getRcontrase�anueva_usuario())
		         .add("imagen", getImagen_usuario())
		         .add("usuarioId", numeroEmpleado);
				
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
				 }
				 catch (Exception e) {
					String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
					String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
					elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado()); 
					
					RespuestaVo respuestaVo = new RespuestaVo();
					respuestaVo.setCodigo(404);
					respuestaVo.setMensaje("Error al conectarse al servidor");
					sendJSONObjectToResponse(respuestaVo);
				 }
			}
			else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Las contrase�as no coinciden!");
				sendJSONObjectToResponse(respuestaVo);
			}
		}
		else {
			RespuestaVo respuestaVo = new RespuestaVo();
			respuestaVo.setCodigo(404);
			respuestaVo.setMensaje("La contrase�a es incorrecta!");
			sendJSONObjectToResponse(respuestaVo);
		}
		return null;
	} 
	
	public String encripta(String cadena) throws NoSuchAlgorithmException {
        String cad_encriptada = null;
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
}