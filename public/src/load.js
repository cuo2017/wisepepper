$(document).ready(function(){
	loading();
	window.onload = loaded();
});
var delay = 500;
function loaded(){
	
	$(".loading-progress").animate({
		"top":"0",
	}, delay);
	setTimeout(function(args) {
		// body
		$(".all").animate({
			"opacity":"1"
		}, delay);
		console.log("123");
	}, 2*delay+500);
}

function loading(){
	$(".loading-progress").animate({
			"top":"50%",
		}, delay);
}