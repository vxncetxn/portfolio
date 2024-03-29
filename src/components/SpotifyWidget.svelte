<script lang="ts">
  import { swr } from "@svelte-drama/swr";
  import { fetcher } from "../lib/fetcher";
  import Text from "./Text.svelte";
  import Anchor from "./Anchor.svelte";
  import Span from "./Span.svelte";

  interface NowPlayingData {
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
  }

  const { data } = swr<NowPlayingData>("/api/now-playing", fetcher);
</script>

<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="shrink-0 self-start"
>
  <path
    d="M7.99995 0C3.58179 0 0 3.5817 0 7.99986C0 12.4182 3.58179 15.9996 7.99995 15.9996C12.4186 15.9996 16 12.4182 16 7.99986C16 3.58199 12.4186 0.000382117 7.99986 0.000382117L7.99995 0V0ZM11.6687 11.5381C11.6345 11.594 11.5897 11.6427 11.5367 11.6813C11.4838 11.7199 11.4237 11.7476 11.36 11.763C11.2963 11.7783 11.2302 11.781 11.1655 11.7707C11.1007 11.7605 11.0386 11.7376 10.9828 11.7034C9.10447 10.556 6.73991 10.2962 3.95522 10.9324C3.82628 10.9618 3.69097 10.9387 3.57903 10.8683C3.46709 10.7979 3.38768 10.6859 3.35825 10.557C3.3436 10.4932 3.34168 10.4271 3.3526 10.3625C3.36353 10.2979 3.38709 10.2361 3.42192 10.1807C3.45676 10.1252 3.5022 10.0772 3.55563 10.0393C3.60906 10.0014 3.66944 9.97445 3.7333 9.95994C6.78071 9.26343 9.39469 9.56349 11.5034 10.8522C11.7384 10.9964 11.8129 11.3031 11.6687 11.5381V11.5381ZM12.6479 9.35953C12.4673 9.65329 12.0833 9.74595 11.79 9.5654C9.63963 8.24336 6.36171 7.86057 3.81823 8.63265C3.48837 8.73228 3.13997 8.54638 3.03985 8.21709C2.99208 8.05878 3.00904 7.88798 3.08701 7.74216C3.16499 7.59633 3.29761 7.48738 3.45579 7.43919C6.36114 6.55764 9.97302 6.98466 12.4425 8.50215C12.7357 8.6827 12.8284 9.06673 12.6479 9.35963V9.35953ZM12.7319 7.09127C10.1536 5.55983 5.89963 5.41902 3.43793 6.16616C3.04262 6.28605 2.62459 6.06289 2.50479 5.66759C2.44719 5.47767 2.46737 5.27265 2.5609 5.09761C2.65443 4.92257 2.81365 4.79184 3.00355 4.73417C5.82942 3.87631 10.5271 4.04206 13.4956 5.8043C13.5802 5.85434 13.6541 5.92059 13.7131 5.99924C13.772 6.07789 13.8149 6.16741 13.8392 6.26265C13.8635 6.35789 13.8688 6.457 13.8547 6.55429C13.8407 6.65158 13.8076 6.74514 13.7573 6.82962C13.5472 7.18518 13.0867 7.30239 12.7323 7.09127H12.7319Z"
    fill="#1ED760"
  />
</svg>
<Text size="small" className="ml-8 whitespace-normal">
  {#if $data?.isPlaying}
    Now Listening To —
    {#if $data.songUrl}
      <Anchor href={$data.songUrl} font="sans" size="small" lineWrap={true}>
        {$data.title}
        {$data.artist ? ` by ${$data.artist}` : ""}
        <span class="ml-8 inline-flex items-end h-16 space-x-2">
          <span
            class="w-4 h-8 bg-neutral-02 origin-bottom animate-eq-bar-one"
          />
          <span
            class="w-4 h-16 bg-neutral-02 origin-bottom animate-eq-bar-two"
          />
          <span
            class="w-4 h-12 bg-neutral-02 origin-bottom animate-eq-bar-three"
          />
        </span>
      </Anchor>
    {:else}
      <Span font="sans" size="small">
        {$data.title}
        {$data.artist ? ` by ${$data.artist}` : ""}
        <span class="ml-8 inline-flex items-end h-16 space-x-2">
          <span
            class="w-4 h-8 bg-neutral-02 origin-bottom animate-eq-bar-one"
          />
          <span
            class="w-4 h-16 bg-neutral-02 origin-bottom animate-eq-bar-two"
          />
          <span
            class="w-4 h-12 bg-neutral-02 origin-bottom animate-eq-bar-three"
          />
        </span>
      </Span>
    {/if}
  {:else}
    Not Listening Now
  {/if}
</Text>
