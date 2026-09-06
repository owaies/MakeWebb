# MakeWebb

A from-scratch cinematic studio site built around one coordinated React Three Fiber scene, Shader Gradient atmosphere, Anime.js motion and a performance-conscious glass UI system.

## Stack
- Next.js + React + TypeScript
- React Three Fiber + Three.js
- `@shadergradient/react` for the atmospheric shader field
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
