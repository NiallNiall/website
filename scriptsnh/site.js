$("#about-menu-btn").click(function(event) {
  event.preventDefault();
  // alert("yoyo");
  $('.menu-top').toggleClass( "showmenu" )
});

$(document).ready(function() {
  $(window).scroll( function(){
    var scrollTop = $(window).scrollTop();

    if(scrollTop >= 100) {
      $('body').addClass( "scrolleddown" );
    }

    if(scrollTop <= 100) {
      $('body').removeClass( "scrolleddown" );
    }


    $('.parallax-bg-1').css("margin-top", (0 - (scrollTop*0.45))+"px");
    $('.parallax-bg-2').css("margin-top", (0 - (scrollTop*0.30))+"px");
    $('.parallax-bg-3').css("margin-top", (0 - (scrollTop*0.15))+"px");


  });


  $.easing.custom = function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  }


  $("#hero-down-btn").click(function() {
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


});