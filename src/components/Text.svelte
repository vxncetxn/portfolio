<script lang="ts">
  export let font = "sans";
  export let size = "base";
  export let className = "";
</script>

<p
  class={`${font === "sans" ? "font-sans" : "font-serif"} ${
    size === "small"
      ? "text-14 mobile:text-16 tablet:text-18"
      : "base"
      ? "text-16 mobile:text-18 tablet:text-20 desktop:text-24"
      : "text-24 mobile:text-28 tablet:text-32 desktop:text-40"
  } text-neutral-02 capsize transition-colors selection:bg-theme-selected ${className}`}
>
  <slot />
</p>
