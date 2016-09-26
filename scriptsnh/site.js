// Tiny Modernizr Build=========================================================================

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-canvas-inlinesvg-video-webaudio-setclasses !*/
!function(e,n,a){function o(e,n){return typeof e===n}function t(){var e,n,a,t,s,c,l;for(var p in r)if(r.hasOwnProperty(p)){if(e=[],n=r[p],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(a=0;a<n.options.aliases.length;a++)e.push(n.options.aliases[a].toLowerCase());for(t=o(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)c=e[s],l=c.split("."),1===l.length?Modernizr[l[0]]=t:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=t),i.push((t?"":"no-")+l.join("-"))}}function s(e){var n=p.className,a=Modernizr._config.classPrefix||"";if(d&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+a+"no-js(\\s|$)");n=n.replace(o,"$1"+a+"js$2")}Modernizr._config.enableClasses&&(n+=" "+a+e.join(" "+a),d?p.className.baseVal=n:p.className=n)}function c(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):d?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var i=[],r=[],l={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var a=this;setTimeout(function(){n(a[e])},0)},addTest:function(e,n,a){r.push({name:e,fn:n,options:a})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr,Modernizr.addTest("webaudio",function(){var n="webkitAudioContext"in e,a="AudioContext"in e;return Modernizr._config.usePrefixes?n||a:a});var p=n.documentElement,d="svg"===p.nodeName.toLowerCase();Modernizr.addTest("audio",function(){var e=c("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),n.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(a){}return n}),Modernizr.addTest("canvas",function(){var e=c("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("video",function(){var e=c("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),n.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),n.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(a){}return n}),Modernizr.addTest("inlinesvg",function(){var e=c("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)}),t(),s(i),delete l.addTest,delete l.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();e.Modernizr=Modernizr}(window,document);








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

  var goModalBtn = document.getElementById('goModal');

  if(goModalBtn){
    goModalBtn.onclick = function() {
      closeModal(modal);
    }
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          closeModal(modal);
      }
  }