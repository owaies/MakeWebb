import { useEffect, useRef } from "react";
import "./hero-model.css";

const MODEL_URL = "/models/sasuke_utchiha%20(1).glb";

export function HeroModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let animationFrame = 0;
    let cleanup: (() => void) | undefined;

    async function init() {
      const [THREE, { GLTFLoader }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
      ]);
      if (disposed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 100);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;

      scene.add(new THREE.HemisphereLight(0xffffff, 0x120d1c, 2.3));
      const key = new THREE.DirectionalLight(0xffffff, 4);
      key.position.set(3, 5, 4);
      scene.add(key);
      const rim = new THREE.PointLight(0x9b6cff, 15, 10, 2);
      rim.position.set(-3.5, 2.5, -2);
      scene.add(rim);
      const fill = new THREE.PointLight(0x4b9dff, 7, 9, 2);
      fill.position.set(3, 1.5, 2);
      scene.add(fill);

      const group = new THREE.Group();
      scene.add(group);
      const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
      if (disposed) return;

      const model = gltf.scene;
      model.traverse((object: any) => {
        if (!object.isMesh) return;
        object.castShadow = true;
        object.receiveShadow = true;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material: any) => { if (material) material.envMapIntensity = 1.1; });
      });

      const rawBounds = new THREE.Box3().setFromObject(model);
      const rawSize = rawBounds.getSize(new THREE.Vector3());
      const rawCenter = rawBounds.getCenter(new THREE.Vector3());
      const modelScale = 2.0 / Math.max(rawSize.y, 0.001);
      model.scale.setScalar(modelScale);
      model.position.set(-rawCenter.x * modelScale, -rawCenter.y * modelScale, -rawCenter.z * modelScale);
      group.add(model);

      let mixer: THREE.AnimationMixer | undefined;
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.enabled = true;
        action.setEffectiveTimeScale(1);
        action.setEffectiveWeight(1);
        action.play();
      }

      const pointer = { x: 0, y: 0 };
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let userRotation = 0;
      let userTilt = 0;
      let zoom = 1;
      let fitDistance = 5;
      const fitTarget = new THREE.Vector3();
      const fitBox = new THREE.Box3();

      const updateViewport = () => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, Math.min(width, 900) < 768 ? 1.25 : 1.65));
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.fov = height > width ? 39 : width < 1100 ? 35 : 32;
        camera.updateProjectionMatrix();
      };

      const fitAnimatedCharacter = () => {
        // The animation changes the skinned pose, so calculate the bounds after
        // the mixer update instead of fitting only the model's bind pose.
        fitBox.setFromObject(group);
        const center = fitBox.getCenter(fitTarget);
        const radius = fitBox.getBoundingSphere(new THREE.Sphere()).radius;
        const verticalAngle = THREE.MathUtils.degToRad(camera.fov / 2);
        const horizontalAngle = Math.atan(Math.tan(verticalAngle) * camera.aspect);
        const limitingAngle = Math.max(0.05, Math.min(verticalAngle, horizontalAngle));
        const margin = camera.aspect < 0.75 ? 1.34 : camera.aspect < 1.2 ? 1.25 : 1.18;
        const required = (radius / Math.tan(limitingAngle)) * margin;
        fitDistance = THREE.MathUtils.lerp(fitDistance, required, 0.14);

        const centerY = THREE.MathUtils.lerp(0, center.y, 0.35);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, center.x, 0.12);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, centerY, 0.12);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, center.z + fitDistance / zoom, 0.12);
        camera.lookAt(center.x, centerY, center.z);
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
        pointer.y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
        if (!dragging) return;
        userRotation += (event.clientX - lastX) * 0.009;
        userTilt = THREE.MathUtils.clamp(userTilt + (event.clientY - lastY) * 0.0045, -0.24, 0.24);
        lastX = event.clientX;
        lastY = event.clientY;
      };
      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        canvas.setPointerCapture?.(event.pointerId);
      };
      const onPointerUp = (event: PointerEvent) => {
        dragging = false;
        canvas.releasePointerCapture?.(event.pointerId);
      };
      const onPointerLeave = () => { if (!dragging) { pointer.x *= 0.35; pointer.y *= 0.35; } };
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.00065, 0.9, 1.12);
      };
      const onResize = () => updateViewport();

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("resize", onResize);
      window.visualViewport?.addEventListener("resize", onResize);
      onResize();

      const clock = new THREE.Clock();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const animate = () => {
        if (disposed) return;
        animationFrame = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsed = clock.elapsedTime;
        mixer?.update(delta);

        if (!dragging) userRotation *= 0.985;
        const idle = reduceMotion.matches ? 0 : elapsed * 0.055;
        group.rotation.y = idle + userRotation + pointer.x * 0.045;
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.018 + userTilt, 0.08);
        group.position.y = Math.sin(elapsed * 0.55) * 0.008;

        // Refit every frame because the rig animation changes the character's
        // visible bounds while moving arms, legs, clothing and the sword.
        fitAnimatedCharacter();
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("wheel", onWheel);
        window.removeEventListener("resize", onResize);
        window.visualViewport?.removeEventListener("resize", onResize);
        mixer?.stopAllAction();
        model.traverse((object: any) => {
          if (!object.isMesh) return;
          object.geometry?.dispose?.();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material: any) => {
            material?.map?.dispose?.();
            material?.normalMap?.dispose?.();
            material?.roughnessMap?.dispose?.();
            material?.metalnessMap?.dispose?.();
            material?.dispose?.();
          });
        });
        renderer.dispose();
      };
    }

    init().catch((error) => console.error("Hero model failed to load", error));
    return () => { disposed = true; cleanup?.(); cancelAnimationFrame(animationFrame); };
  }, []);

  return (
    <div className="hero-model-layer">
      <canvas ref={canvasRef} className="hero-model-canvas" aria-label="Interactive 3D Sasuke hero model" />
      <div className="hero-model-vignette" />
      <div className="hero-model-glow" />
      <div className="hero-model-hint">Drag to rotate · Scroll to zoom</div>
    </div>
  );
}
