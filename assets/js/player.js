(function(){
  var _x=0,
    _y=0,
    _speed=5,
    _a=1,
    _v=0,
    _height=30,
    _width=15,
    _ox,
    _oy,
    _isJump=false;
  function _jump(v){
    _v=v;
    _isJump=true;
  }
  function _act(){
    _x+=this.speed;
    if(_isJump){
      _v-=_a;
      _y+=_v;
    }
    if(_y<0){
      _y=0;
      _v=0;
      _isJump=false;
    }
    _draw();
  }
  function _draw(){
    canvas.fillStyle="#000";
    canvas.fillRect(_ox,_oy-_y,_width,_height);
  }
  function _setOx(w){
    _ox=w/6;
  }
  window.Player=function(){
    _oy=map.getOy()-_height;
  };Player.prototype.act=function(){
    _act();
  };Player.prototype.jump=function(v){
    _jump(v)
  };Player.prototype.setOx=function(w){
    _setOx(w);
  };Player.prototype.getOx=function(){
    return _ox;
  };Player.prototype.getSpeed=function(){
    return _speed;
  };Player.prototype.checkGameOver=function(x,w){
    if(_ox>=x&&_ox<=x+w-_width&&_y<=0){
      gameOver();
    }
  };
  
})()