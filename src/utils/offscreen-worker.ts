// @ts-nocheck
import * as Comlink from "comlink";
// import * as THREE from "three";
import {
  // Plane,
  // Vector3,
  // Matrix4,
  // Vector4,
  // PerspectiveCamera,
  // LinearFilter,
  // HalfFloatType,
  // WebGLRenderTarget,
  // DepthTexture,
  // DepthFormat,
  // UnsignedShortType,
  // MeshStandardMaterial,
  // Texture,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  PointLight,
  MeshLambertMaterial,
  Group,
  Mesh,
  // PlaneGeometry,
  ShadowMaterial,
  PlaneBufferGeometry,
} from "three";
import { extend, createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { theme } from "../signals/theme";
import { initTransferHandler } from "../utils/event.transferhandler";

initTransferHandler();

extend({
  // Plane,
  // Vector3,
  // Matrix4,
  // Vector4,
  // PerspectiveCamera,
  // LinearFilter,
  // HalfFloatType,
  // WebGLRenderTarget,
  // DepthTexture,
  // DepthFormat,
  // UnsignedShortType,
  // MeshStandardMaterial,
  // Texture,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  PointLight,
  MeshLambertMaterial,
  Group,
  Mesh,
  // PlaneGeometry,
  ShadowMaterial,
  PlaneBufferGeometry,
});

let root;
let savedCanvas;

const api = {
  init(props) {
    let { canvas, dimensions } = props;
    savedCanvas = canvas;
    root = createRoot(canvas);
    root.configure({
      events,
      shadows: theme.value === "light" ? true : false,
      camera: { fov: 60 },
      dpr: 1,
      size: dimensions,
    });
    root.render(Scene());
  },
  onPointerMove(ev) {
    let customEv = new CustomEvent("pointermove");
    for (const [key, value] of Object.entries(ev)) {
      customEv[key] = value;
    }
    savedCanvas.dispatchEvent(customEv);
  },
  onResize() {
    root.configure({
      events,
      shadows: theme.value === "light" ? true : false,
      camera: { fov: 60 },
      dpr: 1,
      size: { width: window.innerWidth, height: window.innerHeight },
    });
    root.render(Scene());
  },
};

Comlink.expose(api);
