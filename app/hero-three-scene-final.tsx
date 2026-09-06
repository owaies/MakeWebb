'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate } from 'animejs';

const BLUE = 0x5b9cff;
const CYAN = 0x62d7ff;
const VIOLET = 0x9b7cff;
const PEOPLE = [
  { name:'Mohammed Owaies', role:'AI / ML Engineer', tag:'AI · ML · DATA', image:'/team/file_000000002d308211b0a2203107625baf.png', accent:BLUE },
  { name:'Mohammed Afaf Hassan', role:'Web Developer', tag:'WEB · APPS · UI/UX', image:'/team/file_000000001c20821185b00fb24f8c0312.png', accent:VIOLET },
] as const;

function roundedShape(w:number,h:number,r:number){
  const s=new THREE.Shape(),x=-w/2,y=-h/2;
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
function infoTexture(p:typeof PEOPLE[number]){
  const c=document.createElement('canvas');c.width=900;c.height=330;const x=c.getContext('2d');
  if(!x)return new THREE.CanvasTexture(c);
  const accent='#'+p.accent.toString(16).padStart(6,'0');
  x.fillStyle='#fff';x.font='800 47px Arial';x.fillText(p.name,28,58);
  x.fillStyle=accent;x.font='700 28px Arial';x.fillText(p.role,28,101);
  x.fillStyle='#9badc0';x.font='500 19px Arial';x.fillText(p.tag,28,138);
  x.fillStyle='#64758b';x.font='500 15px Arial';x.fillText('PRODUCT · ENGINEERING · EXPERIENCE',28,172);
  x.fillStyle=accent;x.fillRect(28,205,110,4);x.fillStyle='#263a51';x.fillRect(28,226,155,4);x.fillRect(28,247,125,4);
  x.fillStyle='#e6effa';x.font='600 16px Arial';x.fillText('PORTFOLIO',28,298);x.fillText('GITHUB',190,298);x.fillText('LINKEDIN',300,298);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function makeProfile(p:typeof PEOPLE[number]){
  const g=new THREE.Group();
  const geo=new THREE.ExtrudeGeometry(roundedShape(3.1,4.9,.24),{depth:.24,bevelEnabled:true,bevelSegments:7,bevelSize:.07,bevelThickness:.06,curveSegments:10});geo.center();
  const shell=new THREE.Mesh(geo,new THREE.MeshPhysicalMaterial({color:0x07111e,transparent:true,opacity:.32,transmission:.72,thickness:.5,ior:1.46,roughness:.08,clearcoat:1,clearcoatRoughness:.03,side:THREE.DoubleSide}));g.add(shell);
  g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo,18),new THREE.LineBasicMaterial({color:p.accent,transparent:true,opacity:.95})));
  const tex=new THREE.TextureLoader().load(p.image);tex.colorSpace=THREE.SRGBColorSpace;
  const photo=new THREE.Mesh(new THREE.PlaneGeometry(2.82,3.05),new THREE.MeshStandardMaterial({map:tex,roughness:.3}));photo.position.set(0,.64,.17);g.add(photo);
  const glassShade=new THREE.Mesh(new THREE.PlaneGeometry(2.82,3.05),new THREE.MeshBasicMaterial({color:0x07111e,transparent:true,opacity:.07,depthWrite:false}));glassShade.position.set(0,.64,.19);g.add(glassShade);
  const panel=new THREE.Mesh(new THREE.BoxGeometry(2.75,1.17,.06),new THREE.MeshPhysicalMaterial({color:0x030914,transparent:true,opacity:.9,roughness:.15,transmission:.08,clearcoat:1}));panel.position.set(0,-1.46,.2);g.add(panel);
  const text=new THREE.Mesh(new THREE.PlaneGeometry(2.62,1.04),new THREE.MeshBasicMaterial({map:infoTexture(p),transparent:true}));text.position.set(-.02,-1.47,.24);g.add(text);
  const arrow=new THREE.Mesh(new THREE.PlaneGeometry(.34,.34),new THREE.MeshBasicMaterial({color:p.accent,transparent:true,opacity:.28}));arrow.position.set(1.14,1.9,.22);g.add(arrow);
  return g;
}
function makeObject(kind:'web'|'android'|'windows'|'ai'){
  const g=new THREE.Group();
  const mat=new THREE.MeshPhysicalMaterial({color:0x071423,transparent:true,opacity:.5,transmission:.6,thickness:.2,roughness:.07,clearcoat:1});
  const edge=new THREE.LineBasicMaterial({color:kind==='ai'?VIOLET:BLUE,transparent:true,opacity:.9});
  if(kind==='web'){const m=new THREE.Mesh(new THREE.BoxGeometry(1.45,.84,.14),mat);g.add(m,new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),edge));for(let i=0;i<3;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.78-i*.1,.045,.02),new THREE.MeshBasicMaterial({color:i?0x7892b3:CYAN}));l.position.set(-.12,.16-i*.15,.1);g.add(l);}}
  if(kind==='android'){const m=new THREE.Mesh(new THREE.BoxGeometry(.76,1.38,.13),mat);g.add(m,new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),edge));const s=new THREE.Mesh(new THREE.PlaneGeometry(.6,1.12),new THREE.MeshBasicMaterial({color:0x0b2137}));s.position.z=.08;g.add(s);const dot=new THREE.Mesh(new THREE.SphereGeometry(.08,16,16),new THREE.MeshBasicMaterial({color:CYAN}));dot.position.z=.13;g.add(dot);}
  if(kind==='windows'){const m=new THREE.Mesh(new THREE.BoxGeometry(1.15,1.15,.13),mat);g.add(m,new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),edge));const wm=new THREE.MeshBasicMaterial({color:BLUE,transparent:true,opacity:.78});for(let x=0;x<2;x++)for(let y=0;y<2;y++){const q=new THREE.Mesh(new THREE.PlaneGeometry(.37,.37),wm);q.position.set((x-.5)*.44,(y-.5)*.44,.08);g.add(q);}}
  if(kind==='ai'){const m=new THREE.Mesh(new THREE.BoxGeometry(1.08,1.08,.22),new THREE.MeshPhysicalMaterial({color:0x071321,transparent:true,opacity:.8,metalness:.15,roughness:.07,clearcoat:1}));g.add(m,new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),new THREE.LineBasicMaterial({color:VIOLET,transparent:true,opacity:.95})));const core=new THREE.Mesh(new THREE.BoxGeometry(.46,.46,.08),new THREE.MeshBasicMaterial({color:VIOLET,transparent:true,opacity:.72}));core.position.z=.14;g.add(core);}
  return g;
}

export default function HeroThreeScene(){
  const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=host.current;if(!el)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.z=12.2;
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;el.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xc7ddf5,0x01050b,1.35));const key=new THREE.DirectionalLight(0xffffff,2.3);key.position.set(3,5,8);scene.add(key);const blue=new THREE.PointLight(BLUE,18,14,2);blue.position.set(-4,2,4);scene.add(blue);const violet=new THREE.PointLight(VIOLET,15,13,2);violet.position.set(4,-1,3);scene.add(violet);
    const root=new THREE.Group();scene.add(root);const left=makeProfile(PEOPLE[0]),right=makeProfile(PEOPLE[1]);root.add(left,right);
    const center=new THREE.Group();root.add(center);const cube=new THREE.Mesh(new THREE.BoxGeometry(1.72,1.72,1.72),new THREE.MeshPhysicalMaterial({color:0x091a2b,transparent:true,opacity:.5,transmission:.7,thickness:.35,roughness:.055,clearcoat:1}));cube.rotation.set(-.3,.5,-.08);center.add(cube);const ce=new THREE.LineSegments(new THREE.EdgesGeometry(cube.geometry),new THREE.LineBasicMaterial({color:BLUE,transparent:true,opacity:.95}));ce.rotation.copy(cube.rotation);center.add(ce);
    const lc=document.createElement('canvas');lc.width=500;lc.height=500;const cx=lc.getContext('2d');if(cx){cx.fillStyle='#6ab0ff';cx.shadowColor='#6ab0ff';cx.shadowBlur=28;cx.font='900 125px Arial';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('M/W',250,250);}const logo=new THREE.Mesh(new THREE.PlaneGeometry(1.08,1.08),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(lc),transparent:true}));logo.position.z=.88;center.add(logo);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(2.45,.014,8,180),new THREE.MeshBasicMaterial({color:BLUE,transparent:true,opacity:.5}));ring.rotation.set(1.18,0,-.18);root.add(ring);const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.85,.011,8,180),new THREE.MeshBasicMaterial({color:VIOLET,transparent:true,opacity:.3}));ring2.rotation.set(.2,1.05,.35);root.add(ring2);
    const serviceGroup=new THREE.Group();root.add(serviceGroup);(['web','android','windows','ai'] as const).forEach((kind,i)=>{const o=makeObject(kind);o.position.set(-4.25+i*2.85,-2.72,-.3-(i%2)*.55);o.rotation.set(.08,.2+i*.1,-.04);o.scale.setScalar(.78);serviceGroup.add(o);if(!reduced)animate(o.rotation,{x:[o.rotation.x-.05,o.rotation.x+.05],y:[o.rotation.y-.1,o.rotation.y+.1],duration:5200+i*400,alternate:true,loop:true,ease:'inOutSine'});});
    const fragments=new THREE.Group();root.add(fragments);for(let i=0;i<24;i++){const s=.06+(i%4)*.035;const m=new THREE.Mesh(new THREE.BoxGeometry(s,s,s),new THREE.MeshPhysicalMaterial({color:i%2?CYAN:VIOLET,transparent:true,opacity:.22,transmission:.5,roughness:.08}));m.position.set((Math.random()-.5)*11,(Math.random()-.5)*6,-1.4-Math.random()*4);m.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2);fragments.add(m);}
    const points=new Float32Array(450);for(let i=0;i<150;i++){points[i*3]=(Math.random()-.5)*13;points[i*3+1]=(Math.random()-.5)*7;points[i*3+2]=-2-Math.random()*5;}const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(points,3));scene.add(new THREE.Points(pg,new THREE.PointsMaterial({color:CYAN,size:.018,transparent:true,opacity:.62})));
    const resize=()=>{const w=el.clientWidth||1,h=el.clientHeight||1,m=w<700;camera.aspect=w/h;camera.fov=m?39:34;camera.position.z=m?10.6:12.2;camera.updateProjectionMatrix();renderer.setSize(w,h,false);const scale=m?.58:w<1050?.76:1;left.scale.setScalar(.94*scale);right.scale.setScalar(.94*scale);left.position.set(m?-2.02:-3.62,m?.42:.28,.35);right.position.set(m?2.02:3.62,m?.42:.22,.25);left.rotation.set(.035,m?.14:.17,-.035);right.rotation.set(.035,m?-.14:-.17,.035);center.position.set(0,m?-1.55:-1.18,.7);center.scale.setScalar(m?.82:1);ring.scale.setScalar(m?.78:1);ring2.scale.setScalar(m?.8:1);serviceGroup.visible=!m;};resize();const observer=new ResizeObserver(resize);observer.observe(el);
    const pointer={x:0,y:0};const onPointer=(e:PointerEvent)=>{pointer.x=e.clientX/window.innerWidth-.5;pointer.y=e.clientY/window.innerHeight-.5;};window.addEventListener('pointermove',onPointer,{passive:true});let frame=0;const draw=()=>{root.rotation.y=pointer.x*.045;root.rotation.x=-pointer.y*.022;renderer.render(scene,camera);frame=requestAnimationFrame(draw);};draw();
    const motions:any[]=[];if(!reduced){motions.push(animate(left.position,{y:[left.position.y-.08,left.position.y+.1],z:[.27,.4],duration:7600,alternate:true,loop:true,ease:'inOutSine'}));motions.push(animate(right.position,{y:[right.position.y+.08,right.position.y-.07],z:[.17,.3],duration:8400,alternate:true,loop:true,ease:'inOutSine'}));motions.push(animate(center.position,{y:[center.position.y-.12,center.position.y+.1],duration:6200,alternate:true,loop:true,ease:'inOutSine'}));motions.push(animate(cube.rotation,{x:[-.36,-.2],y:[.4,.64],z:[-.1,.08],duration:7200,alternate:true,loop:true,ease:'inOutSine'}));motions.push(animate(ring.rotation,{z:[-.34,.28],duration:12000,alternate:true,loop:true,ease:'inOutSine'}));motions.push(animate(ring2.rotation,{z:[.6,-.38],duration:15000,alternate:true,loop:true,ease:'inOutSine'}));}
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',onPointer);motions.forEach(m=>m?.pause?.());renderer.dispose();renderer.domElement.remove();};
  },[]);
  return <div ref={host} className="hero-three-scene" aria-hidden="true"/>;
}
