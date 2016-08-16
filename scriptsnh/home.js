$.easing.custom = function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    }


$(".home-button").click(function() {
	event.preventDefault(); 
	var defaultAnchorOffset = 0;

	var anchor = $(this).attr('data-attr-scroll');
	        
	var anchorOffset = $('#'+anchor).attr('data-scroll-offset');
	if (!anchorOffset)
	    anchorOffset = defaultAnchorOffset; 

	$('html,body').animate({ 
	    scrollTop: $('#'+anchor).offset().top - anchorOffset
	}, 700, "custom");
});



