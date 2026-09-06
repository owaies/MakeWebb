'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate } from 'animejs';

const BLUE = 0x5b9cff;
const CYAN = 0x56d8ff;
const VIOLET = 0x8a7cff;

const PEOPLE = [
  { name: 'Mohammed Owaies', role: 'AI / ML Engineer', tag: 'AI · ML · DATA', image: '/team/file_000000002d308211b0a2203107625baf.png', color: BLUE },
  { name: 'Mohammed Afaf Hassan', role: 'Web Developer', tag: 'WEB · APPS · UI/UX', image: '/team/file_000000001c20821185b00fb24f8c0312.png', color: VIOLET },
] as const;

function roundedRect(width: number, height: number, radius: number) {
  const x = -width / 2, y = -height / 2, s = new THREE.Shape();
  s.moveTo(x + radius, y);
  s.lineTo(x + width - radius, y); s.quadraticCurveTo(x + width, y, x + width, y + radius);
  s.lineTo(x + width, y + height - radius); s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  s.lineTo(x + radius, y + height); s.quadraticCurveTo(x, y + height, x, y + height - radius);
  s.lineTo(x, y + radius); s.quadraticCurveTo(x, y, x + radius, y);
  return s;
}

function textTexture(person: typeof PEOPLE[number]) {
  const canvas = document.createElement('canvas'); canvas.width = 900; canvas.height = 330;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);
  const hex = `#${person.color.toString(16).padStart(6, '0')}`;
  ctx.clearRect(0, 0, 900, 330);
  ctx.fillStyle = '#ffffff'; ctx.font = '700 52px Arial'; ctx.fillText(person.name, 28, 64);
  ctx.fillStyle = hex; ctx.font = '700 31px Arial'; ctx.fillText(person.role, 28, 111);
  ctx.fillStyle = '#a9b3c2'; ctx.font = '500 21px Arial'; ctx.fillText(person.tag, 28, 153);
  ctx.fillStyle = '#50647d'; ctx.font = '500 17px Arial'; ctx.fillText('PRODUCT · ENGINEERING · EXPERIENCE', 28, 196);
  for (let i = 0; i < 3; i += 1) { ctx.fillStyle = i === 0 ? hex : '#1d3147'; ctx.fillRect(28, 228 + i * 27, 95 + i * 34, 4); }
  const t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function createProfileCard(person: typeof PEOPLE[number]) {
  const group = new THREE.Group();
  const geom = new THREE.ExtrudeGeometry(roundedRect(3.0, 4.7, 0.22), { depth: 0.22, bevelEnabled: true, bevelSegments: 6, bevelSize: 0.07, bevelThickness: 0.065, curveSegments: 10 });
  geom.center();

  const shell = new THREE.Mesh(geom, new THREE.MeshPhysicalMaterial({ color: 0x07101b, transparent: true, opacity: 0.3, roughness: 0.07, metalness: 0.04, transmission: 0.82, thickness: 0.55, ior: 1.46, clearcoat: 1, clearcoatRoughness: 0.035, side: THREE.DoubleSide }));
  shell.castShadow = true; shell.receiveShadow = true; group.add(shell);
  const back = shell.clone(); back.position.z = -0.13; back.scale.setScalar(1.025); back.material = new THREE.MeshPhysicalMaterial({ color: 0x06101c, transparent: true, opacity: 0.16, roughness: 0.05, transmission: 0.8, thickness: 0.45 }); group.add(back);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom, 18), new THREE.LineBasicMaterial({ color: person.color, transparent: true, opacity: 0.84 })); edges.position.z = 0.03; group.add(edges);

  const texture = new THREE.TextureLoader().load(person.image); texture.colorSpace = THREE.SRGBColorSpace;
  const portrait = new THREE.Mesh(new THREE.PlaneGeometry(2.73, 3.0), new THREE.MeshStandardMaterial({ map: texture, roughness: 0.32, metalness: 0 }));
  portrait.position.set(0, 0.55, 0.16); group.add(portrait);

  const info = new THREE.Mesh(new THREE.BoxGeometry(2.62, 1.05, 0.05), new THREE.MeshPhysicalMaterial({ color: 0x030914, transparent: true, opacity: 0.9, roughness: 0.18, transmission: 0.12 }));
  info.position.set(0, -1.48, 0.18); group.add(info);
  const infoText = new THREE.Mesh(new THREE.PlaneGeometry(2.48, 0.91), new THREE.MeshBasicMaterial({ map: textTexture(person), transparent: true }));
  infoText.position.set(-0.03, -1.49, 0.21); group.add(infoText);

  const arrow = new THREE.Mesh(new THREE.PlaneGeometry(.32,.32), new THREE.MeshBasicMaterial({ color: person.color, transparent:true, opacity:.18 }));
  arrow.position.set(1.08, 1.87, .18); group.add(arrow);
  return group;
}

function createServiceObject(kind: 'web' | 'android' | 'windows' | 'ai') {
  const group = new THREE.Group();
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x08121f, transparent: true, opacity: .44, transmission: .62, thickness: .22, roughness: .07, clearcoat: 1 });
  const edge = new THREE.LineBasicMaterial({ color: kind === 'ai' ? VIOLET : BLUE, transparent: true, opacity: .85 });
  if (kind === 'web') {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.5, .88, .12), glass); group.add(frame); group.add(new THREE.LineSegments(new THREE.EdgesGeometry(frame.geometry), edge));
    for(let i=0;i<3;i+=1){const line=new THREE.Mesh(new THREE.BoxGeometry(.78-i*.1,.045,.025),new THREE.MeshBasicMaterial({color:i===0?CYAN:0x7691b5}));line.position.set(-.14,.18-i*.16,.08);group.add(line);}
  } else if(kind === 'android') {
    const phone=new THREE.Mesh(new THREE.BoxGeometry(.78,1.4,.11),glass);group.add(phone);group.add(new THREE.LineSegments(new THREE.EdgesGeometry(phone.geometry),edge));
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(.62,1.15),new THREE.MeshBasicMaterial({color:0x0b1d31,transparent:true,opacity:.95}));screen.position.z=.07;group.add(screen);
    const dot=new THREE.Mesh(new THREE.SphereGeometry(.09,12,12),new THREE.MeshBasicMaterial({color:CYAN}));dot.position.set(0,.12,.11);group.add(dot);
  } else if(kind === 'windows') {
    const frame=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.2,.12),glass);group.add(frame);group.add(new THREE.LineSegments(new THREE.EdgesGeometry(frame.geometry),edge));
    const m=new THREE.MeshBasicMaterial({color:BLUE,transparent:true,opacity:.72});
    for(let x=0;x<2;x+=1)for(let y=0;y<2;y+=1){const p=new THREE.Mesh(new THREE.PlaneGeometry(.38,.38),m);p.position.set((x-.5)*.46,(y-.5)*.46,.07);group.add(p);}
  } else {
    const chip=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.1,.23),new THREE.MeshPhysicalMaterial({color:0x071221,transparent:true,opacity:.78,metalness:.18,roughness:.08,clearcoat:1}));group.add(chip);group.add(new THREE.LineSegments(new THREE.EdgesGeometry(chip.geometry),new THREE.LineBasicMaterial({color:VIOLET,transparent:true,opacity:.9})));
    const core=new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.08),new THREE.MeshBasicMaterial({color:VIOLET,transparent:true,opacity:.7}));core.position.z=.15;group.add(core);
    for(let i=0;i<6;i+=1){const p=new THREE.Mesh(new THREE.BoxGeometry(.045,.18,.045),new THREE.MeshBasicMaterial({color:CYAN}));p.position.set(-.42+i*.17,.67,0);group.add(p);}
  }
  return group;
}

export default function HeroThreeScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current; if (!host) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(29, 1, .1, 100); camera.position.set(0, 0, 12.3);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8)); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.22; renderer.setSize(host.clientWidth || 1, host.clientHeight || 1, false); host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xadc6e8, 0x01040a, 1.55));
    const key = new THREE.DirectionalLight(0xffffff, 2.8); key.position.set(4, 5, 8); scene.add(key);
    const blue = new THREE.PointLight(BLUE, 17, 13, 2); blue.position.set(-4, 2.4, 4); scene.add(blue);
    const cyan = new THREE.PointLight(CYAN, 9, 10, 2); cyan.position.set(2, .5, 2.7); scene.add(cyan);
    const violet = new THREE.PointLight(VIOLET, 13, 11, 2); violet.position.set(4, -2, 2.4); scene.add(violet);

    const root = new THREE.Group(); scene.add(root);
    const left = createProfileCard(PEOPLE[0]); const right = createProfileCard(PEOPLE[1]);
    left.position.set(-3.55,.25,.15); right.position.set(3.55,.25,.05); left.scale.setScalar(.93); right.scale.setScalar(.93); left.rotation.y=THREE.MathUtils.degToRad(9);right.rotation.y=THREE.MathUtils.degToRad(-9);root.add(left,right);

    const center = new THREE.Group(); center.position.set(0,-1.08,.7); root.add(center);
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.78,1.78,1.78),new THREE.MeshPhysicalMaterial({color:0x091522,transparent:true,opacity:.46,transmission:.68,thickness:.35,roughness:.07,clearcoat:1})); cube.rotation.set(-.32,.5,-.08);center.add(cube);
    const cubeEdges = new THREE.LineSegments(new THREE.EdgesGeometry(cube.geometry),new THREE.LineBasicMaterial({color:BLUE,transparent:true,opacity:.9}));cubeEdges.rotation.copy(cube.rotation);center.add(cubeEdges);
    const lc=document.createElement('canvas');lc.width=500;lc.height=500;const lcx=lc.getContext('2d');if(lcx){lcx.clearRect(0,0,500,500);lcx.fillStyle='#63a6ff';lcx.font='900 150px Arial';lcx.textAlign='center';lcx.textBaseline='middle';lcx.fillText('M/W',250,250);}const logo=new THREE.Mesh(new THREE.PlaneGeometry(1.14,1.14),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(lc),transparent:true}));logo.position.z=.92;logo.rotation.copy(cube.rotation);center.add(logo);

    const ring=new THREE.Mesh(new THREE.TorusGeometry(2.5,.016,8,180),new THREE.MeshBasicMaterial({color:BLUE,transparent:true,opacity:.48}));ring.rotation.x=Math.PI/2.6;ring.rotation.z=-.16;root.add(ring);
    const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.92,.012,8,180),new THREE.MeshBasicMaterial({color:VIOLET,transparent:true,opacity:.24}));ring2.rotation.y=Math.PI/2.15;ring2.rotation.z=.38;root.add(ring2);

    const services=new THREE.Group();services.position.set(0,-3.23,1.05);root.add(services);
    (['web','android','windows','ai'] as const).forEach((kind,i)=>{const o=createServiceObject(kind);o.position.set(-4.35+i*2.9,0,-(i%2)*.55);o.rotation.set(.1+i*.03,.25+i*.08,-.04+i*.02);o.scale.setScalar(.78);services.add(o);if(!reduced)animate(o.rotation,{x:[o.rotation.x-.08,o.rotation.x+.08],y:[o.rotation.y-.12,o.rotation.y+.12],duration:5200+i*500,alternate:true,loop:true,ease:'inOutSine'});});

    const fragments=new THREE.Group();root.add(fragments);for(let i=0;i<15;i+=1){const s=.12+(i%3)*.055;const m=new THREE.Mesh(new THREE.BoxGeometry(s,s,s),new THREE.MeshPhysicalMaterial({color:i%2?CYAN:VIOLET,transparent:true,opacity:.24,transmission:.5,roughness:.06}));m.position.set(-5.7+Math.random()*11,-2.3+Math.random()*5,-1.2-Math.random()*3);m.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2);fragments.add(m);}
    const pts=new Float32Array(360);for(let i=0;i<120;i+=1){pts[i*3]=(Math.random()-.5)*13;pts[i*3+1]=(Math.random()-.5)*7;pts[i*3+2]=-2-Math.random()*4;}const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pts,3));const stars=new THREE.Points(pg,new THREE.PointsMaterial({color:CYAN,size:.02,transparent:true,opacity:.68}));scene.add(stars);

    if(!reduced){
      const a={y:0,z:0,rx:left.rotation.x,ry:left.rotation.y,rz:left.rotation.z};const b={y:0,z:0,rx:right.rotation.x,ry:right.rotation.y,rz:right.rotation.z};
      animate(a,{y:[-.08,.1],z:[-.05,.05],rx:[-.05,-.015],ry:[.11,.18],rz:[-.025,.008],duration:7600,alternate:true,loop:true,ease:'inOutSine',onUpdate:()=>{left.position.y=.25+a.y;left.position.z=.15+a.z;left.rotation.set(a.rx,a.ry,a.rz);}});
      animate(b,{y:[.08,-.07],z:[.04,-.045],rx:[-.015,-.05],ry:[-.18,-.11],rz:[.01,-.025],duration:8500,alternate:true,loop:true,ease:'inOutSine',onUpdate:()=>{right.position.y=.25+b.y;right.position.z=.05+b.z;right.rotation.set(b.rx,b.ry,b.rz);}});
      animate(center.position,{y:[-1.13,-.96],z:[.62,.78],duration:6200,alternate:true,loop:true,ease:'inOutSine'});
      animate(center.rotation,{y:[-.1,.12],z:[-.025,.025],duration:7200,alternate:true,loop:true,ease:'inOutSine'});
      animate(cube.rotation,{x:[-.35,-.18],y:[.44,.63],z:[-.1,.08],duration:7000,alternate:true,loop:true,ease:'inOutSine'});
      animate(ring.rotation,{z:[-.3,.3],duration:12000,alternate:true,loop:true,ease:'inOutSine'});
      animate(ring2.rotation,{z:[.6,-.35],duration:15000,alternate:true,loop:true,ease:'inOutSine'});
      animate(services.rotation,{y:[-.055,.055],z:[-.01,.018],duration:9000,alternate:true,loop:true,ease:'inOutSine'});
      animate(fragments.rotation,{y:[-.08,.1],x:[-.04,.05],duration:11000,alternate:true,loop:true,ease:'inOutSine'});
      animate(stars.material,{opacity:[.24,.7],duration:2600,alternate:true,loop:true,ease:'inOutSine'});
    }

    const pointer={x:0,y:0};const move=(e:PointerEvent)=>{const r=host.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5;};host.addEventListener('pointermove',move);
    let raf=0;const tick=()=>{root.rotation.y+=(pointer.x*.115-root.rotation.y)*.035;root.rotation.x+=(-pointer.y*.07-root.rotation.x)*.035;camera.position.x+=(pointer.x*.25-camera.position.x)*.02;camera.position.y+=(-pointer.y*.15-camera.position.y)*.02;camera.lookAt(0,-.55,0);renderer.render(scene,camera);raf=requestAnimationFrame(tick);};tick();
    const resize=()=>{const w=host.clientWidth||1,h=host.clientHeight||1;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);};const ro=new ResizeObserver(resize);ro.observe(host);resize();
    return()=>{cancelAnimationFrame(raf);ro.disconnect();host.removeEventListener('pointermove',move);renderer.dispose();renderer.domElement.remove();scene.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.LineSegments||o instanceof THREE.Points){o.geometry.dispose();const m=o.material;if(Array.isArray(m))m.forEach(x=>x.dispose());else m.dispose();}});};
  },[]);
  return <div ref={hostRef} className="hero-three-scene" aria-label="Interactive 3D MakeWebb hero scene with floating founder glass cards and service objects" />;
}
