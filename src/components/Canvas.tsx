// @ts-nocheck
import { useRef, useEffect } from "react";
import { createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { theme } from "../state/theme";
import { color } from "../state/color";
import OffscreenWorker from "../lib/offscreen-worker?worker";
import * as Comlink from "comlink";
import { initTransferHandler } from "../lib/event.transferhandler";

// function throttle(callback, offset) {
//   let baseTime = 0;
//   return (...args) => {
//     const currentTime = Date.now();
//     if (baseTime + offset <= currentTime) {
//       baseTime = currentTime;
//       callback(...args);
//     }
//   };
// }

initTransferHandler();

export function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
    async function createRootFromCanvas() {
      const canvas = canvasRef.current;

      if (canvas.transferControlToOffscreen) {
        const offscreen = canvas.transferControlToOffscreen();
        const worker = new OffscreenWorker();
        const api = Comlink.wrap(worker);

        canvas.addEventListener(
          "pointermove",
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
                height: window.innerHeight,
                top: 0,
                left: 0,
                updateStyle: false,
              },
            },
            [offscreen]
          )
        );
        window.addEventListener("resize", api.onResize.bind(api));
        // window.dispatchEvent(new Event("resize"));
      } else {
        const root = createRoot(canvas);

        window.addEventListener("resize", () => {
          root.configure({
            events,
            shadows: true,
            camera: { fov: 60, near: 1, far: 50 },
            dpr: 1,
            size: {
              width: window.innerWidth,
              height: window.innerHeight,
              top: 0,
              left: 0,
              updateStyle: false,
            },
          });
          root.render(<Scene theme={theme} color={color} />);
        });
        window.dispatchEvent(new Event("resize"));
      }
    }

    createRootFromCanvas();
  }, []);

  return <canvas ref={canvasRef} />;
}
