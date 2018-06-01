function initTablaMemoriasAsignadas(nombreDiv, datosDesgloseVenta, nombreTabla){
	
	$("#" + nombreDiv).html(
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th width="20%"  class="headerTable_flat">Nombre MD</th>'  +
					'<th width="10%"  class="headerTable_flat" style="text-align: center;">Categoría</th>' +
					'<th width="10%"  class="headerTable_flat">Puntuación</th>' +
					'<th width="20%"  class="headerTable_flat">Creador</th>' +
					'<th width="17%"  class="headerTable_flat">Fecha de creación</th>' +
					'<th width="18%"  class="headerTable_flat">Fecha de vecimiento</th>' +
					'<th width="5%"  class="headerTable_flat">Mensajes</th>' +
					'<th width="5%"  class="oculto">id</th>' +
				'</tr>'+
			'</thead>' +
			'<tbody>'  +			
            '</tbody>' +
        '</table>');
		
	tablaMemoriasAsignadas = $("#" + nombreTabla).dataTable(
			{"aaData": datosDesgloseVenta,
				"aoColumns": [{"sClass":"izquierda","bSearchable":true},
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
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th class="headerTable_flat">Nombre MD</th>'  +
					'<th class="headerTable_flat" style="text-align: center;">Categoría</th>' +
					'<th class="headerTable_flat">Puntuación</th>' +
					'<th class="headerTable_flat">Creador</th>' +
					'<th class="headerTable_flat">Fecha de creación</th>' +
					'<th class="headerTable_flat">Autorizó</th>' +
					'<th class="headerTable_flat">Fecha Autorización</th>' +
					'<th class="headerTable_flat">Tipo</th>' +
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
	   
		'<table cellpadding="0" cellspacing="0" border="0px"  class="row-border" id="' + nombreTabla + '" >' +
			'<thead>'  +
				'<tr style="cursor: pointer;border-top: 0px; border-bottom: 0px;">' +
					'<th class="headerTable_flat">Nombre MD</th>'  +
					'<th class="headerTable_flat" style="text-align: center;">Categoría</th>' +
					'<th class="headerTable_flat">Puntuación</th>' +
					'<th class="headerTable_flat">Creador</th>' +
					'<th class="headerTable_flat">Fecha de creación</th>' +
					'<th class="headerTable_flat">Autorizó</th>' +
					'<th class="headerTable_flat">Fecha Autorización</th>' +
					'<th class="headerTable_flat">Tipo</th>' +
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