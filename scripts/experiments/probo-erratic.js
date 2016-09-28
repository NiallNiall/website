var mainPaths = [];


var lineInc = 1;

var rndpoint = view.center + (new Point(getRandomA(-1, 1),getRandomA(-1, 1))* 50);;


makeNewSquiggle();

var maincolor = Color.random();

function makeNewSquiggle(){

  var point1 = new Point(view.bounds.width, view.bounds.height) * Point.random();
  var point2 = point1 + (new Point(getRandomA(-1, 1),getRandomA(-1, 1))* 50);
  rndpoint = point2;

  var points = [
    point1,
    point2
  ];

  maincolor = Color.random();

  var path = new Path(points);

  mainPaths.push( new Path(points));
  mainPaths[mainPaths.length-1].strokeColor = maincolor;
  mainPaths[mainPaths.length-1].strokeWidth = 4.0;
  mainPaths[mainPaths.length-1].strokeCap = 'round';
  mainPaths[mainPaths.length-1].strokeJoin = 'round';
}

function getRandomA(min, max) {
  return Math.random() * (max - min) + min;
}

function drawSquiggle(_path) {

  var destination = rndpoint;
  var point2 = _path.segments[lineInc].point;
  var diff = destination - point2;
  var pointlength = diff.length;
  // console.log(pointlength);


    _path.add(destination);
    lineInc +=1;
    
  
    var searching = true;



    // var rnddiff = destination - rndpoint;
    // var rndlength = rnddiff.length;

    while(searching) {

      rndpoint = point2 + (new Point(getRandomA(-1, 1),getRandomA(-1, 1))* 30);
      
      for(var i = 0; i < _path.segments.length; i++) {

        var point3 = _path.segments[i].point;
        var rnddiff = rndpoint - point3;
        var rndlength = rnddiff.length;

        // console.log(rndlength);

          if(rndlength > 35) {
            searching = false;
            var myCircle = new Path.Circle(rndpoint, 5);
            myCircle.fillColor = maincolor;
            console.log(rndlength);
          }
        }
    }


}

// var squiggleCount = 0;

function onFrame(event) {
  drawSquiggle(mainPaths[mainPaths.length-1]);

  // for(var i = 0; i < mainPaths[mainPaths.length-1].segments.length; i++) {
  //  mainPaths[mainPaths.length-1].segments[i].point += (new Point(getRandomA(-1, 1),getRandomA(-1, 1))*2);
  // }

  // for(var i = 0; i < mainPaths.length; i++) {
  //  mainPaths[i].rotate(25);
  // }

  if(mainPaths[mainPaths.length-1].segments.length > 20){
    lineInc =0;
    makeNewSquiggle();
  }



}

function onMouseMove(event) {

}

function onKeyDown(event) {
  lineInc =0;
  makeNewSquiggle();
  // squiggleCount +=1;

  if(event.key == 'a') {
    console.log(mainPaths);
  }

}