//var a = [10, 50, 2, 40, 15, 47, 23, 8, 49, 27, 13, 40, 35, 17, 30, 19];

var program = [];
var levelEl = [1,4,4,4];

//level-0 elements
var c01 = new coordinate(562,100);
var c02 = new coordinate(612,100);
var c03 = new coordinate(662,100);
var c04 = new coordinate(712,100);
var c05 = new coordinate(762,100);
var c06 = new coordinate(812,100);
var c07 = new coordinate(862,100);
var c08 = new coordinate(912,100);

//level-1 element
var c11 = new coordinate(489,230);
var c12 = new coordinate(539,230);
var c13 = new coordinate(589,230);
var c14 = new coordinate(639,230);
var c15 = new coordinate(844,230);
var c16 = new coordinate(894,230);
var c17 = new coordinate(944,230);
var c18 = new coordinate(994,230);

//level-2 elements
var c21 = new coordinate(370,360);
var c22 = new coordinate(420,360);
var c23 = new coordinate(584,360);
var c24 = new coordinate(634,360);
var c25 = new coordinate(797,360);
var c26 = new coordinate(847,360);
var c27 = new coordinate(1010,360);
var c28 = new coordinate(1060,360);

//level-3 elements
var c31 = new coordinate(284,490);
var c32 = new coordinate(411,490);
var c33 = new coordinate(538,490);
var c34 = new coordinate(666,490);
var c35 = new coordinate(793,490);
var c36 = new coordinate(921,490);
var c37 = new coordinate(1048,490);
var c38 = new coordinate(1176,490);


//element
var e1 = new element(c01,99,1);
var e2 = new element(c02,12,1);
var e3 = new element(c03,97,1);
var e4 = new element(c04,54,1);
var e5 = new element(c05,6,1);
var e6 = new element(c06,89,1);
var e7 = new element(c07,63,1);
var e8 = new element(c08,99,1);

var e11 = new element(c01,99,1);
var e12 = new element(c02,12,1);
var e13 = new element(c03,97,1);
var e14 = new element(c04,54,1);
var e15 = new element(c05,6,1);
var e16 = new element(c06,89,1);
var e17 = new element(c07,63,1);
var e18 = new element(c08,99,1);

//arrays for each level
var array0 = [e1,e2,e3,e4,e5,e6,e7,e8];
var array1 = [e11,e12,e13,e14,e15,e16,e17,e18];
var array2 = JSON.parse(JSON.stringify(array1));
var array3 = [e2];
var randomize;
var next, previous, reset;

//variable for allowing only one time animation

var ii = 1, jj = 1, n = 16;
var button;

function setup () {
  createCanvas(windowWidth, windowHeight - 40);
  button = createButton('Next');
  button.position(40,windowHeight-60);
  button.mousePressed(next);

}

function next(){
  curSnap = curSnap + 2 ;
  curInstr = curInstr + 1;
  animationTime = 0;
  flag1 = true;
  console.log(curSnap);
}

var x=612,y=230,i=1,curSnap=0,curInstr=0;
var counter = 0,is=true, animationTime = 0,flag1 = false;
function draw () {
  background(51);
  frameRate(30);
  if(counter<=4500){
    showArray(array0);
  }
if(counter<1300)
{staticSplit1();
}

if(counter>=1300 && counter<3000)
{staticSplit2();
}
if(counter>=3000 && counter<= 4500)
{
  staticSplit3();
}
if(counter>=4500 && is==true)
{
  console.log(array0);
  merge_sort(array0,0,7,0);
  is = false;
  console.log(snapShots);
}
if (counter>=4500) {
  frameRate(50);
  if (curSnap < snapShots.length) {
    showArray(snapShots[curSnap]);
    if(curSnap+1 <47)
    showArray(snapShots[curSnap+1]);
    animation(program[curInstr].el,program[curInstr].loc);
    // animationTime = animationTime + 1;
    // if(animationTime > 130 || flag1 == true){
    // showArray(snapShots[curSnap+1]);
    // //snapShots[curSnap] = snapShots[curSnap + 1];
    // }
  }
  // if(program[curInstr].el.x == program[curInstr].loc.x){
  //   curSnap = curSnap + 2;
  //   curInstr = curInstr + 1;
  // }
  if(curSnap>snapShots.length) {
    noLoop();
  }
}

  //animation(e1,c12);
  //animation(e03,e13);
//   frameRate(10);


}
function staticSplit1(){
  animation(e1,c11);

  animation(e2,c12);
  animation(e3,c13);
  animation(e4,c14);
  animation(e5,c15);
  animation(e6,c16);
  animation(e7,c17);
  animation(e8,c18);
  line(757,80,757,160);

//  pause();
//  i = 2;
}

function staticSplit2(){

  animation(e1,c21);
  animation(e2,c22);
  animation(e3,c23);
  animation(e4,c24);
  animation(e5,c25);
  animation(e6,c26);
  animation(e7,c27);
  animation(e8,c28);
  line(757,100,757,200);
  line(584,220,584,300);

  line(939,220,939,300);
}
function staticSplit3(){

  animation(e1,c31);
  e11.x = c31.x;
  e11.y = c31.y;
  animation(e2,c32);
  e12.x = c32.x;
  e12.y = c32.y;
  animation(e3,c33);
  e13.x = c33.x;
  e13.y = c33.y;
  animation(e4,c34);
  e14.x = c34.x;
  e14.y = c34.y;
  animation(e5,c35);
  e15.x = c35.x;
  e15.y = c35.y;
  animation(e6,c36);
  e16.x = c36.x;
  e16.y = c36.y;
  animation(e7,c37);
  e17.x = c37.x;
  e17.y = c37.y;
  animation(e8,c38);
  e18.x = c38.x;
  e18.y = c38.y;
  line(757,100,757,200);
  line(584,220,584,300);
  line(939,220,939,300);
  line(415,320,415,400);
  line(415,320,415,400);
  line(415,320,415,400);
  line(415,320,415,400,);
  line(629,320,629,400);
  line(842,320,842,400);
  line(1058,320,1058,400);

}



drawArray = function (ary,level){
  var y = 130 * level + 100;
  var mod = 8/Math.round(Math.pow(2,level));
  var gap = 0;
  for(var i = 0 ; i < 8 ; i++){

    if(i%mod == 0){
      if(level==0){
        gap = 100;
      }else{
        gap = 70/(level+1) + gap + (5-level) * 30;
      }
    }

    var x = windowWidth/(3+level)+50*i - 50 + gap;


    rect(x,y,40,40);


    textSize(15);
    text(array[i],x+15,y+25);
  }
}

function showArray(ary){

  for(var i = 0 ; i < ary.length ; i++){

    showElement(ary[i]);
  }
}

function showSnap(ary){
  for(var i = 0 ; i < ary.length ; i++){
    fill(e.col);
      rect(e.x,e.y,40,40);
     fill(255);
      textSize(15);
      text(e.val,e.x+15,e.y+25);
  }
}

function showElement(e){
  //console.log(e);
  var c;
  switch (e.col) {
    case 1:{
      c = color(0,0,0);
      break;
    }
    case 2:{
      c = color('red');
      break;
    }

    default:
      c = color('green');
      break;
  }
  fill(c);
  rect(e.x,e.y,40,40);
  fill(255);
  textSize(15);
  text(e.val,e.x+15,e.y+25);
}


function animation(e1,e2){

  //console.log(e1);
   //console.log(e2);
  //
  flag1 = false;
  var del_x = e2.x - e1.x;
  var del_y = e2.y - e1.y;

  var len = Math.round(Math.pow((del_x)*(del_x)+(del_y)*(del_y),0.5));

  var cx = del_x/len;
  var cy = del_y/len;
if(e1.x!=e2.x){
  e1.x = e1.x + cx;
  e1.y = e1.y + cy;
  showElement(e1);
}
counter = counter + 1;

}

function element(cor,val,col){
  this.x = cor.x;
  this.y = cor.y;
  this.val = val;
  this.col = col;
}

function coordinate(x,y){
  this.x = x;
  this.y = y;
}


function merge_sort(ary,i,j,l){
  if(i<j){
    var mid = Math.floor((i+j)/2);
    merge_sort(ary,i,mid,l+1);
    merge_sort(ary,mid+1,j,l+1);
    merge(ary,i,mid,j,l);
  }
}
var count = 1;
var ll;
function merge(ary,p,q,r,l)
{
  var i,j,k;
  var n1 = q-p+2;
  var n2 = r-q+1;
  var leftAry = [];
  var rightAry = [];
  for(i=0;i<n1-1;i=i+1){
    leftAry[i] = ary[p+i].val;
  }
  for(j=0;j<n2-1;j=j+1){
    rightAry[j] = ary[q+j+1].val;
  }
  //infinity = 100
  leftAry[n1-1] = 100;
  rightAry[n2-1] = 100;

  i=0;j=0;
  for(k=p;k<=r;k++){
    //console.log("p"+p);
    //console.log("i"+i);
    if(p+i < 8 && q+j+1<8){
      takeSnapeShot(p+i,(q+j+1-p-i>n2-1)?(p+i):(q+j+1),2,array1);
    }

    if(leftAry[i] <= rightAry[j])
      {
        // switch (p+k) {
        //   case 1:if(l==2){
        //         ll = c21;
        //   }
        //   else if(l==1){
        //         ll = c11;
        //   }
        //   else {
        //         ll = c01;
        //   }
        //
        //     break;
        //     case 2:if(l==2){
        //           ll = c22;
        //     }
        //     else if(l==1){
        //           ll = c12;
        //     }
        //     else {
        //           ll = c02;
        //     }
        //
        //       break;case 3:if(l==2){
        //             ll = c23;
        //       }
        //       else if(l==1){
        //             ll = c13;
        //       }
        //       else {
        //             ll = c03;
        //       }
        //
        //         break;case 4:if(l==2){
        //               ll = c24;
        //         }
        //         else if(l==1){
        //               ll = c14;
        //         }
        //         else {
        //               ll = c04;
        //         }
        //
        //           break;case 5:if(l==2){
        //                 ll = c25;
        //           }
        //           else if(l==1){
        //                 ll = c15;
        //           }
        //           else {
        //                 ll = c05;
        //           }
        //
        //             break;case 6:if(l==2){
        //                   ll = c26;
        //             }
        //             else if(l==1){
        //                   ll = c16;
        //             }
        //             else {
        //                   ll = c06;
        //             }
        //
        //               break;case 7:if(l==2){
        //                     ll = c27;
        //               }
        //               else if(l==1){
        //                     ll = c17;
        //               }
        //               else {
        //                     ll = c07;
        //               }
        //               case 8:if(l==2){
        //                     ll = c28;
        //               }
        //               else if(l==1){
        //                     ll = c18;
        //               }
        //               else {
        //                     ll = c08;
        //               }
        //
        //                 break;
        //   default:
        //
        // }
        if(l==2){
          switch (k+1) {
            case 1:{
                ll = c21;
              break;
            }

            case 2:{
                ll = c22;
              break;
            }
            case 3:{
                ll = c23;
              break;
            }
            case 4:{
                ll = c24;
              break;
            }
            case 5:{
                ll = c25;
              break;
            }
            case 6:{
                ll = c26;
              break;
            }
            case 7:{
                ll = c27;
              break;
            }
            case 8:{
                ll = c28;
              break;
            }

            default:

          }
        }
        if(l==1){
          switch (k+1) {
            case 1:{
                ll = c11;
              break;
            }

            case 2:{
                ll = c12;
              break;
            }
            case 3:{
                ll = c13;
              break;
            }
            case 4:{
                ll = c14;
              break;
            }
            case 5:{
                ll = c15;
              break;
            }
            case 6:{
                ll = c16;
              break;
            }
            case 7:{
                ll = c17;
              break;
            }
            case 8:{
                ll = c18;
              break;
            }

            default:

          }
        }
        if(l==0){
          switch (k+1) {
            case 1:{
                ll = c01;
              break;
            }

            case 2:{
                ll = c02;
              break;
            }
            case 3:{
                ll = c03;
              break;
            }
            case 4:{
                ll = c04;
              break;
            }
            case 5:{
                ll = c05;
              break;
            }
            case 6:{
                ll = c06;
              break;
            }
            case 7:{
                ll = c07;
              break;
            }
            case 8:{
                ll = c08;
              break;
            }

            default:

          }
        }
        array2 = JSON.parse(JSON.stringify(ary));
        if(p+i < 8 && q+j+1<9){
          takeSnapeShot(p+i,p+i,3,array2);
        }

        var instr = new instruction(array1[p+i],ll);
        ////console.log(p+i);
        program.push(instr);



        levelEl[l]=levelEl[l]+1;
        ary[k].val = leftAry[i];
        ary[k].x = ll.x;
        ary[k].y = ll.y;


        i=i+1;

        //var c = "c2"+l
      }
    else {
      //switch (q+k+1) {
      //   case 1:if(l==2){
      //         ll = c21;
      //   }
      //   else if(l==1){
      //         ll = c11;
      //   }
      //   else {
      //         ll = c01;
      //   }
      //
      //     break;
      //     case 2:if(l==2){
      //           ll = c22;
      //     }
      //     else if(l==1){
      //           ll = c12;
      //     }
      //     else {
      //           ll = c02;
      //     }
      //
      //       break;case 3:if(l==2){
      //             ll = c23;
      //       }
      //       else if(l==1){
      //             ll = c13;
      //       }
      //       else {
      //             ll = c03;
      //       }
      //
      //         break;case 4:if(l==2){
      //               ll = c24;
      //         }
      //         else if(l==1){
      //               ll = c14;
      //         }
      //         else {
      //               ll = c04;
      //         }
      //
      //           break;case 5:if(l==2){
      //                 ll = c25;
      //           }
      //           else if(l==1){
      //                 ll = c15;
      //           }
      //           else {
      //                 ll = c05;
      //           }
      //
      //             break;case 6:if(l==2){
      //                   ll = c26;
      //             }
      //             else if(l==1){
      //                   ll = c16;
      //             }
      //             else {
      //                   ll = c06;
      //             }
      //
      //               break;case 7:if(l==2){
      //                     ll = c27;
      //               }
      //               else if(l==1){
      //                     ll = c17;
      //               }
      //               else {
      //                     ll = c07;
      //               }
      //               case 8:if(l==2){
      //                     ll = c28;
      //               }
      //               else if(l==1){
      //                     ll = c18;
      //               }
      //               else {
      //                     ll = c08;
      //               }
      //
      //                 break;
      //   default:
      //
      // }

      if(l==2){
        switch (k+1) {
          case 1:{
              ll = c21;
            break;
          }

          case 2:{
              ll = c22;
            break;
          }
          case 3:{
              ll = c23;
            break;
          }
          case 4:{
              ll = c24;
            break;
          }
          case 5:{
              ll = c25;
            break;
          }
          case 6:{
              ll = c26;
            break;
          }
          case 7:{
              ll = c27;
            break;
          }
          case 8:{
              ll = c28;
            break;
          }

          default:

        }
      }
      if(l==1){
        switch (k+1) {
          case 1:{
              ll = c11;
            break;
          }

          case 2:{
              ll = c12;
            break;
          }
          case 3:{
              ll = c13;
            break;
          }
          case 4:{
              ll = c14;
            break;
          }
          case 5:{
              ll = c15;
            break;
          }
          case 6:{
              ll = c16;
            break;
          }
          case 7:{
              ll = c17;
            break;
          }
          case 8:{
              ll = c18;
            break;
          }

          default:

        }
      }
      if(l==0){
        switch (k+1) {
          case 1:{
              ll = c01;
            break;
          }

          case 2:{
              ll = c02;
            break;
          }
          case 3:{
              ll = c03;
            break;
          }
          case 4:{
              ll = c04;
            break;
          }
          case 5:{
              ll = c05;
            break;
          }
          case 6:{
              ll = c06;
            break;
          }
          case 7:{
              ll = c07;
            break;
          }
          case 8:{
              ll = c08;
            break;
          }

          default:

        }
      }

      array2 = JSON.parse(JSON.stringify(ary));
      if(p+i < 8 && q+j+1<9){
        takeSnapeShot(q+j+1,q+j+1,3,array2);
      }

      var instr = new instruction(array1[q+j+1],ll);
      //console.log(q+j+1);
      program.push(instr);



      ary[k].val = rightAry[j];
      ary[k].x = ll.x;
      ary[k].y = ll.y;

      count=count+1;
      if(count == 9){
        count = 1;

      }


      j=j+1;
      //var c = "c2"+l;


    }
  }
  array1 = JSON.parse(JSON.stringify(ary));

}
var snapShots = [];
function takeSnapeShot(index1,index2,col,aay1){
  //array1 = JSON.parse(JSON.stringify(array0));
  for(var i = 0 ; i < aay1.length ;i=i+1){
    if(i!=index1 && i!= index2){
      aay1[i].col = 1;
      //array2[i].col = 1;
    }

  if(index1 < 8 && index2< 9){
  aay1[index1].col = (col);
  aay1[index2].col = (col);}
  // array2[index2].col = col;
  // array2[index1].col = col;
}
  snapShots.push(JSON.parse(JSON.stringify(aay1)));
}

function instruction(e,c){
  this.el = e;
  this.loc = c;
}
