// @ts-nocheck
import React from "react";
import * as Comlink from "comlink";
import * as THREE from "three";
import { extend, createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { initTransferHandler } from "../utils/event.transferhandler";
import { observable } from "@legendapp/state";

initTransferHandler();

extend(THREE);

let root;
let savedCanvas;
const theme = observable("light");

const api = {
  init(props) {
    let { canvas, dimensions } = props;
    savedCanvas = canvas;
    root = createRoot(canvas);
    root.configure({
      events,
      shadows: true,
      camera: { fov: 60 },
      dpr: 1,
      size: dimensions,
    });
    root.render(<Scene theme={theme} />);
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
      shadows: true,
      camera: { fov: 60 },
      dpr: 1,
      size: { width: window.innerWidth, height: window.innerHeight },
    });
    root.render(<Scene theme={theme} />);
  },
  onChangeTheme(ev) {
    theme.set(ev.theme);
  },
};

Comlink.expose(api);
