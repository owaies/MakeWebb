'use client'

import { Float, Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f*f*(3.0-2.0*f);
  float a = hash(i);
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i=0;i<5;i++){
    v += a * noise(p);
    p = p * 2.0 + 17.13;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 p = vUv - 0.5;
  p.x *= 1.45;
  float t = uTime * 0.045;
  float n = fbm(p * 2.1 + vec2(t, -t * 0.7));
  float glowA = exp(-length((p + vec2(0.24,0.10))*1.55) * 2.7);
  float glowB = exp(-length((p - vec2(0.30,0.22))*1.65) * 2.8);
  float center = exp(-length(p * vec2(1.0,1.3)) * 2.4);

  vec3 navy = vec3(0.008,0.018,0.070);
  vec3 blue = vec3(0.035,0.105,0.34);
  vec3 violet = vec3(0.18,0.055,0.46);
  vec3 electric = vec3(0.12,0.31,0.92);

  vec3 col = mix(navy, blue, smoothstep(0.12,0.90,n));
  col += violet * glowA * 0.72;
  col += electric * glowB * 0.52;
  col += vec3(0.02,0.05,0.15) * center;
  col += (n - 0.5) * 0.035;

  float vignette = smoothstep(0.95,0.20,length(p));
  col *= 0.78 + vignette * 0.32;
  gl_FragColor = vec4(col, 1.0);
}`

function ShaderBackdrop(){
  const material = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <mesh position={[0,0,-5]} scale={[11,8,1]}>
      <planeGeometry args={[2,2]} />
      <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} depthWrite={false} depthTest={false} />
    </mesh>
  )
}

function GlassCube({position,scale=1,speed=.25}:{position:[number,number,number];scale?:number;speed?:number}) {
  const ref=useRef<THREE.Mesh>(null)
  useFrame((_,delta)=>{if(ref.current){ref.current.rotation.x+=delta*speed;ref.current.rotation.y+=delta*speed*.9}})
  return <Float speed={.7} rotationIntensity={.18} floatIntensity={.45}>
    <mesh ref={ref} position={position} scale={scale}><boxGeometry args={[1,1,1]}/><meshPhysicalMaterial color="#14266b" transparent opacity={.22} roughness={.08} metalness={.18} transmission={.35} thickness={.25} clearcoat={1} clearcoatRoughness={.08}/></mesh>
    <mesh position={position} scale={scale*1.02}><boxGeometry args={[1.01,1.01,1.01]}/><meshBasicMaterial color="#6e8dff" wireframe transparent opacity={.52}/></mesh>
  </Float>
}

function OrbitingCore(){
  const group=useRef<THREE.Group>(null)
  useFrame(state=>{if(group.current){group.current.rotation.y=state.clock.elapsedTime*.18;group.current.rotation.x=Math.sin(state.clock.elapsedTime*.22)*.12}})
  return <group ref={group} position={[0,-.15,-.6]}>
    <mesh><boxGeometry args={[1.55,1.55,1.55]}/><meshPhysicalMaterial color="#182a80" transparent opacity={.3} transmission={.7} thickness={.45} roughness={.04} metalness={.15} clearcoat={1}/></mesh>
    <mesh scale={1.035}><boxGeometry args={[1.55,1.55,1.55]}/><meshBasicMaterial color="#7694ff" wireframe transparent opacity={.9}/></mesh>
    <mesh scale={.46}><octahedronGeometry args={[1,0]}/><meshStandardMaterial color="#6c5cff" emissive="#315dff" emissiveIntensity={4.2} metalness={.45} roughness={.15}/></mesh>
    {[0,1].map(i=><mesh key={i} rotation={[Math.PI/2+i*.7,.3,i*.8]} scale={1.7-i*.18}><torusGeometry args={[.85,.009,10,160]}/><meshBasicMaterial color={i?'#8a65ff':'#3c8cff'} transparent opacity={.82}/></mesh>)}
  </group>
}

function SceneContent(){
  const stars=useMemo(()=>({count:180,scale:9,size:1.1,speed:.12}),[])
  return <>
    <ShaderBackdrop/>
    <ambientLight intensity={.45}/><pointLight position={[0,2,1]} color="#4e7dff" intensity={12} distance={8}/><pointLight position={[-4,1,-2]} color="#8b5cf6" intensity={8} distance={7}/>
    <Sparkles {...stars} color="#83a8ff"/>
    <GlassCube position={[-3.8,1.8,-1.8]} scale={.72} speed={.18}/><GlassCube position={[3.6,1.4,-1.6]} scale={.68} speed={-.15}/>
    <GlassCube position={[-4.4,-1.8,-2.4]} scale={.52} speed={.25}/><GlassCube position={[4.5,-1.5,-2.2]} scale={.55} speed={-.2}/><OrbitingCore/>
  </>
}

export default function StudioScene(){
  return <div className="scene" aria-hidden="true"><Canvas camera={{position:[0,0,5],fov:48}} dpr={[1,1.5]} gl={{antialias:true,powerPreference:'high-performance'}} style={{pointerEvents:'none'}}><SceneContent/></Canvas></div>
}
