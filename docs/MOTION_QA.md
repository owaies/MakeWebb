# MakeWebb motion QA

Review scroll and pointer interactions after changes to cinematic sections, project previews, or 3D scenes.

## Scroll
Check long scroll sequences, pinned sections, and release points with both mouse-wheel and touch scrolling.

## Pointer
Verify hover treatments never hide primary text or actions.

## Responsive
Test desktop, tablet, mobile, and browser zoom. Confirm the layout does not depend on a single viewport width.

## Reduced motion
Verify essential content remains complete when motion is reduced.

## Smooth-scroll lifecycle regression
- Navigate away from the page immediately after a fresh load, while the deferred Lenis module may still be loading.
- Confirm no animation loop continues after unmount and no unhandled import rejection appears in the console.
- Enable the operating system's reduced-motion preference and confirm the smooth-scroll loop is not initialized.

