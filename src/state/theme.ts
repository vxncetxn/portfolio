// @ts-nocheck
import { observable } from "@legendapp/state";

export const theme = observable("light");

theme.onChange((value) => {
  document.documentElement.setAttribute("theme", value);
  let customEv = new CustomEvent("changetheme");
  customEv["theme"] = value;
  window.dispatchEvent(customEv);
});
