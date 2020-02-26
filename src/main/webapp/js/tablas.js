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
	   
		'<table cellpadding="1" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th class="center fblanco" center">&nbsp;</th>' +
					'<th class="gris negrita t12 center fblanco">No.</th>'  +
					'<th class="gris negrita t12 center fblanco">Gerente Expansi&oacute;n</th>'  +
					'<th class="gris negrita t12 center fblanco">Fecha recepci&oacute;n MD</th>'  +
					'<th class="gris negrita t12 center fblanco">Nombre de la tda</th>' +
					'<th class="gris negrita t12 fblanco">Regi&oacute;n</th>' +
					'<th class="gris negrita t12 fblanco">Categor&iacute;a</th>' +
					'<th class="gris negrita t12 fblanco">Puntuaci&oacute;n</th>' +
					'<th class="gris negrita t12 fblanco">VoBo inicial operaciones</th>' +
					'<th class="gris negrita t12 fblanco">Conteo auditor</th>' +
					'<th class="gris negrita t12 fblanco">Pregestor&iacute;a autorizada</th>' +
					'<th class="gris negrita t12 fblanco">Cita Levantamiento</th>' +
					'<th class="gris negrita t12 fblanco">Levantamiento</th>' +
					'<th class="gris negrita t12 fblanco">Layout</th>' +
					'<th class="gris negrita t12 fblanco">VoBo layout operaciones</th>' +
					'<th class="gris negrita t12 center fblanco">Presupuesto construcci&oacute;n</th>' +
					'<th class="gris negrita t12 center fblanco">Presupuesto auditor&iacute;a</th>' +
					'<th class="gris negrita t12 fblanco">VoBo final operaciones</th>' +
					'<th class="gris negrita t12 center fblanco">Venta estimada</th>' +
					'<th class="gris negrita t12 fblanco">Comité</th>' +
					'<th class="gris negrita t12 fblanco">Carga<br/>Doctos</th>' +
					'<th class="gris negrita t12 fblanco">Contrato firmado</th>' +
					'<th class="gris negrita t12 fblanco">CECO</th>' +
					'<th class="gris negrita t12 fblanco">Gestor&iacute;a</th>' +
					'<th class="gris negrita t12 fblanco">Correcci&oacute;n Construcci&oacute;n</th>' +
					'<th class="gris negrita t12 fblanco">Correcci&oacute;n Expansi&oacute;n</th>' +
					'<th class="gris negrita t12 fblanco">Inicio obra</th>' +
					'<th class="gris negrita t12 fblanco">Fin obra</th>' +
					'<th class="gris negrita t12 fblanco">Inauguraci&oacute;n</th>' +
					'<th class="gris negrita t12 fblanco">Inauguraci&oacute;n objetivo</th>' +
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
						   {"sClass":"tablero_celda","bSearchable":true},
						   {"sClass":"tablero_celda","bSearchable":false},
				           {"sClass":"tablero_celda","bSearchable":false},
				           {"sClass":"tablero_celda","bSearchable":true},
				           {"sClass":"tablero_celda", "bSearchable":true},
				           {"sClass":"imagen tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda","bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda","bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda","bSearchable":false},
				           {"sClass":"tablero_celda","bSearchable":false},
				           {"sClass":"tablero_celda","bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"tablero_celda", "bSearchable":false},
				           {"sClass":"oculto", "bSearchable": false },
				           {"sClass":"oculto", "bSearchable": true },
				           {"sClass":"oculto", "bSearchable": true },
				           {"sClass":"oculto", "bSearchable": true }],
			"bJQueryUI": false,
			"order": [],
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanolTablero,
			"bLengthChange":false,
			"iDisplayLength":2000,
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
			 					},{ "sType": 'numeric', "aTargets": [7] },
			 					{ "sType": 'extract-date', "aTargets": [2,3,8,10,11,12,17,19,20,21,22,23,24,25,26,27,29,30] }
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

function initTablaPerfiles(nombreDiv, datos, nombreTabla){
	
	$("#" + nombreDiv).html(
			   
			'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr class="fblanco" style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th class="gris negrita t14">ID Perfil</th>' +
					'<th class="gris negrita t14">Nombre del perfil</th>' +
					'<th class="gris negrita t14">Fecha de modificación</th>' +
					'<th class="gris negrita t14">Estatus</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
	
	tablaPerfiles = $("#" + nombreTabla).dataTable(
			{"aaData": datos,
				"aoColumns": [
				           {"sClass": "imagen height_30", "bSearchable":true},
				           {"sClass": "izquierda", "bSearchable":true},
				           {"bSearchable":false},
				           {"bSearchable":false},
				           ],		
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

function initTablaPerfilesDetalle(nombreDiv, datos, nombreTabla) {
	$("#" + nombreDiv).html(
			   
			'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr class="fblanco" style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th class="gris negrita t14">Módulo</th>' +
					'<th class="gris negrita t14">Submódulo</th>' +
					'<th class="gris negrita t14">Tipo</th>' +
					'<th class="gris negrita t14">Estatus</th>' +
					'<th class="oculto">id</th>' +
					'<th class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
	
	tablaPerfiles = $("#" + nombreTabla).dataTable(
			{"aaData": datos,
				"aoColumns": [
				           {"sClass": "imagen height_30", "bSearchable":true},
				           {"sClass": "izquierda", "bSearchable":true},
				           {"bSearchable":false},
				           {"bSearchable":false},
				           { "sClass": "oculto", "bSearchable": false },
				           { "sClass": "oculto", "bSearchable": false }
				           ],		
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

function initTablaUsuarios(nombreDiv, datosDesglose, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th  class="gris negrita t14 center">ID</th>'  +
					'<th  class="gris negrita t14">Nombre</th>' +
					'<th  class="gris negrita t14 center">Area</th>' +
					'<th class="gris negrita t14">Puesto</th>' +
					'<th class="gris negrita t14">Estatus</th>' +
					'<th class="gris negrita t14">Num</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
		
	tabla = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesglose,
				"aoColumns": [
					   	   {"sClass":"izquierda padding","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"sClass": "oculto", "bSearchable": false }],		
				          
				           "bJQueryUI": false,
							"order": [],
							"sPaginationType": "full_numbers",
							"oLanguage": idiomaEspanolGeneral,
							"bLengthChange":false,
							"iDisplayLength":1000,
							 "bScrollCollapse": false,
							 "sScrollY": "70vh",
							 "aoColumnDefs": [ {
									"sClass": "center",
									"aTargets": [ 0,2 ]
							}]		 
});	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

function initTablaUsuarios_Perfiles(nombreDiv, datosDesglose, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th  class="gris negrita t14">Nombre del Perfil</th>'  +
					'<th  class="gris negrita t14">Descripción</th>' +
					'<th  class="gris negrita t14">Estatus</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
		
	tabla = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesglose,
				"aoColumns": [
					   	   {"sClass":"izquierda padding","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true}],		
			"bJQueryUI": false,
			"order": [],
			"sPaginationType": "full_numbers",
			"oLanguage": idiomaEspanolGeneral,
			"bLengthChange":false,
			"iDisplayLength":1000,
			 "bScrollCollapse": false,
			 "sScrollY": "calc(100% - 60px)"
	});	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

function initTablaAsignarUsuarios(nombreDiv, datosDesglose, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th  class="gris negrita t14 center"></th>'  +
					'<th  class="gris negrita t14 center">ID usuario</th>'  +
					'<th  class="gris negrita t14">Nombre usuario</th>' +
					'<th  class="gris negrita t14 center">Area</th>' +
					'<th class="gris negrita t14">Puesto</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
		
	tabla = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesglose,
				"aoColumns": [
					   	   {"sClass":"izquierda padding","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true}],		
				          
				           "bJQueryUI": false,
							"order": [],
							"sPaginationType": "full_numbers",
							"oLanguage": idiomaEspanolGeneral,
							"bLengthChange":false,
							"iDisplayLength":1000,
							 "bScrollCollapse": false,
							 "sScrollY": "70vh",
							 "aoColumnDefs": [ {
									"sClass": "center",
									"aTargets": [ 0,2 ]
							}]		 
});	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}


function initTablaAsignarPerfiles(nombreDiv, datosDesglose, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border stripe hover" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th  class="gris negrita t14 center"></th>'  +
					'<th  class="gris negrita t14 center">ID</th>'  +
					'<th  class="gris negrita t14">Nombre perfil</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
		
	tabla = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesglose,
				"aoColumns": [
					   	   {"sClass":"izquierda padding","bSearchable":true},
				           {"sClass":"izquierda padding","bSearchable":true},
				           {"sClass":"izquierda padding","bSearchable":true}],		
				          
				           "bJQueryUI": false,
							"order": [],
							"sPaginationType": "full_numbers",
							"oLanguage": idiomaEspanolGeneral,
							"bLengthChange":false,
							"iDisplayLength":1000,
							 "bScrollCollapse": false,
							 "sScrollY": "70vh",
							 "aoColumnDefs": [ {
									"sClass": "center",
									"aTargets": [ 0,2 ]
							}]		 
});	
	$("#" + nombreTabla + "_DTTT_container").hide();
	$("#" + nombreTabla + "_paginate").hide();
	$("#" + nombreTabla + "_filter").hide();
}

var idiomaEspanolGeneral = {
	    "sEmptyTable":     "<div style='padding:10px; color:red; font-size:13px;'>No existen registros</div>",
	    "sInfo":           'Totales: <b>_TOTAL_</b>',
	    "sInfoEmpty":      "",
	    "sInfoFiltered":   "(_TOTAL_ de _MAX_ registros en total)",
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
	        "sSortDescending": ": activar para Ordenar Descendentemente"
	    }
	};

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