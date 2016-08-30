(function () { 'use strict';

}()); // end 'use strict'

// ==================================================
// Tone sound bits
// ==================================================

var fbDelay = new Tone.FeedbackDelay("8n", 0.4).toMaster();

//create one of Tone's built-in synthesizers and connect it to the master output
var synth = new Tone.SimpleSynth().connect(fbDelay);
synth.oscillator.type = "triangle";

// ==================================================

// Set Boolean for the track playing or not.
var playing = true;

// Instantiate empty array outside of onload scope
var steps = [];

function playpause() {
    playing = !playing;
}


function getCalculatedWidth(tempBorder) {
        var startGrid = tempBorder;
        var endGrid = paper.view.bounds.width-tempBorder;
        var width = endGrid - startGrid;
        var distThing = Math.floor(width / tempBorder);
        var dist = width / distThing;
        return dist
    }

function makeAlltheSteps(tempBorder, tempDist, tempArray) {

    var smallTempBorder = tempBorder - 1;

    for(var i = tempBorder; i < paper.view.bounds.width-smallTempBorder; i +=tempDist){
        for(var j = tempBorder; j < paper.view.bounds.height-smallTempBorder; j +=tempDist){
            var tempStep = createKick(new paper.Point(i, j));
            var note = i;
            var octave = j;
            tempStep.setPitch(note, octave)
            tempArray.push(tempStep);
        }
    }
}

function removeAllSteps() {
    for(var i = 0; i < steps.length; i++){
        var tempStep = steps[i];
        var tempShape = tempStep.getThisShape();
        var tempOutline = tempStep.getOutlineShape();
        tempShape.remove();
        tempOutline.remove();
    }
    steps = [];
}


paper.install(window);
// Only executed our code once the DOM is ready.
window.onload = function() {

    // Get a reference to the canvas object
    var canvas = document.getElementById('papercanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);


    // Set scroller
    var countr = 1;


    var edgeBorder = 50;
    var dist = getCalculatedWidth(edgeBorder)

    makeAlltheSteps(edgeBorder, dist, steps);

    // Create a vector for the playhead
    var playHeadPos = new paper.Point(paper.view.center);
    // and a vector for the Canvas Centre
    var centerPos = paper.view.center;
    var playHeadLength = 800;

    // Half Length Variable
    var halfPHLength = playHeadLength / 2;

    // Create Branch Object
    var branch = new paper.Path();

    var startPos = centerPos.x-halfPHLength;
    var endPos = centerPos.x+halfPHLength;


    var pointPos = 0.01;

    paper.view.onFrame = function(event) {

      if(pointPos <= 1){
        pointPos += 0.005;
      } else {
        pointPos = 0.001;
      }


      if(playing){
        for(var i = 0; i <veins.length; i++){
            veins[i].loop();
        }
      }

      for(var i = 0; i < steps.length; i++){

        steps[i].loop();

        // Create an empty array for the Booleans
        var boolArray = [];

        for(var j = 0; j < veins.length; j++){
            var veinPos = veins[j].getPHPos();

            var checkMovr = steps[i].checkDistance(veinPos);
            boolArray.push(checkMovr);

            // console.log(checkMovr);
        }

        // Check if any Bools return positive.
        var logr = isInArray(true, boolArray);

        // If they do, then set state of the step.
        if(logr) {
          steps[i].setAvail(false);
        } else {
          steps[i].setAvail(true);
        }

      }


    }




    // function redrawSteps() {
    //     removeAllSteps();
    //     makeAlltheSteps();
    // }

    var veins = [];


    var mouseTool = new paper.Tool();



    mouseTool.onMouseDown = function(event) {
        var newBranch = createVein(event.point);
        veins.push(newBranch);
    }

    mouseTool.onMouseDrag = function(event) {
        var tempBranch = veins[veins.length-1];
        tempBranch.addPoints(event.point);

    }

    mouseTool.onMouseUp = function(event) {

    }

    mouseTool.onKeyDown = function(event) {
        if (event.key == 'space') {
            playpause();
        }

        if (event.key == 'w') {
            var tempVein = veins[veins.length-1];
            tempVein.removeVein();
        }

    }



    // Draw the view now:
    paper.view.draw();

    function resetVeins() {
        for(var i = 0; i < veins.length; i++){
            var tempVein = veins[i];
            tempVein.removeVein();
        }
        veins = [];
    }


    var seqPause = document.getElementById("seq-pause");
    seqPause.addEventListener('click', function(e) {
        e.preventDefault();
        playpause()
        seqPause.classList.toggle('seqPaused');
    });

    var seqReset = document.getElementById("seq-reset");
    seqReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetVeins();
    });

  }



window.addEventListener("resize", function(){
    removeAllSteps();
    var dist = getCalculatedWidth(50);

    makeAlltheSteps(50, dist, steps);
    // alert("resizing...");

});









