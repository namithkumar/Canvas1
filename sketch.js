var canavs;
var database;

var drawing = []

function setup() {
    canvas = createCanvas(400, 400);
    
    database = firebase.database()
    background("white");

    var adaRef = database.ref('drawing');
    adaRef.remove();

}

var dbpoints = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke("green");
    strokeWeight(2);
    noFill();
    for (var i = 0; i < dbpoints.length; i++) {
        vertex(dbpoints[i].x, dbpoints[i].y);
        endShape();
    }
    endShape();
}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        dbpoints = data.val().d
    })
}
