function descargaExcel(data){
//para pag1 PDF
	$('#pdfmdId').val($("#mdId").val());
	$('#pdfnombreMd').val(data.generales.nombreMd);
	$('#pdfcategoriaMd').val(data.generales.categoria);
	$('#pdfpuntos').val(data.generales.totalPuntos);
	$('#pdflat').val(data.generales.latitud);
	$('#pdflon').val(data.generales.longitud);
	
	var calle= data.datosSitio.calle+", ";
	var colonia= "Col. "+data.datosSitio.colonia+", ";
	var municipio= data.datosSitio.municipio+", ";
	var ciudad = data.datosSitio.ciudad+", ";
	var estado =data.datosSitio.estado +", ";
	var codigoPostal="C.P. "+data.datosSitio.codigoPostal;
	$('#pdfdireccion').val(calle+colonia+ciudad+estado+codigoPostal);
	
	$('#pdfnombrePropietario').val(data.datosPropietario.nombre);
	$('#pdftelefonoPropietario').val(data.datosPropietario.telefono);
	$('#pdfemailPropietario').val(data.datosPropietario.email);
	
//para pag2 PDF
	$('#pdffrenteMd').val(formatear(data.superficie.frente, true));
	$('#pdfprofundidadMd').val(formatear(data.superficie.profundidad, true));
	$('#pdftamanioTotalMd').val(formatear(data.superficie.total, true));
	$('#pdfvistaFrontalMd').val(data.superficie.vistaFrontal);
	$('#pdfvistaLateral1Md').val(data.superficie.lateral1);
	$('#pdfvistaLateral2Md').val(data.superficie.lateral2);
//para pag3 PDF	
	$('#pdfmarkers_comp').val(JSON.stringify(data.zonificacion.competencias));
	$('#pdfmarkers_gen').val(JSON.stringify(data.zonificacion.generadores));
//para pag4 PDF
	
	var subfactores=[];
	var subfactoresdesc=[];
	
	for(var s=0;s<data.construccion.factores.EXPANSION.length;s++){
		var nivelId=data.construccion.factores.EXPANSION[s].nivelId;
		
		if(data.construccion.factores.EXPANSION[s].subfactores!=undefined){
			for(var i=0;i<data.construccion.factores.EXPANSION[s].subfactores.length;i++){
				subfactores[i]=data.construccion.factores.EXPANSION[s].subfactores[i].subFactorId;
				subfactoresdesc[i]=data.construccion.factores.EXPANSION[s].subfactores[i].nombre;
			}
		}
		
		if(nivelId=="3"||nivelId=="4"||nivelId=="5"){
			$('#pdffactor').val(data.construccion.factores.EXPANSION[s].nombreFactor);
		}
		if(nivelId=="1"||nivelId=="2"){
			$('#pdftipo').val(data.construccion.factores.EXPANSION[s].nombreFactor);
		}
		
	}
	$('#pdfsubfactores').val(subfactores);
	$('#pdfsubfactoresdesc').val(subfactoresdesc);
	
	
	//generalidades
	$('#pdfrenta').val(data.generalidades.renta);
	$('#pdfamortizacion').val(data.generalidades.porcentajeAmortizacion);
	$('#pdfdisponibilidad').val(data.generalidades.disponibilidad);
	$('#pdftiempo_amortizacion').val(data.generalidades.periodoAmortizacion);
	$('#pdfgracia').val(data.generalidades.periodoGracia);
	
	//conteos peatonales
	$('#pdfconteos').val(JSON.stringify(data.flujoPeatonal.EXPANSION.conteos));
	
	
	$('#submitBotonDescargaPdf').click();
}