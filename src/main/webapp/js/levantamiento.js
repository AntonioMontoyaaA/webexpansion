var _SI = 1, _NO = 0, _VPENDIENT = -1 , VRECHAZADO = 0, VACEPTADO = 1 , VPENDIENTE2 = 2,  MD_PROCESOOBRA = 6;
var v;
var vraa;
var vrvb;
var via;
var vlc;
var vlc;
var vvl;
var vfe;
var vcb;
var BASE64Upload = "";
var typeFileExt = "";
var nameFileExt = "";
var esEvalua = ($("#esAutorizaEvalua").val() == 'true');
var esPermisoGuardar = ($("#esPermisoGuardar").val() == 'true');



$(function(){
		hideModulosForm();
		$("#val_upload_levant").hide();
		//cierraLoading();
		
		refreshJsonHtml();
		cargaLevantamiento();
		
		$("#btn_guardarLevanta").click(function(){
										if(campoObligatorio(false)){
											return false;
										}
										
										getValueObject(); 
										saveDatosLevantamiento(0);  
								});
		
		$("#bton_enviarRevision").click(function(){
										if(campoObligatorio(true)){
											return false;
										}
										getValueObject(); 
										saveDatosLevantamiento(1);
									});
		
		$(".fileUpload").click(function(){ descargaArchivo(this);});
		$(".drop_file").click(function(){
			$(this.parentElement.children[2]).trigger("click");
		});
		
		$("input.var_pdfUpload").change(function (evt) {
			
			var element = this;
			
		    var tgt = evt.target || window.event.srcElement,
		        files = tgt.files;
		    	typeFileExt = files[0].type;
		    	fileExt = files[0].name.split('.').slice(1, 2).join('.');
		    	namefileExt = files[0].name.split('.').slice(0, 1).join('.');
		    // FileReader support
		    if (FileReader && files && files.length) {
		        var fr = new FileReader();
		        fr.onload = function () {
		        	BASE64Upload = fr.result;
		        	
		        }
		        fr.readAsDataURL(files[0]);
		      
		    } else {
		        // fallback
		    }
			setTimeout(function(){
				if(BASE64Upload != undefined && BASE64Upload != ""){
					var imgExt = true;
					
					if(element.getAttribute("fileExt")=== "JPG"){
						if(fileExt.toUpperCase() === "JPEG"){
							imgExt = false;
						}else if(fileExt.toUpperCase() === "JPG"){
							imgExt = false;
						}else if(fileExt.toUpperCase() === "PNG"){
							imgExt = false;
						}
						
						if(imgExt){
							cargaMensajeModal("Levantamiento MD","La extensión "+element.getAttribute("name")+" debe ser  JPG, JPEG o PNG.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);	
							return false;
						}
						
					}else  if(!(fileExt.toUpperCase() === element.getAttribute("fileExt"))){
						cargaMensajeModal("Levantamiento MD","La extensión "+element.getAttribute("name")+" debe ser "+  element.getAttribute("fileExt") , TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
						return false;
					}
					
					uploadLevantamiento(element.getAttribute("nameArc") ,BASE64Upload,fileExt,element.getAttribute("file") );		        	
				}		    	
			},350);
		});	
		
		 
});


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(evt,element) {
    evt.preventDefault();
  
    files = evt.dataTransfer.files;
	typeFileExt = files[0].type;
	fileExt = files[0].name.split('.').slice(1, 2).join('.');
	namefileExt = files[0].name.split('.').slice(0, 1).join('.');
	// FileReader support
	if (FileReader && files && files.length) {
	    var fr = new FileReader();
	    fr.onload = function () {
	    	BASE64Upload = fr.result;
	    	
	    }
	    fr.readAsDataURL(files[0]);
	  
	} else {
	    // fallback
	}
	setTimeout(function(){
		if(BASE64Upload != undefined && BASE64Upload != ""){
			var imgExt = true;
			
			if(element.getAttribute("fileExt")=== "JPG"){
				if(fileExt.toUpperCase() === "JPEG"){
					imgExt = false;
				}else if(fileExt.toUpperCase() === "JPG"){
					imgExt = false;
				}else if(fileExt.toUpperCase() === "PNG"){
					imgExt = false;
				}
				
				if(imgExt){
					cargaMensajeModal("Levantamiento MD","La extensión "+element.getAttribute("name")+" debe ser  JPG, JPEG o PNG.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);	
					return false;
				}
				
			}else  if(!(fileExt.toUpperCase() === element.getAttribute("fileExt"))){
				cargaMensajeModal("Levantamiento MD","La extensión "+element.getAttribute("name")+" debe ser "+  element.getAttribute("fileExt") , TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				return false;
			}
			
			uploadLevantamiento(element.getAttribute("nameArc") ,BASE64Upload,fileExt,element.getAttribute("file") );		        	
		}		    	
	},350);
}

function refreshJsonHtml(){
	
	vcb = {
			v_mdId   : $("#idMd"),
			v_aRen   : $("#var_areaRentam2"),
			v_downpdf : $("#div_fileLVANT"),
			v_jCns   : $("#var_nombJefeConst"),
			v_fdlto  : $("#var_fdFecha"),		
			valNombre 	  : $("#labelNombre"),
			valRegion 	  : $("#vlaRegion"),
			valJefe_e 	  : $("#valJefe_e"),
			valPropietario: $("#valPropietario"),
			valUbicacion  : $("#valUbicacion")
	};
	
	/* -- DATOS HMTL FACHADAS -- */
	vfe = { vAvP   : $("#val_avPrincipal"),
			vCor   : $("#val_cortinasyPostigos"),
			vEsBas : $("#val_espacioBastidor"),
			vEsBan : $("#var_buenEdoBanquetas"),
			vEMu   : $("#var_buenEdoMuros"),
			vCom   : $("#var_commentFachadas"),
			v_arm2 : $("#var_areaRentam2"),
			v_nJCn : $("#var_nombJefeConst")
		};

	/* -- DATOS HMTL INTERIORES -- */
	via = { vEpr : $('#div_tipoEstructura'),
				vTEs : $("#div_enCasoEstructura"),
				vTPi : $("#div_tipoPiso"),
				vEsP : $("#val_EstadoPisos"),
				vECC : $("#var_eColumCast"),
				vTMP : $("#div_tipoMuro"),
				veMurP : $("#var_eMuroP"),
				veCom : $("#var_IAcomment")
		};
	
	/* -- DATOS HMTL LOSAS -- */
	vlc = { vTlos   : $('#div_tipolosa'),
			velos   : $("#val_eLosaTech"),
			vNsup   : $("#val_nilSuperior"),
			vColCe  : $("#val_columCentrales"),
			vNColCe : $("#val_numColumCent"),
			vestCa  : $("#val_soporCarga"),
			vReCa   : $("#var_reforzarEstruc"),
			veCom   : $("#var_comentLT")
	};
	
	/* -- DATOS HMTL VARIOS -- */
	vvl = { v_vdre  : $('#val_drenaje'),
			v_vreg  : $("#val_registros"),
			v_vnreg : $("#val_numResgistros"),
			v_vAin  : $("#val_aguaInde"),
			v_vLuin : $("#val_contLuInd"),
			v_vtLin : $("#div_contLuzIndepe"),
			v_vTab  : $("#val_tablaroca"),
			v_vMuB  : $("#val_muroBlock"),
			v_vMCon : $("#val_muroConcreto"),
			v_vLCo  : $("#val_losaConcre"),
			v_vLam  : $("#val_lamina"),
			v_vOt   : $("#val_vOtras"),
			veCom   : $("#var_VComent")	
	};

	/* -- DATOS HMTL RESUMEN VOBO -- */
	vrvb = { vAire : $("#var_aairAcon"),  
			 vSade : $("#div_segAdecuac"),
			 vTade : $("#di_tipoAdecua"),
			 vAAI : $("#var_amort"),
			 vaPA : $("#var_porAmort"),
			 veCom : $("#var_resumComment")
			};

	/*-- DATOS HMTL RESTRICCIONES --*/
	vraa = { v_restr : $("#var_restriccion"), 
			 vERc    : $("#var_elemntRecu"),
			 vFact   : $("#div_factible"),
			 veCom   : $("#var_restComment")
		};
}


/* == DATOS MD CABECERO ==*/
function uploadLevantamiento(fileName, file_base64, fileExt, elemntDiv){
	var date = new Date();
	var	fecha = date.format("dd/mm/yyyy hh:mm:ss");
	invocarJSONServiceAction("subeArchivoPdf",{"mdId" : $("#idMd").val(), 
											"nombreArchivo"	: fileName,
											"archivo"	 	: file_base64,
											"formato"	 	: fileExt,
											"tipoArchivo"	: 2,
											"fecha"		 	: fecha,
											"tipoServicio"  : 0
													},
			'responseAltaArchivopdf',
			function() {
				//Funcion de error
				cargaMensajeModal("Detalle MD","Error en el servicio para guardar el archivo.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});
	
	responseAltaArchivopdf = function(d){
		
		if(d.codigo != 200){
			cargaMensajeModal("Detalle MD","Error en el servicio para guardar el archivo.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}else if(d.codigo == 200){
			$("#"+elemntDiv).val(d.resultado.secure_url);
			$("#"+elemntDiv).addClass("file_upload");
			$("#"+elemntDiv).html("Ver");
			
		}
	};
}

/* == DATOS MD CABECERO ==*/
function cargaLevantamiento(){
	
	if( $("#idMd").val()  == ""){
		redirecDash();
	}
	
	invocarJSONServiceAction("consultaCabeceroMd",{"mdId" :  $("#idMd").val() 
													},
			'responseConsultaCaberoMd',
			function() {
				//Funcion de error
				cargaMensajeModal("LEVANTAMIENTO","Error en el servicio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});
	
	responseConsultaCaberoMd = function(d){
		if(d.codigo == 200){
			vcb.valNombre.html(d.nombresitio.toUpperCase());
			vcb.valRegion.html(d.region);
			vcb.valJefe_e.html(d.jefeexpansion);
			vcb.valPropietario.html(d.propietario);
			vcb.valUbicacion.html(d.direccion);
			estadoEvaluaform(d.estatusevaluacion,d);
			ESTATUS_MD = d.nivel;
		}else{
			cargaMensajeModal("LEVANTAMIENTO","Error en el servicio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, redirectDetalleMd);
			setTimeout(function(){redirectDetalleMd();},2000);
		}
	};
}

function redirectDetalleMd(){
	history.back();
}

/* == GUARDA DATOS ==*/
function saveDatosLevantamiento(tipo_guardado){
	
	var cedulaAlcanc = $("#div_fileCEALC").val() != undefined ? $("#div_fileCEALC").val() : "" ;
	var poligono = $("#div_filePOLG").val() != undefined ? $("#div_filePOLG").val() : "" ;
	var fotoFachada = $("#div_fileFACHA").val() != undefined ? $("#div_fileFACHA").val() : "" ;
	var levantamientofile = $("#div_fileLVANT").val() != undefined ? $("#div_fileLVANT").val() : "" ;
	
	
	invocarJSONServiceAction("guardarDatosLevan",{  mdId				: vcb.v_mdId.val() ,
													areaRentar			: vcb.v_aRen.val(),
													jefeConstruccion	: vcb.v_jCns.val(),
													fechalevantamiento  : vcb.v_fdlto.val(),
													rutacedulaalcance   : cedulaAlcanc,
													rutapoligonal       : poligono,
													rutafachada         : fotoFachada,
													rutaarchivo			: levantamientofile,
													fachadasyExt		: "",
													interioresYAreaP	: "",
													losas				: "",
													varios				: "",
													resumenyVobo		: "",
													ReestriccionesProp  : "",
													VoboGral: "",
													comentarios:"....",
													tipofinaliza: tipo_guardado
												},
			'responseGuardaDatos',
			function() {
				//Funcion de error
				cargaMensajeModal("LEVANTAMIENTO","Error en el servicio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});
	
	responseGuardaDatos = function(d){
		if(d.codigo == 200){
			cargaMensajeModal("LEVANTAMIENTO","Datos guardados con &eacute;xito.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, redirectDetalleMd);
			setTimeout(function(){
				redirectDetalleMd();			
			},2000);
		}else{
			cargaMensajeModal("LEVANTAMIENTO",d.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}
	};
}

function redirecDasboard(){	
	window.location.href='asignadas';
}


function redirecDash(){	
	window.location.href='dashboard';
}



function muestraPopAutorizacion(){
	$("#modal_autorizacion").modal("show");
}

/* == AUTORIZA LEVANT ==*/
function evaluaAutorizLevant(estatusEvalua){
	invocarJSONServiceAction("evaluaLevantamiento",{"mdId" 		  :  $("#idMd").val(),
													"comentarios" :  $("#var_autorComment").val(),
													"estatusValidacion": estatusEvalua
													},
			'response',
			function() {
				//Funcion de error
				cargaMensajeModal("LEVANTAMIENTO","Error en el servicio.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});
	
	response = function(d){
		if(d.codigo == 200){
			cargaMensajeModal("LEVANTAMIENTO",d.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, redirecDasboard);
			setTimeout(function(){
				redirectDetalleMd();			
			},2000);
		}else{
			cargaMensajeModal("LEVANTAMIENTO",d.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		}
		
	};
}


/* == setter values ==*/
function estadoEvaluaform(statsEval,d){
	
	if(d.nivel == 27 && !esPermisoGuardar){
		levantamientoPendiente();
		$("#var_msjMdObra").html("PENDIENTE DEL ALTA DEL LEVANTAMIENTO.");
		return false;
	}
	
	cargarImagenes(d.detlevantamiento[0],0);
	
	switch(statsEval) {
	    case _VPENDIENT:
	    	//code block
	    	
	    	AREA_USUARIO = $("#areaUsuario").val(); 
	    	showModulosForm();
	    	if(d.nivel == 27 || d.nivel == 29){
	    		$("#val_upload_levant").show();
	    		$("#bton_enviarRevision").show();
	    		$("#btn_guardarLevanta").show();	
	    		if(!esEvalua){
	    			inicializaCalendarios($("#var_fdFecha"));
	    		}
	    	}
	    	
	    	if(esEvalua){
	    		addReadOnly(vcb.v_jCns);
				addReadOnly(vcb.v_aRen);
				addReadOnly(vcb.v_fdlto);
    		}
	    	
	    	if(d.nivel == 27){
	    		$("#div_autoriLevant").hide();	
	    	}
	    	
	    	
	    	if(d.detlevantamiento.length){
	    		var e = true;
	    		
			    if(esEvalua || d.nivel != 27 || d.nivel == 29){
	    			e = false;
	    		}
	    		setterFormCabe(d.detlevantamiento[0], e);
	    		setterFormFachada(d.detlevantamiento[0].fachadasyExt[0], e);
	    		setterFormInterio(d.detlevantamiento[0].interioresYAreaP[0], e);
	    		setterFormLosaTech(d.detlevantamiento[0].losas[0], e);
	    		setterFormVarios(d.detlevantamiento[0].varios[0],  e);
	    		setterFormRetricciones(d.detlevantamiento[0].ReestriccionesProp[0], e);
	    		setterFormResuVoBo(d.detlevantamiento[0].resumenyVobo[0], e);    		
	    	 }
	        break;
	    case VRECHAZADO:
	    	//code block -- onlyRead
	    	if(!esEvalua){
				inicializaCalendarios($("#var_fdFecha"));
			}
	    	
	    	if(esEvalua){
	    		addReadOnly(vcb.v_jCns);
				addReadOnly(vcb.v_aRen);
				addReadOnly(vcb.v_fdlto);
    		}
	    	
	    	showModulosForm();
	    	if(d.nivel == 27 || d.nivel == 29){
	    		$("#val_upload_levant").show();
	    		$("#bton_enviarRevision").show();
	    		$("#btn_guardarLevanta").show();    		
	    	}
	    	
	    	if(d.nivel == 29){
	    		$("#div_autoriLevant").hide();
	    	}
	    	
	    	var e = true;
	    	
	    	if(d.detlevantamiento.length){
	    		
	    		if(esEvalua || d.nivel != 29){
	    			e = false;
	    		}
	    		
	    		setterFormCabe(d.detlevantamiento[0], e);
	    		setterFormFachada(d.detlevantamiento[0].fachadasyExt[0], e);
	    		setterFormInterio(d.detlevantamiento[0].interioresYAreaP[0], e);
	    		setterFormLosaTech(d.detlevantamiento[0].losas[0], e);
	    		setterFormVarios(d.detlevantamiento[0].varios[0], e);
	    		setterFormRetricciones(d.detlevantamiento[0].ReestriccionesProp[0], e);
	    		setterFormResuVoBo(d.detlevantamiento[0].resumenyVobo[0], e);    		
	    	 }else{
	    		 
	    		 if(esEvalua || d.nivel == 29){
		    			e = false;
		    		}
	    		 
	    		 //setterFormCabeOnlyRead(e);
	    		//setterFormFachadaOnlyRead(e);
	    		//setterFormInterioOnlyRead(e);
	    		//setterFormLosaTechOnlyRead(e);
	    		//setterFormVariosOnlyRead(e);
	    		//setterFormRetriccionesOnlyRead(e);
	    		//setterFormResuVoBoOnlyRead(e);    	
	    		 
	    	 }
	    	
	        break;
	    case VACEPTADO:
	    	//code block
	    	$("#val_upload_levant").hide();
	    	$("#bton_enviarRevision").hide();
	    	$("#btn_guardarLevanta").hide();
	    	
	    	$(".drop_file").hide();
	    	
	    	if(esEvalua){
	    		addReadOnly(vcb.v_jCns);
				addReadOnly(vcb.v_aRen);
				addReadOnly(vcb.v_fdlto);
    		}
	    	
	    	showModulosForm();
	    	cargarImagenes(d.detlevantamiento[0],1)
	    	
	    	$("#div_autoriLevant").hide();
	    	if(d.detlevantamiento.length){
	    		var e = false;
	    		if(esEvalua || d.nivel != 27 || d.nivel != 29){
	    			e = false;
	    		}
	    		setterFormCabe(d.detlevantamiento[0], e);
	    		setterFormFachada(d.detlevantamiento[0].fachadasyExt[0], e);
	    		setterFormInterio(d.detlevantamiento[0].interioresYAreaP[0], e);
	    		setterFormLosaTech(d.detlevantamiento[0].losas[0], e);
	    		setterFormVarios(d.detlevantamiento[0].varios[0],e);
	    		setterFormRetricciones(d.detlevantamiento[0].ReestriccionesProp[0], e);
	    		setterFormResuVoBo(d.detlevantamiento[0].resumenyVobo[0], e);    		
	    	 }
	    	break;
	        
	    case VPENDIENTE2:
	    	//code block -- onlyRead
	    	
	    	$("#mdIdAutorizacion").val( $("#idMd").val());
	    	$("#mdId").val($("#idMd").val());
	    	if(d.nivel == 28){
	    		$("#div_autoriLevant").show();
	    	}
	    	if(esEvalua){
	    		addReadOnly(vcb.v_jCns);
				addReadOnly(vcb.v_aRen);
				addReadOnly(vcb.v_fdlto);
    		}
	    	
	    	if(!esEvalua){
				inicializaCalendarios($("#var_fdFecha"));
			} 
	    	
	    	
	    	$("#bton_enviarRevision").show();
	    	$("#btn_guardarLevanta").show();
	    	
	    	showModulosForm();
	    	var e = true;
	    	if(d.detlevantamiento.length){
	    		
	    		if(esEvalua || d.nivel == 29){
	    			e = false;
	    		}
	    		
	    		setterFormCabe(d.detlevantamiento[0], e);
	    		setterFormFachada(d.detlevantamiento[0].fachadasyExt[0], e);
	    		setterFormInterio(d.detlevantamiento[0].interioresYAreaP[0], e);
	    		setterFormLosaTech(d.detlevantamiento[0].losas[0], e);
	    		setterFormVarios(d.detlevantamiento[0].varios[0], e);
	    		setterFormRetricciones(d.detlevantamiento[0].ReestriccionesProp[0], e);
	    		setterFormResuVoBo(d.detlevantamiento[0].resumenyVobo[0], e);    		
	    	 }else{
	    		 
	    		 if(esEvalua || d.nivel == 29){
		    			e = false;
		    		}
	    		 
	    		 //setterFormCabeOnlyRead(e);
	    		//setterFormFachadaOnlyRead(e);
	    		//setterFormInterioOnlyRead(e);
	    		//setterFormLosaTechOnlyRead(e);
	    		//setterFormVariosOnlyRead(e);
	    		//setterFormRetriccionesOnlyRead(e);
	    		//setterFormResuVoBoOnlyRead(e);    	
	    		 
	    	 }
	        break;
	       
	    case MD_PROCESOOBRA:
	    	//code block
	    	AREA_USUARIO = $("#areaUsuario").val(); 
	    	$("#var_msjMdObra").html("NO SE CUENTA CON EL LEVANTAMIENTO, YA QUE FUE IMPLEMENTADO DESPU&Eacute;S DE LA CARGA DE LA MD ACTUAL");
	    	$("#val_upload_levant").hide();
	    	$("#bton_enviarRevision").hide();
	    	$("#btn_guardarLevanta").hide();
	    	$("#val_download_levant").hide();
	    	hideModulosForm();
	    	
	    		addReadOnly(vcb.v_jCns);
				addReadOnly(vcb.v_aRen);
				addReadOnly(vcb.v_fdlto);
    		
	        break;
	        
	    default:
	    	$("#val_upload_levant").hide();
	    	$("#btn_guardarLevanta").hide();
	        //code block
		}
	
	//PENDIENT = -1 , VRECHAZADO = 0, VACEPTADO = 1 , VPENDIENTE2 = 2 ;    AUTORIZACION = 28
}

function levantamientoPendiente(){
	var e = false;
	/*addReadOnly(vcb.v_jCns);
	addReadOnly(vcb.v_aRen);
	addReadOnly(vcb.v_fdlto);
	setterFormCabeOnlyRead(e);
	setterFormFachadaOnlyRead(e);
	setterFormInterioOnlyRead(e);
	setterFormLosaTechOnlyRead(e);
	setterFormVariosOnlyRead(e);
	setterFormRetriccionesOnlyRead(e);
	setterFormResuVoBoOnlyRead(e);*/ 
}

function cargarImagenes(d,evalua){
	if(d != undefined){
		
		if(d.rutacedulaalcance != "" && d.rutacedulaalcance != undefined){
			$("#div_fileCEALC").val(d.rutacedulaalcance);		
			$("#div_fileCEALC").removeClass("file_unfound");
			$("#div_fileCEALC").addClass("file_upload");	
			if(evalua == 1){
				$("#div_fileCEALC").html("Ver cédula de alcances");		 					
			}else{
				$("#div_fileCEALC").html("Ver");
			}
		}
		
		if(d.rutapoligonal != "" && d.rutapoligonal != undefined){
			$("#div_filePOLG").val(d.rutapoligonal)	
			$("#div_filePOLG").removeClass("file_unfound");
			$("#div_filePOLG").addClass("file_upload");		
			if(evalua == 1){
				$("#div_filePOLG").html("Ver poligonal");	
			}else{
				$("#div_filePOLG").html("Ver");	
			}
		}
		
		if(d.rutafachada != "" && d.rutafachada != undefined){
			$("#div_fileFACHA").val(d.rutafachada); 
			$("#div_fileFACHA").removeClass("file_unfound");
			$("#div_fileFACHA").addClass("file_upload");	
			if(evalua == 1){
				$("#div_fileFACHA").html("Ver foto fachada");
			}else{
				$("#div_fileFACHA").html("Ver");
			}
		}
		
		if(d.urlArchivo != "" && d.urlArchivo != undefined){
			$("#div_fileLVANT").val(d.urlArchivo);	
			$("#div_fileLVANT").removeClass("file_unfound");
			$("#div_fileLVANT").addClass("file_upload");		
			if(evalua == 1){
				$("#div_fileLVANT").html("Ver formato de validación");
			}else{
				$("#div_fileLVANT").html("Ver");
			}
		}
	}
				
			
		
	
	
}

function showModulosForm(){
	$("#div_autoriLevant").show();
	$("#datosResumenVobo").show();
	$("#div_datosRestricciones").show();
	$("#div_datosInteriores").show();
	$("#div_datosVarios").show();
	$("#div_datosFachada").show();
	$("#div_datosLosas").show();
}

function hideModulosForm(){
	$("#div_autoriLevant").hide();
	$("#datosResumenVobo").hide();
	$("#div_datosRestricciones").hide();
	$("#div_datosInteriores").hide();
	$("#div_datosVarios").hide();
	$("#div_datosFachada").hide();
	$("#div_datosLosas").hide();
}

/* -- SETTER HEAD -- */
function setterFormCabe(d , e){
	vcb.v_downpdf.val(d.urlArchivo);
	vcb.v_jCns.val(d.jefeConstruccion);
	vcb.v_aRen.val(d.areaRentar);
	vcb.v_fdlto.val(d.fechalevantamiento);
	if(!e){
		addReadOnly(vcb.v_jCns);
		addReadOnly(vcb.v_aRen);
		addReadOnly(vcb.v_fdlto);			
	}
}

/* -- SETTER FACHADAS -- */
function setterFormFachada(d , e){
	
	/*setterCheck(vfe.vAvP[0], d.avPrincipal, e);
	setterCheck(vfe.vCor[0], d.cortinasyPostigos, e);
	setterCheck(vfe.vEsBas[0], d.espacioBastidor, e);
	setterCheck(vfe.vEsBan[0], d.buenEdoBanquetas, e);
	setterCheck(vfe.vEMu[0], d.buenEdoMuros, e);
	vfe.vCom.val(d.comentarios);
	if(!e){
		addReadOnly(vfe.vCom);
	}*/
}

/* -- SETTER INTERIORES -- */
function setterFormInterio(d , e){
	/*setterCheck(via.vECC[0], d.buenEdoColumnas, e); //*--
	setterCheck(via.vEsP[0], d.buenEdoPisos, e);    //*--
	setterRadio(via.vEpr[0], d.estructuraP, e);
	setterRadio(via.vTPi[0], d.piso, e);
	setterRadio(via.vTEs[0], d.tipoEstrucLibre, e);
	setterRadio(via.vTMP[0], d.tipoMuroPerimetral, e); 	
	setterCheck(via.veMurP[0], d.tipoMuroPerimetral, e);     //*-- pendiente	
	via.veCom.val(d.comentarios);
	if(!e){
		addReadOnly(via.veCom);
	}*/
}

/* -- SETTER LOSAS -- */
function setterFormLosaTech(d, e){
	/*setterRadio(vlc.vTlos[0], d.tipoLosa, e);
	setterCheck(vlc.velos[0], d.buenEdoLosa, e);    
	setterCheck(vlc.vNsup[0], d.nivelSuperior, e);
	setterCheck(vlc.vColCe[0], d.columnasCentrales, e);
	setterCheck(vlc.vestCa[0], d.EstructuraCargaPlafon, e);
	setterCheck(vlc.vReCa[0], d.reforzarEstructura, e); 			
	vlc.veCom.val(d.comentarios);
	if(!e){
		addReadOnly(vlc.veCom);		
	}*/
}

/* -- SETTER VARIOS -- */
function setterFormVarios(d, e){
	/*var de = d.elementosDemoliciones[0];
	setterCheck(vvl.v_vdre[0],  d.drenaje, e);
	setterCheck(vvl.v_vreg[0],  d.registros, e);    
	setterCheck(vvl.v_vAin[0],  d.AguaIndependiente, e);
	setterCheck(vvl.v_vLuin[0], d.contratoyAcomendidaLuzIndpt, e);
	setterRadio(vvl.v_vtLin[0], d.tipoLuz, e);
	setterCheck(vvl.v_vTab[0],  de.tablaroca, e);
	setterCheck(vvl.v_vMuB[0],  de.murosBlock, e);    
	setterCheck(vvl.v_vMCon[0], de.murosConcreto, e);
	setterCheck(vvl.v_vLCo[0],  de.losaConcretoArmado, e);
	setterCheck(vvl.v_vLam[0],  de.laminacion, e);	
	setterCheck(vvl.v_vOt[0],   de.otro, e);
	vvl.veCom.val(d.comentarios);
	if(!e){
		addReadOnly(vvl.veCom); 			
	}*/
}


/* -- SETTER RESTRICCIONES -- */
function setterFormRetricciones(d , e){
	/*setterRadio(vraa.vFact[0], d.condicionesArrendador, e);	
	setterCheck(vraa.v_restr[0],  d.condicionesArrendador, e);
	
	vraa.vERc.val(d.comentarios);
	vraa.veCom.val(d.comentarios);
	if(!e){
		addReadOnly(vraa.vERc); 
		addReadOnly(vraa.veCom); 			
	}*/
}

/* -- SETTER RESUMENvobo -- */
function setterFormResuVoBo(d,e){
	/*setterRadio(vrvb.vSade[0], d.seguridadAdecuacion, e);
	setterRadio(vrvb.vTade[0], d.tipoAdecuacion, e);
	setterCheck(vrvb.vAAI[0],  d.arrendadorAmortiza, e);	
	setterCheck(vrvb.vAire[0],  d.aireAcondicionado, e);	
	
	
	vrvb.veCom.val(d.comentarios);
	if(!e){
		addReadOnly(vrvb.veCom); 			
	}*/
}


/* == COMPO OBLIGATORIO == */
var isEmpty_;
function campoObligatorio(esoObligatorio){
	isEmpty_ = false;
	elementEmpty(vcb.v_aRen);
	elementEmpty(vcb.v_jCns);
	elementEmpty(vcb.v_fdlto);
	
	var cedulaAlcanc 		= ($("#div_fileCEALC").val() != undefined && $("#div_fileCEALC").val().trim() != "") ? false : true;
	var poligono 	 		= ($("#div_filePOLG").val()   != undefined && $("#div_filePOLG").val().trim()  != "") ? false : true;
	var fotoFachada  		= ($("#div_fileFACHA").val()  != undefined && $("#div_fileFACHA").val().trim() != "") ? false : true;
	var levantamientofile   = ($("#div_fileLVANT").val()  != undefined && $("#div_fileLVANT").val().trim() != "") ? false : true;
	
	if(isEmpty_){
		cargaMensajeModal("LEVANTAMIENTO","El área y nombre del jefe de construcción son obligatorios.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		return true;
	}	else if(esoObligatorio && (levantamientofile || fotoFachada || poligono ||cedulaAlcanc )){
		cargaMensajeModal("LEVANTAMIENTO","Completar la carga de documentos.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		return true;
	}
}
function elementEmpty(obj){
	
	if(obj.length < 0 || obj[0].value =="" || obj[0].value.length == 0){
		isEmpty_ = true;		
	}
	
}


/* == CALENDARIO ==*/
function inicializaCalendarios(element) {
	$(".ui-datepicker-trigger").hide();
	
	var dateHoy = new Date();
	var FECHA_HOY = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	
	$( element).datepicker({
		maxDate:0,
		autoSize : true,
		showOn: 'both',
		showAnim: 'slideDown',
        buttonImageOnly: false,
        //buttonImage: 'img/calendar_icon.png',
        onClose: function( selectedDate ) {
			var date = $(this).datepicker('getDate');			
			var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }
	});
	
	$(element).datepicker.dateFormat = 'dd/MM/yy';
	$(element).val(FECHA_HOY);
}


/* == ADD READ ONLY ==*/
function addReadOnly(element){
	element.attr('readonly',true);
}

/* == CHECKED INPUT ==*/
function setterCheck(element, v, edita){
	if(edita == false){
		element.setAttribute('readonly',true);		
	}
	
	if(v == 1 || v == "1"){
		$(element.firstElementChild.firstElementChild).css('display','block');
		$(element.firstElementChild).css('background-color','#40BCD8');
		element.setAttribute('checked',true);
	}else{
		$(element.firstElementChild.firstElementChild).css('display','none');
		$(element.firstElementChild).css('background-color','white');
		element.removeAttribute('checked');
	}
}

/* == RADIO INPUT ==*/
function setterRadio(element, v, edita){
	if(!edita){
		element.querySelectorAll("input").forEach(function(inputRadio) {
			inputRadio.setAttribute('disabled',true);
		});			
	}
	if($(element).children().children("input:radio[value="+v+"]").length > 0){
		$(element).children().children("input:radio[value="+v+"]")[0].setAttribute("checked",true)		
	}
}





/* == CHECKED READONLY ==*/
/*function setterCheckOnlyRead(element, edita){
	if(edita == false){
		element.setAttribute('readonly',true);		
	}
	
}*/

/* == RADIO READONLY ==*/
/*function setterRadioOnlyRead(element,  edita){
	if(!edita){
		element.querySelectorAll("input").forEach(function(inputRadio) {
			inputRadio.setAttribute('disabled',true);
		});			
	}
}*/



/* == RADIO INPUT ==*/
function getterRadio(element){
	var value = -1;
	if(element.querySelectorAll("input:checked").length > 0){
		value = element.querySelectorAll("input:checked")[0].value;
	}
	
	return value;
}


/* -- DOWNLOAD PDF -- */
function descargaArchivo(d){
	if(d.value == undefined || d.value == " "){
		cargaMensajeModal("Detalle MD","No se ha cargado ningun archivo aun.", TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ALERTA, null);
		return false;
	}
	window.open(d.value);
}

/* == CHECKED INPUT ==*/
function seleccionEvento(element){
	if(!element.getAttribute('readonly')){
		if($(element.firstElementChild.firstElementChild).css('display') == 'none'){
			$(element.firstElementChild.firstElementChild).css('display','block');
			$(element.firstElementChild).css('background-color','#40BCD8');
			element.setAttribute('checked',true);			
		}else{
			$(element.firstElementChild.firstElementChild).css('display','none');
			$(element.firstElementChild).css('background-color','white');
			element.removeAttribute('checked');
		}		
	}
}


function onlynumber(value){ 	
	value.value = value.value.replace(regexletras, '');
}

function redireccionaAsignadas() {
	window.history.back();
}

/*-- DATOS JSON ALTA --*/
function getValueObject(){
	/*
	refreshJsonHtml();
	
	v = {	 				
				mdId 	   		   : vcb.v_mdId.val(),
				areaRentar 		   : vcb.v_aRen.val(),
				jefeConstruccion   : vcb.v_jCns.val(),
				fechalevantamiento : vcb.v_fdlto.val(),
				fachadasyExt : [{
					"avPrincipal"      : vfe.vAvP[0].getAttribute("checked")  ? _SI : _NO,
					"cortinasyPostigos": vfe.vCor[0].getAttribute("checked")  ? _SI : _NO,
					"espacioBastidor"  : vfe.vEsBas[0].getAttribute("checked")? _SI : _NO,
					"buenEdoBanquetas" : vfe.vEsBan[0].getAttribute("checked")? _SI : _NO,
					"buenEdoMuros"     : vfe.vEMu[0].getAttribute("checked")  ? _SI : _NO,
					"comentarios"		 : vfe.vCom.val()
				  }],
				interioresYAreaP : [{
				    "estructuraP"		: getterRadio( via.vEpr[0] ), // --0=muros carga, 1=estructura libre
				    "tipoEstrucLibre"	: getterRadio( via.vTEs[0] ) , //-- 0=NA, 1=concreto, 2=acero, 3=mixta
				    "piso"				: getterRadio( via.vTPi[0] )  , //-- 0=NA, 1=loseta, 2=terrazo, 3=concreto
				    "buenEdoPisos"		: via.vEsP[0].getAttribute("checked")  ? _SI : _NO, //0=NO, 1=SI
				    "buenEdoColumnas"	: via.vECC[0].getAttribute("checked")  ? _SI : _NO,
				    "tipoMuroPerimetral": getterRadio( via.vTMP[0] )  , //0=No existe, 1=block, 2=tabique, 3=concreto
				    "estadMuroPeri"		: via.veMurP[0].getAttribute("checked")  ? _SI : _NO,
				    "comentarios"		: via.veCom.val() }],
				 losas:[{
			        "tipoLosa"			:  getterRadio( vlc.vTlos[0] ) , //0=NA, 1=lamina, 2=concreto, 3=vigueta bovedilla, 4=losa acero, 5=otro
			        "buenEdoLosa"		: vlc.velos[0].getAttribute("checked")  ? _SI : _NO, //0=no, 1=si
			        "nivelSuperior"		: vlc.velos[0].getAttribute("checked")  ? _SI : _NO,
			        "columnasCentrales" : vlc.vColCe[0].getAttribute("checked")  ? _SI : _NO,
			        "EstructuraCargaPlafon":vlc.vestCa[0].getAttribute("checked") ? _SI : _NO,
			        "reforzarEstructura":vlc.vReCa[0].getAttribute("checked")  	? _SI : _NO,
			        "comentarios"		: vlc.veCom.val() }],
				 varios:[ {
			        "drenaje"						: vvl.v_vdre[0].getAttribute("checked")  ? _SI : _NO, //0=no, 1=si,
			        "registros" 					: vvl.v_vreg[0].getAttribute("checked")  ? _SI : _NO,
			        "AguaIndependiente" 			: vvl.v_vAin[0].getAttribute("checked")  ? _SI : _NO ,
			        "contratoyAcomendidaLuzIndpt"	: vvl.v_vLuin[0].getAttribute("checked")  ? _SI : _NO ,
			        "tipoLuz"						: getterRadio( vvl.v_vtLin[0] ), //-- 0=na, 1=trifasica, 2=bifasica, 3=monofasica
			        elementosDemoliciones :[{
			                "tablaroca"		: vvl.v_vTab[0].getAttribute("checked")  ? _SI : _NO,
			                "murosBlock"	: vvl.v_vMuB[0].getAttribute("checked")  ? _SI : _NO,
			                "murosConcreto" : vvl.v_vMCon[0].getAttribute("checked")  ? _SI : _NO,
			                "losaConcretoArmado": vvl.v_vLCo[0].getAttribute("checked")  ? _SI : _NO,
			                "laminacion"	: vvl.v_vLam[0].getAttribute("checked")  ? _SI : _NO,
			                "otro"			: vvl.v_vOt[0].getAttribute("checked")  ? _SI : _NO,
			                "comentarios"	: vvl.veCom.val()  }],
			        "comentarios"			: vvl.veCom.val()
			       }],
			    resumenyVobo:[{
			        "seguridadAdecuacion" : getterRadio( vrvb.vSade[0] ) , //-- 1=alto, 2=medio, 3=bajo
			        "tipoAdecuacion"	  : getterRadio( vrvb.vTade[0] ) , //-- 1=menor, 2=mayor, 3=obra nueva
			        "arrendadorAmortiza"  : vrvb.vAAI[0].getAttribute("checked")  ? _SI : _NO,
			        "aireAcondicionado"   :  vrvb.vAire[0].getAttribute("checked")  ? _SI : _NO,
			        	"comentarios"		  : vrvb.veCom.val() }],
			    ReestriccionesProp: [{
			        "condicionesArrendador": vraa.v_restr[0].getAttribute("checked")  ? _SI : _NO, //--0=no, 1=si
			        "elementosRec"		   : vraa.vERc.val(),
			        "comentarios"		   : vraa.veCom.val()
				   }],
			    VoboGral    : getterRadio( vraa.vFact[0] ),  //-- 1=factible, 2=factible con restricciones, 3=rechazado
			    comentarios : "" 
			  	
			 };
	*/
}




/* -- SETTER HEAD -- */
/*function setterFormCabeOnlyRead( e){

	if(!e){
		addReadOnly(vcb.v_jCns);
		addReadOnly(vcb.v_aRen);
		addReadOnly(vcb.v_fdlto);			
	}
}*/

/* -- SETTER FACHADAS -- */
/*function setterFormFachadaOnlyRead( e){
	
	setterCheckOnlyRead(vfe.vAvP[0] , e);
	setterCheckOnlyRead(vfe.vCor[0] , e);
	setterCheckOnlyRead(vfe.vEsBas[0], e);
	setterCheckOnlyRead(vfe.vEsBan[0], e);
	setterCheckOnlyRead(vfe.vEMu[0],  e);
	if(!e){
		addReadOnly(vfe.vCom);
	}
}*/

/* -- SETTER INTERIORES -- */
/*function setterFormInterioOnlyRead( e){
	setterCheckOnlyRead(via.vECC[0],  e); //*--
	setterCheckOnlyRead(via.vEsP[0],  e);    //*--
	setterRadioOnlyRead(via.vEpr[0],  e);
	setterRadioOnlyRead(via.vTPi[0], e);
	setterRadioOnlyRead(via.vTEs[0],  e);
	setterRadioOnlyRead(via.vTMP[0], e); 	
	setterCheckOnlyRead(via.veMurP[0], e);     //*-- pendiente	
	if(!e){
		addReadOnly(via.veCom);
	}
}*/

/* -- SETTER LOSAS -- */
/*function setterFormLosaTechOnlyRead( e){
	setterRadioOnlyRead(vlc.vTlos[0], e);
	setterCheckOnlyRead(vlc.velos[0],  e);    
	setterCheckOnlyRead(vlc.vNsup[0],  e);
	setterCheckOnlyRead(vlc.vColCe[0],  e);
	setterCheckOnlyRead(vlc.vestCa[0],  e);
	setterCheckOnlyRead(vlc.vReCa[0],  e); 			
	if(!e){
		addReadOnly(vlc.veCom);		
	}
}*/

/* -- SETTER VARIOS -- */
/*function setterFormVariosOnlyRead( e){

	setterCheckOnlyRead(vvl.v_vdre[0],  e);
	setterCheckOnlyRead(vvl.v_vreg[0],  e);    
	setterCheckOnlyRead(vvl.v_vAin[0],  e);
	setterCheckOnlyRead(vvl.v_vLuin[0], e);
	setterRadioOnlyRead(vvl.v_vtLin[0], e);
	setterCheckOnlyRead(vvl.v_vTab[0],  e);
	setterCheckOnlyRead(vvl.v_vMuB[0],  e);    
	setterCheckOnlyRead(vvl.v_vMCon[0], e);
	setterCheckOnlyRead(vvl.v_vLCo[0],  e);
	setterCheckOnlyRead(vvl.v_vLam[0],  e);	
	setterCheckOnlyRead(vvl.v_vOt[0],   e);

	if(!e){
		addReadOnly(vvl.veCom); 			
	}
}*/


/* -- SETTER RESTRICCIONES -- */
/*function setterFormRetriccionesOnlyRead( e){
	setterRadioOnlyRead(vraa.vFact[0],  e);	
	setterCheckOnlyRead(vraa.v_restr[0],  e);
	
	if(!e){
		addReadOnly(vraa.vERc); 
		addReadOnly(vraa.veCom); 			
	}
}*/

/* -- SETTER RESUMENvobo -- */
/*function setterFormResuVoBoOnlyRead(e){
	setterRadioOnlyRead(vrvb.vSade[0], e);
	setterRadioOnlyRead(vrvb.vTade[0], e);
	setterCheckOnlyRead(vrvb.vAAI[0],  e);
	setterCheckOnlyRead(vrvb.vAire[0],  e);
	
	if(!e){
		addReadOnly(vrvb.veCom); 			
	}
}*/
