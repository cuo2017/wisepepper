
$(function(){
// nav click
	$(".nav-logo").click(function(event) {
		/* Act on the event */
		window.location.reload();
	});
	$(".nav-title").click(function(event) {
		/* Act on the event */
		window.location.reload();
	});

	var nav_service_state = 0;

	$(".nav-service").click(function(event) {
		/* Act on the event */
		

		if(nav_service_state === 0){
			$(this).children("h1").children('span').css('transform', 'rotate(180deg)');
			nav_service_state = 1;
		}
		else{
			$(this).children("h1").children('span').css('transform', 'rotate(0deg)');
			nav_service_state = 0;
		}
	});


	$('.nav-user').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board7').show();
	});


	$('.nav-user-board').click(function(event) {
		/* Act on the event */
		// 退出登录
		$('.board').hide();
		$('.sign').animate({
			"top":"0",
		}, 300);
	});




// menu click style

	// topic
	var menu_topic_state = [0,0,0,0];
	$(".menu-topic").click(function(event) {
		/* Act on the event */
		
			

			
			switch($(this).attr('id')){
				case "M1":
					
					
					
					if(menu_topic_state[0] === 0){
						menu_topic_state = [1,0,0,0];
						$(".menu-topic").children('span').css({
							"transform":"rotate(0deg)",
						});
						$(this).children('span').css({
							"transform":"rotate(90deg)",
						});
						$('#m1').animate({
							"top":"0px",
						}, 200);
						$('#m2').animate({
							"top":"0px",
						}, 200);
						$('#m3').animate({
							"top":"0px",
						}, 200);

						$('#M2').animate({
							"top":"0px",
						}, 200);
						$('#m4').animate({
							"top":"-40px",
						}, 200);

						$('#M3').animate({
							"top":"-40px",
						}, 200);
						$('#m5').animate({
							"top":"-80px",
						}, 200);
						$('#m6').animate({
							"top":"-120px",
						}, 200);
						$('#m7').animate({
							"top":"-160px",
						}, 200);
						$('#m8').animate({
							"top":"-200px",
						}, 200);

						$('#M4').animate({
							"top":"-200px",
						}, 200);
						$('#m9').animate({
							"top":"-240px",
						}, 200);
						$('#m10').animate({
							"top":"-280px",
						}, 200);
						$('#m11').animate({
							"top":"-320px",
						}, 200);
						
						
					
					}

					else{
						menu_topic_state = [0,0,0,0];
						$(".menu-topic").children('span').css({
							"transform":"rotate(0deg)",
						});
						$('#m1').animate({
							"top":"-40px",
						}, 200);
						$('#m2').animate({
							"top":"-80px",
						}, 200);
						$('#m3').animate({
							"top":"-120px",
						}, 200);

						$('#M2').animate({
							"top":"-120px",
						}, 200);
						$('#m4').animate({
							"top":"-160px",
						}, 200);

						$('#M3').animate({
							"top":"-160px",
						}, 200);
						$('#m5').animate({
							"top":"-200px",
						}, 200);
						$('#m6').animate({
							"top":"-240px",
						}, 200);
						$('#m7').animate({
							"top":"-280px",
						}, 200);
						$('#m8').animate({
							"top":"-320px",
						}, 200);
						$('#M4').animate({
							"top":"-320px",
						}, 200);
						$('#m9').animate({
							"top":"-360px",
						}, 200);
						$('#m10').animate({
							"top":"-400px",
						}, 200);
						$('#m11').animate({
							"top":"-440px",
						}, 200);
					}


					
					break;
				case "M2":

					// alert($(this).attr('id'));
					if(menu_topic_state[1] === 0){
						menu_topic_state = [0,1,0,0];
						$(".menu-topic").children('span').css({
							"transform":"rotate(0deg)",
						});
						$(this).children('span').css({
							"transform":"rotate(90deg)",
						});
						$('#m1').animate({
							"top":"-40px",
						}, 200);
						$('#m2').animate({
							"top":"-80px",
						}, 200);
						$('#m3').animate({
							"top":"-120px",
						}, 200);

						$('#M2').animate({
							"top":"-120px",
						}, 200);
						$('#m4').animate({
							"top":"-120px",
						}, 200);

						$('#M3').animate({
							"top":"-120px",
						}, 200);
						$('#m5').animate({
							"top":"-160px",
						}, 200);
						$('#m6').animate({
							"top":"-200px",
						}, 200);
						$('#m7').animate({
							"top":"-240px",
						}, 200);
						$('#m8').animate({
							"top":"-280px",
						}, 200);

						$('#M4').animate({
							"top":"-280px",
						}, 200);
						$('#m9').animate({
							"top":"-320px",
						}, 200);
						$('#m10').animate({
							"top":"-360px",
						}, 200);
						$('#m11').animate({
							"top":"-400px",
						}, 200);
						
						
					
					}

					else{
						menu_topic_state = [0,0,0,0];
						$(".menu-topic").children('span').css({
							"transform":"rotate(0deg)",
						});
						$('#m1').animate({
							"top":"-40px",
						}, 200);
						$('#m2').animate({
							"top":"-80px",
						}, 200);
						$('#m3').animate({
							"top":"-120px",
						}, 200);

						$('#M2').animate({
							"top":"-120px",
						}, 200);
						$('#m4').animate({
							"top":"-160px",
						}, 200);

						$('#M3').animate({
							"top":"-160px",
						}, 200);
						$('#m5').animate({
							"top":"-200px",
						}, 200);
						$('#m6').animate({
							"top":"-240px",
						}, 200);
						$('#m7').animate({
							"top":"-280px",
						}, 200);
						$('#m8').animate({
							"top":"-320px",
						}, 200);
						$('#M4').animate({
							"top":"-320px",
						}, 200);
						$('#m9').animate({
							"top":"-360px",
						}, 200);
						$('#m10').animate({
							"top":"-400px",
						}, 200);
						$('#m11').animate({
							"top":"-440px",
						}, 200);
					}
					break;
				case "M3":
					// alert($(this).attr('id'));
					if(menu_topic_state[2] === 0){
						menu_topic_state = [0,0,1,0];
						$(".menu-topic").children('span').css({
							"transform":"rotate(0deg)",
						});
						$(this).children('span').css({
							"transform":"rotate(90deg)",
						});
						$('#m1').animate({
							"top":"-40px",
						}, 200);
						$('#m2').animate({
							"top":"-80px",
						}, 200);
						$('#m3').animate({
							"top":"-120px",
						}, 200);

						$('#M2').animate({
							"top":"-120px",
						}, 200);
						$('#m4').animate({
							"top":"-160px",
						}, 200);

						$('#M3').animate({
							"top":"-160px",
						}, 200);
						$('#m5').animate({
							"top":"-160px",
						}, 200);
						$('#m6').animate({
							"top":"-160px",
						}, 200);
						$('#m7').animate({
							"top":"-160px",
						}, 200);
						$('#m8').animate({
							"top":"-160px",
						}, 200);

						$('#M4').animate({
							"top":"-160px",
						}, 200);
						$('#m9').animate({
							"top":"-200px",
						}, 200);
						$('#m10').animate({
							"top":"-240px",
						}, 200);
						$('#m11').animate({
							"top":"-280px",
						}, 200);
					}


					else{
						menu_topic_state = [0,0,0,0];
						$(".menu-topic").children('span').css({
							"transform":"rotate(0deg)",
						});
						$('#m1').animate({
							"top":"-40px",
						}, 200);
						$('#m2').animate({
							"top":"-80px",
						}, 200);
						$('#m3').animate({
							"top":"-120px",
						}, 200);

						$('#M2').animate({
							"top":"-120px",
						}, 200);
						$('#m4').animate({
							"top":"-160px",
						}, 200);

						$('#M3').animate({
							"top":"-160px",
						}, 200);
						$('#m5').animate({
							"top":"-200px",
						}, 200);
						$('#m6').animate({
							"top":"-240px",
						}, 200);
						$('#m7').animate({
							"top":"-280px",
						}, 200);
						$('#m8').animate({
							"top":"-320px",
						}, 200);
						$('#M4').animate({
							"top":"-320px",
						}, 200);
						$('#m9').animate({
							"top":"-360px",
						}, 200);
						$('#m10').animate({
							"top":"-400px",
						}, 200);
						$('#m11').animate({
							"top":"-440px",
						}, 200);
					}
					break;
				case "M4":
					// alert($(this).attr('id'));
					if(menu_topic_state[3] === 0){
						menu_topic_state = [0,0,0,1];
						$(".menu-topic").children('span').css({
							"transform":"rotate(0deg)",
						});
						$('#m1').animate({
							"top":"-40px",
						}, 200);
						$('#m2').animate({
							"top":"-80px",
						}, 200);
						$('#m3').animate({
							"top":"-120px",
						}, 200);

						$('#M2').animate({
							"top":"-120px",
						}, 200);
						$('#m4').animate({
							"top":"-160px",
						}, 200);

						$('#M3').animate({
							"top":"-160px",
						}, 200);
						$('#m5').animate({
							"top":"-200px",
						}, 200);
						$('#m6').animate({
							"top":"-240px",
						}, 200);
						$('#m7').animate({
							"top":"-280px",
						}, 200);
						$('#m8').animate({
							"top":"-320px",
						}, 200);

						$('#M4').animate({
							"top":"-320px",
						}, 200);
						$('#m9').animate({
							"top":"-320px",
						}, 200);
						$('#m10').animate({
							"top":"-320px",
						}, 200);
						$('#m11').animate({
							"top":"-320px",
						}, 200);
						
						
					
					}

					else{
						menu_topic_state = [0,0,0,0];
						$(".menu-topic").children('span').css({
							"transform":"rotate(0deg)",
						});
						$('#m1').animate({
							"top":"-40px",
						}, 200);
						$('#m2').animate({
							"top":"-80px",
						}, 200);
						$('#m3').animate({
							"top":"-120px",
						}, 200);

						$('#M2').animate({
							"top":"-120px",
						}, 200);
						$('#m4').animate({
							"top":"-160px",
						}, 200);

						$('#M3').animate({
							"top":"-160px",
						}, 200);
						$('#m5').animate({
							"top":"-200px",
						}, 200);
						$('#m6').animate({
							"top":"-240px",
						}, 200);
						$('#m7').animate({
							"top":"-280px",
						}, 200);
						$('#m8').animate({
							"top":"-320px",
						}, 200);
						$('#M4').animate({
							"top":"-320px",
						}, 200);
						$('#m9').animate({
							"top":"-360px",
						}, 200);
						$('#m10').animate({
							"top":"-400px",
						}, 200);
						$('#m11').animate({
							"top":"-440px",
						}, 200);
					}
					break;
				default:
					// alert('123');
					break;
			};

		
		


	});
















	

	// sub-menu
	$('.menu-sub').click(function(event) {
		/* Act on the event */
		$('.menu-sub').children('.sub-glyphicon').css('color', '#ccc');
		$('.menu-sub').css('background', '#6a6').hover(function() {
			/* Stuff to do when the mouse enters the element */
			$(this).css('background', '#595');
			$(this).children('.sub-glyphicon').css('color', '#fff');
		}, function() {
			/* Stuff to do when the mouse leaves the element */
			$(this).css('background', '#6a6');
			$(this).children('.sub-glyphicon').css('color', '#ccc');
		});
		$(this).children('.sub-glyphicon').css('color', '#fff');
		$(this).css('background', '#be8').hover(function() {
			/* Stuff to do when the mouse enters the element */
			$(this).css('background', '#be8');
			$(this).children('.sub-glyphicon').css('color', '#fff');
		}, function() {
			/* Stuff to do when the mouse leaves the element */
			$(this).css('background', '#be8');
			$(this).children('.sub-glyphicon').css('color', '#fff');
		});
	});


	// connections to .board
	$('#m1').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board0').show();
	});
	$('#m2').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board1').show();
	});
	$('#m3').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board8').show();
	});
	$('#m4').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board2').show();
	});
	$('#m5').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board9').show();
	});
	$('#m6').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board10').show();
	});
	$('#m7').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board3').show();
	});
	$('#m8').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board4').show();
	});
	$('#m9').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board5').show();
	});
	$('#m10').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board6').show();
	});
	$('#m11').click(function(event) {
		/* Act on the event */
		$('.board').hide();
		$('#board11').show();
	});
	
	
});