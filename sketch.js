var database;


var drawing = [];
var currentPath = [];
var isDrawing = false;

function setup() {
  canvas = createCanvas(600,600);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

 var saveButton = select('#saveButton');
 saveButton.mousePressed(saveDrawing);

 var clearButton = select('#clearButton');
 clearButton.mousePressed(clearDrawing);
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
    isDrawing = false;
}   

function draw() {
  background(0);  
    if(isDrawing){
      var point = {
        x: mouseX,
        y: mouseY
      }
      currentPath.push(point);

    }
    stroke(255);
    strokeWeight(4);
    noFill();
    for(var i=0; i< drawing.length; i++){
      var path = drawing[i];
      beginShape();
      for(var j = 0; j< path.length; j++){
        vertex(path[j].x, path[j].y)
        }
      endShape();
    }
    

}

function saveDrawing() {
  var ref = firebase.ref('drawings');
  var data = {
    name: "Aarav",
    drawing: drawing
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status){   
    console.log(status);
  }
}

function clearDrawing(){
  drawing=[]
}