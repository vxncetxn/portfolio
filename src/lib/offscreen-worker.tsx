// @ts-nocheck
import React from "react";
import * as Comlink from "comlink";
import { createRoot, events } from "@react-three/fiber";
import { Scene } from "../components/Scene";
import { initTransferHandler } from "../lib/event.transferhandler";
import { observable } from "@legendapp/state";

initTransferHandler();

let root;
let savedCanvas;
const theme = observable("light");
const color = observable("#34fdaa");

const api = {
  init(props) {
    let { canvas, dimensions } = props;
    savedCanvas = canvas;
    root = createRoot(canvas);
    root.configure({
      events:
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover)").matches
          ? events
          : undefined,
      shadows: true,
      camera: { fov: 60, near: 1, far: 50 },
      dpr: 1,
      size: dimensions,
    });
    root.render(<Scene theme={theme} color={color} />);
  },
  onPointerMove(ev) {
    let customEv = new CustomEvent("pointermove");
    for (const [key, value] of Object.entries(ev)) {
      customEv[key] = value;
    }
    savedCanvas.dispatchEvent(customEv);
  },
  onResize(ev) {
    root.configure({
      events:
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover)").matches
          ? events
          : undefined,
      shadows: true,
      camera: { fov: 60, near: 1, far: 50 },
      dpr: 1,
      size: {
        width: ev.width,
        height: ev.height,
        top: 0,
        left: 0,
        updateStyle: false,
      },
    });
    root.render(<Scene theme={theme} color={color} />);
  },
  onChangeTheme(ev) {
    theme.set(ev.theme);
  },
  onChangeColor(ev) {
    color.set(ev.color);
  },
};

Comlink.expose(api);
