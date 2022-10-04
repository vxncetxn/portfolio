import { theme } from "../signals/theme";

export function TempThemeSelect() {
  return (
    <div className="absolute flex space-x-12 right-120 top-64 text-neutral-02">
      <button
        onClick={() => {
          theme.value = "light";
          window.localStorage.setItem("theme", "light");
        }}
      >
        Light
      </button>
      <button
        onClick={() => {
          theme.value = "dark";
          window.localStorage.setItem("theme", "dark");
        }}
      >
        Dark
      </button>
      <button
        onClick={() => {
          const darkModePref = window.matchMedia("(prefers-color-scheme: dark");
          if (darkModePref.matches) {
            theme.value = "dark";
          } else {
            theme.value = "light";
          }
          window.localStorage.removeItem("theme");
        }}
      >
        System
      </button>
    </div>
  );
}
