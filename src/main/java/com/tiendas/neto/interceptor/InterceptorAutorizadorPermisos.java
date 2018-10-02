package com.tiendas.neto.interceptor;

import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.StrutsStatics;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.tiendas.neto.action.ExpansionAction;
import com.tiendas.neto.vo.UsuarioLoginVO;


public class InterceptorAutorizadorPermisos  extends ExpansionAction implements Interceptor{

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

	    try {
	    	HashMap<?, ?> MENUVOKSE =  (HashMap<?, ?>) session.getAttribute("permisos");
	    	UsuarioLoginVO user= (UsuarioLoginVO) session.getAttribute("usr");


	        if (session == null || user== null) {
	        	if(session.getAttribute("usr") != null){
     	            session.removeAttribute("usuario");
     	            session.removeAttribute("usr");
     	            session.removeAttribute("permisos");
     	            session.invalidate();
     	        }
                PrintWriter out;
                out = response.getWriter();

                response.setContentType("text/html");  
                out.println("<html>");
                out.println("<head>");
                out.println("<script type=\"text/javascript\">");
                out.println("function evaluarSession() { ");
                out.println("window.location.href = \"/Expansion/\";");
                out.println("alert('LA SESIÓN HA CADUCADO.');");
                out.println("window.top.uploadComplete('1');");
                out.println("}");
                out.println("</script>");
                out.println("</head>");
                out.println("<body onload=\"evaluarSession();\">");
                out.println("</body>");
                out.println("</html>");
                
       		return NONE;
	        }

	        if(actionName != null || actionName.trim() != "") {
	        	menuOptions.permisosMenu.get(actionName);
	        	
	        	if(MENUVOKSE.get(menuOptions.permisosMenu.get(actionName)) == null) {
	                 PrintWriter out;
	                 out = response.getWriter();

	                 response.setContentType("text/html");  
	                 out.println("<html>");
	                 out.println("<head>");
	                 out.println("<script type=\"text/javascript\">");
	                 out.println("function evaluarPermisos() { ");
	                 out.println("history.back();");
	                 out.println("alert('PERMISO DENEGADO.');");
	                 out.println("window.top.uploadComplete('1');");
	                 out.println("}");
	                 out.println("</script>");
	                 out.println("</head>");
	                 out.println("<body onload=\"evaluarPermisos();\">");
	                 out.println("</body>");
	                 out.println("</html>");
	        		
	        		return NONE;
	        	}
	        }
	                 
	    } catch (Exception e) {
	    	System.out.println(e.getMessage());
	    }

	    String result = actionInvocation.invoke();
	    return result;
	}

}