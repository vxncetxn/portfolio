// @ts-nocheck
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { extend, createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { theme } from "../signals/theme";
import OffscreenWorker from "../utils/offscreen-worker?worker";
import * as Comlink from "comlink";

export function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
    async function temp() {
      const canvas = canvasRef.current;

      if (canvas.transferControlToOffscreen) {
        const offscreen = canvas.transferControlToOffscreen();
        const worker = new OffscreenWorker();
        const api = Comlink.wrap(worker);

        await api.init(
          Comlink.transfer(
            {
              canvas: offscreen,
              dimensions: {
                width: window.innerWidth,
                height: window.innerHeight,
              },
            },
            [offscreen]
          )
        );
        // window.addEventListener("resize", api.onResize.bind(api));
        // window.dispatchEvent(new Event("resize"));
        console.log("completo");
      } else {
        extend(THREE);
        const root = createRoot(canvasRef.current);

        window.addEventListener("resize", () => {
          root.configure({
            events,
            shadows: theme.value === "light" ? true : false,
            camera: { fov: 60 },
            dpr: 1,
            size: { width: window.innerWidth, height: window.innerHeight },
          });
          root.render(<Scene />);
        });
        window.dispatchEvent(new Event("resize"));
      }
    }

    temp();
  }, []);

  return <canvas ref={canvasRef} />;
}
