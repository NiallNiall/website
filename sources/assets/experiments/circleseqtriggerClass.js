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

    var strokeOnColor = 'NavajoWhite';
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
    setOffStroke: setOffStroke
  }

  return step;

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

}

function createSnare(constructPos) {

    var snareStep = createStep(constructPos, 'Tomato');
    radius = 20;

    function createShape(constructPos) {
      var myShape = new paper.Path.Rectangle(constructPos.subtract(radius/2), radius);
      return myShape;
    }

    var trigEventVar = function(){
      // console.log("Snare Triggered!");
      snare.triggerAttackRelease("32n");
    }

    snareStep.setTrigEvent(trigEventVar);

    var myShape = createShape(constructPos);
    snareStep.createShape(myShape);

    return snareStep;

}

function createKick(constructPos) {

    var kickStep = createStep(constructPos, 'DarkCyan');
    radius = 20;

    function createShape(constructPos) {
      var myShape = new paper.Path.Circle(constructPos, 10);
      return myShape;
    }

    var trigEventVar = function(){
      // console.log("Kick Triggered!");
        kick.triggerAttackRelease("C2", "32n");
    }

    kickStep.setTrigEvent(trigEventVar);

    var myShape = createShape(constructPos);
    kickStep.createShape(myShape);

    return kickStep;

}


function createPulse(constructPos) {

    var pulseClr = 'DarkCyan';
    var pulseSize = '5.0';

    var kickStep = createStep(constructPos, 'DarkCyan');
    radius = 20;


    var trigEventVar = function(){
      // console.log("Kick Triggered!");
        synth.triggerAttackRelease("C4", "32n");
    }

    kickStep.setTrigEvent(trigEventVar);

    kickStep.setOnStroke('Tomato', '8.0');
    kickStep.setOffStroke(pulseClr, pulseSize);

    function createShape(constructPos) {
      var from = new Point(view.center.x, view.center.y);
      var to = new Point(constructPos.x, constructPos.y);
      var path = new Path.Line(from, to);
      path.strokeColor = pulseClr;
      path.strokeWidth = pulseSize;
      return path;
    }

    var myShape = createShape(constructPos);
    kickStep.createShape(myShape);

    return kickStep;

}

function createMovr(constructPos) {

  var movrLength = 200;

  var myShape = new paper.Path();
  var originalPos = constructPos;

  var newPos = new paper.Point(100,100);

  var center = paper.view.center;
  // console.log(center);

  var norm = constructPos.subtract(center);
  var normed = norm.normalize();

  var dest = new paper.Point(originalPos.x + normed.x * 100, originalPos.y + normed.y * 100);

  var from = originalPos;
  var to = originalPos;
  var movePath = new Path.Line(from, to);
  movePath.strokeColor = 'NavajoWhite';
  movePath.strokeWidth = '5.0';


  // console.log(normed);

  var movng = false;

  var life = 1;

   var movr = {
    shape: thisShape,
    create: create,
    loop: loop,
    start: start,
    getPosition: getPosition
  }
  // create(constructPos);

  var thisShape = create(constructPos);
  var startShape = create(constructPos);

  function create(constructPos) {
    myShape = new paper.Path.Circle(constructPos, 10);
    myShape.fillColor = 'SaddleBrown';
    return myShape;
    // movng = true;
  }

  function getPosition(){
    var returnPos = newPos;
    return returnPos;
  }

  var dist = 0;

  function loop(rotrPos) {
    if(movng){
      dist = easeOutExpo(life, 0, movrLength, movrLength)
      newPos = new paper.Point(originalPos.x + (normed.x * dist), originalPos.y + (normed.y * dist));
      var startPos = new paper.Point(originalPos.x - (normed.x * dist), originalPos.y - (normed.y * dist));
      movePath.segments[1].point = newPos;
      // movePath.segments[0].point = startPos;
      // console.log(movePath.segments[1].point);
      thisShape.position = newPos;
      // startShape.position = startPos;

      life += 1;
      if(dist >= movrLength){
        // dist = 0;
        life = 0;
        thisShape.position = originalPos;
        startShape.position = originalPos;
        movePath.segments[1].point = originalPos;
        movePath.segments[0].point = originalPos;
        movng = false;
      }
      // console.log(originalPos);
    }

    distanceTest(rotrPos);
  }

  function start() {
    life = 0;
    movng = true;
  }


function distanceTest(testPosition) {

    var distGap = originalPos.subtract(testPosition);
    // console.log(distGap.length);

    if(distGap.length < 25) {
      start();
    } else {

    }
  }

  return movr;

}



function createTriangr(constructPos) {

    var triangR = createMovr(constructPos, 'DarkCyan');


    return triangR;

}

