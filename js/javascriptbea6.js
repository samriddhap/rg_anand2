switchStuff(0);

$.fn.scrollBottom = function() { 
    return $(document).height() - this.scrollTop() - this.height(); 
};

BackgroundCheck.init({
  targets: 'nav',
  images: '.aboutVideo, img'
});

$(document).on('pjax:popstate', function(e) {
	if($(window).width() > 760 && !$('html').hasClass('ipad')){
		if(e.direction == 'back'){
			/*var lastSlide = localStorage.getItem("lastSlide");
			if(lastSlide !== null){
				$('.slideshow').slick('slickGoTo',lastSlide);
			}*/
			var lastSlide = localStorage.getItem("lastSlide");
			if(lastSlide !== null){
				console.log(lastSlide + "bobbar");
				$('.slideshow').slick('slickGoTo',lastSlide);
			}
		}else if(e.direction == 'forward'){
			//$('.slideshow').slick('slickNext');
		}
	}
});

$(document).ready(function(){
	
	if($(window).width() > 760 && !$('html').hasClass('ipad')){
		var slideNum = $('.slide.initial').attr('data-num');
		$('.slideshow')
			.on('init', function(slick) {
	        	//hideLoading();
	    	})
	    	.slick({
				useTransform: true,
				dots: false,
				infinite: true,
			  	speed: 600,
			  	autoplay: false,
			  	slidesToShow: 1,
		  		slidesToScroll: 1,
		  		slide: '.slide',
		  		prevArrow: '.slideshow .prev',
				nextArrow: '.slideshow .next',
				cssEase: 'ease-in-out'
			});
	
		$('.slideshow').slick('slickGoTo',parseInt(slideNum));
	
		$(document).on('click','.nextButton, .prevButton',function(e){
			e.preventDefault();
		});
		
		$('.slideshow').on('afterChange', function(event, slick, currentSlide, nextSlide){
			if($(window).width() > 760 && !$('html').hasClass('ipad')){
				var pagerNo = parseInt(currentSlide) + 1;
				var el = $(".slick-active .adventurer" + pagerNo);
				el[0].play();
				// Load prev/next vid
				/*setTimeout(function(){
					var prevSlide = pagerNo - 1;
					if(prevSlide == 0){
						prevSlide = 7;
					}
					var el = $(".slick-slide .adventurer" + prevSlide);
					if(el.attr("src") == ""){
						var src = el.data('src');
						el.attr("src",src);
					}
					var nextSlide = pagerNo + 1;
					console.log(nextSlide);
					if(nextSlide == 8){
						nextSlide = 1;
					}
					var el = $(".slick-slide .adventurer" + nextSlide);
					if(el.attr("src") == ""){
						var src = el.data('src');
						el.attr("src",src);
					}
				}, 500);*/
				//
			}
			initStuff();
		});
		
		$('.slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$(".slick-slide video").each(function(){
				$(this)[0].pause();
			});
			
			console.log(nextSlide);
			
			switch(nextSlide){
				case 0:
					var descriptor = 'Adventurer';
					var descriptor_sub = 'A Fearless Global Traveller';
					var page_content = '/adventurer-content.php';
				break;
				case 1:
					var descriptor = 'Author';
					var descriptor_sub = 'Some would say the greatest storyteller of all times';
					var page_content = '/author-content.php';
				break;
				case 2:
					var descriptor = 'Campaigner';
					var descriptor_sub = 'Relentlessly working for the rights of others';
					var page_content = '/campaigner-content.php';
				break;
				case 3:
					var descriptor = 'Knight';
					var descriptor_sub = 'A modest man, the reluctant Sir';
					var page_content = '/knight-content.php';
				break;
				case 4:
					var descriptor = 'Physician';
					var descriptor_sub = 'A title valued most highly above all others';
					var page_content = '/physician-content.php';
				break;
				case 5:
					var descriptor = 'Spiritualist';
					var descriptor_sub = 'A sincere and unshakable belief';
					var page_content = '/spiritualist-content.php';
				break;
				case 6:
					var descriptor = 'Sportsman';
					var descriptor_sub = 'An inexhaustible zest for life and activity';
					var page_content = '/sportsman-content.php';
				break;
			}
			
			//store last slide in variable, so if back button hit, we can go to this slide
			localStorage.setItem("lastSlide", currentSlide);
			
			$('.slideTxts .projectTitle .innerTop h4.active').html(descriptor);
			$('.slideTxts .projectTitle .subText h6').html(descriptor_sub);
			
			$.pjax({
				//maxCacheLength: 50,
				url: page_content, 
				container: '#content',
				fragment: '#page_info'
			});
				
			$('.lineWrapper').addClass('active');
			setTimeout(function(){
				$('.lineWrapper').removeClass('active');
			}, 700);
		});
		
		$('.sliderSelect .sliderOption').hover(function() {
		    $('.sliderSelect .sliderOption').not(this).each(function() {
				$(this).toggleClass('notHover');
			});
		});
		
		
		if($('.sliderContainer .sliderEle.bookOne').length){
			$('.sliderContainer .sliderEle.bookOne').slick({
				//centerMode: true,
				dots: true,
				fade: true,
				infinite: true,
			  	speed: 600,
			  	autoplay: false,
			  	slidesToShow: 1,
		  		slidesToScroll: 1,
		  		slide: 'img',
		  		lazyLoad: 'progressive',
		  		prevArrow: '.sliderContainer .bookOne .prev',
				nextArrow: '.sliderContainer .bookOne .next'
			});
			
			$('.sliderContainer .sliderEle.bookTwo').slick({
				dots: true,
				fade: true,
				infinite: true,
			  	speed: 600,
			  	autoplay: false,
			  	slidesToShow: 1,
		  		slidesToScroll: 1,
		  		slide: 'img',
		  		lazyLoad: 'progressive',
		  		prevArrow: '.sliderContainer .bookTwo .prev',
				nextArrow: '.sliderContainer .bookTwo .next'
			});
		}
		
		$(document).on('click', '.sliderSelect .sliderOption', function(e){
			e.preventDefault();
			var theSlider = $(this).data('id');
			$('.sliderSelect').addClass('fadeOut');
			$('.sliderEle.' + theSlider).addClass('fadeIn');
		});
		
		$(document).on('click','.closeSlider',function(e){
			e.preventDefault();
			//$('.sliderEle').fadeOut();
			$('.sliderEle').removeClass('fadeIn');
			$('.sliderSelect').removeClass('fadeOut');
		});
		
	}//Ipad and below
	
	if($(window).width() >= 768){
		$('.photoSplash').each(function() {
			var classes = $(this).attr('class').split(' ');
			var photoSplashEle = classes[1];
			createDraggy(photoSplashEle);
		});
	}
	
	$(document).on('click', 'nav > a', function(e){
		e.preventDefault();
		if($('nav').hasClass('open')){
			$('.navItems').removeClass('active');
			$('.navItems ul li').removeClass('active');
			$('.navItems ol').removeClass('active');
		}
		$('nav').toggleClass('open');
		$('.navContainer').toggleClass('open');
	});
	
	$(document).on('click', '.navContainer ul > li > a', function(e){
		if($(this).parent('li').data('id')){
			e.preventDefault();
			var current = $(this);
			if(current.parent('li').children('ol').hasClass('active')){
				$('.navContainer ul > li ol.active').removeClass('active');
			}else{
				if($('.navContainer ul > li ol.active').length){
					$('.navContainer ul > li ol.active').removeClass('active');
					setTimeout(function(){
						current.parent('li').children('ol').toggleClass('active');
					},1000);
				}else{
					current.parent('li').children('ol').toggleClass('active');
				}
			}
		}
	});
	
	$(document).on('click', '#scroll_down', function(){
		if($(this).data('id')){
			var pos = $($(this).data('id')).offset().top;
		}
		else{
			var pos = $('#content').offset().top;
		}
		
    	$('html, body').animate({
    		scrollTop: pos
    	}, 600);
	});
	
	$(document).on('click', '.backToTop', function(e){
		e.preventDefault();
		var pos = $('body').offset().top;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 600);
	});
	
	$(document).on('click', '.draggable .video:not(.playing)', function(){
		var videoFile = $(this).data('id');
		var videoFileSource = "";
		switch(videoFile){
			case "adventurer": 
				videoFileSource = "<source src='https://player.vimeo.com/external/209915722.sd.mp4?s=eddf676dbb577a5ef3820ea0927b93937767ebb4&profile_id=164' type='video/mp4'>";
			break;
	    	case "author": 
	    		videoFileSource = "<source src='https://player.vimeo.com/external/209916636.sd.mp4?s=6dc16938e1ce6f060a96130368049de928001b43&profile_id=165' type='video/mp4'>";
	    	break;
	    	case "sportsman_motorist": 
	    		videoFileSource = "<source src='https://player.vimeo.com/external/209916210.sd.mp4?s=6193159a80d6fc73b7d7079ab4eeb2c1a4a5971c&profile_id=165' type='video/mp4'>";
	    	break;
	    	case "sportsman_golfer": 
	    		videoFileSource = "<source src='https://player.vimeo.com/external/209916201.sd.mp4?s=6070114acc22615dad1a554b9370a482ede578c8&profile_id=165' type='video/mp4'>";
	    	break;
	    	case "spiritualist_wife": 
	    		videoFileSource = "<source src='https://player.vimeo.com/external/209916180.sd.mp4?s=b544634ea500342fed7e053cd178c62817a9ed02&profile_id=165' type='video/mp4'>";
	    	break;
	    	case "spiritualist_houdini": 
	    		videoFileSource = "<source src='https://player.vimeo.com/external/209916122.sd.mp4?s=09c6b30ef5d1e1700d86a22b04d17488ca6a7bb5&profile_id=164' type='video/mp4'>";
	    	break;
		}
		$(this).addClass('playing');
		var video = "<div class='videoEle'><video autoplay='autoplay'>" + videoFileSource + "Your browser doesn't support HTML5 video tag.</video><div class='progressBar'><span class='progress'></span></div></div>";
		var video_holder = $(this).closest('.draggable');
		video_holder.addClass('startVideo');
		$('.startVideo > div').addClass('fadeOut');
		setTimeout(function(){
			$('.startVideo > div').removeClass('fadeOut');
			setTimeout(function(){
				$('.startVideo').append(video);
				$('.startVideo video').on("timeupdate", function(){
					updateProgress($(this));
				});
				$('.startVideo video')[0].play();
				$('.startVideo video').on('ended',function(){
					$('.startVideo > div').addClass('fadeOut endVideo');
					setTimeout(function(){
						$('.videoEle').remove();
						$('.startVideo > div').removeClass('fadeOut endVideo');
						video_holder.css("zIndex", 50);
						video_holder.removeClass('startVideo');
						$('.draggable .video').removeClass('playing');
					}, 5000);
				});
			}, 2500);
		}, 5000);
	});
	
	$(document).on('click','.videoEle video',function(e){
		e.preventDefault();
		var video = $(this);
		var videoImg = $(this).parent().siblings().children('img.playing');
		var pausedIcon = $(this).parent().siblings('.pauseIcon');
		if(videoImg.hasClass('paused')){
			videoImg.removeClass('paused');
			pausedIcon.removeClass('show');
			video[0].play();
		}else{
			videoImg.addClass('paused');
			pausedIcon.addClass('show');
			video[0].pause();
		}
	});
	
	$(document).on('click','.videoPause.pauseIcon',function(e){
		e.preventDefault();
		var pausedIcon = $(this);
		var video = $(this).siblings().children('video');
		var videoImg = $(this).siblings().children('img.playing');
		if(videoImg.hasClass('paused')){
			videoImg.removeClass('paused');
			pausedIcon.removeClass('show');
			video[0].play();
		}else{
			videoImg.addClass('paused');
			pausedIcon.addClass('show');
			video[0].pause();
		}
	});
	
	$(document).on('click','.aboutVideo .videoWrapper .play',function(e){
		e.preventDefault();
		var video = $('.aboutVideo .videoWrapper video');
		var videoImg = $(this);
		var pausedIcon = $('.aboutVideo .videoWrapper .pause');
		videoImg.removeClass('show');
		pausedIcon.addClass('show');
		video[0].play();
	});
	
	$(document).on('click','.aboutVideo .videoWrapper .pause',function(e){
		e.preventDefault();	
		var video = $('.aboutVideo .videoWrapper video');
		var pausedIcon = $(this);
		var videoImg = $('.aboutVideo .videoWrapper .play');
		pausedIcon.removeClass('show');
		videoImg.addClass('show');
		video[0].pause();
	});
	
	$(document).on('click','.audioHolder',function(e){
		e.preventDefault();
		var el = $(e.target);
		var pausedIcon = el.closest('.audioHolder').find('.pauseIcon');
		var audio = el.closest('.audioHolder').find('audio');
		var audioButton = el.closest('.audioHolder').find('.audioButton');
		
		if(!el.hasClass('audioButton') && audio.length){
			if(audio[0].currentTime > 0){
				if(audioButton.hasClass('paused')){
					//paused so play
					audioButton.removeClass('paused');
					pausedIcon.toggleClass('show');
					audio[0].play();
				}else{
					//playing so paused
					pausedIcon.toggleClass('show');
					audioButton.addClass('paused');
					audio[0].pause();
				}	
			}else{
				pausedIcon.removeClass('show');
			}
		}
	});
	
	$(document).on('click', '.draggable .audioButton:not(.playing)', function(){
		var audioFile = $(this).data('id');
		var audioFileSource = "";
		switch(audioFile){
			case "adventurer": 
				audioFileSource = "<source src='../audio/adventurer/arthur-conan-doyle-adventurer-10-years.mp3' type='audio/mpeg'><source src='../audio/adventurer/arthur-conan-doyle-adventurer-10-years.wav' type='audio/wav'>";
			break;
	    	case "author": 
	    		audioFileSource = "<source src='../audio/author/arthur-conan-doyle-author-sherlock.mp3' type='audio/mpeg'>";
	    	break;
		}
		$(this).addClass('playing');
		var audio = "<div class='audioEle'><audio autoplay='autoplay'>" + audioFileSource + "Your browser does not support the audio element.</audio><div class='progressBar'><span class='progress'></span></div></div>";
		var audio_holder = $(this).closest('.draggable');
		audio_holder.addClass('startAudio');
		$('.startAudio > div').addClass('fadeOut endAudio');
		setTimeout(function(){
			$('.startAudio').append(audio);
			$('.startAudio audio').on("timeupdate", function(){
				updateProgress($(this));
			});
			$('.startAudio audio')[0].play();
			$('.startAudio audio').on('ended',function(){
				$('.startAudio > div').addClass('fadeOut endAudio');
				setTimeout(function(){
						$('.audioEle').remove();
						$('.startAudio > div').removeClass('fadeOut endAudio');
						audio_holder.css("zIndex", 50);
						audio_holder.removeClass('startAudio');
						$('.draggable .audioButton').removeClass('playing');
				}, 2500);
			});
		}, 5000);
	});
	
	//lazy load images
	$("img.lazy").unveil(100, function() {
		$(this).load(function() {
	    	this.style.opacity = 1;
	    	
	    	//load map and show points
	    	if($(this).hasClass('theMap')){
	    		$('.worldMap').addClass('showPoints');
	    	}
	    	
	    	//load images in draggable
	    	if($(this).parents().hasClass('photoItems')){
	    		$(this).parents('.photoItems').addClass('photoItemsInView');
	    	}
	    	
		   	if($(this).parents('.lifestyleAnimation')){
		   		$(this).addClass('animate');
		   	}
	  	});
	});
	
	$(document).on('click','.skipSig',function(e){
		e.preventDefault();
		switchStuff(1);
	});
	
	scrollPen();
		
	$('.panzoom').panzoom();
	
	$(document).on('click', '.boerMap', function(e){
		e.preventDefault();
		
		if(!$(this).hasClass('zoomed')){
			
			var pos = $('.boerMap').offset().top;
	    	$('html, body').animate({
	    		scrollTop: pos
	    	}, 100);
	    	
			setTimeout(function(){
				var x = e.pageX - $('.panzoom').offset().left;
			    var y = e.pageY - $('.panzoom').offset().top;
				
				$('.panzoom').panzoom("zoom",{
					increment: 3,
			    	focal: {
			    		clientX: x,
			    		clientY: y
			    	}
			  	});
			},100);
			
			//console.log(x+" and "+y+" and e is "+e);
		}
		else{
			$('.panzoom').panzoom("reset");
		}
		$('.boerMap').toggleClass('zoomed');
		$('.boerMap img').toggleClass('zoomed');
	});
	
	$(document).on('click', '#signup_button', function(e){
		e.preventDefault();
		var email = $('#signup_email').val();
		if (isEmail(email)) {
			$.ajax({
				url: "/php/ajax/signupToMailingList.php",
				type: "POST",
				data: {email: email},
				success: function(data){
					$('.emailContainer .message span').html(data);
					$('.emailContainer .message').addClass('fadeIn');
					setTimeout(function(){
						$('.emailContainer .message').removeClass('fadeIn');
					}, 4000);
				}
			});
		}
		else{
			console.log('error');
		}
	});
	
	////////////////////////////////////////////////////////////// ENQUIRY FORM
	
	$(".dropdown ul li").click(function(){
		if($(".dropdown  span.selected").is(':contains("What is your enquiry regarding*")')) {
	
			
		}else{
			$('#enquiry_form .hiddenForm').fadeIn();
		}
	});
	
	$("#enquiry_type").change(function (){
		if($(this).val()=== ""){
			$('#enquiry_form .hiddenForm').fadeOut();
		}else{
			$('#enquiry_form .hiddenForm').fadeIn();
		}
	});
	
	$(document).on('submit','#enquiry_form',function(e){
		e.preventDefault();
		
		var valid = true;
		
		type = $('#enquiry_type').val();
		name = $('#enquiry_name').val();
		email = $('#enquiry_email').val();		
		company = $('#enquiry_company').val();
		country = $('#enquiry_country').val();
		message = $('#enquiry_message').val();

		$("#enquiry_form input.required").each(function() { 
			if(!$(this).val() || $(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
				valid = false;		
			}
		});
		
		$("#enquiry_form textarea").each(function() { 
			if(!$(this).val() || $(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
				valid = false;		
			}
		});
		
		//check email
		if(!isEmail(email)){
			valid = false;
		}
		
		//proceed to submit or fail
		if (!valid) {
			$('.enquiryResponse').fadeOut();
			$('.enquiryResponse').html('Please make sure you fill in all fields correctly.');
			$('.enquiryResponse').removeClass('success');
			$('.enquiryResponse').fadeIn();
		}else{
			url = "../php/ajax/sendEnquiry.php";
			url = encodeURI(url);
			
			post_data = {
					  	type: type,
					  	name: name,
					  	email: email,
						company: company,
						country: country,
						message: message
			};
			
			$.post(url, post_data, function(data) {
				if(data=="Thank you for your enquiry. We will be in touch soon."){
					$('.enquiryResponse').fadeOut('slow',function(){		
						$('.enquiryResponse').html(data);
						$('.enquiryResponse').addClass('success');
						$('.enquiryResponse').fadeIn();
						$('#enquiry_form')[0].reset();
						$('#enquiry_form').fadeOut();
						
					});
				}else{
					$('.enquiryResponse').fadeOut('slow',function(){
						$('.enquiryResponse').html(data);
						$('.enquiryResponse').removeClass('success');
						$('.enquiryResponse').fadeIn();
					});
				}
			});
		}
		return false;
	});
	
	////////////////////////////////////////////////////////////// 
});
//end dom ready

//window load
$(window).on('load',function(){
	
	if(location.hash) {
		$('html, body').animate({
		 	scrollTop: $("#" + location.hash.substr(1)).offset().top
		}, 1000);
	}
	
	var url_pathname = window.location.pathname; 
	if(url_pathname == '/licensing'){
		$('html, body').animate({
			scrollTop: $("#licensing").offset().top
		}, 1000);
	}
	else if(url_pathname == '/lifestyle'){
		$('html, body').animate({
			scrollTop: $("#lifestyle").offset().top - 50
		}, 1000);
	}else if(url_pathname == '/books' || url_pathname == '/best-sellers'){
		$('html, body').animate({
			scrollTop: $("#books").offset().top - 40
		}, 1000);
	}else if(url_pathname == '/meet-the-family'){
		$('html, body').animate({
			scrollTop: $("#meet-the-family").offset().top
		}, 1000);
	}else if(url_pathname == '/family-tree'){
		$('html, body').animate({
			scrollTop: $("#family-tree").offset().top - 20
		}, 1000);
	}else if(url_pathname == '/tributes'){
		$('html, body').animate({
			scrollTop: $("#tributes").offset().top - 310
		}, 1000);
	}
	
	if($(window).width() > 760 && !$('html').hasClass('ipad')){
		var el = $('.slide.slick-active').children('video');
		if(el.length){
			var src = el.data('src');
			el.attr("src",src);
			el[0].play();
			
			setTimeout(function(){
				$('.slide:not(.slick-active)').each(function(){
					var el = $(this).children('video');
					var src = el.data('src');
					el.attr("src",src);
					$(this).removeClass('ghost');
				});
			},800);
			hideLoading();
		}
		
		/*$('.footerVideos div').each(function(){
			var el = $(this).children('video');
			var src = el.data('src');
			el.attr("src",src);
		});*/
		
		var av = $('.aboutVideo video');
		var src = av.data('src');
		av.attr("src",src);
		
		var el = $('.entertainmentTop video');
		var src = el.data('src');
		el.attr("src",src);
	}
	
	var $grid = $('.productList').imagesLoaded(function() {
	  	// init Isotope after all images have loaded
	  	$grid.isotope({
	    	itemSelector: '.product',
	    	percentPosition: true,
		    masonry: {
		      columnWidth: '.product.half'
		    }
	  	});
	});
});
//end window load

$(window).on('load resize orientationchange touchmove scroll', function(){
	if(!$('html').hasClass('404') && !$('html').hasClass('termsPage') && !$('html').hasClass('privacyPage') && !$('html').hasClass('homePage') && !$('html').hasClass('contactPage') && !$('html').hasClass('licensingPage') && !$('html').hasClass('aboutPage') && !$('html').hasClass('productsPage') && !$('html').hasClass('brandPage') && !$('html').hasClass('newsPage')){
		if($(this).scrollTop() >= $(this).height()){
			$('nav').addClass('whiteBg');
		}
		else{
			$('nav').removeClass('whiteBg');
		}
	}
	if($(window).width() > 768 && !$('html').hasClass('ipad')){
		if($('.article.desktop .articleContent').length){
			var scrollPos = $(window).scrollTop();
			var articleTop = $('.article.desktop .articleContent').offset().top;
			var wHeight = $(window).height();
			var articleContentHeight = $('.article.desktop .articleInnerContent').height();
			var articleImagesHeight = $('.article.desktop .articleImages').height();
			var articleImagesWidth = $('.article.desktop .articleImages').width();
			var articleContentBottom = (articleContentHeight + articleTop) - wHeight;
			var articleImagesBottom = (articleImagesHeight + articleTop) - wHeight;
			var articleTopMinusImagesHeight = articleImagesHeight - articleTop;
			if((articleContentHeight >= articleImagesHeight || (scrollPos <= articleTopMinusImagesHeight && scrollPos < articleContentBottom)) || (articleContentHeight < articleImagesHeight && articleContentHeight < wHeight)){
				$('.article.desktop .articleContent .articleInnerContent').css({
					"position": "absolute",
					"top": 0,
					"bottom": "auto"
				});
				if(articleContentHeight >= articleImagesHeight){
					$('.article.desktop .articleImages').css({
						"height" : articleContentHeight
					});
				}
			}
			else if(scrollPos >= articleContentBottom && scrollPos < articleImagesBottom){
				$('.article.desktop .articleContent .articleInnerContent').css({
					"position": "fixed",
					"top": ((articleContentHeight - wHeight) * -1), // 20 bottom padding
					"width": articleImagesWidth
				});
			}
			else if(scrollPos >= articleImagesBottom){
				$('.article.desktop .articleContent .articleInnerContent').css({
					"position": "absolute",
					"top": "auto",
					"bottom": 0
				});
				$('.article.desktop .articleContent .articleInnerContent:after').css({
					"height": "0"
				});
			}
		}
	}
	scrollPen();
});

$(window).scroll(function() {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".timelineEvent div").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + 200;
      
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) {$(this).fadeTo(1000,1);}
        $(this).removeClass('notInView');
        $(this).addClass('inView');
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity")==1) {$(this).fadeTo(1000,0);}
        $(this).removeClass('inView');
        $(this).addClass('notInView');
      }
    });
    $(".timelimePresent").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + 100;
      
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) {$(this).fadeTo(1000,1);}
        $(this).removeClass('notInView');
        $(this).addClass('inView');
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity")==1) {$(this).fadeTo(1000,0);}
        $(this).removeClass('inView');
        $(this).addClass('notInView');
      }
    });
    $(".oneBook").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + 200;
      
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) {$(this).fadeTo(1000,1);}
        $(this).removeClass('notInView');
        $(this).addClass('inView');
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity")==1) {$(this).fadeTo(1000,0);}
        $(this).removeClass('inView');
        $(this).addClass('notInView');
      }
    });
}).scroll(); //invoke scroll-handler on page-load


function updateProgress(ele) {
	var progress = ele.siblings(".progressBar").children(".progress");
	var value = 0;
	if (ele[0].currentTime > 0) {
		value = Math.floor((100 / ele[0].duration) * ele[0].currentTime);
	}
	progress.width(value + "%");
}

function switchStuff(timer){
	setTimeout(function(){
		$('.signatureHolder').addClass('switch');
		$('.skipSig').addClass('switch');
		$('nav').removeClass('hide');
		$('.homeIntro').removeClass('hide');
	},timer);
}

function scrollPen(){
	if($('.penHolder').length){
		var scrollTop = $(window).scrollTop(),
			wH  = $(window).height(),
			lid = $('.lid'),
			pen = $('.penBody'),
			nib = $('.nib'),
			lidOffset = lid.offset().top;

		//if scrolled to bottom of lid, start moving things
		if(scrollTop > ((lidOffset - wH) + 60)){
			var diff = scrollTop - (lidOffset - wH);
			//pen body
			if(diff > 220){
				if(diff > 512){
					pen.removeClass('fixed');
				}else{
					pen.addClass('fixed');
				}
			}else{
				pen.removeClass('fixed');
			}
			//pen nib
			if(diff > 450){
				if(diff > 490){
					nib.css('top',280);
				}else{
					var nD = (490 - diff)+280;
					nib.css('top',nD);
				}
			}
			//console.log(diff);
		}else{
			pen.removeClass('fixed');
			nib.css('top',320);
		}
	}
}

//create custom draggable function to save writing it out lots of times
function createDraggy(type){
	$('.photoSplash.'+type+' .photoItems .draggable').draggable({
		containment: ".photoSplash."+type+" .photoItems",
		scroll: false,
		stack: ".photoSplash."+type+" .photoItems div.draggable"
	});
}

function hideLoading(){
	if($('.slideshow').hasClass('slick-initialized')){
		var video = $('.slick-active video')[0];
		//console.log(video.readyState);
		if (video.readyState === 4 ) {
			$('.loadingScreen').addClass('hide');
			setTimeout(function(){
				$('.loadingScreen').addClass('remove');
			},400);
		}else{
			setTimeout(function(){
				hideLoading();
			},500);
		}
	}else{
		setTimeout(function(){
			hideLoading();
		},500);
	}
}

function initStuff(){
	//reinit draggy
	if($(window).width() > 760 && !$('html').hasClass('ipad')){
		$('.photoSplash').each(function() {
			var classes = $(this).attr('class').split(' ');
			var photoSplashEle = classes[1];
			createDraggy(photoSplashEle);
		});
		
		$('.panzoom').panzoom();
	}
	setTimeout(function(){
		$("img.lazy").unveil(800, function() {
			$(this).load(function() {
			   	this.style.opacity = 1;
			    	
			   	//load map and show points
			   	if($(this).hasClass('theMap')){
			   		$('.worldMap').addClass('showPoints');
			   	}
			    	
			   	//load images in draggable
			   	if($(this).parents().hasClass('photoItems')){
			   		$(this).parents('.photoItems').addClass('photoItemsInView');
			   	}
			 });
		});
	},100);
	
	setTimeout(function(){
		if($('.sliderContainer .sliderEle.bookOne').length){
			//console.log('length hit');
			$('.sliderContainer .sliderEle.bookOne').slick({
				//centerMode: true,
				dots: true,
				fade: true,
				infinite: true,
			  	speed: 600,
			  	autoplay: false,
			  	slidesToShow: 1,
		  		slidesToScroll: 1,
		  		slide: 'img',
		  		lazyLoad: 'progressive',
		  		prevArrow: '.sliderContainer .bookOne .prev',
				nextArrow: '.sliderContainer .bookOne .next'
			});
			
			$('.sliderContainer .sliderEle.bookTwo').slick({
				dots: true,
				fade: true,
				infinite: true,
			  	speed: 600,
			  	autoplay: false,
			  	slidesToShow: 1,
		  		slidesToScroll: 1,
		  		slide: 'img',
		  		lazyLoad: 'progressive',
		  		prevArrow: '.sliderContainer .bookTwo .prev',
				nextArrow: '.sliderContainer .bookTwo .next'
			});
		}
	},600);
	
	/*if($(window).width() > 760 && !$('html').hasClass('ipad')){
		$('.footerVideos div').each(function(){
			var el = $(this).children('video');
			var src = el.data('src');
			el.attr("src",src);
		});
	}*/
}

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}
