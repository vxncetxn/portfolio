<script lang="js">
  import { onMount } from "svelte";
  import { createRoot, events, invalidate } from "@react-three/fiber";
  //   import React from "react";
  import { Scene } from "./Scene";
  import { theme } from "../stores/theme";
  import { color } from "../stores/color";

  let canvas;

  onMount(() => {
    const root = createRoot(canvas);
    const eventsPresent = window.matchMedia("(hover: hover)").matches;

    window.addEventListener("resize", () => {
      root.configure({
        events: eventsPresent ? events : undefined,
        shadows: true,
        camera: { fov: 60, near: 1, far: 50 },
        dpr: eventsPresent ? 1 : window.devicePixelRatio,
        size: {
          width: eventsPresent
            ? window.innerWidth
            : window.innerWidth / window.devicePixelRatio,
          height: eventsPresent
            ? Math.max(window.innerHeight, 664)
            : Math.max(
                window.innerHeight / window.devicePixelRatio,
                664 / window.devicePixelRatio
              ),
          top: 0,
          left: 0,
          updateStyle: false,
        },
        frameloop: "demand",
      });
      root.render(Scene({ theme, color }));
    });
    window.dispatchEvent(new Event("resize"));
    window.addEventListener("mousemove", (ev) => {
      invalidate();
      let customEv = new CustomEvent("pointermove");
      customEv.offsetX = ev.clientX;
      customEv.offsetY = ev.clientY;
      canvas.dispatchEvent(customEv);
    });
  });
</script>

<canvas bind:this={canvas} class="absolute left-0 top-0" />
