package com.tiendas.neto.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.PerfilesxusuarioVO;
import com.tiendas.neto.vo.UsuarioLoginVO;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@SuppressWarnings("serial")
public class Login  extends HttpServlet {
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
				RequestDispatcher despachador = getServletContext().getRequestDispatcher("/jsp/dashboard.jsp");
				despachador.include(request, response);
			} else {
				request.setAttribute("respuesta", "error");
				RequestDispatcher despachador = getServletContext().getRequestDispatcher("/jsp/login.jsp");
				despachador.include(request, response);
			}
    	}catch(Exception e){
    	String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
    	String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
    	
    	elog.error(clase, metodo, e+"", user, pass);

    	request.setAttribute("respuesta", "error");
		RequestDispatcher despachador = getServletContext().getRequestDispatcher("/jsp/login.jsp");
		despachador.include(request, response);
		e.printStackTrace();

		}
	}
	
//------------------------------ CONEXION AL SERVICIO ------------------------------
	public UsuarioLoginVO comprueba_login(String user, String pass) {    
		String respuesta="";

		UsuarioLoginVO userLogin=null;
	try{
		final OkHttpClient client = new OkHttpClient();
		FormBody.Builder formBuilder = new FormBody.Builder()
		 .add("usuarioId", user)
         .add("contrasena", pass)
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
    
}
