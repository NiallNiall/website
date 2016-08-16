orangeClr = '#f7931e';



var headSVG = project.importSVG(document.getElementById('drag-head'));
headSVG.visible = true; // Turn off the effect of display:none;
headSVG.position = new Point(0,0);
headSVG.scale (0.3);
headSVG.rotate(270);
head = new Symbol(headSVG);
head = head.place(0,0);

var tailendSVG = project.importSVG(document.getElementById('drag-tailend'));
tailendSVG.visible = true; // Turn off the effect of display:none;
tailendSVG.position = new Point(0,0);
tailendSVG.scale (0.2);
tailendSVG.rotate(270);
tailEnd = new Symbol(tailendSVG);
tailEnd = tailEnd.place(0,0);


var tailSegSVG = project.importSVG(document.getElementById('drag-seg'));
// console.log("my object: %o", tailSegSVG);
// tailSegSVG.children[0].children[1].fillColor = 'black';
// tailSegSVG.children[0].children[0].fillColor = 'white';

tailSegSVG.visible = true;
tailSegSVG.position = new Point(200, 200);
tailSegSVG.scale(0.1);
tailSegSVG.rotate(90);
var tailSeg = new Symbol(tailSegSVG);


// var hoverCircle = new Path.Circle(new Point(100, 70), 50);
// hoverCircle.fillColor = null;
// hoverCircle.strokeColor = 'white';
// hoverCircle.scaling = 5.0;


mousePos = new Point(0, 0);
target = new Point(0,0);

targetHeadRot = 0;
currentHeadRot = 0;

var whiskerSeg = [new Point(0,0), new Point(100,100) ]
var whisker1 = new Path(whiskerSeg);
whisker1.strokeColor = orangeClr;
whisker1.strokeWidth = 5;
whisker1.strokeCap = 'round';
whisker1.strokeJoin = 'round';
// whisker1.smooth();

whiskerSpot = new Path.Circle(new Point(100, 70), 14);
whiskerSpot.fillColor = 'white';
whiskerSpot.strokeColor = orangeClr;
whiskerSpot.strokeWidth = 7;



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
            this.mySVG.fillColor = 'blue';
            this.sendMessage();
            this.changeColour('white');
            this.scaleSegment(this.basescaling * 1.2);
            this.available = false;
            this.leavingContact = true;
        }

    },
    unCollide: function() {
         if(this.leavingContact){
        //     // this.sendMessage();
            this.mySVG.fillColor = 'blue';
            this.available = true;
            this.scaleSegment(this.basescaling);
            this.leavingContact = false;
            this.changeColour(this.basecolor);
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
        // this.mySVG.symbol.definition.strokeColor.hue += 0.2;
        // this.mySVG.children[0].children[0].fillColor = red;
    },
    changeColour: function(color) {
          this.mySVG.symbol.definition.children[0].children[0].fillColor = color;
    },
    changeColourbyInc: function(incre) {

        this.basecolor = orangeClr;
        // {
        //     hue: incre*10,
        //     saturation: 0.9,
        //     brightness: 0.9
        // };
        this.changeColour(this.basecolor);
    }

});





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

    // tailEnd.position = drgnSg[13].position;//x, drgnSg[drgnSg.length].y);

}


function moveWhisker(whisker, point1, direction) {
    whiskerDir = direction.normalize();
    // crossWhisker = new Point(whiskerDir.x - whiskerDir.y, whiskerDir.y + whiskerDir.x)

    var whiskP1 = point1;
    var whiskP2 = point1 + whiskerDir * 40;
    var whiskP3 = point1 + whiskerDir * 150;

    // var sinus = Math.sin(event.time * 10);

    // var whiskerMid = new Point(whiskP2.x + (whiskerDir.y * 50), whiskP2.y - (whiskerDir.x * 50));
    var whiskerEnd = new Point(whiskP3.x + (whiskerDir.y * 100), whiskP3.y - (whiskerDir.x * 100));

    // whisker.segments[0].point = point1;
    // whisker.segments[1].point = point1 + (direction * 4);
    // var whiskerEndCentre = point1 + (direction * 4);



    whisker.segments[0].point = whiskP1;
    whisker.segments[0].handleOut = new Point(whiskerDir.y * 100,whiskerDir.x * -100);

    whisker.segments[1].point = whiskerEnd;                   
    // whisker.segments[2].point = whiskerEnd;
    whiskerSpot.position = whiskerEnd;
}





function moveMouseBit() {
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
    moveWhisker(whisker1, mousePos, directionn);

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
     // tailSeg.rotation = angle;

}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


function dragonSegCollide(incre, vector2) {
    var vector1 = drgnSg[incre].position;
    var vector2 = vector2;
    // tailEnd.position = vector2;
    // view.center

    var distBool = collideTest(vector1, vector2, 50);

    if(distBool) {
        // console.log(incre);
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
    // dragonGroup.addChild(drgnSg[i].mySVG);
    dragonGroup.addChild(drgnSg[i].mySVG);
    var scl = map_range(i,0,numSegs,1.0, 0.1);
    drgnSg[i].scaleSegmentbyInc(scl);
    drgnSg[i].changeColourbyInc(i);

}
dragonGroup.reverseChildren();
dragonGroup.insertBelow(head);

project.activeLayer.insertChild(100, head);

var myCircle = new Path.Circle(new Point(100, 70), 20);
myCircle.position = view.center;
myCircle.fillColor = 'white';


function onMouseMove(event) {
    target = event.point;
}

function onFrame(event) {
    moveMouseBit();
    // moveWhisker(whisker1, target);

    for (var i = 0; i < numSegs; i++) {
        dragonSegCollide(i, view.center);
    }

}