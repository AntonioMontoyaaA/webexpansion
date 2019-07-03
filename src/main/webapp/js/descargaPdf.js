function descargaExcel(data){
//para pag1 PDF
	$('#pdfmdId').val($("#mdId").val());
	$('#pdfnombreMd').val(data.generales.nombreMd);
	$('#pdfcategoriaMd').val(data.generales.categoria);
	$('#pdfpuntos').val(data.generales.totalPuntos);
	$('#pdflat').val(data.generales.latitud);
	$('#pdflon').val(data.generales.longitud);
	$('#pdfurlmapa').val('https://maps.google.com/maps?q=loc:'+data.generales.latitud+','+data.generales.longitud);
	$('#pdfurlmapa_pag1').val('http://maps.google.com/maps/api/staticmap?center='+data.generales.latitud+','+data.generales.longitud+'&size=517x220&zoom=16&maptype=roadmap&format=svg&scale=1&markers='+data.generales.latitud+','+data.generales.longitud+'&sensor=false&language=es&key=AIzaSyCaefWW3pvU6WKZKiVFD6OwyGoWIgZLyS0');
		
	/*var calle= data.datosSitio.calle+", ";
	var colonia= "Col. "+data.datosSitio.colonia+", ";
	var municipio= data.datosSitio.municipio+", ";
	var ciudad = data.datosSitio.ciudad+", ";
	var estado =data.datosSitio.estado +", ";
	var codigoPostal="C.P. "+data.datosSitio.codigoPostal;
	$('#pdfdireccion').val(calle+colonia+ciudad+estado+codigoPostal);*/
	$('#pdfdireccion').val(data.datosSitio.direccion);
	
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

	var listacompetencias=data.zonificacion.competencias;
	var listageneradores=data.zonificacion.generadores;
	var markers="";
	
	
	for(var i=0;i<listacompetencias.length;i++){
		markers=markers+'&markers=color:0xEE2B62%7C'+listacompetencias[i].latitud+','+listacompetencias[i].longitud;
	}
	for(var i=0;i<listageneradores.length;i++){
		markers=markers+'&markers=color:0xF9B118%7C'+listageneradores[i].latitud+','+listageneradores[i].longitud;
	}
	
	var listas_url='http://maps.google.com/maps/api/staticmap?center='+data.generales.latitud+','+data.generales.longitud+'&size=570x400&zoom=14&maptype=roadmap&format=svg&scale=1'+markers+'&sensor=false&language=es&key=AIzaSyCaefWW3pvU6WKZKiVFD6OwyGoWIgZLyS0';
	$('#pdfurlmapa_pag3').val(listas_url);

//para pag4 PDF
	$('#pdfsubfactores').val(JSON.stringify(data.construccion.factores.EXPANSION));
	
//	var subfactores=[];+"los marcadores"
//	var subfactoresdesc=[];
	
//	for(var s=0; s < data.construccion.factores.EXPANSION.length; s++){
//		var arreglo = data.construccion.factores.EXPANSION[s];
//		var nivelId = arreglo.nivelId;
//		
//		if(arreglo.subfactores != undefined && arreglo.subfactores.length > 0 ){
//			for(var i = 0; i < arreglo.subfactores.length; i ++){
//				var arregloSubfactor = arreglo.subfactores[i];
//				
//				subfactores[i] = arregloSubfactor.subFactorId;
//				subfactoresdesc[i] = arregloSubfactor.nombre;
//			}
//		}
//		if(nivelId=="3"||nivelId=="4"||nivelId=="5"){
//			$('#pdffactor').val(arreglo.nombreFactor);
//		}
//		if(nivelId=="1"||nivelId=="2"){
//			$('#pdftipo').val(arreglo.nombreFactor);
//		}
//	}
//	
//	$('#pdfsubfactores').val(subfactores);
//	$('#pdfsubfactoresdesc').val(subfactoresdesc);
//	
	
	//generalidades
	$('#pdfrenta').val(data.generalidades.renta);
	$('#pdfamortizacion').val(data.generalidades.porcentajeAmortizacion);
	$('#pdfdisponibilidad').val(data.generalidades.disponibilidad);
	$('#pdftiempo_amortizacion').val(data.generalidades.periodoAmortizacion);
	$('#pdfgracia').val(data.generalidades.periodoGracia);
	
	//conteos peatonales
	$('#pdfconteos').val(JSON.stringify(data.flujoPeatonal.EXPANSION.conteos));
	
	//$('#generalidades_checkList').val(); // detalleMemoriaAsignada.js linea 1022
	
	
	$('#submitBotonDescargaPdf').click();
}