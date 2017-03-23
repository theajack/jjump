(function(){
  
  _gap_img=new Image();
  _gap_img.src="assets/images/gap.png";
  window.Gap=function(){
    this.type=0;//普通
    this.width=J.getRandom(50,70);
    this.height=map.getFloorHeight();
    this.y=map.getHeight()-this.height;
    this.x=w;

  };Gap.prototype.act=function(){
    this.x-=player.getSpeed();
    if(this.x<-this.width){
      gaps.remove(this);
    }else{
      //canvas.fillStyle="#fff";
      //canvas.fillRect( this.x, this.y, this.width, this.height);
      
      canvas.drawImage(_gap_img,this.x,this.y,this.width,this.height);
      player.checkGameOver(this.x,this.width);
    }
  };Gap.prototype.setWidth=function(w){
    this.width=w;
  };
})()