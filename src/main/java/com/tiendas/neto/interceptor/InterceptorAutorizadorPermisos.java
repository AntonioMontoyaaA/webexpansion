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
        String contextPath = request.getContextPath();
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
                out.println(headerhtml(contextPath));             
                out.println("function evaluaSession() {  errorSesionCaduca(); ");
                out.println("window.top.uploadComplete('1');");
                out.println("}");
                out.println("</script>");
                out.println("</head>");
                out.println(alertMensaje() );
                
                out.println("<body onload=\"evaluaSession();\">");
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
	                
	                out.println(headerhtml(contextPath));
	                out.println("function evaluarPermisos() {  errorPermisoDenegado(); ");
	                 out.println("window.top.uploadComplete('1');");
	                 out.println("}");
	                 out.println("</script>");
	                 out.println("</head>");
	                 out.println(alertMensaje() );
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
	
	public String headerhtml(String contextPath) {
		String mensaje ="<html>"+
		                "<head>"+
		                "<link rel=\"stylesheet\" href=\""+contextPath+"/bootstrap/css/bootstrap.min.css\" /> "+
		                "<link rel=\"stylesheet\" href=\""+contextPath+"/bootstrap/css/bootstrap.min.css\" /> "+
		                "<link rel=\"stylesheet\" href=\""+contextPath+"/css/generic.css\" /> "+
		                "<link rel=\"stylesheet\" href=\""+contextPath+"/css/jquery-ui.css\" />"+
		                "<link rel=\"stylesheet\" href=\""+contextPath+"/css/mapa.css\" />"+
		                "<link rel=\"stylesheet\" href=\""+contextPath+"/css/localizador.css\" />"+
		                "<!-- Bootstrap core JavaScript -->"+
		                "<script	src=\""+contextPath+"/js/jquery/jquery.min.js\"></script>"+	
		                "<script	src=\""+contextPath+"/js/jquery/jquery-ui.js\"></script>"+
		                "<script	src=\""+contextPath+"/js/jquery/popper.js\"></script>	"+
		                "<script	src=\""+contextPath+"/bootstrap/js/bootstrap.min.js\" type=\"text/javascript\"></script>"+
		                "<script	src=\""+contextPath+"/js/utiles/utiles.js\"></script>"+
		               "<script type=\"text/javascript\">";
		return mensaje;
	}
	
	public String alertMensaje() {
		String mensaje =  "<div class=\"modal\" id=\"mensajes_modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\" data-keyboard=\"false\">"+
		 " <div class=\"modal-dialog\" role=\"document\">"+
		
		    "<div class=\"modal-content\">"+
		    "  <div class=\"modal-header blanco\" id=\"mensajeHeader\" style=\"padding-top:7px; padding-bottom:7px;\">"+
		     "   <div id=\"tituloMensaje\">---</div>"+
		      "  <button type=\"button\" class=\"close blanco\" data-dismiss=\"modal\" aria-label=\"Close\">"+
		       "   <span aria-hidden=\"true\">&times;</span>"+
		       " </button>"+
		      "</div>"+
		      "<div class=\"modal-body\">"+
		      " <div id=\"descripcionMensaje\">---</div>"+
		      "</div>"+
		      "<div class=\"modal-footer\" style=\"justify-content: center; border:0;\">"+
		       " <button type=\"button\" class=\"btn fazul blanco\" id=\"botonMensajeSi\"  style=\"width: 70px; height: 30px; padding-top: 2px; margin-right: 20px; cursor: pointer;\">Si</button>"+
		        "<button type=\"button\" class=\"btn fazul blanco\" id=\"botonMensajeNo\" style=\"width: 70px; height: 30px; padding-top: 2px; margin-right: 20px; cursor: pointer;\">No</button>"+
		        "<button type=\"button\" class=\"btn fazul blanco\" id=\"botonMensajeAceptar\" style=\"width: 100px; height: 30px; padding-top: 2px; cursor: pointer;\">Aceptar</button>"+
		      "</div>"+
		    "</div>"+
		  "</div>"+
		"</div> ";
		return mensaje;
	}

}