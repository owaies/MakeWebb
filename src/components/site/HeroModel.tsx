import { useEffect, useRef } from "react";
import "./hero-model.css";

const MODEL_URL = "/models/sasuke_utchiha%20(1).glb";
const MODEL_HEIGHT = 2.25;

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

      // The reference supplied by the user is a clean right-facing side
      // profile. Keep this orientation on a parent outside the animated rig so
      // animation tracks can never rotate Sasuke back toward the camera.
      const facingGroup = new THREE.Group();
      facingGroup.rotation.set(0, -Math.PI / 2, 0);
      group.add(facingGroup);
      facingGroup.add(model);

      model.traverse((object: any) => {
        if (!object.isMesh) return;
        object.castShadow = true;
        object.receiveShadow = true;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
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
      let clipDuration = 0;

      if (gltf.animations.length > 0) {
        const clip = gltf.animations[0];
        clipDuration = Math.max(clip.duration, 0.001);
        mixer = new THREE.AnimationMixer(model);
        action = mixer.clipAction(clip);
        action.reset();
        action.enabled = true;
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.setEffectiveWeight(1);
        action.setEffectiveTimeScale(1);
        action.paused = false;
        action.play();
      }

      let cameraDistance = 5;
      const fitBox = new THREE.Box3();
      const fitSphere = new THREE.Sphere();
      const fixedTarget = new THREE.Vector3(0, 0, 0);

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
        const verticalAngle = THREE.MathUtils.degToRad(camera.fov / 2);
        const horizontalAngle = Math.atan(Math.tan(verticalAngle) * camera.aspect);
        const limitingAngle = Math.max(0.05, Math.min(verticalAngle, horizontalAngle));
        const margin = camera.aspect < 0.72 ? 1.52 : camera.aspect < 1.1 ? 1.40 : 1.30;
        const requiredDistance = (radius / Math.tan(limitingAngle)) * margin;

        cameraDistance = THREE.MathUtils.lerp(cameraDistance, requiredDistance, 0.12);
        camera.position.set(0, 0, cameraDistance);
        camera.lookAt(fixedTarget);
      };

      const getScrollProgress = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const maxScroll = Math.max(scrollHeight - window.innerHeight, 1);
        return THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
      };

      const scrubAnimation = () => {
        if (!mixer || !action) return;
        const time = getScrollProgress() * clipDuration;
        mixer.setTime(time);
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
      scrubAnimation();

      const animate = () => {
        if (disposed) return;
        animationFrame = requestAnimationFrame(animate);

        // Scroll is the only source of animation time. There is deliberately
        // no clock update, idle motion, pointer rotation, or auto rotation.
        scrubAnimation();
        group.position.set(0, 0, 0);
        group.rotation.set(0, 0, 0);
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
        aria-label="3D Sasuke model with scroll-controlled animation"
      />
      <div className="hero-model-vignette" />
      <div className="hero-model-glow" />
    </div>
  );
}
