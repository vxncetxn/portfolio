// @ts-nocheck
import { useRef, useEffect } from "react";
import { createRoot, events, invalidate } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { theme } from "../state/theme";
import { color } from "../state/color";

export default function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const root = createRoot(canvasRef.current);
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
      root.render(<Scene theme={theme} color={color} />);
    });
    window.dispatchEvent(new Event("resize"));
    window.addEventListener("mousemove", (ev) => {
      invalidate();
      let customEv = new CustomEvent("pointermove");
      customEv.offsetX = ev.clientX;
      customEv.offsetY = ev.clientY;
      canvasRef.current.dispatchEvent(customEv);
    });
  }, []);

  return <canvas ref={canvasRef} className="absolute left-0 top-0" />;
}
