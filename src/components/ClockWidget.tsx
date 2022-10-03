import { useSignal, useSignalEffect } from "@preact/signals-react";
import { Text } from "./Text";

export function ClockWidget() {
  const time = useSignal(new Date().toLocaleTimeString("en-US"));

  useSignalEffect(() => {
    const timerId = setInterval(() => {
      time.value = new Date().toLocaleTimeString("en-US");
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  });

  return (
    <Text size="small" className="tabular-nums ml-12">
      {time.value} (GMT+8)
    </Text>
  );
}
