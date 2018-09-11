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
					'<th  class="gris negrita t14">Fecha de vencimiento</th>' +
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
				           {"sClass": "oculto mdId", "bSearchable": true }],		
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
			}, { "sType": 'extract-date', "aTargets": [4,5] } ]
			 
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
			},{ "sType": 'extract-date', "aTargets": [4,6] } ]
			 
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
			},{ "sType": 'extract-date', "aTargets": [4] } ]
			 
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
			}, { "sType": 'extract-date', "aTargets": [4,6] } ]
			 
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
			}, { "sType": 'extract-date', "aTargets": [4] } ]
			 
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
					'<th class="center" center" style="padding:0;background: #FFF;">&nbsp;</th>' +
					'<th width="5%" class="gris negrita t12 center" style="padding:0;background: #FFF;">No.</th>'  +
					'<th width="9%" class="gris negrita t12 center" style="padding:0;background: #FFF;">Gerente Expansi&oacute;n</th>'  +
					'<th width="9%" class="gris negrita t12 center" style="padding:0;background: #FFF;">Fecha recepci&oacute;n MD</th>'  +
					'<th width="20%" class="gris negrita t12 center" style="padding:0;background: #FFF;">Nombre de la tda</th>' +
					'<th width="4%" class="gris negrita t12">Regi&oacute;n</th>' +
					'<th width="4%" class="gris negrita t12">Categor&iacute;a</th>' +
					'<th width="4%" class="gris negrita t12">Puntuaci&oacute;n</th>' +
					'<th width="5%" class="gris negrita t12 ">VoBo inicial operaciones</th>' +
					'<th width="5%" class="gris negrita t12">Conteo auditor</th>' +
					'<th width="5%" class="gris negrita t12">Pregestor&iacute;a autorizada</th>' +
					'<th width="5%" class="gris negrita t12">Levantamiento realizado</th>' +
					'<th width="5%" class="gris negrita t12">VoBo layout operaciones</th>' +
					'<th width="5%" class="gris negrita t12 center">Presupuesto construcci&oacute;n</th>' +
					'<th width="5%" class="gris negrita t12 center">Presupuesto auditor&iacute;a</th>' +
					'<th width="5%" class="gris negrita t12">VoBo final operaciones</th>' +
					'<th width="5%" class="gris negrita t12 center">Venta estimada</th>' +
					'<th width="5%" class="gris negrita t12">Comité</th>' +
					'<th width="5%" class="gris negrita t12">Carga<br/>Doctos</th>' +
					'<th width="5%" class="gris negrita t12">Contrato firmado</th>' +
					'<th width="5%" class="gris negrita t12">CECO</th>' +
					'<th width="5%" class="gris negrita t12">Gestor&iacute;a</th>' +
					'<th width="7%" class="gris negrita t12">Inicio obra</th>' +
					'<th width="7%" class="gris negrita t12">Fin obra</th>' +
					'<th width="6%" class="gris negrita t12">Inauguraci&oacute;n</th>' +
					'<th width="6%" class="gris negrita t12">Inauguraci&oacute;n objetivo</th>' +
					'<th class="oculto">id</th>' +
					'<th class="oculto">id</th>' +
					'<th class="oculto">id</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
		
	tablaMemoriasTablero = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesgloseMemorias,
				"aoColumns": [
						   {"bSearchable":false},
						   {"sClass":"izquierda padding padding_right","bSearchable":true},
						   {"sClass":"izquierda padding","bSearchable":true},
				           {"sClass":"izquierda padding","bSearchable":true},
				           {"sClass":"izquierda padding","bSearchable":true},
				           {"sClass":"imagen padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"imagen padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"izquierda padding","bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"derecha","bSearchable":true},
				           {"sClass":"derecha","bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"derecha","bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"padding_right_5 padding_left_5", "bSearchable":true},
				           {"sClass":"oculto", "bSearchable": false },
				           {"sClass":"oculto", "bSearchable": true },
				           {"sClass":"oculto", "bSearchable": true },
				           {"sClass":"oculto", "bSearchable": true }],
			"bJQueryUI": false,
			"order": [],
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanolTablero,
			"bLengthChange":false,
			"iDisplayLength":1000,
			 "bScrollCollapse": false,
			 "sScrollY": "70vh",
			 "fixedColumns":   {
		            "leftColumns": 5
		        },
		     "scrollX":        true,
		     "scrollCollapse": true,
			 "aoColumnDefs": [ {
									"sClass": "center",
									"aTargets": [ 0,1 ]
			 					},{ "sType": 'extract-date', "aTargets": [2,3,7,9,10,11,14,16,17,18,19,20,21,22,23,24] }
			 			]
	});	
	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

function initTablaMemoriasAprobadas(nombreDiv, datos, nombreTabla){
	
	$("#" + nombreDiv).html(
			   
			'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
				'<th  class="gris negrita t14 center" style="padding:0;">Nombre MD</th>'  +
					'<th class="gris negrita t14">Responsable</th>' +
					'<th class="gris negrita t14">Estatus</th>' +
					'<th class="gris negrita t14">Autorizó</th>' +
					'<th class="gris negrita t14">Fecha compromiso</th>' +
					'<th class="gris negrita t14">Motivo</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
	
	tablaMemoriasAprobadas = $("#" + nombreTabla).dataTable(
			{"aaData": datos,
				"aoColumns": [{"sClass":"izquierda padding imagen","bSearchable":true},
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
	    						'<div class="col-10 col-lg-10 center">'+
	    	    					'<div class="row">'+
	    	    							'<div class="col-lg-2 col-2 center"  style="min-width:160px;margin-top: 3px;">'+
	    	    								'<div class="circle_atrasadas"></div><span class="t12" style="margin-left: 0px;">Fecha final atrasada</span>' + 
	    	    							'</div>'+
	    	    							'<div class="col-lg-2 col-2 center"  style="min-width:160px;margin-top: 3px;">'+
	    	    								'<img src="img/leyenda1.svg" width="16px" height="16px"/><span class="t12" style="margin-left: 5px;padding-top: 3px;">En tiempo</span>' + 
	    	    							'</div>'+
	    	    							'<div class="col-lg-2 col-2 center"  style="min-width:160px;margin-top: 3px;">'+
	    	    								'<img src="img/leyenda2.svg" width="16px" height="16px"/><span class="t12" style="margin-left: 5px;padding-top: 3px;">Atrasada</span>' + 
	    	    							'</div>'+
	    	    							'<div class="col-lg-2 col-2 center" style="min-width:160px;margin-top: 3px;">'+
	    	    								'<img src="img/leyenda3.svg" width="16px" height="16px"/><span class="t12" style="margin-left: 5px;padding-top: 3px;">Fecha estimada</span>' +
	    	    							'</div>'+
	    	    							'<div class="col-lg-2 col-2 center" style="min-width:160px;margin-top: 3px;">'+
    	    								    '<img src="img/leyenda4.svg" width="16px" height="16px"/><span class="t12" style="margin-left: 5px;padding-top: 3px;">Rechazada</span>' +
    	    							    '</div>'+
	    	    					'</div>' + 
	    	    				'</div>'+
	    	    			'<div class="col-2 col-lg-2 right"><span>Totales: <b>_TOTAL_</b></span></div>'+
	    				'</div>',
	    "sInfoEmpty":      "Totales: 0",
	    "sInfoFiltered":   "",
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

jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "extract-date-pre": function(value) {
        var date = $(value).text();
        date = date.split('/');
        return Date.parse(date[1] + '/' + date[0] + '/' + date[2])
    },
    "extract-date-asc": function(a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "extract-date-desc": function(a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});