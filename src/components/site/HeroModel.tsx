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
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
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
        materials.forEach((material: any) => {
          if (material) material.envMapIntensity = 1.1;
        });
      });

      // Normalize the character around its actual bounds so the rig stays centered.
      const rawBounds = new THREE.Box3().setFromObject(model);
      const rawSize = rawBounds.getSize(new THREE.Vector3());
      const rawCenter = rawBounds.getCenter(new THREE.Vector3());
      const modelScale = 2.85 / Math.max(rawSize.y, 0.001);
      model.scale.setScalar(modelScale);
      model.position.set(
        -rawCenter.x * modelScale,
        -rawCenter.y * modelScale,
        -rawCenter.z * modelScale,
      );

      // The GLB is exported facing away from the camera. Rotate the whole character
      // exactly 180 degrees once, while leaving the rig free to animate normally.
      model.rotation.set(0, Math.PI, 0);
      group.add(model);

      let mixer: THREE.AnimationMixer | undefined;
      let action: THREE.AnimationAction | undefined;
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        action = mixer.clipAction(gltf.animations[0]);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.enabled = true;
        action.setEffectiveWeight(1);
        // Do NOT pause or set the time scale to zero. mixer.setTime() below is the
        // actual scroll scrubber and needs the action to remain evaluatable.
        action.setEffectiveTimeScale(1);
        action.play();
      }

      let fitDistance = 5;
      const fitBox = new THREE.Box3();
      const fitSphere = new THREE.Sphere();
      const target = new THREE.Vector3(0, 0, 0);

      const updateViewport = () => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, Math.min(width, 900) < 768 ? 1.25 : 1.65),
        );
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.fov = height > width ? 39 : width < 1100 ? 35 : 32;
        camera.updateProjectionMatrix();
      };

      const getScrollProgress = () => {
        // Use the complete document scroll range. This makes the animation scrub
        // reliably on mobile, tablet and desktop instead of depending on section IDs.
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        return THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
      };

      const syncAnimationToScroll = () => {
        if (!action || !mixer) return;
        const duration = Math.max(action.getClip().duration, 0.001);
        const time = getScrollProgress() * duration;
        mixer.setTime(time);
      };

      const onScroll = () => syncAnimationToScroll();
      const onResize = () => {
        updateViewport();
        syncAnimationToScroll();
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      window.visualViewport?.addEventListener("resize", onResize);
      onResize();
      syncAnimationToScroll();

      const fitAnimatedCharacter = () => {
        fitBox.setFromObject(group);
        const radius = fitBox.getBoundingSphere(fitSphere).radius;
        const verticalAngle = THREE.MathUtils.degToRad(camera.fov / 2);
        const horizontalAngle = Math.atan(Math.tan(verticalAngle) * camera.aspect);
        const limitingAngle = Math.max(0.05, Math.min(verticalAngle, horizontalAngle));
        const margin = camera.aspect < 0.75 ? 1.08 : camera.aspect < 1.2 ? 1.06 : 1.04;
        const required = (radius / Math.tan(limitingAngle)) * margin;
        fitDistance = THREE.MathUtils.lerp(fitDistance, required, 0.18);

        // Camera never follows the animated skeleton. This is what keeps Sasuke
        // locked to the exact center while arms, legs and body move.
        camera.position.set(0, 0, fitDistance);
        camera.lookAt(target);
      };

      const animate = () => {
        if (disposed) return;
        animationFrame = requestAnimationFrame(animate);

        if (action && mixer) {
          const duration = Math.max(action.getClip().duration, 0.001);
          mixer.setTime(getScrollProgress() * duration);
        }

        group.rotation.set(0, 0, 0);
        group.position.set(0, 0, 0);
        fitAnimatedCharacter();
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("scroll", onScroll);
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
    return () => {
      disposed = true;
      cleanup?.();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="hero-model-layer">
      <canvas
        ref={canvasRef}
        className="hero-model-canvas"
        aria-label="3D Sasuke model with scroll-controlled animation"
      />
      <div className="hero-model-vignette" />
      <div className="hero-model-glow" />
      <div className="hero-model-hint">Scroll to animate</div>
    </div>
  );
}
