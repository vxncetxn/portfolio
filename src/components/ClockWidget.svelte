<script lang="ts">
  import { onDestroy } from "svelte";
  import Text from "./Text.svelte";

  let time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Singapore",
  });

  const timerId = setInterval(() => {
    time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "Asia/Singapore",
    });
  }, 15000);

  onDestroy(() => {
    clearInterval(timerId);
  });
</script>

<Text size="small" className="tabular-nums">
  {time} (GMT+8)
</Text>
