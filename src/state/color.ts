// @ts-nocheck
import { observable } from "@legendapp/state";

export const color = observable("#34fdaa");

color.onChange((value) => {
  document.documentElement.style.setProperty("--color-theme-selected", value);
  let customEv = new CustomEvent("changecolor");
  customEv["color"] = value;
  window.dispatchEvent(customEv);
});
