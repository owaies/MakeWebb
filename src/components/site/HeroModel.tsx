import { useEffect, useRef } from "react";
import "./hero-model.css";

const MODEL_URL = "/models/sasuke_utchiha%20(1).glb";
const MODEL_HEIGHT = 3.15;
const HERO_SELECTOR = ".hero-scroll-scene";

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
      const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
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
      const presentation = new THREE.Group();

      // The source model is sideways relative to the camera. The presentation
      // group owns the fixed orientation so animation never changes facing.
      presentation.rotation.set(0, Math.PI / 2, 0);
      group.add(presentation);
      presentation.add(model);

      model.traverse((object: any) => {
        if (!object.isMesh) return;
        object.castShadow = true;
        object.receiveShadow = true;
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material: any) => {
          if (material) material.envMapIntensity = 1.1;
        });
      });

      const rawBounds = new THREE.Box3().setFromObject(model);
      const rawSize = rawBounds.getSize(new THREE.Vector3());
      const rawCenter = rawBounds.getCenter(new THREE.Vector3());
      const modelScale = MODEL_HEIGHT / Math.max(rawSize.y, 0.001);
      model.scale.setScalar(modelScale);
      model.position.set(
        -rawCenter.x * modelScale,
        -rawCenter.y * modelScale,
        -rawCenter.z * modelScale,
      );

      let mixer: THREE.AnimationMixer | undefined;
      let action: THREE.AnimationAction | undefined;
      let clipDuration = 0.001;

      if (gltf.animations.length > 0) {
        const clip = gltf.animations[0];
        clipDuration = Math.max(clip.duration, 0.001);
        mixer = new THREE.AnimationMixer(model);
        action = mixer.clipAction(clip);
        action.reset();
        action.enabled = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.setEffectiveWeight(1);
        action.setEffectiveTimeScale(1);
        action.paused = false;
        action.play();
      }

      let cameraDistance = 5;
      const fitBox = new THREE.Box3();
      const fitSphere = new THREE.Sphere();
      const fixedTarget = new THREE.Vector3(0, 0, 0);

      const getHeroProgress = () => {
        const hero = document.querySelector<HTMLElement>(HERO_SELECTOR);
        if (!hero) return 0;

        // Progress is the hero's own scroll range, not the whole document.
        // This makes the sticky 300vh scene the complete animation timeline.
        const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
        return THREE.MathUtils.clamp(
          -hero.getBoundingClientRect().top / scrollRange,
          0,
          1,
        );
      };

      const updateViewport = () => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, width < 768 ? 1.35 : 1.75),
        );
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.fov = width < 768 ? 38 : width < 1200 ? 35 : 33;
        camera.updateProjectionMatrix();
      };

      const updateCamera = () => {
        fitBox.setFromObject(group);
        const radius = fitBox.getBoundingSphere(fitSphere).radius;
        const vertical = THREE.MathUtils.degToRad(camera.fov / 2);
        const horizontal = Math.atan(Math.tan(vertical) * camera.aspect);
        const limiting = Math.max(0.05, Math.min(vertical, horizontal));
        const margin = camera.aspect < 0.72 ? 1.3 : camera.aspect < 1.1 ? 1.2 : 1.1;
        const required = (radius / Math.tan(limiting)) * margin;
        cameraDistance = THREE.MathUtils.lerp(cameraDistance, required, 0.16);
        camera.position.set(0, 0, cameraDistance);
        camera.lookAt(fixedTarget);
      };

      const scrubAnimation = () => {
        if (!mixer || !action) return;

        const progress = getHeroProgress();
        const targetTime = THREE.MathUtils.clamp(
          progress * clipDuration,
          0,
          clipDuration,
        );

        // LoopOnce + clampWhenFinished pauses the action when it reaches the
        // final frame. That breaks reverse scrolling. Re-enable/unpause it
        // before every absolute time seek so the same timeline works in both
        // directions with no autoplay clock.
        action.enabled = true;
        action.paused = false;
        mixer.setTime(targetTime);
      };

      const onScroll = () => scrubAnimation();
      const onResize = () => {
        updateViewport();
        scrubAnimation();
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      window.visualViewport?.addEventListener("resize", onResize);
      onResize();

      const animate = () => {
        if (disposed) return;
        animationFrame = requestAnimationFrame(animate);

        // Absolute scroll position controls absolute animation time.
        // Down = later in the clip, up = earlier in the same clip.
        scrubAnimation();
        group.position.set(0, 0, 0);
        group.rotation.set(0, 0, 0);
        presentation.rotation.set(0, Math.PI / 2, 0);
        updateCamera();
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
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
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
        aria-label="Front-facing Sasuke with absolute bidirectional scroll-controlled animation"
      />
      <div className="hero-model-vignette" />
      <div className="hero-model-glow" />
    </div>
  );
}
