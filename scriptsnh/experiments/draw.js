(function () { 'use strict';

}()); // end 'use strict'

var fbDelay = new Tone.FeedbackDelay("8n", 0.4).toMaster();

//create one of Tone's built-in synthesizers and connect it to the master output
var synth = new Tone.SimpleSynth().connect(fbDelay);
synth.oscillator.type = "triangle";



paper.install(window);
  // Only executed our code once the DOM is ready.
  window.onload = function() {

    // Get a reference to the canvas object
    var canvas = document.getElementById('papercanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);


    // Create an empty array of twigs
    var allTwigs = [];

    // Set scroller
    var countr = 1;


    var steps = [];

    for(var i = 50; i < paper.view.bounds.width-50; i +=50){
        for(var j = 50; j < paper.view.bounds.height-50; j +=50){
            var tempStep = createKick(new paper.Point(i, j));
            var note = i;
            var octave = j;
            tempStep.setPitch(note, octave)
            steps.push(tempStep);
        }
    }


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

    // Create an top group:
    var baseGroup = new Group();
    // Create an top group:
    var midGroup = new Group();
    // Create an top group:
    var topGroup = new Group();


    var pointPos = 0.01;

    paper.view.onFrame = function(event) {

      if(pointPos <= 1){
        pointPos += 0.005;
      } else {
        pointPos = 0.001;
      }


      for(var i = 0; i <veins.length; i++){
        veins[i].loop();

        // var veinPos = veins[i].getPHPos();


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

    // Draw the view now:
    paper.view.draw();

  }









