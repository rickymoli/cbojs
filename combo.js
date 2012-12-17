$(document).ready(function() {
	var redondear = true;
	var background = '#CCC';
	var li_over = '#0FF';
	var li_height_px = '20px';
	var width_px = '200px';
	var filas = 5;
	var scroll_margin_right = 4;
	var scroll_margin_bottom = 3;
	
	var li_height = li_height_px.replace(/[^-\d\.]/g, ''); //el replace sirve para eliminar px
	var width = width_px.replace(/[^-\d\.]/g, '');
	var ul_height = $('.cbojs ul li').length * li_height; 
	var contenedor_max_height =  filas * li_height;
	var scroll_left = parseFloat(width) - parseFloat($('.cbojs .cbojs_scroll_contenedor').width()) - scroll_margin_right;
	var contenedor_max_height_scroll = parseFloat(contenedor_max_height)-parseFloat(scroll_margin_bottom);
	/*
	 * Calcula el tamanyo del scroll y el incremento
	 */
	var scroll_recorrera = parseFloat(ul_height)-parseFloat(contenedor_max_height_scroll)-scroll_margin_bottom;
	
	var scroll_height_minim = li_height; // la altura del scroll como minimo tiene que ser la de un li
	var scroll_incrementa_minim = parseFloat( scroll_recorrera / parseFloat(( parseFloat(contenedor_max_height_scroll)-parseFloat(scroll_height_minim) )) );
	
	var scroll_incrementa = 4;
	var scroll_contenedor_sobrante = parseFloat(scroll_incrementa_minim*(parseFloat(contenedor_max_height_scroll)-parseFloat(li_height))/scroll_incrementa);
	var scroll_height = parseFloat(parseFloat(contenedor_max_height_scroll)-scroll_contenedor_sobrante);
	
	if (scroll_height < scroll_height_minim)
	{
		scroll_height = scroll_height_minim;
		scroll_incrementa = scroll_incrementa_minim;
	}
	/*
	 * FIN Calcula
	 */
	
	/*
	 * ESTILOS
	 */
	$('.cbojs li').hover(
         function () {
           $(this).css('background-color',li_over);
         }, 
         function () {
           $(this).css('background-color',background);
         }
    );
    $('.cbojs').css({'background-color':background,'width':width_px});
	$('.cbojs ul').css({'background-color':background,'width':width_px});
	$('.cbojs li, .cbojs span').css({'height':li_height_px,'line-height':li_height_px});
	$('.cbojs .cbojs_contenedor').css({'height':contenedor_max_height+'px'});
	$('.cbojs .cbojs_scroll_contenedor').css({'margin-left':scroll_left,'height':contenedor_max_height_scroll+'px'});
	$('.cbojs .cbojs_scroll').css({'height':scroll_height+"px"});
	if (redondear)
	{
		$('.cbojs .cbojs_scroll_contenedor').addClass('redondear');
		$('.cbojs .cbojs_scroll').addClass('redondear');
	}
	/*
	 * FIN ESTILOS
	 */
	
	
	$('.cbojs li').each(function(index) {
		if ($(this).attr('selected'))
		{
			var value = $(this).val();
			var text = $(this).text();
			$('.cbojs span').attr("value",value);
			$('.cbojs span').text(text);		
		}
	});
	
	$('.cbojs span').click(function() {
		$(this).next().toggle(); //cbojs_contenedor
		if (ul_height > contenedor_max_height) 
		{
			$('.cbojs .cbojs_scroll').css('top','0px');
        	$('.cbojs ul').css('margin-top','0px');
			$(this).next().next().toggle(); //cbojs_scroll_contenedor
			$('.cbojs .cbojs_scroll').draggable({containment: ".cbojs_scroll_contenedor", axis: "y"});
		}
	});
	$('.cbojs li').click(function() {
		var value = $(this).val();
		var text = $(this).text();
		$('.cbojs span').attr("value",value);
		$('.cbojs span').text(text);
		$('.cbojs .cbojs_contenedor').hide();
		$('.cbojs .cbojs_scroll_contenedor').hide();
	});
	$('.cbojs .cbojs_scroll').on('drag',function(e,ui) {
		var top = $(this).css('top').replace(/[^-\d\.]/g, '');
		top *= -scroll_incrementa;
		$('.cbojs ul').css('margin-top',top+'px');
	});
	$('.cbojs .cbojs_contenedor').bind('mousewheel', function(event, delta) {
		var direccion = delta > 0 ? -1 : 1;
		var top = parseFloat($('.cbojs .cbojs_scroll').css('top').replace(/[^-\d\.]/g, ''));
		top += parseFloat(direccion*2);
		var scroll_posicion_total = parseFloat(top) + parseFloat(scroll_height);
		if (top >= 0 && scroll_posicion_total <= contenedor_max_height_scroll)
		{
			$('.cbojs .cbojs_scroll').css('top',top+'px');
        	top *= -scroll_incrementa;
			$('.cbojs ul').css('margin-top',top+'px');	
		}
		else if (top < 0) //el stroll llega arriba del todo
		{
			$('.cbojs .cbojs_scroll').css('top','0px');
			$('.cbojs ul').css('margin-top','0px');
		}
		else if (scroll_posicion_total > contenedor_max_height_scroll) //el scroll llega abajo del todo
		{
			var posicion_final_scroll = parseFloat(contenedor_max_height_scroll) - parseFloat(scroll_height);
			var posicion_final_ul = parseFloat(contenedor_max_height) - parseFloat(ul_height);
			$('.cbojs .cbojs_scroll').css('top',posicion_final_scroll+'px'); //puede anyadir un pixel de margen al ul cuando es scroll esta arriba
			$('.cbojs ul').css('margin-top',posicion_final_ul+'px');
		}
		return false;
    });
	
});