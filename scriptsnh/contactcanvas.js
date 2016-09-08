// ================================
// Some Variables
// ================================

var lightPink = '#ffc1c9';
var totalEnvelopes = 25;


// ================================
// Functions
// ================================


// Function to return a random between two values
function randomGap(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Check the distance between passed Variable and this one.
function checkDistance(position1, position2, tempGap) {

    var distGap = position2.subtract(position1);
    var testResult = false;

    if(distGap.length < 15) {
      testResult = true;
    } else {
      testResult = false;
    }
    return testResult;
}

function createEnvelope(tempEnv, initialPos) {

    var envelopePos = initialPos;
    var envelopeRadius =  20;
    var envelopeSpeed = new paper.Point(1.2, 1.2).multiply(paper.Point.random());
    var envelopeDirection = new paper.Point(1,1);

    var thisEnv = tempEnv.place(envelopePos);

    var canvasSize = new paper.Size(paper.view.bounds.width, paper.view.bounds.height);

    var envelopeClear = true;


    function moveEnvelope() {

        if( envelopePos.x >= canvasSize.width || envelopePos.x <= 0)
            { envelopeDirection.x = envelopeDirection.x * -1;}
        if( envelopePos.y >= canvasSize.height || envelopePos.y <= 0)
            { envelopeDirection.y = envelopeDirection.y * -1;}

        envelopePos = envelopePos.add(envelopeSpeed.multiply(envelopeDirection));

        thisEnv.position = envelopePos;

    }

    function testEnvelopeBounce(newEnvelopePos) {



        var distGap = newEnvelopePos.subtract(envelopePos);


        if(distGap.length < 125)
        {
            if(Math.abs(distGap.x) < 125)
            { envelopeDirection.x = envelopeDirection.x * -1;}
            if(Math.abs(distGap.y) < 100)
            { envelopeDirection.y = envelopeDirection.y * -1;}
        }


    }

    function getEnvelopePos() {

        return envelopePos

    }


    var envelope = {
        thisEnv: thisEnv,
        moveEnvelope: moveEnvelope,
        getEnvelopePos: getEnvelopePos,
        testEnvelopeBounce: testEnvelopeBounce
    }

    return envelope;

}

// ================================
// Main
// ================================

paper.install(window);


// Make new symbol and set movement to false
var Envelope = new Symbol();
var symbolsLoaded = false;

var envelopes = [];



// Only executed our code once the DOM is ready.
window.onload = function() {

    // Get a reference to the canvas object
    var canvas = document.getElementById('papercanvas');

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    // Load the SVG once paper is ready
    project.importSVG('/img/experiments/envelope.svg', function(item) {
                    // console.log(item);
                    item.strokeColor = lightPink;
                    item.strokeWidth = '5.0';
                    item.scale(1.2);
                    Envelope = new Symbol(item);
                    symbolsLoaded = true;
                    onLoadSymbol();
                });

    function onLoadSymbol() {

        for(var i = 0; i <= totalEnvelopes; i ++){
            var tempPos = new paper.Point(paper.view.bounds.width, paper.view.bounds.height).multiply(paper.Point.random());
            var tempEnv = createEnvelope(Envelope, tempPos);
            envelopes.push(tempEnv);
        }


    }


    paper.view.onFrame = function(event) {
        if(symbolsLoaded) {

            for(var i=0; i <= envelopes.length-1; i ++) {
                var envelope1 = envelopes[i];
                var env1Pos = envelope1.getEnvelopePos();

                for(var j=0; j <= envelopes.length-1; j ++) {
                    if(j != i){
                        var envelope2 = envelopes[j];
                        var env2Pos = envelope2.getEnvelopePos();
                        envelope1.testEnvelopeBounce(env2Pos);
                    }
                }

                envelope1.moveEnvelope();
            }

        }
    }


    var mouseTool = new paper.Tool();


    mouseTool.onMouseMove = function(event) {


    }


    // Draw the view now:
    paper.view.draw();

}

