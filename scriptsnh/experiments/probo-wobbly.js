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

var colours = [midBlueClr, lightBlueClr, lightOrangeClr, darkOrangeClr, darkRedClr, darkPinkClr];

// ==================================================

var mainPaths = [];

var drawDistance = 20;
var lineLength = 50;

var squiggles = 0;
var attempts = 0;
var drawing = true;

function getRandomA(min, max) {
    return Math.random() * (max - min) + min;
}

function makeRandomPointLocal(_point) {
    var lastPoint = _point;
    var randomDirection = new Point(getRandomA(-1, 1), getRandomA(-1, 1));
    var randomPoint = lastPoint + (randomDirection.normalize() * drawDistance);
    return randomPoint;
}

function makeRandomPointGlobal(_point) {

    var testCount = 0;

    while (testCount < 1000) {
        var randomPoint = new Point(view.bounds.width, view.bounds.height) * Point.random();
        var legalPoint = isPointLegal(randomPoint);

        if (legalPoint) {
            testCount = 1000;
        }

        if(testCount > 900) {
          attempts += 1;
          // console.log("tried too many times");
        }

        testCount++;
    }

    return randomPoint;
}

function defineStyle() {

    var randomHue = getRandomA(0, 100);
    var randomSat = getRandomA(0.5, 1.0);
    var randomBrightness = getRandomA(0.4, 1.0);

    // Get a random colour index from the array
    var rndClrFromArray = Math.floor(getRandomA(0, colours.length + 1));


    var myStyle = {
        strokeColor: colours[rndClrFromArray],
        strokeWidth: 10.0,
        strokeCap: 'round',
        strokeJoin: 'round'
    };
    return myStyle;
}

function isPointLegal(_point) {
    var legalPoint = true;
    var returnBool = true;

    for (var j = 0; j < mainPaths.length; j++) {
        legalPoint = getLengthofOne(_point, mainPaths[j], legalPoint);
    }

    if (legalPoint) {
        returnBool = true;
    } else {
        returnBool = false;
    }

    return returnBool;
}

function makeNewSquiggle(_path) {

    var point1 = makeRandomPointGlobal();
    var point2 = point1; //makeRandomPointLocal(point1);


    var testCount = 0;
    var legalPoint2 = false;

    while (testCount < 1000) {
        point2 = makeRandomPointLocal(point1);
        var legalPoint = isPointLegal(point2);

        if (legalPoint) {
            testCount = 1000;
            legalPoint2 = true;
        }
        testCount++;
    }


    rndpoint = point2;

    var points = [
        point1,
        point2
    ];

    var path = new Path(points);

    mainPaths.push(new Path(points));
    mainPaths[mainPaths.length - 1].style = defineStyle();

    makeCircle(point1);
    makeCircle(point2);
}

function makeNewPoint(pathArray, cirPosition) {
    makeCircle(cirPosition);
    pathArray.add(cirPosition);
}


function makeCircle(_point) {
    var circleRadius = 4;
    var myCircle = new Path.Circle(_point, circleRadius);
    myCircle.fillColor = 'white';

    var myCircle = new Path.Circle(_point, circleRadius * 2);
    myCircle.fillColor = mainPaths[mainPaths.length - 1].strokeColor;
}

function getLengthofOne(_point, _path, _testBool) {

    var testBool = _testBool;

    for (var i = 0; i < _path.segments.length; i++) {

        var thisPoint = _path.segments[i].point;
        var length1 = (_point - thisPoint).length;

        if (length1 <= drawDistance) {
            testBool = false;
        }

        if (_point.x <= 0 || _point.x >= view.bounds.width) {
            testBool = false;
        }
        if (_point.y <= 0 || _point.y >= view.bounds.height) {
            testBool = false;
        }
    }

    return testBool;

}



function getLengthofAll(_path) {

    var testCount = 0;
    var makePoint = false;

    while (testCount < 1000) {
        var randomPoint = makeRandomPointLocal(_path.segments[_path.segments.length - 1].point);
        var legalPoint = isPointLegal(randomPoint);

        if (legalPoint) {
            testCount = 1000;
            makePoint = true;
            // console.log(legalPoint);
        }

        // makePoint = false;
        // console.log(legalPoint);
        testCount++;
    }

    if (makePoint) {
        makeNewPoint(_path, randomPoint);
    } else {
        makeNewSquiggle();
    }

}

makeNewSquiggle();

function onFrame(event) {

    if(drawing && modalClear) {

      getLengthofAll(mainPaths[mainPaths.length - 1]);

      if (mainPaths[mainPaths.length - 1].segments.length > lineLength) {
          makeNewSquiggle(mainPaths);
      }

        if (attempts > 50) {
            drawing = false;
            console.log("Finished!")
        }

    }



    // console.log('Attempts: ' + attempts);
}

function onKeyDown(event) {
  if(drawing && modalClear) {
    makeNewSquiggle();
  }
}
