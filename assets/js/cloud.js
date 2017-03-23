(function(){
  
  _cloud_img=[new Image(),new Image(),new Image()];
  _cloud_img[0].src="assets/images/cloud1.png";
  _cloud_img[1].src="assets/images/cloud2.png";
  _cloud_img[2].src="assets/images/cloud3.png";
  window.Cloud=function(){
    this.type=J.getRandom(0,2);//∆’Õ®
    this.height=J.getRandom(30,40);
    this.width=this.height*1.5+this.type*this.height/2;
    this.y=this.height+J.getRandom(0,30);
    this.x=w;

  };Cloud.prototype.act=function(){
    this.x-=player.getSpeed();
    if(this.x<-this.width){
      clouds.remove(this);
    }else{
      this.draw();
    }
  };Cloud.prototype.setWidth=function(w){
    this.width=w;
  };Cloud.prototype.draw=function(){
    canvas.drawImage(_cloud_img[this.type],this.x,this.y,this.width,this.height);
  };
})()