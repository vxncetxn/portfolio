<script lang="ts">
  import { color } from "../stores/color";
</script>

<div
  class="relative ml-8 w-32 tablet:w-40 desktop:w-48 h-32 tablet:h-40 desktop:h-48 overflow-hidden transition-colors border-4 rounded-full tablet:border-6 desktop:border-8 tablet:ml-16 shrink-0 border-neutral-03 focus-within:outline-none focus-within:shadow-2xl focus-within:shadow-theme-selected focus-within:border-neutral-04"
>
  <label class="cursor-pointer">
    <div class="w-full h-full bg-theme-selected" />
    <input
      type="color"
      id="head"
      name="head"
      bind:value={$color}
      on:change={(e) => color.set(e.target.value)}
      list="theme-colors"
      class="sr-only"
    />
  </label>
  <datalist id="theme-colors">
    <option>#34fdaa</option>
    <option>#fa1c41</option>
  </datalist>
</div>
