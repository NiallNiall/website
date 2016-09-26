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



// ==================================================
// scroll through arrows click
// ==================================================

function arrowNavigation(btnName) {
  var btn = document.getElementById(btnName);
  if(btn){
    var btnlink = btn.getAttribute("href");
    window.location.href = btnlink;
  } else {
    console.log("cannot go in that direction");
  }
}

function leftArrowPressed() {
  arrowNavigation("portnav-prev");
}

function rightArrowPressed() {
  arrowNavigation("portnav-next");
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};


// ==================================================
// Modal
// ==================================================


  var modalClear = false;

  // Working on Removing jQuery. Removing classes with a prototype

  HTMLElement.prototype.removeClass = function(remove) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== remove) {
            newClassName += classes[i] + " ";
        }
    }
    this.className = newClassName;
}

  // Get Characters
  var closeModalBtn = document.getElementById('closeModal');
  var modal = document.getElementById('Modal');

  var closeModal = function(tempModal) {
    tempModal.removeClass("modalOpen");
    modalClear = true;
  }

  if(closeModalBtn){
    closeModalBtn.onclick = function() {
      closeModal(modal);
    }
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          closeModal(modal);
      }
  }