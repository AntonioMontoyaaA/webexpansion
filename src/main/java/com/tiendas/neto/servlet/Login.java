package com.tiendas.neto.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.tiendas.neto.dao.LoginDAO;
import com.tiendas.neto.vo.Usuario;

public class Login  extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass());
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
    	List<Usuario> permisos=new ArrayList();
    	LoginDAO comprueba= new LoginDAO();
    	String result="";
    	user=request.getParameter("user");
    	pass=request.getParameter("pass"); 
    	try{
    	result=comprueba.loginDao(user,pass);
    	}catch(Exception e){
    		e.printStackTrace();
		}
    	try {
        HttpSession sesion = request.getSession();

    	permisos=comprueba.permisosDao(user);
    	sesion.setAttribute("permisos", permisos);
    	System.out.println("usario: "+user);
    	
    	}catch(Exception e){
    		e.printStackTrace();
    	}
		
		response.setContentType("text/html;charset=UTF-8");
		if(result=="success") {
		RequestDispatcher despachador = getServletContext().getRequestDispatcher("/jsp/dashboard.jsp");
        despachador.include(request, response);
		}
		else {
		RequestDispatcher despachador = getServletContext().getRequestDispatcher("/jsp/dashboard.jsp");
        despachador.include(request, response);
		}

	}
}
