var lightPink = '#ffc1c9';


function randomGap(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Check the distance between passed Variable and this one.
function getDistance(position1, position2) {

    var distGap = position2.subtract(position1);

    var tempLength = distGap.length;
    var rtnLength = 0;

    if(tempLength < 110) {
        rtnLength = 110 - tempLength;
    } else {
        rtnLength = 0;
    }
    return rtnLength;
}


function createBubble(initialPos) {

    var bubblePos = initialPos;
    var bubbleRadius =  20;
    var bubbleSpeed = new paper.Point(1.2, 1.2).multiply(paper.Point.random());
    var bubbleDirection = new paper.Point(1,1);

    var bubbleShape = new paper.Path.Circle(bubblePos, bubbleRadius);
        bubbleShape.fillColor = lightPink;
        // bubbleShape.scaling = 1.0;
        bubbleShape.size = new paper.Size(10,10);

    function getBubbleShape() {
        return bubbleShape;
    }

    function getBubblePos() {
        return bubblePos;
    }

    // console.log(bubbleShape);

    function setBubbleRadius(scal) {
        bubbleShape.bounds.width = scal;
        bubbleShape.bounds.height = scal;
    }

    function moveBubble() {
        if( bubblePos.x >= paper.view.bounds.width || bubblePos.x <= 0)
            { bubbleDirection.x = bubbleDirection.x * -1;}
        if( bubblePos.y >= paper.view.bounds.height || bubblePos.y <= 0)
            { bubbleDirection.y = bubbleDirection.y * -1;}


        bubblePos = bubblePos.add(bubbleSpeed.multiply(bubbleDirection));
        bubbleShape.position = bubblePos;
    }

    var bubble = {
      getBubbleShape: getBubbleShape,
      setBubbleRadius: setBubbleRadius,
      getBubblePos: getBubblePos,
      moveBubble: moveBubble
    }

    return bubble;
}



paper.install(window);
  // Only executed our code once the DOM is ready.
  window.onload = function() {

    // Get a reference to the canvas object
    var canvas = document.getElementById('papercanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    var totalBubbles = 60;
    var bubbles = [];

    for(var i=0; i < totalBubbles; i ++) {
        var tempPos = new paper.Point(paper.view.bounds.width, paper.view.bounds.height).multiply(paper.Point.random());
        var tempBubble = createBubble(tempPos);
        bubbles.push(tempBubble);
    }


    paper.view.onFrame = function(event) {
       for(var i=0; i <= bubbles.length-1; i ++) {
            var bubble1 = bubbles[i];
            bubble1.moveBubble();

            var bubble1Pos = bubble1.getBubblePos();

            var tempRad = 5;

            for(var j=0; j <= bubbles.length-1; j ++) {
                if(j!=i) {
                    var bubble2 = bubbles[j];
                    var bubble2Pos = bubble2.getBubblePos();

                    var testDist = getDistance(bubble2Pos, bubble1Pos);
                    tempRad += testDist;
                }
            }

            bubble1.setBubbleRadius(tempRad);

        }

    }


    var mouseTool = new paper.Tool();



    mouseTool.onMouseDown = function(event) {
    }

    mouseTool.onMouseDrag = function(event) {
    }

    mouseTool.onMouseUp = function(event) {
    }

    mouseTool.onKeyDown = function(event) {
    }

    // Draw the view now:
    paper.view.draw();


  }

  window.addEventListener("resize", function(){
    // alert('resizing');
  });