package com.tiendas.neto.filtros;

import java.util.Map;
import com.tiendas.neto.vo.UsuarioLoginVO;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class SesionInterceptor extends AbstractInterceptor {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
    public String intercept(ActionInvocation invocation) throws Exception {
            Map<String, Object> session = invocation.getInvocationContext().getSession();
            
            UsuarioLoginVO usuario = (UsuarioLoginVO) session.get("usr");

            String loginId = (String) session.get("loginId");

            if (usuario == null) 
            {
            	System.out.println("**** NO HAy sESION ****");
                    return Action.ERROR;
            } 
            else 
            {
            	System.out.println("**** HAy sESION ****");
                    return invocation.invoke();
            }
    }
}
