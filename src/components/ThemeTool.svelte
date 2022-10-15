<script lang="ts">
  import { theme } from "../stores/theme";

  const options = ["Light", "Dark", "Auto"];

  let selectedOption;
  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "light") {
    selectedOption = "Light";
  } else if (storedTheme === "dark") {
    selectedOption = "Dark";
  } else {
    selectedOption = "Auto";
  }
</script>

<div
  class="relative flex items-center transition-colors text-neutral-02 bg-neutral-03 w-160 mobile:w-200 tablet:w-240 rounded-16"
>
  <div
    class={selectedOption === "Light"
      ? "absolute left-4 top-4 bg-neutral-01 w-[calc((100%-8px)/3)] h-[calc(100%-8px)] rounded-[12px] transition translate-x-0"
      : selectedOption === "Dark"
      ? "absolute left-4 top-4 bg-neutral-01 w-[calc((100%-8px)/3)] h-[calc(100%-8px)] rounded-[12px] transition translate-x-full"
      : "absolute left-4 top-4 bg-neutral-01 w-[calc((100%-8px)/3)] h-[calc(100%-8px)] rounded-[12px] transition translate-x-[200%]"}
  />
  {#each options as option}
    <button
      on:click={option === "Light"
        ? () => {
            selectedOption = "Light";
            theme.set("light");
            window.localStorage.setItem("theme", "light");
          }
        : option === "Dark"
        ? () => {
            selectedOption = "Dark";
            theme.set("dark");
            window.localStorage.setItem("theme", "dark");
          }
        : () => {
            selectedOption = "Auto";
            const darkModePref = window.matchMedia(
              "(prefers-color-scheme: dark)"
            );
            if (darkModePref.matches) {
              theme.set("dark");
            } else {
              theme.set("light");
            }
            window.localStorage.removeItem("theme");
          }}
      class="relative flex-1 h-full font-sans transition-colors text-14 mobile:text-16 tablet:text-18 text-neutral-02 capsize rounded-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-selected focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {option}
    </button>
  {/each}
</div>
