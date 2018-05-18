package com.tiendas.neto.filtros;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.tiendas.neto.action.ExpansionAction;

public class Logout extends ExpansionAction {
	private static final long serialVersionUID = 1L;
	
	public Logout() {
	        super();
	    }
	
	@Override
	public String execute() throws Exception{
		 HttpServletRequest request = ServletActionContext.getRequest();  
		 
		 HttpSession session = request.getSession();
	        if(session.getAttribute("usr") != null){
	            session.removeAttribute("usuario");
	            session.removeAttribute("usr");
	            session.invalidate();
	        }
		return "SUCCESS";
	 }
}
