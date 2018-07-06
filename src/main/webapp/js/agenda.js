var mes;
var año;
var dia;
var ultimoDia;
var posicionSemana;
var meses_letra = ["","Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var fecha_datep;
var perfil;
$(function(){
	$('#idagenda').addClass('resaltado');
	perfil=$('#perfil_usuario').val();
	inicializaCalendarios();
	calculaFechaActual();
	llenaPersonal();
	llenaEventos();

	if(perfil!='3'){
		$('#crear_evento').show();
	}
});

// --------------------------- CALENDARIO
function calculaFechaActual(){
	var date = new Date();
	mes=date.getMonth()+1;
	año=date.getFullYear();
	
	calcula_Días();	
}

function calcula_Días(){
	ultimoDia = new Date(año, mes, 0).getDate();
	var dt = new Date(mes+' '+'01'+' '+año);
	posicionSemana=dt.getUTCDay();	
	
	if(posicionSemana==0)
	posicionSemana=7;
			
	armaAgenda();
}

function armaAgenda(){
	
	$('#mesCabecera').text(meses_letra[mes]+" "+año);
	
	var fecha="01"+"/"+mes+"/"+año;
	invocarJSONServiceAction("obtieneAgenda", {"fecha":fecha, "tipoEvento":'0', "apartirDe":"0"},
			'obtieneAgenda', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneAgenda = function( data ) {
	if(data.codigo != 200){ //arma agenda vacia
		creaAgendaVacia();
		//cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	else{ //arma agenda con valores
		
		html=''
			var contador=1;
			var contadordías=1;
				
			for(var i=0;contadordías<ultimoDia;i++){
			html=html+'<tr>';
				for(var cont=0;cont<7;cont++){
					
					if(contador>=posicionSemana && contadordías<=ultimoDia){
						
						html=html+'<td>';
						html=html+'<div class="row center gris">'+contadordías+'</div>';
						html=html+'<div class="row contenido">';
						
						for(var i=0;i<data.agenda.length;i++){
							var nombreEvento=data.agenda[i].nombre;
							var eventoId=data.agenda[i].eventoId;
							var idusuario=data.agenda[i].usuarioAsignaId;
							
							var ubicacion=data.agenda[i].lugar;
							var participantes=data.agenda[i].listaUsuariosAsignados;
							var fechainicial=(data.agenda[i].fechaCompleta).substring(0,10);
							var horainicial=data.agenda[i].tiempoInicio;
							var fechafinal=(data.agenda[i].fechaCompletaFinal).substring(0,10);
							var horafinal=data.agenda[i].tiempoFinal;
							var descripcion=nombreEvento+" "+ubicacion;
							var asignadopor=data.agenda[i].nombreUsuarioAsigna;
							
							
							var espacio=asignadopor.indexOf(" ");
							var abreviacion=asignadopor[0]+asignadopor[espacio+1];
							
							if(data.agenda[i].diaMes==contadordías){
													
								html=html+'<div class="col-12 personal_'+idusuario+' ocultableEvento'+eventoId+'">';
								html=html+'<a tabindex="0" class="agenda_link" data-toggle="popover" data-trigger="focus" data-placement="bottom" '+
								'data-content="'+
								"<div class='col-12 blanco center negrita t12'>"+nombreEvento+"</div>"+
								"<div class='row'>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Ubicacion</div>"+
									ubicacion+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Participantes</div>";
									html=html+"<div class='particip'>";		
										for(var x=0;x<participantes.length;x++){
											html=html+"<div class='t12'>"+participantes[x].nombre+"</div>";										
										}
									html=html+"</div>";	
									html=html+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Fecha inicial</div>"+
									fechainicial+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Hora inicial</div>"+
									horainicial+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Fecha final</div>"+
									fechafinal+"</div>"+
									"<div class='col-6 t12 blanco'>"+
									"<div class='negrita sub'>Hora final</div>"+
									horafinal+"</div>"+
									"<div class='col-12 t12 blanco'>"+
									"<div class='negrita sub'>Descripción</div>"+
									descripcion+"</div>"+
									"<div class='col-12 t12 blanco'>"+
									"<div class='negrita sub'>Asignado por</div>"+
									asignadopor+"</div>"+
								"</div>"+
								'">';
								
								html=html+'<div class="circulo float_left back_'+eventoId+'">'+abreviacion+'</div>';
								html=html+'<div class="t10 gris texto_circulo">'+nombreEvento+'</div></a>';
								
								html=html+'</div>';
							}
							
						}	
						
						html=html+'</div>';
						html=html+'</td>';
						
						contadordías++;
					}
					else{
					html=html+'<td></td>';
					}
					contador++;
				}	
				
			html=html+'</tr>';
			}
			$('#cuerpoTabla').text('');
			$('#cuerpoTabla').append(html);	
			
			$('.agenda_link').popover({
				 	html:true,
			    });  

			
	}
	}
}

function creaAgendaVacia(){
	html=''
		var contador=1;
		var contadordías=1;
			
		for(var i=0;contadordías<ultimoDia;i++){
		html=html+'<tr>';
			for(var cont=0;cont<7;cont++){
				if(contador>=posicionSemana && contadordías<=ultimoDia){
					
					html=html+'<td>';
					html=html+'<div class="row center gris">'+contadordías+'</div>';
					html=html+'<div class="row contenido">';
					
					html=html+'</div>';
					html=html+'</td>';
					
					contadordías++;
				}
				else{
				html=html+'<td></td>';
				}
				contador++;
			}	
		html=html+'</tr>';
		}
		$('#cuerpoTabla').text('');	
		$('#cuerpoTabla').append(html);	
	
}

function botonNext(){
	if(mes<12){
		mes++;
	}
	else{
		mes=1;
		año++;
	}
	
	calcula_Días();	
}
function botonPrev(){
	if(mes>1){
		mes--;
	}
	else{
		año--;
		mes=12;
	}
	calcula_Días();
}
// ---------------------------------------------------------------
// ------------------------------------------ INICIALIZA DATEPICKERS
var tabla_participantes;
function inicializaCalendarios(){
	
	tabla_participantes=$('#tabla_participantes').DataTable({
		"aoColumns": [
			   {"sClass":"oculto"},
	           {"":""},
	           {"sClass":"cerrar negrita"}],
		"scrollY": "150px",
		"scrollCollapse": true,
		 "searching": false,
		 "paging": false,
		 "info":false,
		 "ordering": false,
		 "language": {
		      "emptyTable": "",
		      "zeroRecords": ""
		    }
	 });
	
// crear evento
	$('#hinicial').datetimepicker({
        format: 'LT'
    });
	
	$('#finicial').datetimepicker({
        format: 'L'
    });
	
	$('#hfinal').datetimepicker({
        format: 'LT'
    });
	
	$('#ffinal').datetimepicker({
        format: 'L'
    });
	
	
// calendario izquierda
	$('#embeddingDatePicker').datepicker({
		setDate : new Date(),
		format : 'dd/mm/yyyy',
		autoclose : true,
		language : 'es',
		todayHighlight : true
    }).on('changeDate', function(e) {
	    	$("#selectedDate").val($("#embeddingDatePicker").datepicker('getFormattedDate'));
	    	
	    	fecha_datep=$("#selectedDate").val();
	    	
	    	var tempdia=fecha_datep.substring(0,2);
	    	var tempmes=fecha_datep.substring(3,5);
	    	var tempaño=fecha_datep.substring(6,10);
	    	var date=new Date(tempmes+' '+tempdia+' '+tempaño);
	    	mes=date.getMonth()+1;
	    	año=date.getFullYear();
	    	
	    	calcula_Días();
	    });
}
// ------------------------------------- LLENA PANEL IZQUIERDO
function llenaPersonal(){
	
	 $.ajax({
	        type     : "POST",
	        url      : 'obtieneEmpleados',
	        data     : {},
	        async	 : false,
	        beforeSend : function(){
	        	cargaLoading();
	        },
	        success  : function(data) {
	        	cierraLoading();
	        	
	        	if(data.codigo != 200){
	        		cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
	        		}
	        	if(data.codigo==200) {
	        		$('#personal').text('');
	        		data_personal=data;
	        		
	        		var arregloAreas=Object.keys(data.empleados);
	        		var arregloSuperior;
	        		var arregloPuestos;
	        		
	        		var llenaAreas='';
	        		html='';
	        		html=html+'<div class="row">';
	        		
	        		for(var i=0;i<arregloAreas.length;i++){ 	

	        			arregloPuestos= Object.keys(data.empleados[arregloAreas[i]]);
	        				
	        			html=html+'<div class="col-12">';
	        			html=html+'<div class="t12 gris negrita">'+arregloAreas[i]+'</div>';
	        			html=html+'</div>';
	        			
	        			for(var a=0; a<arregloPuestos.length;a++){ 
	        				if(arregloPuestos[a]!="AREAID"){
	        					
	        			
	        				html=html+'<div class="col-12">';
	        				html=html+'<div class="t12 gris negrita">'+arregloPuestos[a]+'</div>';
	        				html=html+'</div>';
	        				for(var emp=0;emp<data.empleados[arregloAreas[i]][arregloPuestos[a]].length;emp++){ //llena la lista de personal
	        					var nombre=data.empleados[arregloAreas[i]][arregloPuestos[a]][emp].nombre;
	        					var id=data.empleados[arregloAreas[i]][arregloPuestos[a]][emp].empleadoId;
	        					var espacio=nombre.indexOf(" ");
	        					var abreviacion=nombre[0]+nombre[espacio+1];
	        					
	        					html=html+'<div class="col-12 cursor" id="'+id+'" onclick="seleccionPersonal(this)">';
	        					html=html+'<div class="circulo float_left fazul circulo_'+id+'">'+abreviacion+'</div>';
	        					html=html+'<div class="t12 texto_circulo azul texto_'+id+'">'+nombre+'</div>';
	        					html=html+'</div>';	
	        				}
	        			}	
	        			}
	        		}
	        		html=html+'</div>';
	        		$('#personal').append(html);

	        		}
	        }
	 });
}


function llenaEventos(){
	
	invocarJSONServiceAction("obtieneEventos", {},
			'obtieneEventos', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneEventos = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
		var arreglo=data.eventos;
		var creaEvento='';
		html='';
		html=html+'<div class="row">';
		
				for(var i=0;i<arreglo.length;i++){
					var nombre=arreglo[i].nombre;
					var eventoId=arreglo[i].eventoId;
					
					// llena información para el panel lateral
					html=html+'<div class="col-12 cursor" id="'+eventoId+'" onclick="seleccionEvento(this)">';
					html=html+'<div class="caja_texto float_left  back_'+eventoId+'">';
						html=html+'<img class="ocultableEvento'+eventoId+'" src="img/check.png">';
					html=html+'</div>';
					html=html+'<label class="gris t12 cursor texto_circulo" for="'+eventoId+'">'+nombre+'</label>';
					html=html+'</div>';	
					
					// llena información para el menu desplegable (CREAR EVENTO)
					creaEvento=creaEvento+'<option value="'+eventoId+'">'+nombre+'</option>';
				}
				
		html=html+'</div>';
		$('#eventos').append(html);
		$('#tipo_evento').append(creaEvento);
		
		}
	}
}

function seleccionEvento(valor){
	var id=valor.id;
	
	if($('.ocultableEvento'+id).is(":visible")){
		$('.ocultableEvento'+id).addClass("oculto_evento");
	}
	else{
		$('.ocultableEvento'+id).removeClass("oculto_evento");
	}
	
}
function seleccionPersonal(valor){
	var id=valor.id;
	
	if($('.circulo_'+id).hasClass("ffgris")==true){
		
		$('.circulo_'+id).removeClass("ffgris");
		$('.texto_'+id).removeClass("gris");
		
		$('.circulo_'+id).addClass("fazul");
		$('.texto_'+id).addClass("azul");
		$('.personal_'+id).removeClass("oculto_personal");

	}
	else{
		$('.circulo_'+id).removeClass("fazul");
		$('.texto_'+id).removeClass("azul");
		
		$('.circulo_'+id).addClass("ffgris");
		$('.texto_'+id).addClass("gris");
		$('.personal_'+id).addClass("oculto_personal");


		
	}
	
}

// -----------------------------------
// LLENA LOS COMBOS DE CREA-EVENTO
var data_personal='';

function llenaAreas(){
	//limpia el formularo al abrir
	limpiaAreas();
	$('#tipo_evento').val('');
	$('#finicial').val('');
	$('#hinicial').val('');
	$('#ffinal').val('');
	$('#hfinal').val('');
	$('#lugar').val('');
	$('#descripcion').val('');
	$('#asignado').val('');
	
	
	tabla_participantes.clear().draw();
	arregloEmpleadoId=[];
	arregloNombre=[];
	
	var arregloAreas=Object.keys(data_personal.empleados);
	var llena='';
	
	llena=llena+'<div class="dropdown-item opcion_drop areas"  id="">';
	llena=llena+'<div class="cuadro float_left">-</div>';
	llena=llena+'<div class="informacion t12 azul">Selecciona un Área</div>';
	llena=llena+'</div>';
	
	for(var i=0;i<arregloAreas.length;i++){ 	
		//llena la lista desplegable de Areas (CREA EVENTO)
		llena=llena+'<div class="dropdown-item opcion_drop areas"  id="'+arregloAreas[i]+'" codigo="'+data_personal.empleados[arregloAreas[i]].AREAID+'">';
		llena=llena+'<div class="cuadro float_left">'+arregloAreas[i].substring(0,1)+'</div>';
		llena=llena+'<div class="informacion t12 azul">'+arregloAreas[i]+'</div>';
		llena=llena+'</div>';
	}
	$('#areas').text('');
	$('#areas').append(llena);
	
	// ------------------------------------------------
	 $('.areas').on('click', function(){ //llena los puestos segun el area seleccionada (CREA EVENTO)
		    var id=$(this).attr('id');
		    var codigo=$(this).attr('codigo');
		    
		    var html='';
		    html=html+'<div onclick="clicPuestos(this)" class="dropdown-item opcion_drop puestos" id="">';
	    	html=html+'<div class="cuadro float_left">-</div>';
	    	html=html+'<div class="informacion t12 azul">Selecciona un puesto</div></div>';
	    	
		    
		    if(id!=""){
		    $('#info_seleccionada').text(id);
		    $('#inputArea').val(id);
		    $('#inputAreaId').val(codigo);
		    $('#letra_seleccionada').text(id.substring(0,1));
	
		    var llenaPuestos= Object.keys(data_personal.empleados[id]);
		    
		    if(llenaPuestos.length>0){
		    for(var i=0;i<llenaPuestos.length;i++){
		    	 if(llenaPuestos[i]!="AREAID"){
		    	html=html+'<div onclick="clicPuestos(this)" class="dropdown-item opcion_drop puestos" id="'+llenaPuestos[i]+'" codigo="'+data_personal.empleados[id][llenaPuestos[i]][0].puestoId+'">';
		    	html=html+'<div class="cuadro float_left">'+llenaPuestos[i].substring(0,1)+'</div>';
		    	html=html+'<div class="informacion t12 azul">'+llenaPuestos[i]+'</div></div>';
		    	 }	
		    }
		    }
		    }
		    else{
		    	limpiaAreas();
		    }
		    
		    $('#puestos').text('');
		    $('#puestos').append(html);
		 }); 
}
function limpiaAreas(){
	 $('#info_seleccionada').text('Selecciona un Área');
	    $('#inputArea').val("");
	    $('#inputAreaId').val("");
	    $('#letra_seleccionada').text('-');
	    limpiaPuestos();
}
function limpiaPuestos(){
	$('#info_seleccionadaPuesto').text('Selecciona un puesto');
	 $('#inputPuesto').val('');
	 $('#inputPuestoId').val('');
	 $('#letra_seleccionadaPuesto').text('-');
	 $('#participantes').text('');
}

function clicPuestos(valor) {
	var area = $('#inputArea').val();
	var id = valor.id;
	var codigo=$('#'+id).attr('codigo');
	var html = '';

	if (id != "") {
		var llenaEmpleados = data_personal.empleados[area][id];

		$('#info_seleccionadaPuesto').text(id);
		$('#inputPuesto').val(id);
		$('#inputPuestoId').val(codigo);
		$('#letra_seleccionadaPuesto').text(id.substring(0, 1));
		
		html = html + '<option value selected></option>';
		for (var i = 0; i < llenaEmpleados.length; i++) {
			html = html + '<option value="' + llenaEmpleados[i].empleadoId
					+ '/' + llenaEmpleados[i].nombre + '">'
					+ llenaEmpleados[i].nombre + '</option>';
		}
	} else {
		limpiaPuestos();
	}

	$('#participantes').text('');
	$('#participantes').append(html);
}

var arregloEmpleadoId=[];
var arregloNombre=[];

function agregarParticipante(){	
	
	if($('#participantes').val()!=null && $('#participantes').val()!=""){
		var area=$('#inputArea').val();  
		var puesto=$('#inputPuesto').val(); 
		var cadena=$('#participantes').val().split("/",2);
		var empleadoId=cadena[0];
		var nombre=cadena[1];
		var repetido=0;
		
		if(arregloEmpleadoId.length>0){
		for(var i=0;i<arregloEmpleadoId.length;i++){
			if(arregloEmpleadoId[i]==empleadoId){
				repetido++;
			}
		}
		
		if(repetido==0){
			arregloEmpleadoId.push(empleadoId);
			arregloNombre.push(nombre);
			
			actualizaTablaParticipantes();
		}
		}
		else{
			arregloEmpleadoId.push(empleadoId);
			arregloNombre.push(nombre);
			actualizaTablaParticipantes();
		}
		
		$('#participantes').val(null);
	}	
	
}

function borrarParticipante(valor){
	for(var i=0;i<arregloEmpleadoId.length;i++){
		if(arregloEmpleadoId[i]==valor.id){
			var index=i;
		}
	}
	arregloEmpleadoId.splice(index,1);
	arregloNombre.splice(index,1);
	
	actualizaTablaParticipantes();
}

function actualizaTablaParticipantes(){
	tabla_participantes.clear().draw();
	
	for(var i=0;i<arregloEmpleadoId.length;i++ ){
		tabla_participantes.row.add([arregloEmpleadoId[i], arregloNombre[i], "x"]).draw( false );
		$('#tabla_participantes tr').attr("onclick", "borrarParticipante(this)");	
	}	
}
function enviaDatos(){
	if($('#tipo_evento').val()!="" &&
			$('#finicial').val()!="" &&
			$('#hinicial').val()!="" &&
			$('#ffinal').val()!="" &&
			$('#hfinal').val()!="" &&
			$('#descripcion').val()!="" &&
			$('#lugar').val()!="" &&
			$('#inputAreaId').val()){
	
	var tipo;
	var datosParticipantes="";
	var cadenaEnviar;
	
	if(arregloEmpleadoId.length>0 ||( $('#participantes').val()!=null && $('#participantes').val()!="")){
			agregarParticipante();
		
		tipo=3;
		for(var i=0; i<arregloEmpleadoId.length;i++){
			datosParticipantes=datosParticipantes+'{"entidadId":'+arregloEmpleadoId[i]+'}';
			
			if(i<arregloEmpleadoId.length-1)
			datosParticipantes=datosParticipantes+',';
		}
		cadenaEnviar="["+datosParticipantes+"]";		
		
	}
	else{
		if($('#inputArea').val()!="" && $('#inputPuesto').val()!=""){
			console.log("entro a puestos");
			tipo=2;
			cadenaEnviar='[{"entidadId":'+$('#inputPuestoId').val()+'}]';
		}
		if($('#inputArea').val()!="" && $('#inputPuesto').val()==""){
			console.log("entro a areas");
			tipo=1;
			cadenaEnviar='[{"entidadId":'+$('#inputAreaId').val()+'}]';
		}
	}
	
	console.log(cadenaEnviar);
	invocarJSONServiceAction("enviaDatos",
			{
				"tareaxAreaId":$('#tipo_evento').val(),
				"fechaAgenda":$('#finicial').val()+" "+$('#hinicial').val()+":00",
				"fechaFinProgramada":$('#ffinal').val()+" "+$('#hfinal').val()+":00",
				"observaciones":$('#descripcion').val(),
				"direccion":$('#lugar').val(),
				"latitud":"0",
				"longitud":"0",
				"tipoAsignacion":tipo,
				"porAsignar":cadenaEnviar
			},
			'obtieneEventosenviaDatos', 
			function() {
				//Funcion de error
				cierraLoading();
			},
			function() {
				//Función al finalizar
				cierraLoading();
			});

	obtieneEventosenviaDatos = function( data ) {
	if(data.codigo != 200){
		cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_ERROR, null);
		}
	if(data.codigo==200) {
		cargaMensajeModal('AGENDA ', data.mensaje, TIPO_MENSAJE_ACEPTAR, TIPO_ESTATUS_EXITO, null);
		}
	}
	}	
}