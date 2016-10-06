function change_cat(i) {
	var random_cats = ['i.imgur.com/JwbRHOy.gif','hypervocal.com/wp-content/uploads/2014/08/dancing-cat.gif','dc265.4shared.com/img/IrellQwI/119afb42160/Gato_bailando','rs240.pbsrc.com/albums/ff237/mareesme/Funny%20cats%20and%20dogs%20and%20wildlife/cats38.gif~c200','media.giphy.com/media/Za7KwK4AMeFq/giphy.gif','rs707.pbsrc.com/albums/ww74/onesuleman/miscellaneous_121.gif~c200'];
	var j = Math.ceil(Math.random() * (random_cats.length-1));
	document.getElementById(i).src = 'http://' + random_cats[j];
}
	
function change_font() {
	var obj = document.getElementById('tt');
	var fonts = [[],
		['Monoton','#FFFFFF','74',"IT'S&nbsp;&nbsp;&nbsp;LEXY'S&nbsp;&nbsp;&nbsp;BIRTHDAY!<br /><br />&#x21CA;&#x21CA;&#x21CA;"],
		['Iceland','#228DFF','72',"HAPPY CAKEDAY LIL' ROOP!<br /><br />&#x21CA;&#x21CA;&#x21CA;"],
		['Pacifico','#FFDD1B','72',"S Dnem Rozhdeniya!<br /><br />&#x21CA;&#x21CA;&#x21CA;"],
		['PressStart','#B6FF00','72',"Qarter-Centenial!<br />&#x21CA;&#x21CA;&#x21CA;"],
		['Audiowide','#FF9900','68',"IT'S ALL 'BOUT DIS GAL T'DAY!<div style='font-size:0.2em;'>[and every day]</div>&#x21CA;&#x21CA;&#x21CA;"],
		['Vampiro One','#BA01FF','54',"What a Day to be Alive, Lexy's Turning 25!<br /><br />&#x21CA;&#x21CA;&#x21CA;"]
	];
	var j = Math.ceil(Math.random() * (fonts.length-1));
	var str = 'neon' + j + ' 1s ease-in-out infinite alternate';
	obj.style.animation = str;
	obj.style.WebkitAnimation = str;
	obj.style.MozAnimation = str;
	obj.style.fontFamily = fonts[j][0];
	obj.style.color = fonts[j][1];
	obj.style.fontSize = fonts[j][2];
	obj.innerHTML = fonts[j][3];
	
}

function change_font_loop() { setInterval(change_font, 5000);}
function change_cat_loop() { setInterval(function(){change_cat('cat1');change_cat('cat2');}, 5000);}
change_font_loop();
change_cat_loop();


$(function(){
	$("#music_control").click(function(){
		$("#music_control").html() == "Pause Music" 
			? $("#music_control").html("Play Music") 
			: $("#music_control").html("Pause Music"); 
	});
	
	$("#go-to-top").click(function(){ 
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
	//$("#shameless").click(function () { window.location.assign("http://www.firewatchgame.com");});
	//$("#animation_control-container").click(function () { window.scrollTo(0,0);smoothScrollTo(document.getElementById('subtitle').offsetTop);});

	var $elie = $("#putya"), degree = 0, degree_back = 0, timer, i = 1, a = 30;

	function rotate() {
		$elie.css({ WebkitTransform: 'rotate(' + degree_back + 'deg)'});  
		$elie.css({ '-moz-transform': 'rotate(' + degree_back + 'deg)'});                      
		timer = setTimeout(function() {
			if(degree <= a) {degree=degree+i; degree_back=degree_back+i; rotate();} 
			else if(degree_back >= -(a)) {degree_back=degree_back-i; if(degree_back == -(a)) degree =-(a); rotate();}
		},50);
		
		function loop() {
		   $('#putya')
			 .animate({marginTop:90},1000)
			 .animate({marginTop:40},1000, loop);
		}
		  
		loop(); // call this wherever you want
		  
		function fly_balloons_loop() {
			$('.balloon-border')
				.animate({marginTop:-930},8000)
				.animate({marginTop:-900},2000, fly_balloons_loop);
			setTimeout(function() {
				$('.balloon-border2')
				.animate({marginTop:-1100},8500)
				.animate({marginTop:1100},1, fly_balloons_loop);
			},10000);
		}

		fly_balloons_loop();
	}
	
	rotate();
	
	$('#animation_control-container').click(function() {
		timer=50;
	}, function() {
		rotate();
	});
	
	$('#putya').click(function() {
		clearTimeout(timer);
	}, function() {
		rotate();
	});
	
	function loopOne() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b6').animate({left:randleft,bottom:randtop},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}

	$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
	$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
	loopOne();
	loopTwo();
	loopThree();
	loopFour();
	loopFive();
	loopSix();
	loopSeven();
	loopEight();
}); 
