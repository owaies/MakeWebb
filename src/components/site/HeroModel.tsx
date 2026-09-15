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
      renderer.toneMappingExposure = 1.2;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      scene.add(new THREE.HemisphereLight(0xffffff, 0x171020, 2.8));
      const key = new THREE.DirectionalLight(0xffffff, 5.2);
      key.position.set(3, 6, 5);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.near = 0.5;
      key.shadow.camera.far = 20;
      scene.add(key);

      const frontFill = new THREE.DirectionalLight(0xffffff, 2.2);
      frontFill.position.set(-2, 3, 6);
      scene.add(frontFill);

      const rim = new THREE.PointLight(0x9b6cff, 12, 12, 2);
      rim.position.set(-3.5, 2.5, -2);
      scene.add(rim);

      const fill = new THREE.PointLight(0x4b9dff, 5, 10, 2);
      fill.position.set(3, 1.5, 3);
      scene.add(fill);

      const group = new THREE.Group();
      scene.add(group);

      const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
      if (disposed) return;

      const model = gltf.scene;
      const presentation = new THREE.Group();
      presentation.rotation.set(0, Math.PI / 2, 0);
      group.add(presentation);
      presentation.add(model);

      model.traverse((object: any) => {
        if (!object.isMesh) return;
        object.castShadow = true;
        object.receiveShadow = true;

        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material: any) => {
          if (!material) return;
          material.envMapIntensity = 1.35;
          material.needsUpdate = true;
        });

        if (object.geometry) {
          object.geometry.computeVertexNormals?.();
          const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
          materials.forEach((material: any) => {
            if (material?.map) material.map.anisotropy = maxAnisotropy;
            if (material?.normalMap) material.normalMap.anisotropy = maxAnisotropy;
            if (material?.roughnessMap) material.roughnessMap.anisotropy = maxAnisotropy;
            if (material?.metalnessMap) material.metalnessMap.anisotropy = maxAnisotropy;
          });
        }
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
        action.play();
        action.paused = true;
      }

      let cameraDistance = 5;
      const fitBox = new THREE.Box3();
      const fitSphere = new THREE.Sphere();
      const fixedTarget = new THREE.Vector3(0, 0, 0);

      const getHeroProgress = () => {
        const hero = document.querySelector<HTMLElement>(HERO_SELECTOR);
        if (!hero) return 0;
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
        const dprLimit = width < 768 ? 2 : 2.5;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprLimit));
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
        const targetTime = THREE.MathUtils.clamp(progress * clipDuration, 0, clipDuration);

        // The mixer clock is never allowed to run on its own. For each render,
        // temporarily enable the action, seek to the exact scroll-derived time,
        // then pause it again. This makes scroll position the single source of
        // truth and guarantees both downward and upward scrubbing.
        action.enabled = true;
        action.paused = false;
        action.setEffectiveTimeScale(1);
        mixer.setTime(targetTime);
        action.paused = true;
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
        aria-label="Front-facing Sasuke with exact bidirectional scroll-controlled animation"
      />
    </div>
  );
}
