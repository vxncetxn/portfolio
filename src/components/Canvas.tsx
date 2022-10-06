// @ts-nocheck
import { useRef, useEffect } from "react";
// import * as THREE from "three";
import {
  //   Plane,
  //   Vector3,
  //   Matrix4,
  //   Vector4,
  //   PerspectiveCamera,
  //   LinearFilter,
  //   HalfFloatType,
  //   WebGLRenderTarget,
  //   DepthTexture,
  //   DepthFormat,
  //   UnsignedShortType,
  //   MeshStandardMaterial,
  //   Texture,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  PointLight,
  MeshLambertMaterial,
  Group,
  Mesh,
  //   PlaneGeometry,
  ShadowMaterial,
  PlaneBufferGeometry,
} from "three";
import { extend, createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { theme } from "../signals/theme";
import OffscreenWorker from "../utils/offscreen-worker?worker";
import * as Comlink from "comlink";
import { initTransferHandler } from "../utils/event.transferhandler";

function throttle(callback, offset) {
  let baseTime = 0;
  return (...args) => {
    const currentTime = Date.now();
    if (baseTime + offset <= currentTime) {
      baseTime = currentTime;
      callback(...args);
    }
  };
}

initTransferHandler();

export function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
    async function temp() {
      const canvas = canvasRef.current;

      if (canvas.transferControlToOffscreen) {
        const offscreen = canvas.transferControlToOffscreen();
        const worker = new OffscreenWorker();
        const api = Comlink.wrap(worker);

        window.addEventListener(
          "pointermove",
          //   throttle(api.onPointerMove.bind(api), 100)
          api.onPointerMove.bind(api)
        );

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
        extend({
          //   Plane,
          //   Vector3,
          //   Matrix4,
          //   Vector4,
          //   PerspectiveCamera,
          //   LinearFilter,
          //   HalfFloatType,
          //   WebGLRenderTarget,
          //   DepthTexture,
          //   DepthFormat,
          //   UnsignedShortType,
          //   MeshStandardMaterial,
          //   Texture,
          AmbientLight,
          DirectionalLight,
          Color,
          Fog,
          PointLight,
          MeshLambertMaterial,
          Group,
          Mesh,
          //   PlaneGeometry,
          ShadowMaterial,
          PlaneBufferGeometry,
        });
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
