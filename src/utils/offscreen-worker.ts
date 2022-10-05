// @ts-nocheck
import * as Comlink from "comlink";
import * as THREE from "three";
import { extend, createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { theme } from "../signals/theme";

extend(THREE);

let root;

const api = {
  init(props) {
    let { canvas, dimensions } = props;
    console.log(canvas, dimensions);

    root = createRoot(canvas);
    // console.log(root);
    root.configure({
      events,
      shadows: theme.value === "light" ? true : false,
      camera: { fov: 60 },
      dpr: 1,
      size: dimensions,
    });
    // root.render(Scene());
  },
  // onResize() {
  //   root.configure({
  //     events,
  //     shadows: theme.value === "light" ? true : false,
  //     camera: { fov: 60 },
  //     dpr: 1,
  //     size: { width: window.innerWidth, height: window.innerHeight },
  //   });
  //   root.render(Scene());
  // },
};

Comlink.expose(api);
