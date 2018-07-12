function initTablaMemoriasAsignadas(nombreDiv, datosDesgloseVenta, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th  class="gris negrita t14 center" style="padding:0;">Nombre MD</th>'  +
					'<th  class="gris negrita t14">Categoría</th>' +
					'<th  class="gris negrita t14 center puntuacion" style="padding:0;">Puntuación</th>' +
					'<th class="gris negrita t14">Creador</th>' +
					'<th class="gris negrita t14">Fecha de creación</th>' +
					'<th  class="gris negrita t14">Fecha de vecimiento</th>' +
					'<th class="gris negrita t14">Mensajes</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
		
	tablaMemoriasAsignadas = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesgloseVenta,
				"aoColumns": [
						   {"sClass":"izquierda padding","bSearchable":true},
				           {"bSearchable":true},
				           {"sClass":"izquierda","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"sClass": "seguimiento","bSearchable":true},
				           {"sClass": "liga_chat","bSearchable":true},
				           {"sClass": "oculto mdId", "bSearchable": false }],		
			"bJQueryUI": false,
			"order": [],
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanol,
			"bLengthChange":false,
			"iDisplayLength":1000,
			 "bScrollCollapse": false,
			 "sScrollY": "70vh",
			 "aoColumnDefs": [ {
					"sClass": "center",
					"aTargets": [ 0,2 ]
			} ]
			 
	});	
	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

function initTablaMemoriasAutorizadas(nombreDiv, datosDesgloseVenta, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
			'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
				'<th  class="gris negrita t14 center" style="padding:0;">Nombre MD</th>'  +
					'<th class="gris negrita t14">Categoría</th>' +
					'<th  class="gris negrita t14 center puntuacion" style="padding:0;">Puntuación</th>' +
					'<th class="gris negrita t14">Creador</th>' +
					'<th class="gris negrita t14">Fecha de creación</th>' +
					'<th class="gris negrita t14">Autorizó</th>' +
					'<th class="gris negrita t14">Fecha Autorización</th>' +
					'<th class="gris negrita t14">Tipo</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
	
	tablaMemoriasAutorizadas = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesgloseVenta,
				"aoColumns": [{"sClass":"izquierda padding","bSearchable":true},
				           {"bSearchable":true},
				           {"sClass":"izquierda","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           { "sClass": "oculto", "bSearchable": false }],		
			"bJQueryUI": false,
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanol,
			"bLengthChange":false,
			"order": [],
			"iDisplayLength":1000,
			 "bScrollCollapse": false,
			 "sScrollY": "70vh",
			 "aoColumnDefs": [ {
					"sClass": "center",
					"aTargets": [ 0,2 ]
			} ]
			 
	});	
	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

function initTablaMemoriasAutorizadasDirGeneral(nombreDiv, datosDesgloseVenta, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
			'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
				'<th  class="gris negrita t14 center" style="padding:0;">Nombre MD</th>'  +
					'<th class="gris negrita t14">Categoría</th>' +
					'<th  class="gris negrita t14 center puntuacion" style="padding:0;">Puntuación</th>' +
					'<th class="gris negrita t14">Creador</th>' +
					'<th class="gris negrita t14">Fecha de creación</th>' +
					'<th class="gris negrita t14">Tipo de Autorización</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
	
	tablaMemoriasAutorizadasDirGeneral = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesgloseVenta,
				"aoColumns": [{"sClass":"izquierda padding","bSearchable":true},
				           {"bSearchable":true},
				           {"sClass":"izquierda","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           { "sClass": "oculto", "bSearchable": false }],		
			"bJQueryUI": false,
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanol,
			"bLengthChange":false,
			"order": [],
			"iDisplayLength":1000,
			 "bScrollCollapse": false,
			 "sScrollY": "70vh",
			 "aoColumnDefs": [ {
					"sClass": "center",
					"aTargets": [ 0,2 ]
			} ]
			 
	});	
	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

function initTablaMemoriasRechazadas(nombreDiv, datosDesgloseVenta, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
			'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
				'<th  class="gris negrita t14 center" style="padding:0;">Nombre MD</th>'  +
					'<th class="gris negrita t14">Categoría</th>' +
					'<th  class="gris negrita t14 center puntuacion" style="padding:0;">Puntuación</th>' +
					'<th class="gris negrita t14">Creador</th>' +
					'<th class="gris negrita t14">Fecha de creación</th>' +
					'<th class="gris negrita t14">Rechazó</th>' +
					'<th class="gris negrita t14">Fecha de Rechazo</th>' +
					'<th class="gris negrita t14">Motivo</th>' +
					'<th class="gris negrita t14">Tipo</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
	
	tablaMemoriasRechazadas = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesgloseVenta,
				"aoColumns": [{"sClass":"izquierda padding","bSearchable":true},
				           {"bSearchable":true},
				           {"sClass":"izquierda","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           { "sClass": "oculto", "bSearchable": false }],		
			"bJQueryUI": false,
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanol,
			"bLengthChange":false,
			"order": [],
			"iDisplayLength":1000,
			 "bScrollCollapse": false,
			 "sScrollY": "70vh",
			 "aoColumnDefs": [ {
					"sClass": "center",
					"aTargets": [ 0,2 ]
			} ]
			 
	});	
	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}


function initTablaMemoriasRechazadasDirGeneral(nombreDiv, datosDesgloseVenta, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
			'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
				'<th  class="gris negrita t14 center" style="padding:0;">Nombre MD</th>'  +
					'<th class="gris negrita t14">Categoría</th>' +
					'<th  class="gris negrita t14 center puntuacion" style="padding:0;">Puntuación</th>' +
					'<th class="gris negrita t14">Creador</th>' +
					'<th class="gris negrita t14">Fecha de creación</th>' +
					'<th class="gris negrita t14">Area</th>' +
					'<th class="gris negrita t14">Tipo</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
	
	tablaMemoriasRechazadas = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesgloseVenta,
				"aoColumns": [{"sClass":"izquierda padding","bSearchable":true},
				           {"bSearchable":true},
				           {"sClass":"izquierda","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"sClass": "motivos","bSearchable":true},
				           {"bSearchable":true},
				           { "sClass": "oculto", "bSearchable": false }],		
			"bJQueryUI": false,
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanolDirRechazadas,
			"bLengthChange":false,
			"order": [],
			"iDisplayLength":1000,
			 "bScrollCollapse": false,
			 "sScrollY": "70vh",
			 "aoColumnDefs": [ {
					"sClass": "center",
					"aTargets": [ 0,2 ]
			} ]
			 
	});	
	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

function initTablaMemoriasTablero(nombreDiv, datosDesgloseMemorias, nombreTabla) {
	
	$("#" + nombreDiv).html(
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th width="5%" class="gris negrita t12 center" style="padding:0;background: #FFF;">No.</th>'  +
					'<th width="10%" class="gris negrita t12 center txt_expansion" style="padding:0;background: #FFF;">Fecha recepci&oacute;n MD</th>'  +
					'<th width="10%" class="gris negrita t12 txt_expansion">Fuente MD</th>' +
					'<th width="10%" class="gris negrita t12 txt_expansion">Nombre de la tda</th>' +
					'<th width="5%" class="gris negrita t12 txt_auditoria">Conteo auditor</th>' +
					'<th width="5%" class="gris negrita t12 txt_suditoria">Pregestor&iacute;a autorizada</th>' +
					'<th width="5%" class="gris negrita t12 txt_construccion">Levantamiento realizado</th>' +
					'<th width="5%" class="gris negrita t12 txt_operaciones">VoBo layout por operaciones</th>' +
					'<th width="5%" class="gris negrita t12 center txt_construccion">Monto presupuesto obra construcci&oacute;n</th>' +
					'<th width="5%" class="gris negrita t12 center txt_auditoria">Presupuesto auditor&iacute;a</th>' +
					'<th width="5%" class="gris negrita t12 txt_gestoria">Gestor&iacute;a</th>' +
					'<th width="5%" class="gris negrita t12 txt_operaciones">VoBo final de operaciones del sitio</th>' +
					'<th width="5%" class="gris negrita t12 txt_expansion">Contrato firmado arrendador</th>' +
					'<th width="7%" class="gris negrita t12 txt_construccion">Inicio obra</th>' +
					'<th width="7%" class="gris negrita t12 txt_construccion">Fin obra</th>' +
					'<th width="6%" class="gris negrita t12">Inauguraci&oacute;n</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
		
	tablaMemoriasTablero = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesgloseMemorias,
				"aoColumns": [
							{"sClass":"izquierda padding padding_right","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"sClass":"derecha","bSearchable":true},
				           {"sClass":"derecha","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           { "sClass": "oculto", "bSearchable": false }],		
			"bJQueryUI": false,
			"order": [],
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanolTablero,
			"bLengthChange":false,
			"iDisplayLength":1000,
			 "bScrollCollapse": false,
			 "sScrollY": "70vh",
			 "fixedColumns":   {
		            "leftColumns": 2
		        },
		     "scrollX":        true,
		     "scrollCollapse": true,
			 "aoColumnDefs": [ {
					"sClass": "center",
					"aTargets": [ 0,2 ]
			} ]
			 
	});	
	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

var idiomaEspanol = {
	    "sEmptyTable":     "<div style='padding:10px; color:red; font-size:13px;'>No existen memorias descriptivas</div>",
	    "sInfo":           '<div class="col-12 fazul blanco right">Totales: <b>_TOTAL_</b></div>',
	    "sInfoEmpty":      "Totales: 0",
	    "sInfoFiltered":   "(_TOTAL_ de _MAX_ memorias en total)",
	    "sInfoPostFix":    "",
	    "sInfoThousands":  ",",
	    "sLengthMenu":     "",
	    "sLoadingRecords": "Cargando...",
	    "sProcessing":     "Procesando...",
	    "sSearch":         "",
	    "sZeroRecords":    "No se encontraron resultados",
	    "oPaginate": {
	        "sFirst":    "Primero",
	        "sLast":     "Último",
	        "sNext":     "&raquo;",
	        "sPrevious": "&laquo;"
	    },
	    "oAria": {
	        "sSortAscending":  ": activar para Ordenar Ascendentemente",
	        "sSortDescending": ": activar para Ordendar Descendentemente"
	    }
	};

var idiomaEspanolDirRechazadas = {
	    "sEmptyTable":     "<div style='padding:10px; color:red; font-size:13px;'>No existen memorias descriptivas</div>",
	    "sInfo":           '<div class="row fazul blanco" style="padding-bottom:3px;">'+
	    						'<div class="col-xl-6 col-lg-9 center">'+
	    						'<div class="row">'+
	    								'<div class="col-xl-3 col-6 center"  style="min-width:160px;">'+
	    								'<span><img src="img/b_expansion.png"></span>&nbsp;'+'<span style="margin-left:10px;">Expansión</span></div>'+
	    								'<div class="col-xl-3 col-6 center"  style="min-width:160px;">'+
	    								'<span><img src="img/b_gestoria.png"></span>&nbsp;'+'<span style="margin-left:10px;">Gestoría</span></div>'+
	    								'<div class="col-xl-3 col-6 center"  style="min-width:160px;">'+
	    								'<span><img src="img/b_construccion.png"></span>&nbsp;'+'<span style="margin-left:10px;">Construcción</span></div>'+
	    								'<div class="col-xl-3 col-6 center" style="min-width:160px;">'+
	    								'<span><img src="img/b_operaciones.png"></span>&nbsp;'+'<span style="margin-left:10px;">Operaciones</span></div>'+
	    						'</div></div>'+
	    							'<div class="col-xl-6 col-lg-3 right">Totales: <b>_TOTAL_</b></div>'+
	    					'</div>',
	    							
	    				
	    "sInfoEmpty":      "Totales: 0",
	    "sInfoFiltered":   "(_TOTAL_ de _MAX_ memorias en total)",
	    "sInfoPostFix":    "",
	    "sInfoThousands":  ",",
	    "sLengthMenu":     "",
	    "sLoadingRecords": "Cargando...",
	    "sProcessing":     "Procesando...",
	    "sSearch":         "",
	    "sZeroRecords":    "No se encontraron resultados",
	    "oPaginate": {
	        "sFirst":    "Primero",
	        "sLast":     "Último",
	        "sNext":     "&raquo;",
	        "sPrevious": "&laquo;"
	    },
	    "oAria": {
	        "sSortAscending":  ": activar para Ordenar Ascendentemente",
	        "sSortDescending": ": activar para Ordendar Descendentemente"
	    }
	};

var idiomaEspanolTablero = {
	    "sEmptyTable":     "<div style='padding:10px; color:red; font-size:13px;'>No existen memorias descriptivas</div>",
	    "sInfo":           '<div class="row fazul blanco" style="padding-bottom:3px;">'+
	    						'<div class="col-xl-9 col-lg-9 center">'+
	    						'<div class="row">'+
	    								'<div class="col-xl-2 col-6 center"  style="min-width:160px;">'+
	    								'<div class="circle_expansion"><span class="t12" style="margin-left: 20px;">Expansión</span></div></div>'+
	    								'<div class="col-xl-2 col-6 center"  style="min-width:160px;">'+
	    								'<div class="circle_gestoria"><span class="t12" style="margin-left: 20px;">Gestoría</span></div></div>'+
	    								'<div class="col-xl-2 col-6 center"  style="min-width:160px;">'+
	    								'<div class="circle_operaciones"><span class="t12" style="margin-left: 20px;">Operaciones</span></div></div>'+
	    								'<div class="col-xl-2 col-6 center" style="min-width:160px;">'+
	    								'<div class="circle_auditoria"><span class="t12" style="margin-left: 20px;">Auditoría</span></div></div>'+
	    								'<div class="col-xl-4 col-6 center" style="min-width:160px;">'+
	    								'<div class="circle_construccion"><span class="t12" style="margin-left: 20px;">Construcción</span></div></div>'+
	    						'</div></div>'+
	    							'<div class="col-xl-3 col-lg-3 right">Totales: <b>_TOTAL_</b></div>'+
	    					'</div>',
	    							
	    				
	    "sInfoEmpty":      "Totales: 0",
	    "sInfoFiltered":   "(_TOTAL_ de _MAX_ memorias en total)",
	    "sInfoPostFix":    "",
	    "sInfoThousands":  ",",
	    "sLengthMenu":     "",
	    "sLoadingRecords": "Cargando...",
	    "sProcessing":     "Procesando...",
	    "sSearch":         "",
	    "sZeroRecords":    "No se encontraron resultados",
	    "oPaginate": {
	        "sFirst":    "Primero",
	        "sLast":     "Último",
	        "sNext":     "&raquo;",
	        "sPrevious": "&laquo;"
	    },
	    "oAria": {
	        "sSortAscending":  ": activar para Ordenar Ascendentemente",
	        "sSortDescending": ": activar para Ordendar Descendentemente"
	    }
	};