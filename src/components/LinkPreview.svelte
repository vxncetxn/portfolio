<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { debounce } from "../lib/debounce";

  export let open: boolean;
  export let img: string;
  export let imgAlt: string;
  export let anchor: HTMLAnchorElement;

  let collisionParams = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  const handleResize = debounce(() => {
    console.log("entered resize");
    if (anchor) {
      const domRect = anchor.getBoundingClientRect();
      const bounds = {
        left: domRect.left,
        right: window.innerWidth - domRect.left - domRect.width,
        top: domRect.top,
        bottom: window.innerHeight - domRect.top - domRect.height,
        width: domRect.width,
      };

      let widthPop;
      if (window.matchMedia("(min-width: 1024px)").matches) {
        widthPop = 360;
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        widthPop = 320;
      } else if (window.matchMedia("(min-width: 375px)").matches) {
        widthPop = 280;
      } else {
        widthPop = 240;
      }
      const heightPop = widthPop / (16 / 9);
      const collisionPadding = 8;

      const leftCollision =
        collisionPadding + 0.5 * (widthPop - bounds.width) - bounds.left > 0
          ? collisionPadding + 0.5 * (widthPop - bounds.width) - bounds.left
          : 0;
      const rightCollision =
        bounds.right - (collisionPadding + 0.5 * (widthPop - bounds.width)) < 0
          ? bounds.right - (collisionPadding + 0.5 * (widthPop - bounds.width))
          : 0;
      const topCollision =
        collisionPadding + heightPop + 8 - bounds.top > 0
          ? heightPop + 8 - bounds.top
          : 0;
      const bottomCollision =
        collisionPadding + heightPop + 8 - bounds.bottom > 0
          ? heightPop + 8 - bounds.bottom
          : 0;

      collisionParams = {
        left: leftCollision,
        right: rightCollision,
        top: topCollision,
        bottom: bottomCollision,
      };
    }
  }, 500);

  onMount(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onDestroy(() => window.removeEventListener("resize", handleResize));
</script>

<div
  class={`hover-none:hidden absolute left-1/2 z-10 bg-neutral-01 w-240 mobile:w-280 tablet:w-320 desktop:w-360 h-[calc(240px/16*9)] mobile:h-[calc(280px/16*9)] tablet:h-[calc(320px/16*9)] desktop:h-[calc(360px/16*9)] rounded-8 shadow-2xl p-8 pointer-events-none transition border border-neutral-04 ${
    collisionParams.top ? "top-full" : "bottom-full"
  } ${open ? "opacity-1" : "opacity-0"}`}
  style={`transform: translate(calc(-50% + ${
    collisionParams.left || collisionParams.right || 0
  }px), ${
    open
      ? collisionParams.top
        ? "8"
        : "-8"
      : collisionParams.top
      ? "-40"
      : "40"
  }px)`}
>
  <picture>
    <source
      type="image/avif"
      srcSet={`/images/${img}-360w.avif 360w, /images/${img}-720w.avif 720w, /images/${img}-1080w.avif 1080w, /images/${img}-1440w.avif 1440w`}
      sizes="360px"
    />
    <source
      type="image/webp"
      srcSet={`/images/${img}-360w.webp 360w, /images/${img}-720w.webp 720w, /images/${img}-1080w.webp 1080w, /images/${img}-1440w.webp 1440w`}
      sizes="360px"
    />
    <source
      type="image/jpeg"
      srcSet={`/images/${img}-360w.jpeg 360w, /images/${img}-720w.jpeg 720w, /images/${img}-1080w.jpeg 1080w, /images/${img}-1440w.jpeg 1440w`}
      sizes="360px"
    />
    <img
      src={`/images/${img}-360w.jpeg`}
      alt={imgAlt}
      loading="lazy"
      decoding="async"
      class="object-cover w-full h-full"
    />
  </picture>
</div>
