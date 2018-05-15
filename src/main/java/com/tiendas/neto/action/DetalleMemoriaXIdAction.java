package com.tiendas.neto.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.CompetenciaVo;
import com.tiendas.neto.vo.ConstruccionVo;
import com.tiendas.neto.vo.ConteoVo;
import com.tiendas.neto.vo.DatosPropietarioVo;
import com.tiendas.neto.vo.DatosSitioVo;
import com.tiendas.neto.vo.DetalleMemoriaVo;
import com.tiendas.neto.vo.FactorVo;
import com.tiendas.neto.vo.FlujoPeatonalVo;
import com.tiendas.neto.vo.FotoVo;
import com.tiendas.neto.vo.GeneradorVo;
import com.tiendas.neto.vo.GeneralidadesSitioVo;
import com.tiendas.neto.vo.RespuestaVo;
import com.tiendas.neto.vo.Subfactor;
import com.tiendas.neto.vo.SuperficieVo;
import com.tiendas.neto.vo.UsuarioLoginVO;
import com.tiendas.neto.vo.ZonificacionVo;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class DetalleMemoriaXIdAction extends ActionSupport implements SessionAware, ParameterNameAware {
	protected Map<String, Object> session ;
	private static final Logger logger = Logger.getLogger(ExpansionAction.class);
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();

	@Override
	public String execute() throws Exception {
		String respuesta="";
		UsuarioLoginVO usuario = null;
		String numeroEmpleado = null;
		String mdId = ServletActionContext.getRequest().getParameter("mdId");
		HttpSession usuarioSesion = ServletActionContext.getRequest().getSession();
		usuario = (UsuarioLoginVO) usuarioSesion.getAttribute("usr");
		
		try {
			
			
			if(usuario != null) {
				numeroEmpleado = String.valueOf(usuario.getPerfil().getNumeroEmpleado());
			} else {
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(501);
				respuestaVo.setMensaje("Error en la sesión");
				sendJSONObjectToResponse(respuestaVo);
				
				return null;
			}
			
			final OkHttpClient client = new OkHttpClient();
			FormBody.Builder formBuilder = new FormBody.Builder()
			 .add("usuarioId", numeroEmpleado)
	         .add("mdId", "180511182328");
			
			 RequestBody formBody = formBuilder.build();
			 Request request = new Request.Builder()
					 .url(sp.getPropiedad("detalleMemoriaXmdId"))
	                 .post(formBody)
	                 .build();
			
			 Response response = client.newCall(request).execute();
			 respuesta = response.body().string();
			 HttpServletResponse response2 = ServletActionContext.getResponse();
				response2.setContentType("application/json");
				response2.setCharacterEncoding("UTF-8");
				response2.getWriter().write(respuesta);
			 }
			 catch (Exception e) {
				String clase  ="clase: "+ new String (Thread.currentThread().getStackTrace()[1].getClassName());	
				String metodo ="metodo: "+ new String (Thread.currentThread().getStackTrace()[1].getMethodName());
				elog.error(clase,metodo,e + "", "ID empleado: " + usuario.getPerfil().getNumeroEmpleado(), "MD ID: " + mdId);
				
				RespuestaVo respuestaVo = new RespuestaVo();
				respuestaVo.setCodigo(404);
				respuestaVo.setMensaje("Error al conectarse al servidor");
				sendJSONObjectToResponse(respuestaVo);
			 }
		
		/*
		DetalleMemoriaVo memoria = new DetalleMemoriaVo();
		memoria.setMdId(Long.parseLong(mdId));
		memoria.setNombreMd("MD OAXACA CENTRO TEST");
		memoria.setCreador("Juan de la Cruz");
		memoria.setFechaCreacion("10/03/2018");
		memoria.setCategoria("A");
		memoria.setPuntuacion(27);
		memoria.setLatitud(19.250649);
		memoria.setLongitud(-99.088101);
		
		DatosSitioVo datosSitio = new DatosSitioVo();
		datosSitio.setCalle("Avenida independencia #35");
		datosSitio.setColonia("Cuchitán");
		datosSitio.setMunicipio("Oaxaca");
		datosSitio.setCiudad("Oaxaca capital");
		datosSitio.setEstado("Oaxaca");
		datosSitio.setCodigoPostal(16420);
		memoria.setDatosSitio(datosSitio);
		
		DatosPropietarioVo datosPropietario = new DatosPropietarioVo();
		datosPropietario.setPropietarioId(835077);
		datosPropietario.setNombrePropietario("Juan Carlos Dominguez Ortega");
		datosPropietario.setTelefono("5532123456");
		datosPropietario.setEmail("juan.carlos@gmail.com");
		datosPropietario.setRentaANeto(true);
		memoria.setDatosPropietario(datosPropietario);
		
		SuperficieVo superficie = new SuperficieVo();
		superficie.setFrente(15);
		superficie.setProfundidad(20);
		superficie.setTotal(300);
		FotoVo foto1 = new FotoVo();
		foto1.setFecha("10/Marzo/2018");
		foto1.setNombreFoto("http://res.cloudinary.com/voksedesa/image/upload/v1525291493/imagenesSitios/12345/android.jpg");
		foto1.setHora("10:20am");
		superficie.setFotoLateral1(foto1);
		FotoVo foto2 = new FotoVo();
		foto2.setFecha("10/Marzo/2018");
		foto2.setNombreFoto("http://res.cloudinary.com/voksedesa/image/upload/v1525291493/imagenesSitios/12345/android.jpg");
		foto2.setHora("10:22am");
		superficie.setFotoLateral2(foto2);
		FotoVo foto3 = new FotoVo();
		foto3.setFecha("10/Marzo/2018");
		foto3.setNombreFoto("http://res.cloudinary.com/voksedesa/image/upload/v1525291493/imagenesSitios/12345/android.jpg");
		foto3.setHora("10:24am");
		superficie.setVistaFrontal(foto3);
		superficie.setPuntos("3/3");
		superficie.setTip("Recuerda tomar las fotografías en orden");
		memoria.setSuperficie(superficie);
		
		ZonificacionVo zonificacion = new ZonificacionVo();
		
		CompetenciaVo listaCompetencia[] = new CompetenciaVo[2];
		CompetenciaVo competencia = new CompetenciaVo();
		competencia.setCompetenciaId(1);
		competencia.setNombreCompetencia("3B");
		competencia.setLatitud(19.234134);
		competencia.setLongitud(-99.343232);
		listaCompetencia[0] = competencia;
		CompetenciaVo competencia2 = new CompetenciaVo();
		competencia2.setCompetenciaId(2);
		competencia2.setNombreCompetencia("Oxxo");
		competencia2.setLatitud(19.298133);
		competencia2.setLongitud(-99.353232);
		listaCompetencia[1] = competencia2;
		
		GeneradorVo listaGeneradores[] = new GeneradorVo[2];
		GeneradorVo generador = new GeneradorVo();
		generador.setGeneradorId(5);
		generador.setNombreGenerador("Iglesia");
		generador.setLatitud(19.434134);
		generador.setLongitud(-99.393232);
		listaGeneradores[0] = generador;
		GeneradorVo generador1 = new GeneradorVo();
		generador1.setGeneradorId(6);
		generador1.setNombreGenerador("Mercado");
		generador1.setLatitud(19.234134);
		generador1.setLongitud(-99.343232);
		listaGeneradores[1] = generador1;
		
		zonificacion.setListaCompetencias(listaCompetencia);
		zonificacion.setListaGeneradores(listaGeneradores);
		zonificacion.setPuntos("6/6");
		zonificacion.setTip("Cuenta todas las competencias");
		memoria.setZonificacion(zonificacion);
		
		ConstruccionVo construccion = new ConstruccionVo();
		FactorVo factor = new FactorVo();
		factor.setFactorId(1);
		factor.setFactor("Local");
		Subfactor listaSubfactores[] = new Subfactor[3];
		Subfactor subfactor = new Subfactor();
		subfactor.setSubfactorId(1);
		subfactor.setSubfactor("Con bodega");
		listaSubfactores[0] = subfactor;
		Subfactor subfactor1 = new Subfactor();
		subfactor1.setSubfactorId(2);
		subfactor1.setSubfactor("Acceso para CD");
		listaSubfactores[1] = subfactor1;
		Subfactor subfactor2 = new Subfactor();
		subfactor2.setSubfactorId(3);
		subfactor2.setSubfactor("Techo sin goteras");
		listaSubfactores[2] = subfactor2;
		factor.setListaSubfactores(listaSubfactores);
		FactorVo factor2 = new FactorVo();
		factor2.setFactorId(2);
		factor2.setFactor("Local con instalación");
		Subfactor listaSubfactores2[] = new Subfactor[1];
		Subfactor subfactor5 = new Subfactor();
		subfactor5.setSubfactorId(5);
		subfactor5.setSubfactor("Con luz");
		listaSubfactores2[0] = subfactor5;
		factor2.setListaSubfactores(listaSubfactores2);
		FactorVo[] listaFactores = new FactorVo[2];
		listaFactores[0] = factor;
		listaFactores[1] = factor2;
		construccion.setListaFactores(listaFactores);
		construccion.setCondicionesGeneralesId(1);
		construccion.setCondicionesGenerales("Buena");
		construccion.setPuntos("3/3");
		construccion.setTip("Realiza los conteos en los horarios indicados");
		memoria.setConstruccion(construccion);
		
		GeneralidadesSitioVo gSitio = new GeneralidadesSitioVo();
		gSitio.setRenta(32000);
		gSitio.setDisponibilidadId(1);
		gSitio.setDisponibilidad("INMEDIATA");
		gSitio.setAmortizacion(20000);
		gSitio.setTiempoAmortizacion(3);
		gSitio.setPeriodoGracia("1 MES");
		gSitio.setPuntos("3/3");
		gSitio.setTip("Realiza los conteos en los horarios indicados");
		memoria.setGeneralidadesSitio(gSitio);
		
		FlujoPeatonalVo flujo = new FlujoPeatonalVo();
		flujo.setPromedio(110);
		ConteoVo[] listaConteos = new ConteoVo[9];
		ConteoVo conteo1 = new ConteoVo();
		conteo1.setConteoId(1);
		conteo1.setFecha("28/02/2018");
		conteo1.setHorario("9-10 AM");
		conteo1.setTotalPersonas(150);
		conteo1.setHorarioId(1);
		listaConteos[0] = conteo1;
		ConteoVo conteo2 = new ConteoVo();
		conteo2.setConteoId(2);
		conteo2.setFecha("28/02/2018");
		conteo2.setHorario("9-10 AM");
		conteo2.setHorarioId(1);
		conteo2.setTotalPersonas(200);
		listaConteos[1] = conteo2;
		ConteoVo conteo3 = new ConteoVo();
		conteo3.setConteoId(3);
		conteo3.setFecha("28/02/2018");
		conteo3.setHorario("9-10 AM");
		conteo3.setHorarioId(1);
		conteo3.setTotalPersonas(120);
		listaConteos[2] = conteo3;
		ConteoVo conteo4 = new ConteoVo();
		conteo4.setConteoId(4);
		conteo4.setFecha("01/03/2018");
		conteo4.setHorario("1-2 PM");
		conteo4.setHorarioId(2);
		conteo4.setTotalPersonas(90);
		listaConteos[3] = conteo4;
		ConteoVo conteo5 = new ConteoVo();
		conteo5.setConteoId(5);
		conteo5.setFecha("01/03/2018");
		conteo5.setHorario("1-2 PM");
		conteo5.setHorarioId(2);
		conteo5.setTotalPersonas(100);
		listaConteos[4] = conteo5;
		ConteoVo conteo6 = new ConteoVo();
		conteo6.setConteoId(6);
		conteo6.setFecha("01/03/2018");
		conteo6.setHorario("1-2 PM");
		conteo6.setHorarioId(2);
		conteo6.setTotalPersonas(50);
		listaConteos[5] = conteo6;
		ConteoVo conteo7 = new ConteoVo();
		conteo7.setConteoId(7);
		conteo7.setFecha("02/03/2018");
		conteo7.setHorario("5-6 PM");
		conteo7.setHorarioId(3);
		conteo7.setTotalPersonas(20);
		listaConteos[6] = conteo7;
		ConteoVo conteo8 = new ConteoVo();
		conteo8.setConteoId(8);
		conteo8.setFecha("02/03/2018");
		conteo8.setHorario("5-6 PM");
		conteo8.setHorarioId(3);
		conteo8.setTotalPersonas(10);
		listaConteos[7] = conteo8;
		ConteoVo conteo9 = new ConteoVo();
		conteo9.setConteoId(9);
		conteo9.setFecha("02/02/2018");
		conteo9.setHorario("5-6 PM");
		conteo9.setHorarioId(3);
		conteo9.setTotalPersonas(1);
		listaConteos[8] = conteo9;
		flujo.setListaConteos(listaConteos);
		flujo.setPuntos("3/3");
		flujo.setTip("Realiza los conteos en los horarios indicados");
		memoria.setFlujoPeatonal(flujo);
		
		sendJSONObjectToResponse(memoria);*/
		
		return null;
	}
	
	protected void sendJSONObjectToResponse(Object objToSend) {
		Gson gson = new Gson();
		String jsonResult = gson.toJson(objToSend);	      
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		try {
			response.getWriter().write(jsonResult );
		} catch (IOException e) {
		}
	}

	@Override
	public void setSession(Map<String, Object> session) {					 
		this.session = session ;	
	}

	@Override
	public boolean acceptableParameterName(String parameterName) {	     
		boolean allowedParameterName = true ;	     
		if ( parameterName.contains("session")  || parameterName.contains("request") ) {	     
			allowedParameterName = false ;	         
		} 	     
		return allowedParameterName;
	}
}
