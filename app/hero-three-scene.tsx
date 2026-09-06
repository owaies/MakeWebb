'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate } from 'animejs';

const PORTRAIT = '/team/file_000000002d308211b0a2203107625baf.png';

function roundedRect(width: number, height: number, radius: number) {
  const x = -width / 2, y = -height / 2, s = new THREE.Shape();
  s.moveTo(x + radius, y);
  s.lineTo(x + width - radius, y); s.quadraticCurveTo(x + width, y, x + width, y + radius);
  s.lineTo(x + width, y + height - radius); s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  s.lineTo(x + radius, y + height); s.quadraticCurveTo(x, y + height, x, y + height - radius);
  s.lineTo(x, y + radius); s.quadraticCurveTo(x, y, x + radius, y);
  return s;
}

export default function HeroThreeScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 8);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(host.clientWidth || 1, host.clientHeight || 1, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0x9aa2bf, 0x080808, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(4, 5, 7); key.castShadow = true; scene.add(key);
    const lime = new THREE.PointLight(0xd7ff54, 10, 10); lime.position.set(-2.4, 1.8, 2.5); scene.add(lime);
    const violet = new THREE.PointLight(0x7e79ff, 7, 9); violet.position.set(2.8, -1.2, 1.8); scene.add(violet);

    const root = new THREE.Group(); scene.add(root);
    const card = new THREE.Group(); root.add(card);
    card.rotation.set(THREE.MathUtils.degToRad(-10), THREE.MathUtils.degToRad(14), THREE.MathUtils.degToRad(-2));

    const geom = new THREE.ExtrudeGeometry(roundedRect(3.1, 4.35, 0.22), { depth: 0.18, bevelEnabled: true, bevelSegments: 5, bevelSize: 0.07, bevelThickness: 0.06, curveSegments: 8 });
    geom.center();
    const glass = new THREE.Mesh(geom, new THREE.MeshPhysicalMaterial({ color: 0x0a0c10, transparent: true, opacity: 0.42, roughness: 0.1, metalness: 0.08, transmission: 0.75, thickness: 0.5, ior: 1.46, clearcoat: 1, clearcoatRoughness: 0.06, side: THREE.DoubleSide }));
    glass.castShadow = true; glass.receiveShadow = true; card.add(glass);
    card.add(new THREE.LineSegments(new THREE.EdgesGeometry(geom, 20), new THREE.LineBasicMaterial({ color: 0xd7ff54, transparent: true, opacity: 0.55 })));

    const texture = new THREE.TextureLoader().load(PORTRAIT); texture.colorSpace = THREE.SRGBColorSpace;
    const portrait = new THREE.Mesh(new THREE.PlaneGeometry(2.78, 3.02), new THREE.MeshStandardMaterial({ map: texture, roughness: 0.34 }));
    portrait.position.set(0, 0.42, 0.145); portrait.castShadow = true; card.add(portrait);

    const panel = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.76, 0.04), new THREE.MeshPhysicalMaterial({ color: 0x090a0d, transparent: true, opacity: 0.9, roughness: 0.22 }));
    panel.position.set(0, -1.55, 0.17); card.add(panel);
    const tag = document.createElement('canvas'); tag.width = 900; tag.height = 260;
    const ctx = tag.getContext('2d');
    if (ctx) { ctx.fillStyle = '#d7ff54'; ctx.font = '700 56px Arial'; ctx.fillText('MAKEWEBB', 36, 72); ctx.fillStyle = '#e7e7e3'; ctx.font = '500 31px Arial'; ctx.fillText('AI / ML ENGINEER', 36, 125); ctx.fillStyle = '#7e8088'; ctx.font = '400 22px Arial'; ctx.fillText('VISION · LLMs · PYTHON · DATA', 36, 177); }
    const info = new THREE.Mesh(new THREE.PlaneGeometry(2.48, 0.72), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(tag), transparent: true }));
    info.position.set(-0.03, -1.55, 0.195); card.add(info);

    const halo = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.012, 8, 160), new THREE.MeshBasicMaterial({ color: 0xd7ff54, transparent: true, opacity: 0.28 }));
    halo.rotation.x = Math.PI / 2.45; root.add(halo);
    const halo2 = halo.clone(); halo2.scale.setScalar(0.76); halo2.rotation.y = Math.PI / 2.25; halo2.material = new THREE.MeshBasicMaterial({ color: 0x8d84ff, transparent: true, opacity: 0.16 }); root.add(halo2);

    const floaters = new THREE.Group(); root.add(floaters);
    for (let i = 0; i < 7; i++) { const size = 0.18 + (i % 3) * 0.08; const m = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshPhysicalMaterial({ color: 0xd7ff54, transparent: true, opacity: 0.22, transmission: 0.5, roughness: 0.08 })); m.position.set(-2.2 + i * 0.73, (i % 2 ? 1.65 : -1.7) + Math.sin(i) * 0.22, -1 + (i % 3) * -0.7); m.rotation.set(i * .45, i * .64, i * .2); floaters.add(m); }

    const points = new Float32Array(180); for (let i = 0; i < 60; i++) { points[i*3] = (Math.random()-.5)*8; points[i*3+1] = (Math.random()-.5)*5.5; points[i*3+2] = (Math.random()-.5)*4-1; }
    const particleGeo = new THREE.BufferGeometry(); particleGeo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0xd7ff54, size: 0.026, transparent: true, opacity: 0.65 })); scene.add(particles);

    const motion = { y: 0, z: 0, rx: card.rotation.x, ry: card.rotation.y, rz: card.rotation.z };
    if (!reduced) {
      animate(motion, { y: [-0.08, 0.1], z: [-0.04, 0.08], rx: [THREE.MathUtils.degToRad(-11), THREE.MathUtils.degToRad(-7)], ry: [THREE.MathUtils.degToRad(12), THREE.MathUtils.degToRad(17)], rz: [THREE.MathUtils.degToRad(-3), THREE.MathUtils.degToRad(-1)], duration: 6500, alternate: true, loop: true, ease: 'inOutSine', onUpdate: () => { card.position.y = motion.y; card.position.z = motion.z; card.rotation.set(motion.rx, motion.ry, motion.rz); } });
      animate(halo.rotation, { z: [-0.35, 0.35], duration: 11000, alternate: true, loop: true, ease: 'inOutSine' });
      animate(halo2.rotation, { z: [0.3, -0.3], duration: 14000, alternate: true, loop: true, ease: 'inOutSine' });
      animate(floaters.rotation, { y: [-0.18, 0.2], x: [-0.08, 0.1], duration: 9000, alternate: true, loop: true, ease: 'inOutSine' });
      animate(particles.material, { opacity: [0.28, 0.72], duration: 2300, alternate: true, loop: true, ease: 'inOutSine' });
    }

    const pointer = { x: 0, y: 0 };
    const move = (e: PointerEvent) => { const r = host.getBoundingClientRect(); pointer.x = (e.clientX-r.left)/r.width-.5; pointer.y = (e.clientY-r.top)/r.height-.5; };
    host.addEventListener('pointermove', move);
    let raf = 0; const tick = () => { root.rotation.y += ((pointer.x*.13)-root.rotation.y)*.035; root.rotation.x += ((-pointer.y*.09)-root.rotation.x)*.035; camera.position.x += ((pointer.x*.22)-camera.position.x)*.025; camera.position.y += ((-pointer.y*.14)-camera.position.y)*.025; camera.lookAt(0,0,0); renderer.render(scene,camera); raf=requestAnimationFrame(tick); }; tick();
    const resize = () => { const w=host.clientWidth||1,h=host.clientHeight||1; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h,false); }; const ro = new ResizeObserver(resize); ro.observe(host); resize();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); host.removeEventListener('pointermove', move); renderer.dispose(); geom.dispose(); renderer.domElement.remove(); scene.traverse(o => { if (o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.LineSegments) { o.geometry.dispose(); const mat=o.material; if (Array.isArray(mat)) mat.forEach(m=>m.dispose()); else mat.dispose(); } }); };
  }, []);
  return <div ref={hostRef} className="hero-three-scene" aria-label="Real-time 3D floating MAKEWEBB profile card" />;
}
