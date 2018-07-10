$(function(){
	$('#idtablero').addClass('resaltado');
	inicializaCalendarios();
	
	if($( "#datepicker1").val()!='')
		creatabla();
	
	$( "#datepicker1").change(function() {
		creatabla();
	});
	
	$("#descargaExcelAsignadas").click(function() {
		$("#datos").val(JSON.stringify(datosExcel));
		$("#submitBotonAsignadas").click();
	});
	
});

function inicializaCalendarios() {
	$(".ui-datepicker-trigger").hide();
	
	var dateHoy = new Date();
	var FECHA_HOY = $.datepicker.formatDate('dd/mm/yy',dateHoy);
	
	$( "#datepicker1").datepicker({
		maxDate:0,
		autoSize : true,
		showOn: 'both',
		showAnim: 'slideDown',
        buttonImageOnly: true,
        onClose: function( selectedDate ) {
			var date = $(this).datepicker('getDate');			
			var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }
	});
	
	$("#datepicker1").datepicker.dateFormat = 'dd/MM/yy';
//	$("#datepicker1").val('01/05/2018'); //TODO remove
}

function creatabla(){
	
	invocarJSONServiceAction("asignadas_info", 
				{'fechaConsulta': $( "#datepicker1").val()}, 
				'obtieneMdsResponse', 
				function() {
					//Funcion de error
					
					cierraLoading();
				},
				function() {
					//Función al finalizar
					
					cierraLoading();
				});
	
	obtieneMdsResponse = function( data ) {
		
		
		if(data.codigo != 200) {
			cargaMensajeModal('Memorias descriptivas', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
			$("#descargaExcelMemorias").hide();
			initTablaMemoriasAsignadas('DivTablaAsignadas', 0, 'tablaMemoriasAsignadas');
		} else {
			//var resultados = data.mds;
			var resultados = new Array();
			
			datosExcel = data;
			$("#descargaExcelMemorias").show();
			var datosMemorias = new Array();
			
			resultados.push({numero:1, fechaRecepcion: "06/06/2018", fuenteMd: "Expansion", nombreTda: "Amapolas Puerto", conteoAuditor: 188, pregestoriaAutorizada: "Si", levantamientoRealizado: "Si", voboLayoutOperaciones: "Si", montoPresupuestoObraCons: 2156427, presupuestoAuditoria: 123456, gestoria: "Si", voboFinalOperaciones: "Si", contratoFirmado: "Si", inicioObra: "09/07/2018", terminacionObra: "09/12/2018", inauguracion: "10/12/2018"});
			resultados.push({numero:2, fechaRecepcion: "06/06/2018", fuenteMd: "Expansion", nombreTda: "Amapolas Puerto", conteoAuditor: 188, pregestoriaAutorizada: "Si", levantamientoRealizado: "Si", voboLayoutOperaciones: "Si", montoPresupuestoObraCons: 2156427, presupuestoAuditoria: 123456, gestoria: "Si", voboFinalOperaciones: "Si", contratoFirmado: "Si", inicioObra: "09/07/2018", terminacionObra: "09/12/2018", inauguracion: "10/12/2018"});
			resultados.push({numero:3, fechaRecepcion: "06/06/2018", fuenteMd: "Expansion", nombreTda: "Amapolas Puerto", conteoAuditor: 188, pregestoriaAutorizada: "Si", levantamientoRealizado: "Si", voboLayoutOperaciones: "Si", montoPresupuestoObraCons: 2156427, presupuestoAuditoria: 123456, gestoria: "Si", voboFinalOperaciones: "Si", contratoFirmado: "Si", inicioObra: "09/07/2018", terminacionObra: "09/12/2018", inauguracion: "10/12/2018"});
			resultados.push({numero:4, fechaRecepcion: "06/06/2018", fuenteMd: "Expansion", nombreTda: "Amapolas Puerto", conteoAuditor: 188, pregestoriaAutorizada: "Si", levantamientoRealizado: "Si", voboLayoutOperaciones: "Si", montoPresupuestoObraCons: 2156427, presupuestoAuditoria: 123456, gestoria: "Si", voboFinalOperaciones: "Si", contratoFirmado: "Si", inicioObra: "09/07/2018", terminacionObra: "09/12/2018", inauguracion: "10/12/2018"});
			
			
			for( var i = 0 ; i < resultados.length; i++){
				
				
				datosMemorias[i] = new Array();	 	 		 			 
				datosMemorias[i][0] = "<span style='"  + "'>" + resultados[i].numero + "</span>"; 
				datosMemorias[i][1] = "<span style='"  + "'>" + resultados[i].fechaRecepcion + "</span>";
				datosMemorias[i][2] = "<span style='"  + "'>" + resultados[i].fuenteMd + "</span>";
				datosMemorias[i][3] = "<span style='"  + "'>" + resultados[i].nombreTda + "</span>";
				datosMemorias[i][4] = "<span style='"  + "'>" + resultados[i].conteoAuditor + "</span>";
				datosMemorias[i][5] = "<span style='"  + "'>" + resultados[i].pregestoriaAutorizada + "</span>";
				datosMemorias[i][6] = "<span style='"  + "'>" + resultados[i].levantamientoRealizado + "</span>";
				datosMemorias[i][7] = "<span style='"  + "'>" + resultados[i].voboLayoutOperaciones + "</span>";
				datosMemorias[i][8] = "<span style='"  + "'>$ " + formato(resultados[i].montoPresupuestoObraCons, true) + "</span>";
				datosMemorias[i][9] = "<span style='"  + "'>$ " + formato(resultados[i].presupuestoAuditoria, true) + "</span>";
				datosMemorias[i][10] = "<span style='"  + "'>" + resultados[i].gestoria + "</span>";
				datosMemorias[i][11] = "<span style='"  + "'>" + resultados[i].voboFinalOperaciones + "</span>";
				datosMemorias[i][12] = "<span style='"  + "'>" + resultados[i].contratoFirmado + "</span>";
				datosMemorias[i][13] = "<span style='"  + "'>" + resultados[i].inicioObra + "</span>";
				datosMemorias[i][14] = "<span style='"  + "'>" + resultados[i].terminacionObra + "</span>";
				datosMemorias[i][15] = "<span style='"  + "'>" + resultados[i].inauguracion + "</span>";
			 }
			
			initTablaMemoriasTablero('DivTablaTablero', datosMemorias, 'tablaMemoriasTablero');
		}
	};	
}

function ejecutaBusquedaAsignadas() {
	$("#tablaMemoriasAsignadas").dataTable().fnFilter($("#buscador").val());
}