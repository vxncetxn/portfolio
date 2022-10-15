<script lang="js">
  import { onMount } from "svelte";
  import * as Comlink from "comlink";
  import { initTransferHandler } from "../lib/event.transferhandler";
  const worker = new Worker(
    new URL("../lib/offscreen-worker", import.meta.url),
    {
      type: "module",
    }
  );
  import { theme } from "../stores/theme";

  initTransferHandler();
  let canvas;

  onMount(() => {
    async function createRootFromCanvas() {
      const offscreen = canvas.transferControlToOffscreen();
      const api = Comlink.wrap(worker);

      window.addEventListener(
        "mousemove",
        //   throttle(api.onPointerMove.bind(api), 100)
        api.onPointerMove.bind(api)
      );
      window.addEventListener("changetheme", api.onChangeTheme.bind(api));
      window.addEventListener("changecolor", api.onChangeColor.bind(api));

      let customEv = new CustomEvent("changetheme");
      customEv["theme"] = theme.get();
      window.dispatchEvent(customEv);

      await api.init(
        Comlink.transfer(
          {
            canvas: offscreen,
            dimensions: {
              width: window.innerWidth,
              height: Math.max(window.innerHeight, 664),
              top: 0,
              left: 0,
              updateStyle: false,
            },
            devicePixelRatio: window.devicePixelRatio,
            hasHover: window.matchMedia("(hover: hover)").matches,
          },
          [offscreen]
        )
      );
      window.addEventListener("resize", api.onResize.bind(api));
    }

    createRootFromCanvas();
  });
</script>

<canvas bind:this={canvas} class="absolute left-0 top-0" />
