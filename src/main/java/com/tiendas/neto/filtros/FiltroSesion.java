package com.tiendas.neto.filtros;

import java.io.IOException;
import java.util.ArrayList;
import java.util.StringTokenizer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class FiltroSesion implements Filter {
	
	private ArrayList<String> urlList;
	protected FilterConfig filterConfig;
	private boolean enable = true;
	
	public void destroy() {
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		try {
			
			HttpServletRequest req = (HttpServletRequest) request;
			
			String url = req.getServletPath();
			
			System.out.println("**** url: " + url);
			
			
			/*			
			if (url.indexOf("/index.jsp") == -1 && req.getSession().getAttribute("usr") == null) {
			    request.getRequestDispatcher("/jsp/errorSesion.jsp").forward(request, response);
		    }*/
			
			if(req.getMethod().equalsIgnoreCase("POST")){
				System.out.println("**** es una petición post");
		    }
			
			
			/*if(url.indexOf("asignadas") != -1) {
				System.out.println("***** ENTRA ***");
				String paginaError = "/jsp/errorSesion.jsp";
				request.getRequestDispatcher(paginaError).forward(request, response);
			} else {
				chain.doFilter(request, response);
			}*/
			
			
			chain.doFilter(request, response);
			
			
			/*System.out.println("****** (1) *******"); 
			HttpServletRequest req = (HttpServletRequest) request;
			HttpSession session = req.getSession( false );
			System.out.println("****** (2) *******");
			
			String url = req.getServletPath();
			System.out.println("****** (3) *******");
			
			System.out.println(" **** url: " + url);
			
			if(!urlList.contains(url)) {
				System.out.println("****** (4) *******");
				if (req.getSession().getAttribute("usr") == null) {
					System.out.println("****** (5) *******");
				    request.setAttribute("errorAcceso", "Acceso denegado");
				    request.getRequestDispatcher("/jsp/error.jsp").forward(request, response);
			    }
			}
			System.out.println("****** (6) *******");*/
		    
		    chain.doFilter(request, response);	
		} catch (Exception e) {
			//Logeo.logearExcepcion(e, "ERROR al redireccionar a la Página de Error, Filtro: FiltroTodo.java");
		}	
		// pass the request along the filter chain
		//chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		/*String urls = config.getInitParameter("avoid-urls");
		StringTokenizer token = new StringTokenizer(urls, ",");

		urlList = new ArrayList<String>();

		while (token.hasMoreTokens()) {
			urlList.add(token.nextToken());
			System.out.println("*** Agrega el token: " + token);
		}*/
	}
}
