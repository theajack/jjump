(function(){
  var _height=300,
    _width,
    _floor_height=70;
  function _act(){
    _draw();
  }
  function _draw(){
		canvas.drawImage(_floor_image,0,_getOy(),_width,_floor_height);
  }
  function _getOy(){
    return _height-_floor_height;
  }
  function _getHeight(){
    return _height;
  }
  window.Map=function(){
  };Map.prototype.act=function(){
    _act();
    
  };Map.prototype.getOy=function(){
    return _getOy();
  };Map.prototype.getHeight=function(){
    return _getHeight();
  };Map.prototype.setWidth=function(w){
    _width=w;
  };Map.prototype.getFloorHeight=function(){
    return _floor_height;
  };Map.prototype.draw=function(){
    _draw();
  }
})()