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
				"aoColumns": [{"sClass":"izquierda","bSearchable":true},
				           {"bSearchable":true},
				           {"sClass":"izquierda","bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           {"bSearchable":true},
				           { "sClass": "oculto", "bSearchable": false }],		
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
				"aoColumns": [{"sClass":"izquierda","bSearchable":true},
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
				"aoColumns": [{"sClass":"izquierda","bSearchable":true},
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
				"aoColumns": [{"sClass":"izquierda","bSearchable":true},
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

var idiomaEspanol = {
	    "sEmptyTable":     "<div style='padding:10px; color:red; font-size:13px;'>No existen memorias descriptivas</div>",
	    "sInfo":           "Totales: <b>_TOTAL_</b>",
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