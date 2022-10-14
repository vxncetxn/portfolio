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
let eventsPresent;
let dpr;
const theme = observable("light");
const color = observable("#34fdaa");

const api = {
  init(props) {
    let { canvas, dimensions, devicePixelRatio, hasHover } = props;
    savedCanvas = canvas;
    root = createRoot(canvas);
    eventsPresent = hasHover;
    dpr = devicePixelRatio;

    root.configure({
      events: eventsPresent ? events : undefined,
      shadows: true,
      camera: { fov: 60, near: 1, far: 50 },
      dpr: eventsPresent ? 1 : dpr,
      size: eventsPresent
        ? dimensions
        : {
            ...dimensions,
            width: dimensions.width / dpr,
            height: dimensions.height / dpr,
          },
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
      events: eventsPresent ? events : undefined,
      shadows: true,
      camera: { fov: 60, near: 1, far: 50 },
      dpr: eventsPresent ? 1 : dpr,
      size: {
        width: eventsPresent ? ev.width : ev.width / dpr,
        height: eventsPresent
          ? Math.max(ev.height, 664)
          : Math.max(ev.height / dpr, 664 / dpr),
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
