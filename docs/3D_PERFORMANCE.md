# MakeWebb 3D performance guidance

MakeWebb uses interactive motion and 3D project previews.

## Asset loading
Load large GLB assets only when a scene needs them. Reuse loaded assets where possible and avoid duplicate copies of the same model.

## Rendering
Keep pixel ratio and post-processing proportional to the device. Reduce scene complexity on smaller screens when visual intent is preserved.

## Motion
Scroll-driven animation should remain responsive and should not block navigation or content access.

## Verification
Check desktop, tablet, and mobile layouts after changes to 3D scenes, pinned sections, or scroll-linked timelines.
