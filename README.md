# MakeWebb

A from-scratch cinematic studio site built around one coordinated React Three Fiber scene, a local GLSL shader atmosphere, Anime.js motion and a performance-conscious glass UI system.

## Stack
- Next.js + React + TypeScript
- React Three Fiber + Three.js
- Local GLSL shader field for the atmospheric background
- Anime.js v4 for UI motion
- CSS liquid-glass treatment with GPU-heavy effects reserved for the coordinated 3D scene
- Playwright responsive smoke tests

## Run
```bash
npm install
npm run dev
```

## Verify
```bash
npm run build
npm run test:e2e
```

## Deployment
The production deployment is managed by the connected Vercel project for the `main` branch.

The current reference-directed visual layer is loaded from `app/reference.css` and the hero composition has been rebuilt around the supplied cinematic glass reference rather than the previous layout.

Deployment trigger: 2026-09-06. ShaderGradient npm dependency removed because Vercel reported ETARGET for `@shadergradient/react@^2.4.24`.
