// @ts-nocheck
import { useRef, useEffect } from "react";
import { createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { theme } from "../state/theme";
import { color } from "../state/color";

export default function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const root = createRoot(canvasRef.current);

    window.addEventListener("resize", () => {
      root.configure({
        events: window.matchMedia("(hover: hover)").matches
          ? events
          : undefined,
        shadows: true,
        camera: { fov: 60, near: 1, far: 50 },
        dpr: 1,
        size: {
          width: window.innerWidth,
          height: Math.max(window.innerHeight, 664),
          top: 0,
          left: 0,
          updateStyle: false,
        },
      });
      root.render(<Scene theme={theme} color={color} />);
    });
    window.dispatchEvent(new Event("resize"));
    window.addEventListener("mousemove", (ev) => {
      let customEv = new CustomEvent("pointermove");
      customEv.offsetX = ev.clientX;
      customEv.offsetY = ev.clientY;
      canvasRef.current.dispatchEvent(customEv);
    });
  }, []);

  return <canvas ref={canvasRef} className="absolute left-0 top-0" />;
}
