import { observable } from "@legendapp/state";

export const theme = observable("light");

theme.onChange((value) => {
  console.log("onchange to: ", value);
  document.documentElement.setAttribute("theme", value);
  let customEv = new CustomEvent("changetheme");
  customEv["theme"] = value;
  window.dispatchEvent(customEv);
});
