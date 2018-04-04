var trainingData = [];
var colorForTrainingData = [];
var colorForTestData=[];
var testData = [];

var isTrainingData;
var isTestData;

var colors=["magenta","red","yellow"];
var curColor;

var neighbour=[];

var k;
var i=0;
var instruction = "Step 1: Select k-value";

var isKentered ;
var isTrainingDataGiven;

var nnb = [];
var prevK;

var pointOfConflict = [];

function cnvMouseClicked () {
  
  if (isTrainingData) {
    trainingData.push([mouseX, mouseY]);
    colorForTrainingData.push(colors[curColor]);
	isTrainingDataGiven = true;
  } else if (isTestData) {
    //testData.push([mouseX, mouseY]);
    colorForTestData.push("white");
    //KNN([mouseX, mouseY]);
  }
}
function cnvMouseMoved()
{
	if(isTestData){
	testData.length = 0;
	neighbour.length = 0;
	testData.push([mouseX,mouseY]);
	KNN([mouseX,mouseY]);
	//drawLine();
	}
}

function drawTrainingData(){
  push();
  for (var i = 0; i < trainingData.length; i++) {
    noStroke();
    fill(color(colorForTrainingData[i]));
    ellipse(trainingData[i][0], trainingData[i][1], 10, 10);
  }
  pop();

}

function distStruct(d,index){
	this.d = d;
	this.index = index;
}
function KNN(testdata)
{
 dist = [];
 nnb.length = 0;
 for(var i=0;i<trainingData.length;i++){
	d = distanceSquare(testdata[0],testdata[1],trainingData[i][0],trainingData[i][1]);
	dOb = new distStruct(d,i);
    dist.push(dOb);
 }

 nb = [];
 for(var i =0 ;i<k;i++){
   min = i;
   for(var j=i+1;j<dist.length;j++){
     if(dist[j].d<dist[min].d){
       min = j;
     }
   }
   
   nnb.push(trainingData[dist[min].index]);
   var temp = dist[i];
   dist[i]=dist[min];
   dist[min]=temp;
   nb.push(dist[i].index);
 }
 
 neighbour.push(nb);
 cla=[0,0,0];
 for(var i =0;i<nb.length;i++){
   if(colorForTrainingData[nb[i]]=="magenta"){
	   push();
	   stroke("magenta");
	   //line(testdata[0],testdata[1],trainingData[nb[i]][0],trainingData[nb[i]][1]);
	   line(testdata[0],testdata[1],nnb[i][0],nnb[i][1]);
	   pop();
   // draw line here of blue color between neighbor and test point
      cla[0]++;
	}
   else if (colorForTrainingData[nb[i]]=="red"){
	   push();
	   stroke("red");
	   line(testdata[0],testdata[1],nnb[i][0],nnb[i][1]);
	   pop();
	   // draw line here of red color between neighbor and test point
      cla[1]++;
   }
   else {
	   push();
	   stroke('#ffff00');
	   line(testdata[0],testdata[1],nnb[i][0],nnb[i][1]);
	   pop();
	   // draw line here of blue color between neighbor and test point
       cla[2]++;
   }
 }
 
 //condition for tie
 if((cla[0] == cla[1] && cla[1] == cla[2] && cla[0] == cla[2]) || (cla[0] == cla[1] && cla[2] < cla[0]) || (cla[0] == cla[2] && cla[1] < cla[0]) || (cla[2] == cla[1] && cla[0] < cla[1])) {
	pointOfConflict.length = 0;
	k = k +1;
	pointOfConflict.push([mouseX,mouseY]);
 }else{
	if(k>prevK && pointOfConflict.length >0 ){
		//console.log("in");
		//console.log(pointOfConflict[0][0]);
		//console.log(mouseX);
		if(pointOfConflict[0][0] != mouseX && pointOfConflict[0][1] != mouseY){
			//console.log("in2");
			k = prevK;
			pointOfConflict.length = 0;
		}
	}
 } 
 x = cla.indexOf(Math.max.apply(null,cla));
 colorForTestData[testData.length-1] = colors[x];
}


function drawTestData() {
	//console.log(colorForTestData);
  push();
    for(var i = 0 ; i < testData.length ; i++){
      noStroke();
      //drawing lines
      for(var j = 0 ; j < neighbour[i].length ; j++){
		  
        fill(color(colorForTrainingData[neighbour[i][j]]));
        line(trainingData[neighbour[i][j]][0],trainingData[neighbour[i][j]][1],testData[i][0],testData[i][1]);
      }
	  //console.log(colorForTestData[i]);
      fill(color(colorForTestData[i]));
      ellipse(testData[i][0], testData[i][1], 15, 15);
    }
  pop();
}

function getKValue()
{
  isKentered = true;
  k = parseInt(i_K.value());
  prevK = k;
  

}
function distanceSquare(x1, y1, x2, y2) {
 return sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) );
}
function setup(){
  var cnv=createCanvas(windowWidth,windowHeight-30);
  cnv.parent('sketch-holder');
  cnv.mouseClicked(cnvMouseClicked);
  cnv.mouseMoved(cnvMouseMoved);
  isTrainingData = true;
  isTestData = false;
  curColor = 0;
  isKentered = false;
  isTrainingDataGiven = false;

  i_K=createInput();
  i_K.parent('sketch-holder');
  b_create = createButton('K Value');
  b_create.parent('sketch-holder');
  b_create.mousePressed(getKValue);
  color_btn = createButton("Change Class");
  color_btn.parent('sketch-holder');
  color_btn.mousePressed(changeColor);
  b_start = createButton('Start');
  b_start.parent('sketch-holder');
  b_start.id('start');
  document.getElementById('start').disabled = true;
  //b_start.position(windowWidth-100,150);
  b_start.mousePressed(start);
  
}
function start()
{
		isTrainingData=false;
		isTestData=true;
}

function draw(){

  background(51);
  drawTrainingData();
  drawTestData();
  drawText();

  if(isTestData){
	KNN([mouseX,mouseY]); 
  }
  
  if(isKentered && isTrainingDataGiven){
  document.getElementById('start').disabled = false;
  }
}

function drawText(){
  push();
  fill(250);
  textFont('monospace');
  textSize(25);
  text("KNN", 15, 40);
  textSize(20);
  //text(instruction, 115, windowHeight - 50);
  text("Current class :",20,windowHeight-50);
  fill(colors[curColor]); // Use color variable 'c' as fill color
  noStroke();
  ellipse(220,windowHeight-60,40,40);
  fill(250);
  strokeWeight(1);
  text("Enter training data point,then enter value of k and press start.",300,windowHeight-50);
  if(isKentered){
	  text("K : "+ k,20,windowHeight-80);
  }else{
	  text("K : Not given",20,windowHeight-80);
  }
  pop();
}
function changeColor()
{
   curColor=curColor+1;
   curColor=curColor%3;
}