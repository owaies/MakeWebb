'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate } from 'animejs';

const BLUE = 0x5b9cff;
const CYAN = 0x62d7ff;
const VIOLET = 0x9b7cff;

const PEOPLE = [
  { name: 'Mohammed Owaies', role: 'AI / ML Engineer', tag: 'AI · ML · DATA', image: '/team/file_000000002d308211b0a2203107625baf.png', accent: BLUE },
  { name: 'Mohammed Afaf Hassan', role: 'Web Developer', tag: 'WEB · APPS · UI/UX', image: '/team/file_000000001c20821185b00fb24f8c0312.png', accent: VIOLET },
] as const;

function roundedCard(w:number,h:number,r:number){
  const s=new THREE.Shape(),x=-w/2,y=-h/2;
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}

function labelTexture(person:typeof PEOPLE[number]){
  const c=document.createElement('canvas');c.width=900;c.height=360;const x=c.getContext('2d');
  if(!x)return new THREE.CanvasTexture(c);
  x.clearRect(0,0,c.width,c.height);
  const color='#'+person.accent.toString(16).padStart(6,'0');
  x.fillStyle='#fff';x.font='800 48px Arial';x.fillText(person.name,28,62);
  x.fillStyle=color;x.font='700 28px Arial';x.fillText(person.role,28,105);
  x.fillStyle='#9aa9bc';x.font='500 19px Arial';x.fillText(person.tag,28,143);
  x.fillStyle='#64758b';x.font='500 15px Arial';x.fillText('PRODUCT · ENGINEERING · EXPERIENCE',28,178);
  x.fillStyle=color;x.fillRect(28,214,110,4);x.fillStyle='#263a51';x.fillRect(28,235,160,4);x.fillRect(28,256,125,4);
  x.fillStyle='#dbe8f6';x.font='600 17px Arial';x.fillText('PORTFOLIO',28,305);x.fillText('GITHUB',190,305);x.fillText('LINKEDIN',295,305);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}

function profileCard(person:typeof PEOPLE[number]){
  const g=new THREE.Group();
  const shape=roundedCard(3.15,4.95,.24);
  const geo=new THREE.ExtrudeGeometry(shape,{depth:.24,bevelEnabled:true,bevelSegments:8,bevelSize:.075,bevelThickness:.07,curveSegments:12});geo.center();
  const glass=new THREE.MeshPhysicalMaterial({color:0x07111e,transparent:true,opacity:.28,transmission:.78,thickness:.62,ior:1.46,roughness:.08,metalness:.02,clearcoat:1,clearcoatRoughness:.025,side:THREE.DoubleSide});
  const body=new THREE.Mesh(geo,glass);body.castShadow=true;g.add(body);
  const edge=new THREE.LineSegments(new THREE.EdgesGeometry(geo,18),new THREE.LineBasicMaterial({color:person.accent,transparent:true,opacity:.9}));edge.position.z=.035;g.add(edge);
  const glow=new THREE.LineSegments(new THREE.EdgesGeometry(geo,30),new THREE.LineBasicMaterial({color:person.accent,transparent:true,opacity:.18}));glow.scale.setScalar(1.035);g.add(glow);
  const tex=new THREE.TextureLoader().load(person.image);tex.colorSpace=THREE.SRGBColorSpace;
  const portrait=new THREE.Mesh(new THREE.PlaneGeometry(2.86,3.05),new THREE.MeshStandardMaterial({map:tex,roughness:.3,metalness:0}));portrait.position.set(0,.66,.18);g.add(portrait);
  const shade=new THREE.Mesh(new THREE.PlaneGeometry(2.86,3.05),new THREE.MeshBasicMaterial({color:0x07111e,transparent:true,opacity:.08,depthWrite:false}));shade.position.set(0,.66,.195);g.add(shade);
  const info=new THREE.Mesh(new THREE.BoxGeometry(2.78,1.18,.055),new THREE.MeshPhysicalMaterial({color:0x030914,transparent:true,opacity:.88,roughness:.14,transmission:.08,clearcoat:1}));info.position.set(0,-1.47,.2);g.add(info);
  const text=new THREE.Mesh(new THREE.PlaneGeometry(2.65,1.05),new THREE.MeshBasicMaterial({map:labelTexture(person),transparent:true}));text.position.set(-.02,-1.48,.235);g.add(text);
  const arrow=new THREE.Mesh(new THREE.PlaneGeometry(.36,.36),new THREE.MeshBasicMaterial({color:person.accent,transparent:true,opacity:.32}));arrow.position.set(1.16,1.92,.21);g.add(arrow);
  return g;
}

function object(kind:'web'|'android'|'windows'|'ai'){
  const g=new THREE.Group();
  const glass=new THREE.MeshPhysicalMaterial({color:0x071423,transparent:true,opacity:.48,transmission:.62,thickness:.24,roughness:.06,clearcoat:1});
  const edge=new THREE.LineBasicMaterial({color:kind==='ai'?VIOLET:BLUE,transparent:true,opacity:.9});
  if(kind==='web'){
    const m=new THREE.Mesh(new THREE.BoxGeometry(1.5,.9,.14),glass);g.add(m,new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),edge));
    for(let i=0;i<3;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.78-i*.1,.05,.025),new THREE.MeshBasicMaterial({color:i===0?CYAN:0x7892b3}));l.position.set(-.12,.18-i*.16,.1);g.add(l);}
  }else if(kind==='android'){
    const m=new THREE.Mesh(new THREE.BoxGeometry(.78,1.42,.13),glass);g.add(m,new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),edge));
    const s=new THREE.Mesh(new THREE.PlaneGeometry(.62,1.15),new THREE.MeshBasicMaterial({color:0x0b2137,transparent:true,opacity:.96}));s.position.z=.08;g.add(s);
    const dot=new THREE.Mesh(new THREE.SphereGeometry(.08,16,16),new THREE.MeshBasicMaterial({color:CYAN}));dot.position.set(0,.12,.13);g.add(dot);
  }else if(kind==='windows'){
    const m=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.2,.13),glass);g.add(m,new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),edge));
    const mat=new THREE.MeshBasicMaterial({color:BLUE,transparent:true,opacity:.78});
    for(let x=0;x<2;x++)for(let y=0;y<2;y++){const p=new THREE.Mesh(new THREE.PlaneGeometry(.39,.39),mat);p.position.set((x-.5)*.46,(y-.5)*.46,.08);g.add(p);}
  }else{
    const m=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.1,.24),new THREE.MeshPhysicalMaterial({color:0x071321,transparent:true,opacity:.8,metalness:.18,roughness:.07,clearcoat:1}));g.add(m,new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),new THREE.LineBasicMaterial({color:VIOLET,transparent:true,opacity:.95})));
    const core=new THREE.Mesh(new THREE.BoxGeometry(.48,.48,.08),new THREE.MeshBasicMaterial({color:VIOLET,transparent:true,opacity:.75}));core.position.z=.15;g.add(core);
    for(let i=0;i<6;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(.045,.18,.045),new THREE.MeshBasicMaterial({color:CYAN}));p.position.set(-.42+i*.17,.67,.02);g.add(p);}
  }
  return g;
}

export default function HeroThreeSceneV2(){
  const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=host.current;if(!el)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,0,12.2);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;el.appendChild(renderer.domElement);
    const hemi=new THREE.HemisphereLight(0xc7ddf5,0x01050b,1.35);scene.add(hemi);
    const key=new THREE.DirectionalLight(0xffffff,2.2);key.position.set(3,5,8);scene.add(key);
    const b=new THREE.PointLight(BLUE,18,14,2);b.position.set(-4,2,4);scene.add(b);
    const v=new THREE.PointLight(VIOLET,15,13,2);v.position.set(4,-1,3);scene.add(v);
    const root=new THREE.Group();scene.add(root);
    const left=profileCard(PEOPLE[0]),right=profileCard(PEOPLE[1]);root.add(left,right);
    const center=new THREE.Group();root.add(center);
    const cube=new THREE.Mesh(new THREE.BoxGeometry(1.72,1.72,1.72),new THREE.MeshPhysicalMaterial({color:0x0a1726,transparent:true,opacity:.5,transmission:.7,thickness:.38,roughness:.055,clearcoat:1}));cube.rotation.set(-.3,.5,-.08);center.add(cube);
    const ce=new THREE.LineSegments(new THREE.EdgesGeometry(cube.geometry),new THREE.LineBasicMaterial({color:BLUE,transparent:true,opacity:.95}));ce.rotation.copy(cube.rotation);center.add(ce);
    const lc=document.createElement('canvas');lc.width=500;lc.height=500;const cx=lc.getContext('2d');if(cx){cx.clearRect(0,0,500,500);cx.fillStyle='#6ab0ff';cx.shadowColor='#6ab0ff';cx.shadowBlur=28;cx.font='900 125px Arial';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('M/W',250,250);}const logo=new THREE.Mesh(new THREE.PlaneGeometry(1.08,1.08),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(lc),transparent:true}));logo.position.z=.88;center.add(logo);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(2.45,.014,8,180),new THREE.MeshBasicMaterial({color:BLUE,transparent:true,opacity:.5}));ring.rotation.set(1.18,0,-.18);root.add(ring);
    const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.85,.011,8,180),new THREE.MeshBasicMaterial({color:VIOLET,transparent:true,opacity:.3}));ring2.rotation.set(.2,1.05,.35);root.add(ring2);
    const services=new THREE.Group();root.add(services);(['web','android','windows','ai'] as const).forEach((kind,i)=>{const o=object(kind);services.add(o);o.position.set(-4.35+i*2.9,-2.65,-.2-(i%2)*.55);o.rotation.set(.1,.2+i*.12,-.05);o.scale.setScalar(.76);if(!reduced)animate(o.rotation,{x:[o.rotation.x-.06,o.rotation.x+.06],y:[o.rotation.y-.12,o.rotation.y+.12],duration:5200+i*450,alternate:true,loop:true,ease:'inOutSine'});});
    const frag=new THREE.Group();root.add(frag);for(let i=0;i<22;i++){const s=.07+(i%4)*.04;const m=new THREE.Mesh(new THREE.BoxGeometry(s,s,s),new THREE.MeshPhysicalMaterial({color:i%2?CYAN:VIOLET,transparent:true,opacity:.22,transmission:.5,roughness:.08}));m.position.set((Math.random()-.5)*11,(Math.random()-.5)*6,-1.5-Math.random()*4);m.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2);frag.add(m);}
    const pts=new Float32Array(450);for(let i=0;i<150;i++){pts[i*3]=(Math.random()-.5)*13;pts[i*3+1]=(Math.random()-.5)*7;pts[i*3+2]=-2-Math.random()*5;}const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pts,3));scene.add(new THREE.Points(pg,new THREE.PointsMaterial({color:CYAN,size:.018,transparent:true,opacity:.62})));
    const size=()=>{const w=el.clientWidth||1,h=el.clientHeight||1;const mobile=w<700;camera.aspect=w/h;camera.position.z=mobile?10.6:12.2;camera.fov=mobile?39:34;camera.updateProjectionMatrix();renderer.setSize(w,h,false);
      const s=mobile?.58:w<1050?.76:1;left.scale.setScalar(.93*s);right.scale.setScalar(.93*s);left.position.set(mobile?-2.05:-3.62,mobile:.45:.32,.35);right.position.set(mobile?2.05:3.62,mobile:.45:.25,.25);left.rotation.set(THREE.MathUtils.degToRad(2),THREE.MathUtils.degToRad(mobile?8:10),THREE.MathUtils.degToRad(-2));right.rotation.set(THREE.MathUtils.degToRad(2),THREE.MathUtils.degToRad(mobile?-8:-10),THREE.MathUtils.degToRad(2));center.position.set(0,mobile?-1.65:-1.2,.7);center.scale.setScalar(mobile?.82:1);ring.scale.setScalar(mobile?.78:1);ring2.scale.setScalar(mobile?.8:1);services.visible=!mobile;};size();const ro=new ResizeObserver(size);ro.observe(el);
    const pointer={x:0,y:0};const move=(e:PointerEvent)=>{pointer.x=(e.clientX/window.innerWidth-.5);pointer.y=(e.clientY/window.innerHeight-.5);};window.addEventListener('pointermove',move,{passive:true});
    let raf=0;const render=()=>{root.rotation.y=pointer.x*.035;root.rotation.x=-pointer.y*.018;renderer.render(scene,camera);raf=requestAnimationFrame(render);};render();
    const animations:any[]=[];if(!reduced){animations.push(animate(left.position,{y:[left.position.y-.08,left.position.y+.1],z:[.28,.4],duration:7600,alternate:true,loop:true,ease:'inOutSine'}));animations.push(animate(right.position,{y:[right.position.y+.08,right.position.y-.07],z:[.18,.3],duration:8400,alternate:true,loop:true,ease:'inOutSine'}));animations.push(animate(center.position,{y:[center.position.y-.12,center.position.y+.1],duration:6200,alternate:true,loop:true,ease:'inOutSine'}));animations.push(animate(cube.rotation,{x:[-.36,-.2],y:[.4,.64],z:[-.1,.08],duration:7200,alternate:true,loop:true,ease:'inOutSine'}));animations.push(animate(ring.rotation,{z:[-.34,.28],duration:12000,alternate:true,loop:true,ease:'inOutSine'}));animations.push(animate(ring2.rotation,{z:[.6,-.38],duration:15000,alternate:true,loop:true,ease:'inOutSine'}));}
    return()=>{cancelAnimationFrame(raf);ro.disconnect();window.removeEventListener('pointermove',move);animations.forEach(a=>a?.pause?.());renderer.dispose();renderer.domElement.remove();};
  },[]);
  return <div ref={host} className="hero-three-scene" aria-hidden="true"/>;
}
