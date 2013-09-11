$(function() {
	var mapps = window.mapps || {};
	var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

	mapps.mobileNav = function(){
		var windowWidth = $(window).width();
	
		if( windowWidth <= 979 ) {
			if( $('#mobile-nav').length > 0 ) {
				mobileMenuClone.insertAfter('#menu');
				$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
			}
		} else {
			$('#navigation-mobile').css('display', 'none');
			if ($('#mobile-nav').hasClass('open')) {
				$('#mobile-nav').removeClass('open');	
			}
		}
	}

	mapps.listenerMenu = function(){
		$('#mobile-nav').on('click', function(e){
			$(this).toggleClass('open');
			
			if ($('#mobile-nav').hasClass('open')) {
				$('#navigation-mobile').slideDown(500, 'easeOutExpo');
			} else {
				$('#navigation-mobile').slideUp(500, 'easeOutExpo');
			}
			e.preventDefault();
		});
		
		$('#menu-nav-mobile a').on('click', function(){
			$('#mobile-nav').removeClass('open');
			$('#navigation-mobile').slideUp(350, 'easeOutExpo');
		});
	}

	mapps.nav = function(){
		$('.sticky-nav').waypoint('sticky');
	}

	mapps.filter = function (){
		if($('#mobile_apps').length > 0){		
			var $container = $('#mobile_apps');
			
			$container.isotope({
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows'
			});
		
			var $optionSets = $('#options .option-set'),
				$optionLinks = $optionSets.find('a');
		
			  $optionLinks.click(function(){
				var $this = $(this);
				if ( $this.hasClass('selected') ) {
				  return false;
				}
		
				var $optionSet = $this.parents('.option-set');
		
				$optionSet.find('.selected').removeClass('selected');
				$this.addClass('selected');
		  
				var options = {},
					key = $optionSet.attr('data-option-key'),
					value = $this.attr('data-option-value');
		
				value = value === 'false' ? false : value;
				options[ key ] = value;
				if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
				  changeLayoutMode( $this, options )
				} else {
				  $container.isotope( options );
				}
				
				return false;
			});
		}
	}

	mapps.fancyBox = function(){
		if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
			
			$(".fancybox").fancybox({				
					padding : 0,
					beforeShow: function () {
						this.title = $(this.element).attr('title');
						this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
					},
					helpers : {
						title : { type: 'inside' },
					}
				});
				
			$('.fancybox-media').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				helpers : {
					media : {}
				}
			});
		}
	}

	mapps.menuNav = function(){
		$('#menu-nav, #menu-nav-mobile').onePageNav({
			currentClass: 'current',
	    	changeHash: false,
	    	scrollSpeed: 750,
	    	scrollOffset: 100,
	    	scrollThreshold: 0.5,
			easing: 'easeOutExpo',
			filter: ':not(.external)'
		});
	}

	mapps.goHomepage = function(){
		$('#goHomepage').on('click', function(){
			$target = $($(this).attr('href')).offset().top;
			
			$('body, html').animate({scrollTop : "0"}, 750, 'easeOutExpo');
			return false;
		});
	}

	mapps.scrollToTop = function(){
		var windowWidth = $(window).width(),
			didScroll = false;

		var $arrow = $('#back-to-top');

		$arrow.click(function(e) {
			$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
			e.preventDefault();
		})

		$(window).scroll(function() {
			didScroll = true;
		});

		setInterval(function() {
			if( didScroll ) {
				didScroll = false;

				if( $(window).scrollTop() > 1000 ) {
					$arrow.css('display', 'block');
				} else {
					$arrow.css('display', 'none');
				}
			}
		}, 250);
	}

	mapps.utils = function(){
		
		$('.item-thumbs').bind('touchstart', function(){
			$(".active").removeClass("active");
	      	$(this).addClass('active');
	    });
		
		$('.image-wrap').bind('touchstart', function(){
			$(".active").removeClass("active");
	      	$(this).addClass('active');
	    });
		
		$('#social ul li').bind('touchstart', function(){
			$(".active").removeClass("active");
	      	$(this).addClass('active');
	    });
		
	}

	mapps.accordion = function(){
		var accordion_trigger = $('.accordion-heading.accordionize');
		
		accordion_trigger.delegate('.accordion-toggle','click', function(event){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			   	$(this).addClass('inactive');
			}
			else{
			  	accordion_trigger.find('.active').addClass('inactive');          
			  	accordion_trigger.find('.active').removeClass('active');   
			  	$(this).removeClass('inactive');
			  	$(this).addClass('active');
		 	}
			event.preventDefault();
		});
	}

	mapps.toggle = function(){
		var accordion_trigger_toggle = $('.accordion-heading.togglize');
		
		accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			   	$(this).addClass('inactive');
			}
			else{
			  	$(this).removeClass('inactive');
			  	$(this).addClass('active');
		 	}
			event.preventDefault();
		});
	}

	mapps.toolTip = function(){ 
	    $('a[data-toggle=tooltip]').tooltip();
	}

	$(document).ready(function(){
		Modernizr.load([
		{
			test: Modernizr.placeholder,
			nope: '_include/js/placeholder.js', 
			complete : function() {
				if (!Modernizr.placeholder) {
					Placeholders.init({
						live: true,
						hideOnFocus: false,
						className: "yourClass",
						textColor: "#999"
					});
				}
			}
		}]);
		
		$('body').jpreLoader({
			splashID: "#loader",
			showSplash: true,
			showPercentage: true,
			autoClose: true,
			splashFunction: function() {
				$('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
			}
		});
		
		mapps.nav();
		mapps.mobileNav();
		mapps.listenerMenu();
		mapps.menuNav();
		mapps.goHomepage();
		mapps.filter();
		mapps.fancyBox();
		mapps.scrollToTop();
		mapps.utils();
		mapps.accordion();
		mapps.toggle();
		mapps.toolTip();
	});

	$(window).resize(function(){
		mapps.mobileNav();
	});
});