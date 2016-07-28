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
		
		
		/* Match Height
		---------------------------------------------------------------------*/
		if($('.product-section .col-container').length){
			$( ".product-section .col-container" ).each(function( index ) {
  				$(this).find('img').load(function(){
					$(".product-section .col-container").matchHeight();	
				});
				$(".product-section .col-container").matchHeight();
			});
		}
		
		if($(".equalheight").length){
			$(".equalheight").matchHeight();		
		}
		
		
		
			
		//Menu Icon Append prepend for responsive
		$(window).on('resize', function(){
		}).resize();
				
		
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
		
		/* Tab Content box 
		---------------------------------------------------------------------*/
		var tabBlockElement = $('.tab-data');
			$(tabBlockElement).each(function() {
				var $this = $(this),
					tabTrigger = $this.find(".tabnav li"),
					tabContent = $this.find(".tabcontent");
					var textval = [];
					tabTrigger.each(function() {
						textval.push( $(this).text() );
					});	
				$this.find(tabTrigger).first().addClass("active");
				$this.find(tabContent).first().show();
		
				
				$(tabTrigger).on('click',function () {
					$(tabTrigger).removeClass("active");
					$(this).addClass("active");
					$(tabContent).hide().removeClass('visible');
					var activeTab = $(this).find("a").attr("data-rel");
					$this.find('#' + activeTab).fadeIn('normal').addClass('visible');
								
					return false;
				});
			
				var responsivetabActive =  function(){
				if (screencheck(767)){
					if( !$('.tabMobiletrigger').length ){
						$(tabContent).each(function(index) {
							$(this).before("<h2 class='tabMobiletrigger'>"+textval[index]+"</h2>");	
							$this.find('.tabMobiletrigger:first').addClass("rotate");
						});
						$('.tabMobiletrigger').click('click', function(){
							var tabAcoordianData = $(this).next('.tabcontent');
							if($(tabAcoordianData).is(':visible') ){
								$(this).removeClass('rotate');
								$(tabAcoordianData).slideUp('normal');
								//return false;
							} else {
								$this.find('.tabMobiletrigger').removeClass('rotate');
								$(tabContent).slideUp('normal');
								$(this).addClass('rotate');
								$(tabAcoordianData).not(':animated').slideToggle('normal');
							}
							return false;
						});
					}
						
				} else {
					$('.tabMobiletrigger').remove();
					$this.find(tabTrigger).removeClass("active").first().addClass('active');
					$this.find(tabContent).hide().first().show();			
				}
			};
			$(window).on('resize', function(){
				if(!$this.hasClass('only-tab')){
					responsivetabActive();
				}
			}).resize();
		});


	$(document).on('click',"#menu", function(){
		$(this).toggleClass('menuopen');
		$('#mainmenu').toggleClass('nav-open');
		$('#wrapper').toggleClass('zoom-out');
		return false;
	});
		
		
	$(document).on('click',"#search-trigger", function(){
		$('#search-form-box').toggleClass('nav-open');
		$('#wrapper').toggleClass('zoom-out');
		return false;
	});	

	$(document).on('click',".close-trigger", function(){
		$('#menu').removeClass('menuopen');
		$('#mainmenu').removeClass('nav-open');
		$('#wrapper').removeClass('zoom-out');
		return false;
	});
	$(document).on('click',".close-search", function(){
		$('#search-form-box').removeClass('nav-open');
		$('#wrapper').removeClass('zoom-out');
		return false;
	});
	
	/* custom settings */
	if($('.venoboxvid').length){
		$('.venoboxvid').venobox({
			framewidth: '960px',        // default: ''
			frameheight: '540px',       // default: ''
			titleattr: 'data-title',    // default: 'title'
			numeratio: true,            // default: false
			infinigall: true            // default: false
		});
	}

		
		
/*--------------------------------------------------------------------------------------------------------------------------------------*/		
	});	
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);

