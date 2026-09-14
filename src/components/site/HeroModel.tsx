import { useEffect, useRef } from "react";

const MODEL_URL = "/models/sasuke.glb";

export function HeroModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let animationFrame = 0;
    let cleanup: (() => void) | undefined;

    async function init() {
      const [{ default: THREE }, { GLTFLoader }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
      ]);

      if (disposed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
      camera.position.set(0, 1.25, 5.4);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      scene.add(new THREE.HemisphereLight(0xffffff, 0x14101e, 2.4));

      const key = new THREE.DirectionalLight(0xffffff, 4.2);
      key.position.set(3, 5, 4);
      key.castShadow = true;
      scene.add(key);

      const rim = new THREE.PointLight(0x9b6cff, 18, 9, 2);
      rim.position.set(-3.5, 2.2, -1.5);
      scene.add(rim);

      const fill = new THREE.PointLight(0x4b9dff, 9, 8, 2);
      fill.position.set(3.5, 1, 1.5);
      scene.add(fill);

      const group = new THREE.Group();
      scene.add(group);

      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(MODEL_URL);
      if (disposed) return;

      const model = gltf.scene;
      model.traverse((object: any) => {
        if (!object.isMesh) return;
        object.castShadow = true;
        object.receiveShadow = true;
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material: any) => {
            material.envMapIntensity = 1.15;
          });
        }
      });

      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const height = Math.max(size.y, 0.001);
      const targetHeight = window.innerWidth < 768 ? 4.1 : 4.8;
      const scale = targetHeight / height;

      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      group.add(model);

      const pointer = { x: 0, y: 0, dragX: 0, dragY: 0 };
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let userRotation = 0;
      let userTilt = 0;
      let zoom = window.innerWidth < 768 ? 1.08 : 1;

      const onPointerMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1;
        pointer.y = (event.clientY - rect.top) / rect.height * 2 - 1;

        if (!dragging) return;
        userRotation += (event.clientX - lastX) * 0.012;
        userTilt += (event.clientY - lastY) * 0.006;
        userTilt = THREE.MathUtils.clamp(userTilt, -0.32, 0.32);
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

      const onPointerLeave = () => {
        if (!dragging) {
          pointer.x *= 0.35;
          pointer.y *= 0.35;
        }
      };

      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.0008, 0.78, 1.3);
      };

      const onResize = () => {
        const width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;
        camera.aspect = width / Math.max(height, 1);
        camera.fov = width < 768 ? 34 : 30;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 768 ? 1.35 : 1.75));
        renderer.setSize(width, height, false);
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("resize", onResize);
      onResize();

      const clock = new THREE.Clock();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      const animate = () => {
        if (disposed) return;
        animationFrame = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        const idle = reduceMotion.matches ? 0 : elapsed * 0.16;

        if (!dragging) userRotation *= 0.985;
        group.rotation.y = idle + userRotation + pointer.x * 0.16;
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.055 + userTilt, 0.08);
        group.position.y = Math.sin(elapsed * 0.75) * 0.035 + pointer.y * -0.035;

        const baseZ = window.innerWidth < 768 ? 5.9 : 5.35;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseZ / zoom, 0.07);
        camera.lookAt(0, 0.15, 0);
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
        model.traverse((object: any) => {
          if (object.isMesh) {
            object.geometry?.dispose?.();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material: any) => {
              material?.dispose?.();
              material?.map?.dispose?.();
              material?.normalMap?.dispose?.();
              material?.roughnessMap?.dispose?.();
              material?.metalnessMap?.dispose?.();
            });
          }
        });
        renderer.dispose();
      };
    }

    init().catch((error) => console.error("Hero model failed to load", error));

    return () => {
      disposed = true;
      cleanup?.();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="hero-model-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-model-canvas" />
      <div className="hero-model-vignette" />
      <div className="hero-model-glow" />
      <div className="hero-model-hint">Drag to rotate · Scroll to zoom</div>
    </div>
  );
}
