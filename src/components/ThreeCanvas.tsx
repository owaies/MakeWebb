import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 3, 15);
    blueLight.position.set(-3, -1, 2);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x818cf8, 2.5, 15);
    violetLight.position.set(3, 2, -2);
    scene.add(violetLight);

    // Glass / Liquid Sculptural Geometry: An elegant, interwoven TorusKnot + Inner Monogram Ring
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Main Liquid Glass Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.35, 0.42, 160, 32, 2, 3);
    const posAttribute = knotGeometry.attributes.position;
    const originalPositions = posAttribute.array.slice();

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.85,
      ior: 1.45,
      thickness: 1.5,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xdbeafe),
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.95,
      wireframe: false,
    });

    const glassSculpture = new THREE.Mesh(knotGeometry, glassMaterial);
    sculptureGroup.add(glassSculpture);

    // Chrome Outer Orbital Halo
    const haloGeo = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, chromeMat);
    haloMesh.rotation.x = Math.PI / 3;
    sculptureGroup.add(haloMesh);

    // Second inclined counter-halo
    const haloGeo2 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const haloMesh2 = new THREE.Mesh(haloGeo2, chromeMat);
    haloMesh2.rotation.y = Math.PI / 4;
    haloMesh2.rotation.x = -Math.PI / 6;
    sculptureGroup.add(haloMesh2);

    // Digital Coordinate Grid (Scene 02 & overall depth)
    const gridHelper = new THREE.GridHelper(24, 32, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -2.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    scene.add(gridHelper);

    // Floating Volumetric Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      particleVelocities.push((Math.random() - 0.5) * 0.004);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const scroll = scrollRef.current; // 0 to 1

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Sculpture Rotation & Liquid Deformation
      sculptureGroup.rotation.y = elapsedTime * 0.25 + scroll * Math.PI * 3 + currentMouseX * 0.4;
      sculptureGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2 + currentMouseY * 0.3;
      sculptureGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.15;

      // Halo counter-rotations
      haloMesh.rotation.z = elapsedTime * 0.4;
      haloMesh2.rotation.x = elapsedTime * 0.35;

      // Liquid vertex perturbation on the Torus Knot
      const pos = knotGeometry.attributes.position;
      const count = pos.count;
      for (let i = 0; i < count; i += 3) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];
        const wave = Math.sin(elapsedTime * 1.5 + ox * 2 + oy * 2) * 0.04;
        pos.setXYZ(i, ox + wave, oy + wave, oz + wave);
      }
      pos.needsUpdate = true;

      // Dynamic scene-based positioning & scale based on scrollProgress
      // Scene 01 (0.0 - 0.15): Centered, bold hero
      // Scene 02 (0.15 - 0.30): Shifts slightly off-axis, stretches
      // Scene 03 (0.30 - 0.55): Moves to the back-right, acts as deep ambient anchor for projects
      // Scene 04 (0.55 - 0.70): Scales up into a vast architectural backdrop
      // Scene 05 (0.70 - 0.85): Centers with subtle neural glow
      // Scene 06 (0.85 - 0.95): Orbits with capability rings
      // Scene 07 (0.95 - 1.0): Tight focal point behind contact CTA
      if (scroll < 0.2) {
        sculptureGroup.position.x = currentMouseX * 0.5;
        sculptureGroup.position.y = currentMouseY * 0.4;
        sculptureGroup.position.z = 0;
        sculptureGroup.scale.setScalar(1.0 + Math.sin(elapsedTime * 0.5) * 0.03);
      } else if (scroll < 0.55) {
        const t = (scroll - 0.2) / 0.35;
        sculptureGroup.position.x = THREE.MathUtils.lerp(0, 2.2, t) + currentMouseX * 0.3;
        sculptureGroup.position.y = THREE.MathUtils.lerp(0, -0.4, t) + currentMouseY * 0.2;
        sculptureGroup.position.z = THREE.MathUtils.lerp(0, -2.5, t);
        sculptureGroup.scale.setScalar(THREE.MathUtils.lerp(1.0, 0.75, t));
      } else if (scroll < 0.8) {
        const t = (scroll - 0.55) / 0.25;
        sculptureGroup.position.x = THREE.MathUtils.lerp(2.2, -2.2, t) + currentMouseX * 0.3;
        sculptureGroup.position.y = THREE.MathUtils.lerp(-0.4, 0.2, t) + currentMouseY * 0.2;
        sculptureGroup.position.z = THREE.MathUtils.lerp(-2.5, -1.8, t);
        sculptureGroup.scale.setScalar(0.85);
      } else {
        const t = (scroll - 0.8) / 0.2;
        sculptureGroup.position.x = THREE.MathUtils.lerp(-2.2, 0, t) + currentMouseX * 0.4;
        sculptureGroup.position.y = THREE.MathUtils.lerp(0.2, -0.2, t) + currentMouseY * 0.3;
        sculptureGroup.position.z = THREE.MathUtils.lerp(-1.8, 0.4, t);
        sculptureGroup.scale.setScalar(THREE.MathUtils.lerp(0.85, 1.15, t));
      }

      // Camera gentle dynamic breathing
      camera.position.x = currentMouseX * 0.3;
      camera.position.y = currentMouseY * 0.2;
      camera.lookAt(0, 0, 0);

      // Particle subtle drifting
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.002;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Grid rotation & movement with scroll
      gridHelper.position.z = (elapsedTime * 0.2) % 1;
      (gridHelper.material as THREE.Material).opacity = 0.15 + scroll * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeometry.dispose();
      glassMaterial.dispose();
      haloGeo.dispose();
      haloGeo2.dispose();
      chromeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
