'use client'

import dynamic from 'next/dynamic'
import { Float, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const ShaderGradientCanvas = dynamic(() => import('@shadergradient/react').then(m => m.ShaderGradientCanvas), { ssr:false })
const ShaderGradient = dynamic(() => import('@shadergradient/react').then(m => m.ShaderGradient), { ssr:false })

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
    <ShaderGradient type="plane" animate="on" uSpeed={.18} uStrength={3.2} uDensity={1.25} uFrequency={4} color1="#06143d" color2="#12135a" color3="#311a78" cDistance={7} cPolarAngle={95} lightType="3d" brightness={1.1} grain="on"/>
    <ambientLight intensity={.45}/><pointLight position={[0,2,1]} color="#4e7dff" intensity={12} distance={8}/><pointLight position={[-4,1,-2]} color="#8b5cf6" intensity={8} distance={7}/>
    <Sparkles {...stars} color="#83a8ff"/>
    <GlassCube position={[-3.8,1.8,-1.8]} scale={.72} speed={.18}/><GlassCube position={[3.6,1.4,-1.6]} scale={.68} speed={-.15}/>
    <GlassCube position={[-4.4,-1.8,-2.4]} scale={.52} speed={.25}/><GlassCube position={[4.5,-1.5,-2.2]} scale={.55} speed={-.2}/><OrbitingCore/>
  </>
}

export default function StudioScene(){
  return <div className="scene" aria-hidden="true"><ShaderGradientCanvas pixelDensity={1} fov={48} pointerEvents="none" lazyLoad threshold={.01} powerPreference="high-performance"><SceneContent/></ShaderGradientCanvas></div>
}
