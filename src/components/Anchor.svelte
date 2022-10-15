<script lang="ts">
  import { onMount } from "svelte";

  export let href: string;
  export let font = "serif";
  export let size = "base";
  export let img: string | undefined = undefined;
  export let imgAlt: string | undefined = undefined;
  export let lineWrap = false;

  let anchor: HTMLAnchorElement;
  let previewOpen = false;
  let linkPreview;

  onMount(async () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover)").matches &&
      img &&
      imgAlt
    ) {
      linkPreview = (await import(`./LinkPreview.svelte`)).default;
    }
  });
</script>

<span
  on:mouseenter={typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches &&
  img
    ? () => {
        previewOpen = true;
      }
    : undefined}
  on:mouseleave={typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches &&
  img
    ? () => {
        previewOpen = false;
      }
    : undefined}
  class="relative"
>
  <a
    bind:this={anchor}
    {href}
    target="_blank"
    rel="noreferrer noopener"
    class={`${font === "sans" ? "font-sans" : "font-serif"} ${
      size === "small"
        ? "text-14 mobile:text-16 tablet:text-18"
        : "base"
        ? "text-16 mobile:text-18 tablet:text-20 desktop:text-24"
        : "text-24 mobile:text-28 tablet:text-32 desktop:text-40"
    } ${
      lineWrap ? "" : "inline-block"
    } text-neutral-02 underline transition-colors selection:bg-theme-selected rounded-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-selected focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
  >
    <slot />
  </a>
  <svelte:component
    this={linkPreview}
    open={previewOpen}
    {img}
    {imgAlt}
    {anchor}
  />
</span>
