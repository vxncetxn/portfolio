// @ts-nocheck
import { atom } from "nanostores";

export const theme = atom("light");

theme.listen((value) => {
  document.documentElement.setAttribute("theme", value);
  let customEv = new CustomEvent("changetheme");
  customEv["theme"] = value;
  window.dispatchEvent(customEv);
});
