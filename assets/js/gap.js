(function(){
  _id=0,
  _gap_img=new Image();
  _gap_img.src="assets/images/gap.png";
  
  window.Gap=function(){
    this.type=0;//普通
    this.width=J.getRandom(60,120);
    this.height=map.getFloorHeight();
    this.y=map.getHeight()-this.height;
    this.x=w;
    this.id=_id++;
  };Gap.prototype.act=function(){
    this.x-=player.getSpeed();
    if(this.x<-this.width){
      gaps.remove(this);
    }else{
      this.draw();
      player.checkGameOver(this.x,this.width,this.id);
    }
  };Gap.prototype.setWidth=function(w){
    this.width=w;
  };Gap.prototype.draw=function(){
    canvas.drawImage(_gap_img,this.x,this.y,this.width,this.height);
  };
})()