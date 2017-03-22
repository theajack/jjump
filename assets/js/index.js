var canvas;
var w,h;
var cw,ch;
var ox,oy;
var t;
var player,map;
var gaps=[];
var isStop=false;
J.ready(function(){
  map=new Map();
  player=new Player();
  setSize();
  canvas=J.id("canvas").getContext("2d");
	canvas.fillStyle="#000";
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',function(event){
      deviceMotionHandler(event)
    }, false);
  }
  t=setInterval(function(){
    if(!isStop){
      canvas.clearRect(0,0,w,h);
      player.act();
      map.act();
      gaps.each(function(item){
        item.act();
      });
    }
  },50);
  addGap();
  //J.id("canvas").event("onclick","player.jump(16)");
});

var y,x;
var y_min=10;
var x_max=5;
var time=5;
var flag=0; 
function deviceMotionHandler(eventData) {
  if(flag!=1){
    var acceleration =eventData.accelerationIncludingGravity;
    if(flag==0){
      flag=2;
    }else if(flag==2){
      var dy=parseInt(acceleration.y-y);
      var dx=parseInt(Math.abs(acceleration.x-x));
      if(dy>y_min&&dx<x_max){
        J.show(dy+","+dx);
        flag=1;
        var v=0;
        var rate=Math.floor(dy/y_min);
        if(rate==1){
          v=10;
        }else if(rate==2){
          v=12;
        }else{
          v=14;
        }
        player.jump(v);
        setTimeout(function(){
          flag=0;
        },1000);
      }
    }
    y=acceleration.y;
    x=acceleration.x;
  }
}
function setSize(){
  var c=J.id("canvas");
  w=J.width();
  h=J.height();
  cw=w;
  ch=map.getHeight();
  c.width=cw;
  c.height=ch;
  c.css("margin-top",(h-ch)/2+"px")
  map.setWidth(w);
  player.setOx(w);
}
function addGap(){
  setInterval(function(){
    gaps.prepend(new Gap());
  },2500);
}
function gameOver(){
  isStop=true;
  J.showWait("Game Over","erroe")
}
window.onresize=setSize;