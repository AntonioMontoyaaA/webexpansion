package com.tiendas.neto.interceptor;

import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.tiendas.neto.vo.UsuarioLoginVO;


public class InterceptorAutorizadorPermisos implements Interceptor{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String actionName;

	public InterceptorAutorizadorPermisos() {
	}
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String intercept(ActionInvocation actionInvocation) throws Exception {
	    final ActionContext context = actionInvocation.getInvocationContext();
	    HttpServletRequest request = (HttpServletRequest) context.get(StrutsStatics.HTTP_REQUEST);
	    HttpServletResponse response = (HttpServletResponse)actionInvocation.getInvocationContext().get(StrutsStatics.HTTP_RESPONSE);
	    HttpSession session = request.getSession();
	    PermisosMenu menuOptions = new PermisosMenu();  
        actionName = ActionContext.getContext().getName();
        String anotherActionUrl = "/";

      
	    try {
	    	HashMap<?, ?> MENUVOKSE =  (HashMap<?, ?>) session.getAttribute("permisos");
	    	UsuarioLoginVO user= (UsuarioLoginVO) session.getAttribute("usr");

	        if (session == null || user== null) {
	                 ServletContext sc = (ServletContext)ServletActionContext.getServletContext();
	                 sc.getRequestDispatcher(anotherActionUrl).forward(request, response);   
	        }

	        if(actionName != null || actionName.trim() != "") {
	        	menuOptions.permisosMenu.get(actionName);
	        	
	        	if(MENUVOKSE.get(menuOptions.permisosMenu.get(actionName)) == null) {
	        		 if(session.getAttribute("usr") != null){
	     	            session.removeAttribute("usuario");
	     	            session.removeAttribute("usr");
	     	            session.invalidate();
	     	        }
	        		ServletContext sc = (ServletContext)ServletActionContext.getServletContext();
	                 sc.getRequestDispatcher(anotherActionUrl).forward(request, response); 
	        	}
	        }
	                 
	    } catch (Exception e) {
	        //Logger.getLogger(InterceptorAutorizadorPermisos.class.getName()).log(Level.INFO, "message", e);
	    	System.out.println(e.getMessage());
	    }

	    //Invoke action
	    String result = actionInvocation.invoke();
	    return result;
	}

}
