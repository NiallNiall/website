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




// ==================================================
// Mo JS Stuff
// ==================================================


function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}

var infobutton = document.getElementById("info-button");
var xPos = getOffset(infobutton).left;
var yPos = getOffset(infobutton).top;


window.addEventListener("resize", function(){
	xPos = getOffset(infobutton).left;
	yPos = getOffset(infobutton).top;
});

var pinkclr = '#ffA6B2';
var burstclr = pinkclr;


const RADIUS = 40;
const circle = new mojs.Shape({
  left: 0, top: 0,
  stroke:   burstclr,
  strokeWidth: { [2*RADIUS] : 0 },
  fill:     'none',
  scale:    { 0: 1, easing: 'quad.out' },
  radius:   RADIUS,
  duration:  800,
});

const burst = new mojs.Burst({
left: 0, top: 0,
  radius:   { 20: RADIUS - 3 },
  angle:    0,
  count:    8,
  children: {
    shape:        'circle',
    radius:       10,
    fill:         burstclr,
    // degreeShift:  'stagger(0,-5)',
    duration:     2400,
    // delay:        200,
    easing:       'quad.out',
    // delay:        100,
  }
});

var cloudz = new mojs.Burst({
	left:0, top:0,
  y:              { 0: -100, easing: 'cubic.in' },
  count:          'rand(4,10)',
  degree:         40,
  angle:         -25,
  radius:         { 0 : 200 },
  children: {
    fill:           burstclr,
    radius:         'rand(10, 20)',
    pathScale:      ['rand(0, .5)', 'rand(.5, 1)'],
    degreeShift:    'rand(.2, 1)',
    swirlFrequency: 'rand(3, 10)',
    direction:      [ 1, -1 ],
    isSwirl:        true,
    duration:       2000,
    easing:         'cubic.out',
    isForce3d:      true,
	delay: 300
  }
});


const timeline = new mojs.Timeline({ speed: 1.5 });

timeline.add(circle, cloudz);


var circSize = 20;
document.addEventListener( 'click', function (e) {
  const coords = { x: xPos +circSize, y: yPos +circSize};
  burst.tune(coords);
  circle.tune(coords);
  cloudz.tune(coords);
  timeline.replay();
});


