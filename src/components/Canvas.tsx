import { useRef, useEffect } from "react";
import * as THREE from "three";
import { extend, createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { theme } from "../signals/theme";

export function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
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
      root.render(Scene());
    });
    window.dispatchEvent(new Event("resize"));
  }, []);

  return <canvas ref={canvasRef} />;
}
