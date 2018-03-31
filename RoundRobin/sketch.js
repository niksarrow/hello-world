var bkcol='#fca4a4',nodcol='#a31b30';
var canvascol='#5aaa73';//#f4cbcb
var canvascol=50,canvasx=20,canvasy=90,canvasw=900,canvash=600;
var lengthTunnel = 0,widthTunnel = 0,tunnelx = 0, tunnely = 0,cpux = 0, cpuy = 0;
var pname=[],pat=[],pbt=[],pcol=[],pnameQ=[],patQ=[],pbtQ=[],pcolQ=[];
var tpname=[],tpat=[],tpbt=[],tpcol=[],tpct=[];

var aryIndex = 0;
var curCpuTime = 0;
var msg="Submit New Process.";
var maxBT = 0;
var endSimulation = false;
var col=7;
var n=0,n_cpu=0,avgWT=0,avgTAT=0;
var IsPause,curSnap,simulation=false;
var cpuSnapShot = [],cpuStatus = [],timeSnapShot =[],tablee = [];
var pat1 = [],pbt1 = [],pname1 =[],pcol1 =[];
var pct=[],ptat=[],pwt=[];
var TQ = 5;
function f_reset()
{
  IsPause = true;
  curSnap = 0,curCpuTime = 0,maxBT = 0,simulation=false,endSimulation = false;;
  cpuSnapShot.length=0;
  cpuStatus.length=0;
  pname.length=0,pat.length=0,pbt.length=0,pcol.length=0,pnameQ.length=0,patQ.length=0,pbtQ.length=0;
  aryIndex=0, col=7;pat1.length=0,pbt1.length=0,pname1.length=0,pcol1.length=0;
  timeSnapShot.length=0;tablee.length=0;
  tpname.length=0,tpat.length=0,tpbt.length=0,tpcol.length=0,tpct.length=0;
  lengthTunnel = 0,widthTunnel = 0,tunnelx = 0, tunnely = 0,cpux = 0, cpuy = 0;
  pct.length=0;ptat.length=0;pwt.length=0,n=0,n_cpu=0,avgWT=0,avgTAT=0;TQ=5;
  msg="Submit New Process."
	document.getElementById('gen').disabled=true;
	//document.getElementById('create').disabled=false;
	//document.getElementById('start').disabled=true;
}

function setup(){
  var mycan = createCanvas(window.innerWidth, window.innerHeight);
  mycan.parent('sketch-holder');
  
  f_reset();
  i_AT=createInput();
  i_AT.position(canvasx+canvasw+200,110);
  i_BT=createInput();
  i_BT.position(canvasx+canvasw+200,140);
  i_TQ=createInput();
  i_TQ.position(canvasx+canvasw+200,200);
  
  
  b_create = createButton('CREATE');
  b_create.position(canvasx+canvasw+400,125);
  b_create.mousePressed(createNewProcess);
  b_create.id('create');

  i_Start=createButton('START');
  i_Start.position(canvasx+canvasw+400,180);
  i_Start.mousePressed(startS);
  i_Start.id('start');
  
  b_reset=createButton('RESET');
  b_reset.mousePressed(f_reset);
  b_reset.position(canvasx+canvasw+400,220);
  document.getElementById('create').disabled=false;
  /*document.getElementById('gen').disabled=true;*/
  document.getElementById('start').disabled=true;
  f_reset();
  
}
function draw()
{
  background(bkcol);
  noStroke();
  textAlign(LEFT,CENTER);
  textSize(20);
  fill(0);
  text('CREATE NEW PROCESS',canvasw+canvasx+41,80);
  text('ARRIVAL TIME',canvasw+canvasx+41,120);
  text('BURST TIME',canvasw+canvasx+41,150);
  text('TIME QUANTUM',canvasw+canvasx+41,210);

  fill(canvascol);
  rect(canvasx,canvasy,canvasw,canvash,20);
  stroke(128);
  fill(nodcol);
//process queue
  line(canvasx+10,canvasy+canvasw/2-200,canvasx+canvasw-10,canvasy+canvasw/2-200);
  line(canvasx+10,canvasy+canvasw/2-100,canvasx+canvasw-10,canvasy+canvasw/2-100);
  lengthTunnel = canvasw-20;
  widthTunnel  = 100;
  tunnelx = canvasx+canvasw -10;
  tunnely = canvasy + canvasw/2 -190;
  fill('#c90202');
  text('PROCESSES SUBMITTED', canvasx+10,tunnely - 20);
//cpu
  line(canvasx+10,canvasy+canvasw/2,canvasx+canvasw-10,canvasy+canvasw/2);
  line(canvasx+10,canvasy+canvasw/2+100,canvasx+canvasw-10,canvasy+canvasw/2+100);
  cpux = canvasx+10;
  cpuy = canvasy + canvasw/2 + 10;
  text('CPU', canvasx+10,canvasy + canvasw/2 - 15);
  
	showProcessQueue();
	
	if(IsPause == false){
     if(curSnap +  1< cpuSnapShot.length)
	 {  curSnap = curSnap+1;
	 }
	 else{
		 endSimulation=true;
	 }
	drawCPU(curSnap);
   }
   
   if(endSimulation==true){
	   frameRate(10000);
	   for(var j=0;j<cpuSnapShot[curSnap].length;j++){
		fill(cpuSnapShot[curSnap][j].state);
		rect(cpuSnapShot[curSnap][j].x,cpuSnapShot[curSnap][j].y,cpuSnapShot[curSnap][j].width,cpuSnapShot[curSnap][j].height);	
		fill('blue');
		if(cpuSnapShot[curSnap][j].pname!="IDLE")
		text(cpuSnapShot[curSnap][j].pname,(2*cpuSnapShot[curSnap][j].x+cpuSnapShot[curSnap][j].width)/2,(2*cpuSnapShot[curSnap][j].y+80)/2);
		}	//rect(cpuSnapShot[curSnap][cpuSnapShot[curSnap].length-1].x,cpuSnapShot[curSnap][cpuSnapShot[curSnap].length-1].y,cpuSnapShot[curSnap][cpuSnapShot[curSnap].length-1].width,cpuSnapShot[curSnap][cpuSnapShot[curSnap].length-1].height);
		push();
		textSize(25);
		text("Avg TAT : "+avgTAT,canvasx+100,canvasy+50);
		text("Avg WT  : "+avgWT,canvasx+100,canvasy+150);
		pop();
		msg="Simulation Complete.Click GenerateTable."
   }
   for(var i=0;i<timeSnapShot.length;i++){
	   fill('#5aaa73');
	   text(timeSnapShot[i].time,timeSnapShot[i].x,timeSnapShot[i].y+100)
   }
   if(timeSnapShot.length>0)
   text(0,cpux,cpuy+100);

	drawText();
}
function drawText(){
  push();
  fill(125);
  textFont('monospace');
  textSize(25);
  text("Round Robin Scheduling", 15, 40);
  textSize(20);
  fill(125);
  text("Action  :",30,windowHeight-20);
  fill(125);
  strokeWeight(1);
  text(msg,150,windowHeight-20);
  if(simulation){
	fill('#5aaa73');
	rect(canvasx+500,canvasy+30,50,50);
	text("IDLE STATE",canvasx+600,canvasy+50);
	text("AT : Arrival Time",canvasx+500,canvasy+100);
	text("BT : Burst Time",canvasx+500,canvasy+120);
	text("CT : Completion Time",canvasx+500,canvasy+140);
	text("TAT: Turn Around Time",canvasx+500,canvasy+160);
	text("WT : Waiting Time",canvasx+500,canvasy+180);
  }
  fill('#5aaa73');
  text("TQ : Time Quantum = "+TQ,canvasx+500,canvasy+200);
  pop();
}

function boxx(x,y,width,height,state,pname)
{
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.state=state;
	this.pname=pname;
}
function timeEle(x,y,time){
	this.x=x;
	this.y=y;
	this.time=time;
}
function cpuProcess()
{
	var sum=0;
	for(var i=0;i<pname.length;i++){
		print(pname[i]);
		for(var j=0;j<=pbt[i];j++){
			print(pbt[i]);
			var w = j*n_cpu;
			var newbox = new boxx(cpux,cpuy,w,80,pcol[i],pname[i]);
			print('pushed');
			print(cpuSnapShot);
			cpuStatus.push(newbox);
			cpuSnapShot.push(JSON.parse(JSON.stringify(cpuStatus)));
		}
		cpux=cpux+pbt[i]*n_cpu;
		sum+=pbt[i];
		var timeLine = new timeEle(cpux,cpuy,sum);
		timeSnapShot.push(JSON.parse(JSON.stringify(timeLine)));
	}
}
function drawCPU(curSnap){
	frameRate(3);
	for(var i=0;i<curSnap && curSnap<cpuSnapShot.length-1;i++){
		for(var j=0;j<cpuSnapShot[curSnap].length;j++){
		fill(cpuSnapShot[curSnap][j].state);
		rect(cpuSnapShot[curSnap][j].x,cpuSnapShot[curSnap][j].y,cpuSnapShot[curSnap][j].width,cpuSnapShot[curSnap][j].height);
		fill('blue');
		textSize(12);
		noStroke();
		if(cpuSnapShot[curSnap][j].pname!="IDLE")
		text(cpuSnapShot[curSnap][j].pname,(2*cpuSnapShot[curSnap][j].x+cpuSnapShot[curSnap][j].width)/2,(2*cpuSnapShot[curSnap][j].y+80)/2);
		}		
	}
}

function showProcessQueue()
{
	var bt=0;
	for(var i=0;i<pbtQ.length;i=i+1){
    bt = bt + pbtQ[i];
	}
	n = lengthTunnel/bt;
	var lbox=0; //length of box
	for(var i =0 ; i<pbtQ.length; i = i+ 1){
    lbox = n*pbtQ[i];
    fill(pcolQ[i]);
    rect(tunnelx,tunnely,-lbox,80);
    fill('blue');
    textSize(12);
    text(pnameQ[i],(2*tunnelx-lbox)/2, (2*tunnely+80)/2);
    tunnelx = tunnelx - lbox;
    tunnely = tunnely;
  }
}
function createNewProcess()
{
  var temp1=i_AT.value();
  i_AT.value('');
  var temp2=i_BT.value();
  i_BT.value('');
  if(i_TQ.value()!='')
	TQ=Math.abs(i_TQ.value());
  i_TQ.value('');
  if(temp2 > maxBT)
  {
    maxBT = temp2;
  }
  
  pname[aryIndex] = 'P'+aryIndex;
 
  pat[aryIndex] = Math.abs(temp1);
  pbt[aryIndex] = Math.abs(temp2);
  pcol[aryIndex] = Math.floor(Math.random() * 255);
  
  pnameQ[aryIndex] = 'P'+aryIndex; 
  patQ[aryIndex] = Math.abs(temp1);
  pbtQ[aryIndex] = Math.abs(temp2);
  pcolQ[aryIndex] = pcol[aryIndex];
  
  aryIndex = aryIndex + 1;
  document.getElementById('start').disabled=false;
  document.getElementById('create').disabled=false;
  msg="Submit New Processes. Start Simulation after submitting all processes."
}

function roundRobin()
{
	tpat = JSON.parse(JSON.stringify(pat));
	tpbt = JSON.parse(JSON.stringify(pbt));
	tpname=JSON.parse(JSON.stringify(pname));
	tpcol=JSON.parse(JSON.stringify(pcol));
  var cpu=0;var min;
  for(var i=0,j=0;pat.length>0;i++){
	  if(pat[i]>cpu)
	  {	  
			pat1[j] = cpu;
			pname1[j] = "IDLE";
			pbt1[j] = pat[i]-cpu;
			pcol1[j] = '#5aaa73';
			j++;
			cpu = cpu + pat[i];
			i--;
 	  }
	  else{
		  if(pbt[i]<TQ){
			  min = pbt[i];
		  }else{
			  min = TQ;
		  }
		  
		  pat1[j]=pat[i];
		  pbt1[j]=min;
		  pname1[j]=pname[i];
		  pcol1[j]=pcol[i];
		  //print("hello"+j);
		  //print("pat1 "+pat1);print("pbt1 "+pbt1);print("pname1 "+pname1);print("pcol1 "+pcol1);
		  j++;
		  cpu = cpu + min;
		  pbt[i] = pbt[i] - min;
		  if(pbt[i]==0){
		  pat = JSON.parse(JSON.stringify(delEle(pat,i)));
		  pbt = JSON.parse(JSON.stringify(delEle(pbt,i)));
		  pname= JSON.parse(JSON.stringify(delEle(pname,i)));
		  pcol=JSON.parse(JSON.stringify(delEle(pcol,i)));
		  }
		  else{
			  var index = getIndex(pat,cpu);print("index"+index);print("i  "+i);
			  var val = pat[i];print("val"+val);print("patbefore"+pat);
			  pat = insert_at(pat,index,val);print("patafter"+pat);
			  val = pbt[i];
			  pbt = insert_at(pbt,index,val);
			  val = pname[i];
			  pname = insert_at(pname,index,val);
			  val = pcol[i];
			  pcol = insert_at(pcol,index,val);
		  }
		  i--;
	  }	
  }
  pat = JSON.parse(JSON.stringify(pat1));
  pbt = JSON.parse(JSON.stringify(pbt1));
  pname = JSON.parse(JSON.stringify(pname1));
  pcol=JSON.parse(JSON.stringify(pcol1));
  var bt=0;
  for(var i=0;i<pbt.length;i++){
		bt = bt + pbt[i];  
  }
  n_cpu = lengthTunnel/bt; //normalized value
}
function delEle(ary,index){
	var temp=[];
	temp.length=0;
		  for(var x=0,j=0;x<ary.length;x++){
			  if(x!=index)
				  temp[j++]=ary[x];
		  }
	return temp;
}
function getIndex(at,cpu){
	//var temp = [];
	//temp = delEle(at,0);
	for(var i=1;i<at.length;i++){
		if(at[i]>cpu)
			break;
	}
	return i;
}
function insert_at(ary,index,val){
	//insert at ith position
	var temp=[]
	for(var j=0,k=0;j<=ary.length;j++){
		if(index!=j){
			temp[k++]=ary[j];
		}
		else{
			temp[k++]=val;
		}
	}
	temp = JSON.parse(JSON.stringify(delEle(temp,0)));
	return temp;
}
function startS()
{
	roundRobin();
	cpuProcess();
	IsPause=false;
	simulation=true;
	generateTable();
	document.getElementById('gen').disabled=false;
	document.getElementById('create').disabled=true;
	document.getElementById('start').disabled=true;
	msg="Simulation Running.";
}
function generateTable(){
	tablee.length=0;
	tablee.push(["PNo","AT","BT","CT","TAT","WT"]);
	var sum_Tat = 0;
	var sum_Wt  = 0;//tpat original,,,,,,pat idle
	for(var i=0;i<tpat.length;i++){
		var max;
		for(var j=0;j<pat.length;j++){
			if(pname[j]==tpname[i]){
				max = timeSnapShot[j].time;
			}
			if(tpname[i]=="IDLE")
				break;
		}
		tpct[i]=max;
	}//tpct original
	for(var i=0;i<tpat.length;i++){
		if(tpname[i]!="IDLE"){
		ptat[i] = tpct[i]-tpat[i];
		pwt[i] = ptat[i]-tpbt[i];
		
			sum_Tat+=ptat[i];
			sum_Wt+=pwt[i];
		}
	}
	avgWT = sum_Wt/patQ.length;
	avgTAT = sum_Tat/patQ.length;
	for(var i=0;i<tpat.length;i++){
		if(tpname[i]!="IDLE"){
		tablee.push(JSON.parse(JSON.stringify([tpname[i],tpat[i],tpbt[i],tpct[i],ptat[i],pwt[i]])));
		}
	}
	tablee.push(JSON.parse(JSON.stringify(["","","","",avgTAT,avgWT])));
}
function GenerateTable()
{
	var table = document.createElement("TABLE");
	table.border=1;
	var columnCount = tablee[0].length;
	var row = table.insertRow(-1);
	for(var i=0;i<columnCount;i++){
		var headerCell = document.createElement("TH");
		headerCell.innerHTML = tablee[0][i];
		row.appendChild(headerCell);
	}
	for(var i=1;i<tablee.length;i++){
		row = table.insertRow(-1);
		for(var j=0;j<columnCount;j++){
			var cell = row.insertCell(-1);
			cell.innerHTML = tablee[i][j];
		}
	}
	
	var dvTable = document.getElementById("dvTable");
	dvTable.innerHTML="";
	dvTable.appendChild(table);
}
