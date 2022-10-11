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
    <div className="relative flex items-center transition-colors text-neutral-02 bg-neutral-03 w-240 rounded-16">
      <div
        className={
          $selectedOption === "Light"
            ? "absolute left-4 top-4 bg-neutral-01 w-[calc((100%-8px)/3)] h-[calc(100%-8px)] rounded-[12px] transition translate-x-0"
            : $selectedOption === "Dark"
            ? "absolute left-4 top-4 bg-neutral-01 w-[calc((100%-8px)/3)] h-[calc(100%-8px)] rounded-[12px] transition translate-x-full"
            : "absolute left-4 top-4 bg-neutral-01 w-[calc((100%-8px)/3)] h-[calc(100%-8px)] rounded-[12px] transition translate-x-[200%]"
        }
      ></div>
      {options.map((option) => (
        <button
          onClick={() => selectedOption.set(option)}
          className="relative flex-1 h-full font-sans transition-colors text-16 lg:text-18 text-neutral-02 capsize rounded-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-selected focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
