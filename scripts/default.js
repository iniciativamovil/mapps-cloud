var mapps = mapps || {};

mapps.resetHome = function() {
	var horizontalCenter = ($(window).width() - $('#banner').width()) * .5;
	var verticalBottom = $(window).height() - $('#banner').height();
	
	$('#home').css({height : $(window).height()});
	$('#banner').css({'position':'absolute', 'top':verticalBottom, 'left':horizontalCenter, 'right':horizontalCenter});
}

mapps.initializeHome = function() {
	$('#home').mousemove(function(event) { TweenLite.to($('#home'), .5, {css:{backgroundPosition:event.pageX + 'px'}});});
}

mapps.initializeNavigation = function(){
	$('header').onePageNav({filter:':not(.external)', scrollOffset:100, scrollSpeed:300});
}

mapps.initializeAppsLightBox = function(){
	$('.iframe').colorbox({iframe:true, width:'100%', height:'100%'});
}

mapps.initializeAppsContainer = function() {
	$(".app-lst").hide();
	$('.btn-display-apps').click(function() {
  	$('.app-lst').slideToggle('slow', function() {});
  });
}

$(window).resize(function() {
	mapps.resetHome();
});

$(function() {
	mapps.initializeHome();
	mapps.initializeNavigation();
	mapps.initializeAppsLightBox();
	mapps.initializeAppsContainer();
	mapps.resetHome();
});