// ==================================================
// Initialise Colours
// ==================================================

var darkBlueClr = '#003f5d';
var midBlueClr = '#17557D';
var lightBlueClr = '#d3ebef';
var lightOrangeClr = '#ff9c4f';
var darkOrangeClr = '#FF6347';
var darkRedClr = '#c2240c';
var darkPinkClr = '#ffa6b2';

var edgeClr = darkOrangeClr;
var innerClr = darkOrangeClr;
// =========
var dragonHeadClr = darkOrangeClr;
var dragonNostrilClr = darkRedClr;
var dragonEyelidClr = darkRedClr;
var dragonEyeClr = midBlueClr;
var dragonWhiskerClr = darkOrangeClr;
// =========
var mainStepClr = darkPinkClr;
var mainhighlightClr = darkOrangeClr;
// =========
var sinus = 100;//Math.sin(event.time * 10);

// ==================================================
// Load SVGs and Colour Them
// ==================================================

// Dragon Head ==================================

var headSVG = project.importSVG(document.getElementById('drag-head'));
headSVG.visible = true; // Turn off the effect of display:none;
headSVG.position = new Point(0,0);
headSVG.scale (0.3);
headSVG.rotate(270);

headSVG.children[0].fillColor = edgeClr;
headSVG.children[1].fillColor = dragonHeadClr;
headSVG.children[7].fillColor = dragonNostrilClr;
headSVG.children[13].fillColor = dragonNostrilClr;
headSVG.children[8].fillColor = dragonEyelidClr;
headSVG.children[12].fillColor = dragonEyelidClr;
headSVG.children[2].fillColor = dragonEyelidClr;
headSVG.children[6].fillColor = dragonEyelidClr;
headSVG.children[3].fillColor = dragonEyeClr;
headSVG.children[5].fillColor = dragonEyeClr;
headSVG.children[9].fillColor = dragonEyeClr;
headSVG.children[11].fillColor = dragonEyeClr;

head = new Symbol(headSVG);
head = head.place(0,0);

// Dragon Tail End ==================================

var tailendSVG = project.importSVG(document.getElementById('drag-tailend'));
tailendSVG.visible = true; // Turn off the effect of display:none;
tailendSVG.position = new Point(0,0);
tailendSVG.scale (0.2);
tailendSVG.rotate(270);

tailendSVG.children[0].fillColor = edgeClr;
tailendSVG.children[1].fillColor = edgeClr;
tailendSVG.children[2].fillColor = innerClr;
// tailendSVG.children[0].fillColor = dragonHeadClr;

tailEnd = new Symbol(tailendSVG);
tailEnd = tailEnd.place(0,0);

// Dragon Tail Segment ==================================

var tailSegSVG = project.importSVG(document.getElementById('drag-seg'));

tailSegSVG.visible = true;
tailSegSVG.position = new Point(200, 200);
tailSegSVG.scale(0.1);
tailSegSVG.rotate(90);
var tailSeg = new Symbol(tailSegSVG);


var hoverCircle = new Path.Circle(new Point(100, 70), 10);
hoverCircle.fillColor = null;
hoverCircle.strokeColor = 'white';
hoverCircle.scaling = 5.0;

var hoverCircleInner = new Path.Circle(new Point(100, 70), 5);
hoverCircleInner.fillColor = edgeClr;
hoverCircleInner.scaling = 5.0;


mousePos = new Point(0, 0);
target = new Point(0,0);

targetHeadRot = 0;
currentHeadRot = 0;

var whiskerSeg = [new Point(0,0), new Point(100,100) ]
var whisker1 = new Path(whiskerSeg);
whisker1.strokeColor = dragonWhiskerClr;
whisker1.strokeWidth = 5;
whisker1.strokeCap = 'round';
whisker1.strokeJoin = 'round';

// var whiskerSeg = [new Point(0,0), new Point(100,100) ]
var whisker2 = new Path(whiskerSeg);
whisker2.strokeColor = dragonWhiskerClr;
whisker2.strokeWidth = 5;
whisker2.strokeCap = 'round';
whisker2.strokeJoin = 'round';

// whisker1.smooth();

// whiskerSpot = new Path.Circle(new Point(100, 70), 14);
// whiskerSpot.fillColor = 'white';
// whiskerSpot.strokeColor = edgeClr;
// whiskerSpot.strokeWidth = 7;



var dragSegment = Base.extend({
    initialize: function(position) {
        this.position = position;
        var tailSegCopy = new Symbol(tailSegSVG);

        // Create a symbol from the path:
        var symbol = new Symbol(tailSegSVG);


        this.mySVG = symbol.place(0,0);

        this.speed = [Math.random(1.0,5.0),Math.random(1.0,5.0)];
        this.direction = [1,1];
        this.available = true;
        this.leavingContact = false;
        this.rotation = 0;

        this.basecolor = {
            hue: 100,
            saturation: 1,
            brightness: 1
        };
        this.basescaling = 1.0;

        // this.mySVG.fillColor = color1;

    },
    run: function() {
        this.mySVG.position = this.position;
        this.mySVG.rotation = this.rotation;
        // this.moveAround();
    },
    move: function(position) {
        this.position = position;
    },
    move: function(position, rotate) {
        this.position = position;
        this.rotation = rotate;
    },
    resize: function(radius) {
        this.mySVG.scale(radius);
    },
    moveAround: function() {
        var xPos = this.position.x;
        var yPos = this.position.y;
        var xSize = view.viewSize.width;
        var ySize = view.viewSize.height;
        this.position.x += (this.speed[0] * this.direction[0]);
        this.position.y += (this.speed[1] * this.direction[1]);
        if(xPos > xSize){ this.direction[0] = -1;} else if(xPos < 10){ this.direction[0] = 1;}
        if(yPos > ySize){ this.direction[1] = -1;} else if(yPos < 10){ this.direction[1] = 1;}
    },
    collide: function() {

        if(this.available){
            this.sendMessage();
            this.changeColour(edgeClr, 'white');
            this.scaleSegment(this.basescaling * 1.2);
            this.available = false;
            this.leavingContact = true;
        }

    },
    unCollide: function() {
         if(this.leavingContact){
        //     // this.sendMessage();
            this.available = true;
            this.scaleSegment(this.basescaling);
            this.leavingContact = false;
            this.changeColour(edgeClr, innerClr);
        }


    },
    sendMessage: function() {
        // console.log("Ho Ho Ho");
    },
    changeZIndex: function() {
        // this.myCircle.
    },
    scaleSegment: function(scl) {
        this.mySVG.scaling = scl;
    },
    scaleSegmentbyInc: function(scl) {
        this.basescaling = scl;
        this.scaleSegment(this.basescaling);
    },
    changeColour: function() {
    },
    changeColour: function(color, color2) {
          this.mySVG.symbol.definition.children[0].children[0].fillColor = color;
          this.mySVG.symbol.definition.children[0].children[1].fillColor = color2;
    },
    changeColourbyInc: function(incre) {

        this.basecolor = edgeClr;
        this.changeColour(edgeClr, innerClr);
    }

});

// =====================================================
// =====================================================


function createTrigger() {

  var available = true;

  var trigger = {
    available: true,
    triggerEvent: triggerEvent,
    triggerOff: triggerOff,
    triggerOn: triggerOn,
    getAvailable: getAvailable,
    setPitch: setPitch
  };

  return trigger;

  function triggerEvent(trigEventVar) {

    if(available){
      trigEventVar();
      sendMessage();
      triggerOff();
    }

  }

  function sendMessage() {

  }

  function triggerOff() {
    available = false;
  }

  function triggerOn() {
    available = true;
  }

  function getAvailable() {
    return available;
  }

  function setPitch(){

  }

  function setSynth(synthVar){

  }

}

// =====================================================
// =====================================================


function createStep(constructPos, clr) {

    // Set Availability Boolean
    var available = true;
    // Create a copy to store previous state
    var oldAvailable = available;

    // Create an instance of a trigger
    var trigger = createTrigger();
    // Set Colour to the constructor colour
    var clr1 = clr;
    // Set Position to the constructor position
    var position = constructPos;
    // Create an empty shape
    var thisShape = new paper.Path();

    // create a locally scoped variable so it's not overwritten
    var trigEvent;

    var setTrigEvent = function(trigEventVar) {
      trigEvent = trigEventVar;
    }

    function createShape(shape){
      thisShape = shape;
      thisShape.fillColor = clr1;
    }

    var strokeOnColor = mainhighlightClr;
    var strokeOnWidth = 15.0;
    var strokeOffWidth = 5.0;

    var strokeOffColor = null;

    var shapeOn = function(){
      thisShape.strokeColor = strokeOnColor;
      thisShape.strokeWidth = strokeOnWidth;
    }

    var shapeOff = function(){
      thisShape.fillColor = clr1;
      thisShape.strokeColor = strokeOffColor;
      thisShape.strokeWidth = strokeOffWidth;
    }

    var removeStep = function(){
      thisShape.remove();
    }

  function drawStep(){

  }

  function getPosition() {
    return position;
  }

  function getAvail(){
    var rtnavail = available;
    return rtnavail;
  }

  // Check the distance between passed Variable and this one.
  function checkDistance(testPosition) {

    var distGap = position.subtract(testPosition);
    var testResult = false;

    if(distGap.length < 25) {
      testResult = true;
    } else {
      testResult = false;
    }
    return testResult;
  }

  function setAvail(availBit){
    available = availBit;
    if(oldAvailable == available){

    } else {
      if(!available) {
        // console.log("out");
        triggerEvent();
      } else {
        // console.log("in");
        triggerOn();
      }
    }
    oldAvailable = available;

  }

  function triggerEvent(){
      trigger.triggerEvent(trigEvent);
      shapeOn();
  }

  function triggerOn(){
      trigger.triggerOn();
      shapeOff();
  }

  function setOnStroke(tempStrokeColor, tempStrokeSize) {
    // shapeOn = tempShapeFunc;
    strokeOnWidth = tempStrokeSize;
    strokeOnColor = tempStrokeColor;
  }

  function setOffStroke(tempStrokeColor, tempStrokeSize) {
    strokeOffColor = tempStrokeColor;
    strokeOffWidth = tempStrokeSize;
  }


    var step = {
    position: getPosition,
    // stepTrig: createTrigger,
    radius: Math.random() * 100,
    drawStep: drawStep,
    createShape: createShape,
    setTrigEvent: setTrigEvent,
    checkDistance: checkDistance,
    triggerEvent: triggerEvent,
    available: available,
    getAvail: getAvail,
    setAvail: setAvail,
    setOnStroke: setOnStroke,
    setOffStroke: setOffStroke,
    removeStep: removeStep
  }

  return step;

}


// =====================================================
// =====================================================

function createSnare(constructPos) {

    var snareStep = createStep(constructPos, mainStepClr);
    radius = 20;

    function createShape(constructPos) {
      var myShape = new paper.Path.Circle(constructPos.subtract(radius/2), radius);
      return myShape;
    }

    var trigEventVar = function(){
      console.log("Snare Triggered!");
      // snare.triggerAttackRelease("32n");
    }

    snareStep.setTrigEvent(trigEventVar);

    var myShape = createShape(constructPos);
    snareStep.createShape(myShape);

    return snareStep;

}

var newPoint = new paper.Point(Point.random() * new paper.Point(view.bounds.width,view.bounds.height));
var anenomeStep = createSnare(newPoint);



// =====================================================
// =====================================================



function moveDragon(incre, xin, yin) {

    var drgSgX = drgnSg[incre].position.x;
    var drgSgY = drgnSg[incre].position.y;

    var segLength = 30;
    var dx = xin - drgSgX;
    var dy = yin - drgSgY;
    var angle = Math.atan2(dy, dx);
    drgSgX = xin - Math.cos(angle) * segLength;
    drgSgY = yin - Math.sin(angle) * segLength;

    drgnSg[incre].move(new Point(drgSgX, drgSgY), angle * 180 / Math.PI);

}


function moveWhisker(whisker, point1, direction, leftright) {
    whiskerDir = direction.normalize();
    var whiskP1 = point1;
    var whiskP2 = point1 + whiskerDir * 40;
    var whiskP3 = point1 + whiskerDir * 150;

    var whiskerdist = 20 + sinus;//150;
    var smallwhiskerdist = 80 - sinus;

    if(leftright == 'left'){
        var whiskerEnd = new Point(whiskP3.x + (whiskerDir.y * smallwhiskerdist), whiskP3.y - (whiskerDir.x * smallwhiskerdist));
    } else {
        var whiskerEnd = new Point(whiskP3.x + (whiskerDir.y * -smallwhiskerdist), whiskP3.y - (whiskerDir.x * -smallwhiskerdist));
    }


    whisker.segments[0].point = whiskP1;
    if(leftright == 'left'){
        whisker.segments[0].handleOut = new Point(whiskerDir.y * 90,whiskerDir.x * -90);
    } else {
        whisker.segments[0].handleOut = new Point(whiskerDir.y * -90,whiskerDir.x * 120);
    }

    whisker.segments[0].point = whiskP1;
    if(leftright == 'left'){
        whisker.segments[1].handleIn = new Point(whiskerDir.y * -whiskerdist,whiskerDir.x * whiskerdist);
    } else {
        whisker.segments[1].handleIn = new Point(whiskerDir.y * whiskerdist,whiskerDir.x * -whiskerdist);
    }

    whisker.segments[1].point = whiskerEnd;
}





function moveMouseBit() {

    hoverCircle.position = new Point(target.x, target.y);
    hoverCircleInner.position = new Point(target.x, target.y);

    var easing = 0.05;

    var dx = target.x - mousePos.x;
    if(Math.abs(dx) > 1) {
        mousePos.x += dx * easing;
    }

    var dy = target.y - mousePos.y;
    if(Math.abs(dy) > 1) {
        mousePos.y += dy * easing;
    }


    moveDragon(0, mousePos.x, mousePos.y);
    drgnSg[0].run();

     for (var i = 0, l = drgnSg.length-1; i < l; i++) {
        moveDragon(i+1, drgnSg[i].position.x, drgnSg[i].position.y);
        drgnSg[i+1].run();
     }

    var dx2 = drgnSg[1].position.x - drgnSg[0].position.x;
    var dy2 = drgnSg[1].position.y - drgnSg[0].position.y;
    var directionn = new Point(dx2, dy2);
    moveWhisker(whisker1, mousePos, directionn, 'left');

    moveWhisker(whisker2, mousePos, directionn, 'right');

    var angle = ((Math.atan2(dy2, dx2) * 180) / Math.PI);

    targetHeadRot = angle;
    var dr = targetHeadRot - currentHeadRot;
    if(Math.abs(dr) > 1) {
        currentHeadRot += dr * 0.05;
    }

     head.position = mousePos;
     head.rotation = angle;

     var drgSegArrayLength = drgnSg.length-1;

    var dx2 = drgnSg[drgSegArrayLength].position.x - drgnSg[drgSegArrayLength-1].position.x;
    var dy2 = drgnSg[drgSegArrayLength].position.y - drgnSg[drgSegArrayLength-1].position.y;
    var angle = ((Math.atan2(dy2, dx2) * 180) / Math.PI);

     tailEnd.position = drgnSg[drgSegArrayLength].position;
     tailEnd.rotation = angle;

}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


function dragonSegCollide(incre, vector2) {
    var vector1 = drgnSg[incre].position;
    var vector2 = vector2;

    var distBool = collideTest(vector1, vector2, 50);

    if(distBool) {
        drgnSg[incre].collide();
    } else {
        drgnSg[incre].unCollide();
    }
}

var collideTest = function( vector1, vector2, distance) {
    var vecLength = vector1 - vector2;
    var vecLengthVal = Math.abs(vecLength.length);

    if(vecLengthVal < distance) {
        return true;
    } else {
        return false;
    }
}

//--------------------- main ---------------------

var dragonGroup = new Group();

var drgnSg = [];
var numSegs = 15;
for (var i = 0; i < numSegs; i++) {
    var position = view.center;
    drgnSg.push(new dragSegment(position));
    dragonGroup.addChild(drgnSg[i].mySVG);
    var scl = map_range(i,0,numSegs,1.0, 0.1);
    drgnSg[i].scaleSegmentbyInc(scl);
    drgnSg[i].changeColourbyInc(i);

}
dragonGroup.reverseChildren();
dragonGroup.insertBelow(head);

project.activeLayer.insertChild(100, head);

// var myCircle = new Path.Circle(new Point(100, 70), 20);
// myCircle.position = view.center;
// myCircle.fillColor = 'white';


function onMouseMove(event) {
    target = event.point;
}

function onFrame(event) {

    sinus = Math.sin(event.time * 2) * 25;

    moveMouseBit();

    for (var i = 0; i < numSegs; i++) {
        // dragonSegCollide(i, view.center);
    }

}