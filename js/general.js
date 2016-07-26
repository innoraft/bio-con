/* Custom General jQuery
/*--------------------------------------------------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
	//Genaral Global variables
	var $win = $(window),
		$doc = $(document),
		$winW = function(){ return $(window).width() },
		$winH = function(){ return $(window).height() },
		$mainmenu = $('#mainmenu'),
		$screensize = function(element){  
			$(element).width($winW()).height($winH());
		};
		
		var screencheck = function(mediasize){
			if (typeof window.matchMedia !== "undefined"){
				var screensize = window.matchMedia("(max-width:"+ mediasize+"px)");
				if( screensize.matches ) {
					return true;
				}else {
					return false;
				}
			} else { // for IE9 and lower browser
				if( $winW() <=  mediasize ) {
					return true;
				}else {
					return false;
				}
			}
		};

	$("#notify-form .submit").click(function(event){
		event.preventDefault();

		dataArr = [];
		error = false;

		$('#notify-form .input-text.error').removeClass('error');
		$('#notify-form .error').remove();

		$('#notify-form .field').each(function(index, el) {
			name = $(this).attr('name');
			value = $.trim($(this).val());
			dataArr.push(name + '=' + value);
			if ($(this).hasClass('required')) {
				if (value == '') {
					error = true;
					$(this).parent().addClass('error');
					$(this).parent().before('<div class="error">Please provide your ' + name + '</div>');
				}
			}
		});

		validation = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
		if ($.trim($('#notify-form .email input').val()) && !validation.test($('#notify-form .email input').val())){
			error = true;
			$('#notify-form .email').addClass('error');
			$('#notify-form .email').before('<div class="error">Please enter a valid email</div>');
    }

		dataString = dataArr.join('&');

		if (!error) {
			$.ajax({
				type: "POST",
				url: "operations.php",
				data: dataString,
				cache: false,
				success: function(result){
					if (result == 1) {
						message = 'Thank you! We will send you a notification when the application window opens.';
						$('#notify-form .field').val('');
					}
					else if (result == -1) {
						message = 'This email is already registered with us';
					}
					else {
						message = 'There was some error processing the request';
					}
					$('#modalWindow .modal-body p').text(message);
					$('#modalWindow').modal('show');
					setTimeout(function(){
						$('#modalWindow').modal('hide');
					}, 3000);
				}
			});
		}

		return false;
	});


	$doc.ready(function() {
	/*--------------------------------------------------------------------------------------------------------------------------------------*/		
		// Remove No-js Class
		$("html").removeClass('no-js').addClass('js');
		
		// First and last Hacks
		$("#mainmenu li:first").addClass('first');
		
		// Get Screen size
		$win.load(function(){
			$win.on('resize', function(){
				$screensize('your selector');	
			}).resize();	
		});
		
		/* Custom Checkbox & Radio
		---------------------------------------------------------------------*/		
		if($('input[type="checkbox"], input[type="radio"]').length){
			$('input[type="checkbox"], input[type="radio"]').ezMark();
		}
		
		/* Match Height
		---------------------------------------------------------------------*/
		if($('.top-footer .col-sm-4 .col-container').length){
			$('.top-footer .col-sm-4 .col-container').matchHeight();
		}
		
		if($('#footer .col-sm-3 .col-container').length){
			$('#footer .col-sm-3 .col-container').matchHeight();
		}
		
		if($('.list-container .col-container').length){
			$('.list-container .col-container').matchHeight();
		}
		
		
		
			
		//Menu Icon Append prepend for responsive
		$(window).on('resize', function(){
			if (screencheck(767)) {
				if(!$('#menu').length){
					$('#mainmenu').prepend('<a href="#" id="menu" class="menulines-button"><span class="menulines"></span></a>');
				}
				$('#footer .form-col').insertBefore('#footer .get-in-touch');
				$('.interest-section .middle-container-row').prependTo('.interest-section-box .row');
				$('.home-intro').insertAfter('.clouds');
			} else {
				$("#menu").remove();
				$('#footer .form-col').insertAfter('#footer .get-in-touch');
				$('.interest-section .middle-container-row').insertAfter('.interest-section-box .left-container-row');	
				$('.home-intro').insertAfter('.plain-object');	
			}
			$('.arrow-left').css('border-right-width',$(window).width()/2);
			$('.arrow-right').css('border-left-width',$(window).width()/2);
		}).resize();
		
		
		/* Responsive Main Menu
		---------------------------------------------------------------------*/
		$(document).on('click',"#menu", function(){
			$this = $(this);
			$(this).toggleClass('menuopen');
			$('#menu-primary').slideToggle();
			return false;
		});
		
		
		$(window).scroll( function(){
			if( $(window).scrollTop() > 25 ){
				$('#header').addClass('fixed');
			} else {
				$('#header').removeClass('fixed');
			}
		});
		
		
		if($('.slider-section').length){
				$('.slider-section').slick({
				 slidesToShow:1,
				 slidesToScroll:1,
				 autoplay: true,
				 dots:true,
				 arrows:false,
				 autoplaySpeed:2000
			});
		}
		
		
		if($('.news-slider').length){
				$('.news-slider').slick({
				 slidesToShow:2,
				 slidesToScroll:1,
				 autoplay: true,
				 vertical:true,
				 autoplaySpeed:2000,
					responsive: [
						{
						  breakpoint: 1024,
						  settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						  	vertical:true
						  }
						},
						{
						  breakpoint: 768,
						  settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							vertical:false
						  }
						}
					]
			});
		}		
		
			
		wow = new WOW(
		{
			animateClass: 'animated',
			offset:       30,
			callback:     function(box) {
				//console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
			}
			}
		);
		wow.init();


		
/*--------------------------------------------------------------------------------------------------------------------------------------*/		
	});	
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);

