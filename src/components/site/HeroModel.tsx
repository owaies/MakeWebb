import { useEffect, useRef } from "react";
import "./hero-model.css";

const MODEL_URL = "/models/sasuke.glb";

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
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      scene.add(new THREE.HemisphereLight(0xffffff, 0x120d1c, 2.3));
      const key = new THREE.DirectionalLight(0xffffff, 4.0);
      key.position.set(3, 5, 4);
      key.castShadow = true;
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
        materials.forEach((material: any) => {
          if (material) material.envMapIntensity = 1.1;
        });
      });

      // Normalize the asset around its actual visible bounds, not its GLB origin.
      // This keeps the character visually centered even if the source file has an offset origin.
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const sourceHeight = Math.max(size.y, 0.001);
      const normalizedHeight = 2.2;
      const modelScale = normalizedHeight / sourceHeight;
      model.scale.setScalar(modelScale);
      model.position.set(
        -center.x * modelScale,
        -center.y * modelScale,
        -center.z * modelScale,
      );
      group.add(model);

      const normalizedBounds = new THREE.Box3().setFromObject(model);
      const normalizedSphere = normalizedBounds.getBoundingSphere(new THREE.Sphere());
      const sphereRadius = Math.max(normalizedSphere.radius, 0.1);

      const pointer = { x: 0, y: 0 };
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let userRotation = 0;
      let userTilt = 0;
      let zoom = 1;
      let baseDistance = 5;
      let baseY = 0;
      let baseFov = 36;

      const getViewportProfile = () => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        const aspect = width / Math.max(height, 1);
        const shortSide = Math.min(width, height);
        const isPortrait = height > width;
        const isMobile = shortSide < 768;
        const isTablet = shortSide >= 768 && shortSide < 1100;

        // Fluid values. These are viewport ratios, not device-specific coordinates.
        // Portrait gets a little more breathing room vertically; wide screens can show
        // a larger hero centerpiece without clipping the head, feet, or sword.
        const visibleHeight = isMobile
          ? (isPortrait ? 0.70 : 0.76)
          : isTablet
            ? 0.76
            : aspect > 2.0
              ? 0.80
              : 0.78;

        const fov = isPortrait ? 38 : isTablet ? 35 : 33;
        return { width, height, aspect, visibleHeight, fov, isPortrait, isMobile };
      };

      const fitCameraToModel = () => {
        const profile = getViewportProfile();
        baseFov = profile.fov;
        camera.fov = baseFov;
        camera.aspect = profile.aspect;
        camera.updateProjectionMatrix();

        const verticalHalfAngle = THREE.MathUtils.degToRad(baseFov / 2);
        const horizontalHalfAngle = Math.atan(
          Math.tan(verticalHalfAngle) * profile.aspect,
        );

        // Fit the actual character bounds in both axes with a small safety margin.
        const halfHeight = normalizedBounds.max.y - normalizedBounds.min.y;
        const halfWidth = normalizedBounds.max.x - normalizedBounds.min.x;
        const requiredVertical = (halfHeight * 0.5) / Math.tan(verticalHalfAngle);
        const requiredHorizontal = (halfWidth * 0.5) / Math.tan(horizontalHalfAngle);
        const sphereFit = sphereRadius / Math.sin(verticalHalfAngle);
        const rawDistance = Math.max(requiredVertical, requiredHorizontal, sphereFit);

        // visibleHeight is the portion of the viewport occupied by the model.
        baseDistance = (rawDistance / profile.visibleHeight) * 0.92;
        camera.position.set(0, 0.06, baseDistance / zoom);
        camera.lookAt(0, 0, 0);

        // Keep the center of the visible model in the visual center of the hero.
        // A tiny fluid lift on short/landscape viewports compensates for the browser chrome.
        baseY = profile.isMobile && profile.isPortrait ? -0.02 : 0;
        group.position.x = 0;
        group.position.y = baseY;
        group.position.z = 0;
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
        pointer.y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;

        if (!dragging) return;
        userRotation += (event.clientX - lastX) * 0.009;
        userTilt = THREE.MathUtils.clamp(
          userTilt + (event.clientY - lastY) * 0.0045,
          -0.24,
          0.24,
        );
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
        zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.00065, 0.86, 1.16);
      };

      const onResize = () => {
        const width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 768 ? 1.25 : 1.65));
        renderer.setSize(width, height, false);
        fitCameraToModel();
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("resize", onResize);
      window.visualViewport?.addEventListener("resize", onResize);
      window.visualViewport?.addEventListener("scroll", onResize);
      onResize();

      const clock = new THREE.Clock();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      const animate = () => {
        if (disposed) return;
        animationFrame = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        const idle = reduceMotion.matches ? 0 : elapsed * 0.10;

        if (!dragging) userRotation *= 0.985;

        // Gentle parallax keeps the model alive without moving it away from center.
        group.rotation.y = idle + userRotation + pointer.x * 0.07;
        group.rotation.x = THREE.MathUtils.lerp(
          group.rotation.x,
          pointer.y * 0.028 + userTilt,
          0.08,
        );
        group.position.y = THREE.MathUtils.lerp(
          group.position.y,
          baseY + (reduceMotion.matches ? 0 : Math.sin(elapsed * 0.65) * 0.018) + pointer.y * -0.012,
          0.08,
        );
        camera.position.z = THREE.MathUtils.lerp(
          camera.position.z,
          baseDistance / zoom,
          0.08,
        );
        camera.lookAt(0, baseY, 0);
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
        window.visualViewport?.removeEventListener("scroll", onResize);

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
    return () => {
      disposed = true;
      cleanup?.();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="hero-model-layer">
      <canvas ref={canvasRef} className="hero-model-canvas" aria-label="Interactive 3D MakeWebb hero model" />
      <div className="hero-model-vignette" />
      <div className="hero-model-glow" />
      <div className="hero-model-hint">Drag to rotate · Scroll to zoom</div>
    </div>
  );
}
