$.easing.custom = function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    }


  $("#home-button").click(function() {
    event.preventDefault();
    // alert('hai hai');
    $('html, body').animate({
        scrollTop: $("#lower-content").offset().top
    }, 700, "custom");
  });