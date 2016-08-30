// ================================
// Some Variables
// ================================

var bubbleColour = '#ffc1c9';
var totalBubbles = 60;


// ================================
// Functions
// ================================


// Function to return a random between two values
function randomGap(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Check the distance between passed Variable and this one.
function getDistance(position1, position2, tempGap) {

    var distGap = position2.subtract(position1);

    var tempLength = distGap.length;
    var rtnLength = 0;

    var bubGap = tempGap;

    if(tempLength < bubGap) {
        rtnLength = bubGap - tempLength;
    } else {
        rtnLength = 0;
    }
    return rtnLength;
}

// Create Bubble Object function
function createBubble(initialPos) {

    var bubblePos = initialPos;
    var bubbleRadius =  20;
    var bubbleSpeed = new paper.Point(1.2, 1.2).multiply(paper.Point.random());
    var bubbleDirection = new paper.Point(1,1);

    var bubbleShape = new paper.Path.Circle(bubblePos, bubbleRadius);
        bubbleShape.fillColor = bubbleColour;
        // bubbleShape.scaling = 1.0;
        bubbleShape.size = new paper.Size(10,10);

    var canvasSize = new paper.Size(paper.view.bounds.width, paper.view.bounds.height);

    function getBubbleShape() {
        return bubbleShape;
    }

    function getBubblePos() {
        return bubblePos;
    }

    function setBubbleRadius(scal) {
        bubbleShape.bounds.width = scal;
        bubbleShape.bounds.height = scal;
    }

    function moveBubble() {
        if( bubblePos.x >= canvasSize.width || bubblePos.x <= 0)
            { bubbleDirection.x = bubbleDirection.x * -1;}
        if( bubblePos.y >= canvasSize.height || bubblePos.y <= 0)
            { bubbleDirection.y = bubbleDirection.y * -1;}

        bubblePos = bubblePos.add(bubbleSpeed.multiply(bubbleDirection));
        bubbleShape.position = bubblePos;
    }

    function removeBubble(){
        bubbleShape.remove();
    }


    function setCanvasBounds(tempCanSize){
        canvasSize = tempCanSize;
    }

    function resizeCanvas(tempCanSize){
        setCanvasBounds(tempCanSize);

        if(bubblePos.x > tempCanSize.width+2){bubblePos.x = tempCanSize.width-2;}
        if(bubblePos.y > tempCanSize.height+2){bubblePos.y = tempCanSize.height-2;}

        if(bubblePos.x < -2){bubblePos.x = 2;}
        if(bubblePos.y < -2){bubblePos.y = 2;}
    }

    var bubble = {
      getBubbleShape: getBubbleShape,
      setBubbleRadius: setBubbleRadius,
      getBubblePos: getBubblePos,
      moveBubble: moveBubble,
      removeBubble: removeBubble,
      setCanvasBounds: setCanvasBounds,
      resizeCanvas: resizeCanvas
    }

    return bubble;
}

// Function to make all the bubbles
function makeBubbles(amount, array, tempCanSize){

    var bubbleTotal = amount;

    for(var i=0; i < bubbleTotal; i ++) {
        var tempPos = new paper.Point(tempCanSize.width, tempCanSize.height).multiply(paper.Point.random());
        var tempBubble = createBubble(tempPos);
        tempBubble.setCanvasBounds(tempCanSize);
        array.push(tempBubble);
    }

}

// Function to delete all the bubbles
function deleteAllBubbles(){
    for(var i=0; i <= bubbles.length-1; i ++) {
       var bubble1 = bubbles[i];
       bubble1.removeBubble();
    }
    bubbles = [];
}


// ================================
// Main
// ================================


// Set a default value for distance between bubbles (gets overriden by initial canvas value)
var bubGap = 110;

paper.install(window);

//instantiate bubbles
var bubbles = [];

// Only executed our code once the DOM is ready.
window.onload = function() {

    // Get a reference to the canvas object
    var canvas = document.getElementById('papercanvas');

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);


    var firstCanvasSize = new paper.Size(paper.view.bounds.width, paper.view.bounds.height);


    makeBubbles(totalBubbles, bubbles, firstCanvasSize);
    bubGap = firstCanvasSize.width / 12;

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

                    var testDist = getDistance(bubble2Pos, bubble1Pos, bubGap);
                    tempRad += testDist;
                }
            }

            bubble1.setBubbleRadius(tempRad);

        }

    }

    // Draw the view now:
    paper.view.draw();

}

window.addEventListener("resize", function(){

    var newCanvasSize = new paper.Size(paper.view.bounds.width, paper.view.bounds.height);

    bubGap = newCanvasSize.width / 12;

    for(var i=0; i <= bubbles.length-1; i ++) {
        var bubble1 = bubbles[i];
        // bubble1.setCanvasBounds(newCanvasSize);
        bubble1.resizeCanvas(newCanvasSize);
    }

});