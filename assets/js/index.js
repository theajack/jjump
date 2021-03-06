var canvas;
var w,h;
var cw,ch;
var ox,oy;
var t;
var player,map;
var gaps=[],clouds=[];
var isStop=false;
var loopTime=50;
var bestScore=0;
var bestLvl=0;
var isPause=false;
var _run_image,_stand_image,_jump_image,_die_image;
var _floor_image,_gap_img,_cloud_img;
var test=false;
var isPractice=false;
J.ready(function(){
  if(J.isMobile()){
    J.id("qrCode").remove();
    initImg();
    map=new Map();
    player=new Player();
    setSize();
    canvas=J.id("canvas").getContext("2d");
    canvas.fillStyle="#000";
    if (window.DeviceMotionEvent) {window.addEventListener('devicemotion',deviceMotionHandler, false);}
    //clickTest()
    if(J.cookie("bestScore")!=""&&J.cookie("bestScore")!=undefined){
      bestScore=parseInt(J.cookie("bestScore"));
      J.id("bestScore").text(bestScore);
    }
    if(J.cookie("bestLvl")!=""&&J.cookie("bestLvl")!=undefined){
      bestLvl=parseFloat(J.cookie("bestLvl"));
      var a=Math.floor(bestLvl)-1;
      if(a>7){a=7}
      J.id("bestLvlNum").child(0).text(lvlChoose[a]);
      J.id("bestLvlNum").child(1).text(bestLvl);
    }
    _floor_image.onload=function(){
      J.class("start").text("点击任意位置开始游戏");
      J.id("teachWrapper").event("onclick","hideTeach()");
    };
    window.onresize=setSize;
  }else{
    J.id("gameWrapper").remove();
    J.id("qrCode").css("display","block");
    J.tag("html").css("background-color","#57bafb");
    J.class("wechat-public").event({
      "onmouseover":"J.class('wechat-img').fadeIn()",
      "onmouseleave":"J.class('wechat-img').fadeOut()"
    });
  }
  jsonp("open");
});

function initImg(){
  _run_image=[new Image(),new Image(),new Image(),new Image()];
  _stand_image=new Image();
  _jump_image=new Image();
  _die_image=new Image();
  _stand_image.src="assets/images/p_stand.png";
  _jump_image.src="assets/images/p_jump.png";
  _die_image.src="assets/images/p_die.png";
  _run_image[0].src="assets/images/p_run1.png";
  _run_image[1].src="assets/images/p_run2.png";
  _run_image[2].src="assets/images/p_run3.png";
  _run_image[3].src="assets/images/p_stand.png";
  _gap_img=new Image();
  _gap_img.src="assets/images/gap.png";
  _cloud_img=[new Image(),new Image(),new Image()];
  _cloud_img[0].src="assets/images/cloud1.png";
  _cloud_img[1].src="assets/images/cloud2.png";
  _cloud_img[2].src="assets/images/cloud3.png";
  _floor_image=new Image();
  _floor_image.src="assets/images/floor.png";
}
function clickTest(){
  J.id("canvas").event("onclick",function(){
    if(!test){
      test=true;
      player.jump(10); 
      setTimeout(function(){
        test=false;
      },600);
      showJumpLvl(2.22,2);
      jsonp("jump");
    }
  })
}
var y,x;
var y_min=9;
var x_max=6;
var time=5;
var flag=0; 
var vChoose=[10,11,12,12.5,13,13.5,14,14.5]
function deviceMotionHandler(event) {
  if(flag!=1){
    var acceleration =event.accelerationIncludingGravity;
    if(flag==0){
      flag=2;
    }else if(flag==2){
      var dy=parseInt(acceleration.y-y);
      var dx=parseInt(Math.abs(acceleration.x-x));
      
      if(!isStop&&!isPause){
        if(dy>y_min&&dx<x_max){
          //J.show(dy+","+dx);
          flag=1;
          var v=0;
          var rate=Math.floor(dy/y_min)-1;
          if(rate>7){
            rate=7;
          }
          showJumpLvl(parseFloat((dy/y_min).toFixed(2)),rate);
          player.jump(vChoose[rate]);
          jsonp("jump");
          setTimeout(function(){
            flag=0;
          },500);
        }
      }else if(isStop){
        if(dy>5){
          restart();
        }
      }
    }
    y=acceleration.y;
    x=acceleration.x;
  }
}

var lvlChoose=["轻轻一跃","蓄力一跃","惊人之跃","完美一跃","振翅欲飞","无人能及","神之跳跃","还有谁"];
var showJumpLvlT;
function showJumpLvl(lvl,rate){
  if(!isPractice){
    if(lvl>bestLvl){
      bestLvl=lvl;
      J.id("bestLvlNum").child(0).text(lvlChoose[rate]);
      J.id("bestLvlNum").child(1).text(lvl);
      J.cookie("bestLvl",lvl,365);
    }
  }
  J.id("jumpLvlTitle").text(lvlChoose[rate]);
  J.id("jumpLvlNum").text(lvl);
  J.id("info").fadeIn();
  clearTimeout(showJumpLvlT);
  showJumpLvlT=setTimeout(function(){
    J.id("info").fadeOut(null,100);
  },2000);
}
function start(){
  setInterval(function(){
    if(!isStop&&!isPause){
      canvas.clearRect(0,0,w,h);
      map.act();
      gaps.each(function(item){
        item.act();
      });
      clouds.each(function(item){
        item.act();
      });
      player.act();
    }else if(isStop){
      canvas.clearRect(0,0,w,h);
      map.draw();
      gaps.each(function(item){
        item.draw();
      });
      clouds.each(function(item){
        item.draw();
      });
      player.act();
    }
  },loopTime);
  addGap();
  addCloud();
  jsonp("play");
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
  J.id("scoreWrapper").css("top",mh);
  J.id("info").css("top",((h-ch)/2+50)+"px");
  map.setWidth(w);
  player.setOx(w);
}
var gap_time=2000;
function addGap(){
  setTimeout(function(){
    if(!isStop&&!isPause&&!isPractice){
      gap_time=J.getRandom(3500,4500)-((player.getSpeed()*100));
      gaps.prepend(new Gap());
    }
    addGap();
  },gap_time);
}
function addCloud(){
  setInterval(function(){
    if(!isStop&&!isPause){
      clouds.prepend(new Cloud());
    }
  },1000);
}
function gameOver(){
  //dieAudio.play();
  isStop=true;
  J.id("finalScore").text(player.getScore());
  J.id("loose").fadeIn();
  var bs=J.cookie("bestScore");
  if(bestScore>bs||bs==""||bs==undefined){
    J.cookie("bestScore",bestScore,365);
    jsonp("best",bestScore);
  }
  J.tag("title").text="我在【摇摆玛丽】中获得了"+bestScore+"分，击败了全国"+countPerc(bestScore)+"%的人，你敢来挑战吗？";
}
function countPerc(score){
  var d=0.0;
  if(score>=5&&score<10){
    d=80+score+J.getRandom(10,50)*0.1;
  }else if(score>=10){
    d=90+score-10+J.getRandom(10,50)*0.1;
  }else if(score==0){
    d=0;
  }else{
    d=score*20-J.getRandom(10,50)*0.1;
  }
  if(d>=100){
    d=99+J.getRandom(0,10)*0.1;
  }
  return d.toFixed(2);
}
function pause(){
  if(isPause){
    J.id("startBtn").fadeOut();
    J.id("pauseBtn").fadeIn(function(){
      isPause=false;
    });
  }else{
    J.id("startBtn").fadeIn();
    J.id("pauseBtn").fadeOut(function(){
      isPause=true;
    });
  }
}
function modScore(score){
  if(score>bestScore){
    bestScore=score;
    J.id("bestScore").text(score);
  }
  J.id("score").text(score);
}


function showOff(){
  unforbid(J.id("showTool"));
  J.id("showOffWrapper").fadeIn();
}
function closeShowOff(){
  forbid(J.id("showTool"));
  J.id("showOffWrapper").fadeOut()
}
function restart(){
  J.id("loose").fadeOut();
  player.reset();
  J.id("score").text(0);
  gaps.empty();
  isStop=false;
  if(isPause){
    pause();
  }
  jsonp("play");
}
function practice(obj){
  if(obj.attr("data-on")=="true"){
    forbid(obj);
    isPractice=false;
    showInfo("已关闭练习模式");
    player.reset();
  }else{
    unforbid(obj);
    isPractice=true;
    showInfo("已打开练习模式");
    gaps.empty();
    player.reset();
    J.id("score").text(0);
  }
}
function help(obj){
  if(obj.attr("data-on")=="true"){
    hideTeach();
  }else{
    unforbid(obj)
    J.id("teachWrapper").fadeIn();
  }
}
function hideTeach(){  
  forbid(J.id("teachTool"));
  if(J.id("teachWrapper").data("first")!="false"){
    J.id("teachWrapper").data("first","false").fadeOut(function(){
      start();
    });
  }else{
    J.id("teachWrapper").fadeOut();
  }
}
function forbid(obj){
  obj.attr("data-on","false").addClass("forbid");
}
function unforbid(obj){
  obj.attr("data-on","true").removeClass("forbid");
}
var showInfoT;
var showText=J.id("showText");
function showInfo(str,time){
  time=J.checkArg(time,2000);
  showText.text(str).fadeIn();
  clearTimeout(showInfoT);
  showInfoT=setTimeout(function(){
    showText.fadeOut(null,300)
  },time);
}
function download(){
  J.open("http://15h97945z7.iok.la/download.aspx?name=shakeMario");
  jsonp("download");
}



function jsonp(type,data){
  J.jsonp({
    url:"http://15h97945z7.iok.la/shakeMario.aspx",
    //url:"http://localhost:50866/theajack/shakeMario.aspx",
    data:{type:type,data:data},
    success:function(data){},
    time:20000,
    timeout:function(err){},
    message:"请求超时"
  });
}
















