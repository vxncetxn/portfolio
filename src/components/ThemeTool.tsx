import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";
import { theme } from "../state/theme";

const options = ["Light", "Dark", "System"];

const selectedOption = observable(
  (() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light") {
      return "Light";
    } else if (storedTheme === "dark") {
      return "Dark";
    } else {
      return "System";
    }
  })()
);
selectedOption.onChange((value) => {
  switch (value) {
    case "Light":
      theme.set("light");
      window.localStorage.setItem("theme", "light");
      break;
    case "Dark":
      theme.set("dark");
      window.localStorage.setItem("theme", "dark");
      break;
    default:
      const darkModePref = window.matchMedia("(prefers-color-scheme: dark");
      if (darkModePref.matches) {
        theme.set("dark");
      } else {
        theme.set("light");
      }
      window.localStorage.removeItem("theme");
      break;
  }
});

export function ThemeTool() {
  const $selectedOption = useSelector(() => selectedOption.get());

  return (
    <div className="flex text-neutral-02 bg-neutral-03 w-240 rounded-16 px-8 py-8 transition-colors">
      <div
        className={
          $selectedOption === "Light"
            ? "absolute left-8 top-8 bg-neutral-01 w-[calc((240px-16px)/3)] h-[calc(100%-16px)] rounded-8 transition-all translate-x-0"
            : $selectedOption === "Dark"
            ? "absolute left-8 top-8 bg-neutral-01 w-[calc((240px-16px)/3)] h-[calc(100%-16px)] rounded-8 transition-all translate-x-full"
            : "absolute left-8 top-8 bg-neutral-01 w-[calc((240px-16px)/3)] h-[calc(100%-16px)] rounded-8 transition-all translate-x-[200%]"
        }
      ></div>
      {options.map((option) => (
        <button
          onClick={() => selectedOption.set(option)}
          className="relative flex-1 font-sans text-18 text-neutral-02 capsize py-12 transition-colors"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
