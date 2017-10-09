export default class AlphaParticles{
  constructor(image,parent,options){
      let s=this.settings=Object.assign({},{
        nItems:10,
        scale:true,
        alpha:true,
        position:true,
        width:240,
        height:400,
        x:0,
        y:0,
        baseSteps:300,
        randomSteps:300
      },options);

      this.container=new PIXI.particles.ParticleContainer(1000,{
        scale:s.scale,
        alpha:s.alpha,
        position:s.position
      });
      this.container.onTick=()=>{
        this.onTick();
      }
      parent.addChild(this.container);

      this.items=[];
      for(let cnt=0,m=s.nItems;cnt<m;cnt++){
        this.items.push(new AlphaParticle(image,this.container,{
          maxX:s.width,
          maxY:s.height,
          baseSteps:s.baseSteps,
          randomSteps:s.randomSteps
        }));
      }
  }

  onTick(){
    for(let cnt=0,m=this.items.length;cnt<m;cnt++){
      this.items[cnt].onTick();
    }
  }
}

class AlphaParticle{
  constructor(image,parent,options){
    this.settings=Object.assign({},{
      maxX:240,
      maxY:400,
      baseSteps:300,
      randomSteps:300,
    },options);


    this.sprite=new PIXI.Sprite(PIXI.Texture.fromImage(image));
    this.sprite.anchor.set(0.5);
    this.reset(true);
    this.move();
    parent.addChild(this.sprite);
  }

  reset(doResetStep=false){
    let s=this.settings;
    this.x0=Math.random()*s.maxX;
    this.y0=s.maxY/2;

    this.maxSteps=s.baseSteps+Math.random()*s.randomSteps;
    let scale=this.maxSteps/(s.baseSteps+s.randomSteps);
    this.sprite.scale=new PIXI.Point(scale,scale);
    this.step=doResetStep?Math.floor(Math.random()*10000)%this.maxSteps:0;

    var a=Math.random()*2*3.14;
    var r=Math.max(s.maxX,s.maxY);
    var x1=r*Math.cos(a);
    var y1=r*Math.sin(a);

    this.dX=x1/this.maxSteps;
    this.dY=y1/this.maxSteps;
  }

  move(){
    this.sprite.x=this.x0+this.step*this.dX;
    this.sprite.y=this.y0+this.step*this.dY;
    this.sprite.alpha=0.5-Math.abs(this.maxSteps/2-this.step)/(this.maxSteps);
  }

  onTick(){
    this.step++;
    if(this.step>this.maxSteps){
      this.reset(false);
    };
    this.move();
  }
}
