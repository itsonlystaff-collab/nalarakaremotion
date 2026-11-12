# Nalarka Motion Studio — Airbag 3D Starter

Starter project: cinematic 3D airbag explainer built with Remotion + React Three Fiber.

## Output target
- Vertical 9:16
- 1080 × 1920
- 60 FPS
- 12 seconds
- H.264 MP4

## Android-first workflow (cloud render)
You do not need to render on the phone.

1. Download and unzip this project.
2. Create a GitHub repository named `nalarka-remotion-airbag`.
3. Upload the unzipped files into the repository (keep the `.github/workflows` folder).
4. Open the repository in GitHub in Chrome.
5. Open **Actions** → **Render Nalarka Short** → **Run workflow**.
6. Wait for the workflow to finish successfully.
7. Open the completed workflow run, find **Artifacts**, and download `nalarka-airbag-short`.
8. Extract the artifact ZIP. The MP4 inside is ready for CapCut or upload.

If GitHub Actions is unavailable on your account/repository, use a Node.js cloud workspace or a PC with Node.js 20+.

## Local commands
Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
npm run render
```

## Edit the video
- Main composition: `src/video/AirbagShort.tsx`
- 3D objects and motion: `src/video/AirbagScene.tsx`
- Resolution, FPS, duration: `src/root.tsx`
- Cloud render workflow: `.github/workflows/render-video.yml`

## Important notes
- This is a starter scene using procedural 3D geometry, not a photorealistic CAD model.
- All animation is frame-driven with Remotion's `useCurrentFrame()` timing, so preview and render stay synchronized.
- The cloud workflow uses software WebGL (`swangle`) because standard GitHub-hosted runners do not provide a dedicated GPU.
- GitHub Actions usage and artifact retention depend on GitHub plan and repository limits.
- For production videos, add verified narration, sound effects, music with usage rights, more detailed vehicle/interior assets, and factual review before publishing.

## Technical references
- Remotion: https://www.remotion.dev/docs/
- Remotion rendering: https://www.remotion.dev/docs/render
- Remotion ThreeCanvas: https://www.remotion.dev/docs/three-canvas
