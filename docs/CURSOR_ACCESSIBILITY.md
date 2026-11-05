# Custom cursor accessibility checks

The custom dot/ring cursor and touch ripple are disabled when the browser
reports `prefers-reduced-motion: reduce`. The native pointer and normal touch
interaction remain available. Pointer capability and motion preferences are
observed while the component is mounted, so changing the system setting does
not require a page reload.

## Manual checks

1. With reduced motion disabled, verify the custom cursor appears on a fine pointer and the touch ripple appears on a coarse pointer.
2. Enable reduced motion in the operating system or browser emulation without reloading the page.
3. Verify the custom cursor stops immediately, its animation frame is cancelled, and new touch ripples are not created.
4. Disable reduced motion again and verify the effect is restored for the active pointer type.
5. Confirm links, buttons, inputs, and other controls remain usable with the native pointer and keyboard.
