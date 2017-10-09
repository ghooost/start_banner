export default class AlphaImage {
  constructor(image,parent,frames){
    this.defFrame={
      x:0,
      y:0,
      scale:1,
      alpha:1,
      rotation:0
    }
    if(frames && frames.map){
      this.frames=frames.map(frame=>Object.assign({},this.defFrame,frame));
    } else if(frames){
      this.frames=[Object.assign({},this.defFrame,frames)];
    } else {
      this.frames=[];
    };
    this.sprite=new PIXI.Sprite(PIXI.Texture.fromImage(image));
    this.sprite.onTick=()=>{
      this.onTick();
    }
    parent.addChild(this.sprite);
    this.applyFrame(this.frames.length?this.frames[0]:this.defFrame);
    this.isPlaying=false;
  }

  get presentFrame(){
    return {
      x:this.sprite.x,
      y:this.sprite.y,
      alpha:this.sprite.alpha,
      scale:this.sprite.scale.x
    }
  }

  applyFrame(frame){
    this.sprite.alpha=frame.alpha;
    this.sprite.x=frame.x;
    this.sprite.y=frame.y;
    this.sprite.scale={x:frame.scale,y:frame.scale};
  }

  goToFrame(frameId,duration=1000){
    this.goTo(frameId<this.frames.length?this.frames[frameId]:this.defFrame);
  }

  goTo(frameData,duration=1000){
    this.maxStep=duration/1000*60;
    const p=this.presentFrame;
    this.dest=Object.assign({},p,frameData);
    this.diff={
      alpha:(this.dest.alpha-p.alpha)/this.maxStep,
      x:(this.dest.x-p.x)/this.maxStep,
      y:(this.dest.y-p.y)/this.maxStep,
      scale:(this.dest.scale-p.scale.x)/this.maxStep
    };
    this.step=0;
    this.isPlaying=1;
  }

  onTick(){
      if(!this.isPlaying) return;
      if(this.step>=this.maxStep){
        this.applyFrame(this.dest);
        this.isPlaying=false;
      } else {
        if(this.diff.alpha){
          this.sprite.alpha+=this.diff.alpha;
        };
        if(this.diff.x){
          this.sprite.x+=this.diff.x;
        };
        if(this.diff.y){
          this.sprite.y+=this.diff.y;
        };
        if(this.diff.scale){
          var s=this.sprite.scale.x+this.diff.scale;
          this.sprite.scale={x:s,y:s};
        };
        this.step++;
      }

  }
}
