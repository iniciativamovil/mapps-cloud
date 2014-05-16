var mapps = mapps || {};

mapps.setIntro = function() {
	$("#home").css({height:$(window).height()});
	$("#home").mousemove(function(event) {
		var xPos = event.pageX;
		TweenLite.to($("#home"), .5, {css: { backgroundPosition:xPos + "px" }});
	});
}

$(function() {
	mapps.setIntro();
});