// Adapting into PaperJS from the processing example


// ================================
// Some Variables
// ================================

var lightPink = '#ffc1c9';
var totalEnvelopes = 15;


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
    var envelopeRadius =  10;
    var envelopeVelocity = new paper.Point(4.0, 2.0).multiply(paper.Point.random());

    var thisEnv = tempEnv.place(envelopePos);

    var canvasSize = new paper.Size(paper.view.bounds.width, paper.view.bounds.height);

    var envelopeClear = true;

    var m = envelopeRadius * .1;


    function moveEnvelope() {



        envelopePos = envelopePos.add(envelopeVelocity);

        thisEnv.position = envelopePos;

    }

    function checkBoundaries() {
        if( envelopePos.x >= canvasSize.width )
            // { envelopeDirection.x = envelopeDirection.x * -1;}
            {   envelopePos.x = canvasSize.width;
                envelopeVelocity.x *= -1; }
        if( envelopePos.x <= 0)
            // { envelopeDirection.x = envelopeDirection.x * -1;}
            {   envelopePos.x = 0;
                envelopeVelocity.x *= -1; }
        if( envelopePos.y >= canvasSize.height )
            // { envelopeDirection.y = envelopeDirection.y * -1;}
            {   envelopePos.y = canvasSize.height;
                envelopeVelocity.y *= -1; }
        if(envelopePos.y <= 0)
            // { envelopeDirection.y = envelopeDirection.y * -1;}
            {   envelopePos.y = 0;
                envelopeVelocity.y *= -1; }

    }

    function testEnvelopeBounce(newEnvelopePos, newEnvelopeVelocity, newM) {

        var distGap = newEnvelopePos.subtract(envelopePos);

        var distMag = distGap.length;

        var newEnvelopeVariables = {
                sendit: false,
                position: newEnvelopeVelocity,
                velocity: newM
            }

        if (distMag < 40) {
            var theta = distGap.angle

                  // precalculate trig values
            var sine = Math.sin(theta);
            var cosine = Math.cos(theta);

            var bTemp = [new paper.Point(), new paper.Point(cosine * distGap.x + sine * distGap.y, cosine * distGap.y - sine * distGap.x)];

            // rotate Temporary velocities
            var vTemp = [new paper.Point(0,0), new paper.Point(0,0)];

            vTemp[0].x  = cosine * envelopeVelocity.x + sine * envelopeVelocity.y;
            vTemp[0].y  = cosine * envelopeVelocity.y - sine * envelopeVelocity.x;
            vTemp[1].x  = cosine * newEnvelopeVelocity.x + sine * newEnvelopeVelocity.y;
            vTemp[1].y  = cosine * newEnvelopeVelocity.y - sine * newEnvelopeVelocity.x;


            vFinal = [new paper.Point(0,0), new paper.Point(0,0)];

            // final rotated velocity for b[0]
            vFinal[0].x = ((m - newM) * vTemp[0].x + 2 * newM * vTemp[1].x) / (m + newM);
            vFinal[0].y = vTemp[0].y;

            // final rotated velocity for b[0]
            vFinal[1].x = ((newM - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + newM);
            vFinal[1].y = vTemp[1].y;

            // hack to avoid clumping
            bTemp[0].x += vFinal[0].x;
            bTemp[1].x += vFinal[1].x;

            // rotate balls
            bFinal = [new paper.Point(0,0), new paper.Point(0,0)];

            bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
            bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
            bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
            bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

            // update balls to screen position
            // other.position.x = position.x + bFinal[1].x;
            // other.position.y = position.y + bFinal[1].y;

            envelopePos.add(bFinal[0]);

            // update velocities
            envelopeVelocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
            envelopeVelocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
            // other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
            // other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;

            newEnvelopeVariables.position = new paper.Point(envelopePos.x + bFinal[1].x, envelopePos.y + bFinal[1].y);
            newEnvelopeVariables.velocity = new paper.Point(cosine * vFinal[1].x - sine * vFinal[1].y, cosine * vFinal[1].y + sine * vFinal[1].x);

            newEnvelopeVariables.sendit = true;


        }


        return newEnvelopeVariables

    }

    function setEnvelopePos(tempPos) {
        envelopePos = tempPos;
    }

    function setEnvelopeVelocity(tempVelo) {
        envelopeVelocity = tempVelo;
    }

    function getEnvelopePos() {
        return envelopePos;
    }

    function getEnvelopeVelocity() {
        return envelopeVelocity;
    }

    function getM() {
        return m;
    }

    var envelope = {
        thisEnv: thisEnv,
        checkBoundaries: checkBoundaries,
        moveEnvelope: moveEnvelope,
        testEnvelopeBounce: testEnvelopeBounce,
        getEnvelopePos: getEnvelopePos,
        getEnvelopeVelocity: getEnvelopeVelocity,
        setEnvelopePos: setEnvelopePos,
        setEnvelopeVelocity: setEnvelopeVelocity,
        getM: getM
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
                    item.scale(0.8);
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

                envelope1.moveEnvelope();
                envelope1.checkBoundaries();

                for(var j=0; j <= envelopes.length-1; j ++) {
                    if(j != i){
                        var envelope2 = envelopes[j];
                        var env2Pos = envelope2.getEnvelopePos();
                        var env2Velo = envelope2.getEnvelopeVelocity();
                        var env2M = envelope2.getM();
                        var env2Vars = envelope1.testEnvelopeBounce(env2Pos, env2Velo, env2M);
                        // console.log(env2Vars.sendit)
                        if (env2Vars.sendit) {
                        envelope2.setEnvelopePos(env2Vars.position);
                        envelope2.setEnvelopeVelocity(env2Vars.velocity);
                        }
                    }
                }


            }

        }
    }


    var mouseTool = new paper.Tool();


    mouseTool.onMouseMove = function(event) {


    }


    // Draw the view now:
    paper.view.draw();

}

