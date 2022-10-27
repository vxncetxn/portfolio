// @ts-nocheck
import { atom } from "nanostores";

export const color = atom("#34fdaa");

color.listen((value) => {
  document.documentElement.style.setProperty("--color-theme-selected", value);
  let customEv = new CustomEvent("changecolor");
  customEv["color"] = value;
  window.dispatchEvent(customEv);
});
