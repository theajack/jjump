var canvas;
var w,h;
var cw,ch;
var ox,oy;
var t;
var player,map;
var gaps=[],clouds=[];
var isStop=false;
var loopTime=50;
J.ready(function(){
  map=new Map();
  player=new Player();
  setSize();
  canvas=J.id("canvas").getContext("2d");
	canvas.fillStyle="#000";
  //if (window.DeviceMotionEvent) {window.addEventListener('devicemotion',deviceMotionHandler, false);}
  J.id("canvas").event("onclick","player.jump(14)");
  t=setInterval(function(){
    if(!isStop){
      canvas.clearRect(0,0,w,h);
      map.act();
      gaps.each(function(item){
        item.act();
      });
      clouds.each(function(item){
        item.act();
      });
      player.act();
    }
  },loopTime);
  addGap();
  addCloud();
});

var y,x;
var y_min=10;
var x_max=5;
var time=5;
var flag=0; 
function deviceMotionHandler(event) {
  if(flag!=1){
    var acceleration =event.accelerationIncludingGravity;
    if(flag==0){
      flag=2;
    }else if(flag==2){
      var dy=parseInt(acceleration.y-y);
      var dx=parseInt(Math.abs(acceleration.x-x));
      if(dy>y_min&&dx<x_max){
        //J.show(dy+","+dx);
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
  var mh=(h-ch)/2+"px";
  c.css("margin-top",mh)
  J.id("bottom").css("height",mh);
  J.id("top").css("height",mh);
  J.id("loose").css("top",(h-210)/2+"px");
  map.setWidth(w);
  player.setOx(w);
}
function addGap(){
  setInterval(function(){
    if(!isStop){
      if(J.getRandom(0,1)>0.5){
        gaps.prepend(new Gap());
      }
    }
  },2000);
}
function addCloud(){
  setInterval(function(){
    if(!isStop){
      if(J.getRandom(0,1)>0.6){
        clouds.prepend(new Cloud());
      }
    }
  },1000);
}
function gameOver(){
  isStop=true;
  J.id("loose").fadeIn();
}
function yMin(obj){
  y_min=parseInt(obj.prev().val())
  obj.prev().val("").attr("placeholder",y_min)
}
function xMax(obj){
  x_max=parseInt(obj.prev().val())
  obj.prev().val("").attr("placeholder",x_max)
}
function showOff(){
  
}
function restart(){
  J.id("loose").fadeOut();
  gaps.empty();
  isStop=false;
}
window.onresize=setSize;