$(function() {
	var mapps = window.mapps || {};
	var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

	mapps.mobileNav = function() {
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

	mapps.listenerMenu = function() {
		$('#mobile-nav').on('click', function(e) {
			$(this).toggleClass('open');
			
			if ($('#mobile-nav').hasClass('open')) {
				$('#navigation-mobile').slideDown(500, 'easeOutExpo');
			} else {
				$('#navigation-mobile').slideUp(500, 'easeOutExpo');
			}
			e.preventDefault();
		});
		
		$('#menu-nav-mobile a').on('click', function() {
			$('#mobile-nav').removeClass('open');
			$('#navigation-mobile').slideUp(350, 'easeOutExpo');
		});
	}

	mapps.nav = function() {
		$('.sticky-nav').waypoint('sticky');
	}

	mapps.filter = function () {
		if($('#mobile_apps').length > 0){		
			var $container = $('#mobile_apps');
			
			$container.isotope({
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows'
			});
		
			var $optionSets = $('#options .option-set'),
				$optionLinks = $optionSets.find('a');
		
			  $optionLinks.click(function() {
				var $this = $(this);
				if ( $this.hasClass('selected')) {
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

	mapps.fancyBox = function() {
		if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0) {
			
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

	mapps.menuNav = function() {
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

	mapps.scrollToHome = function() {
		$('#scrollToHome').on('click', function() {
			$target = $($(this).attr('href')).offset().top;
			
			$('body, html').animate({scrollTop : "0"}, 750, 'easeOutExpo');
			return false;
		});
	}

	mapps.utils = function() {
		
		$('.item-thumbs').bind('touchstart', function() {
			$(".active").removeClass("active");
	      	$(this).addClass('active');
	    });
		
		$('.image-wrap').bind('touchstart', function() {
			$(".active").removeClass("active");
	      	$(this).addClass('active');
	    });
		
		$('#social ul li').bind('touchstart', function() {
			$(".active").removeClass("active");
	      	$(this).addClass('active');
	    });
		
	}

	mapps.accordion = function() {
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

	mapps.toggle = function() {
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

	mapps.toolTip = function() { 
	    $('a[data-toggle=tooltip]').tooltip();
	}

	mapps.initForms = function() {
		$('#login-response-text').hide();
		$('#contact-response-text').hide();

		$('#login-button').click(function() {
			var user = $('#username').val();
			var pass = $('#userpass').val();
			var exception = '';

			$('#login-response-text').hide('slow').empty();
			if (user === '') exception += '<span class="font-icon-info"></span>&nbsp;Debes proporcionar tu nombre de usuario.<br>';
			if (pass === '') exception += '<span class="font-icon-info"></span>&nbsp;Debes proporcionar tu contraseña.<br>';
			
			if(exception !== '') {
				$('#login-response-text').html(exception);
				$('#login-response-text').show("slow");
				$('#username').focus();

				return;
			}

			window.location = '#';
		});

		$('#clear-login-button').click(function() {
			$('#username').val('');
			$('#userpass').val('');
			$('#username').focus();
			$('#login-response-text').hide('slow');
		});


		$('#contact-submit-button').click(function() {
			var name = $('#contact-name').val();
			var email = $('#contact-email').val();
			var msj = $('#contact-message').val();
			var exception = '';

			$('#contact-response-text').hide('slow').empty();
			if (name === '') exception += '<span class="font-icon-info"></span>&nbsp;Debes proporcionar tu nombre.<br>';
			if (email === '') exception += '<span class="font-icon-info"></span>&nbsp;Debes proporcionar tu e-mail.<br>';
			if (msj === '') exception += '<span class="font-icon-info"></span>&nbsp;Aún no compartes nada con nosotros :(<br>';
			
			if(exception !== '') {
				$('#contact-response-text').html(exception);
				$('#contact-response-text').show("slow");
				return;
			}
			
			$('#contact-name').val('');
			$('#contact-email').val('');
			$('#contact-message').val('');
			$('#contact-response-text').html('<span class="font-icon-ok-sign">&nbsp;¡Enhorabuena, tú mensaje ha sido enviado correctamente!').show("slow");
		});

		$('#clear-contact-submit').click(function() {
			$('#contact-name').val('');
			$('#contact-email').val('');
			$('#contact-message').val('');
			$('#contact-response-text').hide('slow');
		});
	}

	mapps.loadImages = function() {
		$('#office_map').attr('src','_include/img/office_map.jpg');
		$('#new-release').attr('src','_include/img/sample.png');
	}

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

	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/es_LA/all.js#xfbml=1&appId=381529251973399";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
		
	
	mapps.nav();
	mapps.mobileNav();
	mapps.listenerMenu();
	mapps.menuNav();
	mapps.scrollToHome();
	mapps.filter();
	mapps.fancyBox();
	mapps.utils();
	mapps.accordion();
	mapps.toggle();
	mapps.toolTip();
	mapps.initForms();
	mapps.loadImages();

	$(window).resize(function() {
		mapps.mobileNav();
	});
});