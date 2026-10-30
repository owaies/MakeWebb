# Custom cursor accessibility checks

The custom dot/ring cursor and touch ripple are disabled when the browser
reports `prefers-reduced-motion: reduce`. The native pointer and normal touch
interaction remain available.

## Manual checks

1. With reduced motion disabled, verify the custom cursor appears on a fine pointer and the touch ripple appears on a coarse pointer.
2. Enable reduced motion in the operating system or browser emulation and reload the page.
3. Verify the custom cursor and touch ripple do not appear.
4. Confirm links, buttons, inputs, and other controls remain usable with the native pointer and keyboard.
