$(function(){
	
	inicializaGrantt();
	
});
function inicializaGrantt(){
	function stopEvent(event) {
		event.preventDefault();
		event.stopPropagation();
	}
	
	var tasks = [
		{
			    id: 'nombreMd',
			    name: 'Zemtrumx',
			    start: '2018-07-13',
			    end: '2018-07-30',
			    progress: 100
			   
	  },
	  {
	    id: 'idGerenteExpansion',
	    name: 'Gerente de Expansion &nbsp; (27 días)',
	    start: '2018-07-13',
	    end: '2018-07-18',
	    progress: 0,
	    custom_class: 'accion verde' // optional
	   
	  },
	  {
		    id: 'idExpansion',
		    name: 'Expansion  &nbsp; (10 días)',
		    start: '2018-07-18',
		    end: '2018-07-25',
		    progress: 0,
		    dependencies:'idGerenteExpansion',
		    custom_class: 'accion verde' // optional
		},
		{
			    id: 'idGestoria',
			    name: 'Gestoría &nbsp; (5 días)',
			    start: '2018-07-25',
			    end: '2018-07-30',
			    progress: 0,
			    dependencies: 'idExpansion',
			    custom_class: 'accion verde' // optional
		},
		{
		    id: 'idConstruccion',
		    name: 'Construccion &nbsp; (27 días)',
		    start: '2018-07-25',
		    end: '2018-07-30',
		    progress: 0,
		    dependencies: 'idExpansion',
		    custom_class: 'accion rojo' // optional
	},
		{
		    id: 'idOperaciones',
		    name: 'Operaciones &nbsp; (15 días)',
		    start: '2018-07-25',
		    end: '2018-07-30',
		    progress: 0,
		    dependencies: 'idExpansion',
		    custom_class: 'accion verde' // optional
	}
	  
	]
	var gantt = new Gantt("#gantt", tasks, {
	    header_height: 45, //alto de cabecera (dias, meses)
	    column_width: 30, //?
	    step: 24,
	    view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
	    bar_height: 25,
	    bar_corner_radius: 2,
	    arrow_curve: 3,
	    padding: 15,
	    view_mode: 'Day',   
	    date_format: 'YYYY-MM-DD',
	    on_view_change: function() {
			var bars = document.querySelectorAll("#gantt" + " .bar-group");
			for (var i = 0; i < bars.length; i++) {
				bars[i].addEventListener("mousedown", stopEvent, true);
			}
			var handles = document.querySelectorAll("#gantt" + " .handle-group");
			for (var i = 0; i < handles.length; i++) {
				handles[i].remove();
			}
		},
		custom_popup_html: null
	});

	$('.accion').click(function() {
	});
}
