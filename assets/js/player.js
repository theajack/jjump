(function(){
  var _x=0,
    _y=0,
    _speed=5,
    _a=1,
    _v=0,
    _len=30,
    _ox,
    _oy,
    _isJump=false,
    _isDie=false,
    _run_index=0,
    _run_time=0,
    _run_time_max=50,
    _run_image=[new Image(),new Image(),new Image(),new Image()],
    _stand_image=new Image(),
    _jump_image=new Image(),
    _die_image=new Image();
    _stand_image.src="assets/images/p_stand.png";
    _jump_image.src="assets/images/p_jump.png";
    _die_image.src="assets/images/p_die.png";
    _run_image[0].src="assets/images/p_run1.png";
    _run_image[1].src="assets/images/p_run2.png";
    _run_image[2].src="assets/images/p_run3.png";
    _run_image[3].src="assets/images/p_stand.png";
  function _jump(v){
    _v=v;
    _isJump=true;
  }
  function _addRunIndex(){
    _run_time+=loopTime;
    if(_run_time>_run_time_max){
      _run_time=0;
      if(_run_index<_run_image.length-1){
        _run_index++;
      }else{
        _run_index=0;
      }
    }
  }
  function _act(){
    if(!_isDie){
      _addRunIndex();
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
    }
    _draw();
  }
  function _draw(){
    //canvas.fillStyle="#000";
    //canvas.fillRect(_ox,_oy-_y,_width,_height);
    if(_isJump){
      canvas.drawImage(_jump_image,_ox,_oy-_y,_len,_len);
    }else{
      canvas.drawImage(_run_image[_run_index],_ox,_oy-_y,_len,_len);
    }
  }
  function _setOx(w){
    _ox=w/6;
  }
  window.Player=function(){
    _oy=map.getOy()-_len;
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
    if(_ox>=x&&_ox<=x+w-_len&&_y<=0){
      gameOver();
    }
  };
  
})()