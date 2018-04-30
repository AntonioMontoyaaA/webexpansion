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

import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.dao.LoginDAO;
import com.tiendas.neto.vo.UsuarioLoginVO;
import com.tiendas.neto.vo.UsuarioVO;

public class Login  extends HttpServlet {
	Expansionlog elog=new Expansionlog();

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
    	String permisos;
    	LoginDAO comprueba= new LoginDAO();
    	
    	String result="";
    	user=request.getParameter("user");
    	pass=request.getParameter("pass"); 
    	
    	try{
    	usuario=comprueba.comprueba_login(user,pass);
    	codigo=usuario.getCodigo();
    	
			if (codigo == 200) {
				try {
					HttpSession sesion = request.getSession();
					sesion.setAttribute("usr", usuario);
				} catch (Exception e) {
					e.printStackTrace();
				}
				response.setContentType("text/html;charset=UTF-8");
				RequestDispatcher despachador = getServletContext().getRequestDispatcher("/jsp/dashboard.jsp");
				despachador.include(request, response);
				System.out.println("login");
			} else {
				RequestDispatcher despachador = getServletContext().getRequestDispatcher("/jsp/dashboard.jsp");
				despachador.include(request, response);
				System.out.println("error");
			}
    	}catch(Exception e){
    	String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
    	String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
    	
    	elog.error(clase, metodo, e+"", user, pass);
		RequestDispatcher despachador = getServletContext().getRequestDispatcher("/jsp/dashboard.jsp");
		despachador.include(request, response);
		System.out.println("fatal error");

		}
	}
}
