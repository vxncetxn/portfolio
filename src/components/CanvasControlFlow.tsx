import { lazy } from "react";
const Canvas = lazy(() => import("./Canvas"));
const OffscreenCanvas = lazy(() => import("./OffscreenCanvas"));

export function CanvasControlFlow() {
  return (
    <>
      {HTMLCanvasElement.prototype.transferControlToOffscreen ? (
        <OffscreenCanvas />
      ) : (
        <Canvas />
      )}
    </>
  );
}
