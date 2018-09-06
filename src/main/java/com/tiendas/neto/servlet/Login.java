package com.tiendas.neto.servlet;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@SuppressWarnings("serial")
public class Login  extends HttpServlet {
	private final int ANALISTA_RADIOS = 15;
	Expansionlog elog=new Expansionlog();
	SingletonProperties sp=SingletonProperties.getInstancia();
	private String user;
	private String pass;
	
	/**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
    	doPost(request,response);
	}

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	UsuarioLoginVO usuario=new UsuarioLoginVO();
    	RequestDispatcher despachador = null;
    	int codigo;
    	response.setContentType("text/html;charset=UTF-8");

    	user=request.getParameter("user");
    	pass=request.getParameter("pass"); 
    	
    	try{
    	usuario=comprueba_login(user,pass);
    	codigo=usuario.getCodigo();
    	Integer perfil;
    	perfil=usuario.getPerfil().getPerfilesxusuario()[0].getPerfilid();
			
    	if (codigo == 200 && perfil!=1 && perfil!=2) {
				try {
					HttpSession sesion = request.getSession();
					sesion.setAttribute("usr", usuario);
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				if(usuario.getPerfil().getPuestoId() == ANALISTA_RADIOS) {
					despachador = getServletContext().getRequestDispatcher("/jsp/localizador.jsp");
				} else {
					despachador = getServletContext().getRequestDispatcher("/jsp/dashboard.jsp");
				}
				despachador.include(request, response);
			} else {
				request.setAttribute("respuesta", "error");
				despachador = getServletContext().getRequestDispatcher("/jsp/login.jsp");
				despachador.include(request, response);
			}
    	}catch(Exception e){
    	String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
    	String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
    	
    	elog.error(clase, metodo, e+"", user, pass);

    	request.setAttribute("respuesta", "error");
		despachador = getServletContext().getRequestDispatcher("/jsp/login.jsp");
		despachador.include(request, response);
		e.printStackTrace();

		}
	}
	
//------------------------------ CONEXION AL SERVICIO ------------------------------
	public UsuarioLoginVO comprueba_login(String user, String pass) {    		
		String respuesta="";
		UsuarioLoginVO userLogin=null;
	try{
		String pass_encriptado= encripta(pass);
		
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
			elog.error(clase,metodo,e+"",user, pass);  
		 }
	return userLogin;
	
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
    


