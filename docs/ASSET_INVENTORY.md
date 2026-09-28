# MakeWebb Asset Inventory

The project contains a small public asset system plus cinematic media and 3D models.

## Key assets

- public/models/ contains tracked 3D assets used by the experience.
- public/videos/ contains the Rinnegan cinematic variants.
- Site presentation components under src/components/site/ consume these assets through the application layer.

## Asset change checklist

For a new visual asset, record its expected viewport use, approximate size, and fallback behavior. Verify the asset path on both development and production builds. Keep mobile-specific media separate where the existing experience already provides a dedicated variant.
