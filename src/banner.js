import AlphaImage from './AlphaImage.js';
import AlphaParticles from './AlphaParticles.js';

import imgBg from '../img/fon300x600.png';
import imgAge from '../img/12.png';
import imgButton from '../img/300x600_button.png';
import imgLogo from '../img/300x600_logo.png';
import imgMolly from '../img/300x600_molly.png';
import imgOpening from '../img/300x600_opening.png';
import imgSam from '../img/300x600_sam.png';
import imgText from '../img/300x600_text.png';
import imgCircle from '../img/circle.png';

const parentNode=document.querySelector('.banner-300x600');
const renderer = PIXI.autoDetectRenderer(298, 598,{antialias: false, transparent: false, resolution: 1, backgroundColor:0xffffff});
const stage = new PIXI.Container();
parentNode.appendChild(renderer.view);

const loader=PIXI.loader;
[imgAge,imgButton,imgLogo,imgMolly,imgOpening,imgSam,imgText,imgCircle].forEach(item=>loader.add(item));
loader.load(()=>{

  const bg=new AlphaImage(imgBg,stage);
  const age=new AlphaImage(imgAge,stage,{alpha:0,y:551,x:271});
  const button=new AlphaImage(imgButton,stage,{alpha:0,y:483,x:52});
  const logo=new AlphaImage(imgLogo,stage,{alpha:0,y:406,x:0});
  const molly=new AlphaImage(imgMolly,stage,{alpha:0,x:10});
  const opening=new AlphaImage(imgOpening,stage,{alpha:0,y:577,x:0});
  const sam=new AlphaImage(imgSam,stage,{alpha:0,x:-10});
  const text=new AlphaImage(imgText,stage,{alpha:0,y:357,x:30});

  const circles=new AlphaParticles(imgCircle,stage,{width:300,height:600,nItems:20,baseSteps:1000,randomSteps:500});

  molly.goTo({alpha:1,x:0},1000);
  age.goTo({alpha:1},500);

  setTimeout(function(){
     sam.goTo({alpha:1,x:0},1000);
  },500);

  setTimeout(function(){
    logo.goTo({alpha:1},2000);
  },1500);

  setTimeout(function(){
    button.goTo({alpha:1},1000);
  },2000);

  setTimeout(function(){
    text.goTo({alpha:1},1000);
  },1000);

  setTimeout(function(){
    opening.goTo({alpha:1},500);
  },2500);


  function gameLoop(){
    requestAnimationFrame(gameLoop);
    stage.children.forEach(item=>{
      if(item.onTick){
        item.onTick();
      }
    });
    renderer.render(stage);
  }
  gameLoop();
})
