package com.tiendas.neto.action;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;

import java.util.Map;

import java.lang.reflect.Type;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tiendas.neto.dao.Expansionlog;
import com.tiendas.neto.singleton.SingletonProperties;
import com.tiendas.neto.vo.Conteos;
import com.tiendas.neto.vo.MarcadoresVO;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;



public class DescargaPdfAction extends ExpansionAction{
	private static final long serialVersionUID = 1L;
	SingletonProperties sp=SingletonProperties.getInstancia();
	Expansionlog elog=new Expansionlog();

	private String pdfmdId;
	private String pdfnombreMd;
	private String pdfcategoriaMd;
	private String pdfpuntos;
	private String pdfdireccion;
	private String pdfnombrePropietario;
	private String pdftelefonoPropietario;
	private String pdfemailPropietario;
	private String pdflat;
	private String pdflon;
	private String pdfmarkers_comp;
	private String pdfmarkers_gen;
	
	private String pdffrenteMd;
	private String pdfprofundidadMd;
	private String pdftamanioTotalMd;
	private String pdfvistaFrontalMd;
	private String pdfvistaLateral1Md;
	private String pdfvistaLateral2Md;
	
	private String pdffactor;
	private String pdfsubfactores;
	private String pdfsubfactoresdesc;
	private String pdfcomentarios;
	private String pdftipo;
	
	private String pdfrenta;
	private String pdfamortizacion;
	private String pdfdisponibilidad;
	private String pdftiempo_amortizacion;
	private String pdfgracia;

	public String getPdfmarkers_comp() {
		return pdfmarkers_comp;
	}
	public void setPdfmarkers_comp(String pdfmarkers_comp) {
		this.pdfmarkers_comp = pdfmarkers_comp;
	}
	public String getPdfmarkers_gen() {
		return pdfmarkers_gen;
	}
	public void setPdfmarkers_gen(String pdfmarkers_gen) {
		this.pdfmarkers_gen = pdfmarkers_gen;
	}

	private String pdfconteos;

	public String getPdflat() {
		return pdflat;
	}
	public void setPdflat(String pdflat) {
		this.pdflat = pdflat;
	}
	public String getPdflon() {
		return pdflon;
	}
	public void setPdflon(String pdflon) {
		this.pdflon = pdflon;
	}
	public String getPdfconteos() {
		return pdfconteos;
	}
	public void setPdfconteos(String pdfconteos) {
		this.pdfconteos = pdfconteos;
	}
	public String getPdfrenta() {
		return pdfrenta;
	}
	public void setPdfrenta(String pdfrenta) {
		this.pdfrenta = pdfrenta;
	}
	public String getPdfamortizacion() {
		return pdfamortizacion;
	}
	public void setPdfamortizacion(String pdfamortizacion) {
		this.pdfamortizacion = pdfamortizacion;
	}
	public String getPdfdisponibilidad() {
		return pdfdisponibilidad;
	}
	public void setPdfdisponibilidad(String pdfdisponibilidad) {
		this.pdfdisponibilidad = pdfdisponibilidad;
	}
	public String getPdftiempo_amortizacion() {
		return pdftiempo_amortizacion;
	}
	public void setPdftiempo_amortizacion(String pdftiempo_amortizacion) {
		this.pdftiempo_amortizacion = pdftiempo_amortizacion;
	}
	public String getPdfgracia() {
		return pdfgracia;
	}
	public void setPdfgracia(String pdfgracia) {
		this.pdfgracia = pdfgracia;
	}
	public String getPdftipo() {
		return pdftipo;
	}
	public void setPdftipo(String pdftipo) {
		this.pdftipo = pdftipo;
	}
	public String getPdfsubfactoresdesc() {
		return pdfsubfactoresdesc;
	}
	public void setPdfsubfactoresdesc(String pdfsubfactoresdesc) {
		this.pdfsubfactoresdesc = pdfsubfactoresdesc;
	}
	public String getPdffactor() {
		return pdffactor;
	}
	public void setPdffactor(String pdffactor) {
		this.pdffactor = pdffactor;
	}
	public String getPdfsubfactores() {
		return pdfsubfactores;
	}
	public void setPdfsubfactores(String pdfsubfactores) {
		this.pdfsubfactores = pdfsubfactores;
	}
	public String getPdfcomentarios() {
		return pdfcomentarios;
	}
	public void setPdfcomentarios(String pdfcomentarios) {
		this.pdfcomentarios = pdfcomentarios;
	}
	public String getPdffrenteMd() {
		return pdffrenteMd;
	}
	public void setPdffrenteMd(String pdffrenteMd) {
		this.pdffrenteMd = pdffrenteMd;
	}
	public String getPdfprofundidadMd() {
		return pdfprofundidadMd;
	}
	public void setPdfprofundidadMd(String pdfprofundidadMd) {
		this.pdfprofundidadMd = pdfprofundidadMd;
	}
	public String getPdftamanioTotalMd() {
		return pdftamanioTotalMd;
	}
	public void setPdftamanioTotalMd(String pdftamanioTotalMd) {
		this.pdftamanioTotalMd = pdftamanioTotalMd;
	}
	public String getPdfvistaFrontalMd() {
		return pdfvistaFrontalMd;
	}
	public void setPdfvistaFrontalMd(String pdfvistaFrontalMd) {
		this.pdfvistaFrontalMd = pdfvistaFrontalMd;
	}
	public String getPdfvistaLateral1Md() {
		return pdfvistaLateral1Md;
	}
	public void setPdfvistaLateral1Md(String pdfvistaLateral1Md) {
		this.pdfvistaLateral1Md = pdfvistaLateral1Md;
	}
	public String getPdfvistaLateral2Md() {
		return pdfvistaLateral2Md;
	}
	public void setPdfvistaLateral2Md(String pdfvistaLateral2Md) {
		this.pdfvistaLateral2Md = pdfvistaLateral2Md;
	}
	public String getPdfmdId() {
		return pdfmdId;
	}
	public void setPdfmdId(String pdfmdId) {
		this.pdfmdId = pdfmdId;
	}
	public String getPdfnombreMd() {
		return pdfnombreMd;
	}
	public void setPdfnombreMd(String pdfnombreMd) {
		this.pdfnombreMd = pdfnombreMd;
	}
	public String getPdfcategoriaMd() {
		return pdfcategoriaMd;
	}
	public void setPdfcategoriaMd(String pdfcategoriaMd) {
		this.pdfcategoriaMd = pdfcategoriaMd;
	}
	public String getPdfpuntos() {
		return pdfpuntos;
	}
	public void setPdfpuntos(String pdfpuntos) {
		this.pdfpuntos = pdfpuntos;
	}
	public String getPdfdireccion() {
		return pdfdireccion;
	}
	public void setPdfdireccion(String pdfdireccion) {
		this.pdfdireccion = pdfdireccion;
	}
	public String getPdfnombrePropietario() {
		return pdfnombrePropietario;
	}
	public void setPdfnombrePropietario(String pdfnombrePropietario) {
		this.pdfnombrePropietario = pdfnombrePropietario;
	}
	public String getPdftelefonoPropietario() {
		return pdftelefonoPropietario;
	}
	public void setPdftelefonoPropietario(String pdftelefonoPropietario) {
		this.pdftelefonoPropietario = pdftelefonoPropietario;
	}
	public String getPdfemailPropietario() {
		return pdfemailPropietario;
	}
	public void setPdfemailPropietario(String pdfemailPropietario) {
		this.pdfemailPropietario = pdfemailPropietario;
	}
	
	public String exportPdf() throws Exception{
		String url=System.getProperty("jboss.server.config.dir")+"/expansion/reportes/";
		String urlimagenes=System.getProperty("jboss.server.config.dir")+"/expansion/reportes/imagenes/";
		//String url=System.getProperty("jboss.server.config.dir")+File.separator+"expansion"+File.separator+"reportes"+File.separator;
		//String urlimagenes=System.getProperty("jboss.server.config.dir")+File.separator+"expansion"+File.separator+"reportes"+File.separator+"imagenes"+File.separator;
		
		try {
		Map parameters = new HashMap();
		Map parameters2 = new HashMap();
		
		//pag1
		parameters.put("url", urlimagenes);
		parameters.put("url_subreport", url);
	//	parameters.put("urlweb", urlweb);
		parameters.put("mdId", pdfmdId);
		parameters.put("nombreMd", pdfnombreMd);
		parameters.put("categoriaMd", pdfcategoriaMd);
		parameters.put("puntos", pdfpuntos);
		parameters.put("direccion", pdfdireccion);
		parameters.put("nombrePropietario", pdfnombrePropietario);
		parameters.put("telefonoPropietario", pdftelefonoPropietario);
		parameters.put("emailPropietario", pdfemailPropietario);
		parameters.put("imagen_usuario", urlimagenes+"imagen_usuario.png");
		parameters.put("lat", Float.parseFloat(pdflat));
		parameters.put("lon",Float.parseFloat(pdflon));
		
		parameters.put("frenteMd", pdffrenteMd);
		parameters.put("profundidadMd", pdfprofundidadMd);
		parameters.put("tamanioTotalMd", pdftamanioTotalMd);
		parameters.put("vistaFrontalMd", pdfvistaFrontalMd);
		parameters.put("vistaLateral1Md", pdfvistaLateral1Md);
		parameters.put("vistaLateral2Md", pdfvistaLateral2Md);
		
		parameters.put("condicion", urlimagenes+pdffactor+".png");
		parameters.put("condiciondesc", pdffactor);
		parameters.put("tipo", pdftipo);
		parameters.put("comentarios", pdfcomentarios);
		
		parameters.put("renta", pdfrenta);
		parameters.put("amortizacion", pdfamortizacion);
		parameters.put("disponibilidad", pdfdisponibilidad);
		parameters.put("tiempo_amortizacion", pdftiempo_amortizacion);
		parameters.put("gracia", pdfgracia);
		
		Gson gson = new Gson();
	// ----------------------------------------- PARA LA LISTA DE MARCADORES GENERADORES Y COMPETENCIA
		Type listTypeMarkers = new TypeToken<List<MarcadoresVO>>(){}.getType();
		List<MarcadoresVO> markers = (List<MarcadoresVO>) gson.fromJson(pdfmarkers_comp, listTypeMarkers);
		List<MarcadoresVO> markersg = (List<MarcadoresVO>) gson.fromJson(pdfmarkers_gen, listTypeMarkers);
		
		MarcadoresVO[] listaMarkers = new MarcadoresVO[markers.size()+markersg.size()];
		int contador=0;
		
		for(int x=0; x<markers.size();x++) {	
			listaMarkers[contador]=(new MarcadoresVO(markers.get(x).getLatitud(), markers.get(x).getCompetenciaId(),markers.get(x).getLongitud(),markers.get(x).getNivelId(),markers.get(x).getNombre(), markers.get(x).getGeneradorId()));
			contador++;
		}
		for(int y=0; y<markersg.size();y++) {	
			listaMarkers[contador]=(new MarcadoresVO(markersg.get(y).getLatitud(), markersg.get(y).getCompetenciaId(),markersg.get(y).getLongitud(),markersg.get(y).getNivelId(),markersg.get(y).getNombre(), markersg.get(y).getGeneradorId()));
			contador++;
		}		
		parameters.put("listacompetencias", listaMarkers);
		
		
	// ----------------------------------------- PARA LA LISTA DE CONTEO PEATONAL
		Type listType = new TypeToken<List<Conteos>>(){}.getType();
		List<Conteos> listas = (List<Conteos>) gson.fromJson(pdfconteos, listType);
		
		Conteos[] listaObjetos = new Conteos[listas.size()];
		for(int i=0; i<listas.size();i++) {	
			listaObjetos[i]=(new Conteos(listas.get(i).getTotal(), listas.get(i).getFecha(),listas.get(i).getDetalleId(),listas.get(i).getHoraFinal(),listas.get(i).getHoraInicio()));
		}
		parameters.put("conteos", listaObjetos);
		
		
		// ------------------------ imagen de estrellas segun categoria
		if(pdfcategoriaMd.equals("A")) {
			parameters.put("estrellas", urlimagenes+"estrellasA.png");
		}
		if(pdfcategoriaMd.equals("B")) {
			parameters.put("estrellas", urlimagenes+"estrellasB.png");
		}
		if(pdfcategoriaMd.equals("C")) {
			parameters.put("estrellas", urlimagenes+"estrellasC.png");
		}
		// ------------------------------------------------------------
		
		
		
		// -------------------------- calculo de imagenes de subfactores
	
		String[] subfactores=pdfsubfactores.split(",");
		String[] subfactoresdesc=pdfsubfactoresdesc.split(",");
		
		int imagen=1;
		if(pdftipo.equals("SOLO TERRENO")) {
			parameters.put("imagen"+imagen, urlimagenes+"TERRENO.png");
			imagen++;
		}
		for(int i=0;i<subfactores.length;i++) {
			if(subfactores[i]!="") {
			parameters.put("imagen"+imagen, urlimagenes+"subfactor"+subfactores[i]+".png");
			parameters.put("imagendesc"+imagen, subfactoresdesc[i]);
			imagen++;
			}
		}
		//----------------------------
		
		JasperReport report = null;
		
			// JasperCompileManager.compileReportToFile(url+"pag5.jrxml", url+"pag5.jasper");
			 JasperCompileManager.compileReportToFile(url+"pag4.jrxml", url+"pag4.jasper");
			 JasperCompileManager.compileReportToFile(url+"pag3.jrxml", url+"pag3.jasper");
			 JasperCompileManager.compileReportToFile(url+"pag2.jrxml", url+"pag2.jasper");
			 JasperCompileManager.compileReportToFile(url+"pag1.jrxml", url+"pag1.jasper");
			
			JasperPrint print = JasperFillManager.fillReport(url+"pag1.jasper", parameters);
			
			
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("application/pdf");
			response.setHeader("Content-Disposition", "attachment; filename=" + pdfnombreMd+" reporte.pdf");
			OutputStream outStream = response.getOutputStream();
			JasperExportManager.exportReportToPdfStream(print, outStream);
			outStream.flush();
				
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
			
	}
	
}
