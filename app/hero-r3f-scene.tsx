'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motionState } from './motion-state';
import * as THREE from 'three';

const BLUE = 0x5b9cff;
const CYAN = 0x62d7ff;
const VIOLET = 0x9b7cff;

type Quality = 'high' | 'medium' | 'low';

function useQuality(): Quality {
  return useMemo(() => {
    if (typeof window === 'undefined') return 'medium';
    const coarse = matchMedia('(pointer: coarse)').matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency ?? 4;
    if (coarse && (memory <= 2 || cores <= 4)) return 'low';
    if (coarse || memory <= 4 || cores <= 6) return 'medium';
    return 'high';
  }, []);
}

function MLogo() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) { ctx.clearRect(0,0,512,512); ctx.fillStyle='#d9ecff'; ctx.shadowColor='#62d7ff'; ctx.shadowBlur=42; ctx.font='900 128px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('M/W',256,256); }
    const t = new THREE.CanvasTexture(canvas); t.colorSpace=THREE.SRGBColorSpace; setTexture(t); return ()=>t.dispose();
  }, []);
  if (!texture) return null;
  return <mesh position={[0,0,1.06]}><planeGeometry args={[1.25,1.25]}/><meshBasicMaterial map={texture} transparent/></mesh>;
}

function BoxEdges({size,color,opacity=.9}:{size:number;color:number;opacity?:number}) { const geometry=useMemo(()=>new THREE.BoxGeometry(size,size,size),[size]); return <lineSegments><edgesGeometry args={[geometry]}/><lineBasicMaterial color={color} transparent opacity={opacity}/></lineSegments>; }
function RectEdges({args,color,opacity=.9}:{args:[number,number,number];color:number;opacity?:number}) { const geometry=useMemo(()=>new THREE.BoxGeometry(...args),[args[0],args[1],args[2]]); return <lineSegments><edgesGeometry args={[geometry]}/><lineBasicMaterial color={color} transparent opacity={opacity}/></lineSegments>; }

function GlassCube({mobile=false}:{mobile?:boolean}) {
  const ref=useRef<THREE.Mesh>(null);
  useFrame((state,delta)=>{ if(!ref.current)return; ref.current.rotation.x+=delta*(mobile?.045:.075); ref.current.rotation.y+=delta*(mobile?.095:.12); if(mobile)ref.current.position.y=Math.sin(state.clock.elapsedTime*.7)*.075; });
  return <group scale={mobile?1.28:1}>
    <mesh ref={ref}><boxGeometry args={[2.05,2.05,2.05]}/><meshPhysicalMaterial color={0x0a1b2d} transparent opacity={mobile?.62:.68} roughness={.045} metalness={.1} clearcoat={1} clearcoatRoughness={.015} transmission={.42} thickness={.32}/></mesh>
    <BoxEdges size={2.05} color={BLUE} opacity={mobile?1:.95}/><mesh scale={.78}><boxGeometry args={[2.05,2.05,2.05]}/><meshBasicMaterial color={VIOLET} transparent opacity={mobile?.075:.05} wireframe/></mesh><MLogo/>
    {mobile&&<><mesh scale={1.07}><boxGeometry args={[2.05,2.05,2.05]}/><meshBasicMaterial color={CYAN} transparent opacity={.045} wireframe/></mesh><pointLight position={[-1.4,1.4,2.8]} intensity={1.7} distance={5} color={CYAN}/></>}
  </group>;
}

function Rings({subtle=false}:{subtle?:boolean}) {
  const a=useRef<THREE.Mesh>(null),b=useRef<THREE.Mesh>(null),c=useRef<THREE.Mesh>(null);
  useFrame((_,delta)=>{if(a.current)a.current.rotation.z+=delta*.045;if(b.current)b.current.rotation.z-=delta*.032;if(c.current)c.current.rotation.x+=delta*.022;});
  return <><mesh ref={a} rotation={[1.12,0,-.22]}><torusGeometry args={[subtle?3.25:2.8,subtle?.018:.022,8,128]}/><meshBasicMaterial color={BLUE} transparent opacity={subtle?.42:.65}/></mesh><mesh ref={b} rotation={[.3,1.08,.35]}><torusGeometry args={[subtle?2.55:2.2,subtle?.014:.016,8,128]}/><meshBasicMaterial color={VIOLET} transparent opacity={subtle?.28:.45}/></mesh>{subtle&&<mesh ref={c} rotation={[1.35,-.35,.5]}><torusGeometry args={[1.95,.009,8,96]}/><meshBasicMaterial color={CYAN} transparent opacity={.3}/></mesh>}</>;
}

function FloatingFragments({mobile=false}:{mobile?:boolean}) {
  const count=mobile?7:12; const refs=useRef<(THREE.Group|null)[]>([]);
  const items=useMemo(()=>Array.from({length:count},(_,i)=>({x:((i*1.83)%7)-3.5,y:((i*1.37)%5)-2.5,z:-1.5-(i%4)*.8,s:.08+(i%3)*.035,v:.15+(i%4)*.035,violet:i%4===0})),[count]);
  useFrame(state=>{items.forEach((item,i)=>{const ref=refs.current[i];if(!ref)return;ref.position.y=item.y+Math.sin(state.clock.elapsedTime*item.v+i)*.12;ref.rotation.x=state.clock.elapsedTime*item.v*.7+i;ref.rotation.y=state.clock.elapsedTime*item.v+i*.5;});});
  return <>{items.map((item,i)=><group key={i} ref={el=>{refs.current[i]=el;}} position={[item.x,item.y,item.z]} scale={item.s}><mesh><boxGeometry args={[1.2,1.2,.12]}/><meshPhysicalMaterial color={item.violet?VIOLET:BLUE} transparent opacity={.28} roughness={.05} clearcoat={1}/></mesh><RectEdges args={[1.2,1.2,.12]} color={item.violet?VIOLET:CYAN} opacity={.75}/></group>)}</>;
}

function ServiceObject({kind,index}:{kind:'web'|'android'|'windows'|'ai';index:number}) {
  const ref=useRef<THREE.Group>(null); useFrame(state=>{if(!ref.current)return;ref.current.rotation.y=.22+index*.12+Math.sin(state.clock.elapsedTime*.8+index)*.07;ref.current.rotation.x=.12+Math.sin(state.clock.elapsedTime*.65+index)*.035;}); const edgeColor=kind==='ai'?VIOLET:BLUE;
  return <group ref={ref} position={[-4.55+index*3.05,-3.25,-.6]} scale={1.02}>{kind==='web'&&<><mesh><boxGeometry args={[1.45,.84,.14]}/><meshPhysicalMaterial color={0x071423} transparent opacity={.62} roughness={.07} clearcoat={1} transmission={.22}/></mesh><RectEdges args={[1.45,.84,.14]} color={edgeColor} opacity={.9}/>{[0,1,2].map(i=><mesh key={i} position={[-.12,.16-i*.15,.1]}><boxGeometry args={[.78-i*.1,.045,.02]}/><meshBasicMaterial color={i===0?CYAN:0x7892b3}/></mesh>)}</>}{kind==='android'&&<><mesh><boxGeometry args={[.76,1.38,.13]}/><meshPhysicalMaterial color={0x071423} transparent opacity={.62} roughness={.07} clearcoat={1} transmission={.22}/></mesh><RectEdges args={[.76,1.38,.13]} color={edgeColor} opacity={.9}/><mesh position={[0,0,.08]}><planeGeometry args={[.6,1.12]}/><meshBasicMaterial color={0x0b2137}/></mesh></>}{kind==='windows'&&<><mesh><boxGeometry args={[1.15,1.15,.13]}/><meshPhysicalMaterial color={0x071423} transparent opacity={.62} roughness={.07} clearcoat={1} transmission={.22}/></mesh><RectEdges args={[1.15,1.15,.13]} color={edgeColor} opacity={.9}/>{[0,1,2,3].map(i=><mesh key={i} position={[(i%2-.5)*.44,(Math.floor(i/2)-.5)*.44,.08]}><planeGeometry args={[.37,.37]}/><meshBasicMaterial color={BLUE} transparent opacity={.7}/></mesh>)}</>}{kind==='ai'&&<><mesh><boxGeometry args={[1.08,1.08,.22]}/><meshPhysicalMaterial color={0x071321} transparent opacity={.78} metalness={.15} roughness={.07} clearcoat={1}/></mesh><RectEdges args={[1.08,1.08,.22]} color={VIOLET} opacity={.92}/><mesh position={[0,0,.14]}><boxGeometry args={[.46,.46,.08]}/><meshBasicMaterial color={VIOLET} transparent opacity={.8}/></mesh></>}</group>;
}

function Particles({quality,mobile=false}:{quality:Quality;mobile?:boolean}) { const count=mobile?(quality==='high'?70:quality==='medium'?42:20):(quality==='high'?220:quality==='medium'?120:55); const positions=useMemo(()=>{const a=new Float32Array(count*3);for(let i=0;i<count;i++){a[i*3]=(Math.random()-.5)*(mobile?9:15);a[i*3+1]=(Math.random()-.5)*(mobile?7:9);a[i*3+2]=-2-Math.random()*7;}return a;},[count,mobile]); const ref=useRef<THREE.Points>(null); useFrame((_,delta)=>{if(ref.current)ref.current.rotation.y+=delta*(mobile?.004:.006);}); return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color={CYAN} size={quality==='low'?.024:.03} transparent opacity={mobile?.48:.65} sizeAttenuation/></points>; }

function SceneContent({quality,mobile}:{quality:Quality;mobile:boolean}) {
  const root=useRef<THREE.Group>(null); useFrame((state)=>{if(!root.current)return;root.current.rotation.y=THREE.MathUtils.lerp(root.current.rotation.y,motionState.pointerX*(mobile?.018:.055),.045);root.current.rotation.x=THREE.MathUtils.lerp(root.current.rotation.x,-motionState.pointerY*(mobile?.012:.028),.045);root.current.position.y=THREE.MathUtils.lerp(root.current.position.y,Math.sin(state.clock.elapsedTime*.22)*(mobile?.04:.08)-motionState.scroll*(mobile?.018:.06),.025);});
  const serviceKinds=['web','android','windows','ai'] as const;
  return <><ambientLight intensity={mobile?.9:(quality==='high'?1.15:.9)} color={0xc7ddf5}/><directionalLight intensity={mobile?.55:(quality==='high'?2.2:1.55)} position={[2,5,8]} color={0xffffff}/><pointLight intensity={mobile?7:quality==='high'?15:9} distance={15} position={[-5,2,4]} color={BLUE}/><pointLight intensity={mobile?6:quality==='high'?11:7} distance={13} position={[5,-1,4]} color={VIOLET}/><pointLight intensity={mobile?2.5:0} distance={9} position={[0,-3,3]} color={CYAN}/><group ref={root}>{mobile?<><group><GlassCube mobile/><Rings subtle/></group><FloatingFragments mobile/><Particles quality={quality} mobile/></>:<><group position={[0,-1.45,1]}><GlassCube/><Rings/></group>{quality!=='low'&&serviceKinds.map((kind,index)=><ServiceObject kind={kind} index={index} key={kind}/>)}<Particles quality={quality}/></>}</group></>;
}

export default function HeroThreeScene({mode='desktop'}:{mode?:'desktop'|'mobile'}) {
  const quality=useQuality(); const mobile=mode==='mobile'; const reduced=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches; const [visible,setVisible]=useState(true); const hostRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{const host=hostRef.current;if(!host)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'180px 0px',threshold:.01});observer.observe(host);return()=>observer.disconnect();},[]);
  const frameMode=reduced?'demand':visible?'always':'never'; const camera=mobile?{position:[0,0,8.6] as [number,number,number],fov:38}:{position:[0,0,12.2] as [number,number,number],fov:34};
  return <div ref={hostRef} className={`hero-three-scene hero-three-scene-${mode}`} aria-hidden="true"><Canvas camera={{...camera,near:.1,far:100}} dpr={mobile?(quality==='high'?[1,1.35]:quality==='medium'?[.9,1.2]:[.75,1]):(quality==='high'?[1,1.6]:quality==='medium'?[1,1.3]:[.8,1])} gl={{antialias:quality!=='low',alpha:true,powerPreference:'high-performance'}} frameloop={frameMode}><SceneContent quality={quality} mobile={mobile}/></Canvas></div>;
}
