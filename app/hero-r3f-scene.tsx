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
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 512, 512);
      ctx.fillStyle = '#8fc6ff';
      ctx.shadowColor = '#5b9cff';
      ctx.shadowBlur = 36;
      ctx.font = '900 128px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('M/W', 256, 256);
    }
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    setTexture(t);
    return () => t.dispose();
  }, []);
  if (!texture) return null;
  return <mesh position={[0, 0, 1.06]}><planeGeometry args={[1.25, 1.25]} /><meshBasicMaterial map={texture} transparent /></mesh>;
}

function BoxEdges({ size, color, opacity = 0.9 }: { size: number; color: number; opacity?: number }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);
  return <lineSegments><edgesGeometry args={[geometry]} /><lineBasicMaterial color={color} transparent opacity={opacity} /></lineSegments>;
}

function RectEdges({ args, color, opacity = 0.9 }: { args: [number, number, number]; color: number; opacity?: number }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(...args), [args[0], args[1], args[2]]);
  return <lineSegments><edgesGeometry args={[geometry]} /><lineBasicMaterial color={color} transparent opacity={opacity} /></lineSegments>;
}

function GlassCube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.075;
    ref.current.rotation.y += delta * 0.12;
  });
  return <group>
    <mesh ref={ref}><boxGeometry args={[2.05, 2.05, 2.05]} /><meshPhysicalMaterial color={0x0a1b2d} transparent opacity={0.68} roughness={0.055} metalness={0.08} clearcoat={1} clearcoatRoughness={0.02} transmission={0.35} thickness={0.2} /></mesh>
    <BoxEdges size={2.05} color={BLUE} opacity={0.95} />
    <mesh scale={0.78}><boxGeometry args={[2.05, 2.05, 2.05]} /><meshBasicMaterial color={VIOLET} transparent opacity={0.05} wireframe /></mesh>
    <MLogo />
  </group>;
}

function Rings({ subtle = false }: { subtle?: boolean }) {
  const a = useRef<THREE.Mesh>(null); const b = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (a.current) a.current.rotation.z += delta * 0.045; if (b.current) b.current.rotation.z -= delta * 0.032; });
  return <>
    <mesh ref={a} rotation={[1.12, 0, -0.22]}><torusGeometry args={[subtle ? 3.6 : 2.8, subtle ? 0.012 : 0.022, 8, 128]} /><meshBasicMaterial color={BLUE} transparent opacity={subtle ? 0.18 : 0.65} /></mesh>
    <mesh ref={b} rotation={[0.3, 1.08, 0.35]}><torusGeometry args={[subtle ? 2.8 : 2.2, subtle ? 0.009 : 0.016, 8, 128]} /><meshBasicMaterial color={VIOLET} transparent opacity={subtle ? 0.12 : 0.45} /></mesh>
  </>;
}

function ServiceObject({ kind, index }: { kind: 'web' | 'android' | 'windows' | 'ai'; index: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = 0.22 + index * 0.12 + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.07;
    ref.current.rotation.x = 0.12 + Math.sin(state.clock.elapsedTime * 0.65 + index) * 0.035;
  });
  const edgeColor = kind === 'ai' ? VIOLET : BLUE;
  return <group ref={ref} position={[-4.55 + index * 3.05, -3.25, -0.6]} scale={1.02}>
    {kind === 'web' && <><mesh><boxGeometry args={[1.45, .84, .14]} /><meshPhysicalMaterial color={0x071423} transparent opacity={.62} roughness={.07} clearcoat={1} transmission={.22} /></mesh><RectEdges args={[1.45,.84,.14]} color={edgeColor} opacity={.9} />{[0,1,2].map(i=><mesh key={i} position={[-.12,.16-i*.15,.1]}><boxGeometry args={[.78-i*.1,.045,.02]}/><meshBasicMaterial color={i===0?CYAN:0x7892b3}/></mesh>)}</>}
    {kind === 'android' && <><mesh><boxGeometry args={[.76,1.38,.13]} /><meshPhysicalMaterial color={0x071423} transparent opacity={.62} roughness={.07} clearcoat={1} transmission={.22}/></mesh><RectEdges args={[.76,1.38,.13]} color={edgeColor} opacity={.9} /><mesh position={[0,0,.08]}><planeGeometry args={[.6,1.12]}/><meshBasicMaterial color={0x0b2137}/></mesh></>}
    {kind === 'windows' && <><mesh><boxGeometry args={[1.15,1.15,.13]} /><meshPhysicalMaterial color={0x071423} transparent opacity={.62} roughness={.07} clearcoat={1} transmission={.22}/></mesh><RectEdges args={[1.15,1.15,.13]} color={edgeColor} opacity={.9} />{[0,1,2,3].map(i=><mesh key={i} position={[(i%2-.5)*.44,(Math.floor(i/2)-.5)*.44,.08]}><planeGeometry args={[.37,.37]}/><meshBasicMaterial color={BLUE} transparent opacity={.7}/></mesh>)}</>}
    {kind === 'ai' && <><mesh><boxGeometry args={[1.08,1.08,.22]}/><meshPhysicalMaterial color={0x071321} transparent opacity={.78} metalness={.15} roughness={.07} clearcoat={1}/></mesh><RectEdges args={[1.08,1.08,.22]} color={VIOLET} opacity={.92} /><mesh position={[0,0,.14]}><boxGeometry args={[.46,.46,.08]}/><meshBasicMaterial color={VIOLET} transparent opacity={.8}/></mesh></>}
  </group>;
}

function Particles({ quality, mobile = false }: { quality: Quality; mobile?: boolean }) {
  const count = mobile ? (quality === 'high' ? 90 : quality === 'medium' ? 55 : 25) : (quality === 'high' ? 220 : quality === 'medium' ? 120 : 55);
  const positions = useMemo(() => { const a = new Float32Array(count * 3); for (let i=0;i<count;i++){a[i*3]=(Math.random()-.5)*(mobile ? 12 : 15);a[i*3+1]=(Math.random()-.5)*(mobile ? 10 : 9);a[i*3+2]=-2-Math.random()*7;} return a; }, [count, mobile]);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * (mobile ? 0.003 : 0.006); });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color={CYAN} size={quality==='low'?.018:.024} transparent opacity={mobile ? .3 : .65} sizeAttenuation /></points>;
}

function SceneContent({ quality, mobile }: { quality: Quality; mobile: boolean }) {
  const root = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!root.current) return;
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, motionState.pointerX * (mobile ? 0.018 : 0.055), 0.045);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -motionState.pointerY * (mobile ? 0.012 : 0.028), 0.045);
    root.current.position.y = THREE.MathUtils.lerp(root.current.position.y, Math.sin(state.clock.elapsedTime * .22) * (mobile ? .04 : .08) - motionState.scroll * (mobile ? .018 : .06), .025);
  });
  const serviceKinds = ['web','android','windows','ai'] as const;
  return <>
    <ambientLight intensity={mobile ? .7 : quality==='high'?1.15:0.9} color={0xc7ddf5}/>
    <directionalLight intensity={mobile ? .25 : quality==='high'?2.2:1.55} position={[2,5,8]} color={0xffffff}/>
    <pointLight intensity={mobile ? 5 : quality==='high'?15:9} distance={15} position={[-5,2,4]} color={BLUE}/>
    <pointLight intensity={mobile ? 4 : quality==='high'?11:7} distance={13} position={[5,-1,4]} color={VIOLET}/>
    <group ref={root}>
      {mobile ? <><Rings subtle /><Particles quality={quality} mobile /></> : <><group position={[0,-1.45,1]}><GlassCube/><Rings/></group>{quality !== 'low' && serviceKinds.map((kind,index)=><ServiceObject kind={kind} index={index} key={kind}/>)}<Particles quality={quality}/></>}
    </group>
  </>;
}

export default function HeroThreeScene({ mode = 'desktop' }: { mode?: 'desktop' | 'mobile' }) {
  const quality = useQuality();
  const mobile = mode === 'mobile';
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [visible, setVisible] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '180px 0px', threshold: 0.01 });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);
  const frameMode = reduced ? 'demand' : visible ? 'always' : 'never';
  const camera = mobile ? { position: [0,0,14] as [number,number,number], fov: 38 } : { position: [0,0,12.2] as [number,number,number], fov: 34 };
  return <div ref={hostRef} className={`hero-three-scene hero-three-scene-${mode}`} aria-hidden="true"><Canvas camera={{ ...camera, near: .1, far: 100 }} dpr={mobile ? (quality==='high'?[1,1.25]:quality==='medium'?[.8,1.1]:[.7,.9]) : (quality==='high'?[1,1.6]:quality==='medium'?[1,1.3]:[.8,1])} gl={{ antialias: quality !== 'low', alpha: true, powerPreference: 'high-performance' }} frameloop={frameMode}><SceneContent quality={quality} mobile={mobile}/></Canvas></div>;
}
